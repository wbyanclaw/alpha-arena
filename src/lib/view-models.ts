import type { DailySettlement, Delivery, Portfolio, Position, Price, Trade } from "@/generated/prisma";
import { toMarketSymbol } from "@/lib/market";
import type { AgentDetail, AgentRecentAction, DeliveryItem, LeaderboardEntry, StockAgentAction, StockWatchItem } from "@/types/arena";

type AgentBundle = {
  id: string;
  name: string;
  avatar: string | null;
  model: string | null;
  deliveries: Delivery[];
  trades: Trade[];
};

type PortfolioBundle = Portfolio & {
  agent: AgentBundle;
  positions: Position[];
  orders: Array<{
    symbol: string;
    side: string;
    quantity: number;
    note: string | null;
    submittedAt: Date;
    status: string;
  }>;
  settlements?: DailySettlement[];
};

const MAX_REASONABLE_CHANGE_PCT = 30;

export function round2(v: number) {
  return Math.round(v * 100) / 100;
}

export function normalizePrice(value: number | null | undefined, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}

function normalizePrevClose(price: number, prevClose: number | null | undefined) {
  if (typeof prevClose !== "number" || !Number.isFinite(prevClose) || prevClose <= 0) return price;
  const rawPct = Math.abs(((price - prevClose) / prevClose) * 100);
  if (rawPct > MAX_REASONABLE_CHANGE_PCT) return price;
  return prevClose;
}

export function calculateReturnPct(totalValue: number, initialCash: number) {
  return initialCash > 0 ? ((totalValue - initialCash) / initialCash) * 100 : 0;
}

export function computeMaxDrawdown(values: number[]) {
  let peak = Number.NEGATIVE_INFINITY;
  let maxDrawdown = 0;
  for (const value of values) {
    peak = Math.max(peak, value);
    maxDrawdown = Math.min(maxDrawdown, value - peak);
  }
  return Math.abs(maxDrawdown);
}

export function buildLeaderboardEntries(params: {
  portfolios: PortfolioBundle[];
  initialCash: number;
  priceMap: Map<string, Price>;
}) {
  const { portfolios, initialCash, priceMap } = params;
  return portfolios.map((p) => {
    const agentTrades = [...p.agent.trades].sort((a, b) => {
      const at = a.filledAt ? new Date(a.filledAt).getTime() : 0;
      const bt = b.filledAt ? new Date(b.filledAt).getTime() : 0;
      return at - bt;
    });

    const buys: { price: number; qty: number }[] = [];
    let realizedPnL = 0;
    for (const t of agentTrades) {
      const tradePrice = t.executedPrice ?? t.price;
      if (t.side === "BUY") {
        buys.push({ price: tradePrice, qty: t.quantity });
      } else {
        let remain = t.quantity;
        const fees = (t.commission ?? 0) + (t.stampTax ?? 0) + (t.transferFee ?? 0);
        while (remain > 0 && buys.length > 0) {
          const b = buys[0];
          const matched = Math.min(remain, b.qty);
          realizedPnL += (tradePrice - b.price) * matched - fees * (matched / t.quantity);
          b.qty -= matched;
          remain -= matched;
          if (b.qty <= 0) buys.shift();
        }
      }
    }

    const positions = p.positions.map((pos) => {
      const currentPrice = normalizePrice(priceMap.get(pos.symbol)?.price ?? pos.currentPrice, pos.avgCost);
      return {
        symbol: pos.symbol,
        name: priceMap.get(pos.symbol)?.name ?? pos.symbol,
        quantity: pos.quantity,
        avgCost: round2(pos.avgCost),
        currentPrice: round2(currentPrice),
        boughtAt: pos.boughtAt.toISOString(),
      };
    });

    const unrealizedPnL = positions.reduce((sum, pos) => sum + ((pos.currentPrice ?? pos.avgCost) - pos.avgCost) * pos.quantity, 0);
    const totalPnL = realizedPnL + unrealizedPnL;
    const totalValue = p.cash + positions.reduce((sum, pos) => sum + (pos.currentPrice ?? pos.avgCost) * pos.quantity, 0);
    const returnPct = calculateReturnPct(totalValue, initialCash);
    const latestDelivery = [...p.agent.deliveries].sort((a, b) => b.deliveredAt.getTime() - a.deliveredAt.getTime())[0] ?? null;
    const todayOrder = p.orders[0] ?? null;

    return {
      rank: 0,
      agent: { id: p.agent.id, name: p.agent.name, avatar: p.agent.avatar, model: p.agent.model },
      lobsterName: p.agent.name,
      cash: round2(p.cash),
      realizedPnL: round2(realizedPnL),
      unrealizedPnL: round2(unrealizedPnL),
      totalPnL: round2(totalPnL),
      returnPct: round2(returnPct),
      latestDelivery: latestDelivery
        ? {
            symbol: latestDelivery.symbol,
            side: latestDelivery.side,
            price: latestDelivery.price,
            quantity: latestDelivery.quantity,
            deliveredAt: latestDelivery.deliveredAt.toISOString(),
            note: latestDelivery.note,
          }
        : null,
      todayOrder: todayOrder
        ? {
            symbol: todayOrder.symbol,
            side: todayOrder.side as "BUY" | "SELL",
            quantity: todayOrder.quantity,
            note: todayOrder.note,
            submittedAt: todayOrder.submittedAt.toISOString(),
            status: todayOrder.status,
          }
        : null,
      todayBought: agentTrades.filter((t) => t.side === "BUY").length,
      positions,
      holdingsDays: positions[0]?.boughtAt ? Math.floor((Date.now() - new Date(positions[0].boughtAt).getTime()) / 86400000) : 0,
    } satisfies LeaderboardEntry;
  });
}

export function enrichLeaderboard(entries: LeaderboardEntry[], settlementsByAgent: Map<string, DailySettlement[]>) {
  const sorted = [...entries].sort((a, b) => (b.returnPct - a.returnPct) || (a.agent?.name ?? "").localeCompare(b.agent?.name ?? ""));
  sorted.forEach((entry, idx) => {
    entry.rank = idx + 1;
    const settlements = settlementsByAgent.get(entry.agent?.id ?? "") ?? [];
    const daily = settlements.map((s) => s.returnPct);
    entry.periodReturnPct = round2((daily.at(-1) ?? entry.returnPct) - (daily.at(-8) ?? daily[0] ?? 0));
  });
  return sorted;
}

export function buildAgentDetail(entry: LeaderboardEntry, deliveries: DeliveryItem[], settlements: DailySettlement[]): AgentDetail {
  const dailyReturns = settlements.map((s) => round2(s.returnPct));
  const closed = deliveries.filter((d) => d.side === "SELL" && typeof d.returnPct === "number");
  const wins = closed.filter((d) => (d.returnPct ?? 0) > 0).length;
  const winRate = closed.length ? (wins / closed.length) * 100 : 0;
  const trend7d = dailyReturns.length >= 2 ? (dailyReturns.at(-1) ?? 0) - (dailyReturns.at(-7) ?? dailyReturns[0] ?? 0) : 0;
  return {
    entry,
    deliveries,
    dailyReturns,
    winRate: round2(winRate),
    maxDrawdown: round2(computeMaxDrawdown(dailyReturns)),
    trend7d: round2(trend7d),
  };
}

function pickLatestTradeAction(entry: LeaderboardEntry) {
  const delivery = entry.latestDelivery;
  const order = entry.todayOrder;
  const orderIsVisible = order && order.status !== "CANCELLED" && order.status !== "REJECTED";

  if (!delivery && !orderIsVisible) return null;
  if (delivery && !orderIsVisible) {
    return {
      source: "delivery" as const,
      symbol: delivery.symbol,
      side: delivery.side,
      quantity: delivery.quantity,
      price: delivery.price,
      at: delivery.deliveredAt,
    };
  }
  if (!delivery && orderIsVisible) {
    return {
      source: "order" as const,
      symbol: order.symbol,
      side: order.side,
      quantity: order.quantity,
      price: null,
      at: order.submittedAt,
    };
  }

  return new Date(order!.submittedAt).getTime() > new Date(delivery!.deliveredAt).getTime()
    ? { source: "order" as const, symbol: order!.symbol, side: order!.side, quantity: order!.quantity, price: null, at: order!.submittedAt }
    : { source: "delivery" as const, symbol: delivery!.symbol, side: delivery!.side, quantity: delivery!.quantity, price: delivery!.price, at: delivery!.deliveredAt };
}

export function buildStockWatch(stocks: Price[], entries: LeaderboardEntry[]): { stocks: StockWatchItem[]; latestFlows: AgentRecentAction[] } {
  const priceBySymbol = new Map(stocks.map((p) => [p.symbol, p]));
  const latestFlows: AgentRecentAction[] = entries
    .flatMap((entry) => {
      const action = pickLatestTradeAction(entry);
      if (!action) return [];
      const price = priceBySymbol.get(action.symbol);
      return [{
        agentId: entry.agent?.id,
        agentName: entry.agent?.name ?? "—",
        symbol: action.symbol,
        stockName: price?.name ?? action.symbol,
        action: action.side === "BUY" ? "买入" : "卖出",
        quantity: action.quantity,
        deliveredAt: action.at,
      }];
    })
    .sort((a, b) => new Date(b.deliveredAt).getTime() - new Date(a.deliveredAt).getTime())
    .slice(0, 20);

  const stockMap = new Map<string, StockWatchItem>();
  for (const p of stocks) {
    const safePrice = normalizePrice(p.price, 0);
    const safePrevClose = normalizePrevClose(safePrice, p.prevClose);
    const change = safePrice - safePrevClose;
    const changePct = safePrevClose > 0 ? (change / safePrevClose) * 100 : 0;
    stockMap.set(p.symbol, {
      symbol: p.symbol,
      name: p.name ?? p.symbol,
      marketSymbol: toMarketSymbol(p.symbol),
      price: round2(safePrice),
      change: round2(change),
      changePct: round2(changePct),
      heat: 0,
      divergence: 0,
      buyCount: 0,
      sellCount: 0,
      holdCount: 0,
      netBullish: 0,
      latestActionAt: undefined,
      updatedAt: p.updatedAt.toISOString(),
      tags: [],
      topAgents: [],
      actions: [],
    });
  }

  for (const entry of entries) {
    const touched = new Set<string>();
    const latest = pickLatestTradeAction(entry);
    if (latest) {
      touched.add(latest.symbol);
      const item = stockMap.get(latest.symbol);
      if (item) {
        const heldPosition = entry.positions?.find((p) => p.symbol === latest.symbol);
        const action: StockAgentAction = {
          agentId: entry.agent?.id,
          agentName: entry.agent?.name ?? "—",
          action: latest.side,
          quantity: latest.quantity,
          price: latest.price,
          returnPct: entry.returnPct,
          deliveredAt: latest.at,
          hasPosition: !!heldPosition,
          positionQty: heldPosition?.quantity ?? 0,
        };
        item.actions.push(action);
        if (latest.side === "BUY") item.buyCount += 1;
        if (latest.side === "SELL") item.sellCount += 1;
        item.latestActionAt = latest.at;
      }
    }

    for (const pos of entry.positions ?? []) {
      if (touched.has(pos.symbol)) continue;
      const item = stockMap.get(pos.symbol);
      if (!item) continue;
      item.actions.push({
        agentId: entry.agent?.id,
        agentName: entry.agent?.name ?? "—",
        action: "HOLD",
        quantity: pos.quantity,
        price: pos.currentPrice,
        returnPct: entry.returnPct,
        deliveredAt: null,
        hasPosition: true,
        positionQty: pos.quantity,
      });
      item.holdCount += 1;
    }
  }

  const result = [...stockMap.values()].map((item) => {
    item.netBullish = item.buyCount - item.sellCount;
    item.heat = item.buyCount * 9 + item.sellCount * 7 + item.holdCount * 5;
    const totalActs = item.buyCount + item.sellCount;
    item.divergence = totalActs > 0 ? round2(100 - (Math.abs(item.buyCount - item.sellCount) / totalActs) * 100) : 0;
    item.topAgents = [...item.actions].sort((a, b) => (b.returnPct ?? 0) - (a.returnPct ?? 0)).slice(0, 3);
    const tags: string[] = [];
    if (item.heat >= 15) tags.push("最热");
    if (item.divergence >= 60) tags.push("分歧大");
    if (item.buyCount >= 2 && item.sellCount === 0) tags.push("头部一致看多");
    if (Math.abs(item.changePct) >= 2) tags.push("波动高");
    if (item.latestActionAt) tags.push(`${Math.max(1, Math.round((Date.now() - new Date(item.latestActionAt).getTime()) / 60000))}分钟前更新`);
    item.tags = tags;
    return item;
  });

  result.sort((a, b) => (b.heat - a.heat) || (b.divergence - a.divergence) || (new Date(b.latestActionAt ?? 0).getTime() - new Date(a.latestActionAt ?? 0).getTime()));
  return { stocks: result, latestFlows };
}
