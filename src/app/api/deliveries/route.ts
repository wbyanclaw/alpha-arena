import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getPeriodStart(period: string): Date | null {
  const now = new Date();
  if (period === "week") {
    const d = new Date(now);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff); d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "month") {
    const d = new Date(now);
    d.setDate(1); d.setHours(0, 0, 0, 0);
    return d;
  }
  return null;
}

// GET /api/deliveries?lobsterKey=RED&period=total
export async function GET(req: NextRequest) {
  const lobsterKey = req.nextUrl.searchParams.get("lobsterKey");
  const period = req.nextUrl.searchParams.get("period") || "total";
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "30");

  if (!lobsterKey) {
    return NextResponse.json({ error: "missing lobsterKey" }, { status: 400 });
  }

  try {
    // 1. 找到这只龙虾
    const lobster = await prisma.lobster.findUnique({ where: { key: lobsterKey as any } });
    if (!lobster) return NextResponse.json({ error: "lobster not found" }, { status: 404 });

    // 2. 通过龙虾关联的 agent 查交割单
    const agentId = lobster.agentId;
    if (!agentId) {
      return NextResponse.json({ error: "this lobster has no linked agent" }, { status: 404 });
    }

    // 3. 计算 period 起始
    const periodStart = getPeriodStart(period);
    const now = new Date();

    // 4. 查询交割单
    const deliveries = await prisma.delivery.findMany({
      where: {
        agentId,
        ...(periodStart ? { deliveredAt: { gte: periodStart } } : {}),
      },
      orderBy: { deliveredAt: "desc" },
      take: limit,
    });

    // 5. 计算 period 收益率
    const trades = await prisma.trade.findMany({
      where: {
        agentId,
        status: "FILLED",
        ...(periodStart ? { filledAt: { gte: periodStart } } : {}),
      },
      orderBy: { filledAt: "asc" },
    });

    let simCash = 1000000;
    let simPosition = 0;
    let simAvgCost = 0;
    let lastPrice = 0;
    let periodReturn = 0;

    for (const t of trades) {
      const px = t.executedPrice ?? 0;
      lastPrice = px;
      if (t.side === "BUY" && simPosition === 0) {
        simPosition = t.quantity;
        simAvgCost = px;
        simCash -= px * t.quantity + (t.commission ?? 0) + (t.transferFee ?? 0);
      } else if (t.side === "SELL" && simPosition > 0) {
        simCash += px * t.quantity - (t.commission ?? 0) - (t.stampTax ?? 0) - (t.transferFee ?? 0);
        simPosition = 0;
        simAvgCost = 0;
      }
    }

    const finalValue = simCash + simPosition * lastPrice;
    periodReturn = ((finalValue / 1000000) - 1) * 100;

    return NextResponse.json({
      lobster: { key: lobster.key, name: lobster.name },
      agentId,
      period,
      periodReturn: Math.round(periodReturn * 100) / 100,
      periodStart: periodStart?.toISOString() ?? null,
      tradesCount: trades.length,
      deliveries,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
