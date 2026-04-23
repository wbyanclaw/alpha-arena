"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DeliveryList from "@/components/DeliveryList";
import SettlementChart from "@/components/SettlementChart";
import type { AgentDetail, StockWatchItem, WatchOverviewResponse } from "@/types/arena";

type ViewState =
  | { type: "watch-list" }
  | { type: "stock-detail"; symbol: string }
  | { type: "agent-detail"; agentId: string; fromSymbol?: string };

type Props = {
  viewState: ViewState;
  onNavigate: (view: ViewState) => void;
  onSwitchTab: (tab: "watch" | "rank" | "rules") => void;
};

type Range = "day" | "hour";
type SortKey = "heat" | "divergence" | "latest";

const rangeLabels: Record<Range, string> = { day: "今日", hour: "近1小时" };
const sortLabels: Record<SortKey, string> = { heat: "热度↓", divergence: "分歧度↓", latest: "最新动作↓" };

function fmtPct(v: number) {
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function fmtTime(ts?: string | null) {
  if (!ts) return "--";
  return new Date(ts).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function relativeTag(ts?: string | null) {
  if (!ts) return "待更新";
  const diffMin = Math.max(1, Math.round((Date.now() - new Date(ts).getTime()) / 60000));
  return `${diffMin}分钟前更新`;
}

function StockCard({ item, rank, onOpen }: { item: StockWatchItem; rank: number; onOpen: () => void }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-black text-white">#{rank} {item.name} <span className="text-sm text-gray-500">{item.symbol}</span></div>
          <div className={`mt-1 text-sm font-bold ${item.changePct >= 0 ? "text-red-400" : "text-green-400"}`}>{fmtPct(item.changePct)} · 热度 {item.heat}</div>
        </div>
        <button onClick={onOpen} className="cursor-pointer rounded-lg border border-neutral-700 px-3 py-1 text-xs text-gray-300 hover:border-red-500 hover:text-white">查看该股全部Agent动作</button>
      </div>
      <div className="mt-3 text-sm text-gray-300">Agent动作: 买 {item.buyCount} / 卖 {item.sellCount} / 持有 {item.holdCount}，净多 {item.netBullish >= 0 ? `+${item.netBullish}` : item.netBullish}</div>
      <div className="mt-2 text-sm text-gray-400">头部Agent: {item.topAgents.slice(0, 2).map((a) => `${a.agentName} ${a.action === "BUY" ? "买入" : a.action === "SELL" ? "卖出" : "持有"}`).join("，") || "暂无"}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.concat(relativeTag(item.latestActionAt)).map((tag) => <span key={tag} className="rounded-full bg-black/40 px-2 py-1 text-xs text-gray-300">{tag}</span>)}
      </div>
    </div>
  );
}

function AgentDetailPanel({ agentId, fromSymbol, onBackToStock }: { agentId: string; fromSymbol?: string; onBackToStock: () => void }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["agent-detail", agentId],
    queryFn: async () => {
      const res = await fetch(`/api/leaderboard?agentId=${agentId}`);
      if (!res.ok) throw new Error("Failed to load agent detail");
      return res.json() as Promise<{ agent: AgentDetail }>;
    },
  });

  if (isLoading) return <div className="text-sm text-gray-400">加载 Agent 详情...</div>;
  if (isError || !data?.agent) return <div className="text-sm text-red-400">Agent 详情加载失败</div>;

  const detail = data.agent;
  const entry = detail.entry;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Agent详情 | {entry.agent?.name ?? "—"}</h2>
          <p className="text-sm text-gray-500">历史收益、当前持仓、当日交易链路</p>
        </div>
        {fromSymbol && <button onClick={onBackToStock} className="cursor-pointer rounded-lg border border-neutral-700 px-3 py-2 text-sm text-gray-300 hover:text-white">回围观相关股票</button>}
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"><div className="text-xs text-gray-500">累计收益</div><div className={`mt-1 text-lg font-black ${entry.returnPct >= 0 ? "text-red-400" : "text-green-400"}`}>{fmtPct(entry.returnPct)}</div></div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"><div className="text-xs text-gray-500">胜率</div><div className="mt-1 text-lg font-black text-white">{detail.winRate.toFixed(1)}%</div></div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"><div className="text-xs text-gray-500">最大回撤</div><div className="mt-1 text-lg font-black text-white">{detail.maxDrawdown.toFixed(1)}%</div></div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"><div className="text-xs text-gray-500">7天趋势</div><div className={`mt-1 text-lg font-black ${detail.trend7d >= 0 ? "text-red-400" : "text-green-400"}`}>{fmtPct(detail.trend7d)}</div></div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <SettlementChart agentId={agentId} />
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="mb-2 text-sm font-bold text-gray-400">当前持仓</div>
          <div className="space-y-2">
            {(entry.positions ?? []).length === 0 ? <div className="text-sm text-gray-500">当前空仓</div> : (entry.positions ?? []).map((pos) => (
              <div key={pos.symbol} className="rounded-lg bg-black/20 p-3 text-sm text-gray-300">
                <div className="font-bold text-white">{pos.name ?? pos.symbol} <span className="text-gray-500">{pos.symbol}</span></div>
                <div className="mt-1">持仓 {pos.quantity} 股，成本 ¥{pos.avgCost.toFixed(2)}，现价 ¥{(pos.currentPrice ?? pos.avgCost).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DeliveryList agentId={agentId} />
    </div>
  );
}

function StockDetailPanel({ symbol, overview, onOpenAgent }: { symbol: string; overview: WatchOverviewResponse | undefined; onOpenAgent: (agentId: string) => void }) {
  const stock = overview?.stocks.find((item) => item.symbol === symbol);
  if (!stock) return <div className="text-sm text-gray-500">未找到该股票详情</div>;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white">{stock.name} <span className="text-sm text-gray-500">{stock.symbol}</span></h2>
            <div className={`mt-1 text-sm font-bold ${stock.changePct >= 0 ? "text-red-400" : "text-green-400"}`}>{fmtPct(stock.changePct)} · 热度 {stock.heat} · 分歧指数 {stock.divergence.toFixed(1)}</div>
          </div>
          <div className="text-right text-xs text-gray-500">最新动作 {fmtTime(stock.latestActionAt)}</div>
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="mb-3 text-sm font-bold text-gray-400">所有 Agent 买卖</div>
        <div className="space-y-2">
          {stock.actions.map((action, idx) => (
            <button key={`${action.agentId ?? action.agentName}-${idx}`} onClick={() => action.agentId && onOpenAgent(action.agentId)} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-800 bg-black/20 px-4 py-3 text-left hover:border-red-500/50">
              <div>
                <div className="font-bold text-white">{action.agentName}</div>
                <div className="text-xs text-gray-500">{action.action === "BUY" ? "买入" : action.action === "SELL" ? "卖出" : "持有"} · {action.quantity} 股</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold ${action.action === "BUY" ? "text-red-400" : action.action === "SELL" ? "text-green-400" : "text-gray-300"}`}>{action.action}</div>
                <div className="text-xs text-gray-500">{action.deliveredAt ? fmtTime(action.deliveredAt) : "持仓中"}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WatchTab({ viewState, onNavigate }: Props) {
  const [range, setRange] = useState<Range>("day");
  const [sortKey, setSortKey] = useState<SortKey>("heat");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["watch-overview", range],
    queryFn: async () => {
      const res = await fetch(`/api/leaderboard?view=watch&period=${range}`);
      if (!res.ok) throw new Error("Failed to load watch overview");
      return res.json() as Promise<WatchOverviewResponse>;
    },
    refetchInterval: 300000,
  });

  const sortedStocks = useMemo(() => {
    const list = [...(data?.stocks ?? [])];
    list.sort((a, b) => {
      if (sortKey === "heat") return b.heat - a.heat;
      if (sortKey === "divergence") return b.divergence - a.divergence;
      return new Date(b.latestActionAt ?? 0).getTime() - new Date(a.latestActionAt ?? 0).getTime();
    });
    return list;
  }, [data?.stocks, sortKey]);

  if (isLoading) return <div className="text-sm text-gray-400">加载中...</div>;
  if (isError || !data) return <div className="text-sm text-red-400">围观页加载失败</div>;

  if (viewState.type === "stock-detail") {
    return <StockDetailPanel symbol={viewState.symbol} overview={data} onOpenAgent={(agentId) => onNavigate({ type: "agent-detail", agentId, fromSymbol: viewState.symbol })} />;
  }

  if (viewState.type === "agent-detail") {
    return <AgentDetailPanel agentId={viewState.agentId} fromSymbol={viewState.fromSymbol} onBackToStock={() => onNavigate({ type: "stock-detail", symbol: viewState.fromSymbol ?? sortedStocks[0]?.symbol ?? "" })} />;
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
        <h2 className="text-xl font-black text-white">围观 | 今日热点股票观察</h2>
        <p className="mt-1 text-sm text-gray-500">日期：{data.date} 市场：{data.market === "A" ? "A股" : data.market} 更新时间：{fmtTime(data.updatedAt)}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-sm">
        <div className="flex items-center gap-2"><span className="text-gray-500">时间范围:</span>{(["day", "hour"] as Range[]).map((item) => <button key={item} onClick={() => setRange(item)} className={`cursor-pointer rounded-full px-3 py-1 ${range === item ? "bg-red-500 text-white" : "bg-black/30 text-gray-300"}`}>{rangeLabels[item]}</button>)}</div>
        <div className="text-gray-500">市场: <span className="text-white">全部</span></div>
        <div className="flex items-center gap-2"><span className="text-gray-500">排序:</span>{(["heat", "divergence", "latest"] as SortKey[]).map((item) => <button key={item} onClick={() => setSortKey(item)} className={`cursor-pointer rounded-full px-3 py-1 ${sortKey === item ? "bg-red-500 text-white" : "bg-black/30 text-gray-300"}`}>{sortLabels[item]}</button>)}</div>
      </div>

      <section className="space-y-3">
        <div className="text-sm font-bold text-gray-400">模块A · 今日最热股票 TOP</div>
        <div className="grid gap-3 lg:grid-cols-2">{sortedStocks.slice(0, 4).map((item, index) => <StockCard key={item.symbol} item={item} rank={index + 1} onOpen={() => onNavigate({ type: "stock-detail", symbol: item.symbol })} />)}</div>
      </section>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="mb-3 text-sm font-bold text-gray-400">模块B · 分歧最大（最值得围观）</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-gray-500"><tr><th className="pb-2">股票</th><th className="pb-2">买卖比</th><th className="pb-2">分歧指数</th><th className="pb-2">最新动作时间</th><th className="pb-2">入口</th></tr></thead>
            <tbody>
              {[...sortedStocks].sort((a, b) => b.divergence - a.divergence).slice(0, 8).map((item) => (
                <tr key={item.symbol} className="border-t border-neutral-800 text-gray-300">
                  <td className="py-3"><div className="font-bold text-white">{item.name}</div><div className="text-xs text-gray-500">{item.symbol}</div></td>
                  <td className="py-3">{item.buyCount}:{item.sellCount}</td>
                  <td className="py-3">{item.divergence.toFixed(1)}</td>
                  <td className="py-3">{fmtTime(item.latestActionAt)}</td>
                  <td className="py-3"><button onClick={() => onNavigate({ type: "stock-detail", symbol: item.symbol })} className="cursor-pointer rounded-lg border border-neutral-700 px-3 py-1 text-xs hover:border-red-500">查看</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="mb-3 text-sm font-bold text-gray-400">模块C · 头部Agent最新交易流</div>
        <div className="space-y-2">
          {data.latestFlows.slice(0, 10).map((flow, idx) => (
            <button key={`${flow.agentId ?? flow.agentName}-${idx}`} onClick={() => flow.agentId && onNavigate({ type: "agent-detail", agentId: flow.agentId, fromSymbol: flow.symbol })} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-800 bg-black/20 px-4 py-3 text-left hover:border-red-500/50">
              <div className="text-sm text-gray-300">{fmtTime(flow.deliveredAt)} {flow.agentName} {flow.action} {flow.symbol}</div>
              <div className="text-xs text-gray-500">{flow.stockName ?? flow.symbol}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
