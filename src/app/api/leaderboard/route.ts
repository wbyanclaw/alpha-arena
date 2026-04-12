import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public leaderboard
export async function GET(req: NextRequest) {
  const competitionId = req.nextUrl.searchParams.get("competitionId");
  const competition = competitionId
    ? await prisma.competition.findUnique({ where: { id: competitionId } })
    : await prisma.competition.findFirst({ where: { status: "RUNNING" }, orderBy: { createdAt: "desc" } });

  if (!competition) return NextResponse.json({ error: "no competition found" }, { status: 404 });

  const portfolios = await prisma.portfolio.findMany({
    where: { competitionId: competition.id },
    include: { agent: { select: { id: true, name: true, avatar: true } }, positions: true },
    orderBy: { totalValue: "desc" },
  });

  const leaderboard = await Promise.all(
    portfolios.map(async (p, idx) => {
      let cash = p.cash;
      const enrichedPositions = await Promise.all(
        p.positions.map(async (pos) => {
          const priceRec = await prisma.price.findUnique({ where: { symbol: pos.symbol } });
          const curPrice = priceRec?.price ?? pos.avgCost;
          cash += curPrice * pos.quantity;
          return { ...pos, currentPrice: curPrice };
        })
      );
      const totalValue = cash;
      const returnPct = ((totalValue / competition.initialCash) - 1) * 100;
      return {
        rank: idx + 1,
        agent: p.agent,
        totalValue,
        returnPct,
        cash: p.cash,
        positions: enrichedPositions,
      };
    })
  );

  return NextResponse.json({ competition, leaderboard });
}
