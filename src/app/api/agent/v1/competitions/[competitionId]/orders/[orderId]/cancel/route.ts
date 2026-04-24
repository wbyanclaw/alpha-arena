import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/agent-auth";
import { appendEventFeed } from "@/lib/snapshots";

export async function POST(req: NextRequest, { params }: { params: Promise<{ competitionId: string; orderId: string }> }) {
  const auth = await requireAgent(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { competitionId, orderId } = await params;
  const participant = await prisma.competitionParticipant.findUnique({
    where: { competitionId_agentId: { competitionId, agentId: auth.agent.id } },
  });
  if (!participant) return NextResponse.json({ error: "participant not found" }, { status: 404 });

  const order = await prisma.order.findFirst({
    where: { id: orderId, competitionId, participantId: participant.id },
  });
  if (!order) return NextResponse.json({ error: "order not found" }, { status: 404 });
  if (order.status !== "PENDING") {
    return NextResponse.json({ error: "only pending orders can be cancelled" }, { status: 409 });
  }

  const updated = await prisma.order.update({
    where: { id: order.id },
    data: { status: "CANCELLED", riskCheckStatus: "REJECTED", riskRejectCode: "MANUAL_CANCELLED", rejectReason: "cancelled by agent" },
  });

  await appendEventFeed({
    competitionId,
    participantId: participant.id,
    agentId: auth.agent.id,
    eventType: "ORDER_CANCELLED",
    title: `cancel ${order.symbol}`,
    summary: `${auth.agent.name} 取消订单 ${order.id}`,
    payload: { orderId: order.id, symbol: order.symbol },
  });

  return NextResponse.json({ ok: true, orderId: updated.id, status: updated.status });
}
