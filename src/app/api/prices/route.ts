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

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export async function GET() {
  try {
    const symbols = STOCKS.map(s =>
      s.secid.replace("1.", "sh").replace("0.", "sz")
    ).join(",");

    const res = await fetch(`https://hq.sinajs.cn/list=${symbols}`, {
      cache: "no-store",
      headers: {
        "User-Agent": UA,
        "Referer": "https://finance.sina.com.cn/",
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "行情接口不可用，请稍后重试" }, { status: 503 });
    }

    const buf = await res.arrayBuffer();
    const text = new TextDecoder("gb18030").decode(buf);

    const dataMap = new Map<string, any>();
    for (const line of text.trim().split("\n")) {
      const m = line.match(/="([^"]+)"/);
      if (!m) continue;
      const fields = m[1].split(",");
      if (fields.length < 10) continue;
      // 格式: name,今开,昨收,现价,最高,最低,...
      // fields[0]=name, [1]=open, [2]=prevClose, [3]=price, [4]=high, [5]=low
      const rawName = fields[0];
      // 解析代码：从 hq_str_xxx 取
      const codeM = line.match(/hq_str_(sh|sz)(\w+)/);
      if (!codeM) continue;
      const code = codeM[2];
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

    const prices = STOCKS.map(s => {
      const d = dataMap.get(s.code);
      const price = d?.price ?? 0;
      const prevClose = d?.prevClose ?? price;
      const change = price - prevClose;
      const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
      return {
        symbol: s.code,
        name: d?.name ?? s.name,
        price,
        prevClose,
        change: Math.round(change * 100) / 100,
        changePct: Math.round(changePct * 100) / 100,
        open: d?.open ?? price,
        high: d?.high ?? price,
        low: d?.low ?? price,
        source: "sina",
      };
    });

    return NextResponse.json(prices);
  } catch (e: any) {
    return NextResponse.json({ error: "行情服务异常: " + e.message }, { status: 503 });
  }
}
