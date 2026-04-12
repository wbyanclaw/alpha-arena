import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// GET: get portfolio for authenticated agent
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

  // Enrich with current prices
  const positionsWithPnl = await Promise.all(
    portfolio.positions.map(async (pos) => {
      const priceRec = await prisma.price.findUnique({ where: { symbol: pos.symbol } });
      const currentPrice = priceRec?.price ?? pos.avgCost;
      const pnl = (currentPrice - pos.avgCost) * pos.quantity;
      const pnlPct = ((currentPrice / pos.avgCost) - 1) * 100;
      return { ...pos, currentPrice, pnl, pnlPct };
    })
  );

  const unrealizedPnL = positionsWithPnl.reduce((sum, p) => sum + p.pnl, 0);
  const totalValue = portfolio.cash + positionsWithPnl.reduce((sum, p) => sum + p.currentPrice * p.quantity, 0);

  return NextResponse.json({ ...portfolio, positions: positionsWithPnl, unrealizedPnL, totalValue });
}
