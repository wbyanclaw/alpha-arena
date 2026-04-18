const { CRON_SECRET, API_BASE = 'http://localhost:3000' } = process.env;
const cmd = process.argv[2] || 'prices';

async function call(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

async function main() {
  if (!CRON_SECRET) {
    console.error('CRON_SECRET not set');
    process.exit(1);
  }

  if (cmd === 'match') {
    const url = `${API_BASE}/api/match?secret=${CRON_SECRET}`;
    console.log(`[${new Date().toISOString()}] Running match...`);
    const data = await call(url);
    console.log(`✅ Matched ${data.matched}/${data.total} orders, failed ${data.failed}, portfolios updated ${data.portfoliosUpdated}`);
    return;
  }

  const url = `${API_BASE}/api/prices/refresh?secret=${CRON_SECRET}`;
  console.log(`[${new Date().toISOString()}] Refreshing prices...`);
  const data = await call(url);
  const failedPart = data.failed > 0 ? `, failed=${data.failed} [${(data.failedSymbols || []).join(', ')}]` : '';
  console.log(`✅ Updated ${data.updated} stocks${failedPart}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`❌ ${message}`);
  process.exit(1);
});
