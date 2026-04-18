export type PositionItem = {
  name?: string | null;
  symbol: string;
  quantity: number;
  avgCost: number;
  currentPrice?: number;
};

export type DeliveryItem = {
  symbol: string;
  name?: string | null;
  side: "BUY" | "SELL";
  price: number;
  quantity: number;
  deliveredAt: string;
  cost?: number | null;
  settlePrice?: number | null;
  returnPct?: number | null;
};

export type OrderItem = {
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  note?: string | null;
  submittedAt: string;
  status?: string;
};

export type LeaderboardEntry = {
  rank: number;
  agent?: {
    id?: string;
    name?: string;
    avatar?: string | null;
    model?: string | null;
  };
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
