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
      include: { competition: true },
    });

    if (pendingOrders.length === 0) {
      return NextResponse.json({ success: true, message: "no pending orders", matched: 0, failed: 0, total: 0 });
    }

    const symbols = [...new Set(pendingOrders.map((o) => o.symbol))];
    const prices = await prisma.price.findMany({ where: { symbol: { in: symbols } } });
    const priceMap = new Map(prices.map((p) => [p.symbol, p.price]));

    let matched = 0;
    let failed = 0;
    const touchedPortfolioIds = new Set<string>();

    for (const order of pendingOrders) {
      const closePrice = priceMap.get(order.symbol);
      if (!closePrice || closePrice <= 0) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "REJECTED", rejectReason: `行情缺失：${order.symbol}` },
        });
        failed += 1;
        continue;
      }

      const result = await prisma.$transaction(async (tx) => {
        const portfolio = await tx.portfolio.findUnique({
          where: { id: order.portfolioId },
          include: { positions: true },
        });
        if (!portfolio) {
          await tx.order.update({
            where: { id: order.id },
            data: { status: "REJECTED", rejectReason: "组合不存在" },
          });
          return { ok: false as const };
        }

        const amount = closePrice * order.quantity;
        const commission = Math.max(amount * 0.0003, 5);
        const transferFee = amount * 0.00001;
        const stampTax = order.side === "SELL" ? amount * 0.0005 : 0;
        const cashDelta = order.side === "BUY"
          ? -(amount + commission + transferFee)
          : amount - commission - stampTax - transferFee;

        if (order.side === "BUY") {
          const requiredCash = amount + commission + transferFee;
          if (portfolio.cash < requiredCash) {
            await tx.order.update({
              where: { id: order.id },
              data: { status: "REJECTED", rejectReason: `现金不足：需要${requiredCash.toFixed(2)}，可用${portfolio.cash.toFixed(2)}` },
            });
            return { ok: false as const };
          }

          const existingPos = portfolio.positions.find((p) => p.symbol === order.symbol);
          if (existingPos) {
            const newQty = existingPos.quantity + order.quantity;
            const newAvgCost = (existingPos.avgCost * existingPos.quantity + closePrice * order.quantity) / newQty;
            await tx.position.update({
              where: { id: existingPos.id },
              data: { quantity: newQty, avgCost: newAvgCost, currentPrice: closePrice },
            });
          } else {
            await tx.position.create({
              data: {
                portfolioId: portfolio.id,
                symbol: order.symbol,
                quantity: order.quantity,
                avgCost: closePrice,
                currentPrice: closePrice,
                boughtAt: now,
              },
            });
          }
        } else {
          const pos = portfolio.positions.find((p) => p.symbol === order.symbol);
          if (!pos || pos.quantity < order.quantity) {
            await tx.order.update({
              where: { id: order.id },
              data: { status: "REJECTED", rejectReason: `持仓不足：${pos?.quantity ?? 0}股` },
            });
            return { ok: false as const };
          }

          const newQty = pos.quantity - order.quantity;
          if (newQty <= 0) {
            await tx.position.delete({ where: { id: pos.id } });
          } else {
            await tx.position.update({
              where: { id: pos.id },
              data: { quantity: newQty, currentPrice: closePrice },
            });
          }
        }

        await tx.trade.create({
          data: {
            agentId: order.agentId,
            symbol: order.symbol,
            side: order.side,
            quantity: order.quantity,
            price: closePrice,
            executedPrice: closePrice,
            status: "FILLED",
            filledAt: now,
            note: order.note ?? undefined,
            commission,
            stampTax,
            transferFee,
            netAmount: cashDelta,
          },
        });

        await tx.delivery.create({
          data: {
            agentId: order.agentId,
            symbol: order.symbol,
            side: order.side,
            quantity: order.quantity,
            price: closePrice,
            deliveredAt: now,
            note: order.note ?? undefined,
          },
        });

        await tx.portfolio.update({
          where: { id: portfolio.id },
          data: { cash: { increment: cashDelta } },
        });

        const refreshedPortfolio = await tx.portfolio.findUnique({
          where: { id: portfolio.id },
          include: { positions: true },
        });
        const latestSymbols = refreshedPortfolio?.positions.map((p) => p.symbol) ?? [];
        const latestPrices = latestSymbols.length > 0
          ? await tx.price.findMany({ where: { symbol: { in: latestSymbols } } })
          : [];
        const latestPriceMap = new Map(latestPrices.map((p) => [p.symbol, p.price]));
        const totalValue = (refreshedPortfolio?.cash ?? portfolio.cash + cashDelta) + (refreshedPortfolio?.positions ?? []).reduce((sum, pos) => {
          const px = latestPriceMap.get(pos.symbol) ?? pos.avgCost;
          return sum + px * pos.quantity;
        }, 0);
        const heldPosition = refreshedPortfolio?.positions[0] ?? null;
        const positionDays = heldPosition
          ? Math.floor((now.getTime() - new Date(heldPosition.boughtAt).getTime()) / 86400000)
          : 0;
        const initialCash = order.competition.initialCash ?? 1000000;

        await tx.portfolio.update({
          where: { id: portfolio.id },
          data: { totalValue },
        });

        await tx.dailySettlement.upsert({
          where: { portfolioId_date: { portfolioId: portfolio.id, date: dateStr } },
          create: {
            portfolioId: portfolio.id,
            date: dateStr,
            cash: refreshedPortfolio?.cash ?? portfolio.cash + cashDelta,
            positionJson: heldPosition
              ? JSON.stringify({ symbol: heldPosition.symbol, quantity: heldPosition.quantity, avgCost: heldPosition.avgCost })
              : null,
            positionDays,
            totalValue,
            returnPct: ((totalValue / initialCash) - 1) * 100,
          },
          update: {
            cash: refreshedPortfolio?.cash ?? portfolio.cash + cashDelta,
            positionJson: heldPosition
              ? JSON.stringify({ symbol: heldPosition.symbol, quantity: heldPosition.quantity, avgCost: heldPosition.avgCost })
              : null,
            positionDays,
            totalValue,
            returnPct: ((totalValue / initialCash) - 1) * 100,
          },
        });

        await tx.order.update({
          where: { id: order.id },
          data: { status: "MATCHED", matchedAt: now, rejectReason: null },
        });

        return { ok: true as const, portfolioId: portfolio.id };
      });

      if (result.ok) {
        matched += 1;
        touchedPortfolioIds.add(result.portfolioId);
      } else {
        failed += 1;
      }
    }

    return NextResponse.json({
      success: true,
      date: dateStr,
      matched,
      failed,
      total: pendingOrders.length,
      portfoliosUpdated: touchedPortfolioIds.size,
      refreshedAt: now.toISOString(),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
