import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const lobsterKey = req.nextUrl.searchParams.get("lobsterKey");
  if (!lobsterKey) return NextResponse.json({ error: "missing lobsterKey" }, { status: 400 });
  try {
    const lobster = await prisma.lobster.findUnique({ where: { key: lobsterKey as any } });
    if (!lobster) return NextResponse.json({ error: "not found" }, { status: 404 });
    const comments = await prisma.comment.findMany({
      where: { lobsterId: lobster.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(comments);
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
