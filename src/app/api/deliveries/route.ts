import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const lobsterKey = req.nextUrl.searchParams.get("lobsterKey");
  const competitionId = req.nextUrl.searchParams.get("competitionId");
  const period = req.nextUrl.searchParams.get("period") || "total"; // total | week | month
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "30");

  if (!lobsterKey) {
    return NextResponse.json({ error: "missing lobsterKey" }, { status: 400 });
  }

  try {
    // Find lobster by key name
    const lobster = await prisma.lobster.findUnique({ where: { key: lobsterKey as any } });
    if (!lobster) {
      return NextResponse.json({ error: "lobster not found" }, { status: 404 });
    }

    // Find agent linked to this lobster
    const agent = await prisma.agent.findFirst({ where: { id: lobster.id } });
    if (!agent) {
      return NextResponse.json({ error: "no agent linked to this lobster" }, { status: 404 });
    }

    // Compute period start
    const now = new Date();
    let periodStart: Date | null = null;
    if (period === "week") {
      const d = new Date(now);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      d.setDate(diff); d.setHours(0, 0, 0, 0);
      periodStart = d;
    } else if (period === "month") {
      const d = new Date(now);
      d.setDate(1); d.setHours(0, 0, 0, 0);
      periodStart = d;
    }

    // Build date filter
    const dateFilter = periodStart ? { gte: periodStart } : undefined;

    const deliveries = await prisma.delivery.findMany({
      where: {
        lobsterId: agent.id,
        ...(dateFilter ? { deliveredAt: dateFilter } : {}),
      },
      orderBy: { deliveredAt: "desc" },
      take: limit,
    });

    // Also get trades for the agent to compute period return
    const trades = await prisma.trade.findMany({
      where: {
        agentId: agent.id,
        status: "FILLED",
        ...(dateFilter ? { filledAt: dateFilter } : {}),
      },
      orderBy: { filledAt: "asc" },
    });

    // Compute period return
    let periodReturn = 0;
    let simCash = 1000000;
    let simPosition = 0;
    let simAvgCost = 0;
    let lastPrice = 0;

    for (const t of trades) {
      lastPrice = t.executedPrice ?? 0;
      if (t.side === "BUY" && simPosition === 0) {
        simPosition = t.quantity;
        simAvgCost = t.executedPrice ?? 0;
        simCash -= t.executedPrice ?? 0 * t.quantity + (t.commission ?? 0) + (t.transferFee ?? 0);
      } else if (t.side === "SELL" && simPosition > 0) {
        simCash += t.executedPrice ?? 0 * t.quantity - (t.commission ?? 0) - (t.stampTax ?? 0) - (t.transferFee ?? 0);
        simPosition = 0;
        simAvgCost = 0;
      }
    }

    const finalValue = simCash + simPosition * lastPrice;
    periodReturn = ((finalValue / 1000000) - 1) * 100;

    return NextResponse.json({
      lobster: { key: lobster.key, name: lobster.name },
      period,
      periodReturn: Math.round(periodReturn * 100) / 100,
      tradesCount: trades.length,
      deliveries,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
