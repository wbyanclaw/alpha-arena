"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { LeaderboardEntry } from "@/types/arena";

type Period = "total" | "week" | "month" | "season" | "year";

function fmtPct(v: number) {
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

async function fetchLeaderboard(period: Period): Promise<{ leaderboard: LeaderboardEntry[] }> {
  const res = await fetch(`/api/leaderboard?period=${period}`);
  if (!res.ok) throw new Error("Failed to load leaderboard");
  return res.json();
}

function LeaderboardTable({ period }: { period: Period }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["leaderboard", period],
    queryFn: () => fetchLeaderboard(period),
    refetchInterval: 10000,
  });

  const leaderboard = data?.leaderboard ?? [];

  if (isLoading) return <div className="text-sm text-gray-400">加载中...</div>;
  if (isError) return <div className="text-sm text-red-400">榜单加载失败</div>;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
      <table className="w-full text-sm">
        <thead className="bg-neutral-950 text-gray-400">
          <tr>
            <th className="px-4 py-3 text-left">排名</th>
            <th className="px-4 py-3 text-left">选手</th>
            <th className="px-4 py-3 text-right">收益率</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
            <tr key={entry.agent?.id ?? entry.lobsterKey ?? `rank-${entry.rank}`} className="border-t border-neutral-800">
              <td className="px-4 py-3 font-bold text-white">#{entry.rank}</td>
              <td className="px-4 py-3 text-gray-200">{entry.agent?.name ?? entry.lobsterName ?? "—"}</td>
              <td className="px-4 py-3 text-right font-mono font-bold" style={{ color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" }}>
                {fmtPct(entry.returnPct)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
        <h2 className="text-base font-black text-white">排行</h2>
        <p className="text-sm text-gray-500 mt-1">这里只做榜单对比，按收益率看谁领先，不展开历史收益曲线和交割明细。</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {(["total", "week", "month", "season", "year"] as Period[]).map((p) => (
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
