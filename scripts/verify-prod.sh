#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env.local && ! -n "${DATABASE_URL:-}" ]]; then
  echo "WARN: DATABASE_URL 未配置，默认运行时将回退到 file:./prisma/prod.db"
fi

echo "node=$(node -v)"
echo "npm=$(npm -v)"
echo "nvmrc=$(cat .nvmrc 2>/dev/null || echo missing)"

echo "[1/3] prisma generate"
npm run db:generate >/dev/null

echo "[2/3] next build"
npm run build >/dev/null

echo "[3/3] lint"
npm run lint >/dev/null

echo "OK: build/lint/prisma passed"
