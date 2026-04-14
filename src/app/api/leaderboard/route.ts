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

  // 批量拉取所有参赛组合
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

  // 批量查 lobster（解决 N+1）
  const agentIds = portfolios.map(p => p.agentId);
  const lobsters = await prisma.lobster.findMany({
    where: { agentId: { in: agentIds } },
  });
  const lobsterMap = new Map(lobsters.map(l => [l.agentId, l]));

  // 批量查所有相关行情
  const allSymbols = [...new Set([
    ...portfolios.flatMap(p => p.positions.map(pos => pos.symbol)),
    ...portfolios.flatMap(p => p.orders.filter(o => o.status === "PENDING").map(o => o.symbol)),
  ])];
  const prices = allSymbols.length > 0
    ? await prisma.price.findMany({ where: { symbol: { in: allSymbols } } })
    : [];
  const priceMap = new Map(prices.map(p => [p.symbol, p]));

  // 批量查今日挂单
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);
  const todayOrders = await prisma.order.findMany({
    where: {
      portfolioId: { in: portfolios.map(p => p.id) },
      submittedAt: { gte: todayStart, lte: todayEnd },
      status: "PENDING",
    },
  });
  const todayOrderMap = new Map(todayOrders.map(o => [o.portfolioId, o]));

  // 批量查所有相关 agent 的 period trades
  const periodStart = getPeriodStart(period);
  const periodTrades = periodStart
    ? await prisma.trade.findMany({
        where: {
          agentId: { in: agentIds },
          status: "FILLED",
          filledAt: { gte: periodStart },
        },
        orderBy: { filledAt: "asc" },
      })
    : [];

  const tradesByAgent = new Map<string, typeof periodTrades>();
  for (const t of periodTrades) {
    if (!tradesByAgent.has(t.agentId)) tradesByAgent.set(t.agentId, []);
    tradesByAgent.get(t.agentId)!.push(t);
  }

  const leaderboard = portfolios.map((p) => {
    const lobster = lobsterMap.get(p.agentId) ?? null;

    // Enrich positions
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

    // Period return
    let returnPct: number;
    if (periodStart) {
      const agentTrades = tradesByAgent.get(p.agentId) ?? [];
      let simCash = competition.initialCash;
      let simPosition = 0;
      let lastPrice = enrichedPositions[0]?.currentPrice ?? 0;

      for (const t of agentTrades) {
        const px = t.executedPrice ?? 0;
        lastPrice = px;
        if (t.side === "BUY" && simPosition === 0) {
          simPosition = t.quantity;
          simCash -= px * t.quantity + (t.commission ?? 0) + (t.transferFee ?? 0);
        } else if (t.side === "SELL" && simPosition > 0) {
          simCash += px * t.quantity - (t.commission ?? 0) - (t.stampTax ?? 0) - (t.transferFee ?? 0);
          simPosition = 0;
        }
      }

      const finalValue = simCash + simPosition * lastPrice;
      returnPct = ((finalValue / competition.initialCash) - 1) * 100;
    } else {
      returnPct = ((totalValue / competition.initialCash) - 1) * 100;
    }

    const latestDelivery = p.agent.deliveries[0] ?? null;

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
      todayOrder: todayOrderMap.get(p.id) ? {
        symbol: todayOrderMap.get(p.id)!.symbol,
        side: todayOrderMap.get(p.id)!.side,
        quantity: todayOrderMap.get(p.id)!.quantity,
        note: todayOrderMap.get(p.id)!.note,
        submittedAt: todayOrderMap.get(p.id)!.submittedAt,
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
