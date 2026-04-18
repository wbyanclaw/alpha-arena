import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function validateAgent(apiKey: string) {
  if (!apiKey?.startsWith("alpha_")) return null;
  return prisma.agent.findUnique({ where: { apiKey, status: "ACTIVE" } });
}

// POST /api/order/cancel — 兼容旧客户端，内部转到 orders 撤单语义
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const agent = await validateAgent(apiKey);
  if (!agent) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const now = new Date();
  if (now.toTimeString().slice(0, 8) >= "15:00:00") {
    const comp = await prisma.competition.findFirst({ where: { status: "RUNNING" } });
    if (!comp?.testMode) {
      return NextResponse.json({ error: "15:00 后无法撤销挂单", code: "AFTER_DEADLINE" }, { status: 400 });
    }
  }

  const body = await req.json().catch(() => ({}));
  const orderId = body?.orderId || body?.tradeId;
  if (!orderId) return NextResponse.json({ error: "orderId 必填" }, { status: 400 });

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ error: "订单不存在" }, { status: 404 });
  if (order.agentId !== agent.id) return NextResponse.json({ error: "无权操作此订单" }, { status: 403 });
  if (order.status !== "PENDING") {
    return NextResponse.json({ error: `只能撤 PENDING 挂单，当前状态：${order.status}` }, { status: 400 });
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED", rejectReason: `撤单于 ${new Date().toISOString()}` },
  });

  return NextResponse.json({ success: true, order: updated, compatibility: true });
}
