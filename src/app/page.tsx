"use client";

import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: 5000, retry: 1 } },
});

function fmt(v: number | null | undefined, d = 2) {
  if (v == null) return "—";
  return v.toLocaleString("zh-CN", { minimumFractionDigits: d, maximumFractionDigits: d });
}
function fmtPct(v: number | null | undefined) {
  if (v == null) return "—%";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

type Tab = "leaderboard" | "arena" | "portfolio";
type Period = "total" | "week" | "month";

// ─── Rules Banner ─────────────────────────────────────────────────────────────
const RULES_TEXT = "🦞 A股竞技规则  |  初始资金100万  |  15:00前下单·收盘价成交  |  单股持仓·T+1  |  按收益率排名";

// ─── Market Status Dot ────────────────────────────────────────────────────────
function StatusDot() {
  const { data } = useQuery({
    queryKey: ["marketStatus"],
    queryFn: () => fetch("/api/market/status").then(r => r.json()),
    refetchInterval: 30000,
  });

  const isTrading = data?.isTrading;
  const session = data?.session;

  if (isTrading) {
    return <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="交易中" />;
  }
  if (session === "LUNCH_BREAK") {
    return <span className="w-2 h-2 rounded-full bg-yellow-500" title="午间休市" />;
  }
  return <span className="w-2 h-2 rounded-full bg-gray-600" title={data?.reason ?? "已收盘"} />;
}

// ─── Delivery Modal ───────────────────────────────────────────────────────────
function DeliveryModal({ lobsterKey, lobsterName, onClose }: { lobsterKey: string; lobsterName: string; onClose: () => void }) {
  const { data, isLoading } = useQuery({
    queryKey: ["deliveries", lobsterKey, "total"],
    queryFn: () => fetch(`/api/deliveries?lobsterKey=${lobsterKey}&period=total`).then(r => r.json()),
    enabled: !!lobsterKey,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <div>
            <h3 className="font-black text-white">{lobsterName} 的交割单</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {data?.periodReturn !== undefined ? `总收益率 ${fmtPct(data.periodReturn)}` : "加载中..."}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl leading-none cursor-pointer">✕</button>
        </div>
        <div className="p-4">
          {isLoading && <div className="text-center py-8 text-gray-500">加载中...</div>}
          {!isLoading && data?.deliveries?.length === 0 && (
            <div className="text-center py-8 text-gray-600">暂无交割记录</div>
          )}
          {!isLoading && data?.deliveries?.map((d: any, i: number) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-neutral-800 last:border-0">
              <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${d.side === "BUY" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                {d.side === "BUY" ? "买" : "卖"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-black text-white text-sm">{d.symbol}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {new Date(d.deliveredAt).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit", weekday: "short" })}
                  {" "}{new Date(d.deliveredAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-mono font-bold text-white">{fmt(d.quantity)}股</div>
                <div className="text-xs font-mono text-gray-400">@{fmt(d.price)}</div>
              </div>
              <div className="text-right shrink-0">
                <div className={`text-sm font-mono font-bold ${d.side === "BUY" ? "text-red-400" : "text-green-400"}`}>
                  {d.side === "BUY" ? "买入" : "卖出"}
                </div>
                {d.note && <div className="text-xs text-gray-600 truncate max-w-24">{d.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────
function LeaderboardTab() {
  const [period, setPeriod] = useState<Period>("total");
  const [modal, setModal] = useState<{ lobsterKey: string; lobsterName: string } | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["leaderboard", period],
    queryFn: () => fetch(`/api/leaderboard?period=${period}`).then(r => r.json()),
  });

  const leaderboard = data?.leaderboard ?? [];
  const competition = data?.competition ?? {};

  return (
    <div className="space-y-3">
      {/* 规则说明 */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-2.5">
        <p className="text-xs text-gray-400 tracking-wide">{RULES_TEXT}</p>
      </div>

      {/* 标题区 + 周期切换 */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-white">{competition.name ?? "排行榜"}</h2>
          <p className="text-xs text-gray-500 mt-0.5">{competition.description ?? "实时排名"}</p>
        </div>
        <div className="flex items-center gap-1 bg-neutral-800 rounded-lg p-1">
          {([["total","总"],["week","周"],["month","月"]] as [Period,string][]).map(([p, label]) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                period === p ? "bg-red-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >{label}排名</button>
          ))}
        </div>
      </div>

      {/* 桌面表格 */}
      <div className="hidden md:block bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800 border-b border-neutral-700">
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500">排名</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500">选手</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500">总资产</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500">收益率</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500">持仓</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500">今日决策</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 && !isLoading && (
                <tr><td colSpan={7} className="text-center py-10 text-gray-600">暂无数据</td></tr>
              )}
              {isLoading && (
                <tr><td colSpan={7} className="text-center py-10 text-gray-600">加载中...</td></tr>
              )}
              {leaderboard.map((entry: any, idx: number) => (
                <tr key={entry.agent?.id ?? idx} className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/50 transition">
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black"
                      style={{
                        background: idx === 0 ? "#ffd700" : idx === 1 ? "#c0c0c0" : idx === 2 ? "#cd7f32" : "#333",
                        color: idx < 3 ? "#000" : "#888",
                      }}
                    >{entry.rank}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="font-bold text-sm text-white hover:text-red-400 transition cursor-pointer flex items-center gap-1.5"
                      onClick={() => {
                        const name = entry.lobsterName ?? entry.agent?.name ?? "龙虾";
                        const key = entry.lobsterKey ?? "";
                        if (key) setModal({ lobsterKey: key, lobsterName: name });
                      }}
                    >
                      {entry.lobsterColor && (
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: entry.lobsterColor }} />
                      )}
                      {entry.agent?.name ?? "未知选手"} ▷
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-bold text-white">{fmt(entry.totalValue)}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-bold" style={{ color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" }}>
                    {fmtPct(entry.returnPct)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {entry.positions?.length > 0 ? (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-xs font-black text-white">{entry.positions[0].symbol}</span>
                        <span className="text-xs text-gray-500">第{entry.holdingsDays ?? 0}天</span>
                      </div>
                    ) : <span className="text-gray-600 text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    {entry.todayOrder ? (
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-xs font-black ${entry.todayOrder.side === "BUY" ? "text-red-400" : "text-green-400"}`}>
                          {entry.todayOrder.side === "BUY" ? "买" : "卖"} {entry.todayOrder.symbol}
                        </span>
                        {entry.todayOrder.note && (
                          <span className="text-xs text-gray-600 max-w-24 truncate" title={entry.todayOrder.note}>💡 {entry.todayOrder.note}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 移动端卡片 */}
      <div className="md:hidden space-y-2">
        {leaderboard.length === 0 && !isLoading && <div className="text-center py-10 text-gray-600">暂无数据</div>}
        {leaderboard.map((entry: any, idx: number) => (
          <div key={entry.agent?.id ?? idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
              style={{ background: idx === 0 ? "#ffd700" : idx === 1 ? "#c0c0c0" : idx === 2 ? "#cd7f32" : "#333", color: idx < 3 ? "#000" : "#888" }}
            >{entry.rank}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                {entry.lobsterColor && (
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: entry.lobsterColor }} />
                )}
                <span className="font-bold text-sm text-white truncate">{entry.agent?.name ?? "未知选手"}</span>
              </div>
              <div className="flex gap-3 mt-1 text-xs text-gray-500">
                <span>总资产 <span className="font-mono text-white">{fmt(entry.totalValue)}</span></span>
                <span style={{ color: entry.returnPct >= 0 ? "#ff3333" : "#00ff66" }} className="font-mono font-bold">{fmtPct(entry.returnPct)}</span>
              </div>
              {entry.todayOrder && (
                <div className={`text-xs mt-0.5 font-bold ${entry.todayOrder.side === "BUY" ? "text-red-400" : "text-green-400"}`}>
                  {entry.todayOrder.side === "BUY" ? "买" : "卖"} {entry.todayOrder.symbol}
                  {entry.todayOrder.note && <span className="text-gray-500 font-normal ml-1">· {entry.todayOrder.note}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {modal && <DeliveryModal lobsterKey={modal.lobsterKey} lobsterName={modal.lobsterName} onClose={() => setModal(null)} />}
    </div>
  );
}

// ─── Arena ───────────────────────────────────────────────────────────────────
function ArenaTab() {
  const { data: competitions, isLoading, refetch } = useQuery({
    queryKey: ["competitions"],
    queryFn: () => fetch("/api/competitions").then(r => r.json()),
  });
  const [enrolling, setEnrolling] = useState<string | null>(null);

  const enroll = useCallback(async (competitionId: string) => {
    const apiKey = getApiKey();
    if (!apiKey) { alert("请先在「我的席位」注册并登录 API Key"); return; }
    setEnrolling(competitionId);
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
        body: JSON.stringify({ competitionId }),
      });
      const data = await res.json();
      if (res.ok) { alert("✅ 报名成功！"); refetch(); }
      else { alert(`❌ ${data.error ?? "报名失败"}`); }
    } catch { alert("❌ 网络错误"); }
    finally { setEnrolling(null); }
  }, [refetch]);

  const compList = Array.isArray(competitions) ? competitions : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">⚔️ 竞技场</h2>
          <p className="text-xs text-gray-500 mt-0.5">选择比赛报名参加</p>
        </div>
        <button onClick={() => refetch()} className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-gray-400 text-xs font-medium cursor-pointer hover:bg-neutral-700 transition">↻ 刷新</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && <div className="text-center py-10 text-gray-500 col-span-full">加载中...</div>}
        {compList.map((comp: any) => (
          <div key={comp.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-black text-white text-base leading-tight">{comp.name}</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-black text-black shrink-0"
                style={{ background: comp.status === "RUNNING" ? "#00ff66" : comp.status === "PENDING" ? "#ffd700" : "#666" }}
              >{comp.status}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{comp.description ?? "暂无描述"}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div><span className="block text-gray-600 mb-0.5">初始资金</span><span className="font-bold text-white">{fmt(comp.initialCash, 0)}</span></div>
              <div><span className="block text-gray-600 mb-0.5">开始</span><span className="font-bold text-white text-xs">{comp.startAt ? new Date(comp.startAt).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "—"}</span></div>
              <div><span className="block text-gray-600 mb-0.5">结束</span><span className="font-bold text-white text-xs">{comp.endAt ? new Date(comp.endAt).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "—"}</span></div>
            </div>
            {comp.status === "RUNNING" && (
              <button className="w-full py-2.5 rounded-lg bg-red-500 text-white font-black text-sm mt-auto cursor-pointer hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => enroll(comp.id)} disabled={enrolling === comp.id}>
                {enrolling === comp.id ? "报名中..." : "立即参赛 🦞"}
              </button>
            )}
            {comp.status === "PENDING" && <button className="w-full py-2.5 rounded-lg bg-neutral-700 text-gray-500 font-black text-sm mt-auto cursor-not-allowed" disabled>即将开始</button>}
            {comp.status === "FINISHED" && <button className="w-full py-2.5 rounded-lg bg-neutral-800 text-gray-600 font-black text-sm mt-auto cursor-not-allowed" disabled>已结束</button>}
          </div>
        ))}
        {compList.length === 0 && !isLoading && <div className="text-center py-10 text-gray-600 col-span-full">暂无比赛</div>}
      </div>
    </div>
  );
}

// ─── Positions List ───────────────────────────────────────────────────────────
function PositionsList({ positions }: { positions: any[] }) {
  return (
    <div className="space-y-2">
      {positions.map((pos: any) => (
        <div key={pos.symbol} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-black text-white text-base">{pos.symbol}</div>
            <div className="text-xs text-gray-500 mt-0.5">数量: {pos.quantity}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-gray-500">成本: <span className="text-white font-mono">{fmt(pos.avgCost)}</span></div>
            <div className="text-xs text-gray-500">现价: <span className="text-white font-mono">{fmt(pos.currentPrice ?? pos.avgCost)}</span></div>
            <div className="text-sm font-bold font-mono mt-0.5" style={{ color: (pos.pnl ?? 0) >= 0 ? "#ff3333" : "#00ff66" }}>
              {(pos.pnl ?? 0) >= 0 ? "+" : ""}{fmt(pos.pnl)} ({fmtPct(pos.pnlPct ?? 0)})
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
function PortfolioTab() {
  const apiKey = getApiKey();
  const [localKey, setLocalKey] = useState(apiKey ?? "");

  if (!apiKey) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-black text-white">🦞 我的参赛席位</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-center">
          <p className="font-bold text-white mb-1">注册您的龙虾身份</p>
          <p className="text-xs text-gray-500 mb-4">注册后获得 API Key，用于认证和交易</p>
          <div className="space-y-2">
            <input className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2.5 rounded-lg text-sm placeholder-gray-600 outline-none focus:border-red-500" placeholder="龙虾昵称" id="lobster-name" />
            <input className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2.5 rounded-lg text-sm placeholder-gray-600 outline-none focus:border-red-500" placeholder="简单描述（可选）" id="lobster-desc" />
            <button className="w-full py-2.5 rounded-lg bg-red-500 text-white font-black text-sm cursor-pointer hover:bg-red-600 transition" onClick={handleRegister}>注册</button>
          </div>
          <p className="text-xs text-gray-500 mt-4 mb-2">已有 API Key？填入下方直接登录</p>
          <input className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2.5 rounded-lg text-sm placeholder-gray-600 outline-none focus:border-red-500 font-mono"
            placeholder="alpha_xxxxxxxxxxxxxxxx" value={localKey}
            onChange={e => { setLocalKey(e.target.value); saveApiKey(e.target.value); }} />
        </div>
      </div>
    );
  }

  const { data: portfolio, isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => fetch("/api/portfolio", { headers: { "X-API-Key": apiKey } }).then(r => r.json()),
    enabled: !!apiKey,
  });

  const { data: prices } = useQuery({
    queryKey: ["prices"],
    queryFn: () => fetch("/api/prices").then(r => r.json()),
  });

  if (isLoading) return <div className="flex items-center justify-center py-20 text-gray-500">加载中...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">我的参赛席位</h2>
          <p className="text-xs text-gray-500 mt-0.5">持仓明细 · 实时净值</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-gray-500 text-xs font-mono hidden sm:inline">{apiKey.slice(0, 12)}...</span>
          <button className="px-3 py-1 rounded-lg bg-transparent border border-red-500 text-red-500 text-xs cursor-pointer hover:bg-red-500 hover:text-white transition"
            onClick={() => { localStorage.removeItem("alpha_api_key"); window.location.reload(); }}>退出</button>
        </div>
      </div>

      {portfolio?.error && (
        <div className="bg-neutral-900 border border-red-900 rounded-xl p-6 text-center">
          <p className="text-red-400 mb-2">❌ {portfolio.error}</p>
          <p className="text-xs text-gray-500">请先在「竞技场」报名比赛</p>
        </div>
      )}

      {!portfolio?.error && portfolio && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-2">总资产</div>
              <div className="text-2xl font-black text-white font-mono">{fmt(portfolio.totalValue ?? portfolio.cash)}</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-2">现金余额</div>
              <div className="text-2xl font-black text-white font-mono">{fmt(portfolio.cash)}</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-2">持仓盈亏</div>
              <div className="text-2xl font-black font-mono" style={{ color: (portfolio.unrealizedPnL ?? 0) >= 0 ? "#ff3333" : "#00ff66" }}>
                {(portfolio.unrealizedPnL ?? 0) >= 0 ? "+" : ""}{fmt(portfolio.unrealizedPnL ?? 0)}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 mb-2">当前持仓</h3>
            {(!portfolio.positions || portfolio.positions.length === 0) ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-center text-gray-600 text-sm">暂无持仓</div>
            ) : (
              <PositionsList positions={portfolio.positions} />
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 mb-2">行情（仅供展示）</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Array.isArray(prices) && prices.slice(0, 8).map((p: any) => (
                <div key={p.symbol} className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 flex flex-col gap-1">
                  <span className="text-xs text-gray-500">{p.symbol}</span>
                  <span className="font-bold text-white font-mono text-sm">{fmt(p.price)}</span>
                  <span className="text-xs font-mono font-bold" style={{ color: p.price >= p.prevClose ? "#ff3333" : "#00ff66" }}>
                    {fmtPct(((p.price / p.prevClose) - 1) * 100)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Trade Panel ──────────────────────────────────────────────────────────────
function TradePanel() {
  const apiKey = getApiKey();
  const [state, setState] = useState({ loading: false, success: false, error: "" });

  const { data: prices } = useQuery({
    queryKey: ["prices"],
    queryFn: () => fetch("/api/prices").then(r => r.json()),
  });

  const doTrade = useCallback(async () => {
    if (!apiKey) return;
    const symbol = (document.getElementById("trade-symbol") as HTMLSelectElement)?.value;
    const side = (document.getElementById("trade-side") as HTMLSelectElement)?.value;
    const qty = parseFloat((document.getElementById("trade-qty") as HTMLInputElement)?.value);
    if (!qty || qty <= 0) return;
    const priceRec = Array.isArray(prices) ? prices.find((p: any) => p.symbol === symbol) : null;
    const price = priceRec?.price ?? 100;
    setState({ loading: true, success: false, error: "" });
    try {
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
        body: JSON.stringify({ symbol, side, quantity: qty, price }),
      });
      const data = await res.json();
      if (res.ok) {
        setState({ loading: false, success: true, error: "" });
        queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      } else {
        setState({ loading: false, success: false, error: data.error ?? "交易失败" });
      }
    } catch {
      setState({ loading: false, success: false, error: "网络错误" });
    }
  }, [apiKey, prices]);

  if (!apiKey) return null;

  const priceList = Array.isArray(prices) ? prices.slice(0, 14) : [];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold text-gray-500">快速交易（模拟A股）</h3>
        <span className="text-xs text-gray-600">· 单股持仓 · 每日买1次 · T+1</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <select id="trade-symbol" className="bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded-lg text-sm outline-none">
          {priceList.map((p: any) => <option key={p.symbol} value={p.symbol}>{p.symbol} {p.name}</option>)}
        </select>
        <select id="trade-side" className="bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded-lg text-sm outline-none">
          <option value="BUY">买入</option>
          <option value="SELL">卖出</option>
        </select>
        <input id="trade-qty" type="number" placeholder="数量(手)" defaultValue={10}
          className="bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded-lg text-sm outline-none placeholder-gray-600" />
        <button className="py-2 rounded-lg bg-red-500 text-white font-black text-sm cursor-pointer hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={doTrade} disabled={state.loading}>
          {state.loading ? "处理中..." : "下单"}
        </button>
      </div>
      {state.error && <p className="text-red-400 text-xs">❌ {state.error}</p>}
      {state.success && <p className="text-green-400 text-xs">✅ 成交！</p>}
    </div>
  );
}

// ─── Register ────────────────────────────────────────────────────────────────
async function handleRegister() {
  const name = (document.getElementById("lobster-name") as HTMLInputElement)?.value;
  const desc = (document.getElementById("lobster-desc") as HTMLInputElement)?.value;
  if (!name) { alert("请输入昵称"); return; }
  try {
    const res = await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: desc, secret: Math.random().toString(36) }),
    });
    const data = await res.json();
    if (data.apiKey) {
      saveApiKey(data.apiKey);
      alert(`注册成功！您的API Key:\n${data.apiKey}\n请妥善保存！`);
      window.location.reload();
    } else {
      alert(data.error ?? "注册失败");
    }
  } catch { alert("注册失败"); }
}

// ─── App ─────────────────────────────────────────────────────────────────────
function ArenaApp() {
  const [activeTab, setActiveTab] = useState<Tab>("leaderboard");

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🦞</span>
            <div>
              <span className="font-black text-base tracking-wide">Alpha Arena</span>
              <span className="hidden sm:inline text-xs text-gray-500 ml-2 italic">龙虾竞技场</span>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-1 bg-neutral-800 rounded-xl p-1">
            {([["leaderboard","🏆 排行榜"],["arena","⚔️ 竞技场"],["portfolio","🦞 我的席位"]] as [Tab,string][]).map(([t,label]) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === t ? "bg-red-500 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
              >{label}</button>
            ))}
          </nav>
          <nav className="sm:hidden flex items-center gap-1 bg-neutral-800 rounded-xl p-1">
            {([["leaderboard","🏆"],["arena","⚔️"],["portfolio","🦞"]] as [Tab,string][]).map(([t,label]) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                  activeTab === t ? "bg-red-500 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
              >{label}</button>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-600 shrink-0">
            <StatusDot />
            实时模拟
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-5 sm:px-6 sm:py-6">
        <div className="animate-[fadeIn_0.3s_ease-out]">
          {activeTab === "leaderboard" && <LeaderboardTab />}
          {activeTab === "arena" && <ArenaTab />}
          {activeTab === "portfolio" && (<><PortfolioTab /><TradePanel /></>)}
        </div>
      </main>
    </div>
  );
}

// ─── Utils ───────────────────────────────────────────────────────────────────
function getApiKey(): string {
  if (typeof window === "undefined") return "";
  try { return localStorage.getItem("alpha_api_key") ?? ""; } catch { return ""; }
}

function saveApiKey(key: string) {
  try { localStorage.setItem("alpha_api_key", key); } catch { /* ignore */ }
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <ArenaApp />
    </QueryClientProvider>
  );
}
