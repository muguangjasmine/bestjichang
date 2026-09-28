# 新增与发布内容操作指南 (Publishing Guide)

## 1. 新增文章流程
1. 在对应栏目目录（如 `content/jichang-tuijian/`）下创建新的 `.md` 文件。
2. 配置完整的 Front Matter 元数据（包含 title, description, date, author, primaryKeyword, secondaryKeywords 等）。
3. 编写净中文正文（字数保持在 800 至 1200 字之间）。
4. 运行 `npm run build` 进行 Hugo 生产编译。
5. 运行 `npm test` 进行全站自动化验证。

## 2. 更新服务商数据流程
1. 编辑 `data/providers.yaml` 中对应服务商的套餐资费、流量配置或优惠码。
2. 更新 `lastChecked` 字段为当前日期。
3. 重新运行编译，相关组件（推荐榜、卡片、表格）将自动同步更新。
