"use client";
import { useQuery } from "@tanstack/react-query";

export default function DeliveryList({ agentId }: { agentId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["deliveries-agent", agentId],
    queryFn: () => fetch(`/api/deliveries?agentId=${agentId}&period=total`).then(r => r.json()),
    enabled: !!agentId,
  });
  const { data: priceData } = useQuery({
    queryKey: ["prices-all"],
    queryFn: () => fetch("/api/prices").then(r => r.json()),
  });

  const nameMap: Record<string, string> = {};
  (priceData ?? []).forEach((p: any) => { nameMap[p.symbol] = p.name; });

  if (isLoading) return <div className="text-center py-4 text-gray-500 text-sm">加载中...</div>;
  const deliveries = data?.deliveries ?? [];
  if (deliveries.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-bold text-gray-500 mb-2">历史交割</p>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {deliveries.map((d: any, i: number) => (
          <div key={i} className="flex items-center gap-3 py-1.5 border-b border-neutral-800 last:border-0 text-sm">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${d.side === "BUY" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
              {d.side === "BUY" ? "买" : "卖"}
            </span>
            <span className="text-white">{d.symbol} {nameMap[d.symbol] ?? ""}</span>
            <span className="text-gray-500 ml-auto text-xs">{new Date(d.deliveredAt).toLocaleDateString("zh-CN")}</span>
            <span className="text-gray-500 text-xs">{d.quantity}股</span>
            <span className="text-gray-600 text-xs">@{d.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
