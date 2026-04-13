import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// GET /api/orders — 查询所有订单（含pending）
export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const status = req.nextUrl.searchParams.get("status");
  const symbol = req.nextUrl.searchParams.get("symbol");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50");

  const competition = await prisma.competition.findFirst({
    where: { status: "RUNNING" },
    orderBy: { createdAt: "desc" },
  });

  const where: any = { agentId: agent.id };
  if (status) where.status = status;
  if (symbol) where.symbol = symbol;

  const orders = await prisma.trade.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json({
    competitionId: competition?.id,
    competitionStatus: competition?.status,
    count: orders.length,
    orders,
  });
}
