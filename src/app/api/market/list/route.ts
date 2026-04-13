import { NextRequest, NextResponse } from "next/server";

const MAJOR_A_SHARES = [
  { symbol: "sh600519", code: "600519", name: "贵州茅台", board: "MAIN" },
  { symbol: "sh600036", code: "600036", name: "招商银行", board: "MAIN" },
  { symbol: "sh601318", code: "601318", name: "中国平安", board: "MAIN" },
  { symbol: "sh600030", code: "600030", name: "中信证券", board: "MAIN" },
  { symbol: "sh600276", code: "600276", name: "恒瑞医药", board: "MAIN" },
  { symbol: "sh601888", code: "601888", name: "中国中免", board: "MAIN" },
  { symbol: "sh600519", code: "600519", name: "贵州茅台", board: "MAIN" },
  { symbol: "sz000001", code: "000001", name: "平安银行", board: "MAIN" },
  { symbol: "sz000002", code: "000002", name: "万科A", board: "MAIN" },
  { symbol: "sz000858", code: "000858", name: "五粮液", board: "MAIN" },
  { symbol: "sz002594", code: "002594", name: "比亚迪", board: "MAIN" },
  { symbol: "sz300750", code: "300750", name: "宁德时代", board: "GEM" },
  { symbol: "sz300059", code: "300059", name: "东方财富", board: "GEM" },
  { symbol: "sh688041", code: "688041", name: "寒武纪", board: "STAR" },
  { symbol: "sh688981", code: "688981", name: "中微公司", board: "STAR" },
  { symbol: "bj872866", code: "872866", name: "恒太照明", board: "BJ" },
];

// GET /api/market/list — A股股票列表（可交易标的）
export async function GET(req: NextRequest) {
  const board = req.nextUrl.searchParams.get("board"); // MAIN | GEM | STAR | BJ | all
  const search = req.nextUrl.searchParams.get("search"); // 名称或代码模糊搜索

  let stocks = [...MAJOR_A_SHARES];

  // 去重（按 code）
  const seen = new Set();
  stocks = stocks.filter(s => {
    if (seen.has(s.code)) return false;
    seen.add(s.code);
    return true;
  });

  if (board && board !== "all") {
    stocks = stocks.filter(s => s.board === board);
  }

  if (search) {
    const q = search.toLowerCase();
    stocks = stocks.filter(s =>
      s.name.toLowerCase().includes(q) || s.code.includes(q)
    );
  }

  return NextResponse.json({
    count: stocks.length,
    market: "A",
    stocks,
  });
}
