import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId");
  const period = req.nextUrl.searchParams.get("period") || "total";
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50");

  if (!agentId) return NextResponse.json({ error: "need agentId" }, { status: 400 });

  try {
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
      where: { agentId, ...(periodStart ? { deliveredAt: { gte: periodStart } } : {}) },
      orderBy: { deliveredAt: "desc" },
      take: limit,
    });

    if (deliveries.length === 0) {
      return NextResponse.json({ agentId, period, deliveries: [] });
    }

    const prices = await prisma.price.findMany();
    const priceMap = new Map(prices.map((p) => [p.symbol, p]));
    const chronological = [...deliveries].sort((a, b) => a.deliveredAt.getTime() - b.deliveredAt.getTime());
    const buyQueue = new Map<string, Array<{ price: number; qty: number }>>();

    const enriched = chronological.map((d) => {
      const curPrice = priceMap.get(d.symbol)?.price ?? d.price;

      if (d.side === "BUY") {
        const q = buyQueue.get(d.symbol) ?? [];
        q.push({ price: d.price, qty: d.quantity });
        buyQueue.set(d.symbol, q);
        return {
          symbol: d.symbol,
          name: priceMap.get(d.symbol)?.name ?? d.symbol,
          side: d.side,
          price: d.price,
          quantity: d.quantity,
          deliveredAt: d.deliveredAt,
          cost: Math.round(d.price * 100) / 100,
          settlePrice: Math.round(curPrice * 100) / 100,
          returnPct: curPrice > 0 ? Math.round(((curPrice - d.price) / d.price) * 10000) / 100 : null,
        };
      }

      const q = buyQueue.get(d.symbol) ?? [];
      let remain = d.quantity;
      const matched: Array<{ price: number; qty: number }> = [];
      while (remain > 0 && q.length > 0) {
        const b = q[0];
        const m = Math.min(remain, b.qty);
        matched.push({ price: b.price, qty: m });
        b.qty -= m;
        remain -= m;
        if (b.qty <= 0) q.shift();
      }
      buyQueue.set(d.symbol, q);
      const totalCost = matched.reduce((s, x) => s + x.price * x.qty, 0);
      const totalQty = matched.reduce((s, x) => s + x.qty, 0);
      const avgCost = totalQty > 0 ? totalCost / totalQty : d.price;

      return {
        symbol: d.symbol,
        name: priceMap.get(d.symbol)?.name ?? d.symbol,
        side: d.side,
        price: d.price,
        quantity: d.quantity,
        deliveredAt: d.deliveredAt,
        cost: Math.round(avgCost * 100) / 100,
        settlePrice: Math.round(d.price * 100) / 100,
        returnPct: avgCost > 0 ? Math.round(((d.price - avgCost) / avgCost) * 10000) / 100 : null,
      };
    }).reverse();

    return NextResponse.json({ agentId, period, deliveries: enriched });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
