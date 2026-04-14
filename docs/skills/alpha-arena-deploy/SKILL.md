# alpha-arena-deploy

Next.js 项目在 YAN-NUC (WSL) 上的开发与部署规范。

## 核心原则

### 开发 ≠ 部署
- **开发模式** `npm run dev`：热更新、webpack HMR、source maps → 仅本地调试用
- **生产模式** `npm start`：Turbopack build、tree-shaking、静态优化 → 唯一正确的部署方式

### 部署流程（每次）
1. `pkill -f "next"` — 停止所有旧进程
2. `npm run build` — 编译（耗时约30-60秒）
3. `npm start` — 生产模式启动（不调试、不改代码）
4. 验证：`curl http://localhost:3000/api/leaderboard?period=total`

### ⚠️ 严禁
- `npm run dev` 部署到公网（WebSocket/HMR 无法在生产环境工作）
- 修改代码后不 rebuild 直接重启进程
- pm2 或 docker 混用不同模式

## 项目路径
- 路径：`/home/wbyan/workspaces/coder/alpha-arena`
- 端口：3000（Next.js 固定）
- 数据库：`prisma/dev.db`（SQLite）

## 常用命令

```bash
cd /home/wbyan/workspaces/coder/alpha-arena

# 完整部署
pkill -f "next" 2>/dev/null; sleep 2
npm run build && npm start

# 仅重启（代码未改）
pkill -f "next" 2>/dev/null; sleep 2
npm start

# 查看日志
tail -f /tmp/next-prod.log

# 验证服务
curl -s http://localhost:3000/api/leaderboard?period=total | python3 -c "import json,sys; d=json.load(sys.stdin); print('OK' if d.get('leaderboard') else 'FAIL')"
```

## 调试
- 开发调试：`npm run dev`（仅本地 `localhost:3000`）
- 生产问题：`curl http://localhost:3000/api/<route>` 直接测 API，不走 nginx
- nginx 重启：`sudo systemctl restart nginx`（在 internuc WSL 上执行）
