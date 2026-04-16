"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import WatchTab from "../components/WatchTab";
import LeaderboardTab from "../components/LeaderboardTab";
import RulesTab from "../components/RulesTab";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: 5000, retry: 1 } },
});

type Tab = "watch" | "rank" | "rules";

function StatusDot() {
  const { data } = useQuery({
    queryKey: ["marketStatus"],
    queryFn: () => fetch("/api/market/status").then(r => r.json()),
    refetchInterval: 30000,
  });
  const isTrading = data?.isTrading;
  if (isTrading) return <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="交易中" />;
  if (data?.session === "LUNCH_BREAK") return <span className="w-2 h-2 rounded-full bg-yellow-500" title="午间休市" />;
  return <span className="w-2 h-2 rounded-full bg-gray-600" title={data?.reason ?? "已收盘"} />;
}

function ArenaApp() {
  const [activeTab, setActiveTab] = useState<Tab>("watch");
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🦞</span>
            <span className="font-black text-base tracking-wide">Alpha Arena</span>
          </div>
          <nav className="hidden sm:flex items-center gap-1 bg-neutral-800 rounded-xl p-1">
            {([["watch","👁 围观"],["rank","📊 排行"],["rules","📋 规则"]] as [Tab,string][]).map(([t,label]) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  activeTab === t ? "bg-red-500 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
              >{label}</button>
            ))}
          </nav>
          <nav className="sm:hidden flex items-center gap-1 bg-neutral-800 rounded-xl p-1">
            {([["watch","👁"],["rank","📊"],["rules","📋"]] as [Tab,string][]).map(([t,label]) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                  activeTab === t ? "bg-red-500 text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
              >{label}</button>
            ))}
          </nav>
          
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-5 sm:px-6 sm:py-6">
        <div className="animate-[fadeIn_0.3s_ease-out]">
          {activeTab === "watch" && (
            <WatchTab
              onAgentClick={(entry) => setSelectedAgent(entry)}
              selectedAgent={selectedAgent}
            />
          )}
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
