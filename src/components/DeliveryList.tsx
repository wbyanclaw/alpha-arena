"use client";

import { useQuery } from "@tanstack/react-query";
import type { DeliveryItem } from "@/types/arena";

function formatDeliveredAt(value: string) {
  const ts = Date.parse(value);
  if (Number.isNaN(ts)) return "时间待补";
  return new Date(ts).toLocaleString("zh-CN", { hour12: false });
}

type Props = { agentId: string };

type DeliveryResponse = {
  agentId: string;
  period: string;
  deliveries: DeliveryItem[];
};

async function fetchDeliveries(agentId: string): Promise<DeliveryResponse> {
  const res = await fetch(`/api/deliveries?agentId=${agentId}`);
  if (!res.ok) throw new Error("Failed to load deliveries");
  return res.json();
}

export default function DeliveryList({ agentId }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["deliveries", agentId],
    queryFn: () => fetchDeliveries(agentId),
  });

  const deliveries = data?.deliveries ?? [];

  if (isLoading) return <div className="text-sm text-gray-400">加载中...</div>;
  if (isError) return <div className="text-sm text-red-400">交割单加载失败</div>;
  if (deliveries.length === 0) return <div className="text-sm text-gray-500">暂无交割</div>;

  return (
    <div>
      <p className="text-xs font-bold text-gray-500 mb-2">交割记录</p>
      <div className="space-y-2">
        {deliveries.map((item) => (
          <div key={`${item.symbol}-${item.deliveredAt}-${item.side}`} className="rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-white">{item.name ?? item.symbol}</div>
                <div className="text-xs text-gray-500">{item.symbol} · {formatDeliveredAt(item.deliveredAt)}</div>
              </div>
              <div className={item.side === "BUY" ? "text-red-400 font-bold" : "text-green-400 font-bold"}>{item.side}</div>
            </div>
            <div className="mt-2 text-gray-400 flex flex-wrap gap-x-4 gap-y-1">
              <span>{item.quantity} 股 @ {item.price}</span>
              {item.cost != null && <span>成本 {item.cost}</span>}
              {item.settlePrice != null && <span>结算价 {item.settlePrice}</span>}
              {item.returnPct != null && <span>收益率 {item.returnPct >= 0 ? "+" : ""}{item.returnPct.toFixed(2)}%</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
