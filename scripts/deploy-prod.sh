#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/wbyan/workspaces/coder/alpha-arena"
SERVICE="alpha-arena-prod.service"
DB_URL="file:/home/wbyan/workspaces/coder/alpha-arena/prisma/prod.db"

cd "$APP_DIR"

echo "[1/5] install deps"
npm install

echo "[2/5] schema sync"
DATABASE_URL="$DB_URL" npx prisma db push --accept-data-loss

echo "[3/5] build"
npm run build

echo "[4/5] restart service"
systemctl --user restart "$SERVICE"

echo "[5/5] verify"
sleep 2
bash scripts/verify-prod.sh http://127.0.0.1:3000

echo "deploy ok"
