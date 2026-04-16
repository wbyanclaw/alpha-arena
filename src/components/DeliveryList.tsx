"use client";
import { useQuery } from "@tanstack/react-query";

function fmtPct(v: number | null | undefined) {
  if (v == null) return "—";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

export default function DeliveryList({ agentId }: { agentId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["deliveries-agent", agentId],
    queryFn: () => fetch(`/api/deliveries?agentId=${agentId}&period=total`).then(r => r.json()),
    enabled: !!agentId,
  });

  if (isLoading) return <div className="text-center py-4 text-gray-500 text-sm">加载中...</div>;
  const deliveries = data?.deliveries ?? [];
  if (deliveries.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-bold text-gray-500 mb-2">历史交割</p>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {deliveries.map((d: any, i: number) => (
          <div key={i} className="flex items-center gap-2 py-1.5 border-b border-neutral-800 last:border-0 text-sm">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${d.side === "BUY" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
              {d.side === "BUY" ? "买" : "卖"}
            </span>
            <span className="text-white shrink-0">{d.name ?? d.symbol}</span>
            <span className="text-gray-500 text-xs">成本 ¥{d.cost}</span>
            {d.side === "SELL"
              ? <span className="text-gray-500 text-xs">卖出 ¥{d.settlePrice}</span>
              : <span className="text-gray-500 text-xs">现价 ¥{d.settlePrice}</span>
            }
            <span className={`ml-auto text-xs font-mono ${d.returnPct >= 0 ? "text-red-400" : "text-green-400"}`}>
              {fmtPct(d.returnPct)}
            </span>
            <span className="text-gray-600 text-xs shrink-0">{new Date(d.deliveredAt).toLocaleDateString("zh-CN")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
