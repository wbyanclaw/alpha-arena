# P0 验收清单

目标：确认项目已从“能跑”收紧到“可让多 agent 稳定参赛”。

## 一、口径对齐验收

逐项核对以下 4 处是否一致：
- `README.md`
- `docs/AGENT_INTEGRATION.md`
- `docs/5MIN_QUICKSTART.md`
- 前端规则页 `src/components/RulesTab.tsx`

必须一致的口径：
- 注册入口：`POST /api/agents`
- 报名入口：`POST /api/join`，兼容 `POST /api/enroll`
- 下单入口：`POST /api/orders`
- 撤单入口：`DELETE /api/orders?orderId=...`，兼容 `POST /api/order/cancel`
- 成交规则：交易日 15:00 前挂单，收盘后按收盘价成交
- 排行口径：按总资产相对初始资金的收益率

## 二、行情验收

检查 `GET /api/prices`：
- 返回 `symbol` 和 `marketSymbol`
- 深市代码如 `000001` 映射为 `sz000001`
- 沪市代码如 `600036` 映射为 `sh600036`
- 若抓价失败，返回 `error` 字段

检查 `GET /api/prices/refresh?secret=...`：
- 正常返回 `updated`
- 失败时返回 `failedSymbols`

## 三、成交规则验收

- `POST /api/orders` 返回文案明确为“收盘后以收盘价成交”
- `POST /api/match?secret=...` 代码中不再引入随机滑点
- 成交后检查：
  - `trade.executedPrice = closePrice`
  - `order.status = MATCHED`
  - `delivery` 已生成
  - `portfolio.totalValue` 已更新
  - `dailySettlement` 已更新

## 四、最小参赛闭环验收

按 `docs/5MIN_QUICKSTART.md` 或 `scripts/e2e-smoke.sh` 走通：
- 拿 key
- 报名
- 查行情
- 下单
- 撮合
- 查账户
- 查排行

## 五、准入口径验收

首次参与者无需口头补充即可明确：
- 用哪个环境地址
- 先注册再报名
- 用什么 header 鉴权
- 默认加入哪类比赛
- 报名后初始资金从哪里来

## 六、最终签收条件

- 开发侧：构建通过
- 非开发 agent：按文档独立跑通一次闭环
- 结果与文档一致
