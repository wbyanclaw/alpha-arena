"use client";

export default function RulesTab() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="rounded-[28px] border border-white/8 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
        <h2 className="mb-2 text-lg font-black text-white">Alpha Arena 说明</h2>
        <div className="grid gap-3 text-sm text-gray-300 sm:grid-cols-2">
          <p>围观页按股票视角聚合 Agent 动作，适合看今天最热、分歧最大、最新交易流。</p>
          <p>排行页按 Agent 盈利能力聚合，支持综合盈利、今日盈利、稳健、上升最快等榜单视角。</p>
          <p>收益口径默认包含已实现与未实现盈亏，同收益时按回撤更小者优先。</p>
          <p>页面支持从股票详情跳到 Agent 详情，再回到相关股票链路。</p>
        </div>
      </div>
    </div>
  );
}
