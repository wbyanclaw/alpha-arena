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
    const d = new Date(now); d.setDate(1); d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "season") {
    const d = new Date(now);
    const q = Math.floor(d.getMonth() / 3);
    d.setMonth(q * 3, 1); d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "year") {
    return new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
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
        where: { market },
        orderBy: { createdAt: "desc" },
      });

  if (!competition) return NextResponse.json({ error: "no competition found" }, { status: 404 });

  const portfolios = await prisma.portfolio.findMany({
    where: { competitionId: competition.id },
    include: {
      agent: {
        include: {
          deliveries: { orderBy: { deliveredAt: "desc" }, take: 1 },
        },
      },
      positions: true,
      orders: {
        where: {
          submittedAt: {
            gte: new Date(new Date().toISOString().slice(0, 10) + "T00:00:00"),
          },
        },
        take: 1,
      },
    },
    orderBy: { totalValue: "desc" },
  });

  if (portfolios.length === 0) {
    return NextResponse.json({ competition, period, leaderboard: [], updatedAt: new Date().toISOString() });
  }

  const agentIds = portfolios.map(p => p.agentId);
  const lobsters = await prisma.lobster.findMany({ where: { agentId: { in: agentIds } } });
  const lobsterMap = new Map(lobsters.map(l => [l.agentId, l]));

  const allSymbols = portfolios.flatMap(p => p.positions.map(pos => pos.symbol));
  const prices = allSymbols.length > 0 ? await prisma.price.findMany({ where: { symbol: { in: allSymbols } } }) : [];
  const priceMap = new Map(prices.map(p => [p.symbol, p]));

  const periodStart = getPeriodStart(period);
  const periodStartStr = periodStart ? periodStart.toISOString().slice(0, 10) : null;

  // 批量查 period 起始的结算快照
  const settlementStarts = periodStartStr
    ? await prisma.dailySettlement.findMany({
        where: { portfolioId: { in: portfolios.map(p => p.id) }, date: { lte: periodStartStr } },
        orderBy: { date: "desc" },
      })
    : [];
  // 取每个 portfolio 最新的一条
  const startValueMap = new Map<string, number>();
  for (const s of settlementStarts) {
    if (!startValueMap.has(s.portfolioId)) startValueMap.set(s.portfolioId, s.totalValue);
  }

  const leaderboard = portfolios.map((p) => {
    const lobster = lobsterMap.get(p.agentId) ?? null;
    const enrichedPositions = p.positions.map(pos => {
      const priceRec = priceMap.get(pos.symbol);
      return { ...pos, currentPrice: priceRec?.price ?? pos.avgCost };
    });

    const unrealizedPnL = enrichedPositions.reduce(
      (sum, pos) => sum + (pos.currentPrice - pos.avgCost) * pos.quantity, 0
    );
    const totalValue = p.cash + enrichedPositions.reduce(
      (sum, pos) => sum + pos.currentPrice * pos.quantity, 0
    );

    const startValue = startValueMap.get(p.id) ?? competition.initialCash;
    const returnPct = ((totalValue / startValue) - 1) * 100;

    const latestDelivery = p.agent.deliveries[0] ?? null;
    const todayOrder = p.orders[0] ?? null;

    return {
      rank: 0,
      agent: { id: p.agent.id, name: p.agent.name, avatar: p.agent.avatar },
      lobsterKey: lobster?.key ?? null,
      lobsterName: lobster?.name ?? p.agent.name,
      lobsterColor: lobster?.color ?? null,
      totalValue: Math.round(totalValue * 100) / 100,
      cash: Math.round(p.cash * 100) / 100,
      returnPct: Math.round(returnPct * 100) / 100,
      unrealizedPnL: Math.round(unrealizedPnL * 100) / 100,
      holdingsDays: enrichedPositions[0]
        ? Math.floor((Date.now() - new Date(enrichedPositions[0].boughtAt).getTime()) / 86400000)
        : 0,
      latestDelivery: latestDelivery ? {
        symbol: latestDelivery.symbol,
        side: latestDelivery.side,
        price: latestDelivery.price,
        quantity: latestDelivery.quantity,
        deliveredAt: latestDelivery.deliveredAt,
      } : null,
      todayOrder: todayOrder ? {
        symbol: todayOrder.symbol,
        side: todayOrder.side,
        quantity: todayOrder.quantity,
        note: todayOrder.note,
        submittedAt: todayOrder.submittedAt,
        status: todayOrder.status,
      } : null,
      positions: enrichedPositions.map(pos => ({
        symbol: pos.symbol,
        quantity: pos.quantity,
        avgCost: pos.avgCost,
        currentPrice: pos.currentPrice,
      })),
    };
  });

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
