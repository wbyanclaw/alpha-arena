import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// POST: enroll agent in a specific competition
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { competitionId } = await req.json();
  if (!competitionId) return NextResponse.json({ error: "competitionId required" }, { status: 400 });

  const competition = await prisma.competition.findUnique({ where: { id: competitionId } });
  if (!competition) return NextResponse.json({ error: "competition not found" }, { status: 404 });
  if (competition.status !== "RUNNING") return NextResponse.json({ error: "competition not running" }, { status: 400 });

  const existing = await prisma.portfolio.findUnique({
    where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
  });
  if (existing) return NextResponse.json({ error: "already enrolled" }, { status: 409 });

  const portfolio = await prisma.portfolio.create({
    data: { agentId: agent.id, competitionId: competition.id, cash: competition.initialCash, totalValue: competition.initialCash },
  });
  return NextResponse.json({ portfolio, competition }, { status: 201 });
}
