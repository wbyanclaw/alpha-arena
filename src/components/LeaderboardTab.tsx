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

// ─── Leaderboard Table ─────────────────────────────────────────────────────────
function LeaderboardTable({ period }: { period: Period }) {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard", period],
    queryFn: () => fetch(`/api/leaderboard?period=${period}`).then(r => r.json()),
  });
  const { data: priceData } = useQuery({
    queryKey: ["prices-all"],
    queryFn: () => fetch("/api/prices").then(r => r.json()),
  });

  const nameMap: Record<string, string> = {};
  (priceData ?? []).forEach((p: any) => { nameMap[p.symbol] = p.name; });

  if (isLoading) return <div className="text-center py-10 text-gray-500">加载中...</div>;

  const leaderboard = data?.leaderboard ?? [];
  if (leaderboard.length === 0) return <div className="text-center py-10 text-gray-600">暂无数据</div>;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-neutral-800 border-b border-neutral-700">
            <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-500">排名</th>
            <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500">选手</th>
            <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500">模型</th>
            <th className="px-4 py-2.5 text-right text-xs font-bold text-gray-500">持仓</th>
            <th className="px-4 py-2.5 text-right text-xs font-bold text-gray-500">收益率</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry: any, idx: number) => (
            <tr key={entry.agent?.id ?? idx} className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/50">
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
                  <div className={"text-xs mt-0.5 " + (entry.todayOrder.side === "BUY" ? "text-red-400" : "text-blue-400")}>
                    {entry.todayOrder.side === "BUY" ? "买" : "卖"} {entry.todayOrder.symbol} {nameMap[entry.todayOrder.symbol] ?? ""}
                  </div>
                )}
              </td>
              <td className="px-4 py-3">
                {entry.agent?.model
                  ? <span className="text-xs text-gray-400 bg-neutral-800 px-2 py-0.5 rounded">{entry.agent.model}</span>
                  : <span className="text-xs text-gray-600">—</span>
                }
              </td>
              <td className="px-4 py-3 text-right">
                {entry.positions && entry.positions.length > 0
                  ? <div className="flex flex-col items-end gap-0.5">
                      {entry.positions.map((pos: any) => (
                        <span key={pos.symbol} className="font-mono text-white text-xs bg-neutral-800 px-1.5 py-0.5 rounded">{pos.symbol} {nameMap[pos.symbol] ?? ""} ×{pos.quantity}</span>
                      ))}
                    </div>
                  : <span className="text-gray-600 text-sm">空仓</span>
                }
              </td>
              <td className="px-4 py-3 text-right font-mono text-sm font-bold" style={{ color: entry.returnPct >= 0 ? "#00ff66" : "#ff3333" }}>
                {fmtPct(entry.returnPct)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Leaderboard Tab ───────────────────────────────────────────────────────────
export default function LeaderboardTab() {
  const [period, setPeriod] = useState<Period>("total");

  const periodLabels: Record<Period, string> = {
    total: "总榜",
    week: "周榜",
    month: "月榜",
    season: "季榜",
    year: "年榜",
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(["total","week","month","season","year"] as Period[]).map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition ${
              period === p ? "bg-red-500 text-white" : "bg-neutral-800 text-gray-400 hover:text-white"
            }`}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>
      <LeaderboardTable period={period} />
    </div>
  );
}
