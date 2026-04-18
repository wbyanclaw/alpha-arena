import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const lobsters = await prisma.lobster.findMany({ orderBy: { key: "asc" } });
    return NextResponse.json(lobsters);
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
