import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient({ log: ["error"] });

async function main() {
  console.log("Seeding...");
  await prisma.logEntry.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.lobster.deleteMany();

  const red = await prisma.lobster.create({ data: { key: "RED", name: "赤龙虾", description: "激进型策略", color: "#f43f5e", isActive: true } });
  const blue = await prisma.lobster.create({ data: { key: "BLUE", name: "蓝龙虾", description: "稳健型策略", color: "#06b6d4", isActive: false } });
  const gold = await prisma.lobster.create({ data: { key: "GOLD", name: "金龙虾", description: "长周期策略", color: "#f59e0b", isActive: false } });

  await prisma.delivery.createMany({ data: [
    { lobsterId: red.id, symbol: "BTCUSDT", side: "BUY", quantity: 1.25, price: 82450, deliveredAt: new Date("2026-04-10T09:30:00Z") },
    { lobsterId: red.id, symbol: "ETHUSDT", side: "SELL", quantity: 12.0, price: 1640, deliveredAt: new Date("2026-04-10T10:05:00Z") },
    { lobsterId: red.id, symbol: "SOLUSDT", side: "BUY", quantity: 240, price: 132, deliveredAt: new Date("2026-04-10T11:42:00Z") },
    { lobsterId: blue.id, symbol: "BTCUSDT", side: "BUY", quantity: 0.3, price: 82200, deliveredAt: new Date("2026-04-10T09:45:00Z") },
    { lobsterId: blue.id, symbol: "ETHUSDT", side: "BUY", quantity: 5.0, price: 1635, deliveredAt: new Date("2026-04-10T11:00:00Z") },
    { lobsterId: gold.id, symbol: "BTCUSDT", side: "BUY", quantity: 0.5, price: 81800, deliveredAt: new Date("2026-04-10T10:00:00Z") },
  ]});

  await prisma.comment.createMany({ data: [
    { lobsterId: red.id, author: "研究台", content: "赤龙虾节奏稳定，上午仓位切换很干净。", sentiment: 1 },
    { lobsterId: red.id, author: "风控台", content: "趋势已破，建议减仓保护利润。", sentiment: -1 },
    { lobsterId: red.id, author: "策略组", content: "下午重点关注 BTC 突破 83k 后的跟随机会。", sentiment: 0 },
    { lobsterId: blue.id, author: "研究台", content: "蓝龙虾波动放大，下午注意回撤阈值。", sentiment: 0 },
    { lobsterId: blue.id, author: "风控台", content: "均衡配置有效，大盘回调时回撤可控。", sentiment: 1 },
    { lobsterId: gold.id, author: "策略组", content: "金龙虾适合承接趋势单，继续观察量能。", sentiment: 0 },
    { lobsterId: gold.id, author: "研究台", content: "长线布局已建仓，耐心持有。", sentiment: 1 },
  ]});

  await prisma.logEntry.createMany({ data: [
    { lobsterId: red.id, title: "策略启动", content: "赤龙虾策略已激活，进入高频模式。", level: "INFO" },
    { lobsterId: red.id, title: "仓位提醒", content: "连续两笔成交间隔缩短至 8 分钟。", level: "WARN" },
    { lobsterId: red.id, title: "止盈触发", content: "ETHUSDT 盈利 3.2% 被动止盈。", level: "INFO" },
    { lobsterId: blue.id, title: "策略启动", content: "蓝龙虾策略已激活，均衡模式运行中。", level: "INFO" },
    { lobsterId: blue.id, title: "对冲提醒", content: "BTC 波动加剧，已启用 ETH 对冲。", level: "WARN" },
    { lobsterId: gold.id, title: "策略启动", content: "金龙虾策略已激活，价值投资模式。", level: "INFO" },
    { lobsterId: gold.id, title: "建仓完成", content: "BTC 长线底仓已完成布局。", level: "INFO" },
  ]});

  console.log("Seed done.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
