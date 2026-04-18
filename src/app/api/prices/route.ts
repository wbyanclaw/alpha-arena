import { NextResponse } from "next/server";
import { A_SHARE_STOCKS, buildSinaList, toMarketSymbol } from "@/lib/market";

type PriceSnapshot = {
  name: string;
  price: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
  change: number;
  changePct: number;
};

export async function GET() {
  try {
    const list = buildSinaList(A_SHARE_STOCKS.map((s) => s.symbol));
    const url = `https://hq.sinajs.cn/list=${list}`;
    const res = await fetch(url, {
      headers: { Referer: "https://finance.sina.com.cn" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "行情服务暂不可用" }, { status: 503 });
    }

    const buf = await res.arrayBuffer();
    const text = new TextDecoder("gb18030").decode(buf);

    const dataMap = new Map<string, PriceSnapshot>();
    for (const line of text.trim().split("\n")) {
      const m = line.match(/="([^"]+)"/);
      if (!m) continue;
      const fields = m[1].split(",");
      if (fields.length < 10) continue;
      const rawName = fields[0];
      const codeM = line.match(/hq_str_(?:sh|sz|bj)(\w+)/);
      if (!codeM) continue;
      const code = codeM[1];
      const price = parseFloat(fields[3]) || 0;
      const prevClose = parseFloat(fields[2]) || price;
      const open = parseFloat(fields[1]) || price;
      const high = parseFloat(fields[4]) || price;
      const low = parseFloat(fields[5]) || price;
      const change = price - prevClose;
      const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
      dataMap.set(code, { name: rawName, price, prevClose, open, high, low, change, changePct });
    }

    if (dataMap.size === 0) {
      return NextResponse.json({ error: "行情解析失败，请稍后重试" }, { status: 503 });
    }

    const prices = A_SHARE_STOCKS.map((s) => {
      const d = dataMap.get(s.symbol);
      if (!d || d.price <= 0) {
        return {
          symbol: s.symbol,
          marketSymbol: toMarketSymbol(s.symbol),
          name: s.name,
          error: `行情缺失或代码映射失败: ${s.symbol}`,
          source: "sina",
        };
      }

      return {
        symbol: s.symbol,
        marketSymbol: toMarketSymbol(s.symbol),
        name: d.name || s.name,
        price: d.price,
        prevClose: d.prevClose,
        change: Math.round(d.change * 100) / 100,
        changePct: Math.round(d.changePct * 100) / 100,
        open: d.open,
        high: d.high,
        low: d.low,
        source: "sina",
      };
    });

    return NextResponse.json(prices);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ error: `行情服务异常: ${message}` }, { status: 503 });
  }
}
