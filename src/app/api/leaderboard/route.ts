import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getPeriodStart(period: string): Date | null {
  const now = new Date();
  if (period === "week") {
    const d = new Date(now);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "month") {
    const d = new Date(now);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  return null; // total
}

export async function GET(req: NextRequest) {
  const competitionId = req.nextUrl.searchParams.get("competitionId");
  const market = req.nextUrl.searchParams.get("market") || "A";
  const period = req.nextUrl.searchParams.get("period") || "total"; // total | week | month

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

  const periodStart = getPeriodStart(period);

  const leaderboard = await Promise.all(
    portfolios.map(async (p) => {
      // Enrich positions with current price
      const enrichedPositions = await Promise.all(
        p.positions.map(async (pos) => {
          const priceRec = await prisma.price.findUnique({ where: { symbol: pos.symbol } });
          return { ...pos, currentPrice: priceRec?.price ?? pos.avgCost };
        })
      );

      // Current total value
      const unrealizedPnL = enrichedPositions.reduce(
        (sum, pos) => sum + (pos.currentPrice - pos.avgCost) * pos.quantity, 0
      );
      const totalValue = p.cash + enrichedPositions.reduce(
        (sum, pos) => sum + pos.currentPrice * pos.quantity, 0
      );

      // Period return: compare to period start value
      let returnPct: number;
      if (periodStart) {
        // Sum up trades from period start to compute period PnL
        const periodTrades = await prisma.trade.findMany({
          where: {
            agentId: p.agentId,
            status: "FILLED",
            filledAt: { gte: periodStart },
          },
          orderBy: { filledAt: "asc" },
        });

        // Simulate period return: start from initial cash, apply each filled trade
        let simCash = competition.initialCash;
        let simPosition = 0;
        let simAvgCost = 0;

        for (const t of periodTrades) {
          if (t.side === "BUY" && simPosition === 0) {
            // Only open new position if flat
            simPosition = t.quantity;
            simAvgCost = t.executedPrice ?? 0;
            simCash -= t.executedPrice ?? 0 * t.quantity + (t.commission ?? 0) + (t.transferFee ?? 0);
          } else if (t.side === "SELL" && simPosition > 0) {
            // Close position
            simCash += t.executedPrice ?? 0 * t.quantity - (t.commission ?? 0) - (t.stampTax ?? 0) - (t.transferFee ?? 0);
            simPosition = 0;
            simAvgCost = 0;
          }
        }

        // Add current position value if still holding
        const currentPrice = enrichedPositions[0]?.currentPrice ?? simAvgCost;
        const finalValue = simCash + simPosition * currentPrice;
        returnPct = ((finalValue / competition.initialCash) - 1) * 100;
      } else {
        // Total return
        returnPct = ((totalValue / competition.initialCash) - 1) * 100;
      }

      return {
        rank: 0,
        agent: p.agent,
        totalValue: Math.round(totalValue * 100) / 100,
        cash: Math.round(p.cash * 100) / 100,
        returnPct: Math.round(returnPct * 100) / 100,
        unrealizedPnL: Math.round(unrealizedPnL * 100) / 100,
        positions: enrichedPositions.map(pos => ({
          symbol: pos.symbol,
          quantity: pos.quantity,
          avgCost: pos.avgCost,
          currentPrice: pos.currentPrice,
        })),
      };
    })
  );

  leaderboard.sort((a, b) => b.returnPct - a.returnPct);
  leaderboard.forEach((entry, idx) => { entry.rank = idx + 1; });

  return NextResponse.json({
    competition,
    period,
    periodStart: periodStart?.toISOString() ?? null,
    updatedAt: new Date().toISOString(),
    leaderboard,
  });
}
