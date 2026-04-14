# alpha-arena-deploy

Next.js 项目在 YAN-NUC (WSL) 上的开发与生产部署规范。

---

## 双环境分离

| 环境 | 数据库 | 端口 | 用途 |
|------|---------|------|------|
| 开发 `.env` | `prisma/dev.db` | 3000 | 本地调试 |
| 生产 `.env.production` | `prisma/prod.db` | 3000 | 公网服务 |

**关键原则：dev 和 prod 数据库完全隔离，互不影响。**

---

## 开发流程

```bash
cd ~/workspaces/coder/alpha-arena

# 1. 开发
npm run dev   # 使用 dev.db，可随意操作

# 2. 确认没问题后，提交代码
git add . && git commit -m "fix: ..."
git push
```

---

## 生产部署

```bash
# 在 internuc WSL 上执行
cd ~/workspaces/coder/alpha-arena
git pull

# 一键部署（自动备份 prod.db + 构建 + 重启）
./docs/skills/alpha-arena-deploy/scripts/deploy.sh
```

---

## systemd 服务（生产）

```bash
# 安装/更新服务
sudo cp docs/skills/alpha-arena-deploy/scripts/alpha-arena.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable alpha-arena
sudo systemctl start alpha-arena

# 常用命令
sudo systemctl status alpha-arena           # 状态
sudo systemctl restart alpha-arena           # 重启
sudo journalctl -u alpha-arena -f         # 日志
```

---

## 数据库备份

```bash
# 手动备份
./docs/skills/alpha-arena-deploy/scripts/backup-db.sh

# 自动备份（每天凌晨2点）
(crontab -l 2>/dev/null; echo "0 2 * * * $HOME/workspaces/coder/alpha-arena/docs/skills/alpha-arena-deploy/scripts/backup-db.sh") | crontab -
```

---

## 回滚

```bash
# 1. 停止服务
sudo systemctl stop alpha-arena

# 2. 恢复数据库
cp backups/prod-YYYYMMDD-HHMMSS.db prisma/prod.db

# 3. 回滚代码
git reset --hard <commit-hash>
npm run build

# 4. 重启
sudo systemctl start alpha-arena
```
