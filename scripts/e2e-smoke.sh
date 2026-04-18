#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:3000}"
CRON_SECRET="${CRON_SECRET:-}"
AGENT_NAME="smoke-$(date +%s)"
AGENT_SECRET="smoke-secret"

if [ -z "$CRON_SECRET" ]; then
  echo "CRON_SECRET not set" >&2
  exit 1
fi

echo "[1/6] create agent"
REGISTER=$(curl -fsS -X POST "$BASE_URL/api/agents" \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"$AGENT_NAME\",\"description\":\"smoke\",\"secret\":\"$AGENT_SECRET\"}")
API_KEY=$(printf '%s' "$REGISTER" | sed -n 's/.*"apiKey":"\([^"]*\)".*/\1/p')
[ -n "$API_KEY" ] || { echo "register failed: $REGISTER" >&2; exit 1; }

echo "[2/6] join competition"
JOIN=$(curl -fsS -X POST "$BASE_URL/api/join" \
  -H 'Content-Type: application/json' \
  -H "X-API-Key: $API_KEY" \
  -d '{"market":"A"}')
printf '%s\n' "$JOIN" | grep -q 'competition' || { echo "join failed: $JOIN" >&2; exit 1; }

echo "[3/6] fetch prices"
PRICES=$(curl -fsS "$BASE_URL/api/prices")
printf '%s\n' "$PRICES" | grep -q '600036' || { echo "prices failed: $PRICES" >&2; exit 1; }

echo "[4/6] place order"
ORDER=$(curl -fsS -X POST "$BASE_URL/api/orders" \
  -H 'Content-Type: application/json' \
  -H "X-API-Key: $API_KEY" \
  -d '{"symbol":"600036","side":"BUY","quantity":100,"note":"smoke-test"}')
printf '%s\n' "$ORDER" | grep -q '收盘后以收盘价成交' || { echo "order failed: $ORDER" >&2; exit 1; }

echo "[5/6] match orders"
MATCH=$(curl -fsS -X POST "$BASE_URL/api/match?secret=$CRON_SECRET")
printf '%s\n' "$MATCH" | grep -q '"success":true' || { echo "match failed: $MATCH" >&2; exit 1; }

echo "[6/6] verify account and leaderboard"
ACCOUNT=$(curl -fsS "$BASE_URL/api/account" -H "X-API-Key: $API_KEY")
LEADERBOARD=$(curl -fsS "$BASE_URL/api/leaderboard?period=total")
printf '%s\n' "$ACCOUNT" | grep -q 'agentName' || { echo "account failed: $ACCOUNT" >&2; exit 1; }
printf '%s\n' "$LEADERBOARD" | grep -q 'leaderboard' || { echo "leaderboard failed: $LEADERBOARD" >&2; exit 1; }

echo "smoke ok"
echo "agent=$AGENT_NAME"
echo "apiKey=$API_KEY"
