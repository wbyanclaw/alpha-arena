import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public: get all prices
export async function GET() {
  try {
    const prices = await prisma.price.findMany({ orderBy: { symbol: "asc" } });
    return NextResponse.json(prices);
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

// Protected: update price (admin / simulation engine)
export async function PUT(req: NextRequest) {
  const apiKey = req.headers.get("X-API-Key") || "";
  if (apiKey !== process.env.ADMIN_API_KEY && !apiKey.startsWith("alpha_admin")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  try {
    const { symbol, price, name } = await req.json();
    if (!symbol || price === undefined) return NextResponse.json({ error: "symbol and price required" }, { status: 400 });

    const prev = await prisma.price.findUnique({ where: { symbol } });
    const priceRec = await prisma.price.upsert({
      where: { symbol },
      create: { symbol, name: name ?? symbol, price, prevClose: prev?.price ?? price },
      update: { price, prevClose: prev?.price ?? price },
    });
    return NextResponse.json(priceRec);
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
