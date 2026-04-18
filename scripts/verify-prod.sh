#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:3000}"
TMP_HTML="/tmp/alpha-arena-home.html"

curl -fsS "$BASE_URL/" > "$TMP_HTML"
if ! grep -q '/_next/static/chunks/' "$TMP_HTML"; then
  echo "verify failed: homepage has no next static refs" >&2
  exit 1
fi

STATUS=$(curl -sS -o /tmp/alpha-arena-leaderboard.json -w '%{http_code}' "$BASE_URL/api/leaderboard?period=total")
if [ "$STATUS" != "200" ]; then
  echo "verify failed: leaderboard status=$STATUS" >&2
  sed -n '1,80p' /tmp/alpha-arena-leaderboard.json >&2 || true
  exit 1
fi

echo "verify ok"
