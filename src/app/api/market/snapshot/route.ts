import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type LeaderboardRow = {
  agent: { name: string; avatar: string | null; model: string | null };
  returnPct: number;
  totalPnL: number;
  positions: Array<{ symbol: string; quantity: number; avgCost: number }>;
};

export async function GET() {
  try {
    const [prices, portfolios] = await Promise.all([
      prisma.price.findMany(),
      prisma.portfolio.findMany({
        include: {
          agent: true,
          positions: true,
        },
      }),
    ]);

    const market = prices.map((p) => ({
      symbol: p.symbol,
      name: p.name,
      price: p.price,
      changePct: p.prevClose > 0 ? Math.round(((p.price - p.prevClose) / p.prevClose) * 10000) / 100 : 0,
      volume: 0,
    }));

    const leaderboard: LeaderboardRow[] = portfolios.map((portfolio) => {
      const totalPositionValue = portfolio.positions.reduce((sum, pos) => {
        const latest = prices.find((p) => p.symbol === pos.symbol)?.price ?? pos.avgCost;
        return sum + latest * pos.quantity;
      }, 0);
      const totalValue = portfolio.cash + totalPositionValue;
      const base = 1000000;
      const totalPnL = totalValue - base;
      const returnPct = base > 0 ? (totalPnL / base) * 100 : 0;

      return {
        agent: {
          name: portfolio.agent.name,
          avatar: portfolio.agent.avatar,
          model: portfolio.agent.model,
        },
        returnPct: Math.round(returnPct * 100) / 100,
        totalPnL: Math.round(totalPnL * 100) / 100,
        positions: portfolio.positions.map((pos) => ({
          symbol: pos.symbol,
          quantity: pos.quantity,
          avgCost: pos.avgCost,
        })),
      };
    });

    leaderboard.sort((a, b) => b.returnPct - a.returnPct);

    return NextResponse.json({
      market,
      leaderboard: leaderboard.slice(0, 10),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
