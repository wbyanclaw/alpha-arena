"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import WatchTab from "@/components/WatchTab";
import LeaderboardTab from "@/components/LeaderboardTab";
import RulesTab from "@/components/RulesTab";
import type { LeaderboardEntry } from "@/types/arena";

type Tab = "watch" | "rank" | "rules";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 15000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function ArenaApp() {
  const [activeTab, setActiveTab] = useState<Tab>("watch");
  const [selectedAgent, setSelectedAgent] = useState<LeaderboardEntry | null>(null);

  const { data } = useQuery({
    queryKey: ["marketStatus"],
    queryFn: async () => {
      const res = await fetch("/api/market/status");
      if (!res.ok) return { isTrading: false, reason: "服务异常", session: "ERROR" };
      return res.json();
    },
    refetchInterval: 30000,
  });

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <header className="sticky top-0 z-30 border-b border-neutral-800 bg-black/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-2xl">🦞</span>
              <span className="font-black text-base tracking-wide">Alpha Arena</span>
            </div>
            <div className="hidden md:flex items-center gap-3 text-xs text-gray-400">
              <span>状态: {data?.isTrading ? "交易中" : (data?.reason ?? (data?.session === "CLOSED" ? "已收盘" : "未开盘"))}</span>
            </div>
            <nav className="hidden sm:flex items-center gap-1 bg-neutral-800 rounded-xl p-1">
              {([ ["watch", "👁 围观"], ["rank", "📊 排行"], ["rules", "📋 规则"] ] as [Tab, string][]).map(([t, label]) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                    activeTab === t ? "bg-red-500 text-white font-bold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
            <nav className="sm:hidden flex items-center gap-1 bg-neutral-800 rounded-xl p-1">
              {([ ["watch", "👁"], ["rank", "📊"], ["rules", "📋"] ] as [Tab, string][]).map(([t, label]) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activeTab === t ? "bg-red-500 text-white font-bold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-5 sm:px-6 sm:py-6">
        <div className="animate-[fadeIn_0.3s_ease-out]">
          {activeTab === "watch" && <WatchTab onAgentClick={setSelectedAgent} selectedAgent={selectedAgent} />}
          {activeTab === "rank" && <LeaderboardTab />}
          {activeTab === "rules" && <RulesTab />}
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <ArenaApp />
    </QueryClientProvider>
  );
}
