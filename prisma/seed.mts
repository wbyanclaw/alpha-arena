import "dotenv/config";
import { PrismaClient } from "/home/wbyan/workspaces/coder/alpha-arena/src/generated/prisma/client.js";
import crypto from "crypto";

const prisma = new PrismaClient();

function hash(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

async function main() {
  await prisma.logEntry.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.lobster.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.trade.deleteMany();
  await prisma.position.deleteMany();
  await prisma.price.deleteMany();
  await prisma.competition.deleteMany();

  // 种子行情（A 股）
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

  // 创建 Agent（龙虾身份）
  const redAgent = await prisma.agent.create({
    data: { name: "赤龙虾", apiKey: "alpha_red001", secretHash: hash("red-secret"), market: "A" },
  });
  const blueAgent = await prisma.agent.create({
    data: { name: "蓝龙虾", apiKey: "alpha_blue001", secretHash: hash("blue-secret"), market: "A" },
  });
  const goldAgent = await prisma.agent.create({
    data: { name: "金龙虾", apiKey: "alpha_gold001", secretHash: hash("gold-secret"), market: "A" },
  });

  // 创建 Lobster 并关联 Agent
  const red = await prisma.lobster.create({
    data: { key: "RED", name: "赤龙虾", description: "激进型策略，高频切换，追求趋势动量", color: "#f43f5e", isActive: true, agentId: redAgent.id },
  });
  const blue = await prisma.lobster.create({
    data: { key: "BLUE", name: "蓝龙虾", description: "稳健型策略，均衡配置，侧重风险对冲", color: "#06b6d4", isActive: false, agentId: blueAgent.id },
  });
  const gold = await prisma.lobster.create({
    data: { key: "GOLD", name: "金龙虾", description: "长周期策略，价值投资，顺势而为", color: "#f59e0b", isActive: false, agentId: goldAgent.id },
  });

  // 创建默认 A 股比赛
  const comp = await prisma.competition.create({
    data: {
      id: "a-share-daily",
      name: "日赛",
      description: "每日A股挑战赛",
      status: "RUNNING",
      initialCash: 1000000,
      market: "A",
      startAt: new Date("2026-04-01"),
      endAt: null,
    },
  });

  // 报名三只龙虾
  for (const agent of [redAgent, blueAgent, goldAgent]) {
    await prisma.portfolio.create({
      data: { agentId: agent.id, competitionId: comp.id, cash: 1000000, totalValue: 1000000 },
    });
  }

  // 模拟历史交割单（过去3天，每天每龙虾各1条）
  const symbols = ["600519", "000002", "300750"];
  const sides = ["BUY", "BUY", "BUY"];
  const agents = [redAgent, blueAgent, goldAgent];

  for (let day = 3; day >= 1; day--) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    date.setHours(9, 30, 0, 0);

    for (let i = 0; i < agents.length; i++) {
      const a = agents[i];
      const sym = symbols[i];
      const priceRec = STOCKS.find(s => s.symbol === sym)!;
      // 先买入
      await prisma.delivery.create({
        data: {
          agentId: a.id,
          lobsterId: a.id === redAgent.id ? red.id : a.id === blueAgent.id ? blue.id : gold.id,
          symbol: sym,
          side: "BUY",
          quantity: 100,
          price: priceRec.price,
          deliveredAt: new Date(date),
          note: `第${4 - day}天建仓 ${sym}`,
        },
      });
    }
  }

  console.log("Seed done: 3 lobsters, 3 agents, 1 competition, prices seeded.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
