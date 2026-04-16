import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// GET: 查询当日挂单
export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);

  const competition = await prisma.competition.findFirst({
    where: { status: "RUNNING" },
    orderBy: { createdAt: "desc" },
  });
  if (!competition) return NextResponse.json({ error: "no running competition" }, { status: 404 });

  const portfolio = await prisma.portfolio.findUnique({
    where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
  });
  if (!portfolio) return NextResponse.json({ error: "not enrolled" }, { status: 403 });

  const todayOrders = await prisma.order.findMany({
    where: { portfolioId: portfolio.id, submittedAt: { gte: todayStart, lte: todayEnd } },
    orderBy: { submittedAt: "desc" },
  });

  // 当日是否已有持仓（买入了）
  const todayFilledBuy = await prisma.trade.findFirst({
    where: {
      agentId: agent.id,
      side: "BUY",
      status: "FILLED",
      filledAt: { gte: todayStart, lte: todayEnd },
    },
  });

  return NextResponse.json({
    portfolioId: portfolio.id,
    competitionId: competition.id,
    today: todayStart.toISOString().slice(0, 10),
    orders: todayOrders,
    todayBought: todayFilledBuy ? { symbol: todayFilledBuy.symbol, price: todayFilledBuy.executedPrice } : null,
  });
}

// POST: 提交挂单（15:00 前可下，撤单后可重买，每天最多1次买入）
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const { symbol, side, quantity, note } = await req.json();

    if (!symbol || !side || !quantity) {
      return NextResponse.json({ error: "symbol, side, quantity required" }, { status: 400 });
    }
    const upperSide = side.toUpperCase();
    if (upperSide !== "BUY" && upperSide !== "SELL") {
      return NextResponse.json({ error: "side must be BUY or SELL" }, { status: 400 });
    }
    if (quantity <= 0 || quantity % 100 !== 0) {
      return NextResponse.json({ error: "quantity must be positive multiple of 100 (1手=100股)" }, { status: 400 });
    }

    const now = new Date();
    const competition = await prisma.competition.findFirst({
      where: { status: "RUNNING" },
      orderBy: { createdAt: "desc" },
    });
    if (!competition) return NextResponse.json({ error: "no running competition" }, { status: 404 });

    if (!competition.testMode) {
      const timeStr = now.toTimeString().slice(0, 8);
      const dayOfWeek = now.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return NextResponse.json({ error: "周末休市，请等待周一 09:30", code: "WEEKEND" }, { status: 400 });
      }
      if (timeStr >= "15:00:00") {
        return NextResponse.json({ error: "已过下单时间（15:00），当日无法再下单，请等待明日 09:30", code: "AFTER_DEADLINE" }, { status: 400 });
      }
    }

    const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now); todayEnd.setHours(23, 59, 59, 999);

    const portfolio = await prisma.portfolio.findUnique({
      where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
      include: { positions: true },
    });
    if (!portfolio) return NextResponse.json({ error: "未参加当前赛季" }, { status: 403 });

    // ── 卖出规则（无限制）──────────────────────────────
    if (upperSide === "SELL") {
      const pos = portfolio.positions.find(p => p.symbol === symbol);
      if (!pos || pos.quantity < quantity) {
        return NextResponse.json({
          error: `持仓不足：${symbol} 当前持仓 ${pos?.quantity ?? 0} 股，拟卖出 ${quantity} 股`,
          code: "INSUFFICIENT",
        }, { status: 400 });
      }
      const order = await prisma.order.create({
        data: {
          agentId: agent.id,
          competitionId: competition.id,
          portfolioId: portfolio.id,
          symbol,
          side: "SELL",
          quantity,
          note: note || null,
          status: "PENDING",
        },
      });
      return NextResponse.json({
        ...order,
        message: "卖出挂单已提交，将于今日收盘后以收盘价成交",
      }, { status: 201 });
    }

    // ── 买入规则（每天1次，撤单后可重买）─────────────
    // 检查今日是否已有成交的买单（含撤单后重买：需查 TRADE 历史，不查 PENDING order）
    const todayFilledBuy = await prisma.trade.findFirst({
      where: {
        agentId: agent.id,
        side: "BUY",
        status: "FILLED",
        filledAt: { gte: todayStart, lte: todayEnd },
      },
    });

    if (todayFilledBuy) {
      return NextResponse.json({
        error: `今日已买入：${todayFilledBuy.symbol}（${todayFilledBuy.quantity}股 @ ${todayFilledBuy.executedPrice}），每天最多买入1次，请明日再买`,
        code: "DAILY_BUY_LIMIT",
      }, { status: 400 });
    }

    // 最多1只持仓：新买必须先卖（可以加仓同一只）
    const existingPositions = portfolio.positions.filter(p => p.quantity > 0);
    if (existingPositions.length > 0) {
      const held = existingPositions[0];
      if (held.symbol !== symbol) {
        return NextResponse.json({
          error: `已有持仓 ${held.symbol}，需先卖出才能买入其他股票`,
          code: "POSITION_LIMIT",
        }, { status: 400 });
      }
      // 同品种：允许加仓（不进入这个分支）
    }

    // 通过所有校验，写入挂单
    const order = await prisma.order.create({
      data: {
        agentId: agent.id,
        competitionId: competition.id,
        portfolioId: portfolio.id,
        symbol,
        side: "BUY",
        quantity,
        note: note || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      ...order,
      message: "买入挂单已提交，将于今日收盘后以收盘价成交。15:00 前可撤销重新购买。",
    }, { status: 201 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// DELETE: 撤销当日挂单（15:00 前有效）
export async function DELETE(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const now = new Date();
  if (now.toTimeString().slice(0, 8) >= "15:00:00") {
    const comp = await prisma.competition.findFirst({ where: { status: "RUNNING" } });
    if (!comp?.testMode) {
      return NextResponse.json({ error: "15:00 后无法撤销挂单", code: "AFTER_DEADLINE" }, { status: 400 });
    }
  }

  const orderId = req.nextUrl.searchParams.get("orderId");
  if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (order.agentId !== agent.id) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (order.status !== "PENDING") return NextResponse.json({ error: "order already processed" }, { status: 400 });

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });

  return NextResponse.json({ message: "挂单已撤销，当日可重新提交新的买入挂单" });
}
