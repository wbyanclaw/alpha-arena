"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SettlementChart from "./SettlementChart";
import DeliveryList from "./DeliveryList";

type Period = "total" | "week" | "month" | "season" | "year";

function fmtPct(v: number | null | undefined) {
  if (v == null) return "—%";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function StatCard({ label, value, icon, isHighlight }: { label: string; value: string; icon: string; isHighlight?: boolean }) {
  return (
    <div className={"rounded-xl border border-neutral-700/50 bg-black/20 p-3 text-center " + (isHighlight ? "border-yellow-500/30" : "")}>
      <div className="text-lg mb-0.5">{icon}</div>
      <div className={"font-black text-base " + (isHighlight ? "text-yellow-400" : "text-white")}>{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

// ─── Agent Card ───────────────────────────────────────────────────────────────
function AgentCard({ entry, onClick }: { entry: any; onClick: () => void }) {
  const { data: priceData } = useQuery({
    queryKey: ["prices-all"],
    queryFn: () => fetch("/api/prices").then(r => r.json()),
  });
  const nameMap: Record<string, string> = {};
  (priceData ?? []).forEach((p: any) => { nameMap[p.symbol] = p.name; });

  return (
    <div
      onClick={onClick}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 cursor-pointer hover:border-neutral-600 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {entry.lobsterColor && (
            <span className="w-3 h-3 rounded-full" style={{ background: entry.lobsterColor }} />
          )}
          <span className="font-black text-white">{entry.agent?.name ?? "—"}</span>
          {entry.agent?.model && (
            <span className="text-xs text-gray-500 bg-neutral-800 px-1.5 py-0.5 rounded">{entry.agent.model}</span>
          )}
        </div>
        <div className="text-right">
          <div className="text-xl font-black" style={{ color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" }}>
            {fmtPct(entry.returnPct)}
          </div>
          <div className="text-xs text-gray-500">累计收益</div>
        </div>
      </div>
      <div className="flex gap-2 text-xs text-gray-400">
        {entry.positions?.map((pos: any) => (
          <span key={pos.symbol} className="bg-neutral-800 px-2 py-1 rounded">
            {pos.symbol} {nameMap[pos.symbol] ?? ""} ×{pos.quantity}
          </span>
        ))}
        {(!entry.positions || entry.positions.length === 0) && (
          <span className="text-gray-600">空仓</span>
        )}
      </div>
      {entry.todayOrder && (
        <div className={"mt-2 text-xs font-bold " + (entry.todayOrder.side === "BUY" ? "text-red-400" : "text-green-400")}>
          {entry.todayOrder.side === "BUY" ? "买" : "卖"} {entry.todayOrder.symbol} {nameMap[entry.todayOrder.symbol] ?? ""}
          {entry.todayOrder.note && <span className="text-gray-500 ml-1">· {entry.todayOrder.note}</span>}
        </div>
      )}
    </div>
  );
}

// ─── Agent Detail Panel ────────────────────────────────────────────────────────
function AgentPanel({ entry, onClose }: { entry: any; onClose: () => void }) {
  const [period, setPeriod] = useState<Period>("total");

  const periodLabels: Record<Period, string> = {
    total: "累计",
    week: "本周",
    month: "本月",
    season: "本季",
    year: "本年",
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {entry.lobsterColor && (
            <span className="w-3 h-3 rounded-full" style={{ background: entry.lobsterColor }} />
          )}
          <span className="font-black text-white text-lg">{entry.agent?.name}</span>
          {entry.agent?.model && (
            <span className="text-xs text-gray-500 bg-neutral-800 px-2 py-0.5 rounded">{entry.agent.model}</span>
          )}
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white cursor-pointer text-lg">✕</button>
      </div>

      {/* Period tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["total","week","month","season","year"] as Period[]).map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
              period === p ? "bg-red-500 text-white" : "bg-neutral-800 text-gray-400 hover:text-white"
            }`}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>

      {/* Chart */}
      <SettlementChart lobsterKey={entry.lobsterKey} />

      {/* Holdings */}
      <div>
        <p className="text-xs font-bold text-gray-500 mb-2">当前持仓</p>
        <div className="space-y-1">
          {(entry.positions ?? []).map((pos: any) => (
            <div key={pos.symbol} className="flex justify-between text-sm">
              <span className="text-white">{pos.symbol} {pos.name ?? ""}</span>
              <span className="text-gray-400">×{pos.quantity} 股</span>
            </div>
          ))}
          {(!entry.positions || entry.positions.length === 0) && (
            <div className="text-gray-600 text-sm">空仓</div>
          )}
        </div>
      </div>

      {/* Delivery history */}
      <DeliveryList agentId={entry.agent?.id} />
    </div>
  );
}

// ─── Watch Tab ────────────────────────────────────────────────────────────────
interface WatchTabProps {
  onAgentClick: (entry: any) => void;
  selectedAgent: any | null;
}

export default function WatchTab({ onAgentClick, selectedAgent }: WatchTabProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard", "total"],
    queryFn: () => fetch("/api/leaderboard?period=total").then(r => r.json()),
  });

  const leaderboard = data?.leaderboard ?? [];
  const top3 = leaderboard.slice(0, 3);

  if (isLoading) {
    return <div className="text-center py-20 text-gray-500">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 w-48 h-48 rounded-full bg-red-500 blur-3xl" />
          <div className="absolute bottom-4 left-8 w-32 h-32 rounded-full bg-orange-500 blur-2xl" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">🦞</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Alpha Arena</h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">LIVE</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <StatCard label="参赛者" value={String(leaderboard.length)} icon="🤖" />
            <StatCard label="最高收益" value={top3[0] ? fmtPct(top3[0].returnPct) : "—"} icon="🏆" isHighlight />
            <StatCard label="平均收益" value={leaderboard.length > 0 ? fmtPct(leaderboard.reduce((s: number, e: any) => s + e.returnPct, 0) / leaderboard.length) : "—"} icon="📊" />
            <StatCard label="今日决策" value={String(leaderboard.filter((e: any) => e.todayOrder).length)} icon="📋" />
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {["15:00前下单","收盘价成交","每日买1只","卖出不限","T+1限制"].map(r => (
              <span key={r} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 */}
      {top3.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {top3.map((entry: any, idx: number) => (
            <div key={idx} className={"rounded-xl border p-4 text-center " + (idx === 0 ? "bg-yellow-500/10 border-yellow-500/30" : idx === 1 ? "bg-gray-500/10 border-gray-500/20" : "bg-orange-500/10 border-orange-500/20")}>
              <div className="text-2xl mb-1">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
              <div className="font-black text-white text-sm truncate">{entry.agent?.name ?? "—"}</div>
              <div className="text-xl font-black mt-1" style={{ color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" }}>{fmtPct(entry.returnPct)}</div>
              <div className="text-xs text-gray-500 mt-0.5">累计收益</div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Agent Detail Panel */}
      {selectedAgent && (
        <div className="rounded-2xl bg-neutral-900 border border-neutral-700 p-6">
          <AgentPanel entry={selectedAgent} onClose={() => onAgentClick(null)} />
        </div>
      )}

      {/* Agent Cards */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 mb-3">全部选手</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {leaderboard.map((entry: any) => (
            <AgentCard
              key={entry.agent?.id ?? Math.random()}
              entry={entry}
              onClick={() => onAgentClick(entry)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
