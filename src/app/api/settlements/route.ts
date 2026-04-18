import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getPeriodStart(period: string): Date | null {
  const now = new Date();
  if (period === "week") {
    const d = new Date(now);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "month") {
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  }
  if (period === "season") {
    const d = new Date(now);
    const q = Math.floor(d.getMonth() / 3);
    d.setMonth(q * 3, 1);
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
  if (!agentId) return NextResponse.json({ error: "need agentId" }, { status: 400 });

  try {
    const portfolio = await prisma.portfolio.findFirst({
      where: { agentId },
      orderBy: { createdAt: "desc" },
      include: { competition: true },
    });
    if (!portfolio) return NextResponse.json({ agentId, period, points: [] });

    const periodStart = getPeriodStart(period);
    const settlements = await prisma.dailySettlement.findMany({
      where: {
        portfolioId: portfolio.id,
        ...(periodStart ? { date: { gte: periodStart.toISOString().slice(0, 10) } } : {}),
      },
      orderBy: { date: "asc" },
    });

    const points = settlements.map((item) => ({
      date: item.date,
      totalValue: Math.round(item.totalValue * 100) / 100,
      returnPct: Math.round(item.returnPct * 100) / 100,
    }));

    if (points.length === 0) {
      return NextResponse.json({
        agentId,
        period,
        points: [
          {
            date: new Date().toISOString().slice(0, 10),
            totalValue: Math.round(portfolio.totalValue * 100) / 100,
            returnPct: Math.round((((portfolio.totalValue / portfolio.competition.initialCash) - 1) * 100) * 100) / 100,
          },
        ],
      });
    }

    return NextResponse.json({ agentId, period, points });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed: " + String(e) }, { status: 500 });
  }
}
