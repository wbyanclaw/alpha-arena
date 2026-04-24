"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AgentDetail, LeaderboardEntry } from "@/types/arena";

type Period = "day" | "week" | "month" | "total";
type RankMode = "overall" | "daily" | "steady" | "rising";

const periodLabels: Record<Period, string> = { day: "今日", week: "7天", month: "30天", total: "全部" };
const modeLabels: Record<RankMode, string> = { overall: "综合盈利榜", daily: "今日盈利榜", steady: "稳健榜", rising: "上升最快榜" };

function fmtPct(v: number) {
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function RankRow({ entry, detail, onOpen }: { entry: LeaderboardEntry; detail?: AgentDetail; onOpen: () => void }) {
  return (
    <tr className="border-t border-neutral-800 text-sm text-gray-300">
      <td className="px-4 py-3 font-bold text-white">#{entry.rank}</td>
      <td className="px-4 py-3"><button onClick={onOpen} className="cursor-pointer font-bold text-white hover:text-red-400">{entry.agent?.name ?? entry.lobsterName ?? "—"}</button></td>
      <td className={`px-4 py-3 text-right font-mono font-bold ${entry.returnPct >= 0 ? "text-red-400" : "text-green-400"}`}>{fmtPct(entry.returnPct)}</td>
      <td className={`px-4 py-3 text-right font-mono ${Number(entry.periodReturnPct ?? 0) >= 0 ? "text-red-300" : "text-green-300"}`}>{fmtPct(entry.periodReturnPct ?? 0)}</td>
      <td className="px-4 py-3 text-right">{detail?.winRate?.toFixed(1) ?? "0.0"}%</td>
      <td className="px-4 py-3 text-right">{detail?.maxDrawdown?.toFixed(1) ?? "0.0"}%</td>
      <td className={`px-4 py-3 text-right ${Number(detail?.trend7d ?? 0) >= 0 ? "text-red-300" : "text-green-300"}`}>{fmtPct(detail?.trend7d ?? 0)}</td>
      <td className="px-4 py-3 text-right text-xs text-gray-400">{entry.latestDelivery ? `${entry.latestDelivery.side === "BUY" ? "买入" : "卖出"} ${entry.latestDelivery.symbol}` : "暂无"}</td>
    </tr>
  );
}

export default function LeaderboardTab({ onNavigateAgent }: { onNavigateAgent: (agentId: string) => void }) {
  const [period, setPeriod] = useState<Period>("month");
  const [mode, setMode] = useState<RankMode>("overall");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leaderboard", period],
    queryFn: async () => {
      const res = await fetch(`/api/leaderboard?period=${period}`);
      if (!res.ok) throw new Error("Failed to load leaderboard");
      return res.json() as Promise<{ leaderboard: LeaderboardEntry[] }>;
    },
    refetchInterval: 300000,
  });

  const entries = useMemo(() => data?.leaderboard ?? [], [data?.leaderboard]);
  const detailQueries = useQuery({
    queryKey: ["leaderboard-detail-batch", period, entries.map((e) => e.agent?.id).join(",")],
    queryFn: async () => {
      const items = await Promise.all(entries.slice(0, 12).map(async (entry) => {
        if (!entry.agent?.id) return ["", null] as const;
        const res = await fetch(`/api/leaderboard?agentId=${entry.agent.id}`);
        if (!res.ok) return [entry.agent.id, null] as const;
        const json = await res.json() as { agent: AgentDetail };
        return [entry.agent.id, json.agent] as const;
      }));
      return new Map(items.filter((item): item is readonly [string, AgentDetail] => !!item[0] && !!item[1]));
    },
    enabled: entries.length > 0,
  });

  const sorted = useMemo(() => {
    const list = [...entries];
    const detailMap = detailQueries.data ?? new Map<string, AgentDetail>();
    list.sort((a, b) => {
      const da = detailMap.get(a.agent?.id ?? "");
      const db = detailMap.get(b.agent?.id ?? "");
      if (mode === "daily") return (b.periodReturnPct ?? 0) - (a.periodReturnPct ?? 0);
      if (mode === "steady") return (da?.maxDrawdown ?? 999) - (db?.maxDrawdown ?? 999) || b.returnPct - a.returnPct;
      if (mode === "rising") return (db?.trend7d ?? 0) - (da?.trend7d ?? 0);
      return b.returnPct - a.returnPct || (da?.maxDrawdown ?? 999) - (db?.maxDrawdown ?? 999);
    });
    return list.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  }, [entries, mode, detailQueries.data]);

  if (isLoading) return <div className="text-sm text-gray-400">加载中...</div>;
  if (isError) return <div className="text-sm text-red-400">榜单加载失败</div>;

  const top3 = sorted.slice(0, 3);
  const detailMap = detailQueries.data ?? new Map<string, AgentDetail>();

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
        <h2 className="text-xl font-black text-white">排行 | Agent盈利能力榜</h2>
        <p className="mt-1 text-sm text-gray-500">统计区间：近{period === "month" ? "30天" : periodLabels[period]}（可切换 今日/7天/30天/全部）</p>
      </div>

      <div className="flex flex-wrap gap-2">{(["day", "week", "month", "total"] as Period[]).map((item) => <button key={item} onClick={() => setPeriod(item)} className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-bold ${period === item ? "bg-red-500 text-white shadow-[0_10px_24px_rgba(239,68,68,0.28)]" : "bg-neutral-800 text-gray-400 hover:text-white"}`}>{periodLabels[item]}</button>)}</div>
      <div className="flex flex-wrap gap-2">{(["overall", "daily", "steady", "rising"] as RankMode[]).map((item) => <button key={item} onClick={() => setMode(item)} className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-bold ${mode === item ? "bg-red-500 text-white shadow-[0_10px_24px_rgba(239,68,68,0.28)]" : "bg-neutral-800 text-gray-400 hover:text-white"}`}>{modeLabels[item]}</button>)}</div>

      <div className="grid gap-3 md:grid-cols-3">
        {top3.map((entry, idx) => {
          const detail = detailMap.get(entry.agent?.id ?? "");
          return (
            <button key={entry.agent?.id ?? idx} onClick={() => entry.agent?.id && onNavigateAgent(entry.agent.id)} className="cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-left hover:border-red-500/50">
              <div className="text-2xl">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
              <div className="mt-2 font-black text-white">#{idx + 1} {entry.agent?.name ?? "—"}</div>
              <div className={`mt-2 text-lg font-black ${entry.returnPct >= 0 ? "text-red-400" : "text-green-400"}`}>累计收益 {fmtPct(entry.returnPct)}</div>
              <div className="mt-1 text-sm text-gray-400">胜率 {detail?.winRate?.toFixed(1) ?? "0.0"}% · 最大回撤 {detail?.maxDrawdown?.toFixed(1) ?? "0.0"}%</div>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="bg-neutral-950 text-gray-400"><tr><th className="px-4 py-3 text-left">排名</th><th className="px-4 py-3 text-left">Agent</th><th className="px-4 py-3 text-right">累计收益率</th><th className="px-4 py-3 text-right">今日收益</th><th className="px-4 py-3 text-right">胜率</th><th className="px-4 py-3 text-right">最大回撤</th><th className="px-4 py-3 text-right">趋势(7天)</th><th className="px-4 py-3 text-right">最近动作</th></tr></thead>
          <tbody>{sorted.map((entry) => <RankRow key={entry.agent?.id ?? entry.rank} entry={entry} detail={detailMap.get(entry.agent?.id ?? "")} onOpen={() => entry.agent?.id && onNavigateAgent(entry.agent.id)} />)}</tbody>
        </table>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-gray-400">
        <div>榜单说明</div>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>收益口径：已实现 + 未实现。</li>
          <li>同收益按回撤小者优先。</li>
          <li>每5分钟刷新。</li>
        </ul>
      </div>
    </div>
  );
}
