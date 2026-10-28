# carfilterspro（Huiying）第三轮审计修复批 — 整改报告

> 生成时间：2026-10-28 · 批次：`audit3` · 仓库：`Huiying`（Astro · 92 页 · 60 SKU · 8 品类）+ 兄弟仓 `data.huiying`（MkDocs · 适配 592 行）
> 生产域名：主站 `carfilterspro.com` · 数据站 `data.carfilterspro.com`
> 纪律：零编造 · 未验证字段不推测 · 不同 SKU 按证据深度差异化 · 分步 commit + push 两仓

---

## 结论概览

| 项 | 结果 |
|---|---|
| P0-1 品牌/域名/邮箱统一 | ✅ 残留复验 0 · 品牌-公司关系说明已加 · 邮箱保持 `Martin@carfilterpro.com` 并注记待确认 |
| P0-2 适配数据三态 + 定位 | ✅ 三态上线（reference / source-verified / fitment-verified）+ SKU-OE-车型关联文件 |
| P0-3 产品页数据中心化 | ✅ 「What we can confirm / What you should provide」双区 · 通用段落删除 · 按证据深度差异化 |
| P1-1 车型模块去泛化 | ✅ SKU 页 + 品类页删除多品牌车型列表 · 适配查询指向 data 站 |
| P1-2 计数单一数据源 | ✅ 60 SKU / Air 20 全站唯一 · 无重复/别名 URL |
| P1-3 技术 SEO | ✅ `/sitemap.xml` alias → `/sitemap-index.xml` · canonical/schema 复验通过 |
| 构建 | ✅ 主站 92 页 · 数据站 mkdocs 通过 |
| 断链 | ✅ 主站 0 · 数据站 0 |

---

## P0-1 — 品牌 / 域名 / 邮箱统一

### 一致性复核（残留 0 已达成 — 复验）

- **主站**：`src/` + `public/` + `astro.config.mjs` 全域 `huiyingfilter.com` / `data.huiying.com` 残留 = **0**（`grep -rEl` 输出空）。
- **数据站**：`docs/`（含 llms.txt / mkdocs.yml / data/*.json / scripts）旧域名残留 = **0**（`README.md` 中一处 `huiyingfilter.com` 历史引用已修正为 `carfilterspro.com`）。
- **邮箱**：全站唯一 `Martin@carfilterpro.com`（`site.ts` 单一数据源 → footer / contact / schema / data 站 Organization schema 全部一致）。

### 邮箱决策点（不擅自改）

邮箱保持用户指定值 **`Martin@carfilterpro.com`**（少一个 `s`），与生产域名 `carfilterspro.com` 不一致但审计亦言「无核实不更换」。

> **待用户确认**：`carfilterpro.com` 是否为企业自有、并已配置 SPF / DKIM / DMARC。确认后如需改到 `carfilterspro.com`，改动点仅为 `src/data/site.ts:email` 一处（全站单一数据源），并同步 data 站 `overrides/main.html` 的 Organization schema email。

### 品牌-公司关系说明（统一措辞）

新增 `company.ts:brandCompanyRelationship`，统一措辞：

> "huiying" is the brand name. The operating legal entity is **Qinghe County Huiying Automotive Parts Co., Ltd.** This website runs on the domain **carfilterspro.com**. Our reference data site runs on **data.carfilterspro.com**.

- 渲染位置：**Company Profile**（新增独立区块）+ **Contact**（公司名下方注记）。
- 消除「huiying 品牌名 ↔ 法律主体 ↔ 站点域」三者无解释切换。

### 旧域名 huiyingfilter.com

`000`（未部署）——**无需 301**。记录在案，不做重定向。

---

## P0-2 — 适配数据三态 + 定位（data 站）

### 三态分布

| 状态 | 行数 | 含义 |
|---|---|---|
| `reference` | **592**（74 车型 × 8 品类矩阵行） | 常见应用参考框架，非精确 OE 对照 |
| `source-verified` | **25**（congben OE SKU 的 OE↔品牌关系） | OE 号本身品牌归属是事实（如 `17220-5R0-008`→Honda） |
| `fitment-verified` | **0** | 需完整 SKU-OE-车型-来源-核验日期记录，当前无 |

- congben OE SKU 总计 **33** 个（带 OE 号）；其中 **25** 个源站明确给出品牌 → OE↔品牌关系升级 `source-verified`；**8** 个源站有 OE 号但未注明品牌 → OE↔品牌保持 `reference`（不推测品牌）。
- 车型/年款一律 `reference`（关系真实，但精确适配未核验）。

### 新增文件

- `data/sku-oe-vehicle.json` — SKU-OE-车型关联数据集（仅真实关系，不复制车型列表造完整）。
- `scripts/build-sku-oe-vehicle.py` — 生成器（从 `data/products.json` 派生，零手工抄写）。
- `docs/reference/sku-oe-vehicle.md` — 渲染页（纳入 nav + llms.txt）。

### 适配页定位

fitment index + 各品类 fitment 页顶部新增显著声明：

> ⚠️ **Reference material — not an exact-fitment tool.** … Always confirm the exact part against your OE / cross-reference number before ordering.

### 字段缺失留空

`build-fitment-pages.py` 的 SKU 参数页：缺失字段渲染为 `—` + `NEEDS_VERIFICATION`（留空不填），不生成「Confirm per order」式空行占位。

### 术语统一

`products.json` 源状态 `verified-by-source` → `source-verified`（33 条，两仓字节一致同步）；`data-status.md` / `field-schema.md` / SKU index / 各参数页 / llms.txt 全部同步为三态术语。

---

## P0-3 — 产品页数据中心化（主站）

### 「Verified by source」区改造

- **只显示真实来源数据**：OE number / cross-reference / material / dimensions / brand fitment —— 均来自 `products.json` 中源站实际发布的字段（congben 抓取；`17801-30070` 为样板）。
- **无数据字段不显示空行**：删除原「Confirm per order」空行占位。
- 改为 **「What we can confirm / What you should provide」双区**：
  - **What we can confirm**：列实据（有值才列）+ 来源名/状态/抓取日期/来源链接 + 诚实注记「来源发布值，非独立核验」。
  - **What you should provide**：明确列客户需提供的信息（OE/cross-ref、数量、目的市场、包装/私标、尺寸/车型确认）。

### 删减通用段落

删除 `[slug].astro` 中「About this …」深度内容段（application/scenarios/technical/procurement/selectionNotes/maintenance 泛化内容）——这些来自 `productContent.ts`（60 SKU × 6 区块）。SKU 页现为：**产品信息表（SKU 级说明）+ 证据双区 + 适配参考链接 + 相关产品**。

### 按证据深度差异化

- 有 OE 的 SKU（33 个，congben）：证据区显示 OE / cross-ref / material / brand fitment。
- 无 OE 的 SKU（27 个，tianrui / 通用）：证据区诚实显示「No source-verified specification fields are published for this SKU」+ 提供清单。
- `17801-30070`（样板）：OE + cross-ref + material 三字段实据 + 来源链接。

---

## P1-1 — 车型模块去泛化

- **删除多品牌车型列表**：`[slug].astro` 的 `fitment.brands` 网格（Toyota/Honda/VW/BMW 等无 OE 对应者的 427 品牌-车型参考条目）**整体删除**——不做关键词覆盖保留。
- **品类页**：同样删除 `vehicleFitment` 多品牌车型表，替换为「Fitment reference」+ data 站参考外链。
- **仅保留 source-verified OE 品牌关联**：如 `17220-5R0-008`→Honda（已在「Brand fitment (source)」字段体现，来自 `products.json` 的 `fitment.brand`）。
- **适配查询入口**：SKU 页 + 品类页统一指向 `data.carfilterspro.com/fitment/{category}/`（reference fitment data ↗）。
- `vehicleFitment.ts` / `productSpec.ts` / `productContent.ts` 已无渲染引用（保留文件供后续，不再驱动页面）。

> 删除车型引用数：**427**（8 品类 × 核心品牌-车型锚文本）+ 60 SKU 页 × 对应品类品牌网格，全部移除。

---

## P1-2 — 计数单一数据源

### 根因定位

审计发现「首页 60（Air 20）vs products.json 61」的差异：

- **主站数据源 `products.json` 实为 60 SKU**（`air-filter` 20）——此前的 `61` 来自 `P320510` 重复 SKU 去重前的历史计数。
- **残留差异源**：data 站手写页 `docs/index.md` 仍写「61 SKUs · air filter: 21」（陈旧）；`scripts/quality-pass2-content.py` 注释「all 61 SKUs」。
- 已修正为 **60 SKU / air filter: 20**（`docs/index.md` + 脚本注释）。

### 全站唯一计数源

- 首页 `index.astro`：`productsData.products.length` = **60**（动态渲染，非硬编码）。
- 品类页 / products 索引页：同一 `products.json` 过滤计数。
- `products.json`：**60** SKU。
- `sitemap-0.xml`：**60** SKU URL + 8 品类 + 首页/新闻/公司/合规页 = 91 URL。
- data 站 `llms.txt` / `docs/index.md` / SKU index：**60**。
- 主站 `llms.txt`：**60** SKU 行。

### 唯一 ID / URL 核查

- `sourceId`：60 个全唯一（无重复）。
- `slug`：60 个全唯一。
- `model`：60 个全唯一。
- 别名 URL：仅 `air-filter-p320510` → `air-filter-03-42776-010` 一处规范重定向（上批去重遗留），无其他别名。

---

## P1-3 — 技术 SEO

### sitemap

- `sitemap-index.xml` → 指向 `sitemap-0.xml`（91 URL，全部 `carfilterspro.com`，尾斜杠统一）。
- **`/sitemap.xml` 404 → 已建 alias**：`astro.config.mjs` redirects 新增 `/sitemap.xml` → `/sitemap-index.xml`（构建产物 `dist/sitemap.xml/index.html` meta-refresh + `noindex` + canonical 指向 sitemap-index）。
- 子 sitemap 91 URL 全状态校验：静态页 8 品类 + 60 SKU + 新闻 9 + 公司/合规页，无重复、无空规格页。

### canonical

- 主站：92 页 canonical 自引用（如 `…/products/air-filter/air-filter-17220-5r0-008/`）。
- data 站：89 页 canonical 自引用 `data.carfilterspro.com/...`——**不指向主站首页**（`site/index.html`、`products/HY-OF-690/`、`fitment/` 均复验）。
- 两站 canonical 均与自身 URL 一致，尾斜杠统一。

### 已下架 / 空规格 / 低价值页索引策略

- 现无下架 SKU（60 个全在 sitemap 内）。
- 唯一重定向页 `air-filter-p320510` 带 `noindex`（不索引别名）。
- 空品类 `wiper`（0 SKU）：品类页保留（诚实「SKU list on request」），sitemap 收录，无编造 SKU。

### Schema 字段真实性抽查

| 页面 | Schema | 抽查结果 |
|---|---|---|
| 首页 | WebSite + Organization | name/legalName/url/logo/address 与 `site.ts` 一致 |
| 产品页（`17220-5R0-008`） | Product + BreadcrumbList + Organization | Product.name/sku/mpn = `17220-5R0-008` · brand=huiying · Breadcrumb 与页面层级一致 · url=canonical |
| 新闻页 | BlogPosting | （上批已核验，本批未改动） |
| data 站 | Organization | name/legalName/alternateName/addressRegion 与主站一致 · url=carfilterspro.com |

---

## 构建 / 提交 / 推送

### 主站（Huiying）

- `npm run build` → **92 页通过**（3.62s）。
- `/sitemap.xml` alias 生成 ✅。
- 断链 `0`（`audit-data-links.py`）。

### 数据站（data.huiying）

- `mkdocs build` → **通过**（3s，含 CJK 搜索资产清理 hook）。
- `build-fitment-pages.py` + `build-sku-oe-vehicle.py` 重生成全部数据页。
- 断链 `0`。

### 提交（分步 commit + push 两仓）

（见 git 提交记录，audit3-fix-* 前缀，两仓各分步。）

### 同步

两仓 `products.json` 字节一致（`cmp` 通过），同步 `0 / 0`。
