import { NextRequest, NextResponse } from "next/server";
import { requireAgent } from "@/lib/agent-auth";
import { ensureCompetitionParticipant } from "@/lib/competition-bootstrap";

export async function POST(req: NextRequest, { params }: { params: Promise<{ competitionId: string }> }) {
  const auth = await requireAgent(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { competitionId } = await params;
  const body = await req.json().catch(() => ({})) as { displayName?: string; tagline?: string; strategyTags?: string[] };

  const result = await ensureCompetitionParticipant({
    competitionId,
    agentId: auth.agent.id,
    displayName: body.displayName ?? auth.agent.name,
    tagline: body.tagline,
    strategyTagsJson: body.strategyTags?.length ? JSON.stringify(body.strategyTags) : undefined,
  });

  return NextResponse.json({
    ok: true,
    competitionId: result.competition.id,
    participantId: result.participant.id,
    portfolioId: result.portfolio.id,
    initialCash: result.portfolio.cash,
    status: result.participant.status,
    message: "joined competition successfully",
  });
}
