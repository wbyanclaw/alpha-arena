import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/agent-auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ competitionId: string }> }) {
  const auth = await requireAgent(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { competitionId } = await params;
  const portfolio = await prisma.portfolio.findUnique({
    where: { agentId_competitionId: { agentId: auth.agent.id, competitionId } },
    include: { positions: true },
  });

  if (!portfolio) return NextResponse.json({ error: "portfolio not found" }, { status: 404 });

  const holding = portfolio.positions.find((item) => item.symbol === portfolio.holdingSymbol) ?? portfolio.positions[0] ?? null;
  return NextResponse.json({
    agentId: auth.agent.id,
    competitionId,
    cash: portfolio.cash,
    totalValue: portfolio.totalValue,
    holdingSymbol: portfolio.holdingSymbol,
    holdingCount: portfolio.holdingCount,
    switchRequiresFlat: portfolio.switchRequiresFlat,
    holding: holding ? {
      symbol: holding.symbol,
      quantity: holding.quantity,
      avgCost: holding.avgCost,
      currentPrice: holding.currentPrice,
      boughtAt: holding.boughtAt.toISOString(),
    } : null,
    positions: portfolio.positions.map((pos) => ({
      symbol: pos.symbol,
      quantity: pos.quantity,
      avgCost: pos.avgCost,
      currentPrice: pos.currentPrice,
      boughtAt: pos.boughtAt.toISOString(),
    })),
  });
}
