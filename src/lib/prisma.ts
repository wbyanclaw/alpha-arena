import { PrismaClient } from "@/generated/prisma";
import path from "path";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const dbPath = path.join(process.cwd(), "prisma", "prod.db");
const databaseUrl = process.env.DATABASE_URL ?? `file:${dbPath}`;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: databaseUrl } },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
