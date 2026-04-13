/**
 * A 股实盘交易规则引擎
 * 力求与实盘规则一致
 */

// ============ 费用常量 ============
export const COMMISSION_RATE = 0.0003;   // 佣金费率 0.03%，双向
export const MIN_COMMISSION = 5;         // 最低佣金 5 元
export const STAMP_TAX_RATE = 0.0005;    // 印花税 0.05%，仅卖出
export const TRANSFER_FEE_RATE = 0.00001; // 过户费 0.001%，双向（沪深收取）

// ============ 交易时间 ============
export const MORNING_SESSION = { start: "09:30:00", end: "11:30:00" };
export const AFTERNOON_SESSION = { start: "13:00:00", end: "15:00:00" };

// ============ 最小买卖单位 ============
export const LOT_SIZE = 100; // 1手 = 100股

// ============ 涨跌停板限制 ============
export type StockBoard = "MAIN" | "ST" | "GEM" | "STAR" | "BJ";

export function getStockBoard(symbol: string): StockBoard {
  const code = symbol.replace(/^[a-z]{2}/i, "");
  if (code.startsWith("688")) return "STAR";
  if (code.startsWith("300")) return "GEM";
  if (code.startsWith("8") || code.startsWith("4")) return "BJ";
  return "MAIN";
}

export function getPriceLimit(board: StockBoard): number {
  switch (board) {
    case "ST":   return 0.05;
    case "GEM":  return 0.20;
    case "STAR": return 0.20;
    case "BJ":   return 0.30;
    default:     return 0.10;
  }
}

// ============ 核心校验函数 ============

export interface ValidationResult {
  valid: boolean;
  error?: string;
  code?: string;
}

export function validateTradingHours(now: Date = new Date()): ValidationResult {
  const timeStr = now.toTimeString().slice(0, 8);
  const inMorning = timeStr >= MORNING_SESSION.start && timeStr <= MORNING_SESSION.end;
  const inAfternoon = timeStr >= AFTERNOON_SESSION.start && timeStr <= AFTERNOON_SESSION.end;
  if (!inMorning && !inAfternoon) {
    return {
      valid: false,
      error: "不在交易时间段（9:30-11:30 / 13:00-15:00）",
      code: "OUT_OF_TRADING_HOURS",
    };
  }
  return { valid: true };
}

export function validateLotSize(quantity: number): ValidationResult {
  if (quantity <= 0) {
    return { valid: false, error: "数量必须为正", code: "INVALID_QUANTITY" };
  }
  if (quantity % LOT_SIZE !== 0) {
    return {
      valid: false,
      error: `买入数量必须是 ${LOT_SIZE} 的整数倍（1手=${LOT_SIZE}股）`,
      code: "LOT_SIZE_VIOLATION",
    };
  }
  return { valid: true };
}

export function validatePriceLimit(
  symbol: string,
  price: number,
  prevClose: number,
): ValidationResult {
  if (!price || !prevClose || prevClose <= 0) {
    return { valid: false, error: "价格数据异常", code: "INVALID_PRICE" };
  }
  const board = getStockBoard(symbol);
  const limit = getPriceLimit(board);
  const upperLimit = prevClose * (1 + limit);
  const lowerLimit = prevClose * (1 - limit);
  if (price > upperLimit || price < lowerLimit) {
    return {
      valid: false,
      error: `报价超出涨跌停范围 [${lowerLimit.toFixed(2)}, ${upperLimit.toFixed(2)}]（${board}板，涨跌停±${(limit * 100).toFixed(0)}%）`,
      code: "PRICE_LIMIT_VIOLATION",
    };
  }
  return { valid: true };
}

/** T+1 校验：当天买的股票当天不能卖 */
export function validateT1(
  positions: Array<{ symbol: string; boughtAt: Date | string }>,
  symbol: string,
  now: Date = new Date(),
): ValidationResult {
  const todayStr = now.toISOString().slice(0, 10);
  const pos = positions.find(p => p.symbol === symbol);
  if (pos) {
    const boughtDate = pos.boughtAt instanceof Date
      ? pos.boughtAt.toISOString().slice(0, 10)
      : String(pos.boughtAt).slice(0, 10);
    if (boughtDate === todayStr) {
      return {
        valid: false,
        error: `T+1 限制：${symbol} 于 ${boughtDate} 买入，最早 ${todayStr} 才能卖出`,
        code: "T1_VIOLATION",
      };
    }
  }
  return { valid: true };
}

/** 计算单笔交易费用 */
export interface TradeCost {
  commission: number;
  stampTax: number;
  transferFee: number;
  totalCost: number;
}

export function calcTradeCost(side: "BUY" | "SELL", price: number, quantity: number): TradeCost {
  const amount = price * quantity;
  const commission = Math.max(amount * COMMISSION_RATE, MIN_COMMISSION);
  const transferFee = amount * TRANSFER_FEE_RATE;
  const stampTax = side === "SELL" ? amount * STAMP_TAX_RATE : 0;
  return {
    commission: Math.round(commission * 100) / 100,
    stampTax: Math.round(stampTax * 100) / 100,
    transferFee: Math.round(transferFee * 100) / 100,
    totalCost: side === "BUY"
      ? Math.round((commission + transferFee) * 100) / 100
      : Math.round((commission + stampTax + transferFee) * 100) / 100,
  };
}

// ============ 竞技场 A 股比赛规则 ============
// 每只龙虾：每天最多买1只股票，持仓同时最多1只
// 收益 = 最终卖出价 vs 成本价

export interface SingleStockResult {
  valid: boolean;
  error?: string;
  code?: string;
}

/**
 * 单股持仓校验：比赛中同时最多持有1只股票
 * positions: 当前持仓列表（未成交）
 * newSymbol: 本次计划买入的标的
 * 已有持仓时，只能加仓同一只
 */
export function validateSingleStock(
  positions: Array<{ symbol: string; quantity: number }>,
  newSymbol: string,
): SingleStockResult {
  const held = positions.filter(p => p.quantity > 0);
  if (held.length === 0) return { valid: true };
  const heldSymbol = held[0].symbol;
  if (heldSymbol !== newSymbol) {
    return {
      valid: false,
      error: `单股规则：同时最多持仓1只，当前持有 ${heldSymbol}，无法买入 ${newSymbol}`,
      code: "SINGLE_STOCK_VIOLATION",
    };
  }
  return { valid: true };
}

/**
 * 每日买入次数校验：每天最多买1只（卖出不限）
 * 通过查询当天成交记录中 BUY 次数来判断
 * tradesToday: 当天已执行的 BUY 成交数量
 */
export interface DailyBuyResult {
  valid: boolean;
  error?: string;
  code?: string;
}

export function validateDailyBuy(tradesTodayCount: number): DailyBuyResult {
  if (tradesTodayCount >= 1) {
    return {
      valid: false,
      error: "每日买入限制：每只龙虾每天最多买入1次（卖出不限），请明日再买",
      code: "DAILY_BUY_LIMIT",
    };
  }
  return { valid: true };
}
