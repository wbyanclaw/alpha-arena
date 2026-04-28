import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildLeaderboardEntries, buildAgentDetail, buildStockWatch, enrichLeaderboard } from "@/lib/view-models";
import { refreshPricesForSymbols } from "@/lib/price-refresh";

function getPeriodStart(period: string): Date | null {
  const now = new Date();
  if (period === "day") {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "week") {
    const d = new Date(now);
    d.setDate(d.getDate() - 6);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (period === "month") {
    const d = new Date(now);
    d.setDate(d.getDate() - 29);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  return null;
}

function isMissingColumnError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("does not exist") || message.includes("P2022") || message.includes("no such column");
}

function sanitizePriceRow(row: { id: string; symbol: string; name: string | null; price: number; prevClose: number; updatedAt: Date }) {
  const price = Number.isFinite(row.price) && row.price > 0 ? row.price : 0;
  const prevClose = Number.isFinite(row.prevClose) && row.prevClose > 0 ? row.prevClose : price;
  const rawPct = prevClose > 0 ? Math.abs(((price - prevClose) / prevClose) * 100) : 0;
  return {
    ...row,
    prevClose: rawPct > 30 ? price : prevClose,
  };
}


export async function GET(req: NextRequest) {
  const competitionId = req.nextUrl.searchParams.get("competitionId");
  const market = req.nextUrl.searchParams.get("market") || "A";
  const period = req.nextUrl.searchParams.get("period") || "total";
  const view = req.nextUrl.searchParams.get("view") || "rank";
  const symbol = req.nextUrl.searchParams.get("symbol");
  const agentId = req.nextUrl.searchParams.get("agentId");

  try {
    const competition = competitionId
      ? await prisma.competition.findUnique({ where: { id: competitionId } })
      : await prisma.competition.findFirst({ where: { market }, orderBy: { createdAt: "desc" } });

    if (!competition) return NextResponse.json({ error: "no competition found" }, { status: 404 });

    const periodStart = getPeriodStart(period);
    const portfolios = await prisma.portfolio.findMany({
      where: { competitionId: competition.id },
      include: {
        agent: {
          include: {
            deliveries: { where: periodStart ? { deliveredAt: { gte: periodStart } } : undefined, orderBy: { deliveredAt: "desc" }, take: 50 },
            trades: { where: { status: "FILLED", ...(periodStart ? { filledAt: { gte: periodStart } } : {}) }, orderBy: { filledAt: "asc" } },
          },
        },
        positions: true,
        orders: { where: periodStart ? { submittedAt: { gte: periodStart } } : undefined, orderBy: { submittedAt: "desc" }, take: 5 },
        settlements: { orderBy: { date: "asc" }, take: 60 },
      },
    });

    const symbols = [...new Set(
      portfolios
        .flatMap((p) => p.positions.map((pos) => pos.symbol))
        .concat(portfolios.flatMap((p) => p.agent.deliveries.map((d) => d.symbol)))
        .concat(portfolios.flatMap((p) => p.orders.map((order) => order.symbol)))
    )];
    await refreshPricesForSymbols(prisma, symbols);
    const rawPrices = symbols.length > 0 ? await prisma.price.findMany({ where: { symbol: { in: symbols } } }) : [];
    const prices = rawPrices.map((row) => sanitizePriceRow({
      id: row.id,
      symbol: row.symbol,
      name: row.name,
      price: row.price,
      prevClose: row.prevClose,
      updatedAt: row.updatedAt,
    }));
    const priceMap = new Map(prices.map((p) => [p.symbol, p]));
    const entries = buildLeaderboardEntries({ portfolios, initialCash: competition.initialCash, priceMap });
    const settlementsByAgent = new Map(portfolios.map((p) => [p.agent.id, p.settlements ?? []]));
    const leaderboard = enrichLeaderboard(entries, settlementsByAgent);

    if (agentId) {
      const entry = leaderboard.find((item) => item.agent?.id === agentId);
      if (!entry) return NextResponse.json({ error: "agent not found" }, { status: 404 });
      const settlements = settlementsByAgent.get(agentId) ?? [];
      const portfolio = portfolios.find((p) => p.agent.id === agentId);
      const deliveries = (portfolio?.agent.deliveries ?? []).map((d) => ({
        symbol: d.symbol,
        name: priceMap.get(d.symbol)?.name ?? d.symbol,
        side: d.side,
        price: d.price,
        quantity: d.quantity,
        deliveredAt: d.deliveredAt.toISOString(),
        note: d.note,
      }));
      return NextResponse.json({ agent: buildAgentDetail(entry, deliveries, settlements), updatedAt: new Date().toISOString() });
    }

    if (view === "watch") {
      const { stocks, latestFlows } = buildStockWatch(prices, leaderboard);
      if (symbol) {
        const stock = stocks.find((item) => item.symbol === symbol);
        if (!stock) return NextResponse.json({ error: "stock not found" }, { status: 404 });
        return NextResponse.json({ stock, updatedAt: new Date().toISOString(), date: new Date().toISOString().slice(0, 10), market: competition.market, range: period });
      }
      return NextResponse.json({ stocks, latestFlows, updatedAt: new Date().toISOString(), date: new Date().toISOString().slice(0, 10), market: competition.market, range: period });
    }

    return NextResponse.json({ competition, period, updatedAt: new Date().toISOString(), leaderboard });
  } catch (error) {
    console.error("[leaderboard] failed", error);
    if (isMissingColumnError(error)) {
      return NextResponse.json({ error: "leaderboard schema mismatch", hint: "run schema sync before serving production traffic" }, { status: 503 });
    }
    return NextResponse.json({ error: "failed to build leaderboard" }, { status: 500 });
  }
}
