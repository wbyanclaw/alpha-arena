import { NextRequest, NextResponse } from "next/server";

const SH_MARKET = "sh";
const SZ_MARKET = "sz";
const HISTORY_DAYS = 90;

// 获取日K线（抓东方财富接口）
async function fetchDailyKline(symbol: string, days = HISTORY_DAYS) {
  const code = symbol.replace(/^[a-z]{2}/i, "");
  // 东方财富日K接口
  const url = `https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${symbol.startsWith("sh") ? "1" : "0"}.${code}&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=101&fqt=1&end=${HISTORY_DAYS}&lmt=${days}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const klines: Array<{ date: string; open: number; close: number; high: number; low: number; volume: number; amount: number; change: number; changePct: number }> = [];

    if (data?.data?.klines) {
      for (const line of data.data.klines) {
        const fields = line.split(",");
        const date = fields[0];
        const open = parseFloat(fields[1]) || 0;
        const close = parseFloat(fields[2]) || 0;
        const high = parseFloat(fields[3]) || 0;
        const low = parseFloat(fields[4]) || 0;
        const volume = parseFloat(fields[5]) || 0;
        const amount = parseFloat(fields[6]) || 0;
        const prevClose = parseFloat(fields[7]) || open;
        const change = close - prevClose;
        const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
        klines.push({ date, open, close, high, low, volume, amount, change, changePct });
      }
    }
    return { symbol, name: data?.data?.name || symbol, klines };
  } catch {
    return null;
  }
}

// 获取分钟K线（东方财富分钟接口，支持5分钟/15分钟/30分钟/60分钟）
async function fetchMinuteKline(symbol: string, minuteType: "5" | "15" | "30" | "60" = "5", count = 100) {
  const code = symbol.replace(/^[a-z]{2}/i, "");
  // eastmoney minute kline
  const url = `https://push2.eastmoney.com/api/qt/stock/kline/get?secid=${symbol.startsWith("sh") ? "1" : "0"}.${code}&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=${minuteType === "5" ? "5" : minuteType === "15" ? "15" : minuteType === "30" ? "30" : "60"}&fqt=1&end=20500101&lmt=${count}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const klines: Array<{ datetime: string; open: number; close: number; high: number; low: number; volume: number; amount: number }> = [];

    if (data?.data?.klines) {
      for (const line of data.data.klines) {
        const fields = line.split(",");
        klines.push({
          datetime: fields[0],
          open: parseFloat(fields[1]) || 0,
          close: parseFloat(fields[2]) || 0,
          high: parseFloat(fields[3]) || 0,
          low: parseFloat(fields[4]) || 0,
          volume: parseFloat(fields[5]) || 0,
          amount: parseFloat(fields[6]) || 0,
        });
      }
    }
    return { symbol, minuteType, klines };
  } catch {
    return null;
  }
}

// GET /api/kline?symbol=000001&type=daily
// type: daily | 5min | 15min | 30min | 60min
export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol");
  const type = req.nextUrl.searchParams.get("type") || "daily";
  const count = parseInt(req.nextUrl.searchParams.get("count") || "100");

  if (!symbol) return NextResponse.json({ error: "symbol 必填" }, { status: 400 });

  if (type === "daily" || type === "dailyK" || type === "day") {
    const result = await fetchDailyKline(symbol, count);
    if (!result) return NextResponse.json({ error: "获取K线失败" }, { status: 500 });
    return NextResponse.json(result);
  }

  const minuteMap: Record<string, string> = { "5min": "5", "15min": "15", "30min": "30", "60min": "60" };
  const minuteType = minuteMap[type];
  if (!minuteType) return NextResponse.json({ error: "type 无效（支持: daily, 5min, 15min, 30min, 60min）" }, { status: 400 });

  const result = await fetchMinuteKline(symbol, minuteType as "5" | "15" | "30" | "60", count);
  if (!result) return NextResponse.json({ error: "获取分钟K线失败" }, { status: 500 });
  return NextResponse.json(result);
}
