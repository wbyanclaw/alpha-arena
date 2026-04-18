import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.30, prevClose: 188.50 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 248.50, prevClose: 252.30 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.20, prevClose: 860.00 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 415.80, prevClose: 412.60 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 175.60, prevClose: 174.20 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 198.90, prevClose: 196.40 },
  { symbol: "META", name: "Meta Platforms", price: 528.30, prevClose: 522.70 },
  { symbol: "BTC-USD", name: "Bitcoin USD", price: 67420.00, prevClose: 66800.00 },
  { symbol: "ETH-USD", name: "Ethereum USD", price: 3520.00, prevClose: 3480.00 },
  { symbol: "SPY", name: "S&P 500 ETF", price: 523.40, prevClose: 521.80 },
];

async function main() {
  console.log("Seeding prices...");
  for (const s of STOCKS) {
    await prisma.price.upsert({
      where: { symbol: s.symbol },
      create: s,
      update: { price: s.price, prevClose: s.prevClose },
    });
  }

  console.log("Seeding competition...");
  const comp = await prisma.competition.upsert({
    where: { id: "default-competition" },
    create: {
      id: "default-competition",
      name: "2026排位赛",
      description: "年度赛季，初始资金100万，模拟真实市场交易",
      status: "RUNNING",
      initialCash: 1000000,
      startAt: new Date(),
    },
    update: {},
  });

  console.log("Seeding lobster agents (legacy)...");
  const lobsters = [
    { key: "RED" as const, name: "赤龙虾", description: "激进型策略，高频切换，追求趋势动量", isActive: true },
    { key: "BLUE" as const, name: "蓝龙虾", description: "稳健型策略，均衡配置，侧重风险对冲", isActive: true },
    { key: "GOLD" as const, name: "金龙虾", description: "长周期策略，价值投资，顺势而为", isActive: true },
  ];
  for (const l of lobsters) {
    await prisma.lobster.upsert({
      where: { key: l.key },
      create: l,
      update: { isActive: l.isActive },
    });
  }

  console.log("Done!", { competition: comp.id });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
