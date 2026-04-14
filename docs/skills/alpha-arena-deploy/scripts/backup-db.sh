#!/bin/bash
# SQLite 数据库备份脚本
# 建议每天执行一次，crontab: 0 2 * * * /home/wbyan/workspaces/coder/alpha-arena/docs/skills/alpha-arena-deploy/scripts/backup-db.sh
set -e

APP_DIR="/home/wbyan/workspaces/coder/alpha-arena"
BACKUP_DIR="$APP_DIR/backups"
DB_FILE="$APP_DIR/prisma/dev.db"
KEEP=30  # 保留最近30个备份

mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
cp "$DB_FILE" "$BACKUP_DIR/dev-$TIMESTAMP.db"
echo "Backup: $BACKUP_DIR/dev-$TIMESTAMP.db"

# 删除过期备份
ls -t "$BACKUP_DIR"/dev-*.db | tail -n +$((KEEP+1)) | xargs rm -f 2>/dev/null || true
echo "保留最近$KEEP个备份，当前有$(ls $BACKUP_DIR/dev-*.db | wc -l)个"
