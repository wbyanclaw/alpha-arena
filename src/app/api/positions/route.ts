import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// GET /api/positions
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
  if (!portfolio) return NextResponse.json({ positions: [], competitionId: competition.id });

  const positionsWithPnl = await Promise.all(
    portfolio.positions.map(async (pos) => {
      const priceRec = await prisma.price.findUnique({ where: { symbol: pos.symbol } });
      const currentPrice = priceRec?.price ?? pos.avgCost;
      const marketValue = currentPrice * pos.quantity;
      const cost = pos.avgCost * pos.quantity;
      const pnl = marketValue - cost;
      const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
      return {
        symbol: pos.symbol,
        name: priceRec?.name ?? pos.symbol,
        quantity: pos.quantity,
        avgCost: pos.avgCost,
        currentPrice,
        marketValue: Math.round(marketValue * 100) / 100,
        pnl: Math.round(pnl * 100) / 100,
        pnlPct: Math.round(pnlPct * 100) / 100,
        boughtAt: pos.boughtAt,
      };
    })
  );

  return NextResponse.json({ positions: positionsWithPnl, competitionId: competition.id });
}
