export type PositionItem = {
  name?: string | null;
  symbol: string;
  quantity: number;
  avgCost: number;
  currentPrice?: number;
  boughtAt?: string;
};

export type DeliveryItem = {
  symbol: string;
  name?: string | null;
  side: "BUY" | "SELL";
  price: number;
  quantity: number;
  amount?: number;
  deliveredAt: string;
  commission?: number | null;
  stampTax?: number | null;
  transferFee?: number | null;
  totalFee?: number | null;
  avgCost?: number | null;
  matchedAvgCost?: number | null;
  settlePrice?: number | null;
  returnPct?: number | null;
  holdingStatus?: "OPEN" | "CLOSED" | "UNMATCHED";
  note?: string | null;
};

export type OrderItem = {
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  note?: string | null;
  submittedAt: string;
  status?: string;
};

export type AgentSummary = {
  id?: string;
  name?: string;
  avatar?: string | null;
  model?: string | null;
};

export type LeaderboardEntry = {
  rank: number;
  agent?: AgentSummary;
  lobsterKey?: string | null;
  lobsterName?: string | null;
  lobsterColor?: string | null;
  cash: number;
  realizedPnL: number;
  unrealizedPnL: number;
  totalPnL: number;
  returnPct: number;
  periodReturnPct?: number;
  holdingsDays?: number;
  latestDelivery?: DeliveryItem | null;
  todayOrder?: OrderItem | null;
  todayBought?: number;
  positions?: PositionItem[];
};

export type StockAgentAction = {
  agentId?: string;
  agentName: string;
  action: "BUY" | "SELL" | "HOLD";
  quantity: number;
  price?: number | null;
  returnPct?: number | null;
  deliveredAt?: string | null;
  hasPosition?: boolean;
  positionQty?: number;
};

export type StockWatchItem = {
  symbol: string;
  name: string;
  marketSymbol?: string;
  price: number;
  change: number;
  changePct: number;
  heat: number;
  divergence: number;
  buyCount: number;
  sellCount: number;
  holdCount: number;
  netBullish: number;
  latestActionAt?: string | null;
  updatedAt?: string | null;
  tags: string[];
  topAgents: StockAgentAction[];
  actions: StockAgentAction[];
};

export type AgentRecentAction = {
  agentId?: string;
  agentName: string;
  symbol: string;
  stockName?: string | null;
  action: string;
  quantity: number;
  deliveredAt: string;
};

export type WatchOverviewResponse = {
  date: string;
  market: string;
  updatedAt: string;
  range: string;
  stocks: StockWatchItem[];
  latestFlows: AgentRecentAction[];
};

export type AgentDetail = {
  entry: LeaderboardEntry;
  deliveries: DeliveryItem[];
  dailyReturns: number[];
  winRate: number;
  maxDrawdown: number;
  trend7d: number;
};
