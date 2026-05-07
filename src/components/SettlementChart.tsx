"use client";

import { useQuery } from "@tanstack/react-query";

function fmtPct(v: number | null | undefined) {
  if (v == null || Number.isNaN(v)) return "—%";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function fmtDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00+08:00");
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function SettlementChart({ agentId }: { agentId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["agent-detail-chart", agentId],
    queryFn: async () => {
      const res = await fetch(`/api/leaderboard?agentId=${agentId}`);
      if (!res.ok) throw new Error("Failed to load settlements");
      return res.json() as Promise<{
        agent: {
          dailyReturns: number[];
          settlementDates: string[];
          isSettlement: boolean[];
          deliveries: Array<{ side: string; deliveredAt: string; symbol: string }>;
        };
      }>;
    },
    enabled: !!agentId,
  });

  if (isLoading) return <div className="py-6 text-center text-sm text-gray-500">加载图表...</div>;
  if (isError) return <div className="py-6 text-center text-sm text-red-400">历史收益加载失败</div>;

  const returns = data?.agent?.dailyReturns ?? [];
  const settlementDates = data?.agent?.settlementDates ?? [];
  const isSettlement = data?.agent?.isSettlement ?? [];
  const deliveries = data?.agent?.deliveries ?? [];

  if (returns.length === 0) return <div className="py-6 text-center text-sm text-gray-600">暂无收益曲线数据</div>;

  // Determine trade indices: indices that overlap with delivery dates
  const tradeIndices = new Set<number>();
  for (const d of deliveries) {
    const tradeDate = d.deliveredAt?.slice(0, 10);
    if (!tradeDate) continue;
    const idx = settlementDates.findIndex((sd) => sd === tradeDate);
    if (idx >= 0) tradeIndices.add(idx);
  }

  const minR = Math.min(...returns);
  const maxR = Math.max(...returns);
  const range = maxR - minR || 1;
  const W = 340, H = 80, PAD = 8;
  const toX = (i: number) => PAD + (i / Math.max(returns.length - 1, 1)) * (W - PAD * 2);
  const toY = (r: number) => PAD + (1 - (r - minR) / range) * (H - PAD * 2);
  const pathD = returns.map((p, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(p)}`).join(" ");
  const areaD = `${pathD} L${toX(returns.length - 1)},${H - PAD} L${toX(0)},${H - PAD} Z`;
  const periodReturn = returns.length >= 2 ? returns[returns.length - 1] - returns[0] : returns[0];

  // Only show labels at real settlement points, up to 4 evenly distributed
  const labelIndices = new Set(isSettlement.map((v, i) => (v ? i : -1)).filter((i) => i >= 0));
  const labelIdxArr = Array.from(labelIndices);
  const step = Math.max(1, Math.floor(labelIdxArr.length / 4));
  const showLabel = new Set(labelIdxArr.filter((_, k) => k % step === 0));

  return (
    <div className="rounded-xl border border-neutral-800 bg-black/20 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-gray-500">收益率曲线</span>
        <span className="text-xs font-mono font-bold" style={{ color: periodReturn >= 0 ? "#ff3333" : "#00ff66" }}>{fmtPct(periodReturn)}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ display: "block" }}>
        {returns.length > 1 ? (
          <>
            <path d={areaD} fill="url(#settlement-grad)" opacity={0.15} />
            <path d={pathD} stroke="#ff3333" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {returns.map((p, i) => {
              const isTrade = tradeIndices.has(i);
              const r = isTrade ? 4 : 2.5;
              const color = isTrade ? "#ffdd00" : "#ff3333";
              return (
                <g key={i}>
                  <circle cx={toX(i)} cy={toY(p)} r={r} fill={color} />
                  {showLabel.has(i) && (
                    <text x={toX(i)} y={H - 1} textAnchor="middle" fontSize="7" fill="#888" fontFamily="monospace">
                      {fmtDate(settlementDates[i] ?? "")}
                    </text>
                  )}
                  {isTrade && (
                    <title>{settlementDates[i]} 交易</title>
                  )}
                </g>
              );
            })}
            <defs>
              <linearGradient id="settlement-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3333" />
                <stop offset="100%" stopColor="#ff3333" stopOpacity={0} />
              </linearGradient>
            </defs>
          </>
        ) : (
          <circle cx={toX(0)} cy={toY(returns[0])} r={3} fill="#ff3333" />
        )}
      </svg>
    </div>
  );
}
