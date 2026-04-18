import { PrismaClient, DeliverySide } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

// 钳多多过去一年的模拟月度定投记录（每月买一手贵州茅台，简化用固定价格）
// 实际价格从 hq.sinajs.cn 获取，此处用估算
const purchases = [
  { date: '2025-04-01', symbol: '600519', name: '贵州茅台', price: 1680, qty: 100 },
  { date: '2025-05-01', symbol: '600519', name: '贵州茅台', price: 1720, qty: 100 },
  { date: '2025-06-03', symbol: '600519', name: '贵州茅台', price: 1540, qty: 100 },
  { date: '2025-07-01', symbol: '600519', name: '贵州茅台', price: 1480, qty: 100 },
  { date: '2025-08-01', symbol: '600519', name: '贵州茅台', price: 1380, qty: 100 },
  { date: '2025-09-01', symbol: '600519', name: '贵州茅台', price: 1270, qty: 100 },
  { date: '2025-10-08', symbol: '600519', name: '贵州茅台', price: 1450, qty: 100 },
  { date: '2025-11-03', symbol: '600519', name: '贵州茅台', price: 1460, qty: 100 },
  { date: '2025-12-01', symbol: '600519', name: '贵州茅台', price: 1410, qty: 100 },
  { date: '2026-01-02', symbol: '600519', name: '贵州茅台', price: 1320, qty: 100 },
  { date: '2026-02-03', symbol: '600519', name: '贵州茅台', price: 1480, qty: 100 },
  { date: '2026-03-02', symbol: '600519', name: '贵州茅台', price: 1443, qty: 100 },
  // 2026-04-01 买入招商银行
  { date: '2026-04-01', symbol: '600036', name: '招商银行', price: 39.1, qty: 100 },
];

// 今日价格用于计算最新持仓
const LATEST_PRICES: Record<string, number> = {
  '600519': 1437,
  '600036': 38.99,
};

async function main() {
  // 清理旧的赤龙虾/蓝龙虾/金龙虾和钳多多
  await prisma.delivery.deleteMany({ where: { lobster: { key: { in: ['RED','BLUE','GOLD'] } } } });
  await prisma.dailySettlement.deleteMany({ where: { portfolio: { agent: { name: { in: ['赤龙虾','蓝龙虾','金龙虾','钳多多'] } } } } });
  await prisma.portfolio.deleteMany({ where: { agent: { name: { in: ['赤龙虾','蓝龙虾','金龙虾','钳多多'] } } } });
  await prisma.agent.deleteMany({ where: { name: { in: ['赤龙虾','蓝龙虾','金龙虾','钳多多'] } } });

  // 创建 Lobster GOLD → 改名为钳多多
  const lobster = await prisma.lobster.upsert({
    where: { key: 'GOLD' },
    update: { name: '钳多多', description: '官方基准龙虾 · 月度定投贵州茅台', color: '#FFD700', isActive: true },
    create: { key: 'GOLD', name: '钳多多', description: '官方基准龙虾 · 月度定投贵州茅台', color: '#FFD700', isActive: true },
  });

  // 创建 Agent 钳多多
  const agent = await prisma.agent.create({
    data: {
      name: '钳多多', model: 'gpt-4o',
      apiKey: `alpha_${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
      secretHash: 'seed',
      description: '官方基准龙虾 · 月度定投贵州茅台',
      market: 'A',
    },
  });

  // 创建 Portfolio
  const competition = await prisma.competition.findUnique({ where: { id: 'a-share-daily' } });
  const initialCash = competition?.initialCash ?? 1000000;
  // Link lobster to agent
  await prisma.lobster.update({ where: { id: lobster.id }, data: { agentId: agent.id } });

  const portfolio = await prisma.portfolio.create({
    data: {
      agentId: agent.id,
      competitionId: 'a-share-daily',
      cash: 0, // 全仓买入
      totalValue: 1000000,
    },
  });

  // 写入每月定投交割
  let cumulativeCost = 0;
  const totalShares = 0
  const settlements: { date: string; value: number; returnPct: number }[] = [];
  const initialValue = 1000000;

  for (const p of purchases) {
    const cost = p.price * p.qty;
    cumulativeCost += cost;

    await prisma.delivery.create({
      data: {
        agentId: agent.id,
        lobsterId: lobster.id,
        symbol: p.symbol,
        side: DeliverySide.BUY,
        quantity: p.qty,
        price: p.price,
        deliveredAt: new Date(p.date + 'T09:30:00Z'),
        note: '月度定投',
      },
    });

    // 更新持仓
    const existingPos = await prisma.position.findUnique({
      where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: p.symbol } },
    });
    const newQty = (existingPos?.quantity ?? 0) + p.qty;
    const newAvgCost = ((existingPos?.quantity ?? 0) * (existingPos?.avgCost ?? 0) + cost) / newQty;
    await prisma.position.upsert({
      where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: p.symbol } },
      create: { portfolioId: portfolio.id, symbol: p.symbol, quantity: p.qty, avgCost: p.price },
      update: { quantity: newQty, avgCost: newAvgCost },
    });

    // 估算当前总价值
    const latestPrice = LATEST_PRICES[p.symbol] ?? p.price;
    const posValue = (await prisma.position.findMany({ where: { portfolioId: portfolio.id } }))
      .reduce((s, pp) => s + pp.quantity * (LATEST_PRICES[pp.symbol] ?? pp.avgCost), 0);
    const totalValue = posValue;
    const returnPct = ((totalValue / initialValue) - 1) * 100;

    // 生成该月最后一个交易日的结算快照
    const lastDay = new Date(p.date);
    lastDay.setMonth(lastDay.getMonth() + 1);
    lastDay.setDate(lastDay.getDate() - 1);
    const dateStr = lastDay.toISOString().slice(0, 10);

    const existing = await prisma.dailySettlement.findUnique({
      where: { portfolioId_date: { portfolioId: portfolio.id, date: dateStr } },
    });
    if (!existing) {
      await prisma.dailySettlement.create({
        data: {
          portfolioId: portfolio.id,
          date: dateStr,
          cash: 0,
          positionJson: JSON.stringify({ symbol: p.symbol, quantity: totalShares, avgCost: cumulativeCost / totalShares }),
          positionDays: 0,
          totalValue,
          returnPct,
        },
      });
      settlements.push({ date: dateStr, value: totalValue, returnPct });
    }
  }

  console.log('✓ 钳多多 种子数据写入完成');
  console.log(`  交割记录: ${purchases.length} 条`);
  console.log(`  结算快照: ${settlements.length} 条`);

  // 清理其他 dummy lobsters 的 delivery（如果还有的话）
  await prisma.delivery.deleteMany({ where: { lobsterId: null } });
  await prisma.lobster.updateMany({ where: { key: { in: ['RED','BLUE'] } }, data: { isActive: false } });

  await prisma.$disconnect();
}

main().catch(console.error);
