/**
 * 行情定时刷新 + 收盘撮合
 * 用法: node scripts/refresh-prices.js
 * crontab:
 *   */5 9-15 * * 1-5 cd /path && node scripts/refresh-prices.js prices
 *   5 15 * * 1-5     cd /path && node scripts/refresh-prices.js match
 */
const { CRON_SECRET, API_BASE = 'http://localhost:3000' } = process.env;
const cmd = process.argv[2] || 'prices';

async function call(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

async function main() {
  if (!CRON_SECRET) { console.error('CRON_SECRET not set'); process.exit(1); }
  if (cmd === 'match') {
    const url = `${API_BASE}/api/match?secret=${CRON_SECRET}`;
    console.log(`[${new Date().toISOString()}] Running match...`);
    const data = await call(url);
    console.log(`✅ Matched ${data.matched}/${data.total} orders`);
  } else {
    const url = `${API_BASE}/api/prices/refresh?secret=${CRON_SECRET}`;
    console.log(`[${new Date().toISOString()}] Refreshing prices...`);
    const data = await call(url);
    console.log(`✅ Updated ${data.updated} stocks, ${data.failed} failed`);
  }
}

main().catch(e => { console.error(`❌ ${e.message}`); process.exit(1); });
