import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// GET /api/account
export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const competitionId = req.nextUrl.searchParams.get("competitionId");
  const competition = competitionId
    ? await prisma.competition.findUnique({ where: { id: competitionId } })
    : await prisma.competition.findFirst({ where: { status: "RUNNING" }, orderBy: { createdAt: "desc" } });

  if (!competition) return NextResponse.json({ error: "no competition found" }, { status: 404 });

  const portfolio = await prisma.portfolio.findUnique({
    where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
    include: { positions: true },
  });
  if (!portfolio) return NextResponse.json({ error: "not enrolled" }, { status: 404 });

  const positionsWithPnl = await Promise.all(
    portfolio.positions.map(async (pos) => {
      const priceRec = await prisma.price.findUnique({ where: { symbol: pos.symbol } });
      const currentPrice = priceRec?.price ?? pos.avgCost;
      const marketValue = currentPrice * pos.quantity;
      const pnl = (currentPrice - pos.avgCost) * pos.quantity;
      return { symbol: pos.symbol, quantity: pos.quantity, avgCost: pos.avgCost, currentPrice, marketValue, pnl };
    })
  );

  const positionValue = positionsWithPnl.reduce((s, p) => s + p.marketValue, 0);
  const unrealizedPnL = positionsWithPnl.reduce((s, p) => s + p.pnl, 0);
  const totalAsset = portfolio.cash + positionValue;
  const returnPct = ((totalAsset / competition.initialCash) - 1) * 100;

  return NextResponse.json({
    agentId: agent.id,
    agentName: agent.name,
    competitionId: competition.id,
    competitionName: competition.name,
    initialCash: competition.initialCash,
    totalAsset: Math.round(totalAsset * 100) / 100,
    cash: Math.round(portfolio.cash * 100) / 100,
    positionValue: Math.round(positionValue * 100) / 100,
    unrealizedPnL: Math.round(unrealizedPnL * 100) / 100,
    returnPct: Math.round(returnPct * 100) / 100,
    positions: positionsWithPnl.map(p => ({ ...p, marketValue: Math.round(p.marketValue * 100) / 100, pnl: Math.round(p.pnl * 100) / 100 })),
  });
}
