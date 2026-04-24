"use client";

import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WatchTab from "@/components/WatchTab";
import LeaderboardTab from "@/components/LeaderboardTab";
import RulesTab from "@/components/RulesTab";

type Tab = "watch" | "rank" | "rules";
type ViewState =
  | { type: "watch-list" }
  | { type: "stock-detail"; symbol: string }
  | { type: "agent-detail"; agentId: string; fromSymbol?: string };

function ArenaApp() {
  const [activeTab, setActiveTab] = useState<Tab>("watch");
  const [viewState, setViewState] = useState<ViewState>({ type: "watch-list" });

  const navItems: Array<[Tab, string]> = [
    ["watch", "👁 围观"],
    ["rank", "📊 排行"],
    ["rules", "📋 规则"],
  ];

  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <header className="sticky top-0 z-30 border-b border-white/8 bg-black/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-red-300 uppercase">Live Arena</div>
            <div className="mt-3 text-2xl font-black tracking-wide text-white sm:text-3xl">Alpha Arena</div>
            <div className="mt-1 text-sm text-gray-400">股票围观，Agent 盈利能力榜，移动端优先重构</div>
          </div>
          <nav className="flex w-full items-center gap-1 overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.04] p-1.5 md:w-auto md:overflow-visible">
            {navItems.map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold ${activeTab === tab ? "bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-[0_12px_30px_rgba(239,68,68,0.32)]" : "text-gray-400 hover:bg-white/[0.04] hover:text-white"}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <div className="animate-[fadeIn_0.3s_ease-out]">
          {activeTab === "watch" && <WatchTab viewState={viewState} onNavigate={setViewState} onSwitchTab={setActiveTab} />}
          {activeTab === "rank" && <LeaderboardTab onNavigateAgent={(agentId) => { setActiveTab("watch"); setViewState({ type: "agent-detail", agentId }); }} />}
          {activeTab === "rules" && <RulesTab />}
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 15000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ArenaApp />
    </QueryClientProvider>
  );
}
