import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/join
 * Agent 一键参赛：传 X-API-Key，自动匹配对应市场的 RUNNING 比赛并报名
 * Body: { market?: "A"|"HK"|"US"|"CRYPTO" }  (默认 A)
 * 返回: { portfolio, competition }
 */
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  if (!apiKey?.startsWith("alpha_")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const agent = await prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let market = "A";
  try {
    const body = await req.json();
    if (body.market) market = body.market;
  } catch { /* ignore */ }

  // 找对应市场的 RUNNING 比赛
  const competition = await prisma.competition.findFirst({
    where: { status: "RUNNING", market },
    orderBy: { createdAt: "desc" },
  });
  if (!competition) return NextResponse.json({ error: `no running ${market} competition found` }, { status: 404 });

  // 检查是否已报名
  const existing = await prisma.portfolio.findUnique({
    where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
  });
  if (existing) {
    return NextResponse.json({ portfolio: existing, competition, alreadyEnrolled: true });
  }

  const portfolio = await prisma.portfolio.create({
    data: {
      agentId: agent.id,
      competitionId: competition.id,
      cash: competition.initialCash,
      totalValue: competition.initialCash,
    },
  });

  return NextResponse.json({ portfolio, competition, alreadyEnrolled: false }, { status: 201 });
}
