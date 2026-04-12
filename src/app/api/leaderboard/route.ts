import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const competitionId = req.nextUrl.searchParams.get("competitionId");
  const market = req.nextUrl.searchParams.get("market") || "A";

  const competition = competitionId
    ? await prisma.competition.findUnique({ where: { id: competitionId } })
    : await prisma.competition.findFirst({
        where: { status: "RUNNING", market },
        orderBy: { createdAt: "desc" },
      });

  if (!competition) return NextResponse.json({ error: "no competition found" }, { status: 404 });

  const portfolios = await prisma.portfolio.findMany({
    where: { competitionId: competition.id },
    include: { agent: { select: { id: true, name: true, avatar: true } }, positions: true },
    orderBy: { totalValue: "desc" },
  });

  const leaderboard = await Promise.all(
    portfolios.map(async (p) => {
      const enrichedPositions = await Promise.all(
        p.positions.map(async (pos) => {
          const priceRec = await prisma.price.findUnique({ where: { symbol: pos.symbol } });
          return { ...pos, currentPrice: priceRec?.price ?? pos.avgCost };
        })
      );
      const unrealizedPnL = enrichedPositions.reduce((sum, pos) => sum + (pos.currentPrice - pos.avgCost) * pos.quantity, 0);
      const totalValue = p.cash + enrichedPositions.reduce((sum, pos) => sum + pos.currentPrice * pos.quantity, 0);
      const returnPct = ((totalValue / competition.initialCash) - 1) * 100;
      return { rank: 0, agent: p.agent, totalValue, returnPct, unrealizedPnL, positions: enrichedPositions };
    })
  );

  leaderboard.sort((a, b) => b.returnPct - a.returnPct);
  leaderboard.forEach((entry, idx) => { entry.rank = idx + 1; });

  return NextResponse.json({ competition, leaderboard });
}
