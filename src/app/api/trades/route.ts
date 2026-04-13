import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  validateTradingHours,
  validateLotSize,
  validatePriceLimit,
  validateT1,
  calcTradeCost,
  validateSingleStock,
  validateDailyBuy,
} from "@/lib/trading-rules";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// GET: 查询成交记录
export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const symbol = req.nextUrl.searchParams.get("symbol");
  const trades = await prisma.trade.findMany({
    where: { agentId: agent.id, ...(symbol ? { symbol } : {}) },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(trades);
}

// POST: 提交买卖订单（竞技场 A 股规则：单股持仓 + 每日最多买1次）
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const { symbol, side, quantity, price } = await req.json();

    // ---- 基础参数校验 ----
    if (!symbol || !side || !quantity || !price) {
      return NextResponse.json({ error: "symbol, side, quantity, price 均必填" }, { status: 400 });
    }
    const upperSide = side.toUpperCase();
    if (upperSide !== "BUY" && upperSide !== "SELL") {
      return NextResponse.json({ error: "side 必须是 BUY 或 SELL" }, { status: 400 });
    }
    if (quantity <= 0) {
      return NextResponse.json({ error: "quantity 必须为正" }, { status: 400 });
    }

    const now = new Date();

    // ---- 1. 交易时间校验 ----
    const hourCheck = validateTradingHours(now);
    if (!hourCheck.valid) {
      return NextResponse.json({ error: hourCheck.error, code: hourCheck.code }, { status: 400 });
    }

    // ---- 2. 手数校验（1手=100股）----
    const lotCheck = validateLotSize(Number(quantity));
    if (!lotCheck.valid) {
      return NextResponse.json({ error: lotCheck.error, code: lotCheck.code }, { status: 400 });
    }

    // ---- 3. 获取行情数据 ----
    const priceRec = await prisma.price.findUnique({ where: { symbol } });
    if (!priceRec || priceRec.price <= 0) {
      return NextResponse.json({ error: "行情数据不存在或价格异常" }, { status: 400 });
    }

    // ---- 4. 涨跌停板校验 ----
    const limitCheck = validatePriceLimit(symbol, Number(price), priceRec.prevClose);
    if (!limitCheck.valid) {
      return NextResponse.json({ error: limitCheck.error, code: limitCheck.code }, { status: 400 });
    }

    // ---- 5. 获取当前赛季 ----
    const competition = await prisma.competition.findFirst({
      where: { status: "RUNNING" },
      orderBy: { createdAt: "desc" },
    });
    if (!competition) {
      return NextResponse.json({ error: "当前无进行中的赛季" }, { status: 400 });
    }

    // ---- 6. 获取持仓信息 ----
    const portfolio = await prisma.portfolio.findUnique({
      where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
      include: { positions: true },
    });
    if (!portfolio) {
      return NextResponse.json({ error: "未参加当前赛季" }, { status: 400 });
    }

    // ---- 7. BUY 专属规则：单股持仓校验（同时最多1只）----
    if (upperSide === "BUY") {
      const singleCheck = validateSingleStock(portfolio.positions, symbol);
      if (!singleCheck.valid) {
        return NextResponse.json({ error: singleCheck.error, code: singleCheck.code }, { status: 400 });
      }
    }

    // ---- 8. BUY 专属规则：每日买入次数校验（每天最多1次）----
    if (upperSide === "BUY") {
      const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date(now); todayEnd.setHours(23, 59, 59, 999);
      const todayBuyCount = await prisma.trade.count({
        where: {
          agentId: agent.id,
          side: "BUY",
          status: "FILLED",
          filledAt: { gte: todayStart, lte: todayEnd },
        },
      });
      const dailyCheck = validateDailyBuy(todayBuyCount);
      if (!dailyCheck.valid) {
        return NextResponse.json({ error: dailyCheck.error, code: dailyCheck.code }, { status: 400 });
      }
    }

    // ---- 9. T+1 校验（仅卖出）----
    if (upperSide === "SELL") {
      const t1Check = validateT1(portfolio.positions, symbol, now);
      if (!t1Check.valid) {
        return NextResponse.json({ error: t1Check.error, code: t1Check.code }, { status: 400 });
      }
      const pos = portfolio.positions.find(p => p.symbol === symbol);
      if (!pos || pos.quantity < Number(quantity)) {
        return NextResponse.json({ error: "持仓不足" }, { status: 400 });
      }
    }

    // ---- 10. 资金充足性校验（仅买）----
    const execPrice = Number(price);
    const cost = calcTradeCost(upperSide, execPrice, Number(quantity));

    if (upperSide === "BUY") {
      const totalCost = execPrice * Number(quantity) + cost.totalCost;
      if (portfolio.cash < totalCost) {
        return NextResponse.json({
          error: `现金不足。需要 ${totalCost.toFixed(2)} 元（含费用 ${cost.totalCost.toFixed(2)} 元），实际可用 ${portfolio.cash.toFixed(2)} 元`,
        }, { status: 400 });
      }
    }

    // ---- 11. 成交 ----
    const trade = await prisma.trade.create({
      data: {
        agentId: agent.id,
        symbol,
        side: upperSide as "BUY" | "SELL",
        quantity: Number(quantity),
        price: execPrice,
        executedPrice: execPrice,
        status: "FILLED",
        filledAt: now,
        commission: cost.commission,
        stampTax: cost.stampTax,
        transferFee: cost.transferFee,
        netAmount: upperSide === "BUY"
          ? -(execPrice * Number(quantity) + cost.totalCost)
          : (execPrice * Number(quantity) - cost.totalCost),
      },
    });

    // ---- 12. 更新持仓与现金 ----
    if (upperSide === "BUY") {
      const buyCost = execPrice * Number(quantity);
      const totalBuyCost = buyCost + cost.totalCost;
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { cash: { decrement: totalBuyCost } },
      });
      const existing = portfolio.positions.find(p => p.symbol === symbol);
      if (existing) {
        const newQty = existing.quantity + Number(quantity);
        const newAvgCost = (existing.avgCost * existing.quantity + buyCost) / newQty;
        await prisma.position.update({
          where: { id: existing.id },
          data: { quantity: newQty, avgCost: newAvgCost },
        });
      } else {
        await prisma.position.create({
          data: {
            portfolioId: portfolio.id,
            symbol,
            quantity: Number(quantity),
            avgCost: execPrice,
          },
        });
      }

      // ---- 13. 写入交割单（每天每个龙虾只记最新1条）----
      const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date(now); todayEnd.setHours(23, 59, 59, 999);
      const existingDelivery = await prisma.delivery.findFirst({
        where: {
          lobsterId: agent.id,
          deliveredAt: { gte: todayStart, lte: todayEnd },
        },
      });
      if (existingDelivery) {
        await prisma.delivery.update({
          where: { id: existingDelivery.id },
          data: {
            symbol,
            side: "BUY",
            quantity: Number(quantity),
            price: execPrice,
            deliveredAt: now,
            note: `替代早前 ${existingDelivery.symbol}（${existingDelivery.quantity}股 @ ${existingDelivery.price}）`,
          },
        });
      } else {
        await prisma.delivery.create({
          data: {
            lobsterId: agent.id,
            symbol,
            side: "BUY",
            quantity: Number(quantity),
            price: execPrice,
            deliveredAt: now,
          },
        });
      }
    } else {
      // SELL：收回资金，扣减持仓
      const sellRevenue = execPrice * Number(quantity) - cost.totalCost;
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { cash: { increment: sellRevenue } },
      });
      const pos = portfolio.positions.find(p => p.symbol === symbol)!;
      const newQty = pos.quantity - Number(quantity);
      if (newQty <= 0) {
        await prisma.position.delete({ where: { id: pos.id } });
      } else {
        await prisma.position.update({
          where: { id: pos.id },
          data: { quantity: newQty },
        });
      }

      // ---- 13. SELL 也写入交割单 ----
      const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date(now); todayEnd.setHours(23, 59, 59, 999);
      const existingDelivery = await prisma.delivery.findFirst({
        where: {
          lobsterId: agent.id,
          deliveredAt: { gte: todayStart, lte: todayEnd },
        },
      });
      if (existingDelivery) {
        await prisma.delivery.update({
          where: { id: existingDelivery.id },
          data: {
            symbol,
            side: "SELL",
            quantity: Number(quantity),
            price: execPrice,
            deliveredAt: now,
            note: `卖出替代 ${existingDelivery.symbol}`,
          },
        });
      } else {
        await prisma.delivery.create({
          data: {
            lobsterId: agent.id,
            symbol,
            side: "SELL",
            quantity: Number(quantity),
            price: execPrice,
            deliveredAt: now,
          },
        });
      }
    }

    return NextResponse.json({
      ...trade,
      fees: {
        commission: cost.commission,
        stampTax: cost.stampTax,
        transferFee: cost.transferFee,
        total: cost.totalCost,
      },
    }, { status: 201 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
