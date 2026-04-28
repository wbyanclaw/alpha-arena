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


export type MarketPriceSnapshot = {
  symbol: string;
  name: string;
  price: number;
  prevClose: number;
};

async function fetchTencentPrices(symbols: string[]): Promise<MarketPriceSnapshot[]> {
  const uniqueSymbols = [...new Set(symbols.map((symbol) => symbol.trim()).filter(Boolean))];
  if (uniqueSymbols.length === 0) return [];

  const url = `https://qt.gtimg.cn/q=${buildSinaList(uniqueSymbols)}`;
  const res = await fetch(url, {
    headers: { Referer: "https://finance.qq.com", "User-Agent": "Mozilla/5.0" },
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
    const symbol = codeM[1];
    const seed = A_SHARE_STOCKS.find((item) => item.symbol === symbol);
    const latest = Number.parseFloat(fields[3]);
    const prevClose = Number.parseFloat(fields[4]);
    const price = Number.isFinite(latest) && latest > 0
      ? latest
      : Number.isFinite(prevClose) && prevClose > 0
        ? prevClose
        : 0;
    if (price <= 0) continue;
    snapshots.push({
      symbol,
      name: fields[1] || seed?.name || symbol,
      price,
      prevClose: Number.isFinite(prevClose) && prevClose > 0 ? prevClose : price,
    });
  }

  return snapshots;
}

export async function fetchSinaPrices(symbols: string[]): Promise<MarketPriceSnapshot[]> {
  const uniqueSymbols = [...new Set(symbols.map((symbol) => symbol.trim()).filter(Boolean))];
  if (uniqueSymbols.length === 0) return [];

  const url = `https://hq.sinajs.cn/list=${buildSinaList(uniqueSymbols)}`;
  try {
    const res = await fetch(url, {
      headers: { Referer: "https://finance.sina.com.cn", "User-Agent": "Mozilla/5.0" },
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

      const symbol = codeM[1];
      const seed = A_SHARE_STOCKS.find((item) => item.symbol === symbol);
      const prevClose = Number.parseFloat(fields[2]);
      const latest = Number.parseFloat(fields[3]);
      const closeOrLatest = Number.isFinite(latest) && latest > 0
        ? latest
        : Number.isFinite(prevClose) && prevClose > 0
          ? prevClose
          : 0;

      if (closeOrLatest <= 0) continue;
      snapshots.push({
        symbol,
        name: fields[0] || seed?.name || symbol,
        price: closeOrLatest,
        prevClose: Number.isFinite(prevClose) && prevClose > 0 ? prevClose : closeOrLatest,
      });
    }

    if (snapshots.length > 0) return snapshots;
  } catch (error) {
    console.warn("[market] sina quote failed, fallback to tencent", error);
  }

  return fetchTencentPrices(uniqueSymbols);
}
