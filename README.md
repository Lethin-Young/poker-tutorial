# Texas Hold'em Poker Tutorial | 德州扑克教程

<p align="center">
  <strong>🃏 An interactive web tutorial to learn Texas Hold'em from scratch</strong><br>
  <strong>🃏 从零开始学习德州扑克的互动式网页教程</strong>
</p>

<p align="center">
  <a href="https://lethin-young.github.io/poker-tutorial/">🌐 Live Demo | 在线演示</a>
</p>

> ⚠️ **Disclaimer | 免责声明**: All chips in this tutorial are for demonstration purposes only. No real money is involved. | 本教程中的所有筹码仅用于演示目的，不涉及任何真实金钱交易。

---

[English](#english) | [中文](#中文)

---

## English

### Overview

This is a fully interactive, browser-based tutorial that teaches beginners how to play Texas Hold'em poker through a step-by-step guided experience. The tutorial includes animated card demonstrations, interactive quizzes, and a practice game against an AI opponent.

### Features

- **7 Progressive Lessons**: From card basics to practice gameplay
- **Interactive Practice Game**: Play against an AI opponent with hints and hand strength indicators
- **Bilingual Support**: Full Chinese/English toggle (中文/EN)
- **Beautiful Design**: Casino-inspired dark theme with gold accents, animated card dealing
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Progress Saving**: Your progress is saved in localStorage
- **No Dependencies**: Pure HTML/CSS/JavaScript, no frameworks or build tools needed

### Tutorial Structure

| # | Lesson | Description |
|---|--------|-------------|
| 0 | **Welcome** | Introduction and feature overview |
| 1 | **Card Basics** | Suits, ranks, and deck composition |
| 2 | **Hand Rankings** | All 10 hand types from Royal Flush to High Card, with interactive quiz |
| 3 | **Table & Positions** | Dealer, Small Blind, Big Blind, and positional advantage |
| 4 | **Game Flow** | Pre-flop → Flop → Turn → River → Showdown with animated demonstrations |
| 5 | **Betting Actions** | Fold, Check, Call, Raise, All-in with strategy tips |
| 6 | **Practice Game** | Play a full hand against AI with hints and hand strength display |

### Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Styling, animations, responsive layout (Flexbox/Grid, CSS custom properties, keyframe animations) |
| **Vanilla JavaScript (ES Modules)** | Application logic, game engine, i18n, DOM manipulation |
| **Google Fonts** | Inter + Noto Sans SC for bilingual typography |
| **GitHub Pages** | Static site hosting and deployment |

### File Structure

```
ToyProject/
├── index.html          # Main HTML page
├── css/
│   └── style.css       # All styles (800+ lines)
├── js/
│   ├── app.js          # Main app entry point, UI management
│   ├── i18n.js         # Internationalization (Chinese/English translations)
│   ├── poker.js        # Poker engine (deck, hand evaluation, AI)
│   └── tutorial.js     # Tutorial lesson rendering & game UI
├── README.md           # This file
└── .claude/
    └── launch.json     # Dev server configuration
```

### How It Was Built — Step by Step

#### Step 1: Project Planning
Designed a 7-lesson tutorial structure covering all essential Texas Hold'em concepts, from card basics to a fully playable practice game.

#### Step 2: HTML Structure (`index.html`)
Created a single-page application with:
- Sticky header with logo and language toggle
- Disclaimer banner about demonstration-only chips
- Sidebar navigation for lesson progress (desktop)
- Mobile horizontal scrollable navigation
- Main content area for dynamic lesson rendering
- Footer with disclaimer

#### Step 3: CSS Design (`css/style.css`)
Built a casino-inspired dark theme using:
- CSS custom properties for consistent theming (dark green felt, gold accents)
- Pure CSS playing card components with suit colors and corner labels
- Card dealing animations (`@keyframes dealCard`)
- Responsive design with breakpoints at 900px and 600px
- CSS-only poker table with radial gradient felt texture
- Interactive hover effects on cards, buttons, and list items

#### Step 4: Internationalization (`js/i18n.js`)
Implemented a lightweight i18n system:
- Complete translations object for both Chinese and English
- `t(key)` function for dot-notation translation lookup
- `updateStaticTexts()` for elements with `data-i18n` attributes
- Language state persisted in localStorage

#### Step 5: Poker Engine (`js/poker.js`)
Built a complete poker logic engine:
- Card representation (rank + suit objects)
- Deck creation and Fisher-Yates shuffle
- **Hand evaluation**: Analyzes all C(7,5)=21 combinations to find the best 5-card hand
- Recognizes all 10 hand rankings (Royal Flush through High Card)
- Hand comparison for determining winners
- Starting hand strength calculator for preflop hints
- AI decision-making engine with bluffing capability

#### Step 6: Tutorial Rendering (`js/tutorial.js`)
Created lesson renderers for each of the 7 lessons:
- Card rendering functions that produce styled HTML cards
- Interactive quiz with correct/wrong feedback
- Game flow step navigator with animated card demonstrations
- **PokerGame class**: Full game state machine managing:
  - Blinds posting, card dealing
  - 4 betting rounds (preflop → flop → turn → river)
  - Player actions (fold/check/call/raise/all-in)
  - AI opponent with adjustable aggression
  - Showdown and winner determination
  - Hint system based on hand strength analysis

#### Step 7: Application Shell (`js/app.js`)
Wired everything together:
- App class managing lesson navigation and state
- Progress tracking with localStorage persistence
- Language switching that re-renders all content
- Sidebar and mobile nav synchronization
- Quiz, game flow, and practice game event handling

#### Step 8: Deployment
- Initialized git repository
- Created public GitHub repository via `gh` CLI
- Enabled GitHub Pages on master branch
- Site accessible at `https://lethin-young.github.io/poker-tutorial/`

### Running Locally

Simply open `index.html` in a browser, or use any static file server:

```bash
# Using Node.js
npx serve .

# Using Python
python3 -m http.server 3000
```

Then visit `http://localhost:3000`.

---

## 中文

### 概述

这是一个完全互动的浏览器端教程，通过逐步引导的方式教初学者如何玩德州扑克。教程包含动画卡牌演示、互动测验以及与 AI 对手的练习游戏。

### 功能特点

- **7 节循序渐进的课程**：从认识扑克牌到实战练习
- **互动练习游戏**：与 AI 对手对战，提供提示和手牌强度指示
- **双语支持**：中英文一键切换（中文/EN）
- **精美设计**：赌场风格的暗色主题，金色点缀，卡牌发牌动画
- **响应式布局**：适配桌面端、平板和手机
- **进度保存**：学习进度自动保存在 localStorage 中
- **零依赖**：纯 HTML/CSS/JavaScript，无需任何框架或构建工具

### 课程结构

| # | 课程 | 说明 |
|---|------|------|
| 0 | **欢迎** | 介绍和功能概览 |
| 1 | **认识扑克牌** | 花色、牌面大小和牌组构成 |
| 2 | **牌型排名** | 从皇家同花顺到高牌的全部10种牌型，含互动测验 |
| 3 | **牌桌与位置** | 庄家、小盲注、大盲注及位置优势 |
| 4 | **游戏流程** | 翻牌前 → 翻牌 → 转牌 → 河牌 → 摊牌，配有动画演示 |
| 5 | **下注动作** | 弃牌、过牌、跟注、加注、全下及策略提示 |
| 6 | **实战练习** | 与 AI 对战，提供提示和手牌强度显示 |

### 技术栈

| 技术 | 用途 |
|------|------|
| **HTML5** | 页面结构和语义化标记 |
| **CSS3** | 样式、动画、响应式布局（Flexbox/Grid、CSS自定义属性、关键帧动画） |
| **原生 JavaScript（ES 模块）** | 应用逻辑、游戏引擎、国际化、DOM 操作 |
| **Google Fonts** | Inter + Noto Sans SC 双语字体排版 |
| **GitHub Pages** | 静态站点托管和部署 |

### 文件结构

```
ToyProject/
├── index.html          # 主 HTML 页面
├── css/
│   └── style.css       # 所有样式（800+ 行）
├── js/
│   ├── app.js          # 主应用入口，UI 管理
│   ├── i18n.js         # 国际化（中英文翻译）
│   ├── poker.js        # 扑克引擎（牌组、牌型评估、AI）
│   └── tutorial.js     # 教程课程渲染和游戏 UI
├── README.md           # 本文件
└── .claude/
    └── launch.json     # 开发服务器配置
```

### 实现步骤详解

#### 第一步：项目规划
设计了包含7节课的教程结构，涵盖德州扑克的所有基本概念——从认识扑克牌到完整的实战练习游戏。

#### 第二步：HTML 结构（`index.html`）
创建了单页应用，包含：
- 固定顶部导航栏（带 Logo 和语言切换按钮）
- 免责声明横幅（说明筹码仅用于演示）
- 侧边栏课程导航（桌面端）
- 手机端水平滚动导航
- 主内容区域（动态渲染课程内容）
- 底部免责声明

#### 第三步：CSS 设计（`css/style.css`）
构建了赌场风格的暗色主题：
- 使用 CSS 自定义属性实现统一主题（深绿色台面、金色点缀）
- 纯 CSS 实现的扑克牌组件（花色颜色、角标）
- 发牌动画（`@keyframes dealCard`）
- 响应式设计（900px 和 600px 断点）
- 纯 CSS 牌桌（径向渐变模拟桌面材质）
- 卡牌、按钮和列表的交互悬停效果

#### 第四步：国际化系统（`js/i18n.js`）
实现了轻量级的国际化方案：
- 完整的中英文翻译对象
- `t(key)` 函数支持点号分隔的键名查找
- `updateStaticTexts()` 自动更新带 `data-i18n` 属性的元素
- 语言状态持久化存储在 localStorage

#### 第五步：扑克引擎（`js/poker.js`）
构建了完整的扑克逻辑引擎：
- 卡牌表示（花色 + 牌面对象）
- 牌组创建和 Fisher-Yates 洗牌算法
- **牌型评估**：分析所有 C(7,5)=21 种组合，找出最佳5张牌
- 识别全部10种牌型排名（皇家同花顺到高牌）
- 牌型比较以确定胜负
- 起手牌强度计算器（用于翻牌前提示）
- AI 决策引擎（含诈唬能力）

#### 第六步：教程渲染（`js/tutorial.js`）
为7节课分别创建了渲染器：
- 卡牌渲染函数（生成带样式的 HTML 卡牌）
- 互动测验（正确/错误反馈）
- 游戏流程步骤导航器（带动画演示）
- **PokerGame 类**：完整的游戏状态机，管理：
  - 盲注入池、发牌
  - 4轮下注（翻牌前 → 翻牌 → 转牌 → 河牌）
  - 玩家动作（弃牌/过牌/跟注/加注/全下）
  - AI 对手（可调整攻击性）
  - 摊牌和胜负判定
  - 基于手牌强度分析的提示系统

#### 第七步：应用外壳（`js/app.js`）
将所有模块整合：
- App 类管理课程导航和状态
- localStorage 进度跟踪和持久化
- 语言切换时重新渲染所有内容
- 侧边栏和手机导航同步
- 测验、游戏流程和练习游戏的事件处理

#### 第八步：部署
- 初始化 Git 仓库
- 通过 `gh` CLI 创建公开的 GitHub 仓库
- 在 master 分支启用 GitHub Pages
- 网站地址：`https://lethin-young.github.io/poker-tutorial/`

### 本地运行

直接在浏览器中打开 `index.html`，或使用任意静态文件服务器：

```bash
# 使用 Node.js
npx serve .

# 使用 Python
python3 -m http.server 3000
```

然后访问 `http://localhost:3000`。
