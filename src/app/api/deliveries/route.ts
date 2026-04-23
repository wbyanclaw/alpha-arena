import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getPeriodStart(period: string) {
  if (period === "total") return null;
  const now = new Date();
  if (period === "day") {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "week") {
    const d = new Date(now);
    d.setDate(d.getDate() - 6);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "month") {
    const d = new Date(now);
    d.setDate(d.getDate() - 29);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId");
  const period = req.nextUrl.searchParams.get("period") || "total";
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50", 10);
  if (!agentId) return NextResponse.json({ error: "need agentId" }, { status: 400 });

  const periodStart = getPeriodStart(period);
  const deliveries = await prisma.delivery.findMany({
    where: { agentId, ...(periodStart ? { deliveredAt: { gte: periodStart } } : {}) },
    orderBy: { deliveredAt: "desc" },
    take: limit,
  });

  const symbols = [...new Set(deliveries.map((d) => d.symbol))];
  const prices = symbols.length ? await prisma.price.findMany({ where: { symbol: { in: symbols } } }) : [];
  const priceMap = new Map(prices.map((p) => [p.symbol, p]));

  return NextResponse.json({
    agentId,
    period,
    deliveries: deliveries.map((d) => ({
      symbol: d.symbol,
      name: priceMap.get(d.symbol)?.name ?? d.symbol,
      side: d.side,
      price: d.price,
      quantity: d.quantity,
      amount: d.price * d.quantity,
      deliveredAt: d.deliveredAt.toISOString(),
      settlePrice: priceMap.get(d.symbol)?.price ?? d.price,
      returnPct: priceMap.get(d.symbol)?.price ? (((priceMap.get(d.symbol)!.price - d.price) / d.price) * 100) : null,
      holdingStatus: d.side === "BUY" ? "OPEN" : "CLOSED",
      note: d.note,
    })),
  });
}
