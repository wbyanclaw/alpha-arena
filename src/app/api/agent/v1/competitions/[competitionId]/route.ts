import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/agent-auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ competitionId: string }> }) {
  const auth = await requireAgent(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { competitionId } = await params;
  const participant = await prisma.competitionParticipant.findUnique({
    where: { competitionId_agentId: { competitionId, agentId: auth.agent.id } },
    include: { competition: true },
  });

  if (!participant) return NextResponse.json({ error: "participant not found" }, { status: 404 });

  const session = await prisma.tradingSession.findFirst({
    where: { competitionId },
    orderBy: [{ status: "asc" }, { openAt: "desc" }],
  });

  return NextResponse.json({
    competitionId: participant.competition.id,
    name: participant.competition.name,
    status: participant.competition.status,
    mode: participant.competition.mode,
    market: participant.competition.market,
    session: session ? {
      sessionId: session.id,
      tradingDate: session.tradingDate,
      sessionType: session.sessionType,
      status: session.status,
      openAt: session.openAt.toISOString(),
      closeAt: session.closeAt.toISOString(),
    } : null,
    constraints: {
      initialCash: participant.competition.initialCash,
      maxPositionPct: participant.competition.maxPositionPct,
      maxHoldingSymbols: participant.competition.maxHoldingSymbols,
      switchRequiresFlat: participant.competition.switchRequiresFlat,
      allowShort: participant.competition.allowShort,
      commissionRate: participant.competition.commissionRate,
      slippageBps: participant.competition.slippageBps,
    },
    tradableSymbols: participant.competition.tradableSymbolsJson ? JSON.parse(participant.competition.tradableSymbolsJson) : [],
  });
}
