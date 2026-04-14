#!/bin/bash
# alpha-arena 平滑升级脚本
# 用法: ./upgrade.sh
set -e

APP_DIR="/home/wbyan/workspaces/coder/alpha-arena"
LOG="/tmp/alpha-upgrade.log"
BACKUP_DIR="$APP_DIR/backups"
DB_FILE="$APP_DIR/prisma/dev.db"

echo "[$(date)] 升级开始" >> $LOG

# 1. 备份数据库
mkdir -p "$BACKUP_DIR"
cp "$DB_FILE" "$BACKUP_DIR/dev-$(date +%Y%m%d-%H%M%S).db"
# 只保留最近10个备份
ls -t "$BACKUP_DIR"/dev-*.db | tail -n +11 | xargs rm -f 2>/dev/null || true
echo "[$(date)] 数据库已备份" >> $LOG

# 2. 拉取新代码
cd "$APP_DIR"
git pull origin main >> $LOG 2>&1
echo "[$(date)] 代码已更新" >> $LOG

# 3. 重新构建
npm run build >> $LOG 2>&1
echo "[$(date)] 构建完成" >> $LOG

# 4. 重启服务
sudo systemctl restart alpha-arena
echo "[$(date)] 服务已重启" >> $LOG
echo "[$(date)] 升级完成 ✓" >> $LOG
