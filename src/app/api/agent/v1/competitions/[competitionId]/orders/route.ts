import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/agent-auth";
import { isSessionOpen, isSameSymbolHolding } from "@/lib/trading-session";
import type { TradeSide } from "@/generated/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ competitionId: string }> }) {
  const auth = await requireAgent(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { competitionId } = await params;
  const body = await req.json().catch(() => null) as null | { symbol?: string; side?: TradeSide; quantity?: number; note?: string };
  const symbol = body?.symbol?.trim();
  const side = body?.side;
  const quantity = Number(body?.quantity ?? 0);

  if (!symbol || !side || !Number.isFinite(quantity) || quantity <= 0) {
    return NextResponse.json({ error: "invalid order payload" }, { status: 400 });
  }

  const participant = await prisma.competitionParticipant.findUnique({
    where: { competitionId_agentId: { competitionId, agentId: auth.agent.id } },
    include: { competition: true, portfolio: { include: { positions: true } } },
  });

  if (!participant?.portfolio) {
    return NextResponse.json({ error: "participant portfolio not found" }, { status: 404 });
  }

  const session = await prisma.tradingSession.findFirst({
    where: { competitionId, status: "OPEN" },
    orderBy: { openAt: "desc" },
  });

  if (!isSessionOpen(session)) {
    return NextResponse.json({ error: "outside trading session", riskRejectCode: "OUTSIDE_TRADING_SESSION" }, { status: 409 });
  }

  const portfolio = participant.portfolio;
  const holdingSymbol = portfolio.holdingSymbol;
  const holdingCount = portfolio.holdingCount;

  if (side === "BUY") {
    if (holdingCount > 0 && holdingSymbol && !isSameSymbolHolding(holdingSymbol, symbol)) {
      return NextResponse.json({ error: "must flat existing holding before buying a new symbol", riskRejectCode: "SWITCH_REQUIRES_FLAT" }, { status: 409 });
    }
  }

  if (side === "SELL") {
    if (!holdingSymbol || !isSameSymbolHolding(holdingSymbol, symbol)) {
      return NextResponse.json({ error: "no holding for sell symbol", riskRejectCode: "HOLDING_SYMBOL_CONFLICT" }, { status: 409 });
    }
  }

  const intent = side === "BUY" ? (holdingSymbol && holdingSymbol === symbol ? "OPEN" : "OPEN") : "CLOSE";
  const order = await prisma.order.create({
    data: {
      agentId: auth.agent.id,
      competitionId,
      portfolioId: portfolio.id,
      participantId: participant.id,
      tradingSessionId: session?.id,
      symbol,
      side,
      quantity,
      note: body?.note,
      intent,
      riskCheckStatus: "PASSED",
      status: "PENDING",
    },
  });

  return NextResponse.json({
    accepted: true,
    orderId: order.id,
    status: order.status,
    riskCheckStatus: order.riskCheckStatus,
    submittedAt: order.submittedAt.toISOString(),
  });
}
