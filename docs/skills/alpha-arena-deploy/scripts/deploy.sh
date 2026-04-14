#!/bin/bash
# alpha-arena 部署脚本（生产环境）
set -e

APP_DIR="/home/wbyan/workspaces/coder/alpha-arena"
LOG="/tmp/alpha-upgrade.log"
BACKUP_DIR="$APP_DIR/backups"
PROD_DB="$APP_DIR/prisma/prod.db"

echo "[$(date)] 部署开始" >> $LOG

# 1. 备份生产数据库
mkdir -p "$BACKUP_DIR"
cp "$PROD_DB" "$BACKUP_DIR/prod-$(date +%Y%m%d-%H%M%S).db"
ls -t "$BACKUP_DIR"/prod-*.db | tail -n +11 | xargs rm -f 2>/dev/null || true
echo "[$(date)] 生产数据库已备份" >> $LOG

# 2. 构建
cd "$APP_DIR"
npm run build >> $LOG 2>&1

# 3. 重启
sudo systemctl restart alpha-arena
echo "[$(date)] ✓ 部署完成" >> $LOG
