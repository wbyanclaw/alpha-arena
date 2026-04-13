import { NextResponse } from "next/server";

const MAJOR_A_SHARES = [
  { symbol: "sh600519", code: "600519", name: "贵州茅台" },
  { symbol: "sz000001", code: "000001", name: "平安银行" },
  { symbol: "sh600036", code: "600036", name: "招商银行" },
  { symbol: "sh601318", code: "601318", name: "中国平安" },
  { symbol: "sz000858", code: "000858", name: "五粮液" },
  { symbol: "sh600276", code: "600276", name: "恒瑞医药" },
  { symbol: "sh601888", code: "601888", name: "中国中免" },
  { symbol: "sh600030", code: "600030", name: "中信证券" },
  { symbol: "sz002594", code: "002594", name: "比亚迪" },
  { symbol: "sz300750", code: "300750", name: "宁德时代" },
];

function parseSinaLine(line: string) {
  // hq_str_sh600519="贵州茅台,1444.000,1453.960,1443.310,1446.500,1433.000,1443.310,1443.320,2521364,3629675490.000,21,1443.310,100,1443.010,1400,1442.880,100,1442.600,200,1443.320,100,1443.590,700,1444.000,100,1444.010,100,1444.020,2026-04-13,15:00:01,00,"
  const match = line.match(/="([^"]+)"/);
  if (!match) return null;
  const fields = match[1].split(",");
  if (fields.length < 10) return null;

  const name = fields[0];
  const open = parseFloat(fields[1]) || 0;
  const prevClose = parseFloat(fields[2]) || 0;
  const price = parseFloat(fields[3]) || 0;
  const high = parseFloat(fields[4]) || 0;
  const low = parseFloat(fields[5]) || 0;
  const volume = parseFloat(fields[8]) || 0; // 成交量（股）
  const amount = parseFloat(fields[9]) || 0; // 成交额（元）

  return {
    name,
    open,
    prevClose,
    price,
    high,
    low,
    volume,
    amount,
    change: price - prevClose,
    changePct: prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : 0,
  };
}

export async function GET() {
  try {
    const symbols = MAJOR_A_SHARES.map(s => s.symbol).join(",");
    const url = `https://hq.sinajs.cn/list=${symbols}`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Referer": "https://finance.sina.com.cn/",
      },
      
    });

    if (!res.ok) throw new Error(`Sina API ${res.status}`);

    // GBK → UTF-8
    const buf = await res.arrayBuffer();
    const decoder = new TextDecoder("gbk");
    const text = decoder.decode(buf);

    const lines = text.trim().split("\n");
    const prices = MAJOR_A_SHARES.map((s, i) => {
      const parsed = parseSinaLine(lines[i] || "");
      return {
        symbol: s.code,
        name: parsed?.name || s.name,
        price: parsed?.price || 0,
        prevClose: parsed?.prevClose || 0,
        open: parsed?.open || 0,
        high: parsed?.high || 0,
        low: parsed?.low || 0,
        volume: parsed?.volume || 0,
        change: parsed?.change || 0,
        changePct: parsed?.changePct || 0,
        market: "A",
      };
    });

    return NextResponse.json(prices);
  } catch (e: any) {
    console.error("prices error:", e);
    return NextResponse.json({ error: "failed to fetch prices" }, { status: 500 });
  }
}
