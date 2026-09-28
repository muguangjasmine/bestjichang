# Best机场指南 (bestjichang.sbs) SEO 配置整体替换协议 (Replacement Contract)

## 1. 协议概述与设计宗旨
本文档为 `bestjichang.sbs` 站点的 SEO 配置单一事实数据源（Single Source of Truth, SSOT）替换规范。本站所有核心关键词、长尾词、Hero 首屏文案、页眉导航、页脚说明、落地页元数据及内链锚文本，均受控于 `docs/site-seo-profile.json`。后续若使用另一套万能提示词对全站关键词与导航进行整体迭代重构，必须严格遵循本协议执行。

## 2. 外部输入替换字段规范
替换接口接受以下完整 JSON 字段输入：
- `primaryKeywords`: 全新核心关键词数组（5~15个）
- `secondaryKeywords`: 全新辅助关键词数组（10~30个）
- `longTailKeywords`: 全新长尾搜索意图词集
- `heroKeywords`: 首页首屏 Hero 承载关键词
- `footerKeywords`: 页脚品牌区长期覆盖词
- `navigationItems`: 导航定义数组（包含 label, url, primaryKeyword, supportingKeywords, articleSeeds, articleCount）
- `faqClusters`: FAQ 专题配额与分类分布
- `titlePatterns` & `descriptionPatterns`: 自动化页面标题与描述公式

## 3. 标准化替换执行流程
1. **快照归档**：备份当前 `docs/site-seo-profile.json` 并记录当前站内所有已发布 URL 清单。
2. **规范化与意图聚类**：将新关键词进行全半角、大小写与同义词聚类，杜绝站内同义词相互抢流与关键词蚕食（Cannibalization）。
3. **更新配置层**：将新字段注入 `docs/site-seo-profile.json`，并将淘汰的旧核心词移入 `inactiveKeywords`。
4. **URL 与 301 映射重定向**：若导航 URL 发生调整，必须在 `static/_redirects` 或服务器配置中建立精准的 301 永久重定向，严禁产生 404 或粗暴重定向至首页。
5. **商业资产永久保护**：
   - 梯子云（LadderCloud）、暮光加速、飞猫云、微风网络 4 大核心主推商户顺序永久固定（第1至第4名）。
   - 必须逐字保留其原始邀请返利链接（包含 code 参数）及 `rel="sponsored nofollow noopener"` 属性。
   - 保留优惠码（如 `mm88`、`flycat888` 等）及人工核验日期。
6. **产物重建与质量检查**：
   - 运行生成脚本全量重新生成 Markdown 文章与元数据。
   - 运行 `npm run build` 执行 Hugo 静态编译。
   - 运行 `node scripts/verify-site.js` 执行 100% 验收检测。
