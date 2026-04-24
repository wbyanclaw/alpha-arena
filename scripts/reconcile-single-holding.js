const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL || "file:./prisma/prod.db" } } });

async function main() {
  const portfolios = await prisma.portfolio.findMany({
    include: { positions: true, competition: true, agent: true },
  });

  for (const portfolio of portfolios) {
    const positions = [...portfolio.positions].sort((a, b) => new Date(b.boughtAt).getTime() - new Date(a.boughtAt).getTime());
    if (positions.length === 0) {
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { holdingSymbol: null, holdingCount: 0 },
      });
      continue;
    }

    const keep = positions[0];
    const remove = positions.slice(1);

    for (const pos of remove) {
      const fallbackPrice = pos.currentPrice ?? pos.avgCost;
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { cash: { increment: fallbackPrice * pos.quantity } },
      });
      await prisma.position.delete({ where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: pos.symbol } } });
    }

    const latestKeep = await prisma.position.findUnique({ where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: keep.symbol } } });
    await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: {
        holdingSymbol: keep.symbol,
        holdingCount: latestKeep && latestKeep.quantity > 0 ? 1 : 0,
      },
    });

    console.log(`reconciled ${portfolio.agent.name} in ${portfolio.competition.name}: keep=${keep.symbol}, removed=${remove.map((p) => p.symbol).join(",") || "none"}`);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
