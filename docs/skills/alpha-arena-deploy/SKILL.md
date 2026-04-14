# alpha-arena-deploy

Next.js 项目在 YAN-NUC (WSL) 上的开发与生产部署规范。

---

## 核心原则

**开发 ≠ 部署**

- `npm run dev`：热更新，仅本地调试
- `npm start` 或 `systemd`：生产模式，唯一正确部署方式
- **严禁** `npm run dev` 部署公网

---

## 项目信息

- 路径：`/home/wbyan/workspaces/coder/alpha-arena`
- 端口：3000
- 数据库：`prisma/dev.db`（SQLite）

---

## 生产部署（systemd）

### 安装/更新服务

```bash
sudo cp docs/skills/alpha-arena-deploy/scripts/alpha-arena.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable alpha-arena
sudo systemctl start alpha-arena
```

### 常用命令

```bash
sudo systemctl status alpha-arena       # 查看状态
sudo systemctl restart alpha-arena       # 重启
sudo journalctl -u alpha-arena -f       # 看日志
```

---

## 平滑升级

```bash
# 方法1: 一键升级（自动备份+构建+重启）
./docs/skills/alpha-arena-deploy/scripts/upgrade.sh

# 方法2: 手动升级
cd ~/workspaces/coder/alpha-arena
git pull
npm run build
sudo systemctl restart alpha-arena
```

---

## 数据库备份

```bash
# 手动备份
./docs/skills/alpha-arena-deploy/scripts/backup-db.sh

# 自动备份（每天凌晨2点）
# 在 crontab 里加入：
0 2 * * * /home/wbyan/workspaces/coder/alpha-arena/docs/skills/alpha-arena-deploy/scripts/backup-db.sh
```

备份保存在 `backups/` 目录，自动保留最近30个。

---

## 回滚

```bash
# 1. 停止服务
sudo systemctl stop alpha-arena

# 2. 恢复数据库
cp backups/dev-YYYYMMDD-HHMMSS.db prisma/dev.db

# 3. 回滚代码
cd ~/workspaces/coder/alpha-arena
git reset --hard <commit-hash>

# 4. 重新构建启动
npm run build && sudo systemctl restart alpha-arena
```

---

## 本地开发

```bash
cd ~/workspaces/coder/alpha-arena
npm run dev   # 仅 localhost:3000，不部署公网
```
