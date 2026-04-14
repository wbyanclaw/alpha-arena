import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/match
 * 收盘撮合：将所有 PENDING 挂单以今日收盘价统一成交
 * 建议 cron: 15:05 执行
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

  try {
    const pendingOrders = await prisma.order.findMany({
      where: { status: "PENDING" },
    });

    if (pendingOrders.length === 0) {
      return NextResponse.json({ message: "no pending orders", matched: 0 });
    }

    const symbols = [...new Set(pendingOrders.map(o => o.symbol))];
    const prices = await prisma.price.findMany({ where: { symbol: { in: symbols } } });
    const priceMap = new Map(prices.map(p => [p.symbol, p]));

    let matched = 0, failed = 0;

    for (const order of pendingOrders) {
      const priceRec = priceMap.get(order.symbol);
      const closePrice = priceRec?.price;

      if (!closePrice || closePrice <= 0) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "REJECTED", rejectReason: `行情缺失：${order.symbol}` },
        });
        failed++;
        continue;
      }

      const execPrice = closePrice;
      const portfolio = await prisma.portfolio.findUnique({
        where: { id: order.portfolioId },
        include: { positions: true },
      });
      if (!portfolio) { failed++; continue; }

      const amount = execPrice * order.quantity;
      const commission = Math.max(amount * 0.0003, 5);
      const transferFee = amount * 0.00001;
      const stampTax = order.side === "SELL" ? amount * 0.0005 : 0;
      const totalCost = order.side === "BUY"
        ? amount + commission + transferFee
        : amount - commission - stampTax - transferFee;

      if (order.side === "BUY") {
        if (portfolio.cash < totalCost) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "REJECTED", rejectReason: `现金不足：需要${totalCost.toFixed(2)}，可用${portfolio.cash.toFixed(2)}` },
          });
          failed++; continue;
        }

        await prisma.$transaction([
          prisma.trade.create({
            data: {
              agentId: order.agentId, symbol: order.symbol, side: "BUY",
              quantity: order.quantity, price: execPrice, executedPrice: execPrice,
              status: "FILLED", filledAt: now, note: order.note ?? undefined,
              commission, transferFee, netAmount: -totalCost,
            },
          }),
          prisma.portfolio.update({
            where: { id: portfolio.id },
            data: { cash: { decrement: totalCost } },
          }),
          prisma.order.update({
            where: { id: order.id },
            data: { status: "MATCHED", matchedAt: now },
          }),
        ]);

        const existingPos = portfolio.positions.find(p => p.symbol === order.symbol);
        if (existingPos) {
          const newQty = existingPos.quantity + order.quantity;
          const newAvgCost = (existingPos.avgCost * existingPos.quantity + execPrice * order.quantity) / newQty;
          await prisma.position.update({ where: { id: existingPos.id }, data: { quantity: newQty, avgCost: newAvgCost } });
        } else {
          await prisma.position.create({
            data: { portfolioId: portfolio.id, symbol: order.symbol, quantity: order.quantity, avgCost: execPrice },
          });
        }

      } else {
        const pos = portfolio.positions.find(p => p.symbol === order.symbol);
        if (!pos || pos.quantity < order.quantity) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "REJECTED", rejectReason: `持仓不足：${pos?.quantity ?? 0}股` },
          });
          failed++; continue;
        }

        await prisma.$transaction([
          prisma.trade.create({
            data: {
              agentId: order.agentId, symbol: order.symbol, side: "SELL",
              quantity: order.quantity, price: execPrice, executedPrice: execPrice,
              status: "FILLED", filledAt: now, note: order.note ?? undefined,
              commission, stampTax, transferFee, netAmount: totalCost,
            },
          }),
          prisma.portfolio.update({
            where: { id: portfolio.id },
            data: { cash: { increment: totalCost } },
          }),
          prisma.order.update({
            where: { id: order.id },
            data: { status: "MATCHED", matchedAt: now },
          }),
        ]);

        const newQty = pos.quantity - order.quantity;
        if (newQty <= 0) {
          await prisma.position.delete({ where: { id: pos.id } });
        } else {
          await prisma.position.update({ where: { id: pos.id }, data: { quantity: newQty } });
        }
      }

      matched++;
    }

    // 更新所有组合总价值和结算快照
    const allPortfolios = await prisma.portfolio.findMany({ include: { positions: true } });
    const allPrices = await prisma.price.findMany();
    const priceMap2 = new Map(allPrices.map(p => [p.symbol, p]));

    for (const p of allPortfolios) {
      const totalValue = p.cash + p.positions.reduce((sum, pos) => {
        const px = priceMap2.get(pos.symbol)?.price ?? pos.avgCost;
        return sum + px * pos.quantity;
      }, 0);

      const heldPosition = p.positions[0] ?? null;
      const posDays = heldPosition
        ? Math.floor((now.getTime() - new Date(heldPosition.boughtAt).getTime()) / 86400000)
        : 0;

      const comp = await prisma.competition.findUnique({ where: { id: p.competitionId } });
      const initCash = comp?.initialCash ?? 1000000;

      await prisma.portfolio.update({ where: { id: p.id }, data: { totalValue } });

      await prisma.dailySettlement.upsert({
        where: { portfolioId_date: { portfolioId: p.id, date: dateStr } },
        create: {
          portfolioId: p.id, date: dateStr, cash: p.cash,
          positionJson: heldPosition ? JSON.stringify({ symbol: heldPosition.symbol, quantity: heldPosition.quantity, avgCost: heldPosition.avgCost }) : null,
          positionDays: posDays, totalValue, returnPct: ((totalValue / initCash) - 1) * 100,
        },
        update: {
          cash: p.cash,
          positionJson: heldPosition ? JSON.stringify({ symbol: heldPosition.symbol, quantity: heldPosition.quantity, avgCost: heldPosition.avgCost }) : null,
          positionDays: posDays, totalValue, returnPct: ((totalValue / initCash) - 1) * 100,
        },
      });
    }

    return NextResponse.json({ success: true, date: dateStr, matched, failed, total: pendingOrders.length, refreshedAt: now.toISOString() });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
