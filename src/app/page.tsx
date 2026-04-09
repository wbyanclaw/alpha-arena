"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

type LobsterKey = "RED" | "BLUE" | "GOLD";

const LOBSTERS: Record<
  LobsterKey,
  { name: string; tone: string; accent: string; description: string }
> = {
  RED: {
    name: "赤龙虾",
    tone: "from-rose-500/30 to-orange-400/10",
    accent: "text-rose-300",
    description: "激进型策略，高频切换，追求趋势动量",
  },
  BLUE: {
    name: "蓝龙虾",
    tone: "from-cyan-500/30 to-blue-400/10",
    accent: "text-cyan-300",
    description: "稳健型策略，均衡配置，侧重风险对冲",
  },
  GOLD: {
    name: "金龙虾",
    tone: "from-amber-400/30 to-yellow-300/10",
    accent: "text-amber-200",
    description: "长周期策略，价值投资，顺势而为",
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 30000,
      retry: 1,
    },
  },
});

function formatPrice(price: number) {
  return "$" + price.toLocaleString("en-US");
}

function formatDate(date: string) {
  return new Date(date).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </section>
  );
}

function LoadingCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/8 bg-[#0b1728] p-4">
      <div className="h-4 w-24 rounded bg-white/10" />
    </div>
  );
}

function DeliveriesPanel({ lobsterKey, lobsterName }: { lobsterKey: LobsterKey; lobsterName: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["deliveries", lobsterKey],
    queryFn: () => fetch(`/api/deliveries?lobsterKey=${lobsterKey}`).then((r) => r.json()),
  });

  return (
    <Panel title="交割区" subtitle={`${lobsterName} · 成交方向与时间线`}>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {isLoading ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : data?.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-slate-500 text-sm">暂无交割记录</div>
        ) : (
          (data || []).map((item: any) => (
            <div key={item.id} className="rounded-2xl border border-white/8 bg-[#0b1728] px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{item.symbol}</div>
                  <div className="mt-1 text-xs text-slate-400">{formatDate(item.deliveredAt)}</div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    item.side === "BUY" ? "bg-emerald-400/15 text-emerald-300" : "bg-rose-400/15 text-rose-300"
                  }`}
                >
                  {item.side}
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between text-sm">
                <div className="text-slate-400">数量 {item.quantity}</div>
                <div className="text-base font-semibold text-white">{formatPrice(item.price)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}

function CommentsPanel({ lobsterKey, lobsterName }: { lobsterKey: LobsterKey; lobsterName: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["comments", lobsterKey],
    queryFn: () => fetch(`/api/comments?lobsterKey=${lobsterKey}`).then((r) => r.json()),
  });

  return (
    <Panel title="评论区" subtitle={`${lobsterName} · 研究、风控与策略备注`}>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {isLoading ? (
          <>
            <LoadingCard />
            <LoadingCard />
          </>
        ) : data?.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-slate-500 text-sm">暂无评论</div>
        ) : (
          (data || []).map((item: any) => (
            <div key={item.id} className="rounded-2xl border border-white/8 bg-[#0b1728] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-white">{item.author}</div>
                <div className="text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false })}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.content}</p>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}

function LogsPanel({ lobsterKey, lobsterName }: { lobsterKey: LobsterKey; lobsterName: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["logs", lobsterKey],
    queryFn: () => fetch(`/api/logs?lobsterKey=${lobsterKey}`).then((r) => r.json()),
  });

  return (
    <Panel title="日志区" subtitle={`${lobsterName} · 系统与策略关键事件`}>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {isLoading ? (
          <>
            <LoadingCard />
            <LoadingCard />
          </>
        ) : data?.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-slate-500 text-sm">暂无日志</div>
        ) : (
          (data || []).map((item: any) => (
            <div key={item.id} className="rounded-2xl border border-white/8 bg-[#0b1728] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.level === "WARN" ? "bg-amber-300" : "bg-cyan-300"}`} />
                  <div className="text-sm font-semibold text-white">{item.title}</div>
                </div>
                <div className="text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false })}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.content}</p>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}

function Home() {
  const [active, setActive] = useState<LobsterKey>("RED");

  const { data: deliveriesCount = 0 } = useQuery({
    queryKey: ["deliveries", active],
    queryFn: () => fetch(`/api/deliveries?lobsterKey=${active}`).then((r) => r.json()),
  });

  const { data: commentsCount = [] } = useQuery({
    queryKey: ["comments", active],
    queryFn: () => fetch(`/api/comments?lobsterKey=${active}`).then((r) => r.json()),
  });

  const { data: logsCount = [] } = useQuery({
    queryKey: ["logs", active],
    queryFn: () => fetch(`/api/logs?lobsterKey=${active}`).then((r) => r.json()),
  });

  const lobster = LOBSTERS[active];

  return (
    <main className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-6 py-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#0b1728] p-6 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Alpha Arena</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">交易总览</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                实时监控三只龙虾策略状态，追踪交割、评论与系统日志。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-300 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                <div className="text-xs text-slate-400">活跃策略</div>
                <div className="mt-2 text-lg font-semibold text-white">3</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                <div className="text-xs text-slate-400">今日交割</div>
                <div className="mt-2 text-lg font-semibold text-white">{Array.isArray(deliveriesCount) ? deliveriesCount.length : 0}</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                <div className="text-xs text-slate-400">评论更新</div>
                <div className="mt-2 text-lg font-semibold text-white">{Array.isArray(commentsCount) ? commentsCount.length : 0}</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                <div className="text-xs text-slate-400">系统日志</div>
                <div className="mt-2 text-lg font-semibold text-white">{Array.isArray(logsCount) ? logsCount.length : 0}</div>
              </div>
            </div>
          </div>

          {/* Lobster Selector */}
          <div className="grid gap-3 md:grid-cols-3">
            {(Object.keys(LOBSTERS) as LobsterKey[]).map((key) => {
              const lob = LOBSTERS[key];
              const isActive = key === active;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`group rounded-2xl border px-4 py-4 text-left transition hover:-translate-y-0.5 ${
                    isActive ? "border-cyan-300/40 bg-cyan-400/10" : "border-white/8 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className={`mb-3 h-24 rounded-xl bg-gradient-to-br ${lob.tone}`} />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs tracking-[0.24em] text-slate-500">{key}</div>
                      <div className={`mt-1 text-lg font-semibold ${lob.accent}`}>{lob.name}</div>
                      <div className="mt-1 text-xs text-slate-400 leading-4">{lob.description}</div>
                    </div>
                    <div
                      className={`rounded-full border px-3 py-1 text-xs ${
                        isActive ? "border-cyan-300/40 bg-cyan-400/20 text-cyan-200" : "border-white/10 text-slate-300"
                      }`}
                    >
                      {isActive ? "当前" : "切换"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </header>

        {/* Three Panels */}
        <div className="grid flex-1 gap-6 xl:grid-cols-[1.1fr_0.95fr_0.95fr]">
          <DeliveriesPanel lobsterKey={active} lobsterName={lobster.name} />
          <CommentsPanel lobsterKey={active} lobsterName={lobster.name} />
          <LogsPanel lobsterKey={active} lobsterName={lobster.name} />
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
