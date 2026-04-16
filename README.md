<div align="center">

# Crucix

**你的专属智能终端。27个数据源。一条命令。零云端依赖。**

## [访问官网: crucix.live](https://www.crucix.live/)

[![Live Website](https://img.shields.io/badge/live-crucix.live-00d4ff?style=for-the-badge)](https://www.crucix.live/)
[![Open Demo](https://img.shields.io/badge/open-live%20dashboard-0b1220?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.crucix.live/)

[![Node.js 22+](https://img.shields.io/badge/node-22%2B-brightgreen)](#快速开始)
[![License: AGPL v3](https://img.shields.io/badge/license-AGPLv3-blue.svg)](LICENSE)
[![Dependencies](https://img.shields.io/badge/dependencies-1%20(express)-orange)](#架构)
[![Sources](https://img.shields.io/badge/OSINT%20sources-27-cyan)](#数据源-27个)
[![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)](#docker)

**进入信号网络**

[![Signal Wire](https://img.shields.io/badge/Signal%20Wire-%40crucixmonitor-111111?style=for-the-badge&logo=x&logoColor=white)](https://x.com/crucixmonitor)
[![Ops Room](https://img.shields.io/badge/Ops%20Room-Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/ChVy7SF4)

![Crucix Dashboard](docs/dashboard.png)

<details>
<summary>更多截图</summary>

| 启动序列 | 世界地图 |
|:---:|:---:|
| ![Boot](docs/boot.png) | ![Map](docs/map.png) |

| 3D 地球视图 |
|:---:|
| ![Globe](docs/globe.png) |

</details>

</div>

> **语言:** 🇨🇳 简体中文 | [🇺🇸 English](README.en.md)
> 
> **在线网站:** [https://www.crucix.live/](https://www.crucix.live/)
> 先体验公开演示，然后克隆仓库到本地运行完整版本。

Crucix 从27个开源情报源并行拉取卫星火灾检测、航班追踪、辐射监测、卫星星座跟踪、经济指标、实时市场价格、冲突数据、制裁名单和社会情绪数据 —— 每15分钟更新一次 —— 并将所有信息呈现在一个独立的 Jarvis 风格仪表板上。

连接 LLM 后，它就变成了**双向智能助手** —— 当发生重大变化时向 Telegram 和 Discord 推送多级警报，响应手机发送的 `/brief` 和 `/sweep` 等命令，并基于真实跨领域数据生成可操作的交易思路。这是你专属的分析师，在你睡觉时也能持续监控世界动态。

先在 [https://www.crucix.live/](https://www.crucix.live/) 体验在线演示，然后克隆仓库获取完整的本地服务。

无需云端。无需遥测。无需订阅。只需要 `node server.mjs` 即可启动。

## 代币/资产警告

> [!WARNING]
> **Crucix 尚未发行任何官方代币、币、NFT、空投、预售或其他区块链资产。**
> 任何使用 Crucix 名称、Logo或品牌的代币或数字资产均不属于 Crucix 或未经 Crucix 授权。
> 请勿基于第三方帖子、私信或网站购买、推广、连接钱包认领、签名交易或转账。

---

## 为什么创建这个项目

世界上大多数实时情报 —— 卫星图像、辐射水平、冲突事件、经济指标、航班追踪、海上活动 —— 都是公开可得的。只是分散在几十个政府 API、研究机构和开放数据源中，没人有时间逐一检查。

Crucix 将所有这些整合到一个地方。不设在付费墙后，不锁定在企业平台中，不需要安全许可。就是开放数据，在你自己的机器上聚合和互相关联，每15分钟更新一次。

它为那些想要真正了解当下世界正在发生什么的人而建 —— 研究人员、记者、交易员、OSINT 分析师，或是相信信息获取不应取决于预算的好奇人士。

---

## 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/calesthio/Crucix.git
cd Crucix

# 2. 安装依赖（仅 Express）
npm install

# 3. 复制环境模板并添加你的 API 密钥（见下文）
cp .env.example .env

# 4. 启动仪表板
npm run dev
```

> **如果 `npm run dev` 静默失败**（无输出退出），请直接运行 Node：
> ```bash
> node --trace-warnings server.mjs
> ```
> 这会绕过 npm 的脚本运行器，它在某些系统上（特别是 Windows 上的 PowerShell）可能会吞掉错误。你也可以运行 `node diag.mjs` 来诊断具体问题 —— 它会检查你的 Node 版本，逐个测试每个模块导入，并验证端口可用性。更多信息见 [故障排查](#故障排查)。

仪表板会自动在 `http://localhost:3117` 打开，并立即开始第一次情报收集。初始收集会并行查询全部27个数据源，通常需要30–60秒 —— 在收集完成并推送第一次数据更新之前，仪表板将显示为空。之后，它会通过 SSE（服务器发送事件）每15分钟自动刷新。无需手动刷新页面。

**要求:** Node.js 22+（使用原生 `fetch`、顶级 `await`、ESM）

### Docker

```bash
git clone https://github.com/calesthio/Crucix.git
cd Crucix
cp .env.example .env    # 添加你的 API 密钥
docker compose up -d
```

仪表板访问地址 `http://localhost:3117`。收集数据通过数据卷持久保存在 `./runs/` 目录。包含健康检查端点。

---

## 你能获得什么

### 实时仪表板
独立的 Jarvis 风格 HUD，包含：
- **3D WebGL 地球**（Globe.gl），带有大气光晕、星空和平滑旋转 —— 还支持经典平面地图切换
- **9种标记类型**，覆盖两种视图：火灾探测、空中交通、辐射站点、海上咽喉要道、SDR 接收器、OSINT 事件、健康警报、地理定位新闻、冲突事件
- **动画3D航班走廊弧线**，连接空中交通热点和全球枢纽
- **区域筛选**（全球、美洲、欧洲、中东、亚太、非洲）—— 旋转地球或缩放平面地图
- **实时市场数据** —— 指数、加密货币、能源、大宗商品，通过 Yahoo Finance（无需 API 密钥）
- **风险指标** —— VIX、高收益利差、供应链压力指数
- **OSINT 信息流** —— 来自17个 Telegram 情报频道的英文帖子（可展开）
- **新闻滚动条** —— 合并 RSS + GDELT 头条 + Telegram 帖子，自动滚动
- **收集增量** —— 实时面板显示自上次收集以来的变化（新信号、升级、降级，附带严重程度）
- **跨源信号** —— 跨卫星、经济、冲突和社会领域的相关情报
- **核监控** —— 来自 Safecast + EPA RadNet 的实时辐射读数
- **太空监控** —— CelesTrak 卫星跟踪：最近发射、ISS、军事星座、Starlink/OneWeb 计数
- **可交易思路** —— AI 生成的交易思路（使用 LLM）或信号相关思路（不使用 LLM）

### 性能模式
顶栏中的 `VISUALS FULL` / `VISUALS LITE` 按钮仅改变渲染行为 —— 它**不会**移除数据源或降低收集覆盖范围。

当你切换到 **VISUALS LITE** 时，仪表板：
- 禁用装饰性背景效果，如径向/网格覆盖和扫描线
- 移除面板和覆盖层上昂贵的模糊/背景滤镜效果
- 停止非必要动画，如 Logo 环闪烁、冲突环和走廊流动效果
- 禁用地球自动旋转并关闭动画飞线虚线
- 将水平新闻滚动条和 OSINT 流转换为静态、可滚动列表，而不是连续动画字幕

移动端特定行为：
- 在移动设备上，`VISUALS LITE` 还会强制仪表板进入**平面地图模式**（如果你当前在地球模式）
- 未来移动加载将在低性能模式启用时默认从平面开始

偏好设置保存在浏览器本地存储中，因此 UI 会记住你上次的设置。

### 自动刷新
服务器每15分钟运行一次收集周期（可配置）。每个周期：
1. 并行查询全部27个数据源（约30秒）
2. 将原始数据合成为仪表板格式
3. 计算与上一次运行的增量（变化内容、升级、降级）—— 可在仪表板的**收集增量**面板中查看
4. 生成 LLM 交易思路（如果已配置）
5. 评估突发新闻警报 —— 多级（FLASH / PRIORITY / ROUTINE），带语义去重。如果配置了 Telegram 和/或 Discord，就会推送。支持 LLM 评估，当 LLM 不可用时回退到基于规则的警报。
6. 通过 SSE 推送更新到所有已连接的浏览器

### Telegram 机器人（双向）
Crucix 同时也是一个交互式 Telegram 机器人。除了发送警报，它还能直接从你的聊天中响应命令：

| 命令 | 功能 |
|---------|-------------|
| `/status` | 系统健康、上次收集时间、源状态、LLM 状态 |
| `/sweep` | 触发手动收集周期 |
| `/brief` | 最新情报的压缩文本摘要（方向、关键指标、顶级 OSINT） |
| `/portfolio` | 投资组合状态（如果连接了 Alpaca） |
| `/alerts` | 最近警报历史，附带级别 |
| `/mute` / `/mute 2h` | 静默警报1小时（或自定义时长） |
| `/unmute` | 恢复警报 |
| `/help` | 显示所有可用命令 |

这需要在 `.env` 中配置 `TELEGRAM_BOT_TOKEN` 和 `TELEGRAM_CHAT_ID`。机器人每5秒轮询一次消息（可通过 `TELEGRAM_POLL_INTERVAL` 配置）。

### Discord 机器人（双向）

Crucix 还支持 Discord 作为全功能机器人，带有斜杠命令和富嵌入警报。它反映了 Telegram 机器人的功能，并使用 Discord 原生格式。

| 命令 | 功能 |
|---------|-------------|
| `/status` | 系统健康、上次收集时间、源状态、LLM 状态 |
| `/sweep` | 触发手动收集周期 |
| `/brief` | 最新情报的压缩文本摘要 |
| `/portfolio` | 投资组合状态（如果连接了 Alpaca） |

警报以富嵌入形式传递，带有彩色侧边栏：红色表示 FLASH，黄色表示 PRIORITY，蓝色表示 ROUTINE。每个嵌入都包含信号详情、置信度分数和跨域相关性。

**设置需要:** `DISCORD_BOT_TOKEN`、`DISCORD_CHANNEL_ID`，可选 `DISCORD_GUILD_ID` 用于即时斜杠命令注册。详情见 [API 密钥设置](#api-密钥设置)。

**Webhook 回退:** 如果你不想运行完整机器人，可以设置 `DISCORD_WEBHOOK_URL`。这支持单向警报（无斜杠命令），零依赖 —— 不需要 `discord.js`。

**可选依赖:** 完整机器人需要 `discord.js`。使用 `npm install discord.js` 安装。如果未安装，Crucix 会自动回退到仅 Webhook 模式。

### 可选 LLM 层
连接8个 LLM 提供商中的任意一个来增强分析：
- **AI 交易思路** —— 定量分析师生成5-8个引用具体数据的可操作思路
- **更智能的警报评估** —— LLM 将信号分类为 FLASH/PRIORITY/ROUTINE 级别，带有跨域相关性和置信度评分
- **提供商:** Anthropic Claude、OpenAI、Google Gemini、OpenRouter（统一 API）、OpenAI Codex（ChatGPT 订阅）、MiniMax、Mistral、Grok
- **优雅降级** —— 当 LLM 不可用时，基于规则的引擎接管警报评估。LLM 故障不会导致收集周期崩溃。

---

## API 密钥设置

将 `.env.example` 复制到项目根目录的 `.env`：

```bash
cp .env.example .env
```

### 获得最佳效果所必需（全部免费）

| 密钥 | 来源 | 获取方式 |
|-----|--------|------------|
| `FRED_API_KEY` | 美联储经济数据 | [fred.stlouisfed.org](https://fred.stlouisfed.org/docs/api/api_key.html) —— 即时注册，免费 |
| `FIRMS_MAP_KEY` | NASA FIRMS（卫星火灾数据） | [firms.modaps.eosdis.nasa.gov](https://firms.modaps.eosdis.nasa.gov/api/area/) —— 即时注册，免费 |
| `EIA_API_KEY` | 美国能源信息署 | [api.eia.gov](https://www.eia.gov/opendata/register.php) —— 即时注册，免费 |

这三个解锁最有价值的经济和卫星数据。每个注册大约需要60秒。

### 可选（启用额外数据源）

| 密钥 | 来源 | 获取方式 |
|-----|--------|------------|
| `ACLED_EMAIL` + `ACLED_PASSWORD` | 武装冲突事件数据 | [acleddata.com/register](https://acleddata.com/register/) —— 免费，OAuth2 |
| `AISSTREAM_API_KEY` | 海上 AIS 船舶追踪 | [aisstream.io](https://aisstream.io/) —— 免费 |
| `ADSB_API_KEY` | 无过滤航班追踪 | [RapidAPI](https://rapidapi.com/adsbexchange/api/adsbexchange-com1) —— 约$10/月 |

### LLM 提供商（可选，用于 AI 增强思路）

将 `LLM_PROVIDER` 设置为以下之一：`anthropic`、`openai`、`gemini`、`codex`、`openrouter`、`minimax`、`mistral`、`grok`

| 提供商 | 必需密钥 | 默认模型 |
|----------|-------------|---------------|
| `anthropic` | `LLM_API_KEY` | claude-sonnet-4-6 |
| `openai` | `LLM_API_KEY` | gpt-5.4 |
| `gemini` | `LLM_API_KEY` | gemini-3.1-pro |
| `openrouter` | `LLM_API_KEY` | openrouter/auto |
| `codex` | 无（使用 `~/.codex/auth.json`） | gpt-5.3-codex |
| `minimax` | `LLM_API_KEY` | MiniMax-M2.5 |
| `mistral` | `LLM_API_KEY` | mistral-large-latest |
| `grok` | `LLM_API_KEY` | grok-4-latest |

对于 Codex，运行 `npx @openai/codex login` 通过你的 ChatGPT 订阅进行身份验证。

### Telegram 机器人 + 警报（可选）

| 密钥 | 获取方式 |
|-----|------------|
| `TELEGRAM_BOT_TOKEN` | 通过 Telegram 上的 [@BotFather](https://t.me/BotFather) 创建 |
| `TELEGRAM_CHAT_ID` | 通过 [@userinfobot](https://t.me/userinfobot) 获取 |
| `TELEGRAM_CHANNELS` | *(可选)* 逗号分隔的额外频道 ID，用于监控内置17个频道之外的频道 |
| `TELEGRAM_POLL_INTERVAL` | *(可选)* 机器人命令轮询间隔（毫秒）（默认：5000） |

### Discord 机器人 + 警报（可选）

| 密钥 | 获取方式 |
|-----|------------|
| `DISCORD_BOT_TOKEN` | 在 [Discord Developer Portal](https://discord.com/developers/applications) 创建 → Bot → Token |
| `DISCORD_CHANNEL_ID` | 在 Discord 中右键单击频道（开启开发者模式）→ 复制频道 ID |
| `DISCORD_GUILD_ID` | *(可选)* 右键单击服务器 → 复制服务器 ID。启用即时斜杠命令注册（否则全局命令可能需要最多1小时） |
| `DISCORD_WEBHOOK_URL` | *(可选)* 频道设置 → 集成 → Webhooks → 新建 Webhook → 复制 URL。用于仅警报模式，无需机器人 |

**Discord 机器人设置:**
1. 前往 [Discord Developer Portal](https://discord.com/developers/applications) 创建新应用
2. 前往 **Bot** → 点击 **Reset Token** → 将令牌复制到 `DISCORD_BOT_TOKEN`
3. 在 **Privileged Gateway Intents** 下，启用 **Message Content Intent**
4. 前往 **OAuth2** → **URL Generator** → 选择 `bot` + `applications.commands` 范围 → 选择 `Send Messages` + `Embed Links` 权限
5. 复制生成的 URL 并在浏览器中打开，邀请机器人加入你的服务器
6. 安装依赖：`npm install discord.js`

无论是否配置 LLM，Telegram 和 Discord 都支持警报。配置 LLM 后，信号评估更丰富，更具上下文感知能力。没有 LLM 时，确定性规则引擎会根据严重性、跨域相关性和信号计数评估信号。

### 不使用任何密钥

Crucix 在零 API 密钥情况下仍能工作。18+ 个数据源根本不需要认证。需要密钥的数据源会返回结构化错误，其余收集过程正常继续。

---

## 架构

```
crucix/
├── server.mjs                 # Express 开发服务器（SSE、自动刷新、LLM、机器人命令）
├── crucix.config.mjs          # 带环境变量覆盖的配置 + 增量阈值
├── diag.mjs                   # 诊断脚本 —— 服务器启动失败时运行
├── .env.example               # 所有已文档化的环境变量
├── package.json               # 运行时：express | 可选：discord.js
├── docs/                      # README 截图
│
├── apis/
│   ├── briefing.mjs           # 主编排 —— 并行运行全部27个源
│   ├── save-briefing.mjs      # CLI：保存带时间戳的 + latest.json
│   ├── BRIEFING_PROMPT.md     # 情报综合协议
│   ├── BRIEFING_TEMPLATE.md   # 简报输出结构
│   ├── utils/
│   │   ├── fetch.mjs          # safeFetch() —— 超时、重试、中止、自动 JSON
│   │   └── env.mjs            # .env 加载器（无 dotenv 依赖）
│   └── sources/               # 27个独立源模块
│       ├── gdelt.mjs          # 每个都导出 briefing() → 结构化数据
│       ├── fred.mjs           # 可以独立运行：node apis/sources/fred.mjs
│       ├── space.mjs          # CelesTrak 卫星跟踪
│       ├── yfinance.mjs       # Yahoo Finance —— 免费实时市场数据
│       └── ...                # 还有23个
│
├── dashboard/
│   ├── inject.mjs             # 数据合成 + 独立 HTML 注入
│   └── public/
│       └── jarvis.html        # 独立 Jarvis HUD
│
├── lib/
│   ├── llm/                   # LLM 抽象（8个提供商，原生 fetch，无 SDK）
│   │   ├── provider.mjs       # 基类
│   │   ├── anthropic.mjs      # Claude
│   │   ├── openai.mjs         # GPT
│   │   ├── gemini.mjs         # Gemini
│   │   ├── grok.mjs           # Grok
│   │   ├── openrouter.mjs     # OpenRouter（统一 API）
│   │   ├── codex.mjs          # Codex（ChatGPT 订阅）
│   │   ├── minimax.mjs        # MiniMax（M2.5，204K 上下文）
│   │   ├── mistral.mjs        # Mistral AI
│   │   ├── ideas.mjs          # LLM 驱动的交易思路生成
│   │   └── index.mjs          # 工厂：createLLMProvider()
│   ├── delta/                 # 收集之间的变更跟踪
│   │   ├── engine.mjs         # 增量计算 —— 语义去重、可配置阈值、严重性评分
│   │   ├── memory.mjs         # 热内存（3次运行，原子写入）+ 冷存储（每日归档）
│   │   └── index.mjs          # 重新导出
│   └── alerts/
│       ├── telegram.mjs       # 多级警报（FLASH/PRIORITY/ROUTINE）+ 双向机器人命令
│       └── discord.mjs        # Discord 机器人（斜杠命令、富嵌入）+ Webhook 回退
│
└── runs/                      # 运行时数据（被 git 忽略）
    ├── latest.json            # 最新收集输出
    └── memory/                # 增量内存（hot.json + cold/YYYY-MM-DD.json）
```

### 设计原则
- **纯 ESM** —— 每个文件都是 `.mjs`，带有显式导入
- **最小依赖** —— Express 是唯一的运行时依赖。`discord.js` 是可选的（用于 Discord 机器人）。LLM 提供商使用原生 `fetch()`，无需 SDK。
- **并行执行** —— `Promise.allSettled()` 同时触发全部27个源
- **优雅降级** —— 缺失密钥产生错误，而非崩溃。LLM 故障不会终止收集。
- **每个源都是独立的** —— 运行 `node apis/sources/gdelt.mjs` 可独立测试任何源
- **独立仪表板** —— HTML 文件无论有无服务器都能工作

---

## 数据源（27个）

### 一级：核心 OSINT 与地缘政治（11个）

| 源 | 跟踪内容 | 认证 |
|--------|---------------|------|
| **GDELT** | 全球新闻事件、冲突制图（100+ 语言） | 无 |
| **OpenSky** | 6个热点区域的实时 ADS-B 航班追踪 | 无 |
| **NASA FIRMS** | 卫星火灾/热异常检测（3小时延迟） | 免费密钥 |
| **Maritime/AIS** | 船舶追踪、黑船、制裁逃避 | 免费密钥 |
| **Safecast** | 6个核设施附近的公民科学辐射监测 | 无 |
| **ACLED** | 武装冲突事件：战斗、爆炸、抗议 | 免费（OAuth2）|
| **ReliefWeb** | 联合国人道主义危机追踪 | 无 |
| **WHO** | 疾病爆发和卫生紧急情况 | 无 |
| **OFAC** | 美国财政部制裁（SDN 列表） | 无 |
| **OpenSanctions** | 聚合全球制裁（30+ 源） | 部分 |
| **ADS-B Exchange** | 无过滤航班追踪，包括军用 | 付费 |

### 二级：经济与金融（7个）

| 源 | 跟踪内容 | 认证 |
|--------|---------------|------|
| **FRED** | 22个关键指标：收益率曲线、CPI、VIX、联邦基金利率、M2 | 免费密钥 |
| **US Treasury** | 国债、收益率、财政数据 | 无 |
| **BLS** | CPI、失业率、非农就业、PPI | 无 |
| **EIA** | WTI/Brent 原油、天然气、库存 | 免费密钥 |
| **GSCPI** | 纽约美联储全球供应链压力指数 | 无 |
| **USAspending** | 联邦支出和国防合同 | 无 |
| **UN Comtrade** | 大国之间的战略商品贸易流动 | 无 |

### 三级：天气、环境、科技、社会、信号情报（7个）

| 源 | 跟踪内容 | 认证 |
|--------|---------------|------|
| **NOAA/NWS** | 美国活跃天气警报 | 无 |
| **EPA RadNet** | 美国政府辐射监测 | 无 |
| **USPTO Patents** | 7个战略科技领域的专利申请 | 无 |
| **Bluesky** | 地缘政治/市场主题的社会情绪 | 无 |
| **Reddit** | 关键子版块的社会情绪 | OAuth |
| **Telegram** | 17个精选 OSINT/冲突/金融频道（网页抓取，可通过配置扩展） | 无 |
| **KiwiSDR** | 全球 HF 无线电接收网络（约600个接收器） | 无 |

### 四级：太空与卫星（1个）

| 源 | 跟踪内容 | 认证 |
|--------|---------------|------|
| **CelesTrak** | 卫星发射、ISS 跟踪、军事星座、Starlink/OneWeb 计数 | 无 |

### 五级：实时市场数据（1个）

| 源 | 跟踪内容 | 认证 |
|--------|---------------|------|
| **Yahoo Finance** | 实时价格：SPY、QQQ、BTC、黄金、WTI、VIX + 另外9种 | 无 |

---

## npm 脚本

| 脚本 | 命令 | 描述 |
|--------|---------|-------------|
| `npm run dev` | `node --trace-warnings server.mjs` | 启动仪表板并自动刷新 |
| `npm run sweep` | `node apis/briefing.mjs` | 运行单次收集，输出 JSON 到标准输出 |
| `npm run inject` | `node dashboard/inject.mjs` | 将最新数据注入静态 HTML |
| `npm run brief:save` | `node apis/save-briefing.mjs` | 运行收集 + 保存带时间戳的 JSON |
| `npm run diag` | `node diag.mjs` | 运行诊断（Node 版本、导入、端口检查） |

---

## 配置

所有设置都在 `.env` 中，并提供合理的默认值：

| 变量 | 默认值 | 描述 |
|----------|---------|-------------|
| `PORT` | `3117` | 仪表板服务器端口 |
| `REFRESH_INTERVAL_MINUTES` | `15` | 自动刷新间隔 |
| `LLM_PROVIDER` | disabled | `anthropic`、`openai`、`gemini`、`codex`、`openrouter`、`minimax`、`mistral` 或 `grok` |
| `LLM_API_KEY` | — | API 密钥（codex 不需要） |
| `LLM_MODEL` | 每个提供商默认 | 覆盖模型选择 |
| `TELEGRAM_BOT_TOKEN` | disabled | 用于 Telegram 警报 + 机器人命令 |
| `TELEGRAM_CHAT_ID` | — | 你的 Telegram 聊天 ID |
| `TELEGRAM_CHANNELS` | — | 要监控的额外频道 ID（逗号分隔） |
| `TELEGRAM_POLL_INTERVAL` | `5000` | 机器人命令轮询间隔（毫秒） |
| `DISCORD_BOT_TOKEN` | disabled | 用于 Discord 警报 + 斜杠命令 |
| `DISCORD_CHANNEL_ID` | — | Discord 警报频道 |
| `DISCORD_GUILD_ID` | — | 服务器 ID（即时斜杠命令注册） |
| `DISCORD_WEBHOOK_URL` | — | Webhook URL（仅警报回退，无需机器人） |

增量引擎阈值（系统对收集之间变化的敏感度）可以在 `crucix.config.mjs` 的 `delta.thresholds` 部分自定义。默认值经过调优，可在过滤噪音的同时捕捉有意义的变动。

---

## API 端点

运行 `npm run dev` 时：

| 端点 | 描述 |
|----------|-------------|
| `GET /` | Jarvis HUD 仪表板 |
| `GET /api/data` | 当前综合情报数据（JSON）|
| `GET /api/health` | 服务器状态、运行时间、源计数、LLM 状态 |
| `GET /events` | SSE 流，用于实时推送更新 |

---

## 故障排查

### `npm run dev` 静默退出（无输出，无错误）

这是一个已知问题，npm 的脚本运行器可能会吞掉错误，特别是在 Windows PowerShell 上。请按顺序尝试以下方法：

**1. 直接运行 Node（绕过 npm）：**
```bash
node --trace-warnings server.mjs
```
这在功能上等同于 `npm run dev`，但为你提供完整的错误输出。

**2. 运行诊断脚本：**
```bash
node diag.mjs
```
这会逐个测试每个导入，检查你的 Node.js 版本，并验证 3117 端口是否可用。它会告诉你到底哪里出了问题。

**3. 检查 3117 端口是否已被占用：**

之前的 Crucix 实例可能仍在后台运行。

```powershell
# Windows PowerShell
netstat -ano | findstr 3117
taskkill /F /PID <上面得到的_PID>

# 或者杀死所有 Node 进程
taskkill /F /IM node.exe
```

```bash
# macOS / Linux
lsof -ti:3117 | xargs kill
```

然后再次尝试启动。你也可以通过在 `.env` 文件中设置 `PORT=3118` 来更改端口。

**4. 检查 Node.js 版本：**
```bash
node --version
```
Crucix 需要 Node.js 22 或更高版本。如果你使用的是旧版本，请从 [nodejs.org](https://nodejs.org/) 下载最新的 LTS。

### 首次启动后仪表板显示空面板

这是正常的 —— 第一次收集需要30–60秒来查询全部27个数据源。一旦收集完成，仪表板会自动填充。在终端查看收集进度日志。

### 某些源显示错误

这是预期行为。需要 API 密钥的源如果未设置密钥，会返回结构化错误。其余收集过程正常继续。在仪表板的"源完整性"部分（或服务器日志中）查看哪些源失败以及原因。最值得添加的3个免费密钥是 `FRED_API_KEY`、`FIRMS_MAP_KEY` 和 `EIA_API_KEY`。

OpenSky 在公共热点被过于频繁查询时也可能返回 `HTTP 429`。Crucix 不会尝试规避这个限制。相反，它会在源健康中显示限流/错误，并保留 `runs/` 中最新的非空中交通快照，因此在限流收集时仪表板航班层不会突然变空白。

### Telegram 机器人不响应命令

确保 `.env` 中同时设置了 `TELEGRAM_BOT_TOKEN` 和 `TELEGRAM_CHAT_ID`。机器人只响应来自配置的聊天 ID 的消息（安全措施）。启动时，你应该在服务器日志中看到 `[Crucix] Telegram alerts enabled` 和 `[Crucix] Bot command polling started`。如果没有，请使用 `curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe` 再次检查你的令牌。

### Discord 机器人不响应斜杠命令

按顺序检查以下内容：
1. 确保 `DISCORD_BOT_TOKEN` 和 `DISCORD_CHANNEL_ID` 在 `.env` 中设置
2. 验证 `discord.js` 已安装：`npm ls discord.js`。如果缺失，请运行 `npm install discord.js`
3. 如果斜杠命令不出现，请设置 `DISCORD_GUILD_ID` —— 没有它，全局命令可能需要长达1小时才能传播。特定服务器命令会立即注册
4. 确认机器人是使用 `bot` + `applications.commands` 范围邀请的，并且在目标频道拥有 `Send Messages` + `Embed Links` 权限
5. 启动时检查服务器日志中是否有 `[Discord] Bot logged in as ...`。如果你看到 `[Discord] discord.js not installed`，请安装它并重启
6. **仅 Webhook 回退：** 如果你只想要警报而不需要斜杠命令，请设置 `DISCORD_WEBHOOK_URL` 而不是机器人令牌。不需要 `discord.js`。

---

## 截图

`docs/` 文件夹包含此 README 引用的仪表板截图：

| 文件 | 描述 |
|------|-------------|
| `docs/dashboard.png` | 完整仪表板 —— 此 README 顶部的主图 |
| `docs/boot.png` | 电影感启动序列动画 |
| `docs/map.png` | D3 世界地图，带有标记类型和飞线 |
| `docs/globe.png` | 3D WebGL 地球视图，带有大气光晕和标记 |

要更新它们：运行仪表板，等待收集完成，然后使用浏览器的 DevTools（`F12` → `Ctrl+Shift+P` → "Capture full size screenshot"）或像 [LICEcap](https://www.cockos.com/licecap/) 这样的工具来截取 GIF。

---

## 贡献

发现了 bug？想要添加第28个源？欢迎 PR。每个源都是 `apis/sources/` 中的独立模块 —— 只需导出一个 `briefing()` 函数，返回结构化数据，然后将其添加到 `apis/briefing.mjs` 中的编排器即可。

如果你觉得这个项目有用，点亮 star 有助于更多人发现它。

有关贡献指南、预期和源添加规则，请参阅 `CONTRIBUTING.md`。安全报告，请参阅 `SECURITY.md`。

## 联系方式

关于合作、集成或其他非问题咨询，可以发送邮件到 `celesthioailabs@gmail.com`。

关于错误和功能请求，请使用 GitHub Issues，这样讨论保持可见且可操作。

---

## Star 历史

<a href="https://www.star-history.com/?repos=calesthio%2FCrucix&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=calesthio/Crucix&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=calesthio/Crucix&type=date&legend=top-left" />
    <img alt="Star History Chart" src="https://api.star-history.com/image?repos=calesthio/Crucix&type=date&legend=top-left" />
  </picture>
</a>

---

## 许可证

AGPL-3.0