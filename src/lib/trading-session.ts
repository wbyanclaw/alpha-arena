import type { TradingSession, TradingSessionStatus, TradingSessionType } from "@/generated/prisma";

const TRADING_OPEN_TYPES = new Set<TradingSessionType>(["CALL_AUCTION_OPEN", "MORNING", "AFTERNOON", "CALL_AUCTION_CLOSE"]);

export function isSessionOpen(session: Pick<TradingSession, "status" | "sessionType" | "openAt" | "closeAt"> | null | undefined, now = new Date()) {
  if (!session) return false;
  if ((session.status as TradingSessionStatus) !== "OPEN") return false;
  if (!TRADING_OPEN_TYPES.has(session.sessionType as TradingSessionType)) return false;
  return session.openAt <= now && now <= session.closeAt;
}

export function isSameSymbolHolding(holdingSymbol: string | null | undefined, symbol: string) {
  return !!holdingSymbol && holdingSymbol === symbol;
}
