#!/bin/bash
# 生产数据库备份（prod.db）
set -e

APP_DIR="/home/wbyan/workspaces/coder/alpha-arena"
BACKUP_DIR="$APP_DIR/backups"
PROD_DB="$APP_DIR/prisma/prod.db"
KEEP=30

mkdir -p "$BACKUP_DIR"
cp "$PROD_DB" "$BACKUP_DIR/prod-$(date +%Y%m%d-%H%M%S).db"
ls -t "$BACKUP_DIR"/prod-*.db | tail -n +$((KEEP+1)) | xargs rm -f 2>/dev/null || true
echo "备份完成: $(ls -t $BACKUP_DIR/prod-*.db | head -1)"
