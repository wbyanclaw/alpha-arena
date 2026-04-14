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

  const today = new Date().toISOString().slice(0, 10);

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
    where: {
      portfolioId: portfolio.id,
      submittedAt: {
        gte: new Date(today + "T00:00:00"),
        lt: new Date(today + "T23:59:59"),
      },
    },
    orderBy: { submittedAt: "desc" },
  });

  return NextResponse.json({
    portfolioId: portfolio.id,
    competitionId: competition.id,
    today,
    orders: todayOrders,
  });
}

// POST: 提交挂单（盘后成交）
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
    if (quantity <= 0) {
      return NextResponse.json({ error: "quantity must be positive" }, { status: 400 });
    }
    if (quantity % 100 !== 0) {
      return NextResponse.json({ error: "quantity must be multiple of 100 (1手)" }, { status: 400 });
    }

    // 验证是否在交易时间外（盘后下单）
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 8);
    const MORNING_START = "09:30:00", MORNING_END = "11:30:00";
    const AFTERNOON_START = "13:00:00", AFTERNOON_END = "15:00:00";
    const isDuringTradingHours =
      (timeStr >= MORNING_START && timeStr <= MORNING_END) ||
      (timeStr >= AFTERNOON_START && timeStr <= AFTERNOON_END);

    if (isDuringTradingHours) {
      return NextResponse.json({
        error: "盘后下单规则：请在 15:00 后下单，收盘价统一成交",
        code: "DURING_TRADING_HOURS",
      }, { status: 400 });
    }

    // 找当前比赛
    const competition = await prisma.competition.findFirst({
      where: { status: "RUNNING" },
      orderBy: { createdAt: "desc" },
    });
    if (!competition) return NextResponse.json({ error: "no running competition" }, { status: 404 });

    // 找持仓
    const portfolio = await prisma.portfolio.findUnique({
      where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
      include: { positions: true },
    });
    if (!portfolio) return NextResponse.json({ error: "not enrolled" }, { status: 403 });

    // 检查当天是否已有挂单
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);
    const existingOrder = await prisma.order.findFirst({
      where: { portfolioId: portfolio.id, submittedAt: { gte: todayStart, lte: todayEnd }, status: "PENDING" },
    });
    if (existingOrder) {
      return NextResponse.json({
        error: `今日已有挂单：${existingOrder.side} ${existingOrder.symbol} ${existingOrder.quantity}手，请先取消后再提交`,
        code: "DAILY_ORDER_EXISTS",
      }, { status: 409 });
    }

    // SELL 校验：检查是否有持仓
    if (upperSide === "SELL") {
      const pos = portfolio.positions.find(p => p.symbol === symbol);
      if (!pos || pos.quantity < quantity) {
        return NextResponse.json({
          error: `持仓不足。当前${symbol}持仓${pos?.quantity ?? 0}股，拟卖出${quantity}股`,
          code: "INSUFFICIENT_POSITION",
        }, { status: 400 });
      }
    }

    // BUY 校验：检查是否已有持仓（非卖同一只则拒绝）
    if (upperSide === "BUY") {
      const existingPositions = portfolio.positions.filter(p => p.quantity > 0);
      if (existingPositions.length > 0) {
        const held = existingPositions[0];
        if (held.symbol !== symbol) {
          return NextResponse.json({
            error: `单股规则：当前已持仓 ${held.symbol}，每天只能买一只股票`,
            code: "SINGLE_STOCK_VIOLATION",
          }, { status: 400 });
        }
      }
    }

    // 写入挂单
    const order = await prisma.order.create({
      data: {
        agentId: agent.id,
        competitionId: competition.id,
        portfolioId: portfolio.id,
        symbol,
        side: upperSide as "BUY" | "SELL",
        quantity,
        note: note || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      ...order,
      message: "挂单已提交，将于今日收盘后以收盘价统一成交",
    }, { status: 201 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// DELETE: 取消当日挂单
export async function DELETE(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const orderId = req.nextUrl.searchParams.get("orderId");
  if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ error: "order not found" }, { status: 404 });
  if (order.agentId !== agent.id) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (order.status !== "PENDING") return NextResponse.json({ error: "order already processed" }, { status: 400 });

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });

  return NextResponse.json({ message: "挂单已取消" });
}
