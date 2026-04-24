#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ -f .nvmrc && -s .nvmrc ]]; then
  echo "target_node=$(cat .nvmrc)"
fi

echo "[1/4] npm ci"
npm ci

echo "[2/4] prisma generate"
npm run db:generate

echo "[3/4] next build"
npm run build

echo "[4/4] start command"
echo "Use: npm run start:prod"
