import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAJOR_A_SHARES = [
  { symbol: "sh600519", code: "600519", name: "贵州茅台" },
  { symbol: "sh600036", code: "600036", name: "招商银行" },
  { symbol: "sh601318", code: "601318", name: "中国平安" },
  { symbol: "sh600030", code: "600030", name: "中信证券" },
  { symbol: "sh600276", code: "600276", name: "恒瑞医药" },
  { symbol: "sh601888", code: "601888", name: "中国中免" },
  { symbol: "sz000001", code: "000001", name: "平安银行" },
  { symbol: "sz000002", code: "000002", name: "万科A" },
  { symbol: "sz000858", code: "000858", name: "五粮液" },
  { symbol: "sz002594", code: "002594", name: "比亚迪" },
  { symbol: "sz300750", code: "300750", name: "宁德时代" },
  { symbol: "sz300059", code: "300059", name: "东方财富" },
  { symbol: "sh688041", code: "688041", name: "寒武纪" },
  { symbol: "sh688981", code: "688981", name: "中微公司" },
];

function parseSinaLine(line: string) {
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
  const volume = parseFloat(fields[8]) || 0;
  const amount = parseFloat(fields[9]) || 0;
  return { name, open, prevClose, price, high, low, volume, amount };
}

// GET /api/market/snapshot — 全量实时行情快照（Agent 一键获取所有标的价格）
export async function GET(req: NextRequest) {
  const board = req.nextUrl.searchParams.get("board"); // MAIN | GEM | STAR | BJ | all
  const refresh = req.nextUrl.searchParams.get("refresh") === "true";

  // 如果需要强制刷新，直接调新浪
  let snapshot: any[] = [];

  if (refresh) {
    try {
      const symbols = MAJOR_A_SHARES.map(s => s.symbol).join(",");
      const url = `https://hq.sinajs.cn/list=${symbols}`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Referer": "https://finance.sina.com.cn/",
        },
        cache: "no-store",
      });
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const decoder = new TextDecoder("gbk");
        const text = decoder.decode(buf);
        const lines = text.trim().split("\n");
        MAJOR_A_SHARES.forEach((s, i) => {
          const parsed = parseSinaLine(lines[i] || "");
          if (parsed && parsed.price > 0) {
            const change = parsed.price - parsed.prevClose;
            const changePct = parsed.prevClose > 0 ? (change / parsed.prevClose) * 100 : 0;
            snapshot.push({
              symbol: s.code,
              name: parsed.name || s.name,
              price: parsed.price,
              prevClose: parsed.prevClose,
              open: parsed.open,
              high: parsed.high,
              low: parsed.low,
              change: Math.round(change * 100) / 100,
              changePct: Math.round(changePct * 100) / 100,
              volume: parsed.volume,
              amount: parsed.amount,
              
            });
            // 同步写入 DB
            prisma.price.upsert({
              where: { symbol: s.code },
              create: { symbol: s.code, name: parsed.name || s.name, price: parsed.price, prevClose: parsed.prevClose },
              update: { price: parsed.price, prevClose: parsed.prevClose, name: parsed.name || s.name },
            }).catch(() => {});
          }
        });
      }
    } catch { /* fallback to DB */ }
  }

  // 否则从 DB 读（prices 表）
  if (snapshot.length === 0) {
    const dbPrices = await prisma.price.findMany({ where: { symbol: { in: MAJOR_A_SHARES.map(s => s.code) } } });
    const priceMap = new Map(dbPrices.map(p => [p.symbol, p]));
    snapshot = MAJOR_A_SHARES.map(s => {
      const p = priceMap.get(s.code);
      const price = p?.price || 0;
      const prevClose = p?.prevClose || price;
      const change = price - prevClose;
      const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
      return {
        symbol: s.code,
        name: p?.name || s.name,
        price,
        prevClose,
        open: p?.price || 0,
        high: p?.price || 0,
        low: p?.price || 0,
        change: Math.round(change * 100) / 100,
        changePct: Math.round(changePct * 100) / 100,
        volume: 0,
        amount: 0,
        
      };
    });
  }

  if (false && board && board !== "all") {
    snapshot = snapshot.filter(s => s.board === board);
  }

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    count: snapshot.length,
    stocks: snapshot,
  });
}
