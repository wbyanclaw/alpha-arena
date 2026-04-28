import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { refreshPricesForSymbols } from "@/lib/price-refresh";

export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId");
  if (!agentId) return NextResponse.json({ error: "need agentId" }, { status: 400 });

  const portfolio = await prisma.portfolio.findFirst({
    where: { agentId },
    orderBy: { updatedAt: "desc" },
    include: { positions: true },
  });

  if (!portfolio) return NextResponse.json({ error: "portfolio not found" }, { status: 404 });

  const symbols = [...new Set(portfolio.positions.map((p) => p.symbol))];
  await refreshPricesForSymbols(prisma, symbols);
  const prices = symbols.length ? await prisma.price.findMany({ where: { symbol: { in: symbols } } }) : [];
  const priceMap = new Map(prices.map((p) => [p.symbol, p]));

  return NextResponse.json({
    agentId,
    cash: portfolio.cash,
    positions: portfolio.positions.map((pos) => ({
      symbol: pos.symbol,
      name: priceMap.get(pos.symbol)?.name ?? pos.symbol,
      quantity: pos.quantity,
      avgCost: pos.avgCost,
      currentPrice: priceMap.get(pos.symbol)?.price ?? pos.currentPrice ?? pos.avgCost,
      boughtAt: pos.boughtAt.toISOString(),
    })),
  });
}
