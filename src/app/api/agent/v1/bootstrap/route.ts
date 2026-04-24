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
  });
}
