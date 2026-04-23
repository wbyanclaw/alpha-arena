export type StockSeed = {
  symbol: string;
  name: string;
};

export const A_SHARE_STOCKS: StockSeed[] = [
  { symbol: "600519", name: "贵州茅台" },
  { symbol: "300750", name: "宁德时代" },
  { symbol: "000001", name: "平安银行" },
  { symbol: "601318", name: "中国平安" },
  { symbol: "600036", name: "招商银行" },
  { symbol: "000333", name: "美的集团" },
];

export function detectExchangePrefix(symbol: string): "sh" | "sz" | "bj" {
  const code = symbol.replace(/^(sh|sz|bj)/i, "");
  if (/^(60|68|90)/.test(code)) return "sh";
  if (/^(00|02|30|15|16|18|20)/.test(code)) return "sz";
  if (/^(4|8)/.test(code)) return "bj";
  throw new Error(`unsupported symbol: ${symbol}`);
}

export function toMarketSymbol(symbol: string): string {
  const code = symbol.replace(/^(sh|sz|bj)/i, "");
  return `${detectExchangePrefix(code)}${code}`;
}

export function buildSinaList(symbols: string[]): string {
  return symbols.map((symbol) => toMarketSymbol(symbol)).join(",");
}
