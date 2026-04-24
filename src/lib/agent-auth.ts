import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function requireAgent(req: NextRequest) {
  const apiKey = req.headers.get("x-agent-key")?.trim();
  if (!apiKey) {
    return { error: "missing x-agent-key", status: 401 } as const;
  }

  const agent = await prisma.agent.findUnique({ where: { apiKey } });
  if (!agent) {
    return { error: "invalid agent key", status: 401 } as const;
  }

  if (agent.status !== "ACTIVE") {
    return { error: `agent is ${agent.status.toLowerCase()}`, status: 403 } as const;
  }

  return { agent } as const;
}
