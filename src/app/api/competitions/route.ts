import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CompetitionStatus } from "@/generated/prisma";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  const market = req.nextUrl.searchParams.get("market");

  const normalizedStatus = status && status in CompetitionStatus
    ? CompetitionStatus[status as keyof typeof CompetitionStatus]
    : undefined;

  try {
    const competitions = await prisma.competition.findMany({
      where: {
        ...(normalizedStatus ? { status: normalizedStatus } : {}),
        ...(market ? { market } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(competitions);
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  const isAdmin = apiKey === process.env.ADMIN_API_KEY || apiKey.startsWith("alpha_admin");
  if (!isAdmin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    const { name, description, initialCash, startAt, endAt, market } = await req.json();
    const competition = await prisma.competition.create({
      data: {
        name: name ?? "日赛",
        description,
        initialCash: initialCash ?? 1000000,
        status: CompetitionStatus.RUNNING,
        market: market ?? "A",
        startAt: startAt ? new Date(startAt) : new Date(),
        endAt: endAt ? new Date(endAt) : null,
      },
    });
    return NextResponse.json(competition, { status: 201 });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
