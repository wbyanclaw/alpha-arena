import { prisma } from "@/lib/prisma";

export async function writeSettlementSnapshot(args: {
  competitionId: string;
  portfolioId: string;
  participantId?: string | null;
  tradingSessionId?: string | null;
}) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: args.portfolioId },
    include: { positions: true },
  });

  if (!portfolio) return null;

  const symbols = [...new Set(portfolio.positions.map((item) => item.symbol))];
  const prices = symbols.length > 0 ? await prisma.price.findMany({ where: { symbol: { in: symbols } } }) : [];
  const priceMap = new Map(prices.map((item) => [item.symbol, item.price]));
  const marketValue = portfolio.positions.reduce((sum, pos) => sum + (priceMap.get(pos.symbol) ?? pos.currentPrice ?? pos.avgCost) * pos.quantity, 0);
  const totalValue = portfolio.cash + marketValue;

  return prisma.settlementSnapshot.create({
    data: {
      competitionId: args.competitionId,
      tradingSessionId: args.tradingSessionId ?? null,
      participantId: args.participantId ?? null,
      portfolioId: portfolio.id,
      cash: portfolio.cash,
      marketValue,
      totalValue,
      returnPct: ((totalValue - 1000000) / 1000000) * 100,
      holdingSymbol: portfolio.holdingSymbol,
      positionJson: JSON.stringify(portfolio.positions.map((pos) => ({
        symbol: pos.symbol,
        quantity: pos.quantity,
        avgCost: pos.avgCost,
        currentPrice: priceMap.get(pos.symbol) ?? pos.currentPrice ?? pos.avgCost,
      }))),
    },
  });
}

export async function appendEventFeed(args: {
  competitionId: string;
  tradingSessionId?: string | null;
  participantId?: string | null;
  agentId?: string | null;
  eventType: string;
  title: string;
  summary: string;
  payload?: unknown;
}) {
  return prisma.logEntry.create({
    data: {
      title: `[${args.eventType}] ${args.title}`,
      content: JSON.stringify({
        summary: args.summary,
        payload: args.payload ?? null,
        competitionId: args.competitionId,
        tradingSessionId: args.tradingSessionId ?? null,
        participantId: args.participantId ?? null,
        agentId: args.agentId ?? null,
      }),
      level: "INFO",
      agentId: args.agentId ?? undefined,
    },
  });
}
