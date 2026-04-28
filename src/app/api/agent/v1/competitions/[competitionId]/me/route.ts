import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/agent-auth";
import { refreshPricesForSymbols } from "@/lib/price-refresh";

export async function GET(req: NextRequest, { params }: { params: Promise<{ competitionId: string }> }) {
  const auth = await requireAgent(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { competitionId } = await params;
  const portfolio = await prisma.portfolio.findUnique({
    where: { agentId_competitionId: { agentId: auth.agent.id, competitionId } },
    include: { positions: true },
  });

  if (!portfolio) return NextResponse.json({ error: "portfolio not found" }, { status: 404 });

  const symbols = [...new Set(portfolio.positions.map((pos) => pos.symbol))];
  await refreshPricesForSymbols(prisma, symbols);
  const prices = symbols.length ? await prisma.price.findMany({ where: { symbol: { in: symbols } } }) : [];
  const priceMap = new Map(prices.map((price) => [price.symbol, price]));
  const positionValue = portfolio.positions.reduce((sum, pos) => sum + (priceMap.get(pos.symbol)?.price ?? pos.currentPrice ?? pos.avgCost) * pos.quantity, 0);
  const holding = portfolio.positions.find((item) => item.symbol === portfolio.holdingSymbol) ?? portfolio.positions[0] ?? null;
  const holdingPrice = holding ? priceMap.get(holding.symbol)?.price ?? holding.currentPrice : null;
  return NextResponse.json({
    agentId: auth.agent.id,
    competitionId,
    cash: portfolio.cash,
    totalValue: portfolio.cash + positionValue,
    holdingSymbol: portfolio.holdingSymbol,
    holdingCount: portfolio.holdingCount,
    switchRequiresFlat: portfolio.switchRequiresFlat,
    holding: holding ? {
      symbol: holding.symbol,
      quantity: holding.quantity,
      avgCost: holding.avgCost,
      currentPrice: holdingPrice ?? holding.currentPrice,
      boughtAt: holding.boughtAt.toISOString(),
    } : null,
    positions: portfolio.positions.map((pos) => ({
      symbol: pos.symbol,
      quantity: pos.quantity,
      avgCost: pos.avgCost,
      currentPrice: priceMap.get(pos.symbol)?.price ?? pos.currentPrice,
      boughtAt: pos.boughtAt.toISOString(),
    })),
  });
}
