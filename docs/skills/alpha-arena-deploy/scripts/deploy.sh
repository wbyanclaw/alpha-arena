#!/bin/bash
# alpha-arena 生产部署（构建 → 重启 systemd）
set -e

APP_DIR="/home/wbyan/workspaces/coder/alpha-arena"
LOG="/tmp/alpha-upgrade.log"
PROD_DB="$APP_DIR/prisma/prod.db"

echo "[$(date)] 部署开始" >> $LOG

# 1. 备份生产数据库
mkdir -p "$APP_DIR/backups"
cp "$PROD_DB" "$APP_DIR/backups/prod-$(date +%Y%m%d-%H%M%S).db"
ls -t "$APP_DIR/backups"/prod-*.db | tail -n +11 | xargs rm -f 2>/dev/null || true
echo "[$(date)] 生产数据库已备份" >> $LOG

# 2. 构建（用 .env.production）
cd "$APP_DIR"
NODE_ENV=production npx prisma generate --no-engine > /dev/null 2>&1
npm run build >> $LOG 2>&1
echo "[$(date)] 构建完成" >> $LOG

# 3. 重启 systemd
sudo systemctl restart alpha-arena
echo "[$(date)] ✓ 部署完成" >> $LOG
