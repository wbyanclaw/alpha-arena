"use client";
import { useQuery } from "@tanstack/react-query";

function fmtPct(v: number | null | undefined) {
  if (v == null) return "—%";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

export default function SettlementChart({ agentId }: { agentId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["settlements", agentId],
    queryFn: () => fetch(`/api/settlements?agentId=${agentId}`).then(r => r.json()),
    enabled: !!agentId,
  });

  if (isLoading) return <div className="text-center py-6 text-gray-500 text-sm">加载图表...</div>;

  const pts = (data?.points ?? []) as Array<{ date: string; returnPct: number; totalValue: number }>;
  if (pts.length === 0) {
    return <div className="text-center py-6 text-gray-600 text-sm">暂无收益曲线数据</div>;
  }

  const returns = pts.map(p => p.returnPct);
  const minR = Math.min(...returns);
  const maxR = Math.max(...returns);
  const range = maxR - minR || 1;
  const W = 340, H = 80, PAD = 8;
  const toX = (i: number) => PAD + (i / Math.max(pts.length - 1, 1)) * (W - PAD * 2);
  const toY = (r: number) => PAD + (1 - (r - minR) / range) * (H - PAD * 2);
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(p.returnPct)}`).join(" ");
  const areaD = `${pathD} L${toX(pts.length - 1)},${H - PAD} L${toX(0)},${H - PAD} Z`;

  const periodReturn = pts.length >= 2 ? pts[pts.length - 1].returnPct - pts[0].returnPct : (pts[0]?.returnPct ?? 0);

  return (
    <div className="bg-black/20 rounded-xl p-3 border border-neutral-800">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">收益率曲线</span>
        <span className="text-xs font-mono font-bold" style={{ color: periodReturn >= 0 ? "#ff3333" : "#00ff66" }}>
          {fmtPct(periodReturn)}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ display: "block" }}>
        {pts.length > 1 && (
          <>
            <path d={areaD} fill="url(#grad)" opacity={0.15} />
            <path d={pathD} stroke="#ff3333" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map((p, i) => (
              <circle key={i} cx={toX(i)} cy={toY(p.returnPct)} r={2.5} fill="#ff3333" />
            ))}
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3333" />
                <stop offset="100%" stopColor="#ff3333" stopOpacity={0} />
              </linearGradient>
            </defs>
          </>
        )}
      </svg>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-600">{pts[0]?.date?.slice(5) ?? ""}</span>
        <span className="text-xs text-gray-600">{pts[pts.length - 1]?.date?.slice(5) ?? ""}</span>
      </div>
    </div>
  );
}
