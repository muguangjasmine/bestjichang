# Best机场指南 (bestjichang.sbs) 站点架构与运维手册

本项目是面向第一次接触机场、代理订阅与客户端的小白用户打造的 **2026好用稳定机场推荐与科学上网使用指南** 纯静态站点。基于 **Hugo Extended**（搭配现代响应式定制布局）构建，全站遵循单一事实数据源（Single Source of Truth, SSOT）架构，兼顾极端性能、移动端体验、技术 SEO 与商业转化要求。

---

## 1. 运行环境与安装依赖
- **Node.js**: `>= 18.0.0`
- **Hugo Extended**: `v0.166.0`（通过 `hugo-extended` npm 包或本地环境执行）
- **包管理器**: `npm`

```bash
# 安装开发依赖
npm install
```

---

## 2. 常用操作命令

| 操作任务 | 执行命令 | 说明 |
| :--- | :--- | :--- |
| **本地实时预览** | `npm run serve` | 启动本地 Hugo 开发服务器，默认监听 `http://localhost:1313/` |
| **全量内容重构** | `npm run generate` | 运行 `node scripts/generate-all-content.js` 重新生成所有文章 |
| **生产静态构建** | `npm run build` | 编译生成压缩混淆后的生产静态产物至 `public/` 目录 |
| **全站验收测试** | `npm test` | 执行 `node scripts/verify-site.js` 进行 9 大类质量与 SEO 验收测试 |
| **全站 ZIP 打包** | `npm run zip` | 排除无关文件打包生成 `bestjichang.sbs.zip` 至桌面与上级目录 |

---

## 3. 核心栏目架构与落地页

全站共交付 **250+ 篇独立原创高质量内容**，正文净中文字符均严格控制在 **800 至 1200 字之间**：

1. **首页 (`/`)**: 品牌看板、核心四强快速对比、场景分类入口、新手必读精选。
2. **机场推荐 (`/jichang-tuijian/`)**: 24 篇大词精选、稳定专线与选型决策。
3. **场景选机场 (`/best-for/`)**: 20 篇便宜性价比、专线、按量计费、ChatGPT等AI工具及Netflix等流媒体解锁场景。
4. **客户端教程 (`/clients/`)**: 24 篇涵盖 Clash Verge Rev、Shadowrocket小火箭、v2rayN、sing-box等全平台图文教程。
5. **新手入门 (`/xinshou/`)**: 18 篇原理科普、订阅安全、节点倍率与三网运营商选型指南。
6. **故障排查 (`/fix/`)**: 16 篇针对订阅失败、节点超时全红、DNS污染与端口冲突的实战排错手册。
7. **机场评测 (`/reviews/`)**: 20 篇深度横向对比与多维度PK分析。
8. **常见问题 FAQ (`/faq/`)**: 100 篇覆盖 10 大分类的高频深度实战解答，**默认全部展开显示完整答案**。
9. **服务商档案 (`/providers/`)**: 28 家主流网络服务商独立规范单页档案与资费清单。
10. **信任合规单页**: `/about/`, `/contact/`, `/editorial-policy/`, `/methodology/`, `/corrections/`, `/affiliate-disclosure/`, `/privacy/`, `/terms/`, `/disclaimer/`。

---

## 4. 商业转化与核心服务商固定顺序

首页推荐榜单、比较表格与所有商业落地页严格保持以下固定顺序：
1. **第 1 名**：**梯子云 LadderCloud** (`laddercloud`)
2. **第 2 名**：**暮光加速** (`twilight`)
3. **第 3 名**：**飞猫云** (`flycat-cloud`)
4. **第 4 名**：**微风网络 Breezenet** (`breezenet`)

- 外部推广与邀请链接统一使用原始 URL，并强制附带 `rel="sponsored nofollow noopener"` 属性。
- 站内双链接机制：每张卡片均同时具备站内独立规范评测入口（如 `/providers/laddercloud/`）与站外官方直达按钮。
- 优惠码提供一键复制与降级提示交互。

---

## 5. 单一事实数据源维护与批量替换

- **核心 SEO 配置文件**: `docs/site-seo-profile.json`
- **商户基础数据库**: `data/providers.yaml`
- **整体替换执行协议**: `docs/seo-profile-replacement-contract.md`
- **参考发布者隔离黑名单**: `docs/reference-publisher-blocklist.md`（确保三毛机场、猫梦博客等 0 泄漏）

---

## 6. 部署上线与搜索控制台配置

### 6.1 静态托管部署
本项目编译产物 `public/` 均为纯静态 HTML/CSS/JS/XML，可直接部署于：
- **Cloudflare Pages**: 构建命令填 `npm run build`，输出目录填 `public`。
- **Vercel / Netlify**: 根目录已包含 `static/vercel.json` 与 `static/_redirects` 配置文件。
- **Nginx / 宝塔面板**: 将 `public/` 内所有文件上传至网站根目录即可。

### 6.2 搜索引擎控制台 (GSC & Bing)
- **站点地图地址**: `https://bestjichang.sbs/sitemap.xml`
- **RSS 订阅地址**: `https://bestjichang.sbs/index.xml`
- **全站实时搜索索引**: `https://bestjichang.sbs/index.json`
- **Robots 协议**: `https://bestjichang.sbs/robots.txt`
