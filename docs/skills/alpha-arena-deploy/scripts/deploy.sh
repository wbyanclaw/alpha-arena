#!/bin/bash
# alpha-arena 部署脚本
set -e

PROJECT_DIR="/home/wbyan/workspaces/coder/alpha-arena"
LOG_FILE="/tmp/next-prod.log"

cd "$PROJECT_DIR"

echo "[deploy] 停止旧进程..."
pkill -f "next" 2>/dev/null || true
sleep 2

echo "[deploy] 构建生产版本..."
npm run build

echo "[deploy] 启动生产服务..."
npm start > "$LOG_FILE" 2>&1 &
sleep 8

echo "[deploy] 验证 API..."
curl -sf http://localhost:3000/api/leaderboard?period=total > /dev/null && echo "[deploy] ✓ 服务正常" || echo "[deploy] ✗ 服务异常"

echo "[deploy] 日志: tail -f $LOG_FILE"
