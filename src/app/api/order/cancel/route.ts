import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// POST /api/order/cancel — 撤单
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { tradeId } = await req.json();
  if (!tradeId) return NextResponse.json({ error: "tradeId 必填" }, { status: 400 });

  const trade = await prisma.trade.findUnique({ where: { id: tradeId } });
  if (!trade) return NextResponse.json({ error: "订单不存在" }, { status: 404 });
  if (trade.agentId !== agent.id) return NextResponse.json({ error: "无权操作此订单" }, { status: 403 });
  if (trade.status !== "PENDING") {
    return NextResponse.json({ error: `只能撤 pending 订单，当前状态：${trade.status}` }, { status: 400 });
  }

  const updated = await prisma.trade.update({
    where: { id: tradeId },
    data: { status: "CANCELLED", note: `撤单于 ${new Date().toISOString()}` },
  });

  return NextResponse.json({ success: true, trade: updated });
}
