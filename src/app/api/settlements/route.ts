import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/settlements?agentId=xxx&limit=90
export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "90");

  if (!agentId) return NextResponse.json({ error: "need agentId" }, { status: 400 });

  try {
    const portfolio = await prisma.portfolio.findFirst({ where: { agentId } });
    let settlements: Array<{ date: string; totalValue: number; returnPct: number }> = [];

    if (portfolio) {
      const rows = await prisma.dailySettlement.findMany({
        where: { portfolioId: portfolio.id },
        orderBy: { date: "asc" },
        take: limit,
      });
      settlements = rows
        .filter(s => s.totalValue > 0)
        .map(s => ({ date: s.date, totalValue: s.totalValue, returnPct: s.returnPct }));
    }

    // 如果只有历史快照，补一个今日点（用实时价格）
    const today = new Date().toISOString().slice(0, 10);
    const lastSettlement = settlements[settlements.length - 1];
    if (!lastSettlement || lastSettlement.date !== today) {
      // 从 trade 重建当前组合
      const trades = await prisma.trade.findMany({
        where: { agentId, status: "FILLED" },
        orderBy: { filledAt: "asc" },
      });
      const prices = await prisma.price.findMany();
      const priceMap = new Map(prices.map(p => [p.symbol, p]));

      let simCash = 1000000;
      const posMap = new Map<string, { qty: number; cost: number }>();

      for (const t of trades) {
        const px = t.executedPrice ?? t.price;
        if (t.side === "BUY") {
          const ex = posMap.get(t.symbol);
          if (ex) {
            const newQty = ex.qty + t.quantity;
            ex.cost = (ex.cost * ex.qty + px * t.quantity) / newQty;
            ex.qty = newQty;
          } else {
            posMap.set(t.symbol, { qty: t.quantity, cost: px });
          }
        } else {
          const ex = posMap.get(t.symbol);
          if (ex) { ex.qty -= t.quantity; if (ex.qty <= 0) posMap.delete(t.symbol); }
        }
      }

      // 计算当前总市值
      let curValue = simCash;
      for (const [sym, pos] of posMap) {
        const curPx = priceMap.get(sym)?.price ?? pos.cost;
        curValue += curPx * pos.qty;
      }

      const todayReturn = ((curValue / 1000000) - 1) * 100;
      settlements.push({
        date: today,
        totalValue: Math.round(curValue * 100) / 100,
        returnPct: Math.round(todayReturn * 100) / 100,
      });
    }

    return NextResponse.json({ agentId, points: settlements });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
