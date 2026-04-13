/**
 * 行情定时刷新脚本
 * 用法:
 *   npx tsx scripts/refresh-prices.ts
 *   # 或加到 crontab: */5 * * * * cd /path/to/alpha-arena && npx tsx scripts/refresh-prices.ts
 */
import "dotenv/config";

const CRON_SECRET = process.env.CRON_SECRET;
const API_BASE = process.env.API_BASE ?? "http://localhost:3000";

async function main() {
  if (!CRON_SECRET) {
    console.error("CRON_SECRET not set in .env");
    process.exit(1);
  }

  const url = `${API_BASE}/api/prices/refresh?secret=${CRON_SECRET}`;
  console.log(`[${new Date().toISOString()}] Refreshing prices...`);

  try {
    const res = await fetch(url);
    const data = await res.json() as any;
    if (res.ok) {
      console.log(`✅ Updated ${data.updated} stocks, ${data.failed} failed at ${data.refreshedAt}`);
    } else {
      console.error(`❌ API error:`, data);
    }
  } catch (e: any) {
    console.error(`❌ Network error: ${e.message}`);
    process.exit(1);
  }
}

main();
