# Index Quality Review — carfilterspro 产品页 Sitemap 排除批

**日期**：2026-10-28
**范围**：carfilterspro.com（Astro 主站）60 SKU · 8 品类
**审计类型**：内容质量分级 + 技术 SEO（sitemap 排除薄内容页，不删页）

---

## 1. 结论摘要

| 指标 | 数值 |
|---|---|
| SKU 总数 | 60 |
| A 档（资料充实，保留 sitemap） | **19** |
| B 档（有来源但资料薄，保留 sitemap） | **23** |
| C 档（空内容/近似重复/未就绪，排除 sitemap） | **18** |
| Sitemap URL 数 | **91 → 73**（排除 18 个产品页 URL） |
| robots noindex 页数（C 档「未就绪」子集） | **10** |
| 仅 sitemap 排除（C 档「空内容/近似重复」子集） | **8** |
| B 档补强（接入 per-SKU 编辑内容） | **23**（全部 B 档 + 19 A 档同步受益） |
| 排除页仍可达（dist 存在） | **18 / 18** |
| 内链断链 | **0**（3259 条内部链接全绿） |
| 内链可达性（分类页仍链到排除页） | **保留** |
| 构建 | ✅ `npm run build` 92 pages，0 error |

**核心原则**：**不删页** —— C 档页面保持可访问、内链不删，仅从 sitemap 排除；「未就绪」子集另加 `noindex`（从严按「不准备参与搜索」字面处理）；「空内容/近似重复」子集仅 sitemap 排除。

---

## 2. 分级模型（证据深度）

每 SKU 按「独有字段数 / 重复度 / 通用段占比」三维修正分档：

- **A 档**：OE 号 + 交叉参考 + 材质（和/或品牌适配）+ source-verified，独有字段 ≥ 3，独立资料充实。
- **B 档**：有来源但资料薄 —— congben 仅 OE 锚点（独有字段 1–2）的薄页；以及 tianrui 溯源 SKU（独有字段 0，但有独立编辑内容 + 唯一图片，非重复）。
- **C 档**：排除 —— congben 无 OE 通用 SKU（模板化/近似重复）+ 近似重复 OE SKU `oil-filter-15400-plc`。

C 档内再分两档（**两档处理分开记录**）：

1. **「未就绪」→ noindex + sitemap 排除**：源目录未发布任何独有字段（无 OE/交叉/材质/尺寸/适配），占位 SKU 页，按「不准备参与搜索」字面从严加 `noindex`。
2. **「空内容/近似重复」→ 仅 sitemap 排除**：有 ≥1 个已发布字段但仍通用/近似重复，不加 noindex（页面仍可被抓取/内链发现）。

---

## 3. 60 SKU 分级清单

> 字段列：独有字段=OE/交叉/材质/尺寸/适配 命中数；OE=OE 号条数；交叉/材质/尺寸/适配=✓ 表示该字段存在。

| # | SKU (slug) | 品类 | 档 | 独有字段 | OE | 交叉 | 材质 | 尺寸 | 适配 | 来源 | 依据 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `air-filter-03-42776-010` | air-filter | **A** | 3 | 2 | ✓ |  |  | ✓ | congben/source-verified | OE+交叉参考+适配，独立资料充实 |
| 2 | `air-filter-04e129620` | air-filter | **A** | 3 | 2 |  | ✓ |  | ✓ | congben/source-verified | OE+材质+适配，独立资料充实 |
| 3 | `air-filter-13717811026` | air-filter | **A** | 4 | 1 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 4 | `air-filter-1500a098` | air-filter | **A** | 4 | 1 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 5 | `air-filter-16546-ed000` | air-filter | **A** | 4 | 1 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 6 | `air-filter-17220-5r0-008` | air-filter | **A** | 4 | 1 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 7 | `air-filter-17801-21050` | air-filter | **A** | 4 | 1 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 8 | `air-filter-17801-30070` | air-filter | **A** | 3 | 1 | ✓ | ✓ |  |  | congben/source-verified | OE+交叉+材质 |
| 9 | `air-filter-28113-2s000` | air-filter | **A** | 4 | 1 |  | ✓ | ✓ | ✓ | congben/source-verified | OE+材质+尺寸+适配 |
| 10 | `air-filter-a2700940004` | air-filter | **A** | 4 | 1 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 11 | `air-filter-lr011593` | air-filter | **A** | 4 | 1 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 12 | `brake-pads-04465-04030` | brake-pads | **A** | 3 | 2 | ✓ |  |  | ✓ | congben/source-verified | OE+交叉+适配（与 04465-0K020 共享通用图，OE 不同，非重复） |
| 13 | `oil-filter-04152-31080` | oil-filter | **A** | 4 | 1 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 14 | `oil-filter-15400-plc-004` | oil-filter | **A** | 3 | 2 | ✓ |  |  | ✓ | congben/source-verified | OE+交叉+适配（15400-plc 的富副本） |
| 15 | `oil-filter-90915-yzze1` | oil-filter | **A** | 4 | 2 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 16 | `oil-filter-90915-yzze2` | oil-filter | **A** | 3 | 2 | ✓ |  |  | ✓ | congben/source-verified | OE+交叉+适配 |
| 17 | `oil-filter-a0001802309` | oil-filter | **A** | 4 | 2 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 18 | `oil-filter-a2701800009` | oil-filter | **A** | 4 | 4 | ✓ | ✓ |  | ✓ | congben/source-verified | OE+交叉+材质+适配 |
| 19 | `rubber-hoses-17127525023` | rubber-hoses | **A** | 3 | 1 |  | ✓ |  | ✓ | congben/source-verified | OE+材质+适配（OE 溯源胶管） |
| 20 | `af-692` | air-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源：独有字段 0，独立编辑内容+唯一图片 |
| 21 | `af-693` | air-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源 |
| 22 | `af-698` | air-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源 |
| 23 | `af-699` | air-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源 |
| 24 | `af-700` | air-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源 |
| 25 | `af-701` | air-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源 |
| 26 | `af-702` | air-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源 |
| 27 | `af-703` | air-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源 |
| 28 | `air-filter-re596317` | air-filter | **B** | 2 | 2 |  |  |  | ✓ | congben/source-verified | congben OE 薄页（仅 OE+适配） |
| 29 | `brake-pads-04465-0k020` | brake-pads | **B** | 2 | 3 |  |  |  | ✓ | congben/source-verified | congben OE 薄页（与 04465-04030 共享图，OE 不同） |
| 30 | `cabin-filter-87139-0n010` | cabin-filter | **B** | 2 | 2 |  |  |  | ✓ | congben/source-verified | congben OE 薄页 |
| 31 | `cf-691` | cabin-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源 |
| 32 | `fuel-filter-1000fh` | fuel-filter | **B** | 1 | 2 |  |  |  |  | congben/source-verified | congben OE 薄页（仅 OE） |
| 33 | `fuel-filter-23390-0l070` | fuel-filter | **B** | 2 | 2 |  |  |  | ✓ | congben/source-verified | congben OE 薄页 |
| 34 | `fuel-filter-500fh` | fuel-filter | **B** | 1 | 2 |  |  |  |  | congben/source-verified | congben OE 薄页（仅 OE） |
| 35 | `fuel-filter-900fg` | fuel-filter | **B** | 1 | 2 |  |  |  |  | congben/source-verified | congben OE 薄页（仅 OE） |
| 36 | `fuel-filter-ff5507` | fuel-filter | **B** | 1 | 1 |  |  |  |  | congben/source-verified | congben OE 薄页（仅 OE） |
| 37 | `of-690` | oil-filter | **B** | 0 | 0 |  |  |  |  | tianrui/reference | tianrui 溯源 |
| 38 | `oil-filter-04152-31090` | oil-filter | **B** | 1 | 2 |  |  |  |  | congben/source-verified | congben OE 薄页（仅 OE） |
| 39 | `oil-filter-04152-37010` | oil-filter | **B** | 2 | 2 |  |  |  | ✓ | congben/source-verified | congben OE 薄页 |
| 40 | `oil-filter-15208-65f00` | oil-filter | **B** | 1 | 1 |  |  |  |  | congben/source-verified | congben OE 薄页（仅 OE） |
| 41 | `oil-filter-35330-08010` | oil-filter | **B** | 2 | 2 |  |  |  | ✓ | congben/source-verified | congben OE 薄页 |
| 42 | `oil-filter-lf14000nn` | oil-filter | **B** | 1 | 1 |  |  |  |  | congben/source-verified | congben OE 薄页（仅 OE） |
| 43 | `fuel-filter-diesel-fuel-filter-water-separator` | fuel-filter | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · **noindex** |
| 44 | `oil-filter-15400-plc` | oil-filter | **C** | 2 | 1 |  |  |  | ✓ | congben/source-verified | 近似重复（15400-PLC-004 薄副本，同图同 Honda 族） |
| 45 | `oil-filter-heavy-duty-trucks-oil-filters` | oil-filter | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · **noindex** |
| 46 | `oil-filter-motorcycle-oil-gasoline-filter-fuel-filters` | oil-filter | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · 共享图 · **noindex** |
| 47 | `oil-filter-premium-motorcycle-fuel-and-oil-filters-china-fact` | oil-filter | **C** | 1 | 0 |  | ✓ |  |  | congben/reference | 无 OE 通用 · 近似重复（共享图） |
| 48 | `rubber-hoses-black-hydraulic-oil-fuel-hose-high-pressure-fuel-l` | rubber-hoses | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · **noindex** |
| 49 | `rubber-hoses-custom-auto-black-elbow-epdm-rubber-hose-pipe-cool` | rubber-hoses | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · **noindex** |
| 50 | `rubber-hoses-custom-epdm-rubber-elbow-hose-china-factory-and-le` | rubber-hoses | **C** | 1 | 0 |  | ✓ |  |  | congben/reference | 无 OE 通用 · 近似重复 |
| 51 | `rubber-hoses-custom-high-temp-radiator-hose-auto-elbow-silicone` | rubber-hoses | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · **noindex** |
| 52 | `rubber-hoses-custom-high-temperature-radiator-silicone-hose-fac` | rubber-hoses | **C** | 2 | 0 |  | ✓ | ✓ |  | congben/reference | 无 OE 通用 · 近似重复 |
| 53 | `rubber-hoses-custom-reinforced-silicone-turbo-heater-hose-90-de` | rubber-hoses | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · **noindex** |
| 54 | `rubber-hoses-custom-reinforced-silicone-turbo-heater-hose-china` | rubber-hoses | **C** | 2 | 0 |  | ✓ | ✓ |  | congben/reference | 无 OE 通用 · 近似重复 |
| 55 | `rubber-hoses-heat-resistant-braided-silicone-heater-vacuum-hose` | rubber-hoses | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · **noindex** |
| 56 | `rubber-hoses-high-performance-braided-silicone-heater-vacuum-ho` | rubber-hoses | **C** | 2 | 0 |  | ✓ | ✓ |  | congben/reference | 无 OE 通用 · 近似重复 |
| 57 | `rubber-hoses-oil-resistant-nbr-automotive-fuel-hose` | rubber-hoses | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · **noindex** |
| 58 | `rubber-hoses-oil-resistant-nbr-automotive-fuel-hose-china-facto` | rubber-hoses | **C** | 1 | 0 |  | ✓ |  |  | congben/reference | 无 OE 通用 · 近似重复 |
| 59 | `rubber-hoses-premium-nbr-nitrile-rubber-hose-china-factory-and` | rubber-hoses | **C** | 1 | 0 |  | ✓ |  |  | congben/reference | 无 OE 通用 · 近似重复 |
| 60 | `spark-plugs-auto-original-genuine-engine-spark-plug` | spark-plugs | **C** | 0 | 0 |  |  |  |  | congben/reference | 无 OE 通用 · 未就绪 · **noindex** |

---

## 4. Sitemap 排除清单（18 slug）

**C 档「未就绪」→ noindex + sitemap 排除（10）**：

1. `fuel-filter-diesel-fuel-filter-water-separator`
2. `oil-filter-heavy-duty-trucks-oil-filters`
3. `oil-filter-motorcycle-oil-gasoline-filter-fuel-filters`
4. `rubber-hoses-black-hydraulic-oil-fuel-hose-high-pressure-fuel-l`
5. `rubber-hoses-custom-auto-black-elbow-epdm-rubber-hose-pipe-cool`
6. `rubber-hoses-custom-high-temp-radiator-hose-auto-elbow-silicone`
7. `rubber-hoses-custom-reinforced-silicone-turbo-heater-hose-90-de`
8. `rubber-hoses-heat-resistant-braided-silicone-heater-vacuum-hose`
9. `rubber-hoses-oil-resistant-nbr-automotive-fuel-hose`
10. `spark-plugs-auto-original-genuine-engine-spark-plug`

**C 档「空内容/近似重复」→ 仅 sitemap 排除（8）**：

1. `oil-filter-15400-plc`（近似重复）
2. `oil-filter-premium-motorcycle-fuel-and-oil-filters-china-fact`
3. `rubber-hoses-custom-epdm-rubber-elbow-hose-china-factory-and-le`
4. `rubber-hoses-custom-high-temperature-radiator-silicone-hose-fac`
5. `rubber-hoses-custom-reinforced-silicone-turbo-heater-hose-china`
6. `rubber-hoses-high-performance-braided-silicone-heater-vacuum-ho`
7. `rubber-hoses-oil-resistant-nbr-automotive-fuel-hose-china-facto`
8. `rubber-hoses-premium-nbr-nitrile-rubber-hose-china-factory-and`

---

## 5. B 档补强清单

**动作**：将已存在但未接入的 `src/data/productContent.ts`（59 SKU 去模板化的 per-SKU 编辑内容：application / scenarios / technical / procurement / selectionNotes / maintenance / buyerNote）接入 `[slug].astro` 模板，新增「Product & sourcing notes」区块。

- **有源数据者补数据**：congben OE 薄页（13）—— 在保留「What we can confirm / What you should provide」诚实双区前提下，补充 per-SKU 应用/结构/采购编辑内容。
- **无源者强化诚实双区**：tianrui 溯源 SKU（10）—— 无 OE/交叉/材质，编辑内容作为 SKU 级独立信息补入，「按订单确认」双区保持不变。
- **差异化深度保持**：证据字段（OE/交叉/材质/适配）仍按源目录有条件渲染，A 档证据字段多、B 档少，深度差异不抹平。

受益页：全部 59 个有编辑内容的 SKU（A 19 + B 23 + 部分 C），`oil-filter-15400-plc` 无编辑内容条目（已为 C 档近似重复）。

---

## 6. data 站 sitemap 同步处理（字节一致纪律评估）

- **data.carfilterspro.com（`data.huiying` 仓库）是参考数据站（MkDocs）**，产品页按 OE/型号为键的全量参考数据（60 产品 + 9 分类 = 69 个 `/products/` URL，sitemap 共 89 URL）。
- **决策**：data 站**保留全量**，不做 sitemap 排除。理由：data 站定位是参考数据集/字节一致数据源（与 `data-landeng`、`data.*` 等一致），全量覆盖是目标，不是 SEO 商业落地页。
- **与主站处理分开记录**：主站（carfilterspro.com）是商业 SEO 落地站 → 排除薄内容页；data 站是参考数据站 → 全量。两站定位不同，sitemap 口径有意不一致，不要求字节一致。

---

## 7. 实现记录

- **`src/data/indexQuality.mjs`（新增）**：分级三档 slug 数组 + `NOINDEX_SLUGS` + `SITEMAP_EXCLUDED_SLUGS` + `isSitemapExcludedPath()`，作为 sitemap filter / noindex / 报告三处单一事实源。
- **`astro.config.mjs`**：`@astrojs/sitemap` 增加 `filter`，排除 C 档 18 个产品页 URL；页面保留、内链保留。
- **`src/pages/products/[category]/[slug].astro`**：① `noindex` 属性传 `BaseLayout`（10 个「未就绪」页）；② 接入 `getProductContent()` 渲染「Product & sourcing notes」编辑区块。
- **`BaseLayout.astro`**：已原生支持 `noindex` prop（`<meta name="robots" content="noindex, follow">`），无需改动。

---

## 8. 验证结果

| 检查项 | 结果 |
|---|---|
| `npm run build` | ✅ 92 pages，0 error，4.10s |
| Sitemap URL 数 | ✅ 91 → **73**（-18） |
| 排除 slug 残留 sitemap | ✅ 0 |
| 排除页仍可达（dist HTML 存在） | ✅ 18 / 18 |
| noindex 页数 | ✅ 10（+404 页天然 noindex，共 11） |
| 内链断链 | ✅ 0 / 3259 |
| 分类页仍链到排除页 | ✅ 保留 |
| 编辑区块渲染（A/B/C 页） | ✅ 正常 |
