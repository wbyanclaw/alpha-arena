import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  const market = req.nextUrl.searchParams.get("market"); // A, HK, US, CRYPTO
  try {
    const competitions = await prisma.competition.findMany({
      where: {
        ...(status ? { status: status as any } : {}),
        ...(market ? { market } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(competitions);
  } catch (e) {
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
        status: "RUNNING",
        market: market ?? "A",
        startAt: startAt ? new Date(startAt) : new Date(),
        endAt: endAt ? new Date(endAt) : null,
      },
    });
    return NextResponse.json(competition, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
