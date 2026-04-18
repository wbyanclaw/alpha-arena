#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/wbyan/workspaces/coder/alpha-arena"
SERVICE="alpha-arena-prod.service"

cd "$APP_DIR"

echo "[1/4] install deps"
npm install

echo "[2/4] build"
npm run build

echo "[3/4] restart service"
systemctl --user restart "$SERVICE"

echo "[4/4] verify homepage static refs"
sleep 2
curl -fsS http://127.0.0.1:3000/ >/tmp/alpha-arena-home.html
if ! grep -q '/_next/static/chunks/' /tmp/alpha-arena-home.html; then
  echo "verify failed: homepage has no next static refs" >&2
  exit 1
fi

echo "deploy ok"
