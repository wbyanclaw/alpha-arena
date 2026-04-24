const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient({ datasources: { db: { url: "file:./prisma/prod.db" } } });

async function main() {
  const competition = await prisma.competition.upsert({
    where: { id: "comp_a_001" },
    update: {},
    create: { id: "comp_a_001", name: "A股演示赛", market: "A", status: "RUNNING", initialCash: 1000000 },
  });

  const prices = [
    ["600519", "贵州茅台", 1688, 1660],
    ["300750", "宁德时代", 212.8, 208.5],
    ["000001", "平安银行", 11.24, 11.08],
    ["601318", "中国平安", 52.66, 51.9],
    ["600036", "招商银行", 34.52, 34.01],
    ["000333", "美的集团", 64.8, 63.95],
  ];
  for (const [symbol, name, price, prevClose] of prices) {
    await prisma.price.upsert({ where: { symbol }, update: { name, price, prevClose }, create: { symbol, name, price, prevClose } });
  }

  const agents = [
    { id: "agent_main", name: "招钳", model: "gpt-5.4", cash: 312000, totalValue: 1168000, trend: [2.1, 3.4, 5.2, 7.1, 9.8, 13.2, 16.8] },
    { id: "agent_manager", name: "管钳", model: "gpt-5.4", cash: 428000, totalValue: 1096000, trend: [1.2, 2.4, 3.1, 4.9, 5.7, 7.8, 9.6] },
    { id: "agent_sale", name: "售钳", model: "gpt-5.4", cash: 255000, totalValue: 1214000, trend: [1.8, 4.6, 6.9, 8.2, 12.3, 16.7, 21.4] },
  ];

  for (const a of agents) {
    await prisma.agent.upsert({
      where: { name: a.name },
      update: { apiKey: `${a.id}_key`, secretHash: `${a.id}_secret`, model: a.model, market: "A", status: "ACTIVE" },
      create: { name: a.name, apiKey: `${a.id}_key`, secretHash: `${a.id}_secret`, model: a.model, market: "A", status: "ACTIVE" },
    });

    const agent = await prisma.agent.findUniqueOrThrow({ where: { name: a.name } });
    await prisma.portfolio.upsert({
      where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } },
      update: { cash: a.cash, totalValue: a.totalValue },
      create: { agentId: agent.id, competitionId: competition.id, cash: a.cash, totalValue: a.totalValue },
    });

    const portfolio = await prisma.portfolio.findUniqueOrThrow({ where: { agentId_competitionId: { agentId: agent.id, competitionId: competition.id } } });
    const holdings = a.id === "agent_sale"
      ? [["600519", 120, 1580, 1688], ["300750", 800, 198.6, 212.8]]
      : a.id === "agent_main"
        ? [["601318", 6000, 48.2, 52.66], ["600036", 5000, 32.5, 34.52]]
        : [["000001", 30000, 10.62, 11.24], ["000333", 2600, 61.1, 64.8]];

    for (const [symbol, quantity, avgCost, currentPrice] of holdings) {
      await prisma.position.upsert({
        where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol } },
        update: { quantity, avgCost, currentPrice },
        create: { portfolioId: portfolio.id, symbol, quantity, avgCost, currentPrice },
      });
    }

    for (let i = 0; i < a.trend.length; i += 1) {
      const date = new Date(Date.now() - (a.trend.length - 1 - i) * 86400000);
      const ds = date.toISOString().slice(0, 10);
      await prisma.dailySettlement.upsert({
        where: { portfolioId_date: { portfolioId: portfolio.id, date: ds } },
        update: { cash: a.cash, totalValue: 1000000 * (1 + a.trend[i] / 100), returnPct: a.trend[i], positionDays: i + 1 },
        create: { portfolioId: portfolio.id, date: ds, cash: a.cash, totalValue: 1000000 * (1 + a.trend[i] / 100), returnPct: a.trend[i], positionDays: i + 1 },
      });
    }
  }

  const agentMap = new Map((await prisma.agent.findMany({ where: { name: { in: ["招钳", "管钳", "售钳"] } } })).map((a) => [a.name, a.id]));
  const deliveries = [
    ["售钳", "600519", "BUY", 120, 1580, "2026-04-24T08:05:00+08:00", "加仓核心资产"],
    ["售钳", "300750", "BUY", 800, 198.6, "2026-04-24T08:16:00+08:00", "做多新能源主线"],
    ["招钳", "601318", "BUY", 6000, 48.2, "2026-04-24T08:08:00+08:00", "保险权重修复"],
    ["招钳", "600036", "BUY", 5000, 32.5, "2026-04-24T08:12:00+08:00", "银行板块跟随"],
    ["管钳", "000001", "BUY", 30000, 10.62, "2026-04-24T08:10:00+08:00", "低位反弹观察"],
    ["管钳", "000333", "BUY", 2600, 61.1, "2026-04-24T08:18:00+08:00", "家电趋势延续"],
  ];

  for (const [agentName, symbol, side, quantity, price, deliveredAt, note] of deliveries) {
    await prisma.delivery.create({
      data: { agentId: agentMap.get(agentName), symbol, side, quantity, price, deliveredAt: new Date(deliveredAt), note },
    }).catch(() => null);
  }

  console.log("seeded");
}

main().finally(async () => {
  await prisma.$disconnect();
});
