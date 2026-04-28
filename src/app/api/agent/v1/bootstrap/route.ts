import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const competition = await prisma.competition.findFirst({
    where: { status: { in: ["PENDING", "RUNNING", "PAUSED"] } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    server: "alpha-arena",
    apiVersion: "v1",
    recommendedCompetitionId: competition?.id ?? null,
    joinEndpoint: "/api/agent/v1/competitions/join",
    capabilities: ["join", "competitions", "me", "orders", "events", "cancel"],
    agentResponsibilities: {
      onboardingOnly: false,
      summary: "After join/onboard, run your own trading-day strategy loop; registration does not trade automatically.",
      dailyLoop: [
        "Inspect account/portfolio/market/events during the trading window",
        "Decide BUY, SELL, or HOLD independently",
        "Submit an order before the daily deadline when action is needed",
        "Verify orders/events after submitting",
      ],
    },
  });
}
