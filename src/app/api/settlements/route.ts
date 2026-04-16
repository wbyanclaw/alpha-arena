import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId");
  if (!agentId) return NextResponse.json({ error: "need agentId" }, { status: 400 });

  try {
    const portfolio = await prisma.portfolio.findFirst({ where: { agentId } });
    const prices = await prisma.price.findMany();
    const priceMap = new Map(prices.map(p => [p.symbol, p.price]));
    const initCash = 1000000;

    const deliveries = await prisma.delivery.findMany({
      where: { agentId },
      orderBy: { deliveredAt: "asc" },
    });

    if (deliveries.length === 0) {
      return NextResponse.json({ agentId, points: [] });
    }

    const posState = new Map<string, { qty: number; cost: number }>();
    const points: Array<{ date: string; totalValue: number; returnPct: number }> = [];

    for (const d of deliveries) {
      const date = d.deliveredAt.toISOString().slice(0, 10);
      const px = d.price;

      if (d.side === "BUY") {
        const ex = posState.get(d.symbol);
        if (ex) {
          const newQty = ex.qty + d.quantity;
          ex.cost = (ex.cost * ex.qty + px * d.quantity) / newQty;
          ex.qty = newQty;
        } else {
          posState.set(d.symbol, { qty: d.quantity, cost: px });
        }
      } else {
        const ex = posState.get(d.symbol);
        if (ex) { ex.qty -= d.quantity; if (ex.qty <= 0) posState.delete(d.symbol); }
      }

      let dayValue = initCash;
      for (const [, pos] of posState) dayValue += pos.cost * pos.qty;
      points.push({
        date,
        totalValue: Math.round(dayValue * 100) / 100,
        returnPct: Math.round(((dayValue / initCash - 1) * 10000) / 100),
      });
    }

    // Current point
    if (portfolio) {
      const positions = await prisma.position.findMany({ where: { portfolioId: portfolio.id } });
      let curValue = portfolio.cash;
      for (const pos of positions) {
        const curPx = priceMap.get(pos.symbol) ?? pos.avgCost;
        curValue += curPx * pos.quantity;
      }
      const today = new Date().toISOString().slice(0, 10);
      const last = points[points.length - 1];
      if (!last || last.date !== today) {
        points.push({
          date: today,
          totalValue: Math.round(curValue * 100) / 100,
          returnPct: Math.round(((curValue / initCash - 1) * 10000) / 100),
        });
      }
    }

    return NextResponse.json({ agentId, points });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
