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

async function syncPortfolioSnapshot(tx, portfolioId, dateStr, now) {
  const portfolio = await tx.portfolio.findUnique({
    where: { id: portfolioId },
    include: { positions: true, competition: true },
  });
  if (!portfolio) return;

  const symbols = [...new Set(portfolio.positions.map((pos) => pos.symbol))];
  const prices = symbols.length > 0
    ? await tx.price.findMany({ where: { symbol: { in: symbols } } })
    : [];
  const priceMap = new Map(prices.map((p) => [p.symbol, p.price]));

  const totalValue = portfolio.cash + portfolio.positions.reduce((sum, pos) => {
    const currentPrice = priceMap.get(pos.symbol) ?? pos.avgCost;
    return sum + currentPrice * pos.quantity;
  }, 0);

  const heldPosition = portfolio.positions[0] ?? null;
  const positionDays = heldPosition
    ? Math.floor((now.getTime() - new Date(heldPosition.boughtAt).getTime()) / 86400000)
    : 0;
  const initialCash = portfolio.competition?.initialCash ?? 1000000;

  await tx.portfolio.update({
    where: { id: portfolio.id },
    data: { totalValue },
  });

  await tx.dailySettlement.upsert({
    where: { portfolioId_date: { portfolioId: portfolio.id, date: dateStr } },
    create: {
      portfolioId: portfolio.id,
      date: dateStr,
      cash: portfolio.cash,
      positionJson: heldPosition
        ? JSON.stringify({ symbol: heldPosition.symbol, quantity: heldPosition.quantity, avgCost: heldPosition.avgCost })
        : null,
      positionDays,
      totalValue,
      returnPct: ((totalValue / initialCash) - 1) * 100,
    },
    update: {
      cash: portfolio.cash,
      positionJson: heldPosition
        ? JSON.stringify({ symbol: heldPosition.symbol, quantity: heldPosition.quantity, avgCost: heldPosition.avgCost })
        : null,
      positionDays,
      totalValue,
      returnPct: ((totalValue / initialCash) - 1) * 100,
    },
  });
}

async function main() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    console.log('Weekend - skip');
    return;
  }

  const dateStr = now.toISOString().slice(0, 10);
  const pendingOrders = await prisma.order.findMany({
    where: { status: 'PENDING' },
    include: { agent: true },
  });

  if (pendingOrders.length === 0) {
    console.log('No pending orders');
    return;
  }

  console.log('Found ' + pendingOrders.length + ' pending orders');

  const touchedPortfolioIds = new Set();

  for (const order of pendingOrders) {
    const priceRec = await prisma.price.findUnique({ where: { symbol: order.symbol } });
    const closePrice = priceRec?.price;

    if (typeof closePrice !== 'number' || !Number.isFinite(closePrice) || closePrice <= 0) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'REJECTED', rejectReason: `行情缺失：${order.symbol}` },
      });
      console.error('Failed to match order ' + order.id + ': missing close price for ' + order.symbol);
      continue;
    }

    try {
      await prisma.$transaction(async (tx) => {
        const portfolio = await tx.portfolio.findUnique({
          where: { id: order.portfolioId },
          include: { positions: true },
        });
        if (!portfolio) throw new Error(`portfolio not found: ${order.portfolioId}`);

        const amount = closePrice * order.quantity;
        const commission = Math.max(amount * 0.0003, 5);
        const transferFee = amount * 0.00001;
        const stampTax = order.side === 'SELL' ? amount * 0.0005 : 0;
        const netAmount = order.side === 'BUY'
          ? -(amount + commission + transferFee)
          : amount - commission - stampTax - transferFee;

        if (order.side === 'BUY') {
          const requiredCash = amount + commission + transferFee;
          if (portfolio.cash < requiredCash) {
            await tx.order.update({
              where: { id: order.id },
              data: { status: 'REJECTED', rejectReason: `现金不足：需要${requiredCash.toFixed(2)}，可用${portfolio.cash.toFixed(2)}` },
            });
            return;
          }

          const existingPos = portfolio.positions.find((pos) => pos.symbol === order.symbol);
          if (existingPos) {
            const newQty = existingPos.quantity + order.quantity;
            const newCost = (existingPos.avgCost * existingPos.quantity + closePrice * order.quantity) / newQty;
            await tx.position.update({
              where: { id: existingPos.id },
              data: { quantity: newQty, avgCost: newCost, currentPrice: closePrice },
            });
          } else {
            await tx.position.create({
              data: {
                portfolioId: portfolio.id,
                symbol: order.symbol,
                quantity: order.quantity,
                avgCost: closePrice,
                currentPrice: closePrice,
                boughtAt: now,
              },
            });
          }

          await tx.portfolio.update({
            where: { id: portfolio.id },
            data: { cash: { decrement: requiredCash } },
          });
        } else {
          const pos = portfolio.positions.find((item) => item.symbol === order.symbol);
          if (!pos || pos.quantity < order.quantity) {
            await tx.order.update({
              where: { id: order.id },
              data: { status: 'REJECTED', rejectReason: `持仓不足：${pos?.quantity ?? 0}股` },
            });
            return;
          }

          const newQty = pos.quantity - order.quantity;
          if (newQty <= 0) {
            await tx.position.delete({ where: { id: pos.id } });
          } else {
            await tx.position.update({
              where: { id: pos.id },
              data: { quantity: newQty, currentPrice: closePrice },
            });
          }

          await tx.portfolio.update({
            where: { id: portfolio.id },
            data: { cash: { increment: netAmount } },
          });
        }

        await tx.trade.create({
          data: {
            agentId: order.agentId,
            symbol: order.symbol,
            side: order.side,
            quantity: order.quantity,
            price: closePrice,
            executedPrice: closePrice,
            status: 'FILLED',
            filledAt: now,
            note: order.note ?? undefined,
            commission,
            stampTax,
            transferFee,
            netAmount,
          },
        });

        await tx.delivery.create({
          data: {
            agentId: order.agentId,
            lobsterId: null,
            symbol: order.symbol,
            side: order.side,
            quantity: order.quantity,
            price: closePrice,
            deliveredAt: now,
            note: order.note ?? undefined,
          },
        });

        await tx.order.update({
          where: { id: order.id },
          data: { status: 'MATCHED', matchedAt: now, rejectReason: null },
        });

        touchedPortfolioIds.add(portfolio.id);
      });

      console.log('Matched: ' + order.side + ' ' + order.quantity + ' ' + order.symbol + ' @ close ' + closePrice + ' (agent: ' + order.agent.name + ')');
    } catch (error) {
      console.error('Failed to match order ' + order.id + ': ' + String(error));
    }
  }

  for (const portfolioId of touchedPortfolioIds) {
    await prisma.$transaction(async (tx) => {
      await syncPortfolioSnapshot(tx, portfolioId, dateStr, now);
    });
  }

  console.log('Done');
}

main().catch(console.error).finally(() => prisma.$disconnect());
