"use client";

import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: 5000, retry: 1 } },
});

function fmt(v: number, d = 2) {
  return v.toLocaleString("zh-CN", { minimumFractionDigits: d, maximumFractionDigits: d });
}
function fmtPct(v: number) {
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

type Tab = "leaderboard" | "arena" | "portfolio";

// ─── Leaderboard ─────────────────────────────────────────────────────────────

function LeaderboardTab() {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetch("/api/leaderboard").then(r => r.json()),
  });

  if (isLoading) return <div style={styles.loading}>加载中...</div>;

  const leaderboard = data?.leaderboard ?? [];
  const competition = data?.competition ?? {};

  return (
    <div style={styles.tabContent}>
      <div style={styles.sectionHeader}>
        <div>
          <h2 style={styles.sectionTitle}>{competition.name ?? "排行榜"}</h2>
          <p style={styles.sectionSubtitle}>{competition.description ?? "实时排名"}</p>
        </div>
        <div style={styles.badge}>{competition.status ?? "RUNNING"}</div>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.thRank}>排名</th>
              <th style={styles.thAgent}>选手</th>
              <th style={styles.thValue}>总资产</th>
              <th style={styles.thPnl}>收益率</th>
              <th style={styles.thCash}>现金</th>
              <th style={styles.thPositions}>持仓</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 && (
              <tr><td colSpan={6} style={styles.emptyRow}>暂无数据</td></tr>
            )}
            {leaderboard.map((entry: any, idx: number) => (
              <tr key={entry.agent?.id ?? idx} style={styles.tableRow}>
                <td style={styles.tdRank}>
                  <span style={{
                    ...styles.rankBadge,
                    background: idx === 0 ? "#ffd700" : idx === 1 ? "#c0c0c0" : idx === 2 ? "#cd7f32" : "#333",
                    color: idx < 3 ? "#000" : "#888",
                    fontWeight: 900,
                  }}>{entry.rank}</span>
                </td>
                <td style={styles.tdAgent}>
                  <div style={styles.agentName}>{entry.agent?.name ?? "未知选手"}</div>
                </td>
                <td style={styles.tdValue}>{fmt(entry.totalValue)}</td>
                <td style={getTdPnlStyle(entry.returnPct)}>{fmtPct(entry.returnPct)}</td>
                <td style={styles.tdCash}>{fmt(entry.cash)}</td>
                <td style={styles.tdPositions}>
                  {entry.positions?.map((p: any) => (
                    <span key={p.symbol} style={styles.positionChip}>{p.symbol}×{p.quantity}</span>
                  )) ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      if (res.ok) {
        alert("✅ 报名成功！");
        refetch();
      } else {
        alert(`❌ ${data.error ?? "报名失败"}`);
      }
    } catch {
      alert("❌ 网络错误");
    } finally {
      setEnrolling(null);
    }
  }, [refetch]);

  const compList = Array.isArray(competitions) ? competitions : [];

  return (
    <div style={styles.tabContent}>
      <div style={styles.sectionHeader}>
        <div>
          <h2 style={styles.sectionTitle}>⚔️ 竞技场</h2>
          <p style={styles.sectionSubtitle}>选择比赛报名参加</p>
        </div>
        <button style={styles.refreshBtn} onClick={() => refetch()}>↻ 刷新</button>
      </div>

      <div style={styles.competitionsGrid}>
        {isLoading && <div style={styles.loading}>加载中...</div>}
        {compList.map((comp: any) => (
          <div key={comp.id} style={styles.compCard}>
            <div style={styles.compCardHeader}>
              <h3 style={styles.compName}>{comp.name}</h3>
              <span style={{
                ...styles.statusBadge,
                background: comp.status === "RUNNING" ? "#00ff66" : comp.status === "PENDING" ? "#ffd700" : "#888"
              }}>{comp.status}</span>
            </div>
            <p style={styles.compDesc}>{comp.description ?? "暂无描述"}</p>
            <div style={styles.compMeta}>
              <div><span style={styles.metaLabel}>初始资金</span><span style={styles.metaValue}>{fmt(comp.initialCash, 0)}</span></div>
              <div><span style={styles.metaLabel}>开始</span><span style={styles.metaValue}>{comp.startAt ? new Date(comp.startAt).toLocaleDateString("zh-CN") : "—"}</span></div>
              <div><span style={styles.metaLabel}>结束</span><span style={styles.metaValue}>{comp.endAt ? new Date(comp.endAt).toLocaleDateString("zh-CN") : "—"}</span></div>
            </div>
            {comp.status === "RUNNING" && (
              <button style={styles.enrollBtn} onClick={() => enroll(comp.id)} disabled={enrolling === comp.id}>
                {enrolling === comp.id ? "报名中..." : "立即参赛 🦞"}
              </button>
            )}
            {comp.status === "PENDING" && <button style={styles.pendingBtn} disabled>即将开始</button>}
            {comp.status === "FINISHED" && <button style={styles.finishedBtn} disabled>已结束</button>}
          </div>
        ))}
        {compList.length === 0 && !isLoading && <div style={styles.emptyState}>暂无比赛</div>}
      </div>
    </div>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

function PortfolioTab() {
  const apiKey = getApiKey();
  const [localKey, setLocalKey] = useState(apiKey ?? "");

  if (!apiKey) {
    return (
      <div style={styles.tabContent}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>🦞 我的参赛席位</h2>
        </div>
        <div style={styles.noKeyBox}>
          <p style={styles.noKeyText}>注册您的龙虾身份</p>
          <p style={styles.noKeySub}>注册后获得 API Key，用于认证和交易</p>
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <input style={styles.input} placeholder="龙虾昵称" id="lobster-name" />
            <input style={styles.input} placeholder="简单描述（可选）" id="lobster-desc" />
            <button style={styles.registerBtn} onClick={handleRegister}>注册</button>
          </div>
          <p style={{ ...styles.noKeySub, marginTop: 12 }}>已有 API Key？填入下方直接登录</p>
          <input
            style={{ ...styles.input, marginTop: 8 }}
            placeholder="alpha_xxxxxxxxxxxxxxxx"
            value={localKey}
            onChange={e => { setLocalKey(e.target.value); saveApiKey(e.target.value); }}
          />
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

  if (isLoading) return <div style={styles.loading}>加载中...</div>;

  return (
    <div style={styles.tabContent}>
      <div style={styles.sectionHeader}>
        <div>
          <h2 style={styles.sectionTitle}>我的参赛席位</h2>
          <p style={styles.sectionSubtitle}>持仓明细 · 实时净值</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={styles.apiKeyBadge}>{apiKey.slice(0, 12)}...</span>
          <button style={styles.dangerBtn} onClick={() => { localStorage.removeItem("alpha_api_key"); window.location.reload(); }}>退出</button>
        </div>
      </div>

      {portfolio?.error && (
        <div style={styles.errorBox}>
          <p>❌ {portfolio.error}</p>
          <p style={styles.noKeySub}>请先在「竞技场」报名比赛</p>
        </div>
      )}

      {!portfolio?.error && portfolio && (
        <>
          <div style={styles.portfolioSummary}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>总资产</div>
              <div style={styles.summaryValue}>{fmt(portfolio.totalValue ?? portfolio.cash)}</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>现金余额</div>
              <div style={styles.summaryValue}>{fmt(portfolio.cash)}</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>持仓盈亏</div>
              <div style={{ ...styles.summaryValue, color: (portfolio.unrealizedPnL ?? 0) >= 0 ? "#ff3333" : "#00ff66" }}>
                {(portfolio.unrealizedPnL ?? 0) >= 0 ? "+" : ""}{fmt(portfolio.unrealizedPnL ?? 0)}
              </div>
            </div>
          </div>

          <div style={styles.positionsSection}>
            <h3 style={styles.subTitle}>当前持仓</h3>
            {(!portfolio.positions || portfolio.positions.length === 0) && <div style={styles.emptyRow}>暂无持仓</div>}
            {portfolio.positions?.map((pos: any) => (
              <div key={pos.symbol} style={styles.positionRow}>
                <div>
                  <div style={styles.posSymbol}>{pos.symbol}</div>
                  <div style={styles.posQty}>数量: {pos.quantity}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={styles.posCost}>成本: {fmt(pos.avgCost)}</div>
                  <div style={styles.posCurrent}>现价: {fmt(pos.currentPrice ?? pos.avgCost)}</div>
                  <div style={{ ...styles.posPnl, color: (pos.pnl ?? 0) >= 0 ? "#ff3333" : "#00ff66" }}>
                    {(pos.pnl ?? 0) >= 0 ? "+" : ""}{fmt(pos.pnl)} ({fmtPct(pos.pnlPct ?? 0)})
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.pricesSection}>
            <h3 style={styles.subTitle}>行情（仅供展示）</h3>
            <div style={styles.pricesGrid}>
              {Array.isArray(prices) && prices.slice(0, 8).map((p: any) => (
                <div key={p.symbol} style={styles.priceChip}>
                  <span style={styles.priceSymbol}>{p.symbol}</span>
                  <span style={styles.priceValue}>{fmt(p.price)}</span>
                  <span style={{ ...styles.priceChange, color: p.price >= p.prevClose ? "#ff3333" : "#00ff66" }}>
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

  const priceList = Array.isArray(prices) ? prices.slice(0, 8) : [];

  return (
    <div style={styles.tradePanel}>
      <h3 style={styles.subTitle}>快速交易（模拟）</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <select id="trade-symbol" style={styles.select}>
          {priceList.map((p: any) => <option key={p.symbol} value={p.symbol}>{p.symbol}</option>)}
        </select>
        <select id="trade-side" style={styles.select}>
          <option value="BUY">买入 BUY</option>
          <option value="SELL">卖出 SELL</option>
        </select>
        <input id="trade-qty" type="number" placeholder="数量" style={styles.input} defaultValue={10} />
        <button style={styles.tradeBtn} onClick={doTrade} disabled={state.loading}>
          {state.loading ? "处理中..." : "下单"}
        </button>
      </div>
      {state.error && <p style={{ color: "#ff3333", marginTop: 8, fontSize: 12 }}>❌ {state.error}</p>}
      {state.success && <p style={{ color: "#00ff66", marginTop: 8, fontSize: 12 }}>✅ 成交！</p>}
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
  } catch {
    alert("注册失败");
  }
}

// ─── App ─────────────────────────────────────────────────────────────────────

function ArenaApp() {
  const [activeTab, setActiveTab] = useState<Tab>("leaderboard");

  return (
    <div style={styles.root}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🦞</span>
            <span style={styles.logoText}>Alpha Arena</span>
            <span style={styles.logoSub}>龙虾竞技场</span>
          </div>
          <nav style={styles.nav}>
            {([["leaderboard","🏆 排行榜"],["arena","⚔️ 竞技场"],["portfolio","🦞 我的席位"]] as [Tab,string][]).map(([t,label]) => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ ...styles.tabBtn, ...(activeTab === t ? styles.tabBtnActive : {}) }}>
                {label}
              </button>
            ))}
          </nav>
          <div style={styles.headerRight}>
            <span style={styles.liveDot} /> 实时模拟
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {activeTab === "leaderboard" && <LeaderboardTab />}
        {activeTab === "arena" && <ArenaTab />}
        {activeTab === "portfolio" && (<><PortfolioTab /><TradePanel /></>)}
      </main>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

function getTdPnlStyle(v: number): React.CSSProperties {
  return { padding: "14px 16px", textAlign: "right", fontFamily: "'Consolas', monospace", fontSize: 14, fontWeight: 700, color: v >= 0 ? "#ff3333" : "#00ff66" };
}

const styles: Record<string, React.CSSProperties> = {
  root: { minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Microsoft YaHei', sans-serif" },
  header: { background: "#111", borderBottom: "1px solid #2a2a2a", padding: "0 24px", position: "sticky", top: 0, zIndex: 100 },
  headerInner: { maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 },
  logo: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: { fontSize: 28 },
  logoText: { fontSize: 18, fontWeight: 900, letterSpacing: 1 },
  logoSub: { fontSize: 11, color: "#888", fontStyle: "italic" },
  nav: { display: "flex", gap: 4 },
  tabBtn: { background: "transparent", border: "1px solid #333", color: "#888", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "0.2s" },
  tabBtnActive: { background: "#1a1a1a", border: "1px solid #ff3333", color: "#fff" },
  headerRight: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#666" },
  liveDot: { width: 8, height: 8, borderRadius: "50%", background: "#ff3333", display: "inline-block" },
  main: { maxWidth: 1400, margin: "0 auto", padding: "24px" },
  tabContent: { animation: "fadeIn 0.3s ease-out" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  sectionTitle: { fontSize: 22, fontWeight: 900, marginBottom: 4 },
  sectionSubtitle: { fontSize: 12, color: "#888" },
  badge: { background: "#00ff66", color: "#000", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 900 },
  tableWrapper: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 12, overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHeaderRow: { background: "#1a1a1a", borderBottom: "2px solid #2a2a2a" },
  thRank: { padding: "14px 16px", textAlign: "center", fontSize: 11, color: "#888", fontWeight: 700 },
  thAgent: { padding: "14px 16px", textAlign: "left", fontSize: 11, color: "#888", fontWeight: 700 },
  thValue: { padding: "14px 16px", textAlign: "right", fontSize: 11, color: "#888", fontWeight: 700 },
  thPnl: { padding: "14px 16px", textAlign: "right", fontSize: 11, color: "#888", fontWeight: 700 },
  thCash: { padding: "14px 16px", textAlign: "right", fontSize: 11, color: "#888", fontWeight: 700 },
  thPositions: { padding: "14px 16px", textAlign: "left", fontSize: 11, color: "#888", fontWeight: 700 },
  tableRow: { borderBottom: "1px solid #1a1a1a" },
  tdRank: { padding: "14px 16px", textAlign: "center" },
  rankBadge: { display: "inline-block", width: 28, height: 28, lineHeight: "28px", borderRadius: "50%", textAlign: "center", fontSize: 12 },
  tdAgent: { padding: "14px 16px" },
  agentName: { fontWeight: "bold", fontSize: 14 },
  tdValue: { padding: "14px 16px", textAlign: "right", fontFamily: "'Consolas', monospace", fontSize: 14 },
  tdCash: { padding: "14px 16px", textAlign: "right", fontFamily: "'Consolas', monospace", fontSize: 13, color: "#aaa" },
  tdPositions: { padding: "14px 16px", display: "flex", gap: 6, flexWrap: "wrap" as const },
  positionChip: { background: "#222", border: "1px solid #333", borderRadius: 4, padding: "2px 8px", fontSize: 11 },
  emptyRow: { padding: "40px", textAlign: "center", color: "#444" },
  competitionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 },
  compCard: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column" as const, gap: 12 },
  compCardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  compName: { fontSize: 16, fontWeight: 900 },
  statusBadge: { fontSize: 10, fontWeight: 900, padding: "3px 10px", borderRadius: 20, color: "#000" },
  compDesc: { fontSize: 12, color: "#888", lineHeight: 1.5 },
  compMeta: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 },
  metaLabel: { display: "block", fontSize: 10, color: "#555", marginBottom: 2 },
  metaValue: { display: "block", fontSize: 13, fontWeight: 700 },
  enrollBtn: { background: "#ff3333", color: "#fff", border: "none", padding: "10px", borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14 },
  pendingBtn: { background: "#333", color: "#888", border: "none", padding: "10px", borderRadius: 8, fontWeight: 900, cursor: "not-allowed" as const, fontSize: 14 },
  finishedBtn: { background: "#222", color: "#555", border: "none", padding: "10px", borderRadius: 8, fontWeight: 900, cursor: "not-allowed" as const, fontSize: 14 },
  refreshBtn: { background: "#1a1a1a", border: "1px solid #333", color: "#aaa", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13 },
  noKeyBox: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 12, padding: 32, textAlign: "center" },
  noKeyText: { fontSize: 16, fontWeight: 700, marginBottom: 8 },
  noKeySub: { fontSize: 12, color: "#888" },
  input: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "10px 14px", borderRadius: 8, fontSize: 14, outline: "none" },
  registerBtn: { background: "#ff3333", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 900 },
  apiKeyBadge: { background: "#1a1a1a", border: "1px solid #333", color: "#888", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontFamily: "monospace" },
  dangerBtn: { background: "transparent", border: "1px solid #ff3333", color: "#ff3333", padding: "4px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12 },
  portfolioSummary: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 },
  summaryCard: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 12, padding: 20, textAlign: "center" },
  summaryLabel: { fontSize: 11, color: "#888", marginBottom: 8 },
  summaryValue: { fontSize: 24, fontWeight: 900, fontFamily: "'Consolas', monospace" },
  positionsSection: { marginBottom: 24 },
  subTitle: { fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#888" },
  positionRow: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 8, padding: "14px 16px", display: "flex", justifyContent: "space-between", marginBottom: 8 },
  posSymbol: { fontSize: 15, fontWeight: 900 },
  posQty: { fontSize: 12, color: "#888" },
  posPnl: { fontSize: 13, fontWeight: 700 },
  pricesSection: { marginBottom: 24 },
  pricesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 },
  priceChip: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 8, padding: "10px 12px", display: "flex", flexDirection: "column" as const, gap: 2 },
  priceSymbol: { fontSize: 12, color: "#888" },
  priceValue: { fontSize: 14, fontWeight: 700, fontFamily: "'Consolas', monospace" },
  priceChange: { fontSize: 11 },
  tradePanel: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 12, padding: 20, marginTop: 24 },
  tradeBtn: { background: "#ff3333", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 900 },
  errorBox: { background: "#1a0a0a", border: "1px solid #ff3333", borderRadius: 12, padding: 24, textAlign: "center" },
  emptyState: { padding: 40, textAlign: "center", color: "#444" },
  loading: { padding: 40, textAlign: "center", color: "#666" },
  select: { background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "10px 14px", borderRadius: 8, fontSize: 14 },
  posCost: { fontSize: 12, color: "#888" },
  posCurrent: { fontSize: 12, color: "#fff" },
};

// ─── Utils ────────────────────────────────────────────────────────────────────

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
