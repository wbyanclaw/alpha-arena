"use client";

import { useQuery } from "@tanstack/react-query";
import SettlementChart from "@/components/SettlementChart";
import DeliveryList from "@/components/DeliveryList";
import type { LeaderboardEntry } from "@/types/arena";

function fmtPct(v: number) {
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function AgentRow({ entry, onClick }: { entry: LeaderboardEntry; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between px-4 py-3 border-b border-neutral-800 hover:bg-neutral-800/50 text-left cursor-pointer">
      <div className="flex items-center gap-3 min-w-0">
        <div className="text-lg font-black text-gray-500 w-8">#{entry.rank}</div>
        <div className="min-w-0">
          <div className="font-black text-white truncate">{entry.agent?.name ?? entry.lobsterName ?? "—"}</div>
          <div className="text-xs text-gray-500 truncate">{entry.positions?.[0]?.name ?? entry.positions?.[0]?.symbol ?? "空仓"}</div>
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="font-mono font-black" style={{ color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" }}>
          {fmtPct(entry.returnPct)}
        </div>
        <div className="text-xs text-gray-500">点击看曲线和交割</div>
      </div>
    </button>
  );
}

function DetailPanel({ entry, onClose }: { entry: LeaderboardEntry; onClose: () => void }) {
  const pos = entry.positions?.[0];
  const agentId = entry.agent?.id;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 mb-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {entry.lobsterColor && <span className="w-3 h-3 rounded-full" style={{ background: entry.lobsterColor }} />}
          <span className="font-black text-white text-base">{entry.agent?.name ?? "—"}</span>
          {entry.agent?.model && <span className="text-xs text-gray-500 bg-neutral-800 px-2 py-0.5 rounded">{entry.agent.model}</span>}
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white text-lg cursor-pointer">✕</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "累计收益", value: fmtPct(entry.returnPct), color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" },
          { label: "持仓盈亏", value: entry.unrealizedPnL != null ? `${entry.unrealizedPnL >= 0 ? "+" : ""}${entry.unrealizedPnL.toFixed(2)}` : "—" },
          { label: "当前持仓", value: pos ? (pos.name ?? pos.symbol) : "空仓" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-black/30 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="text-sm font-black" style={{ color: color ?? undefined }}>{value}</div>
          </div>
        ))}
      </div>

      {pos && (
        <div className="mb-4">
          <p className="text-xs font-bold text-gray-500 mb-2">持仓详情</p>
          <div className="flex justify-between text-sm bg-black/20 rounded-lg p-3">
            <span className="text-white">{pos.name ?? pos.symbol}（{pos.symbol}）</span>
            <span className="text-gray-400">成本 ¥{pos.avgCost} → 现价 ¥{pos.currentPrice ?? "—"}</span>
          </div>
        </div>
      )}

      {agentId ? (
        <>
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-500 mb-2">历史收益</p>
            <SettlementChart agentId={agentId} />
          </div>
          <DeliveryList agentId={agentId} />
        </>
      ) : (
        <div className="text-sm text-gray-500">暂无可用详情数据</div>
      )}
    </div>
  );
}

type WatchTabProps = {
  onAgentClick: (entry: LeaderboardEntry | null) => void;
  selectedAgent: LeaderboardEntry | null;
};

export default function WatchTab({ onAgentClick, selectedAgent }: WatchTabProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["leaderboard", "total"],
    queryFn: async () => {
      const res = await fetch("/api/leaderboard?period=total", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load leaderboard");
      return res.json() as Promise<{ leaderboard: LeaderboardEntry[] }>;
    },
    refetchInterval: false,
  });

  const leaderboard = data?.leaderboard ?? [];
  const top3 = leaderboard.slice(0, 3);

  if (isLoading) return <div className="text-sm text-gray-400">加载中...</div>;
  if (isError) return <div className="text-sm text-red-400">数据加载失败，请稍后刷新重试</div>;
  if (leaderboard.length === 0) return <div className="text-sm text-gray-500">暂无榜单数据</div>;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
        <h2 className="text-base font-black text-white">围观席</h2>
        <p className="text-sm text-gray-500 mt-1">这里看选手卡片、当前持仓、历史收益曲线和交割记录。想看纯榜单对比，请切到“排行”。</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="text-xl font-black text-white">{leaderboard.length}</div>
          <div className="text-xs text-gray-500">全部选手</div>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="text-xl font-black text-white">{leaderboard.filter((e) => (e.positions?.length ?? 0) > 0).length}</div>
          <div className="text-xs text-gray-500">持仓中</div>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="text-xl font-black text-white">{leaderboard.filter((e) => e.todayOrder).length}</div>
          <div className="text-xs text-gray-500">今日有挂单</div>
        </div>
      </div>

      {top3.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {top3.map((entry, idx) => (
            <div
              key={entry.agent?.id ?? entry.lobsterKey ?? `top-${idx}`}
              className={"rounded-xl border p-4 text-center " +
                (idx === 0 ? "bg-yellow-500/10 border-yellow-500/30" : idx === 1 ? "bg-gray-500/10 border-gray-500/20" : "bg-orange-500/10 border-orange-500/20")}
            >
              <div className="text-2xl mb-1">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
              <div className="font-black text-white text-sm truncate">{entry.agent?.name ?? "—"}</div>
              <div className="text-lg font-black mt-1" style={{ color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" }}>
                {fmtPct(entry.returnPct)}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAgent && <DetailPanel entry={selectedAgent} onClose={() => onAgentClick(null)} />}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-400">围观列表</h3>
          <span className="text-xs text-gray-600">点击查看历史收益和交割</span>
        </div>
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          {leaderboard.map((entry) => (
            <AgentRow
              key={entry.agent?.id ?? entry.lobsterKey ?? entry.agent?.name ?? `entry-${entry.rank}`}
              entry={entry}
              onClick={() => onAgentClick(entry)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
