# alpha-arena-deploy

YAN-NUC (WSL) 上的开发与生产环境分离方案。

---

## 架构

```
nginx :80/:443  →  :3000 (prod，永远不变)
                           ↓
               systemd alpha-arena (npm start)
               
dev  →  npm run dev :3001  (本地调试用，不走nginx)
```

---

## 环境隔离

| 环境 | 端口 | 触发方式 | 数据库 |
|------|------|---------|--------|
| **生产** | `:3000` | `sudo systemctl start alpha-arena` | `prod.db` |
| **开发** | `:3001` | `npm run dev` | `dev.db` |

- **外部访问永远走 nginx → :3000**，dev 分支改动不影响生产
- dev 和 prod 代码完全一致（同一 main 分支），只是配置文件不同

---

## 首次安装

```bash
cd ~/workspaces/coder/alpha-arena
git pull

# 1. 创建 prod 数据库（从 dev 复制）
cp prisma/dev.db prisma/prod.db

# 2. 创建 .env.production（不进 git）
cat > .env.production << 'EOF'
DATABASE_URL="file:./prisma/prod.db"
CRON_SECRET=arena_refresh_673672868307ab2bb5f60cd05639b58b
EOF

# 3. 安装 systemd 服务
sudo cp docs/skills/alpha-arena-deploy/scripts/alpha-arena.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable alpha-arena
sudo systemctl start alpha-arena

# 4. 设置自动备份
(crontab -l 2>/dev/null; echo "0 2 * * * $HOME/workspaces/coder/alpha-arena/docs/skills/alpha-arena-deploy/scripts/backup-db.sh") | crontab -
```

---

## 开发流程

```bash
# 在 3001 启动 dev 服务，浏览器访问 http://192.168.71.142:3001
cd ~/workspaces/coder/alpha-arena
npm run dev -- -p 3001
```

修改代码、热更新、调试，随便折腾。不影响 :3000 的生产服务。

---

## 生产部署（发布新版本）

```bash
cd ~/workspaces/coder/alpha-arena
git pull
./docs/skills/alpha-arena-deploy/scripts/deploy.sh
```

deploy.sh 会：备份 prod.db → 构建 → 重启 systemd 服务。

---

## 常用运维命令

```bash
# 服务管理
sudo systemctl status alpha-arena    # 查看状态
sudo systemctl restart alpha-arena     # 重启
sudo journalctl -u alpha-arena -f      # 实时日志

# 备份
./docs/skills/alpha-arena-deploy/scripts/backup-db.sh

# 回滚：恢复备份数据库
cp backups/prod-YYYYMMDD-HHMMSS.db prisma/prod.db
sudo systemctl restart alpha-arena
```

---

## 目录结构

```
alpha-arena/
├── prisma/
│   ├── dev.db       # 开发数据库（npm run dev 用）
│   └── prod.db      # 生产数据库（systemd 用）
├── .env             # 开发配置（dev.db）
└── .env.production # 生产配置（prod.db，不进 git）
```
