# Phase 1 修复报告 — carfilterspro 审计修复批

> 修复日期：2026-10-28 · 授权：用户三项指令 + phase1 审计发现
> 仓库：`/root/.openclaw/workspace/repos/Huiying`（Astro 主站）+ `../data.huiying`（MkDocs 数据子站）
> 纪律：增量修复 · 不换 URL（除 P0-5 重复 slug 有缺陷+迁移方案）· 零编造 · 分步 commit+push

---

## 0. 总览

| 项 | 结果 |
|---|---|
| build | ✅ 92 页，0 错误（+1 redirect HTML） |
| 表单移除 | ✅ dist 0 个 `<form>` |
| mailto 预填 | ✅ 60/60 SKU 页含 `subject=RFQ {model}` mailto |
| alt | ✅ 790 img · 0 空 · 0 缺 |
| P0-5 重定向 | ✅ meta refresh + canonical + noindex |
| dimensions 回填 | ✅ 0 新增（congben 源数据无更多真实尺寸），保持「Confirm per order」 |
| 断链 | ✅ anchor 内链 3073 条，断链 0 |
| 两仓同步 | ✅ 字节一致（md5 `5049ed6c…`）· 0/0 diff |
| git push | ✅ 主站 5 commits + 数据站 1 commit，均已 push |

---

## 1. 表单移除（P0-1）→ 直接联系渠道

**审计发现**：`contact.astro` 用 `<form action="mailto:…">`，静态站无服务端邮件能力，提交依赖用户本机邮件客户端，易丢单。

**修复**：
- 移除 mailto 表单 UI（如实处理：静态站无后端、无 Serverless、无第三方表单 API）。
- 替换为**直接联系渠道区**：Email mailto 链接 · WhatsApp 绿色按钮（`wa-btn` `#25D366`）· Phone | WeChat · Address。
- 加**询价信息指引**（纯文本）：OE / 交叉参考号、目标数量、目的市场、包装/私牌要求。
- 保留 `?product=MODEL&url=…` 预填能力，改为预填 mailto（subject `RFQ {model}`，body 含 model + URL + 询价字段模板）。

**产品页 CTA**：`[slug].astro` 的「Request a quote」→ mailto 预填（subject `RFQ {型号}` · body 含型号+URL）——点击即打开买家邮箱带内容，转化链不丢。

**首页 CTA 同步**：`index.astro` hero / procure / 底部 CTA 的「Get a Quote」「Start a Quote」→ 直接 mailto（不再依赖已移除的表单）。

**隐私页同步**：`legal.ts` privacy §2 原文「…or the enquiry form on our Contact page」→ 改为「…or direct message」。

**验证**：`grep -rl '<form' dist/` → 0 文件；contact 页含 `mailto:` + `wa.me/8613323237275` + `tel:`。

---

## 2. 全站图片 Alt 精修

**审计发现**：92 页 alt 已全非空（PASS），但存在「Company」「About Us」「Marketing Network」「Exhibition picture N」等泛化 alt，以及产品图「{name} {model}」冗余 + gallery 泛化后缀。

**修复**（模板级，一次修复覆盖全部 805 张生成引用）：
- 品类图标：`{Category} icon`（air/oil/cabin/fuel/wiper/brake-pads/spark-plugs/rubber-hoses）
- 产品图（主图/gallery/related/品类卡）：`{model} {category}`（如 `03-42776-010 air filter`），gallery 追加 `— view N` 区分
- 工厂图：`huiying factory — {工序}`（workshop panorama / filter production line / pleating machine / quality inspection bench / warehousing / packaging / laboratory testing）
- 概念图（首页 hero）：保留 `automotive filter concept — pleated filter element with airflow`
- 公司/文化/营销/展会图：依源站 alt + 页面上下文给出描述性 alt（如 `huiying oil filter — product sample`、`huiying factory — filter production equipment`、`huiying culture — vision icon`、`huiying marketing — global sales network`、`huiying exhibition — trade show booth`）
- `company.ts` 的 strengths / culture / marketing 对象新增 `alt`/`imageAlt` 字段（数据驱动）。

**原则**：准确描述、不堆砌关键词、全部非空。

**验证**：dist 遍历 790 `<img>` → 空 alt 0 · 缺 alt 0。

---

## 3. P0-4 — 10 个 huiying 自有 SKU 补 source 溯源

**审计发现**：sourceId 690–703 的 10 个 SKU（`of-690`/`cf-691`/`af-692`/`af-693`/`af-698`–`af-703`）无 `source` 字段，tianrui 来源未在数据集保留，溯源链断裂。

**修复**：为 10 SKU 补 `source` 记录（数据状态如实标 `reference`，因这 10 SKU 无 OE/材质/尺寸等断言字段）：

```json
"source": {
  "name": "tianruifilters.cn",
  "url": "https://www.tianruifilters.cn/product/{sourceId}.html",
  "status": "reference",
  "retrieved": "2026-10-27"
}
```

源 URL 依据 `scripts/crawl.mjs`（`BASE = https://www.tianruifilters.cn`，`/product/{id}.html`）。

**验证**：products.json 中 `source.name == 'tianruifilters.cn'` 的 SKU = 10；SKU 页渲染「source tianruifilters.cn · status reference」。数据站同步（见 §8）。

---

## 4. P0-5 — P320510 双 slug 近似重复 → 规范 slug + 重定向

**审计发现**：`air-filter-p320510`（sourceId 17707，model P320510，无 fitment/交叉参考）与 `air-filter-03-42776-010`（sourceId 22901，model 03-42776-010，含交叉参考 `P320510 / 91559 / 997879` + fitment Freightliner Cascadia/Detroit Diesel）为同一物理滤清器的两条近似重复页（N-gram 0.544），存在 cannibalization。

**修复（保留规范 slug + 重定向）**：
- **保留** `air-filter-03-42776-010`（数据更全，交叉参考字段已覆盖 P320510）。
- **移除** `air-filter-p320510` 产品记录（products.json + productContent.ts）。
- **建 Astro redirect 映射**（`astro.config.mjs` `redirects`）：
  ```
  /products/air-filter/air-filter-p320510 → /products/air-filter/air-filter-03-42776-010
  ```
- **内链**：所有内链为模板动态生成，移除产品后自动统一指向规范 slug（无硬编码 p320510 链接残留）。

**迁移方案**：旧 URL 生成 meta-refresh + `rel=canonical` 指向规范 URL + `noindex`（避免重复收录）；规范页交叉参考字段已含 P320510，搜索意图不丢。

**验证**：`dist/products/air-filter/air-filter-p320510/index.html` 为 `<meta http-equiv="refresh" content="0;url=/products/air-filter/air-filter-03-42776-010">` + `noindex` + canonical；`grep -r 'air-filter-p320510' src/` 无硬编码残留（仅 astro.config redirects 键）。

---

## 5. P0-3 — dimensions 57/61 缺失 → 回填核查（0 新增）

**审计发现**：57/61 SKU 无 dimensions，规格表大量「Confirm per order specification」。

**修复（零编造）**：核查 `crawls/congben/products-raw.json`（80 条源记录），其中带 dimensions 的仅 4 条，且全部已存在于 products.json（`28113-2S000`、`HY-RH-638`、`HY-RH-639`、`HY-RH-642`）。congben 源站未提供更多真实尺寸值 → **无新增可回填数据**。

**处理**：缺失处保持「Confirm per order specification」（诚实降级，不编造）。

**回填数记录**：**0 新增**（源数据无更多尺寸）。去重后 dimensions 有值 4 / 60 SKU；缺失 56（原 57/61，P0-5 去重后 56/60）。

---

## 6. P0-2 — 8 张 AI 工厂图 → 站级 AI 配图声明（不重加页面标注）

**审计发现**：8 张 `factory-ai/` 图为 Seedream AI 生成，无 AI 标注，读者易误判实拍（诚实性张力）。用户明确「去标注」指令。

**修复（合规替代，遵循用户指令）**：**不**在页面/alt 重加「AI 生成」标注；改为 **Disclaimer 站级披露**（`legal.ts` disclaimer §8 Images 强化）：

> **Some illustrative images (for example, several images on the Factory page) are AI-generated computer illustrations and do not depict our actual facility or equipment.** They are shown to convey the general nature of a filter-production environment and are not photographs of the company's own premises.

主站为英文，英文声明即可。

---

## 7. P0-6 + P1 三项

**P0-6 — schema 断言 InStock + 10–60 USD 无支撑**：
- 修复：`[slug].astro` 移除 `Product.offers`（AggregateOffer + PriceSpecification + `InStock`）——无真实库存/可见价支撑，不再断言。Product schema 保留 name/sku/mpn/brand/image/description/category/url。
- 验证：dist 0 页含 `AggregateOffer`/`InStock`；JSON-LD 222 块全通过 `json.loads`（原 224 − p320510 的 Product+Breadcrumb）。

**P1-1 — 无自定义 404**：新增 `src/pages/404.astro`（noindex，回首页/产品/联系）→ 生成 `dist/404.html`。

**P1-2 — 5 辅助页 desc<40 字符**：扩写 4 个（marketing/exhibition/factory/wiper 品类）至 120–155 字符；contact 已在 §1 随表单修复扩写。

**P1-3 — 首页 hero 品类文案**：原文「air, cabin and oil ranges」→ 改为全 7 品类表述（air/cabin/oil/fuel + brake pads/spark plugs/rubber hoses），wiper 明确「available on request」。

---

## 8. data 子站同步（0/0 字节一致）

**流程**（README 约定）：主站改 `products.json` → 复制入子仓 → diff 校验 → `build-fitment-pages.py` → `gen-nav.py` → `mkdocs build` → commit/push。

**执行**：
- `cp Huiying/src/data/products.json data.huiying/data/products.json` → diff IDENTICAL，md5 `5049ed6cfc1cc5ca91b663346208db04`（两仓一致）。
- `build-fitment-pages.py` → 重新生成 60 SKU 页（删除 `P320510.md`）。
- `gen-nav.py` → mkdocs.yml nav 移除 P320510（60 SKU）。
- `mkdocs build` → site/ 重新构建（site/ 不纳入 git）。

**验证**：两仓 products.json md5 一致；数据站 tianrui-sourced SKU = 10，total = 60。

---

## 9. 提交与推送

**主站 Huiying**（`phase1-fix-*` 5 commits + 审计报告 commit 一并推）：
| commit | 内容 |
|---|---|
| `0baaa8f` phase1-fix-form | 表单移除 + 直接渠道 + mailto RFQ + 隐私措辞 + schema |
| `7aaec0f` phase1-fix-alt | 全站描述性 alt |
| `cae0ff4` phase1-fix-p0-data | P0-4 source + P0-5 去重/重定向 |
| `91dff9b` phase1-fix-p1 | 404 + desc 扩写 + hero 品类文案 |
| `7d5a948` phase1-fix-llms | llms.txt 再生成（60 SKU） |

**数据站 data.huiying**：`c9509ae` data rebuild（60 SKU / 8 品类 / source + 去重）。

**推送**：主站 `ee54baf..7d5a948`、数据站 `768949c..c9509ae`，均 push 到 origin/main（含审计报告 commit）。

---

## 10. 验证清单（实测）

| 检查 | 命令/方法 | 结果 |
|---|---|---|
| build | `npm run build` | 92 页，0 错误 |
| 表单移除 | `grep -rl '<form' dist/` | 0 |
| mailto 预填 | 遍历 SKU 页 `subject=RFQ` | 60/60 |
| alt 全非空 | 遍历 `<img>` alt | 790 img · 0 空 · 0 缺 |
| 重定向工作 | cat redirect index.html | meta refresh + canonical + noindex |
| dimensions 回填 | 核查 congben raw | 0 新增（如实） |
| 断链 | 遍历 `<a href>` 内链 | 3073 条 · 0 断链 |
| JSON-LD | `json.loads` 逐块 | 222 块 · 0 失败 |
| 两仓一致 | `diff` + md5 | IDENTICAL · `5049ed6c…` |
| git | 主站 + 数据站 | 均 push 成功 |

---

*本报告为修复产出。所有变更经 build + 静态核验；未部署生产（部署需用户另行授权）。*
