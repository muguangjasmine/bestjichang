# Best机场指南 (bestjichang.sbs) AI 代理协作指引 (AGENTS.md)

本文档规定后续 AI 智能体在接管、维护或重构本项目时的核心规范与执行守则：

## 1. 技术栈与运行约定
- 本项目采用 **Hugo Extended**（基于 Node.js `hugo-extended` 包，版本 `^0.166.0`）。
- 构建命令统一为 `npm run build` 或 `npx hugo --minify`。
- 测试命令统一为 `npm test` 或 `node scripts/verify-site.js`。
- 绝不可强行推倒或擅自迁移至其他服务端渲染框架。

## 2. 商业转化核心红线
- 首页及全站推荐榜单中，前四名服务商必须严格保持以下排序：
  1. **梯子云 LadderCloud** (`laddercloud`)
  2. **暮光加速** (`twilight`)
  3. **飞猫云** (`flycat-cloud`)
  4. **微风网络 Breezenet** (`breezenet`)
- 必须逐字保留其原始邀请返利链接（包含 code 参数），并配置 `rel="sponsored nofollow noopener"`。
- 严禁擅自修改或删除优惠码（如 `tiziyun`、`mm88`、`flycat888`）。

## 3. 第三方参考发布者严格隔离
- 严禁将参考博客、评测站或竞争网站名称（如三毛机场、猫梦博客、Gaterank等）写入任何公开页面、文章、标题或结构化数据中。
- 必须保持 `docs/reference-publisher-blocklist.md` 的有效性，并在每次构建后执行黑名单扫描。

## 4. 单一事实数据源维护
- 涉及全站关键词、导航架构、文章种子及 FAQ 主题配额的调整，必须优先修改 `docs/site-seo-profile.json`。
- 遵循 `docs/seo-profile-replacement-contract.md` 规定的规范执行全站同步，不得在多处 HTML 模板硬编码分散关键词。
