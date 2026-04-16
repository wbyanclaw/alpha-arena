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
          deliveries: { orderBy: { deliveredAt: "desc" }, take: 20 },
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
  });

  if (portfolios.length === 0) {
    return NextResponse.json({ competition, period, leaderboard: [], updatedAt: new Date().toISOString() });
  }

  const agentIds = portfolios.map(p => p.agentId);
  const lobsters = await prisma.lobster.findMany({ where: { agentId: { in: agentIds } } });
  const lobsterMap = new Map(lobsters.map(l => [l.agentId, l]));

  // 全量 trade（已成交）用于算 realized PnL
  const trades = await prisma.trade.findMany({
    where: { agentId: { in: agentIds }, status: "FILLED" },
    orderBy: { filledAt: "asc" },
  });
  const tradesByAgent = new Map<string, typeof trades>();
  for (const t of trades) {
    if (!tradesByAgent.has(t.agentId)) tradesByAgent.set(t.agentId, []);
    tradesByAgent.get(t.agentId)!.push(t);
  }

  const allSymbols = portfolios.flatMap(p => p.positions.map(pos => pos.symbol));
  const prices = allSymbols.length > 0
    ? await prisma.price.findMany({ where: { symbol: { in: [...new Set(allSymbols)] } } })
    : [];
  const priceMap = new Map(prices.map(p => [p.symbol, p]));

  const periodStart = getPeriodStart(period);
  const periodStartStr = periodStart ? periodStart.toISOString() : null;

  const leaderboard = portfolios.map((p) => {
    const lobster = lobsterMap.get(p.agentId) ?? null;
    const agentTrades = tradesByAgent.get(p.agent.id) ?? [];

    // ── realized PnL：所有 SELL 的净收益之和 ──────────────
    // 每笔 SELL 的盈亏 = (卖出价 - 对应买入均价) × 数量 - 费用
    // 为简化，按 FIFO 匹配买卖
    const buys: { price: number; qty: number }[] = [];
    let realizedPnL = 0;

    for (const t of agentTrades) {
      if (t.side === "BUY") {
        buys.push({ price: t.executedPrice ?? t.price, qty: t.quantity });
      } else {
        // SELL：FIFO 匹配买单
        let remain = t.quantity;
        const sellPrice = t.executedPrice ?? t.price;
        const fees = (t.commission ?? 0) + (t.stampTax ?? 0) + (t.transferFee ?? 0);
        while (remain > 0 && buys.length > 0) {
          const b = buys[0];
          const matched = Math.min(remain, b.qty);
          realizedPnL += (sellPrice - b.price) * matched - fees * (matched / t.quantity);
          b.qty -= matched;
          remain -= matched;
          if (b.qty <= 0) buys.shift();
        }
      }
    }

    // ── unrealized PnL：当前持仓浮动盈亏 ─────────────────
    const enrichedPositions = p.positions.map(pos => {
      const priceRec = priceMap.get(pos.symbol);
      const currentPrice = priceRec?.price ?? pos.avgCost;
      return { ...pos, currentPrice };
    });
    const unrealizedPnL = enrichedPositions.reduce(
      (sum, pos) => sum + (pos.currentPrice - pos.avgCost) * pos.quantity, 0
    );

    const totalPnL = realizedPnL + unrealizedPnL;
    const returnPct = (totalPnL / competition.initialCash) * 100;

    const latestDelivery = p.agent.deliveries[0] ?? null;
    const todayOrder = p.orders[0] ?? null;

    // period 过滤：只取 period 之后的交易用于 period return
    let periodReturnPct = returnPct;
    if (periodStartStr) {
      const periodTrades = agentTrades.filter(t => t.filledAt && t.filledAt.toISOString() >= periodStartStr);
      const periodPos = p.positions; // 简化：持仓按当前算，不单独处理 period 边界
      const periodBuys: { price: number; qty: number }[] = [];
      let pRealized = 0;
      for (const t of periodTrades) {
        if (t.side === "BUY") periodBuys.push({ price: t.executedPrice ?? t.price, qty: t.quantity });
        else {
          let remain = t.quantity;
          const sellPrice = t.executedPrice ?? t.price;
          const fees = (t.commission ?? 0) + (t.stampTax ?? 0) + (t.transferFee ?? 0);
          while (remain > 0 && periodBuys.length > 0) {
            const b = periodBuys[0];
            const matched = Math.min(remain, b.qty);
            pRealized += (sellPrice - b.price) * matched - fees * (matched / t.quantity);
            b.qty -= matched;
            remain -= matched;
            if (b.qty <= 0) periodBuys.shift();
          }
        }
      }
      const pUnrealized = enrichedPositions.reduce(
        (sum, pos) => sum + (pos.currentPrice - pos.avgCost) * pos.quantity, 0
      );
      periodReturnPct = ((pRealized + pUnrealized) / competition.initialCash) * 100;
    }

    return {
      rank: 0,
      agent: { id: p.agent.id, name: p.agent.name, avatar: p.agent.avatar, model: p.agent.model },
      lobsterKey: lobster?.key ?? null,
      lobsterName: lobster?.name ?? p.agent.name,
      lobsterColor: lobster?.color ?? null,
      realizedPnL: Math.round(realizedPnL * 100) / 100,
      unrealizedPnL: Math.round(unrealizedPnL * 100) / 100,
      totalPnL: Math.round(totalPnL * 100) / 100,
      returnPct: Math.round(returnPct * 100) / 100,
      periodReturnPct: Math.round(periodReturnPct * 100) / 100,
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
