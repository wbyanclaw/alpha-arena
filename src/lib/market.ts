import { execFile } from "node:child_process";
import { promisify } from "node:util";

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

function normalizeSymbols(symbols: string[]) {
  return [...new Set(symbols.map((symbol) => symbol.replace(/^(sh|sz|bj)/i, "").trim()).filter(Boolean))];
}

export function toMarketSymbol(symbol: string): string {
  const code = symbol.replace(/^(sh|sz|bj)/i, "");
  return `${detectExchangePrefix(code)}${code}`;
}

export function buildSinaList(symbols: string[]): string {
  return symbols.map((symbol) => toMarketSymbol(symbol)).join(",");
}

const execFileAsync = promisify(execFile);

const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  "Accept": "*/*",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
  "Connection": "keep-alive",
};

async function fetchTextWithCurl(url: string, referer: string) {
  const { stdout } = await execFileAsync("curl", [
    "-L",
    "-sS",
    "--max-time",
    "8",
    "-A",
    BROWSER_HEADERS["User-Agent"],
    "-e",
    referer,
    url,
  ], { maxBuffer: 2 * 1024 * 1024 });
  return stdout;
}

function toEastmoneySecid(symbol: string): string {
  const code = symbol.replace(/^(sh|sz|bj)/i, "");
  const market = detectExchangePrefix(code) === "sh" ? "1" : "0";
  return `${market}.${code}`;
}

function toYahooSymbol(symbol: string): string {
  const code = symbol.replace(/^(sh|sz|bj)/i, "");
  return `${code}.${detectExchangePrefix(code) === "sh" ? "SS" : "SZ"}`;
}

export type MarketPriceSnapshot = {
  symbol: string;
  name: string;
  price: number;
  prevClose: number;
  source?: string;
  quoteAt?: Date;
};

function rowToSnapshot(symbol: string, name: string | undefined, latest: number, prevClose: number, source?: string, quoteAt?: Date): MarketPriceSnapshot | null {
  const seed = A_SHARE_STOCKS.find((item) => item.symbol === symbol);
  const price = Number.isFinite(latest) && latest > 0
    ? latest
    : Number.isFinite(prevClose) && prevClose > 0
      ? prevClose
      : 0;
  if (price <= 0) return null;
  return {
    symbol,
    name: name || seed?.name || symbol,
    price,
    prevClose: Number.isFinite(prevClose) && prevClose > 0 ? prevClose : price,
    source,
    quoteAt,
  };
}

async function fetchSinaOnlyPrices(symbols: string[]): Promise<MarketPriceSnapshot[]> {
  const uniqueSymbols = normalizeSymbols(symbols);
  if (uniqueSymbols.length === 0) return [];

  const url = `https://hq.sinajs.cn/list=${buildSinaList(uniqueSymbols)}`;
  const res = await fetch(url, {
    headers: { ...BROWSER_HEADERS, Referer: "https://finance.sina.com.cn/realstock/company/sh600519/nc.shtml" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`sina quote failed: ${res.status}`);

  const buf = await res.arrayBuffer();
  const text = new TextDecoder("gb18030").decode(buf);
  const snapshots: MarketPriceSnapshot[] = [];

  for (const line of text.trim().split("\n")) {
    const m = line.match(/="([^"]+)"/);
    if (!m) continue;
    const fields = m[1].split(",");
    if (fields.length < 10) continue;
    const codeM = line.match(/hq_str_(?:sh|sz|bj)(\w+)/);
    if (!codeM) continue;
    const snapshot = rowToSnapshot(codeM[1], fields[0], Number.parseFloat(fields[3]), Number.parseFloat(fields[2]), "sina");
    if (snapshot) snapshots.push(snapshot);
  }

  return snapshots;
}

async function fetchTencentPrices(symbols: string[]): Promise<MarketPriceSnapshot[]> {
  const uniqueSymbols = normalizeSymbols(symbols);
  if (uniqueSymbols.length === 0) return [];

  const url = `https://qt.gtimg.cn/q=${buildSinaList(uniqueSymbols)}`;
  const res = await fetch(url, {
    headers: { ...BROWSER_HEADERS, Referer: "https://gu.qq.com/" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`tencent quote failed: ${res.status}`);

  const buf = await res.arrayBuffer();
  const text = new TextDecoder("gb18030").decode(buf);
  const snapshots: MarketPriceSnapshot[] = [];

  for (const line of text.trim().split(";")) {
    const codeM = line.match(/v_(?:sh|sz|bj)(\w+)=/);
    const dataM = line.match(/="([^"]+)"/);
    if (!codeM || !dataM) continue;
    const fields = dataM[1].split("~");
    if (fields.length < 6) continue;
    const snapshot = rowToSnapshot(codeM[1], fields[1], Number.parseFloat(fields[3]), Number.parseFloat(fields[4]), "tencent");
    if (snapshot) snapshots.push(snapshot);
  }

  return snapshots;
}

async function fetchEastmoneyPrices(symbols: string[]): Promise<MarketPriceSnapshot[]> {
  const uniqueSymbols = normalizeSymbols(symbols);
  if (uniqueSymbols.length === 0) return [];

  const url = `https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&fields=f12,f14,f2,f18&secids=${uniqueSymbols.map(toEastmoneySecid).join(",")}`;
  let json: { data?: { diff?: Array<{ f12?: string; f14?: string; f2?: number | string; f18?: number | string }> } };
  try {
    const res = await fetch(url, {
      headers: { ...BROWSER_HEADERS, Referer: "https://quote.eastmoney.com/" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`eastmoney quote failed: ${res.status}`);
    json = await res.json() as typeof json;
  } catch (error) {
    console.warn("[market] eastmoney fetch failed; retrying with curl", error);
    json = JSON.parse(await fetchTextWithCurl(url, "https://quote.eastmoney.com/")) as typeof json;
  }
  return (json.data?.diff ?? []).flatMap((row) => {
    const symbol = String(row.f12 ?? "");
    if (!symbol) return [];
    const snapshot = rowToSnapshot(symbol, String(row.f14 ?? ""), Number(row.f2), Number(row.f18), "eastmoney");
    return snapshot ? [snapshot] : [];
  });
}

async function fetchYahooPrices(symbols: string[]): Promise<MarketPriceSnapshot[]> {
  const uniqueSymbols = normalizeSymbols(symbols);
  if (uniqueSymbols.length === 0) return [];

  const snapshots = await Promise.all(uniqueSymbols.map(async (symbol) => {
    const yahooSymbol = toYahooSymbol(symbol);
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?range=1d&interval=1m`;
    const res = await fetch(url, {
      headers: { ...BROWSER_HEADERS, Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`yahoo quote failed: ${res.status}`);
    const json = await res.json() as {
      chart?: { result?: Array<{
        meta?: { regularMarketPrice?: number; chartPreviousClose?: number; shortName?: string; longName?: string };
        timestamp?: number[];
        indicators?: { quote?: Array<{ close?: Array<number | null> }> };
      }> };
    };
    const result = json.chart?.result?.[0];
    const meta = result?.meta;
    const timestamps = result?.timestamp ?? [];
    const closes = result?.indicators?.quote?.[0]?.close ?? [];
    let idx = closes.length - 1;
    while (idx >= 0 && !(Number.isFinite(Number(closes[idx])) && Number(closes[idx]) > 0)) idx -= 1;
    const price = idx >= 0 ? Number(closes[idx]) : Number(meta?.regularMarketPrice);
    const quoteAt = idx >= 0 && timestamps[idx] ? new Date(timestamps[idx] * 1000) : undefined;
    return rowToSnapshot(symbol, meta?.shortName || meta?.longName || undefined, price, Number(meta?.chartPreviousClose), "yahoo", quoteAt);
  }));

  return snapshots.flatMap((item) => item ? [item] : []);
}

export async function fetchSinaPrices(symbols: string[]): Promise<MarketPriceSnapshot[]> {
  const uniqueSymbols = normalizeSymbols(symbols);
  if (uniqueSymbols.length === 0) return [];

  const bySymbol = new Map<string, MarketPriceSnapshot>();
  const providers: Array<[string, (symbols: string[]) => Promise<MarketPriceSnapshot[]>]> = [
    // Tencent currently accepts server-side browser-like requests more reliably;
    // Sina may return 403 from server IPs even with browser headers, so keep it as a fallback.
    ["tencent", fetchTencentPrices],
    ["eastmoney", fetchEastmoneyPrices],
    ["yahoo", fetchYahooPrices],
    ["sina", fetchSinaOnlyPrices],
  ];

  for (const [name, provider] of providers) {
    const missing = uniqueSymbols.filter((symbol) => !bySymbol.has(symbol));
    if (missing.length === 0) break;
    try {
      const snapshots = await provider(missing);
      for (const item of snapshots) {
        if (item.source === "yahoo" && item.quoteAt && Date.now() - item.quoteAt.getTime() > 3 * 60 * 1000) {
          console.warn(`[market] yahoo quote stale for ${item.symbol}; skipped`);
          continue;
        }
        if (!bySymbol.has(item.symbol) && Number.isFinite(item.price) && item.price > 0) bySymbol.set(item.symbol, item);
      }
    } catch (error) {
      console.warn(`[market] ${name} quote failed`, error);
    }
  }

  return uniqueSymbols.flatMap((symbol) => bySymbol.get(symbol) ?? []);
}
