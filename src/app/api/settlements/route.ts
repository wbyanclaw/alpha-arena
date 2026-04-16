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

    // 用 portfolio 真实持仓 + 实时价格，生成今日数据点
    const today = new Date().toISOString().slice(0, 10);
    const lastSettlement = settlements[settlements.length - 1];

    if (portfolio) {
      const prices = await prisma.price.findMany();
      const priceMap = new Map(prices.map(p => [p.symbol, p]));

      let curValue = portfolio.cash;
      const positions = await prisma.position.findMany({ where: { portfolioId: portfolio.id } });
      for (const pos of positions) {
        const curPx = priceMap.get(pos.symbol)?.price ?? pos.avgCost;
        curValue += curPx * pos.quantity;
      }

      const todayReturn = ((curValue / portfolio.totalValue) - 1) * 100;
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
