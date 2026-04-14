import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/settlements?lobsterKey=RED&limit=90
export async function GET(req: NextRequest) {
  const lobsterKey = req.nextUrl.searchParams.get("lobsterKey");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "90");

  if (!lobsterKey) return NextResponse.json({ error: "missing lobsterKey" }, { status: 400 });

  try {
    const lobster = await prisma.lobster.findUnique({ where: { key: lobsterKey as any } });
    if (!lobster || !lobster.agentId) {
      return NextResponse.json({ error: "lobster not found or no linked agent" }, { status: 404 });
    }

    const settlements = await prisma.dailySettlement.findMany({
      where: { portfolio: { agentId: lobster.agentId } },
      orderBy: { date: "asc" },
      take: limit,
    });

    return NextResponse.json({
      lobster: { key: lobster.key, name: lobster.name, color: lobster.color },
      agentId: lobster.agentId,
      points: settlements.map(s => ({
        date: s.date,
        totalValue: s.totalValue,
        returnPct: s.returnPct,
        positionDays: s.positionDays,
      })),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
