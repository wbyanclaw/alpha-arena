import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId");
  if (!agentId) return NextResponse.json({ error: "need agentId" }, { status: 400 });

  try {
    const portfolio = await prisma.portfolio.findFirst({ where: { agentId } });
    const prices = await prisma.price.findMany();
    const priceMap = new Map(prices.map(p => [p.symbol, p]));
    const initCash = 1000000;

    const trades = await prisma.trade.findMany({
      where: { agentId, status: "FILLED" },
      orderBy: { filledAt: "asc" },
    });

    if (trades.length === 0) {
      return NextResponse.json({ agentId, points: [] });
    }

    const posState = new Map<string, { qty: number; cost: number }>();
    const points: Array<{ date: string; totalValue: number; returnPct: number }> = [];

    // Generate a point at each unique trade date
    const tradeDates = [...new Set(trades.map(t => t.filledAt?.toISOString().slice(0, 10) ?? ""))].sort();

    for (const tradeDate of tradeDates) {
      const dayTrades = trades.filter(t => (t.filledAt?.toISOString().slice(0, 10) ?? "") === tradeDate);

      for (const t of dayTrades) {
        const px = t.executedPrice ?? t.price;
        if (t.side === "BUY") {
          const ex = posState.get(t.symbol);
          if (ex) {
            const newQty = ex.qty + t.quantity;
            ex.cost = (ex.cost * ex.qty + px * t.quantity) / newQty;
            ex.qty = newQty;
          } else {
            posState.set(t.symbol, { qty: t.quantity, cost: px });
          }
        } else {
          const ex = posState.get(t.symbol);
          if (ex) {
            ex.qty -= t.quantity;
            if (ex.qty <= 0) posState.delete(t.symbol);
          }
        }
      }

      let dayValue = initCash;
      for (const [, pos] of posState) {
        dayValue += pos.cost * pos.qty;
      }
      const returnPct = ((dayValue / initCash) - 1) * 100;
      points.push({
        date: tradeDate,
        totalValue: Math.round(dayValue * 100) / 100,
        returnPct: Math.round(returnPct * 100) / 100,
      });
    }

    // Current point using real-time prices
    if (portfolio) {
      let curValue = portfolio.cash;
      const positions = await prisma.position.findMany({ where: { portfolioId: portfolio.id } });
      for (const pos of positions) {
        const curPx = priceMap.get(pos.symbol)?.price ?? pos.avgCost;
        curValue += curPx * pos.quantity;
      }
      const today = new Date().toISOString().slice(0, 10);
      const lastPt = points[points.length - 1];
      if (!lastPt || lastPt.date !== today) {
        const returnPct = ((curValue / initCash) - 1) * 100;
        points.push({
          date: today,
          totalValue: Math.round(curValue * 100) / 100,
          returnPct: Math.round(returnPct * 100) / 100,
        });
      }
    }

    return NextResponse.json({ agentId, points });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
