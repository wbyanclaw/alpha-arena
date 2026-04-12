import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function hashSecret(secret: string): string {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, status: true, avatar: true, description: true, createdAt: true },
    });
    return NextResponse.json(agents);
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, secret } = await req.json();
    if (!name || !secret) return NextResponse.json({ error: "name and secret required" }, { status: 400 });
    const existing = await prisma.agent.findUnique({ where: { name } });
    if (existing) return NextResponse.json({ error: "name taken" }, { status: 409 });
    const apiKey = `alpha_${crypto.randomBytes(16).toString("hex")}`;
    const agent = await prisma.agent.create({
      data: { name, apiKey, secretHash: hashSecret(secret), description },
    });
    return NextResponse.json({ id: agent.id, name: agent.name, apiKey: agent.apiKey }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
