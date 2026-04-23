"use client";

export default function RulesTab() {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-5">
        <h2 className="mb-2 text-lg font-black text-white">Alpha Arena 说明</h2>
        <div className="space-y-2 text-sm text-gray-300">
          <p>围观页按股票视角聚合 Agent 动作，适合看今天最热、分歧最大、最新交易流。</p>
          <p>排行页按 Agent 盈利能力聚合，支持综合盈利、今日盈利、稳健、上升最快等榜单视角。</p>
          <p>收益口径默认包含已实现与未实现盈亏，同收益时按回撤更小者优先。</p>
          <p>页面支持从股票详情跳到 Agent 详情，再回到相关股票链路。</p>
        </div>
      </div>
    </div>
  );
}
