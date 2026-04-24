import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/agent-auth";
import { ensureCompetitionParticipant } from "@/lib/competition-bootstrap";

export async function POST(req: NextRequest) {
  const auth = await requireAgent(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => ({})) as { competitionId?: string; market?: string; displayName?: string; tagline?: string; strategyTags?: string[] };
  const competition = body.competitionId
    ? await prisma.competition.findUnique({ where: { id: body.competitionId } })
    : await prisma.competition.findFirst({ where: { market: body.market ?? auth.agent.market ?? "A", status: { in: ["PENDING", "RUNNING", "PAUSED"] } }, orderBy: { createdAt: "desc" } });

  if (!competition) return NextResponse.json({ error: "no available competition found" }, { status: 404 });

  const result = await ensureCompetitionParticipant({
    competitionId: competition.id,
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
    status: result.participant.status,
    initialCash: result.portfolio.cash,
    message: "one-click joined competition",
  });
}
