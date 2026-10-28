# Phase 1 P0 报告 — SKU 身份与证据（零编造核查 · RFQ 流程 · 公司声明 · 图片真实性）

> 审计日期：2026-10-28 · **只审不改** · 发现与假设分离标注
> 覆盖：61 SKU 溯源 · 空规格字段 · 重复文案 · 价格 schema-only · 询价链接 · RFQ 表单 · 公司历史 · 工厂图片

---

## 1. 61 SKU 来源溯源矩阵

### 1.1 溯源分布总览

| source 状态 | 数量 | 占比 | 说明 |
|---|---|---|---|
| `verified-by-source` | **34** | 55.7% | source 目录字段来自 congbenfilter.com 源站并标记「源站可核验」 |
| `reference` | **17** | 27.9% | 字段来自 congbenfilter.com 但仅作「参考」措辞（非断言事实） |
| **无 source 字段** | **10** | 16.4% | huiying 自有 SKU（tianrui 源站 ID 690–703），无外部 source 记录 |

### 1.2 来源主体（sourceId → 源站）

| 来源主体 | SKU 数 | sourceId 范围 | 说明 |
|---|---|---|---|
| **congbenfilter.com** | 51 | 分散（OE 号 SKU + 软管 HY-RH-*） | 全部挂 `source.url = https://www.congbenfilter.com/product/...` |
| **huiying 自有（源 tianrui）** | 10 | 690/691/692/693/698–703 | model `HY-OF-690`…`HY-AF-703`，`source` 字段缺失 |

> **重要澄清（发现，非假设）**：任务说明提到「sourceId→congbenfilter.com 或 tianruifilters.cn 或 huiying 自有」三分法。**实际 `source` 字段只出现两种值：`congbenfilter.com`（51 个）或缺失（10 个 huiying 自有）**。`tianruifilters.cn` 这一来源主体**并未**作为 `source.name` 出现在 products.json 中——那 10 个 huiying 自有 SKU 的原始来源是 tianrui 源站（见 `crawls/tianrui/product-690.txt` 等 + `docs/collection-report.md`），但建站后品牌替换为 huiying，**未在数据集里保留 tianrui 作为 source 记录**。这是溯源链上的一处可追溯性缺口（见 §1.4）。

### 1.3 字段级 verified / reference / NEEDS_VERIFICATION 分布

products.json 中**没有** `NEEDS_VERIFICATION` 字面值——该标记仅存在于 data 子站数据规范与生成脚本（`data.huiying/scripts/build-fitment-pages.py`、`docs/specification/data-status.md`）。主站 products.json 的缺失值表达方式是 **`null` 或字段缺省**（不渲染）。

逐字段统计（61 SKU）：

| 字段 | 有值 | 空/缺 | 缺失方式 |
|---|---|---|---|
| `oeNumbers` | 34 | 27 | 17 个 `null`/空数组 + 10 个字段缺失 |
| `crossReference` | 16 | 45 | 35 个 null + 10 缺失 |
| `material` | 22 | 39 | 29 个 null + 10 缺失 |
| `dimensions` | **4** | **57** | 47 个 null + 10 缺失 |
| `fitment` | 25 | 36 | 26 个 null + 10 缺失 |

**关键发现**：`dimensions` 字段全站仅 4 个 SKU 有值，**93.4%（57/61）的 SKU 无尺寸数据**——这是最稀疏的字段。

### 1.4 零编造核查（逐类标注 reference 措辞 vs 断言事实）

以下按字段类型核查「哪些是 reference 措辞、哪些被断言为事实」：

| 字段类型 | 断言强度 | 证据位置 | 判定 |
|---|---|---|---|
| **OE 号**（oeNumbers） | 断言为「源站发布值」 | `[slug].astro` 渲染时脚注「as published by the source catalog … confirmed per OE application at quoting time」 | ✅ 有 qualifier，非凭空断言 |
| **适配**（fitment.brand/models） | **reference 措辞** | `vehicleFitment.ts` 声明「reference-level examples only … do not constitute a precise fitment claim」+ 页面 disclaimer | ✅ 明确 reference |
| **尺寸**（dimensions） | 仅 4 个有值，其余 `Confirm per order specification` | `productSpec.ts` `CONFIRM` 常量 | ✅ 诚实降级，未编造 |
| **材质**（material） | 22 个有值（如「High-Density Filtration Media」「PP and non-woven fabric」），来源为源站 | `productSpec.ts` 有值才标 verified | ✅ |
| **效率/压差** | **全站无具体数值断言** | 搜索 `efficiency`/`pressure drop`/`micron` 无 SKU 级数值；news 文中仅 industry 参考范围（110–160 permeability）且带 scopeNote | ✅ 无编造 |
| **认证** | 无具体证书编号断言 | `company.ts` 明确「no certificate numbers … invented (audit discipline 4.3)」 | ✅ |
| **价格** | schema-only（10–60 USD AggregateOffer），页面可见文本已移除 | 见 §3 | ✅ |
| **库存** | 无库存数值；`availability=InStock`（schema） | `[slug].astro` offers | ⚠️ schema 断言 InStock 但无实际库存数据支撑 |
| **客户/产能** | 产能声明（10,000m²/100+/3线/20+设备）为 site-claimed | `company.ts` sourceNote 标注「as published in the company's own profile」 | ⚠️ 见 §6 |

**零编造结论**：SKU 级 OE/材质/适配/尺寸均带「source 发布值 + quoting 时确认」或「Confirm per order」降级措辞，**未发现凭空编造的具体规格数值**。唯一需留意的 schema 断言是 `availability: InStock`（61 SKU 全标记在售，但无真实库存系统支撑）。

---

## 2. 产品页检查

### 2.1 空规格表（「Confirm per order specification」分布）

`getProductSpec` 固定生成 11 行：5 行动态（OE / cross-ref / material / dimensions / fitment，有值标 verified 否则 confirm）+ 6 行恒 confirm（vehicle application / filter media / MOQ / lead time / OEM&private label / quality documents）。

**全 confirm（verified=0，即 11 行全「Confirm per order」）的 SKU = 20 个**：

- 10 个 huiying 自有（of-690、cf-691、af-692、af-693、af-698、af-699、af-700、af-701、af-702、af-703）
- 10 个 congben reference 类（8 个 HY-RH-* 软管 + oil-filter-motorcycle-*649 + spark-plugs-*650 + fuel-filter-diesel-*651 + oil-filter-heavy-duty-*652）

**缺失值清单（需补齐的字段，按稀疏度降序）**：

1. **dimensions**：57 SKU 缺失（唯一 4 个有值：见 §1.3）。
2. **crossReference**：45 SKU 缺失。
3. **material**：39 SKU 缺失。
4. **fitment**：36 SKU 缺失。
5. **oeNumbers**：27 SKU 缺失。

> 完整逐 SKU verified/confirm 明细见审计脚本输出（本次未落盘为 CSV，如需可补产 `reports/phase1-missing-fields.csv`）。

### 2.2 重复模板文案检测（N-gram 4-gram Jaccard）

对 61 SKU 页「About this」深度内容段（`productContent.ts` 的 application/scenarios/technical/procurement/selectionNotes/maintenance 合并文本）做两两 4-gram Jaccard 相似度，1830 对比较。

**相似度分布**：min 0.003 · max **0.544** · avg 0.023（整体低，de-templating 有效）。

**TOP 3 重复对**：

| 排名 | 相似度 | SKU 对 | 重复原因 |
|---|---|---|---|
| 1 | **0.544** | `air-filter-p320510` ↔ `air-filter-03-42776-010` | 同为 Freightliner/Detroit 卡车空滤，共享 P320510 交叉号，文案高度重叠 |
| 2 | **0.489** | `rubber-hoses-oil-resistant-nbr-automotive-fuel-hose` ↔ `…-china-facto` | 同一 NBR 油管 SKU 的两种 slug 变体，文案近乎重复 |
| 3 | **0.389** | `oil-filter-heavy-duty-trucks-oil-filters` ↔ `oil-filter-lf14000nn` | 同为重型卡车机滤 |

**发现**：Top1/Top2 是**同源 SKU 的近似重复页**（P320510 有两条 slug；NBR fuel hose 有两条 slug），存在 cannibalization 风险。整体 61 SKU 文案平均相似度 0.023，说明质量批（quality pass 2）的 de-templating 基本成功，但**少数同源/同类 SKU 仍有局部模板化残留**。

### 2.3 误导性参考价（schema-only 状态核实）

- **已核实**：61 SKU 页正文（去 script 后）**0 处可见价格迹象**（无 `$数字`、无 `price range`、无 `USD` 文本）。
- 价格仅存在于 JSON-LD `Product.offers`（`lowPrice=10, highPrice=60, offerCount=1`）。
- git 历史佐证：最近两次 commit 均为「remove visible reference-price note from SKU pages (schema-only price)」。
- **残留风险**：schema 仍断言 `AggregateOffer` + `PriceSpecification`（10–60 USD），但**页面无可见价格锚点**。Google 可能将 schema 价格与页面不一致视为低质量结构化数据。见 P1 建议。

### 2.4 询价链接完整性（?product= 预填）

- **61/61 SKU 页全部含 `?product={model}&url={pageUrl}` 预填询价链接**（0 缺失）。
- 抽样核对预填 `product` 参数 = model 值一致（如 `04465-04030`、`HY-AF-698`、`P320510`、`04E129620`）。
- contact 表单字段对接：`product` 字段 value 绑定 `productParam`，`message` 文本绑定 `prefillMessage`（Product + Product URL 两行）。**对接正常**。

---

## 3. RFQ 表单流程测试 + 邮件投递限制如实报告

### 3.1 提交行为实况

表单 `action="mailto:Martin@carfilterpro.com" method="post" enctype="text/plain"`：

- **无服务端邮件能力**（纯静态站，无后端、无 Serverless 函数、无第三方表单 API）。
- 提交时浏览器尝试打开用户本机默认邮件客户端，把表单字段拼成 `text/plain` 邮件正文，收件人为 `Martin@carfilterpro.com`。
- **依赖用户本机已配置邮件客户端**；若未配置（常见于公共/移动设备），提交会失败或静默无响应。
- 字段校验（`required`）仅在前端，可被绕过，但不影响（因为根本没有后端可绕）。

### 3.2 建议（**只建议不实施**）

| 方案 | 成本 | 说明 |
|---|---|---|
| **Formspree / Web3Forms** | 低（免费档可用） | 改 `action` 为第三方端点，最简落地 |
| **Cloudflare Workers + Email Routing** | 低（站已可托管 CF Pages） | 无额外依赖，配合 CF Email Routing 免 SMTP |
| **Netlify Forms**（若托管 Netlify） | 低 | 平台原生，`data-netlify=true` 即可 |

> 结论：现有 `mailto:` 表单**功能上不可靠**，但**无数据丢失风险**（无后端）。是否升级需用户授权（本阶段不实施）。

---

## 4. 公司历史与工厂声明证据对照

### 4.1 1996 品牌渊源 vs 2017-10-10 实体（表述核验）

| 表述 | 位置 | 判定 |
|---|---|---|
| 「EST. 1996」/「since 1996」 | 首页 hero、footer、`site.since=1996` | ⚠️ 品牌渊源，非法律实体成立年 |
| 「Incorporated 10 October 2017」 | `site.foundingDate=2017-10-10`、`companyDisclosure`、Organization JSON-LD | ✅ 法律实体，有统一社会信用代码支撑 |
| 「tracing back to 1996」/「Brand lineage vs legal entity」 | `company.ts` `brandLineage` 专门段落区分两日期 | ✅ 表述已明确区分，无混淆 |

- **核验结论**：`company.ts` 已主动区分「品牌渊源 1996」与「法律实体 2017」，且 `brandLineage` 段落明确解释二者关系。**表述严谨，无把 1996 冒充实体成立年的问题**。
- 唯一可挑：首页 hero 的 `EST. {site.since}` 直接渲染 1996，视觉上易被误读为公司成立年（虽有 hero facts 同时列出「2017 Incorporated」对冲）。

### 4.2 工厂声明（10,000m² / 100+ 员工 / 3 PU 线 / 20+ 设备）

| 声明 | 数值 | 来源 | 证据强度 |
|---|---|---|---|
| 工厂面积 | 10,000 m²（净车间 >6,000 m²） | 源站 tianrui 公司简介（`crawls/tianrui/text/product-690.txt` 等） | **site-claimed, no independent evidence** |
| 员工数 | 100+（管理 10+ / 技术 15） | 同上源站简介 | **site-claimed** |
| PU 生产线 | 3 条 | 同上（源站原文「three sets of PU filter production lines」） | **site-claimed** |
| 真空实验设备 | 源站原文「two sets of vacuum experiment equipment」，新站简化为「vacuum-testing equipment」 | — | 数量从「2」被弱化为无数字（保守化） |
| 专业设备 | 20+ | 同上（源站「more than 20 sets」） | **site-claimed** |

- **证据状态**：这些数值**全部来自源站摘录**（tianrui 公司简介），**无独立第三方证据**（无官方工商数据、无实地核验、无证书）。`company.ts` 的 `sourceNote` 已如实标注「Production figures … are as published in the company's own profile」。
- **合规结论**：已诚实标注 site-claimed，**未虚构背书**，但对外仍属「无独立证据的产能主张」，风险等级中等（见 summary）。

### 4.3 不虚构背书核查

- 未发现伪造证书编号、测试报告、客户案例、认证徽章。
- `productionProcess`/`qualitySystem`/`equipmentCategories` 均为「framework 描述」+ 诚实限定（「not a machine-by-machine specification」「AQL limits set per product」）。
- Baidu Baike 链接标注「region-blocked 403」，如实说明无法抓取，仅作 URL 引用。

---

## 5. 工厂图片真实 vs 示意

### 5.1 分类

| 类别 | 数量 | 目录 | 来源证据 |
|---|---|---|---|
| **tianrui 源站实拍** | 50（根目录，含 10 张 webp 转换） | `public/images/` | `collection-report.json` 的 `omo-oss-image.thefastimg.com` 源站图床 URL + 页面归属记录 |
| **Seedream AI 生成** | 8 | `public/images/factory-ai/` | `docs/factory-ai-report.md`（模型 `doubao-seedream-4-5-251128`，OCR 复检 0 真字，无水印） |
| **congben 源站产品图** | 300 | `public/images/congben/` | `crawls/congben/crawl-images-map.json` + `products-raw.json` |

### 5.2 工厂页图片真实 vs 示意（合规张力，如实列出）

- **8 张 factory-ai 图为 Seedream AI 生成**，替代了源站 8 张实拍工厂图（`cdb5ad87` `4ccdbf70` `961d7908` `b1412b80` `b27a61f1` `b5a75dda` `de9d5cc3` `f160b99a`）。
- `factory-ai-report.md` 明确记录：**「alt 均为自然描述，无『AI』字样（用户明确要求无 AI 水印/标注）」**。
- **合规张力**：8 张 AI 生成图以「Huiying factory — workshop panorama / production line / pleating machine …」等 alt 文案展示，**未标注 AI 生成**，读者会将其理解为真实工厂实拍。这与「零编造/诚实标注」纪律存在张力。
- **如实列出（发现，非整改建议）**：这是**用户明确指令**（无 AI 标注）导致的合规张力，非自动化失误。审计如实记录该张力，是否加注需用户决策。

### 5.3 congben 图逐类定位（不从文件名推断真实性）

- 300 张 congben 图 = congbenfilter.com 源站产品图，真实性依据是**抓取来源记录**（`crawls/congben/crawl-images-map.json`），**不依据文件名推断**。
- 3 张用于品类 icon（`brake-pads`/`spark-plugs`/`rubber-hoses` 的 `congben/e69a383e…`/`2ef777a7…`/`c221ff4f…`），其余 297 张为 congben SKU 产品图库。
- **注意**：主站 61 SKU 的产品 `image` 字段中，congben 来源的 SKU 用的是哪张图需逐条核对 `products.json` 的 `image` 路径（本次未逐 SKU 比对 image 是否落在 congben/ 目录，如需可补）。

---

## 6. P0 发现清单（分级）

### P0-1（高）RFQ 表单无服务端邮件能力
- **证据**：`contact.astro` `action="mailto:…"`，静态站无后端。
- **影响**：询价提交依赖用户邮件客户端，可能丢单。
- **建议**：Formspree/CF Workers（只建议）。
- **成本**：低。

### P0-2（中高）8 张 AI 工厂图无 AI 标注
- **证据**：`factory-ai-report.md` + `factory.astro` 画廊 alt。
- **影响**：读者误判为实拍，诚实性风险。
- **建议**：加「示意/AI 生成」标注或注记（需用户决策）。
- **成本**：低（改 alt/加 caption）。

### P0-3（中）dimensions 字段 93% 缺失
- **证据**：57/61 SKU 无尺寸。
- **影响**：SKU 页规格表大量「Confirm per order」，采购信息密度低。
- **建议**：从源站补录可用尺寸（有源站数据则补）。
- **成本**：中（需逐 SKU 抓源站）。

### P0-4（中）10 个 huiying 自有 SKU 无 source 记录，溯源链断裂
- **证据**：sourceId 690–703 的 10 SKU 无 `source` 字段，tianrui 来源未保留。
- **影响**：无法从数据集直接追溯这 10 SKU 的源站出处。
- **建议**：补 `source` 记录（tianrui 源站 URL）。
- **成本**：低。

### P0-5（中低）同源近似重复 SKU 页（P320510 / NBR fuel hose 各两条 slug）
- **证据**：N-gram 相似度 0.544 / 0.489。
- **影响**：cannibalization 风险。
- **建议**：canonical 指向主 slug 或合并。
- **成本**：低。

### P0-6（低）schema 断言 InStock + 10–60 USD 但无库存/可见价格支撑
- **证据**：`availability=InStock` + AggregateOffer，页面无可见价格。
- **影响**：结构化数据与页面内容不一致。
- **建议**：改为 `PreOrder`/`InStock` 视真实情况，或去掉 offers 价格。
- **成本**：低。

---

*本报告为审计产出，未修改任何业务文件。发现（有证据）与假设（推断）已分节标注。*
