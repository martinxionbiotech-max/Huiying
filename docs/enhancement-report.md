# huiying 站 · 全面强化总报告（五合一）

> 生成时间：2026-10-26 · 仓库：`Huiying`（Astro 35 页 · 62 图 · 5 品类 10 SKU · 品牌 huiying）

## 一、内容审计 + 加深加厚（①）

逐页 before→after 摘要（模板级可见文案词数，完整版见 `docs/content-audit-report.md`）：

| 区块 | before → after | 核心新增 |
| --- | ---: | --- |
| 首页 | 144 → 461 | 品牌关联内链块 · 采购视角卡片 · 品牌云 |
| 品类页 ×5 | 62 → 1375 | 采购视角指南 · 选型建议 · 长尾知识 · 品牌×车型×滤芯矩阵 · 品牌+车型 FAQ |
| SKU 页 ×10 | 69 → 903 | Fitment 矩阵 · 三栏深内容 · Buyer's note · 参考价 · Product/Breadcrumb Schema |
| 公司页 ×8 | — | 清河滤清器产业集群背景 · 出口市场块 |
| 新闻 ×9 | — | 每篇「huiying's take」编辑深度分析 |
| **合计（模板）** | **541 → 5761** | 约 10.6× |

全部新增采购指南 / 选型建议 / 长尾知识 / Buyer's note / 新闻分析均为原创写作，未复制源站句式；车辆适配与价格均按「参考级措辞 + reference only」处理，零编造。

## 二、页面设计改动（②）

保留既有海军蓝 `#0F2A43` + 安全橙 `#E8622C` 骨架，做以下强化：

- **Hero 层次**：首页 eyebrow → 标题 → lede → 双 CTA → 事实指标条，视觉权重递减；标题加入 SKU/品类动态数字。
- **卡片**：品类卡/产品卡统一 hover 抬升 + 边框强调；新增 `procure-card`（顶部橙色描边采购卡）、`fitment-card`（品牌关联卡）、`region-points`（区位优势卡）。
- **表格**：品类页新增品牌关联矩阵表（复用 `table.spec` 斑马纹 + 悬停高亮），响应式横向滚动。
- **CTA**：首页末尾橙色渐变 CTA + WhatsApp 双按钮保持；产品页/品类页统一「Request a Quote」入口。
- **响应式**：`two-col`/`fitment-grid`/`deep-grid`/`region-grid` 均用 `auto-fit minmax` + 断点降为单列。
- **语义化 H 层级**：`h1`（页题）→ `h2`（节）→ `h3`（卡/块），内容块边界清晰；FAQ 用原生 `<details>`；内链矩阵用 `<ul>` 列表语义。

## 三、产品页深度 + 汽车品牌关联长尾（③）

**品牌关联矩阵规模**（数据源 `src/data/vehicleFitment.ts`）：

| 指标 | 数值 |
| --- | ---: |
| 品牌数 | **13**（10 全球/国产 + 3 商用：Isuzu/Foton/JAC） |
| 车型数（品牌×车型组合） | **59** |
| 长尾锚文本条目（品牌×车型×滤芯） | **277** |

- **覆盖品牌**：Toyota / Honda / Volkswagen / BMW / Mercedes-Benz / Ford / Hyundai / Nissan / Geely / Great Wall + 商用 Isuzu / Foton / JAC。
- **长尾内链**：每品类页矩阵表 + 每 SKU 页品牌卡片，锚文本形如 `Toyota Corolla air filter`、`BMW 3 Series oil filter`、`Honda Civic cabin filter`，链接到对应品类页；首页另有内链块。
- **品类 FAQ**：5 品类 × 4 条 = 20 条，均含品牌+车型关键词（Corolla/Civic/Golf/3 Series/Haval H6 等）。
- 全部采用参考级措辞 + 免责声明（「common applications include…，具体以适配表为准」），不编造精确 OE。

## 四、SEO 完整件（④）

| 项目 | 状态 |
| --- | --- |
| Sitemap | ✅ `@astrojs/sitemap` 已启用，`sitemap-index.xml` + `sitemap-0.xml`，**35 URL** |
| 规范 URL | ✅ 全量 `<link rel="canonical">`（域名 `https://huiyingfilter.com`，trailing slash 统一） |
| llms.txt | ✅ `public/llms.txt`（llmstxt.org 规范，页面链接表 **35 条**） |
| robots.txt | ✅ `public/robots.txt`，含 `Sitemap: https://huiyingfilter.com/sitemap-index.xml` |
| Product Schema | ✅ **10 SKU** 每页 `Product` + `AggregateOffer` + `priceSpecification`（minPrice 10 / maxPrice 60 USD，标注参考价） |
| Organization Schema | ✅ `BaseLayout` 注入 `Organization`（名称/电话/邮箱/地址/contactPoint/logo） |
| BreadcrumbList Schema | ✅ 每 SKU 页注入 |
| JSON-LD 渲染核验 | ✅ 抽 3 SKU（of-690 / cf-691 / af-692）：每页 3 个 JSON-LD 块，Product + 价格区间 + Organization 均正确解析 |

## 五、验证（⑤）

| 检查项 | 结果 |
| --- | --- |
| `npm run build` | ✅ 35 页面，0 错误 |
| 图片引用复扫 | ✅ 28 唯一引用，0 缺失 |
| 内链复扫 | ✅ 37 唯一页面链接，0 缺失 |
| Schema JSON-LD 渲染 | ✅ 抽 3 SKU 通过 |
| sitemap / llms.txt / robots.txt | ✅ 产物齐全（35/35/声明正确） |
| huiying 口径复扫 | ✅ `src/`+`dist/` 0 处 `Tianrui`/`天瑞` 残留 |
| git commit + push | ✅ 分步提交（见下） |

## 六、Git 提交记录

分步 commit+push 至 `origin/main`，最终同步 0/0（无 ahead/behind）。
