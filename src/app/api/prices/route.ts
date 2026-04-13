import { NextResponse } from "next/server";

// 东方财富 A 股行情接口
const MAJOR_A_SHARES = [
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

export async function GET() {
  try {
    const secids = MAJOR_A_SHARES.map(s => s.secid).join(",");
    const url = `https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f2,f3,f4,f5,f6,f7,f12,f14,f15,f16,f17,f18&secids=${secids}`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!res.ok) throw new Error(`eastmoney ${res.status}`);

    const json = await res.json();
    const data: Record<string, any> = {};

    if (json?.data?.diff) {
      for (const item of json.data.diff) {
        const secid = item.f12; // 股票代码
        data[secid] = {
          symbol: secid,
          name: item.f14 || "",
          price: item.f2 ?? 0,           // 现价
          prevClose: item.f4 ?? 0,       // 昨收
          change: item.f3 ?? 0,          // 涨跌额
          changePct: item.f3 && item.f4 ? (item.f3 / item.f4) * 100 : 0,
          open: item.f15 ?? 0,
          high: item.f16 ?? 0,
          low: item.f17 ?? 0,
          volume: item.f5 ?? 0,
          amount: item.f6 ?? 0,
        };
      }
    }

    const prices = MAJOR_A_SHARES.map(s => {
      const d = data[s.code];
      const price = d?.price ?? 0;
      const prevClose = d?.prevClose ?? price;
      const change = price - prevClose;
      const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
      return {
        symbol: s.code,
        name: d?.name || s.name,
        price,
        prevClose,
        open: d?.open ?? price,
        high: d?.high ?? price,
        low: d?.low ?? price,
        change: Math.round(change * 100) / 100,
        changePct: Math.round(changePct * 100) / 100,
        volume: d?.volume ?? 0,
        amount: d?.amount ?? 0,
        market: "A",
      };
    });

    return NextResponse.json(prices);
  } catch (e: any) {
    console.error("prices error:", e);
    return NextResponse.json({ error: "failed to fetch prices: " + e.message }, { status: 500 });
  }
}
