import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getPeriodStart(period: string) {
  if (period === "total") return null;
  const now = new Date();
  if (period === "week") {
    const d = new Date(now);
    const day = d.getDay();
    d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "month") {
    const d = new Date(now);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "year") {
    return new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  }
  return null;
}

export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId");
  const period = req.nextUrl.searchParams.get("period") || "total";
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50");

  if (!agentId) return NextResponse.json({ error: "need agentId" }, { status: 400 });

  try {
    const periodStart = getPeriodStart(period);
    const deliveries = await prisma.delivery.findMany({
      where: { agentId, ...(periodStart ? { deliveredAt: { gte: periodStart } } : {}) },
      orderBy: { deliveredAt: "desc" },
      take: limit,
    });

    if (deliveries.length === 0) {
      return NextResponse.json({ agentId, period, deliveries: [] });
    }

    const symbols = [...new Set(deliveries.map((d) => d.symbol))];
    const [prices, trades] = await Promise.all([
      prisma.price.findMany({ where: { symbol: { in: symbols } } }),
      prisma.trade.findMany({
        where: {
          agentId,
          status: "FILLED",
          ...(periodStart ? { filledAt: { gte: periodStart } } : {}),
        },
        orderBy: { filledAt: "asc" },
      }),
    ]);

    const priceMap = new Map(prices.map((p) => [p.symbol, p]));
    const tradeKey = (symbol: string, side: string, quantity: number, price: number, deliveredAt: Date) =>
      `${symbol}|${side}|${quantity}|${price.toFixed(4)}|${deliveredAt.toISOString().slice(0, 19)}`;
    const tradeMap = new Map(
      trades
        .filter((t) => t.filledAt)
        .map((t) => [tradeKey(t.symbol, t.side, t.quantity, t.executedPrice ?? t.price, t.filledAt!), t]),
    );

    const chronological = [...deliveries].sort((a, b) => a.deliveredAt.getTime() - b.deliveredAt.getTime());
    const buyQueue = new Map<string, Array<{ price: number; qty: number; feePerShare: number }>>();

    const enriched = chronological.map((d) => {
      const matchedTrade = tradeMap.get(tradeKey(d.symbol, d.side, d.quantity, d.price, d.deliveredAt));
      const amount = d.price * d.quantity;
      const commission = matchedTrade?.commission ?? null;
      const stampTax = matchedTrade?.stampTax ?? null;
      const transferFee = matchedTrade?.transferFee ?? null;
      const totalFee = (commission ?? 0) + (stampTax ?? 0) + (transferFee ?? 0);
      const curPrice = priceMap.get(d.symbol)?.price ?? d.price;

      if (d.side === "BUY") {
        const feePerShare = d.quantity > 0 ? totalFee / d.quantity : 0;
        const q = buyQueue.get(d.symbol) ?? [];
        q.push({ price: d.price, qty: d.quantity, feePerShare });
        buyQueue.set(d.symbol, q);

        return {
          symbol: d.symbol,
          name: priceMap.get(d.symbol)?.name ?? d.symbol,
          side: d.side,
          price: Math.round(d.price * 100) / 100,
          quantity: d.quantity,
          amount: Math.round(amount * 100) / 100,
          deliveredAt: d.deliveredAt,
          commission,
          stampTax,
          transferFee,
          totalFee: Math.round(totalFee * 100) / 100,
          avgCost: Math.round((d.price + feePerShare) * 100) / 100,
          matchedAvgCost: null,
          settlePrice: Math.round(curPrice * 100) / 100,
          returnPct: curPrice > 0 ? Math.round((((curPrice - d.price - feePerShare) / (d.price + feePerShare)) * 100) * 100) / 100 : null,
          holdingStatus: "OPEN",
          note: d.note ?? matchedTrade?.note ?? null,
        };
      }

      const q = buyQueue.get(d.symbol) ?? [];
      let remain = d.quantity;
      const matched: Array<{ price: number; qty: number; feePerShare: number }> = [];
      while (remain > 0 && q.length > 0) {
        const b = q[0];
        const m = Math.min(remain, b.qty);
        matched.push({ price: b.price, qty: m, feePerShare: b.feePerShare });
        b.qty -= m;
        remain -= m;
        if (b.qty <= 0) q.shift();
      }
      buyQueue.set(d.symbol, q);

      const matchedCost = matched.reduce((s, x) => s + (x.price + x.feePerShare) * x.qty, 0);
      const totalQty = matched.reduce((s, x) => s + x.qty, 0);
      const avgCost = totalQty > 0 ? matchedCost / totalQty : d.price;
      const sellNetPrice = d.quantity > 0 ? (amount - totalFee) / d.quantity : d.price;

      return {
        symbol: d.symbol,
        name: priceMap.get(d.symbol)?.name ?? d.symbol,
        side: d.side,
        price: Math.round(d.price * 100) / 100,
        quantity: d.quantity,
        amount: Math.round(amount * 100) / 100,
        deliveredAt: d.deliveredAt,
        commission,
        stampTax,
        transferFee,
        totalFee: Math.round(totalFee * 100) / 100,
        avgCost: null,
        matchedAvgCost: Math.round(avgCost * 100) / 100,
        settlePrice: Math.round(sellNetPrice * 100) / 100,
        returnPct: avgCost > 0 ? Math.round((((sellNetPrice - avgCost) / avgCost) * 100) * 100) / 100 : null,
        holdingStatus: remain > 0 ? "UNMATCHED" : "CLOSED",
        note: d.note ?? matchedTrade?.note ?? null,
      };
    }).reverse();

    return NextResponse.json({ agentId, period, deliveries: enriched });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
