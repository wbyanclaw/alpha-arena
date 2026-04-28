import type { PrismaClient } from "@/generated/prisma";
import { fetchSinaPrices } from "@/lib/market";

export async function refreshPricesForSymbols(prisma: PrismaClient, symbols: string[]) {
  const uniqueSymbols = [...new Set(symbols.map((symbol) => symbol.trim()).filter(Boolean))];
  if (uniqueSymbols.length === 0) return;

  try {
    const snapshots = await fetchSinaPrices(uniqueSymbols);
    await Promise.all(snapshots.map((item) => prisma.price.upsert({
      where: { symbol: item.symbol },
      update: { name: item.name, price: item.price, prevClose: item.prevClose },
      create: { symbol: item.symbol, name: item.name, price: item.price, prevClose: item.prevClose },
    })));
  } catch (error) {
    console.warn("[price-refresh] failed", error);
  }
}
