import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/portfolio/sync — 刷新所有 portfolio 的 totalAsset 和收益率
// 建议每分钟由外部 cron 调用一次
export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: { positions: true, competition: true },
    });

    let updated = 0;
    for (const portfolio of portfolios) {
      if (portfolio.competition.status !== "RUNNING") continue;

      const enrichedPositions = await Promise.all(
        portfolio.positions.map(async (pos) => {
          const priceRec = await prisma.price.findUnique({ where: { symbol: pos.symbol } });
          return { ...pos, currentPrice: priceRec?.price ?? pos.avgCost };
        })
      );

      const positionValue = enrichedPositions.reduce((s, p) => s + p.currentPrice * p.quantity, 0);
      const totalAsset = portfolio.cash + positionValue;

      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { totalValue: totalAsset },
      });
      updated++;
    }

    return NextResponse.json({ success: true, updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "同步失败" }, { status: 500 });
  }
}
