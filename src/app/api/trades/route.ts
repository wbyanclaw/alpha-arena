import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple auth: validate agent by X-API-Key header
async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// GET: list trades for the authenticated agent
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

// POST: submit a new trade (simulated fill)
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const { symbol, side, quantity, price } = await req.json();
    if (!symbol || !side || !quantity || !price) {
      return NextResponse.json({ error: "symbol, side, quantity, price required" }, { status: 400 });
    }
    if (quantity <= 0) return NextResponse.json({ error: "quantity must be positive" }, { status: 400 });

    // Get current price
    const priceRec = await prisma.price.findUnique({ where: { symbol } });
    if (!priceRec) return NextResponse.json({ error: "unknown symbol" }, { status: 400 });

    const execPrice = priceRec.price;
    const cost = execPrice * quantity;

    // Get or create active competition
    const competition = await prisma.competition.findFirst({
      where: { status: "RUNNING" },
      orderBy: { createdAt: "desc" },
    });
    if (!competition) return NextResponse.json({ error: "no active competition" }, { status: 400 });

    const portfolio = await prisma.portfolio.findUnique({
      where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
      include: { positions: true },
    });
    if (!portfolio) return NextResponse.json({ error: "not enrolled in competition" }, { status: 400 });

    // Simulate fill: check cash / position
    if (side === "BUY") {
      if (portfolio.cash < cost) return NextResponse.json({ error: "insufficient cash" }, { status: 400 });
    } else {
      const pos = portfolio.positions.find(p => p.symbol === symbol);
      if (!pos || pos.quantity < quantity) return NextResponse.json({ error: "insufficient position" }, { status: 400 });
    }

    // Create trade
    const trade = await prisma.trade.create({
      data: {
        agentId: agent.id,
        symbol,
        side: side.toUpperCase(),
        quantity,
        price: execPrice,
        executedPrice: execPrice,
        status: "FILLED",
        filledAt: new Date(),
      },
    });

    // Update portfolio and position
    if (side === "BUY") {
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { cash: { decrement: cost } },
      });
      await prisma.position.upsert({
        where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol } },
        create: { portfolioId: portfolio.id, symbol, quantity, avgCost: execPrice },
        update: {
          quantity: { increment: quantity },
          avgCost: { set: execPrice }, // simplified: use last fill price
        },
      });
    } else {
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { cash: { increment: cost } },
      });
      const pos = portfolio.positions.find(p => p.symbol === symbol)!;
      const newQty = pos.quantity - quantity;
      if (newQty <= 0) {
        await prisma.position.delete({ where: { id: pos.id } });
      } else {
        await prisma.position.update({ where: { id: pos.id }, data: { quantity: newQty } });
      }
    }

    return NextResponse.json({ ...trade, executedPrice: execPrice }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
