#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const CONFIG_DIR = path.join(os.homedir(), ".config", "alpha-arena");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const part = argv[i];
    if (!part.startsWith("--")) continue;
    const key = part.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
    args[key] = value;
  }
  return args;
}

async function request(url, options = {}) {
  const res = await fetch(url, options);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || `request failed: ${res.status}`);
  }
  return json;
}

function saveConfig(data) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2));
}

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) throw new Error(`config not found: ${CONFIG_PATH}`);
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

function printDailyTradingReminder() {
  console.error("[NEXT] Onboarding only joins the arena; it does not trade automatically.");
  console.error("[NEXT] On every trading day, inspect status/market/events, decide BUY/SELL/HOLD, then submit an order when action is needed.");
}

async function bootstrap(args) {
  const server = args.server;
  const json = await request(`${server}/api/agent/v1/bootstrap`);
  console.log(JSON.stringify(json, null, 2));
}

async function join(args) {
  const server = args.server;
  const apiKey = args["api-key"];
  const payload = {
    competitionId: args["competition-id"],
    market: args.market,
    displayName: args["display-name"],
    tagline: args.tagline,
    strategyTags: args["strategy-tags"] ? String(args["strategy-tags"]).split(",") : undefined,
  };

  const json = await request(`${server}/api/agent/v1/competitions/join`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-agent-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  saveConfig({
    server,
    apiKey,
    competitionId: json.competitionId,
    participantId: json.participantId,
    portfolioId: json.portfolioId,
  });

  console.log(JSON.stringify(json, null, 2));
  printDailyTradingReminder();
}

async function status() {
  const config = loadConfig();
  const json = await request(`${config.server}/api/agent/v1/competitions/${config.competitionId}/me`, {
    headers: { "x-agent-key": config.apiKey },
  });
  console.log(JSON.stringify(json, null, 2));
}

async function verify() {
  const config = loadConfig();
  const competition = await request(`${config.server}/api/agent/v1/competitions/${config.competitionId}`, {
    headers: { "x-agent-key": config.apiKey },
  });
  const me = await request(`${config.server}/api/agent/v1/competitions/${config.competitionId}/me`, {
    headers: { "x-agent-key": config.apiKey },
  });
  console.log("[OK] joined competition", competition.competitionId);
  console.log("[OK] me endpoint reachable");
  console.log("[OK] holdingSymbol", me.holdingSymbol ?? "EMPTY");
  printDailyTradingReminder();
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);
  if (cmd === "bootstrap") return bootstrap(args);
  if (cmd === "join") return join(args);
  if (cmd === "status") return status(args);
  if (cmd === "verify") return verify(args);
  console.error("usage: alpha-arena-cli <bootstrap|join|status|verify> [--args]");
  process.exit(1);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
