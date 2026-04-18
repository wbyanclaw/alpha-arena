/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('../src/generated/prisma');
const path = require('path');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'prisma', 'prod.db')}`,
    },
  },
});

async function main() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    console.log('Weekend - skip');
    return;
  }

  const pendingOrders = await prisma.order.findMany({
    where: { status: 'PENDING' },
    include: { agent: true, competition: true },
  });

  if (pendingOrders.length === 0) {
    console.log('No pending orders');
    return;
  }

  console.log('Found ' + pendingOrders.length + ' pending orders');

  for (const order of pendingOrders) {
    const priceRec = await prisma.price.findUnique({ where: { symbol: order.symbol } });
    const marketPrice = priceRec?.price;
    if (typeof marketPrice !== 'number' || !Number.isFinite(marketPrice) || marketPrice <= 0) {
      console.error('Failed to match order ' + order.id + ': missing market price for ' + order.symbol);
      continue;
    }

    const slippage = 1 + (Math.random() - 0.5) * 0.006;
    const matchPrice = Math.round(marketPrice * slippage * 100) / 100;
    const deliveredAt = new Date();
    const filledAt = new Date(order.submittedAt);

    try {
      await prisma.$transaction(async (tx) => {
        await tx.trade.create({
          data: {
            agentId: order.agentId,
            symbol: order.symbol,
            side: order.side,
            quantity: order.quantity,
            price: matchPrice,
            executedPrice: matchPrice,
            status: 'FILLED',
            filledAt,
          },
        });

        await tx.delivery.create({
          data: {
            agentId: order.agentId,
            lobsterId: null,
            symbol: order.symbol,
            side: order.side,
            quantity: order.quantity,
            price: matchPrice,
            deliveredAt,
          },
        });

        const portfolio = await tx.portfolio.findUnique({ where: { id: order.portfolioId } });
        if (!portfolio) throw new Error(`portfolio not found: ${order.portfolioId}`);

        if (order.side === 'BUY') {
          const cost = matchPrice * order.quantity;
          if (portfolio.cash < cost) throw new Error(`insufficient cash for order ${order.id}`);

          const existingPos = await tx.position.findUnique({
            where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: order.symbol } },
          });
          if (existingPos) {
            const newQty = existingPos.quantity + order.quantity;
            const newCost = (existingPos.avgCost * existingPos.quantity + matchPrice * order.quantity) / newQty;
            await tx.position.update({
              where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: order.symbol } },
              data: { quantity: newQty, avgCost: newCost, currentPrice: matchPrice },
            });
          } else {
            await tx.position.create({
              data: {
                portfolioId: portfolio.id,
                symbol: order.symbol,
                quantity: order.quantity,
                avgCost: matchPrice,
                currentPrice: matchPrice,
              },
            });
          }
          await tx.portfolio.update({
            where: { id: portfolio.id },
            data: { cash: { decrement: cost } },
          });
        } else {
          const pos = await tx.position.findUnique({
            where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: order.symbol } },
          });
          if (!pos || pos.quantity < order.quantity) throw new Error(`insufficient position for order ${order.id}`);

          const newQty = pos.quantity - order.quantity;
          if (newQty <= 0) {
            await tx.position.delete({
              where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: order.symbol } },
            });
          } else {
            await tx.position.update({
              where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: order.symbol } },
              data: { quantity: newQty, currentPrice: matchPrice },
            });
          }
          const proceeds = matchPrice * order.quantity;
          await tx.portfolio.update({
            where: { id: portfolio.id },
            data: { cash: { increment: proceeds } },
          });
        }

        await tx.order.update({
          where: { id: order.id },
          data: { status: 'MATCHED', matchedAt: deliveredAt },
        });
      });

      console.log('Matched: ' + order.side + ' ' + order.quantity + ' ' + order.symbol + ' @ ' + matchPrice + ' (agent: ' + order.agent.name + ')');
    } catch (error) {
      console.error('Failed to match order ' + order.id + ': ' + String(error));
    }
  }

  console.log('Done');
}

main().catch(console.error).finally(() => prisma.$disconnect());
