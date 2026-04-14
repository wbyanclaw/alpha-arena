import { NextResponse } from "next/server";

const STOCKS = [
  { secid: "1.600519", code: "600519", name: "贵州茅台" },
  { secid: "0.000001", code: "000001", name: "平安银行" },
  { secid: "1.600036", code: "600036", name: "招商银行" },
  { secid: "1.601318", code: "601318", name: "中国平安" },
  { secid: "0.000858", code: "000858", name: "五粮液" },
  { secid: "1.600276", code: "600276", name: "恒瑞医药" },
  { secid: "1.601888", code: "601888", name: "中国中免" },
  { secid: "1.600030", code: "600030", name: "中信证券" },
  { secid: "0.002594", code: "002594", name: "比亚迪" },
  { secid: "0.300750", code: "300750", name: "宁德时代" },
  { secid: "0.300059", code: "300059", name: "东方财富" },
  { secid: "1.688041", code: "688041", name: "寒武纪" },
  { secid: "1.688981", code: "688981", name: "中微公司" },
  { secid: "0.000002", code: "000002", name: "万科A" },
];

// 东方财富主源
async function fetchEastmoney(): Promise<Map<string, any> | null> {
  try {
    const secids = STOCKS.map(s => s.secid).join(",");
    const url = `https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f2,f3,f4,f5,f6,f12,f14,f15,f16,f17&secids=${secids}`;
    const res = await fetch(url, { cache: "no-store", headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const json = await res.json();
    const map = new Map<string, any>();
    if (json?.data?.diff) {
      for (const item of json.data.diff) {
        map.set(item.f12, item);
      }
    }
    return map.size > 0 ? map : null;
  } catch { return null; }
}

// 新浪备用源（GBK）
async function fetchSina(): Promise<Map<string, any> | null> {
  try {
    const symbols = STOCKS.map(s => s.secid.replace("1.", "sh").replace("0.", "sz")).join(",");
    const res = await fetch(`https://hq.sinajs.cn/list=${symbols}`, {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://finance.sina.com.cn/" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const text = new TextDecoder("gbk").decode(buf);
    const map = new Map<string, any>();
    const lines = text.trim().split("\n");
    for (const line of lines) {
      const m = line.match(/="([^"]+)"/);
      if (!m) continue;
      const f = m[1].split(",");
      if (f.length < 10) continue;
      const code = (f[0].startsWith("sh") ? f[0].slice(2) : f[0].startsWith("sz") ? f[0].slice(2) : null);
      if (!code) continue;
      map.set(code, {
        f2: parseFloat(f[3]) || 0,
        f4: parseFloat(f[2]) || 0,
        f14: f[0],
        f15: parseFloat(f[4]) || 0,
        f16: parseFloat(f[5]) || 0,
      });
    }
    return map.size > 0 ? map : null;
  } catch { return null; }
}

export async function GET() {
  // 优先东方财富，失败则新浪备用
  let emMap = await fetchEastmoney();
  let source = "eastmoney";

  if (!emMap || emMap.size === 0) {
    emMap = await fetchSina();
    source = "sina";
  }

  const prices = STOCKS.map(s => {
    const d = emMap?.get(s.code);
    const price = d?.f2 ?? 0;
    const prevClose = d?.f4 ?? price;
    const change = price - prevClose;
    const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
    return {
      symbol: s.code,
      name: s.name,
      price,
      prevClose,
      change: Math.round(change * 100) / 100,
      changePct: Math.round(changePct * 100) / 100,
      high: d?.f15 ?? price,
      low: d?.f16 ?? price,
      volume: d?.f5 ?? 0,
      source,
    };
  });

  return NextResponse.json(prices);
}
