import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/deliveries?lobsterKey=RED&period=total
// 或 GET /api/deliveries?agentId=xxx
export async function GET(req: NextRequest) {
  const lobsterKey = req.nextUrl.searchParams.get("lobsterKey");
  const agentIdParam = req.nextUrl.searchParams.get("agentId");
  const period = req.nextUrl.searchParams.get("period") || "total";
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "30");

  try {
    let agentId: string | null = null;

    if (agentIdParam) {
      agentId = agentIdParam;
    } else if (lobsterKey) {
      const lobster = await prisma.lobster.findUnique({ where: { key: lobsterKey as any } });
      if (!lobster) return NextResponse.json({ error: "lobster not found" }, { status: 404 });
      agentId = lobster.agentId;
    } else {
      return NextResponse.json({ error: "lobsterKey or agentId required" }, { status: 400 });
    }

    if (!agentId) return NextResponse.json({ error: "no linked agent" }, { status: 404 });

    // Period filter
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
      } else if (period === "season") {
        const d = new Date(now); const q = Math.floor(d.getMonth()/3);
        d.setMonth(q*3, 1); d.setHours(0,0,0,0);
        periodStart = d;
      } else if (period === "year") {
        periodStart = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
      }
    }

    const deliveries = await prisma.delivery.findMany({
      where: {
        agentId,
        ...(periodStart ? { deliveredAt: { gte: periodStart } } : {}),
      },
      orderBy: { deliveredAt: "desc" },
      take: limit,
    });

    // Compute period return from trades
    const trades = await prisma.trade.findMany({
      where: {
        agentId,
        status: "FILLED",
        ...(periodStart ? { filledAt: { gte: periodStart } } : {}),
      },
      orderBy: { filledAt: "asc" },
    });

    let simCash = 1000000, simPos = 0, lastPx = 0;
    for (const t of trades) {
      const px = t.executedPrice ?? 0; lastPx = px;
      if (t.side === "BUY" && simPos === 0) {
        simPos = t.quantity; simCash -= px * t.quantity + (t.commission ?? 0) + (t.transferFee ?? 0);
      } else if (t.side === "SELL" && simPos > 0) {
        simCash += px * t.quantity - (t.commission ?? 0) - (t.stampTax ?? 0) - (t.transferFee ?? 0);
        simPos = 0;
      }
    }
    const periodReturn = ((simCash + simPos * lastPx) / 1000000 - 1) * 100;

    // Get lobster info if available
    let lobster = null;
    if (lobsterKey) {
      lobster = await prisma.lobster.findUnique({ where: { key: lobsterKey as any } });
    } else {
      const all = await prisma.lobster.findMany({ where: { agentId } });
      lobster = all[0] ?? null;
    }

    return NextResponse.json({
      lobster: lobster ? { key: lobster.key, name: lobster.name, color: lobster.color } : null,
      agentId,
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
