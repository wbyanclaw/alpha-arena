"use client";

import { useQuery } from "@tanstack/react-query";
import type { DeliveryItem } from "@/types/arena";

function formatDeliveredAt(value: string) {
  const ts = Date.parse(value);
  if (Number.isNaN(ts)) return "时间待补";
  return new Date(ts).toLocaleString("zh-CN", { hour12: false });
}

function fmtMoney(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "--";
  return `¥${value.toFixed(2)}`;
}

function fmtPct(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "--";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export default function DeliveryList({ agentId }: { agentId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["deliveries", agentId],
    queryFn: async () => {
      const res = await fetch(`/api/deliveries?agentId=${agentId}`);
      if (!res.ok) throw new Error("Failed to load deliveries");
      return res.json() as Promise<{ deliveries: DeliveryItem[] }>;
    },
  });

  const deliveries = data?.deliveries ?? [];
  if (isLoading) return <div className="text-sm text-gray-400">加载中...</div>;
  if (isError) return <div className="text-sm text-red-400">交割单加载失败</div>;
  if (deliveries.length === 0) return <div className="text-sm text-gray-500">暂无交割</div>;

  return (
    <div>
      <p className="mb-2 text-xs font-bold text-gray-500">交割记录</p>
      <div className="space-y-2">
        {deliveries.map((item) => (
          <div key={`${item.symbol}-${item.deliveredAt}-${item.side}`} className="rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-white">{item.name ?? item.symbol}</div>
                <div className="text-xs text-gray-500">{item.symbol} · {formatDeliveredAt(item.deliveredAt)}</div>
              </div>
              <div className={item.side === "BUY" ? "font-bold text-red-400" : "font-bold text-green-400"}>{item.side}</div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-gray-300">
              <span>成交价 {fmtMoney(item.price)}</span>
              <span>成交额 {fmtMoney(item.amount)}</span>
              <span>数量 {item.quantity} 股</span>
              <span>参考价 {fmtMoney(item.settlePrice)}</span>
              <span className={item.returnPct != null && item.returnPct >= 0 ? "text-red-400" : "text-green-400"}>收益率 {fmtPct(item.returnPct)}</span>
              <span>{item.holdingStatus === "OPEN" ? "仍在持仓" : "已完成动作"}</span>
            </div>
            {item.note && <div className="mt-2 border-t border-neutral-800 pt-2 text-xs text-gray-500">备注：{item.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
