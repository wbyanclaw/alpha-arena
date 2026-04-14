import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// GET: 持仓明细
export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const competitionId = req.nextUrl.searchParams.get("competitionId");
  const competition = competitionId
    ? await prisma.competition.findUnique({ where: { id: competitionId } })
    : await prisma.competition.findFirst({ where: { status: "RUNNING" }, orderBy: { createdAt: "desc" } });

  if (!competition) return NextResponse.json({ error: "no competition found" }, { status: 404 });

  const portfolio = await prisma.portfolio.findUnique({
    where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
    include: { positions: true },
  });
  if (!portfolio) return NextResponse.json({ error: "not enrolled" }, { status: 404 });

  // 当日挂单
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);
  const todayOrder = await prisma.order.findFirst({
    where: { portfolioId: portfolio.id, submittedAt: { gte: todayStart, lte: todayEnd } },
    orderBy: { submittedAt: "desc" },
  });

  // 最新结算快照
  const latestSettlement = await prisma.dailySettlement.findFirst({
    where: { portfolioId: portfolio.id },
    orderBy: { date: "desc" },
  });

  // 持仓 enriched with 当前价
  const positionsWithPnl = await Promise.all(
    portfolio.positions.map(async (pos) => {
      const priceRec = await prisma.price.findUnique({ where: { symbol: pos.symbol } });
      const currentPrice = priceRec?.price ?? pos.avgCost;
      const pnl = (currentPrice - pos.avgCost) * pos.quantity;
      const pnlPct = pos.avgCost > 0 ? (pnl / (pos.avgCost * pos.quantity)) * 100 : 0;
      const heldDays = Math.floor((Date.now() - new Date(pos.boughtAt).getTime()) / 86400000);
      return {
        ...pos,
        currentPrice,
        pnl: Math.round(pnl * 100) / 100,
        pnlPct: Math.round(pnlPct * 100) / 100,
        heldDays,
      };
    })
  );

  const unrealizedPnL = positionsWithPnl.reduce((sum, p) => sum + p.pnl, 0);
  const totalValue = portfolio.cash + positionsWithPnl.reduce((sum, p) => sum + p.currentPrice * p.quantity, 0);

  return NextResponse.json({
    ...portfolio,
    positions: positionsWithPnl,
    unrealizedPnL: Math.round(unrealizedPnL * 100) / 100,
    totalValue: Math.round(totalValue * 100) / 100,
    todayOrder: todayOrder ? {
      symbol: todayOrder.symbol,
      side: todayOrder.side,
      quantity: todayOrder.quantity,
      note: todayOrder.note,
      status: todayOrder.status,
      submittedAt: todayOrder.submittedAt,
    } : null,
    latestSettlement: latestSettlement ? {
      date: latestSettlement.date,
      returnPct: latestSettlement.returnPct,
      positionDays: latestSettlement.positionDays,
    } : null,
  });
}
