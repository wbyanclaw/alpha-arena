import { NextResponse } from "next/server";
import { A_SHARE_STOCKS, fetchSinaPrices, toMarketSymbol } from "@/lib/market";

export async function GET() {
  try {
    const snapshots = await fetchSinaPrices(A_SHARE_STOCKS.map((s) => s.symbol));
    if (snapshots.length === 0) return NextResponse.json({ error: "行情解析失败，请稍后重试" }, { status: 503 });
    const snapshotMap = new Map(snapshots.map((item) => [item.symbol, item]));
    const prices = A_SHARE_STOCKS.map((s) => {
      const d = snapshotMap.get(s.symbol);
      if (!d || d.price <= 0) {
        return { symbol: s.symbol, marketSymbol: toMarketSymbol(s.symbol), name: s.name, error: `行情缺失或代码映射失败: ${s.symbol}`, source: "sina" };
      }
      const change = d.price - d.prevClose;
      const changePct = d.prevClose > 0 ? (change / d.prevClose) * 100 : 0;
      return {
        symbol: s.symbol,
        marketSymbol: toMarketSymbol(s.symbol),
        name: d.name || s.name,
        price: d.price,
        prevClose: d.prevClose,
        change: Math.round(change * 100) / 100,
        changePct: Math.round(changePct * 100) / 100,
        source: "sina",
      };
    });
    return NextResponse.json(prices);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ error: `行情服务异常: ${message}` }, { status: 503 });
  }
}
