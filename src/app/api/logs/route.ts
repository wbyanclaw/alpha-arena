import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LobsterKey } from "@/generated/prisma";

export async function GET(req: NextRequest) {
  const lobsterKey = req.nextUrl.searchParams.get("lobsterKey");
  if (!lobsterKey) return NextResponse.json({ error: "missing lobsterKey" }, { status: 400 });
  if (!(lobsterKey in LobsterKey)) return NextResponse.json({ error: "invalid lobsterKey" }, { status: 400 });

  try {
    const lobster = await prisma.lobster.findUnique({ where: { key: LobsterKey[lobsterKey as keyof typeof LobsterKey] } });
    if (!lobster) return NextResponse.json({ error: "not found" }, { status: 404 });
    const logs = await prisma.logEntry.findMany({
      where: { lobsterId: lobster.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(logs);
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
