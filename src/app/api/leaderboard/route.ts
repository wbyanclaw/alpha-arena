import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getPeriodStart(period: string): Date | null {
  const now = new Date();
  if (period === "week") {
    const d = new Date(now);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff); d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "month") {
    const d = new Date(now);
    d.setDate(1); d.setHours(0, 0, 0, 0);
    return d;
  }
  return null;
}

// GET /api/leaderboard?period=total&market=A
export async function GET(req: NextRequest) {
  const competitionId = req.nextUrl.searchParams.get("competitionId");
  const market = req.nextUrl.searchParams.get("market") || "A";
  const period = req.nextUrl.searchParams.get("period") || "total";

  const competition = competitionId
    ? await prisma.competition.findUnique({ where: { id: competitionId } })
    : await prisma.competition.findFirst({
        where: { status: "RUNNING", market },
        orderBy: { createdAt: "desc" },
      });

  if (!competition) return NextResponse.json({ error: "no competition found" }, { status: 404 });

  const portfolios = await prisma.portfolio.findMany({
    where: { competitionId: competition.id },
    include: {
      agent: {
        include: {
          deliveries: {
            orderBy: { deliveredAt: "desc" },
            take: 1,
          },
        },
      },
      positions: true,
    },
    orderBy: { totalValue: "desc" },
  });

  const periodStart = getPeriodStart(period);

  const leaderboard = await Promise.all(
    portfolios.map(async (p) => {
      // Get lobster for this agent
      const lobster = await prisma.lobster.findUnique({ where: { agentId: p.agentId } });

      // Enrich positions with current price
      const enrichedPositions = await Promise.all(
        p.positions.map(async (pos) => {
          const priceRec = await prisma.price.findUnique({ where: { symbol: pos.symbol } });
          return { ...pos, currentPrice: priceRec?.price ?? pos.avgCost };
        })
      );

      const unrealizedPnL = enrichedPositions.reduce(
        (sum, pos) => sum + (pos.currentPrice - pos.avgCost) * pos.quantity, 0
      );
      const totalValue = p.cash + enrichedPositions.reduce(
        (sum, pos) => sum + pos.currentPrice * pos.quantity, 0
      );

      // Period return calculation
      let returnPct: number;
      if (periodStart) {
        const periodTrades = await prisma.trade.findMany({
          where: {
            agentId: p.agentId,
            status: "FILLED",
            filledAt: { gte: periodStart },
          },
          orderBy: { filledAt: "asc" },
        });

        let simCash = competition.initialCash;
        let simPosition = 0;
        let simAvgCost = 0;
        let lastPrice = enrichedPositions[0]?.currentPrice ?? 0;

        for (const t of periodTrades) {
          const px = t.executedPrice ?? 0;
          lastPrice = px;
          if (t.side === "BUY" && simPosition === 0) {
            simPosition = t.quantity;
            simAvgCost = px;
            simCash -= px * t.quantity + (t.commission ?? 0) + (t.transferFee ?? 0);
          } else if (t.side === "SELL" && simPosition > 0) {
            simCash += px * t.quantity - (t.commission ?? 0) - (t.stampTax ?? 0) - (t.transferFee ?? 0);
            simPosition = 0;
            simAvgCost = 0;
          }
        }

        const finalValue = simCash + simPosition * lastPrice;
        returnPct = ((finalValue / competition.initialCash) - 1) * 100;
      } else {
        returnPct = ((totalValue / competition.initialCash) - 1) * 100;
      }

      // Latest delivery for this period
      const latestDelivery = p.agent.deliveries[0] ?? null;

      return {
        rank: 0,
        agent: {
          id: p.agent.id,
          name: p.agent.name,
          avatar: p.agent.avatar,
        },
        lobsterKey: lobster?.key ?? null,
        lobsterName: lobster?.name ?? p.agent.name,
        totalValue: Math.round(totalValue * 100) / 100,
        cash: Math.round(p.cash * 100) / 100,
        returnPct: Math.round(returnPct * 100) / 100,
        unrealizedPnL: Math.round(unrealizedPnL * 100) / 100,
        latestDelivery: latestDelivery ? {
          symbol: latestDelivery.symbol,
          side: latestDelivery.side,
          price: latestDelivery.price,
          quantity: latestDelivery.quantity,
          deliveredAt: latestDelivery.deliveredAt,
        } : null,
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
