# Phase 1 盘点报告 — 仓库结构 / 构建 / 数据 / 模板 / SEO 基础设施

> 审计日期：2026-10-28 · 审计师视角 · **只审不改**（本文件为审计产出，非业务文件）
> 仓库：`/root/.openclaw/workspace/repos/Huiying`（Astro 5 主站）
> 兄弟仓：`/root/.openclaw/workspace/repos/data.huiying`（MkDocs 数据子站，域名 data.carfilterspro.com）

---

## 1. 仓库结构

```
Huiying/
├── astro.config.mjs        # site=https://carfilterspro.com · output=static · trailingSlash=always · @astrojs/sitemap
├── package.json            # astro ^5.0.0 · @astrojs/sitemap ^3.7.4 · 无运行时依赖
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── llms.txt
│   └── images/             # 359 张（详见 §7）
├── src/
│   ├── layouts/BaseLayout.astro    # 唯一布局（canonical + Organization JSON-LD）
│   ├── components/         # Header.astro / Footer.astro / LegalPage.astro
│   ├── data/               # 10 个数据文件（products.json + 9 个 TS 模块）
│   ├── pages/              # 18 个 .astro 路由（含 3 个动态段）
│   └── styles/global.css
├── scripts/                # 16 个抓取/构建/审计脚本
├── crawls/                 # 原始抓取数据（gitignored）alibaba/ + congben/ + tianrui/
├── docs/                   # 20+ 份历史报告（collection/factory-ai/audit 等）
└── dist/                   # 构建产物（gitignored）· 458 文件 · 92 HTML
```

**git 状态**（审计前核验）：`main` 分支 · 与 `origin/main` 同步 · 工作树干净（`nothing to commit, working tree clean`）。

---

## 2. package scripts 与 build 过程

`package.json` scripts（4 个，极简）：

| script | 命令 | 用途 |
|---|---|---|
| `dev` | `astro dev` | 本地开发 |
| `build` | `astro build` | 生产构建 |
| `preview` | `astro preview` | 本地预览产物 |
| `astro` | `astro` | CLI 入口 |

- **依赖**：`@astrojs/sitemap` + `astro`；**devDependencies**：`@astrojs/check` + `typescript`（仅类型检查，不参与 build）。
- **无 CI/CD 脚本**、无 `lint`/`test`/`deploy` 脚本。
- **build 验证**（本次实测）：`npm run build` → `92 page(s) built in 3.88s`，0 错误。产物落在 `dist/`（458 文件）。

---

## 3. 产品数据集 `src/data/products.json`

### 3.1 元信息

```json
"_meta": {
  "title": "huiying Canonical Product Dataset",
  "version": "0.2.0",
  "generated": "2026-10-27",
  "brand": "huiying",
  "source": "huiying + congbenfilter.com (merged)",
  "purpose": "Single source of truth ... (huiying brand + congben catalog)."
}
```

### 3.2 规模

- **产品数：61 SKU** · **品类数：8**（其中 `wiper` 为 **0 SKU 空品类**，保留落地页）。
- 品类分布：`air-filter` 21 · `oil-filter` 16 · `rubber-hoses` 13 · `fuel-filter` 6 · `cabin-filter` 2 · `brake-pads` 2 · `spark-plugs` 1 · `wiper` 0。

### 3.3 字段清单（按出现频率）

| 字段 | 出现次数 | 说明 |
|---|---|---|
| `slug` / `name` / `category` / `sourceId` / `model` / `desc` / `image` / `gallery` | **61/61** | 全量覆盖 |
| `source`（dict: name/url/status/retrieved） | **51/61** | 10 个 huiying 自有 SKU 无此字段 |
| `oeNumbers` / `crossReference` / `material` / `dimensions` / `fitment` | **51/61** | 同 10 个 SKU 缺这 5 个扩展字段 |

**缺 6 个扩展字段的 10 个 SKU**（huiying 自有，sourceId 690/691/692/693/698–703，model 为 `HY-OF-690` … `HY-AF-703`）：

```
of-690 · cf-691 · af-692 · af-693 · af-698 · af-699 · af-700 · af-701 · af-702 · af-703
```

这 10 个 SKU 是原始采集的源站自有产品（tianrui 源站 ID 690–703），brand 归 huiying 自有，**未挂外部 source 记录**（详见 P0 报告溯源矩阵）。

### 3.4 数据一致性（跨仓）

- 主站 `src/data/products.json` 与 data 子站 `data/products.json` **字节一致**（`diff` = IDENTICAL，md5 = `c7e74f297dfbf3d884e7e25719b68368`）。
- data 子站 README 明确约定：主站 products.json 是**唯一事实源**，子站副本同步需字节一致。

---

## 4. 页面模板清单（18 个 .astro 路由 → 92 页）

### 4.1 静态路由（12 页）

| 文件 | 输出 |
|---|---|
| `index.astro` | `/` |
| `company-profile.astro` | `/company-profile/` |
| `culture.astro` | `/culture/` |
| `factory.astro` | `/factory/` |
| `marketing.astro` | `/marketing/` |
| `download.astro` | `/download/` |
| `exhibition.astro` | `/exhibition/` |
| `contact.astro` | `/contact/` |
| `privacy-policy.astro` | `/privacy-policy/` |
| `terms.astro` | `/terms/` |
| `disclaimer.astro` | `/disclaimer/` |
| `cookies.astro` | `/cookies/` |

### 4.2 动态路由（80 页）

| 模板 | 生成页数 | 说明 |
|---|---|---|
| `products/index.astro` | 1 | 品类总览（8 品类卡） |
| `products/[category].astro` | 8 | 品类页（`getStaticPaths` 遍历 8 品类） |
| `products/[category]/[slug].astro` | **61** | SKU 详情页（遍历 61 产品） |
| `news/index.astro` | 1 | 新闻列表 |
| `news/[slug].astro` | 9 | 新闻正文（遍历 9 篇） |

**合计 92 页** = 12 静态 + 1 产品索引 + 8 品类 + 61 SKU + 1 新闻索引 + 9 新闻。

### 4.3 关键模板机制

- **`[category]/[slug].astro`（SKU 详情）**：
  - 上表展示 Category/Model/OE/cross-ref/material/fitment/Brand/Source reference 字段（有值才渲染行）。
  - 规格表分「Verified by source」与「Confirm per order」两区（`getProductSpec` 驱动）。
  - 询价 CTA：`/contact/?product={model}&url={pageUrl}`。
  - 内联 `Product` + `BreadcrumbList` JSON-LD。
  - `related` 同品类最多 4 个。
- **`[category].astro`（品类页）**：品类卡 + 采购指南 + 长尾知识 + 车型适配框架表（`getFitment`）+ FAQ + CTA。
- **`news/[slug].astro`**：正文 + `scopeNote`（技术口径限定）+ `analysis`（huiiying's take）+ 前后篇导航 + `BlogPosting` JSON-LD。

---

## 5. sitemap 生成（@astrojs/sitemap）

- 配置：`astro.config.mjs` 中 `integrations: [sitemap()]`，`site: 'https://carfilterspro.com'`。
- 产物：`dist/sitemap-index.xml`（指向 `sitemap-0.xml`）+ `dist/sitemap-0.xml`。
- **本次实测**：
  - `sitemap-0.xml` URL 数 = **92**（与页面总数一致），去重后 92（0 重复）。
  - 全部 `https://carfilterspro.com` 域（0 异域），全部尾斜杠（0 无尾斜杠）。
  - `sitemap-index.xml` 仅含 1 个 `<sitemap>` 指向 sitemap-0（单文件，未分片）。

---

## 6. robots.txt / canonical / JSON-LD

### 6.1 robots.txt

```
User-agent: *
Allow: /

Sitemap: https://carfilterspro.com/sitemap-index.xml
```

- 全允许，无 disallow，声明 sitemap-index。**无 `host` 指令**（现代 Google 已忽略，不构成问题）。

### 6.2 canonical 逻辑（BaseLayout）

`src/layouts/BaseLayout.astro` 中：

```ts
const canonical = new URL(Astro.url.pathname, Astro.site);
...
{!noindex && <link rel="canonical" href={canonical} />}
```

- 所有页面 canonical **自引用** `https://carfilterspro.com{pathname}`（`Astro.url.pathname` 天然带尾斜杠，因为 `trailingSlash: always`）。
- **实测**：92 页 canonical 0 个非自引用。
- `noindex` prop 存在但**全站未使用**（0 个页面传 noindex）。

### 6.3 JSON-LD 实现（4 类实体）

| 类型 | 位置 | 页面范围 | 实测块数 |
|---|---|---|---|
| `Organization` | `BaseLayout.astro`（全站注入） | 92 页 | 92 |
| `WebSite` | `index.astro` | 首页 | 1 |
| `Product` + `AggregateOffer` | `[category]/[slug].astro` | 61 SKU 页 | 61 |
| `BreadcrumbList` | `[category]/[slug].astro` | 61 SKU 页 | 61 |
| `BlogPosting` | `news/[slug].astro` | 9 新闻页 | 9 |

**合计 224 个 `application/ld+json` 块，全部通过 `json.loads` 语法校验（0 失败）**。

- `Organization` 字段：name/legalName/alternateName/url/logo/foundingDate（2017-10-10）/telephone/email/address/sameAs（Baidu Baike）/contactPoint。
- `Product` 字段：name/sku/mpn/brand/image/description/category/url/offers（AggregateOffer + PriceSpecification，`lowPrice=10, highPrice=60 USD`，`offerCount=1`）。
- `BlogPosting` 字段：headline/datePublished/dateModified/author（Organization）/publisher/mainEntityOfPage/description。

---

## 7. 图片资产（359 张，3 类来源）

| 目录 | 数量 | 来源 | 说明 |
|---|---|---|---|
| `public/images/`（根） | **51** | tianrui 源站实拍（62 下载中保留 51） | 含 1 张 `hero-concept-1920x1440.webp`（新制概念图） |
| `public/images/factory-ai/` | **8** | Seedream AI 生成 | factory 页 1 hero + 8 画廊 |
| `public/images/congben/` | **300** | congbenfilter.com 源站产品图 | 3 品类 icon + 产品图 |

### 7.1 源图精确对账（collection-report.json → 实际文件）

- 采集记录：**64 唯一图 · 62 下载成功 · 2 源站 404**（`ac7dfb0c` / `de378b30`）。
- 62 张成功图的实际处置：
  - **50 张保留**在 `public/images/` 根目录（其中 10 张 `.jpg → .webp` 转换，UUID 前缀不变）。
  - **12 张未保留**（源站内嵌品牌字样的横幅/logo 图，新站改用文本 logo/页头，见 collection-report §4.3）：
    `e7c649ac` `46af20df` `ea291f03` `dbd03028` `52ecab90` `22e5e5b9` `e2302fd0` `cb6d9d7f` `cdb5ad87` `b10ed89d` `df3ed444` `8f37d9be`（多用于源站 home 横幅、news-index 头图、factory/marketing 图）。
  - 根目录 51 = 50 源图 + 1 张 `hero-concept` 新制概念图。

### 7.2 图片真实性归类（详见 P0 报告 §5）

- **tianrui 源站实拍**（50 张）：工厂/产品/展会/文化/营销图，以 `collection-report.json` 的 URL 来源记录为准（`omo-oss-image.thefastimg.com` 源站图床）。
- **Seedream AI 生成**（8 张）：`factory-ai/` 目录，`docs/factory-ai-report.md` 有完整生成记录（模型 `doubao-seedream-4-5-251128`，OCR 复检 0 真字，无 AI 水印）。
- **congben 源站产品图**（300 张）：`crawls/congben/` 抓取记录（`crawl-images-map.json` + `products-raw.json`）。

---

## 8. contact 表单处理（静态表单 action 实况）

`src/pages/contact.astro` 中表单：

```html
<form action="mailto:Martin@carfilterpro.com" method="post" enctype="text/plain">
```

- **action = `mailto:`**（无服务端处理、无第三方表单服务、无 JS fetch）。
- 字段：`name`（required）/ `email`（required）/ `phone` / `product` / `oe` / `message`（required）。
- 预填：`?product=MODEL&url=…` → `product` 字段 + `message` 文本（`Product: …` / `Product URL: …` 两行）。
- **局限**：静态站 `mailto:` 表单**无服务端邮件能力**，提交行为依赖用户本机默认邮件客户端（易被浏览器拦截/无客户端则失败）。详见 P0 报告 §4。

---

## 9. 重定向 / 404

- **无 `404.html` 文件**（`dist/` 无 404 静态页）。静态托管平台（CF Pages/Netlify 等）会用平台默认 404 处理，**未自定义**。
- 无 `_redirects` / `netlify.toml` / `vercel.json` 等重定向配置文件。
- **结论**：无 URL 迁移计划，故无重定向需求（符合「无迁移计划不动 URL」铁律）；404 为平台默认行为，无定制。

---

## 10. data 子站生成（MkDocs + 脚本）

### 10.1 子站结构（`data.huiying`）

- `mkdocs.yml`：Material 主题 · `site_url=https://data.carfilterspro.com` · 完整 nav（Home / SKU Index / 8 品类 / 61 SKU 详情 / Fitment Reference 8 页 / Filter Media / Reference Data 4 页 / Data Specification 4 页）。
- `data/`：`products.json`（与主站字节一致）+ `fitment.json` + `oe-patterns.json` + `size-ranges.json` + `replacement-intervals.json` + `procurement.json`。
- `scripts/build-fitment-pages.py`：从 JSON 生成全部数据页（零手工抄写）。
- `hooks/build_hook.py`：构建钩子。
- `site/`：已构建产物，**90 HTML**（`site/index.html` 时间戳 2026-10-28 03:26）。

### 10.2 生成机制

- 同步流程（README 约定）：主站改 products.json → 复制入子仓 → `diff` 校验字节一致 → `python3 build-fitment-pages.py` → `mkdocs build` → commit/push。
- 零编造纪律：源数据缺失字段标 `NEEDS_VERIFICATION`，适配框架标 `reference`。

---

## 11. 关键文件实现位置索引（速查）

| 实现 | 文件 | 行/位置 |
|---|---|---|
| 站点域名/品牌/公司主体/注册事实 | `src/data/site.ts` | `site` 常量 |
| 品类定义 + nav | `src/data/site.ts` | `productCategories` / `nav` |
| 公司历史/工厂/文化/设备声明 | `src/data/company.ts` | `companyProfile` / `factoryInfo` / `companyDisclosure` / `productionProcess` 等 |
| canonical + Organization JSON-LD | `src/layouts/BaseLayout.astro` | `canonical` / `orgJsonLd` |
| Product/Breadcrumb JSON-LD + 价格 | `src/pages/products/[category]/[slug].astro` | `productJsonLd` / `breadcrumbJsonLd` / `PRICE_MIN/MAX` |
| BlogPosting JSON-LD | `src/pages/news/[slug].astro` | `articleJsonLd` |
| 规格表 verified/confirm 逻辑 | `src/data/productSpec.ts` | `getProductSpec` / `CONFIRM` |
| SKU 深度内容（de-templated） | `src/data/productContent.ts` | 61 条目全覆盖 |
| 品类采购指南/FAQ/长尾 | `src/data/categoryContent.ts` | 8 品类全覆盖 |
| 车型适配框架（reference-only） | `src/data/vehicleFitment.ts` | `vehicleFitment` / `fitmentDisclaimer` |
| 新闻正文 + scopeNote | `src/data/newsPosts.ts` | 9 篇 |
| 新闻 editorial analysis | `src/data/newsAnalysis.ts` | `newsAnalysis` |
| 法律页内容 | `src/data/legal.ts` | — |
| robots.txt | `public/robots.txt` | — |
| llms.txt | `public/llms.txt` | — |

---

## 12. 盘点结论（一屏速览）

- **结构**：Astro 5 静态站 + MkDocs 数据子站，双仓分离、产品数据字节一致。
- **规模**：92 页（12 静态 + 80 动态）· 61 SKU · 8 品类（wiper 空）· 359 图片（50 源实拍 + 8 AI + 300 congben + 1 概念图）。
- **SEO 基础设施**：sitemap（92 URL 全合法）、canonical（全自引用）、robots（全允许）、JSON-LD（224 块全通过语法校验）、alt（全非空）、title/desc（0 重复）。
- **待关注点**（详见 P0/P1）：RFQ 表单无服务端邮件能力、8 张 AI 工厂图合规张力、公司历史声明缺独立证据、12 张源图未保留、无自定义 404。

---

*本报告为审计产出，未修改任何业务文件。*
