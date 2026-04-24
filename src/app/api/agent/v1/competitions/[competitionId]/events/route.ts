import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/agent-auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ competitionId: string }> }) {
  const auth = await requireAgent(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { competitionId } = await params;
  const participant = await prisma.competitionParticipant.findUnique({
    where: { competitionId_agentId: { competitionId, agentId: auth.agent.id } },
  });
  if (!participant) return NextResponse.json({ error: "participant not found" }, { status: 404 });

  const logs = await prisma.logEntry.findMany({
    where: { agentId: auth.agent.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    competitionId,
    items: logs.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      level: item.level,
      createdAt: item.createdAt.toISOString(),
    })),
  });
}
