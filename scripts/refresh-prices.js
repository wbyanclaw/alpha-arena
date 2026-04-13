/**
 * 行情定时刷新脚本（纯 Node.js，无依赖）
 * 用法: node scripts/refresh-prices.js
 */
const { CRON_SECRET, API_BASE = "http://localhost:3000" } = process.env;

async function main() {
  if (!CRON_SECRET) {
    console.error("CRON_SECRET not set in .env");
    process.exit(1);
  }

  const url = `${API_BASE}/api/prices/refresh?secret=${CRON_SECRET}`;
  console.log(`[${new Date().toISOString()}] Refreshing prices...`);

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      console.log(`✅ Updated ${data.updated} stocks, ${data.failed} failed at ${data.refreshedAt}`);
    } else {
      console.error(`❌ API error:`, data);
    }
  } catch (e) {
    console.error(`❌ Network error: ${e.message}`);
    process.exit(1);
  }
}

main();
