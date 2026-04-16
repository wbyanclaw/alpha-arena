import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/deliveries?agentId=xxx&period=total
export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId");
  const period = req.nextUrl.searchParams.get("period") || "total";
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50");

  if (!agentId) return NextResponse.json({ error: "need agentId" }, { status: 400 });

  try {
    // Period filter
    let periodStart: Date | null = null;
    if (period !== "total") {
      const now = new Date();
      if (period === "week") {
        const d = new Date(now); const day = d.getDay();
        d.setDate(d.getDate() - day + (day === 0 ? -6 : 1)); d.setHours(0,0,0,0);
        periodStart = d;
      } else if (period === "month") {
        const d = new Date(now); d.setDate(1); d.setHours(0,0,0,0);
        periodStart = d;
      } else if (period === "year") {
        periodStart = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
      }
    }

    const deliveries = await prisma.delivery.findMany({
      where: {
        agentId,
        ...(periodStart ? { deliveredAt: { gte: periodStart } } : {}),
      },
      orderBy: { deliveredAt: "desc" },
      take: limit,
    });

    if (deliveries.length === 0) {
      return NextResponse.json({ agentId, period, deliveries: [], realizedPct: 0 });
    }

    // Build cost basis map: keep running avg cost per symbol
    const prices = await prisma.price.findMany();
    const priceMap = new Map(prices.map(p => [p.symbol, p]));
    const symbolSet = new Set(deliveries.map(d => d.symbol));
    const symbolArr = [...symbolSet];

    const trades = await prisma.trade.findMany({
      where: { agentId, status: "FILLED", symbol: { in: symbolArr } },
      orderBy: { filledAt: "asc" },
    });

    // Build running cost per symbol as of each trade
    // costAt[symbol] = avgCost after processing all trades up to that point
    const costAt = new Map<string, { qty: number; cost: number }>();
    let lastCost = new Map<string, number>();

    for (const t of trades) {
      if (t.side === "BUY") {
        const prev = costAt.get(t.symbol) ?? { qty: 0, cost: 0 };
        const newQty = prev.qty + t.quantity;
        const newCost = (prev.cost * prev.qty + (t.executedPrice ?? t.price) * t.quantity) / newQty;
        costAt.set(t.symbol, { qty: newQty, cost: newCost });
        lastCost.set(t.symbol, newCost);
      } else {
        const prev = costAt.get(t.symbol) ?? { qty: 0, cost: 0 };
        const newQty = Math.max(0, prev.qty - t.quantity);
        costAt.set(t.symbol, { qty: newQty, cost: prev.cost });
        lastCost.set(t.symbol, prev.cost);
      }
    }

    // Current cost basis (for stocks still held)
    const currentCost = new Map<string, number>();
    for (const sym of symbolArr) {
      currentCost.set(sym, costAt.get(sym)?.cost ?? lastCost.get(sym) ?? 0);
    }

    const result = deliveries.map(d => {
      const priceInfo = priceMap.get(d.symbol);
      const cost = currentCost.get(d.symbol) ?? d.price;
      const curPrice = priceInfo?.price ?? d.price;

      return {
        ...d,
        name: priceInfo?.name ?? d.symbol,
        cost: Math.round(cost * 100) / 100,
        // BUY not yet sold: show current price; SELL: show selling price
        settlePrice: d.side === "SELL" ? d.price : curPrice,
        // For BUY: unrealized return; for SELL: realized return
        returnPct: d.side === "SELL"
          ? Math.round(((d.price - cost) / cost) * 10000) / 100
          : Math.round(((curPrice - cost) / cost) * 10000) / 100,
      };
    });

    return NextResponse.json({ agentId, period, deliveries: result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
