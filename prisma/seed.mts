import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import crypto from "crypto";

const prisma = new PrismaClient();
function hash(s: string) { return crypto.createHash("sha256").update(s).digest("hex"); }

async function main() {
  await prisma.logEntry.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.order.deleteMany();
  await prisma.trade.deleteMany();
  await prisma.position.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.lobster.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.dailySettlement.deleteMany();
  await prisma.price.deleteMany();
  await prisma.competition.deleteMany();

  // 行情
  const STOCKS = [
    { symbol: "600519", name: "贵州茅台",    price: 1680.00, prevClose: 1690.00 },
    { symbol: "600036", name: "招商银行",    price: 38.50,  prevClose: 38.20 },
    { symbol: "601318", name: "中国平安",    price: 47.80,  prevClose: 48.10 },
    { symbol: "600030", name: "中信证券",    price: 22.30,  prevClose: 22.10 },
    { symbol: "600276", name: "恒瑞医药",    price: 58.90,  prevClose: 59.20 },
    { symbol: "601888", name: "中国中免",    price: 72.40,  prevClose: 71.80 },
    { symbol: "000001", name: "平安银行",    price: 11.20,  prevClose: 11.15 },
    { symbol: "000002", name: "万科A",       price: 6.85,   prevClose: 6.90 },
    { symbol: "000858", name: "五粮液",      price: 148.00, prevClose: 147.50 },
    { symbol: "002594", name: "比亚迪",      price: 268.00, prevClose: 265.00 },
    { symbol: "300750", name: "宁德时代",    price: 182.00, prevClose: 180.00 },
    { symbol: "300059", name: "东方财富",    price: 18.60,  prevClose: 18.40 },
    { symbol: "688041", name: "寒武纪",      price: 82.50,  prevClose: 80.00 },
    { symbol: "688981", name: "中微公司",    price: 128.00, prevClose: 126.00 },
  ];
  for (const s of STOCKS) {
    await prisma.price.upsert({
      where: { symbol: s.symbol },
      create: s,
      update: { price: s.price, prevClose: s.prevClose, name: s.name },
    });
  }

  // Agent
  const redAgent = await prisma.agent.create({ data: { name: "赤龙虾", apiKey: "alpha_red001", secretHash: hash("red"), market: "A" } });
  const blueAgent = await prisma.agent.create({ data: { name: "蓝龙虾", apiKey: "alpha_blue001", secretHash: hash("blue"), market: "A" } });
  const goldAgent = await prisma.agent.create({ data: { name: "金龙虾", apiKey: "alpha_gold001", secretHash: hash("gold"), market: "A" } });

  // Lobster → Agent
  const red = await prisma.lobster.create({ data: { key: "RED", name: "赤龙虾", description: "激进型策略，高频切换", color: "#f43f5e", isActive: true, agentId: redAgent.id } });
  const blue = await prisma.lobster.create({ data: { key: "BLUE", name: "蓝龙虾", description: "稳健型策略，均衡配置", color: "#06b6d4", isActive: false, agentId: blueAgent.id } });
  const gold = await prisma.lobster.create({ data: { key: "GOLD", name: "金龙虾", description: "长周期策略，价值投资", color: "#f59e0b", isActive: false, agentId: goldAgent.id } });

  // 比赛
  const comp = await prisma.competition.create({
    data: { id: "a-share-daily", name: "日赛", description: "每日A股挑战赛", status: "RUNNING", initialCash: 1000000, market: "A", startAt: new Date("2026-04-01") },
  });

  // 报名
  for (const agent of [redAgent, blueAgent, goldAgent]) {
    await prisma.portfolio.create({ data: { agentId: agent.id, competitionId: comp.id, cash: 1000000, totalValue: 1000000 } });
  }

  console.log("Seed done.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
