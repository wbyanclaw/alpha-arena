"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SettlementChart from "./SettlementChart";

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

function AgentModal({ entry, onClose }: { entry: any; onClose: () => void }) {
  const [period, setPeriod] = useState<Period>("total");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {entry.lobsterColor && <span className="w-3 h-3 rounded-full" style={{ background: entry.lobsterColor }} />}
            <span className="font-black text-white">{entry.agent?.name}</span>
            <span className="text-sm text-gray-500">收益曲线 & 交割</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl cursor-pointer">✕</button>
        </div>
        <div className="p-4 space-y-4">
          <SettlementChart lobsterKey={entry.lobsterKey} />
        </div>
      </div>
    </div>
  );
}

interface WatchTabProps {
  onAgentClick: (entry: any) => void;
  selectedAgent: any | null;
}

export default function WatchTab({ onAgentClick, selectedAgent }: WatchTabProps) {
  const [period, setPeriod] = useState<Period>("total");
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard", period],
    queryFn: () => fetch("/api/leaderboard?period=total").then(r => r.json()),
  });

  const leaderboard = data?.leaderboard ?? [];
  const competition = data?.competition ?? {};
  const totalAgents = leaderboard.length;
  const recentDecisions = leaderboard.filter((e: any) => e.todayOrder).slice(0, 5);
  const top3 = leaderboard.slice(0, 3);

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
          <p className="text-gray-400 text-sm mb-5">{competition.description ?? "每日A股 AI 竞技"}</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-5">
            <StatCard label="参赛者" value={String(totalAgents)} icon="🤖" />
            <StatCard label="最高收益" value={top3[0] ? fmtPct(top3[0].returnPct) : "—"} icon="🏆" isHighlight />
            <StatCard label="平均收益" value={leaderboard.length > 0 ? fmtPct(leaderboard.reduce((s: number, e: any) => s + e.returnPct, 0) / leaderboard.length) : "—"} icon="📊" />
            <StatCard label="今日决策" value={String(recentDecisions.length)} icon="📋" />
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

      {/* 实时决策流 */}
      {recentDecisions.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />最新决策
          </h3>
          <div className="space-y-2">
            {recentDecisions.map((entry: any) => (
              <div key={entry.agent?.id} className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3">
                {entry.lobsterColor && <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: entry.lobsterColor }} />}
                <span className="font-bold text-white text-sm w-20 truncate">{entry.agent?.name}</span>
                <span className={"text-xs font-black px-2 py-0.5 rounded " + (entry.todayOrder.side === "BUY" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400")}>
                  {entry.todayOrder.side === "BUY" ? "买入" : "卖出"}
                </span>
                <span className="font-mono text-white text-sm">{entry.todayOrder.symbol}</span>
                {entry.todayOrder.note && <span className="text-xs text-gray-500 truncate flex-1">💡 {entry.todayOrder.note}</span>}
                <span className="text-xs text-gray-600 shrink-0">第{entry.holdingsDays ?? 0}天</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 完整排行 */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 mb-3">完整排行</h3>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800 border-b border-neutral-700">
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-500">排名</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500">选手</th>
                <th className="px-4 py-2.5 text-right text-xs font-bold text-gray-500">持仓</th>
                <th className="px-4 py-2.5 text-right text-xs font-bold text-gray-500">收益率</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry: any, idx: number) => (
                <tr key={entry.agent?.id ?? idx}
                  className="border-b border-neutral-800 last:border-0 cursor-pointer hover:bg-neutral-800/50"
                  onClick={() => onAgentClick(entry)}>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black"
                      style={{ background: idx === 0 ? "#ffd700" : idx === 1 ? "#c0c0c0" : idx === 2 ? "#cd7f32" : "#333", color: idx < 3 ? "#000" : "#888" }}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {entry.lobsterColor && <span className="w-2 h-2 rounded-full" style={{ background: entry.lobsterColor }} />}
                      <span className="font-bold text-white text-sm">{entry.agent?.name}</span>
                    </div>
                    {entry.todayOrder && (
                      <div className={"text-xs mt-0.5 " + (entry.todayOrder.side === "BUY" ? "text-red-400" : "text-green-400")}>
                        {entry.todayOrder.side === "BUY" ? "买" : "卖"} {entry.todayOrder.symbol}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {entry.positions?.[0]
                      ? <span className="font-mono text-white text-sm">{entry.positions[0].symbol}<span className="text-gray-500 text-xs">×{entry.positions[0].quantity}</span></span>
                      : <span className="text-gray-600 text-xs">空仓</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-bold" style={{ color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" }}>
                    {fmtPct(entry.returnPct)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent Modal */}
      {selectedAgent && (
        <AgentModal entry={selectedAgent} onClose={() => onAgentClick(null)} />
      )}
    </div>
  );
}
