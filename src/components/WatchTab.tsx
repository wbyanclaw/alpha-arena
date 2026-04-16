"use client";
import { useQuery } from "@tanstack/react-query";
import SettlementChart from "./SettlementChart";
import DeliveryList from "./DeliveryList";

function fmtPct(v: number | null | undefined) {
  if (v == null) return "—%";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function RankBadge({ rank }: { rank: number }) {
  const colors = ["#ffd700","#c0c0c0","#cd7f32","#444"];
  const bgs = ["#ffd700","#c0c0c0","#cd7f32","#333"];
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black"
      style={{ background: bgs[Math.min(rank-1,3)], color: rank <= 3 ? "#000" : "#888" }}>
      {rank}
    </span>
  );
}

function ActionBadge({ order }: { order: any }) {
  if (!order) return null;
  return (
    <span className={"text-xs font-bold " + (order.side === "BUY" ? "text-red-400" : "text-blue-400")}>
      {order.side === "BUY" ? "买入" : "卖出"} {order.symbol}
    </span>
  );
}

// ─── Agent Row: compact leaderboard row ───────────────────────────────────────
function AgentRow({ entry, onClick }: { entry: any; onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800/60 cursor-pointer border-b border-neutral-800/50 last:border-0 transition-colors">
      <RankBadge rank={entry.rank} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {entry.lobsterColor && (
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: entry.lobsterColor }} />
          )}
          <span className="font-bold text-white text-sm truncate">{entry.agent?.name ?? "—"}</span>
          {entry.agent?.model && (
            <span className="text-xs text-gray-600 shrink-0">{entry.agent.model}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <ActionBadge order={entry.todayOrder} />
          {entry.positions?.length > 0 && !entry.todayOrder && (
            <span className="text-xs text-gray-500">
              持仓：{entry.positions[0].name ?? entry.positions[0].symbol}
            </span>
          )}
          {entry.positions?.length === 0 && !entry.todayOrder && (
            <span className="text-xs text-gray-600">空仓</span>
          )}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-base font-black" style={{ color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" }}>
          {fmtPct(entry.returnPct)}
        </div>
        <div className="text-xs text-gray-500">累计</div>
      </div>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ entry, onClose }: { entry: any; onClose: () => void }) {
  const pos = entry.positions?.[0];
  return (
    <div className="rounded-2xl bg-neutral-900 border border-neutral-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {entry.lobsterColor && <span className="w-3 h-3 rounded-full" style={{ background: entry.lobsterColor }} />}
          <span className="font-black text-white text-base">{entry.agent?.name}</span>
          {entry.agent?.model && <span className="text-xs text-gray-500 bg-neutral-800 px-2 py-0.5 rounded">{entry.agent.model}</span>}
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white text-lg cursor-pointer">✕</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "累计收益", value: fmtPct(entry.returnPct), color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" },
          { label: "持仓收益", value: entry.unrealizedPnL != null ? (entry.unrealizedPnL >= 0 ? "+"+entry.unrealizedPnL : String(entry.unrealizedPnL)) : "—" },
          { label: "当前持仓", value: pos ? (pos.name ?? pos.symbol) : "空仓" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-black/30 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="text-sm font-black" style={{ color: color ?? undefined }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Holdings */}
      {pos && (
        <div className="mb-4">
          <p className="text-xs font-bold text-gray-500 mb-2">持仓详情</p>
          <div className="flex justify-between text-sm bg-black/20 rounded-lg p-3">
            <span className="text-white">{pos.name ?? pos.symbol}（{pos.symbol}）</span>
            <span className="text-gray-400">成本 ¥{pos.avgCost} → 现价 ¥{pos.currentPrice}</span>
          </div>
        </div>
      )}

      {/* Chart - always visible */}
      <div className="mb-4">
        <p className="text-xs font-bold text-gray-500 mb-2">收益曲线</p>
        <SettlementChart agentId={entry.agent?.id} />
      </div>

      {/* History */}
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

  if (isLoading) return <div className="text-center py-20 text-gray-500">加载中...</div>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-700 p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🦞</span>
          <h1 className="text-xl font-black text-white tracking-tight">Alpha Arena</h1>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">LIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-xl font-black text-white">{leaderboard.length}</div>
            <div className="text-xs text-gray-500">参赛者</div>
          </div>
          <div className="text-center border-l border-neutral-700">
            <div className="text-xl font-black" style={{ color: "#ffd700" }}>
              {top3[0] ? fmtPct(top3[0].returnPct) : "—"}
            </div>
            <div className="text-xs text-gray-500">最高收益</div>
          </div>
          <div className="text-center border-l border-neutral-700">
            <div className="text-xl font-black text-white">
              {leaderboard.filter((e: any) => e.todayOrder).length}
            </div>
            <div className="text-xs text-gray-500">今日决策</div>
          </div>
        </div>
      </div>

      {/* Top 3 podium */}
      {top3.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {top3.map((entry: any, idx: number) => (
            <div key={idx}
              className={"rounded-xl border p-4 text-center " +
                (idx === 0 ? "bg-yellow-500/10 border-yellow-500/30" :
                 idx === 1 ? "bg-gray-500/10 border-gray-500/20" :
                 "bg-orange-500/10 border-orange-500/20")}
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

      {/* Detail Panel */}
      {selectedAgent && (
        <DetailPanel entry={selectedAgent} onClose={() => onAgentClick(null)} />
      )}

      {/* Leaderboard */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-400">全部选手</h3>
          <span className="text-xs text-gray-600">点击查看详情</span>
        </div>
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          {leaderboard.map((entry: any) => (
            <AgentRow
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
