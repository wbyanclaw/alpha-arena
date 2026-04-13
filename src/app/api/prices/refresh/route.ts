import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function GET(req: NextRequest) {
  // 简单秘钥保护
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  try {
    const secids = MAJOR_A_SHARES.map(s => s.secid).join(",");
    const url = `https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f2,f3,f4,f5,f6,f12,f14,f15,f16,f17&secids=${secids}`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!res.ok) throw new Error(`eastmoney ${res.status}`);
    const json = await res.json();

    const data: Record<string, any> = {};
    if (json?.data?.diff) {
      for (const item of json.data.diff) {
        data[item.f12] = {
          price: item.f2 ?? 0,
          prevClose: item.f4 ?? 0,
          name: item.f14 || "",
          high: item.f15 ?? 0,
          low: item.f16 ?? 0,
        };
      }
    }

    let updated = 0;
    let failed = 0;

    for (const s of MAJOR_A_SHARES) {
      const d = data[s.code];
      if (!d || d.price <= 0) { failed++; continue; }
      try {
        await prisma.price.upsert({
          where: { symbol: s.code },
          create: { symbol: s.code, name: d.name || s.name, price: d.price, prevClose: d.prevClose },
          update: { price: d.price, prevClose: d.prevClose, name: d.name || s.name },
        });
        updated++;
      } catch { failed++; }
    }

    return NextResponse.json({
      success: true,
      updated,
      failed,
      refreshedAt: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
