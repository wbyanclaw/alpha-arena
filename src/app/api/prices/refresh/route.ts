import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { A_SHARE_STOCKS, buildSinaList, toMarketSymbol } from "@/lib/market";

type SinaSnapshot = {
  name: string;
  price: number;
};

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let list: string;
  try {
    list = buildSinaList(A_SHARE_STOCKS.map((s) => s.symbol));
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ error: `symbol mapping failed: ${message}` }, { status: 400 });
  }

  const url = `https://hq.sinajs.cn/list=${list}`;

  try {
    const res = await fetch(url, {
      headers: { Referer: "https://finance.sina.com.cn" },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream failed" }, { status: 503 });
    }

    const buf = await res.arrayBuffer();
    const text = new TextDecoder("gb18030").decode(buf);
    const dataMap = new Map<string, SinaSnapshot>();

    for (const line of text.trim().split("\n")) {
      const m = line.match(/="([^"]+)"/);
      if (!m) continue;
      const fields = m[1].split(",");
      if (fields.length < 4) continue;
      const codeM = line.match(/hq_str_(?:sh|sz|bj)(\w+)/);
      if (!codeM) continue;
      const symbol = codeM[1];
      dataMap.set(symbol, {
        name: fields[0],
        price: parseFloat(fields[3]) || 0,
      });
    }

    let updated = 0;
    const failedSymbols: string[] = [];
    for (const stock of A_SHARE_STOCKS) {
      const snapshot = dataMap.get(stock.symbol);
      if (!snapshot || snapshot.price <= 0) {
        failedSymbols.push(`${stock.symbol}(${toMarketSymbol(stock.symbol)})`);
        continue;
      }

      const existing = await prisma.price.findUnique({ where: { symbol: stock.symbol } });
      if (existing) {
        await prisma.price.update({
          where: { symbol: stock.symbol },
          data: {
            name: snapshot.name || stock.name,
            price: snapshot.price,
            prevClose: existing.price || snapshot.price,
          },
        });
      } else {
        await prisma.price.create({
          data: {
            symbol: stock.symbol,
            name: snapshot.name || stock.name,
            price: snapshot.price,
            prevClose: snapshot.price,
          },
        });
      }
      updated += 1;
    }

    return NextResponse.json({
      updated,
      failed: failedSymbols.length,
      failedSymbols,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ error: `refresh failed: ${message}` }, { status: 503 });
  }
}
