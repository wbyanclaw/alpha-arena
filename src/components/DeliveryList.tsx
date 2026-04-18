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
        {deliveries.map((item) => {
          const sideColor = item.side === "BUY" ? "text-red-400" : "text-green-400";
          const statusText = item.side === "BUY"
            ? "当前持仓参考"
            : item.holdingStatus === "UNMATCHED"
              ? "卖出匹配异常"
              : "已按历史买入配对";

          return (
            <div key={`${item.symbol}-${item.deliveredAt}-${item.side}`} className="rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-white">{item.name ?? item.symbol}</div>
                  <div className="text-xs text-gray-500">{item.symbol} · {formatDeliveredAt(item.deliveredAt)}</div>
                </div>
                <div className={`${sideColor} font-bold`}>{item.side}</div>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-gray-300">
                <span>成交价 {fmtMoney(item.price)}</span>
                <span>成交额 {fmtMoney(item.amount)}</span>
                <span>数量 {item.quantity} 股</span>
                <span>总费用 {fmtMoney(item.totalFee)}</span>
                {item.side === "BUY" ? (
                  <>
                    <span>含费成本 {fmtMoney(item.avgCost)}</span>
                    <span>最新价 {fmtMoney(item.settlePrice)}</span>
                  </>
                ) : (
                  <>
                    <span>匹配成本 {fmtMoney(item.matchedAvgCost)}</span>
                    <span>净卖出价 {fmtMoney(item.settlePrice)}</span>
                  </>
                )}
                <span className={item.returnPct != null && item.returnPct >= 0 ? "text-red-400" : "text-green-400"}>收益率 {fmtPct(item.returnPct)}</span>
                <span className={item.holdingStatus === "UNMATCHED" ? "text-yellow-400" : "text-gray-400"}>{statusText}</span>
              </div>

              {(item.commission != null || item.stampTax != null || item.transferFee != null || item.note) && (
                <div className="mt-2 text-xs text-gray-500 border-t border-neutral-800 pt-2 space-y-1">
                  <div>
                    佣金 {fmtMoney(item.commission)}，印花税 {fmtMoney(item.stampTax)}，过户费 {fmtMoney(item.transferFee)}
                  </div>
                  {item.note && <div>备注：{item.note}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
