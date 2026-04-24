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
    <div className="min-h-screen bg-black text-gray-100">
      <header className="sticky top-0 z-30 border-b border-neutral-800 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="text-2xl font-black tracking-wide text-white">Alpha Arena</div>
            <div className="text-xs text-gray-500">股票围观与 Agent 盈利能力榜</div>
          </div>
          <nav className="flex w-full items-center gap-1 overflow-x-auto rounded-xl bg-neutral-900/95 p-1 md:w-auto md:overflow-visible">
            {navItems.map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold ${activeTab === tab ? "bg-red-500 text-white shadow-[0_8px_24px_rgba(239,68,68,0.28)]" : "text-gray-400 hover:text-white"}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
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
