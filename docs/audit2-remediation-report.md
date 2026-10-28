# carfilterspro（Huiying）第二份外部公开页面审计 — 整改报告

> 生成时间：2026-10-28 · 仓库：`Huiying`（Astro · 92 页 · 61 SKU · 线上域名 carfilterspro.com）
> 审计稿：`docs/source/carfilterpro-audit-2.txt`
> 整改范围：P0 域名信号统一 + P1 产品页质量 + B2B 转化 + 新闻二查 + Schema 补全

## 结论概览

| 项 | 结果 |
|---|---|
| 域名统一 | ✅ 全站信号统一到 carfilterspro.com（canonical / sitemap / og / robots / schema / llms.txt） |
| 域名残留复扫（huiyingfilter.com） | ✅ dist 全量 `0` |
| 车型锚文本修复 | ✅ 427 车型参考条目 + 首页 3 处内联 → 纯文本诚实表述 + reference fitment data 外链（70 处） |
| 产品页去重 | ✅ 6 区块 → 4 区块 · 规格表 Verified by source / Confirm per order 两区 |
| 询价预填 | ✅ 产品页 CTA 携带 `?product=&url=` → contact 表单读取预填 + 新增 OE 字段 |
| 新闻修正 | ✅ 3 篇加 reference/scope 注记 + BlogPosting schema |
| Schema 核查 | ✅ WebSite / Organization / Product / BreadcrumbList / BlogPosting 全具备且一致 |
| 构建 | ✅ `npm run build` 92 页通过 |
| 断链 / 缺图 | ✅ 0 / 0 |

---

## P0 — 域名信号统一（文件级清单）

生产域名统一到 **`carfilterspro.com`**。改动文件：

| 文件 | 改动 |
|---|---|
| `astro.config.mjs` | `site` → `https://carfilterspro.com`；`trailingSlash: 'ignore'` → `'always'` |
| `src/data/site.ts` | `domain` → `carfilterspro.com`；新增 `dataSiteUrl: 'https://data.huiying.com'`（兄弟数据站引用） |
| `public/robots.txt` | `Sitemap` → `https://carfilterspro.com/sitemap-index.xml` |
| `public/llms.txt` | 全部 83 处 URL → `carfilterspro.com` |
| `src/layouts/BaseLayout.astro` | `siteUrl` 回退 → `https://carfilterspro.com`（Organization schema url/logo、og:image 同步） |
| `src/pages/products/[category]/[slug].astro` | `siteUrl` 回退 → `https://carfilterspro.com` |

**邮箱**：`Martin@carfilterpro.com` 为用户指定值，**保留未改**。审计提示该域名少一个 `s`（应为 carfilterspro），属需用户核实的邮箱归属问题，本批不擅自更改——**报告注记待核实**。

**构建产物核验**（全部 carfilterspro.com，无 huiyingfilter.com 残留）：
- `dist/sitemap-index.xml` → `https://carfilterspro.com/sitemap-0.xml`
- `dist/sitemap-0.xml` → 92 URL 全部 `https://carfilterspro.com/...`，尾斜杠统一
- `dist/robots.txt` → carfilterspro.com Sitemap
- 全站 `<link rel="canonical">` → 全部 carfilterspro.com（抽查首页 + 产品页通过）
- 全站 `og:image` → carfilterspro.com 资源

**canonical / 斜杠一致性**：全站自引用 canonical；`trailingSlash: 'always'` 使 92 条 sitemap URL 与 canonical 尾斜杠一致。

---

## P1 — 产品页质量

### 1. 车型锚文本误导修复

审计发现的「Toyota Corolla air filter」等锚文本全部指向通用品类页 `/products/air-filter/` 的问题已修复：

- **首页** 3 处内联车型链接（Toyota Corolla / BMW 3 Series / Honda Civic）→ 改为诚实纯文本「common application references include … — listed as reference fitment data」+ 指向 `data.huiying.com/fitment/` 的单一 reference 外链。
- **产品页 / 品类页** fitment 区块：427 个品牌-车型参考条目（8 品类）不再渲染为指向通用品类页的 `<a>` 链接，改为纯文本；区块底部统一替换为 `data.huiying.com/fitment/{category}/` 的「reference fitment data ↗」外链（诚实标注 reference-only）。
- 全站 `data.huiying.com/fitment/` reference 外链共 **70 处**（1 首页 + 8 品类页 + 61 产品页）。
- 无真实适配数据的车型长尾链接 **不再生成**。

### 2. 产品页段落去重

- **6 区块 → 4 区块**：`Application` + `Application scenarios` 合并为「Application & scenarios」；`Procurement notes` + `Selection notes` 合并为「Procurement & selection」；`Technical notes`、`Maintenance` 保留。
- **消除「confirm via OE」重复表述**：原「Data source … confirmed per order」与「Dimensions … confirmed per OE application」两段合并为单段，每 SKU 页「confirm per OE」模板级表述收至 1 处。
- **提高信息密度**：合并后宽区块（`deep-block--wide`）采用双栏列表布局。
- **两区标签强化**：规格表由平铺改为 `Verified by source`（来源目录已提供：OE / cross-reference / material / dimensions / fitment）与 `Confirm per order`（MOQ / lead time / OEM / quality documents 等）两个清晰分区。

### 3. 价格表达

`USD 10–60 (reference only)` 为用户指定值，**保留**，页面已明确 reference 标注。**报告注记**：建议后续按型号细化区间（需用户报价数据），避免全站共享同一区间。

### 4. B2B 转化

- 产品页 CTA 由 `Get a Quote → /contact/` 改为 `Request a quote → /contact/?product=HY-AF-692&url=…`（`encodeURIComponent` 处理型号与 URL）。
- contact 表单读取 `?product=` 与 `?url=` 参数：`Product model` 字段预填型号，`Message` 预填产品 URL。
- 新增专用 `OE / cross-reference number` 字段（强化 OE 匹配请求说明）。

---

## 新闻文章二查

审计点名 3 篇（2021 年）已加 **reference/scope 注记**并软化无据断言：

1. `How to choose an air filter`（how-to-choose-air-filter）
2. `Why does sludge still appear in the oil pan`（why-does-sludge-still-appear-in-the-oil-shell）
3. `Frequently Asked Questions About Excavator Filter Elements`

每篇新增 `scopeNote`（「Reference & scope」区块）：110–160 渗透率区间、250/500 小时更换间隔、油泥黏度倍数等表述均标注为「indicative reference / 需按制造商规格确认」，不再以绝对断言呈现。

---

## Schema 补全核验

| 页面 | Schema | 状态 |
|---|---|---|
| 首页 | `WebSite`（`@id …/#website` + publisher → Organization） | ✅ 新增 |
| 全站 | `Organization`（name/legalName/url/logo/address/contactPoint） | ✅ 已有，域名已同步 |
| 产品页 | `Product` + `BreadcrumbList` | ✅ 已有，url/canonical 一致 |
| 新闻页 | `BlogPosting`（headline/datePublished/author/publisher） | ✅ 新增 |

复验一致性：Organization url/logo、Product url、canonical、og:image、sitemap 全部 carfilterspro.com，无跨域。

---

## 验证结果

- `npm run build` → **92 页构建通过**（3.47s）。
- 域名残留复扫：`grep -r "huiyingfilter.com" dist/` → **0**。
- 断链 / 缺图：内部链接、`_astro` 资源、图片引用 → **0 / 0**。
- canonical / og / sitemap / robots 抽查：全部 carfilterspro.com。
- 车型锚文本核查：误导性 `href="/products/{category}/" title=…` → **0**。

---

## 提交

分步 commit：

- `96f1bbf audit2-fix-p0-domain`
- `3ee7025 audit2-fix-p1-product`
- `8029017 audit2-fix-p1-home-contact`
- `7641bdd audit2-fix-p1-news-schema`

（报告本文件为第 5 步 commit。）

## 遗留 / 需用户核实

1. **邮箱域名** `Martin@carfilterpro.com` 少 `s`（审计提示应为 carfilterspro）——保留用户指定值，待核实。
2. **价格区间细化**：`USD 10–60` 建议后续按型号区间化（需报价数据）。
3. **data.huiying.com 兄弟站**：其 `mkdocs.yml` 的 `main_site` / `copyright` 仍引用 `huiyingfilter.com`——属另一仓库，本批未动（如需统一可另行处理）。
