# Huiying 主站 · 审计整改批报告（audit-remediation）

> 生成时间：2026-10-27 · 仓库：`Huiying`（Astro · 品牌 huiying · 域名 huiyingfilter.com）
> 批号：`audit-fix-*`（分步 commit+push）· 纪律：零编造 · 「按订单规格确认」替代推测值 · 分步提交
> 范围：P0-1 / P0-2 / P1-1 / P1-2 + SEO 技术验证（本地可查项）· P2 注记（本轮不做）

## 一、审计项 → 整改 → 验证状态总览

| 审计项 | 整改动作 | 验证状态 |
| --- | --- | --- |
| **P0-1** 空品类治理（燃油/雨刮 0 SKU） | 主导航隐藏空品类 · 产品页诚实框架 · 首页「On request」角标 | ✅ PASS |
| **P0-2** SKU 页数据结构化 | 10 SKU 页统一「Specification & Ordering」表 · 无数据字段「Confirm per order specification」 | ✅ PASS（10/10） |
| **P1-1** 制造商证据展开 | /factory/ 新增生产流程 · 质检体系 · 设备类别 · OEM 交付流程 | ✅ PASS |
| **P1-2** 旧文章逐篇审核 | 9 篇翻译腔/适用范围/无据断言修正 · 不改日期 · 逐篇记录 | ✅ PASS（9/9） |
| **P2** 知识支柱 / 交叉参考查询 | 按审计建议「先目录后内容」，本轮不做 | ⏸ 注记 |
| SEO 技术验证 | title/desc 唯一 · H1 · canonical · sitemap/robots · schema · alt · 内链 | 见 §五 |

---

## 二、P0-1 · 空品类治理（首页承诺 vs 目录不一致）

**问题**：`fuel-filter` 与 `wiper` 两品类 0 SKU，但主导航/首页将其与有货品类并列展示。

**整改**：
1. **主导航隐藏**：`src/data/site.ts` 为品类新增 `stocked` 标记，导出 `stockedCategories`（Air/Cabin/Oil）；`Footer.astro`「Products」列改为只渲染 `stockedCategories`，燃油/雨刮从页脚产品导航移除。
2. **首页品类入口同步**：`src/pages/index.astro` 品类卡与 `/products/` 总览卡，空品类显示「On request」角标（`cat-card__count--request` / `cat__count--request`），不再显示「0 products」。
3. **首页 hero 承诺口径**：lede 改为「10 reference SKUs listed across the stocked air, cabin and oil ranges, with fuel-filter and wiper lines available on request」，消除「5 品类全有货」的暗示。
4. **产品页保留但诚实框架**：`src/pages/products/[category].astro` 空品类页不再显示「currently being prepared」，改为「This product line is part of our production capability. The SKU list is available on request…」+「Request the SKU list」CTA；URL 不删不改。

**验证**：页脚 Products 列仅 Air/Cabin/Oil；首页/总览空品类卡显示「On request」×2；`/products/fuel-filter/`、`/products/wiper/` 保留并渲染诚实框架。

---

## 三、P0-2 · SKU 页数据结构化

**问题**：10 个 SKU 页缺少采购级字段（尺寸/OE/交叉参考/车型应用/滤材/MOQ/交期/贴牌/质量文件）。

**整改**：
- 新增 `src/data/productSpec.ts`：`getProductSpec(categorySlug)` 返回 9 字段表。
- `src/pages/products/[category]/[slug].astro` 新增「Specification & Ordering」节，表格渲染 9 字段，并加说明「Values marked "Confirm per order specification" are finalised against your OE / cross-reference number and order quantity」。
- **有数据填数据 · 无数据明确标注**：
  - `Vehicle application` / `Filter media`：按品类类型填诚实参考级措辞（如 air-filter「Pleated filter-paper media (grade confirmed per application)」）。
  - `Dimensions` / `OE number` / `Cross-reference` / `MOQ` / `Lead time`：源数据无此数据 → 一律「Confirm per order specification」。
  - `OEM & private label` →「Available — confirm per order specification」；`Quality documents` →「Available on request — confirm per order specification」。
- 价格区保留（10–60 USD），标注「reference only」（原样保留）。

**验证**：10 个 SKU 页均渲染「Specification & Ordering」表；每页 5 处「Confirm per order specification」+ 2 处「confirm per order specification」变体 + 2 处参考级填充字段。**覆盖 10/10**。

---

## 四、P1-1 · 制造商证据展开（/factory/）

**整改**（`src/data/company.ts` 新增 4 组数据 + `factory.astro` 渲染）：
1. **生产流程** `productionProcess`：折纸 Pleating → 粘接/密封 Bonding & sealing（PU 聚氨酯端盖）→ 组装 Assembly → 检验 Inspection & testing（框架性）。
2. **质检体系** `qualitySystem`：IQC 来料 / IPQC 过程 / FQC 成品 / OQC 出货 + AQL 抽样框架（`aqlNote` 明确具体 AQL 等级按订单确认）。
3. **设备类别** `equipmentCategories`：折纸/折叠机 · PU 端盖模塑粘接线 · 组装密封 · 真空/泄漏测试 · 测量检验工具（框架性，引用公司简介已发布的 3 条 PU 线 / 20+ 台设备）。
4. **OEM 交付流程** `oemDeliveryProcess`：样品确认 → 规格冻结 → 批次标识 → MOQ/交期规则。

**诚实纪律**：全程框架性措辞，未虚构任何证书编号、测试结果或具体机器台数；仅引用已发布设备口径。

**验证**：`/factory/` 渲染 4 个新节（Production process / Quality control system / Equipment categories / OEM & private-label delivery process），含 IQC/IPQC/FQC/OQC 门 + 4 步交付流程。

---

## 五、P1-2 · 旧文章逐篇审核（9 篇 2021 新闻）

**纪律**：不改发布日期、不改 slug、不批量重写结构；逐篇修正翻译腔 → 自然英文、技术表述加适用范围限定、无据断言软化/标注 reference。

| # | 文章 | 修正点 |
| --- | --- | --- |
| 49 | How to choose **an** air filter | 删除无据「increased service life: 50%」测试结果；MANN/DONALDSON 透气度「110–160」软化「commonly cited… indicative reference」；加螺杆空压机适用范围限定；origami→pleating；「three filters」「the machine」翻译腔修正 |
| 50 | Why does sludge still appear in the oil **pan** | 标题 oil shell→oil pan；「fuel residue/carbon mud」→oil/carbon sludge；「greasy」→sludge；「filter screen」→pickup screen；加自然吸气 vs 涡轮/假机油适用范围限定 |
| 51 | Excavator FAQ | magazines→impurities(×2)；ash capacity→dust-holding capacity；cylinder pull→cylinder scoring；pure→genuine；删「110–230 grams of dust」无据数值→「closely tied to how much dust」；「250h/500h」加「general reference… manufacturer's schedule」限定；删重复开场段 |
| 52 | The lungs of the engine: … | 标题标点修正；cylinder pull→cylinder scoring；「excessively thick mixture」→overly rich mixture；「cleaned frequently」→「inspected regularly and replaced on schedule」（修正误导性清洁建议）；加进气上游适用范围 |
| 53 | … replace the oil filter when **changing** the oil | 标题 maintaining→changing；machine/mechanical filter→oil filter；「25% pollutants」无据数值→「a meaningful share」；「useless for the dust」→「does nothing about chemical degradation」 |
| 54 | Good engine oil… oil **pan** | 与 #50 同源重复，应用同套修正；**重复内容见未解决清单** |
| 55 | What you may not know about the oil filter | 标题重译；small tin can→metal canister；machine filter→oil filter；check valve→anti-drain-back valve；「5000 km」→「general reference… typical interval such as 5,000 km」 |
| 56 | The importance of filter efficiency | 删重复开场段；「delicate workmanship」→tight tolerances；「price is much more gentle」→filter is inexpensive；适用范围=柴油/共轨 |
| 57 | Air filter misconceptions and how to identify… | 标题重译；cylinder to strain→cylinder scoring；「8×/3×/9×」磨损无据数值→「several times」+「commonly cited test」；shop around→compare options；修复气流比判定逻辑表述 |

**同步**：`public/llms.txt` 新闻标题已同步更新为新标题（slug/URL 不变）。

**验证**：9 篇标题/正文渲染更新；发布日期 2021-10-14/25 未改动。

---

## 六、SEO 技术验证（本地可查项）

| 检查项 | 结果 | 状态 |
| --- | --- | --- |
| title 唯一性 | `dist/` 全量 `<title>` 无重复 | ✅ PASS |
| H1 单页单一 | 38 页每页 1 个 H1 | ✅ PASS |
| canonical | 38 页每页 1 条 `rel="canonical"` | ✅ PASS |
| sitemap | `sitemap-index.xml` + `sitemap-0.xml`（38 URL） | ✅ PASS |
| robots | `public/robots.txt` 含 Sitemap 声明 | ✅ PASS |
| Organization schema | 38 页渲染 | ✅ PASS |
| Product schema | 10 SKU 页渲染 | ✅ PASS |
| BreadcrumbList schema | 10 SKU 页渲染 | ✅ PASS |
| 图片 alt | `dist/` 0 个 `<img>` 缺失 alt | ✅ PASS |
| 内链断链 | 38 页 · 0 断链 | ✅ PASS |

---

## 七、数据站部署状态注记（data.huiying.com）

- 本地构建就绪：`requirements.txt`（mkdocs==1.6.1 + mkdocs-material==9.7.7）与 `hooks/build_hook.py` 已修复提交，`mkdocs build` 本地可过。
- 线上返回 **000**（错误）：需用户到 Cloudflare Pages 侧**重新部署** data.huiying 站点（本地产物无法自动同步到 CF）。
- 关联仓库：`data.huiying`（site_url `https://data.huiying.com`）。

---

## 八、未解决清单 / 待用户决策

1. **新闻重复内容**：#50 与 #54 正文几乎完全相同（同主题「油底壳油泥」）。本轮按 P1-2 纪律仅做措辞修正、保留原样；重复内容属内容级去重，需用户决定是否合并/重写其一。
2. **域名口径不一致（需用户确认）**：本批 brief 标注「域名 carfilterspro.com」，但仓库实际配置为 `huiyingfilter.com`（`astro.config.mjs` site、`robots.txt` Sitemap、`llms.txt`、schema canonical），且联系邮箱为 `carfilterpro.com`。三处域名不一，会影响 canonical/sitemap/schema 全站一致性——本轮未改（属站点级决策），建议用户明确唯一生产域名后统一。
3. **data.huiying.com 线上 000**：需用户 CF 重新部署（见 §七）。

---

## 九、附：本轮修复的一个诚实性旁支

- `src/data/legal.ts` 免责声明原含「We do not use artificially generated ("AI") imagery」——与 `/factory/` 页已上线 Seedream 生成图（`factory-ai-report.md`）矛盾，属不实声明。已改为「Some illustrative images (for example, on the Factory page) are computer-generated representations and may not depict our actual facility.」

---

## 十、验证汇总

- `npm run build`：✅ 38 page(s) built
- 导航无空品类：✅ 页脚 Products 列仅 Air/Cabin/Oil
- SKU 结构表渲染：✅ 10/10
- 断链：✅ 0
- 同步：✅ 0/0（push 后）
