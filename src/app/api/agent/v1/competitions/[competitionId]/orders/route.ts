import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/agent-auth";
import { writeSettlementSnapshot, appendEventFeed } from "@/lib/snapshots";
import { isSessionOpen, isSameSymbolHolding } from "@/lib/trading-session";
import type { Position, TradeSide } from "@/generated/prisma";

function getPosition(positions: Position[], symbol: string) {
  return positions.find((item) => item.symbol === symbol) ?? null;
}

function isLotSizeValid(side: TradeSide, quantity: number, positionQty = 0) {
  if (side === "BUY") return quantity % 100 === 0;
  if (positionQty === quantity) return true;
  return quantity % 100 === 0;
}

function startOfToday() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ competitionId: string }> }) {
  const auth = await requireAgent(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { competitionId } = await params;
  const participant = await prisma.competitionParticipant.findUnique({
    where: { competitionId_agentId: { competitionId, agentId: auth.agent.id } },
  });
  if (!participant) return NextResponse.json({ error: "participant not found" }, { status: 404 });

  const orders = await prisma.order.findMany({
    where: { competitionId, participantId: participant.id },
    orderBy: { submittedAt: "desc" },
    take: 100,
  });

  return NextResponse.json({
    competitionId,
    items: orders.map((order) => ({
      id: order.id,
      symbol: order.symbol,
      side: order.side,
      quantity: order.quantity,
      status: order.status,
      intent: order.intent,
      riskCheckStatus: order.riskCheckStatus,
      riskRejectCode: order.riskRejectCode,
      note: order.note,
      submittedAt: order.submittedAt.toISOString(),
      matchedAt: order.matchedAt?.toISOString() ?? null,
    })),
  });
}

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
  const currentPosition = getPosition(portfolio.positions, symbol);
  const latestPrice = await prisma.price.findUnique({ where: { symbol } });
  const effectivePrice = latestPrice?.price ?? currentPosition?.currentPrice ?? currentPosition?.avgCost ?? 0;

  if (effectivePrice <= 0) {
    return NextResponse.json({ error: "price unavailable for symbol", riskRejectCode: "PRICE_UNAVAILABLE" }, { status: 409 });
  }

  if (side === "BUY") {
    if (holdingCount > 0 && holdingSymbol && !isSameSymbolHolding(holdingSymbol, symbol)) {
      return NextResponse.json({ error: "must flat existing holding before buying a new symbol", riskRejectCode: "SWITCH_REQUIRES_FLAT" }, { status: 409 });
    }

    if (!isLotSizeValid(side, quantity)) {
      return NextResponse.json({ error: "buy quantity must be in lots of 100 shares", riskRejectCode: "INVALID_LOT_SIZE" }, { status: 409 });
    }

    const estimatedCost = effectivePrice * quantity;
    if (portfolio.cash < estimatedCost) {
      return NextResponse.json({ error: "insufficient cash", riskRejectCode: "INSUFFICIENT_CASH" }, { status: 409 });
    }
  }

  if (side === "SELL") {
    if (!holdingSymbol || !isSameSymbolHolding(holdingSymbol, symbol)) {
      return NextResponse.json({ error: "no holding for sell symbol", riskRejectCode: "HOLDING_SYMBOL_CONFLICT" }, { status: 409 });
    }

    if (!currentPosition || currentPosition.quantity < quantity) {
      return NextResponse.json({ error: "insufficient position quantity", riskRejectCode: "INSUFFICIENT_POSITION" }, { status: 409 });
    }

    if (!isLotSizeValid(side, quantity, currentPosition.quantity)) {
      return NextResponse.json({ error: "sell quantity must be in lots of 100 shares unless fully closing position", riskRejectCode: "INVALID_LOT_SIZE" }, { status: 409 });
    }

    if (currentPosition.boughtAt >= startOfToday()) {
      return NextResponse.json({ error: "t+1 restriction, cannot sell same-day bought shares", riskRejectCode: "TPLUS1_RESTRICTED" }, { status: 409 });
    }
  }

  const intent = side === "SELL" ? "CLOSE" : "OPEN";
  const matchedAt = new Date();
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
      status: "FILLED",
      matchedAt,
    },
  });

  await prisma.trade.create({
    data: {
      agentId: auth.agent.id,
      symbol,
      side,
      quantity,
      price: effectivePrice,
      status: "FILLED",
      filledAt: matchedAt,
      executedPrice: effectivePrice,
      note: body?.note,
      netAmount: effectivePrice * quantity,
    },
  });

  if (side === "BUY") {
    const nextQty = (currentPosition?.quantity ?? 0) + quantity;
    const nextCost = (((currentPosition?.avgCost ?? 0) * (currentPosition?.quantity ?? 0)) + effectivePrice * quantity) / nextQty;
    if (currentPosition) {
      await prisma.position.update({
        where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol } },
        data: { quantity: nextQty, avgCost: nextCost, currentPrice: effectivePrice },
      });
    } else {
      await prisma.position.create({
        data: { portfolioId: portfolio.id, symbol, quantity, avgCost: effectivePrice, currentPrice: effectivePrice },
      });
    }

    await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: {
        cash: { decrement: effectivePrice * quantity },
        holdingSymbol: symbol,
        holdingCount: 1,
      },
    });
  } else {
    const remainingQty = (currentPosition?.quantity ?? 0) - quantity;
    if (remainingQty <= 0) {
      await prisma.position.delete({ where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol } } });
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: {
          cash: { increment: effectivePrice * quantity },
          holdingSymbol: null,
          holdingCount: 0,
        },
      });
    } else {
      await prisma.position.update({
        where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol } },
        data: { quantity: remainingQty, currentPrice: effectivePrice },
      });
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { cash: { increment: effectivePrice * quantity } },
      });
    }
  }

  await writeSettlementSnapshot({
    competitionId,
    portfolioId: portfolio.id,
    participantId: participant.id,
    tradingSessionId: session?.id,
  });

  await appendEventFeed({
    competitionId,
    tradingSessionId: session?.id,
    participantId: participant.id,
    agentId: auth.agent.id,
    eventType: side === "BUY" ? "ORDER_FILLED_BUY" : "ORDER_FILLED_SELL",
    title: `${side} ${symbol}`,
    summary: `${auth.agent.name} ${side} ${symbol} ${quantity}股，成交价 ${effectivePrice.toFixed(2)}`,
    payload: { orderId: order.id, symbol, side, quantity, price: effectivePrice },
  });

  return NextResponse.json({
    accepted: true,
    orderId: order.id,
    status: order.status,
    riskCheckStatus: order.riskCheckStatus,
    matchedAt: matchedAt.toISOString(),
    price: effectivePrice,
  });
}
