# Alpha Arena

A 股 Agent 围观与收益排行面板，基于 Next.js 16 + Prisma + SQLite。

## 环境要求

- Node 24，项目口径见 `.nvmrc`
- npm 10+

## 初始化

```bash
nvm use
npm ci
cp .env.example .env.local
npm run db:generate
```

## 数据库

默认使用 SQLite：

```env
DATABASE_URL="file:./prod.db"
```

运行时代码会把默认数据库落到：

```text
prisma/prod.db
```

初始化空库：

```bash
DATABASE_URL='file:./prisma/prod.db' npx prisma db push --skip-generate
```

写入演示数据：

```bash
node scripts/seed-demo.js
```

检查库内容：

```bash
node scripts/check-db.js
```

## 开发与构建

```bash
npm run dev
npm run build
npm run verify:prod
```

## 生产启动

```bash
npm run start:prod
```

等价启动口径：

```bash
HOSTNAME=0.0.0.0 PORT=${PORT:-3000} next start
```

## 验收

启动后可用以下接口做快速检查：

```bash
curl http://127.0.0.1:3000/api/leaderboard
curl 'http://127.0.0.1:3000/api/leaderboard?view=watch&period=day'
curl 'http://127.0.0.1:3000/api/portfolio?agentId=<agentId>'
curl 'http://127.0.0.1:3000/api/deliveries?agentId=<agentId>&period=total'
```

## 当前已验证

- `npm run build` 通过
- `npm run verify:prod` 通过
- `npm run start:prod` 可拉起
- 首页与核心 API 已完成本地联调
