# carfilterspro（Huiying）全站回查批 · 域名统一后终验审计报告

> 生成时间：2026-10-28 · 审计批次：`recheck-2` · 仓库：`Huiying`（Astro · 92 页 · 61 SKU · 8 品类）+ 兄弟仓 `data.huiying`（MkDocs · 90 页）
> 生产域名：主站 `carfilterspro.com` · 数据站 `data.carfilterspro.com`
> 性质：域名统一整改（上批）的闭环验证 + 五维复审 + 有据即修

---

## 结论概览

| 维度 | PASS | FAIL | 说明 |
|---|---|---|---|
| 1. 域名一致性终验 | 6 / 6 | 0 | 两站全域旧域名残留 `0`，信号全链统一 |
| 2. SEO 配置复审 | 7 / 7 | 0 | title/desc 唯一 · 单 H1 · canonical 自引用 · sitemap 一致 |
| 3. AIO 配置 | 2 / 2 | 0 | 两站 llms.txt 均 61 SKU / 8 品类 / 新域名 |
| 4. 合规页面 | 3 / 3 | 0 | 四页渲染 + footer 链接 + 主体/联系一致 |
| 5. 内链与孤儿 | 4 / 4 | 0 | 两站断链 `0` · 孤儿 `0` · 61 SKU 全可达 |
| 6. 线上探测 | 4 / 4 | 0 | 两站 HTTP 200 · robots.txt 实际返回正确 |

**总计：26 PASS / 0 FAIL**（抽样项不计入 PASS 计数，均通过）。

本轮修复 5 项（1 主站 + 4 数据站），见「修复项」。

---

## 维度 1 — 域名一致性终验（上轮整改闭环）

**PASS**。上批把主站信号统一到 `carfilterspro.com`，本批复扫确认无回退、无残留，且数据站（上批标注「另一仓库未动」）现已同步到位。

| 检查项 | 结果 | 证据 |
|---|---|---|
| 主站 `dist` 全域 `huiyingfilter.com` / `data.huiying.com` 残留 | ✅ `0` | `grep -rEl` 输出空 |
| 主站 canonical / og / sitemap / robots / llms / schema 全 `carfilterspro.com` | ✅ | 92 canonical 自引用、sitemap-index 指向 `carfilterspro.com/sitemap-0.xml`、robots `Sitemap: https://carfilterspro.com/sitemap-index.xml`、og:image `carfilterspro.com/images/...` |
| 数据站 `site` 全域旧域名残留 | ✅ `0` | `grep -rEl` 输出空 |
| 数据站 site_url / canonical / robots / llms 全 `data.carfilterspro.com` | ✅ | `site_url: https://data.carfilterspro.com`、robots `Sitemap: https://data.carfilterspro.com/sitemap.xml`、89 canonical 自引用 |
| 主站 → 数据站互链 | ✅ | footer「Product Data ↗」→ `https://data.carfilterspro.com`；全站 fitment「reference fitment data ↗」外链 `data.carfilterspro.com/fitment/{category}/` |
| 数据站 → 主站互链 | ✅ | announce bar「→ carfilterspro.com」；SKU/category 页「Commercial listing」回链 `carfilterspro.com` |

**遗留注记（非 FAIL，待用户核实）**：联系邮箱 `Martin@carfilterpro.com` 使用 `carfilterpro.com`（少一个 `s`），与生产域名 `carfilterspro.com` 不一致。上批已标注为用户指定值、保留未改；本批维持不改，继续列入「未解决清单」。

---

## 维度 2 — SEO 配置复审（主站 92 页）

| 检查项 | 结果 | 证据 |
|---|---|---|
| title 唯一性 | ✅ 92 / 92 唯一 | 重复 `0` |
| description 唯一性 | ✅ 92 / 92 唯一 | 重复 `0` |
| 单 H1 | ✅ 0 异常 | 92 页均恰好 1 个 `<h1>` |
| canonical 自引用 | ✅ 92 / 92 | 全部与页面 URL 一致，尾斜杠统一 |
| sitemap 92 URL 与 canonical 一致 | ✅ 双向差集 `0` | sitemap ↔ canonical 完全一致 |
| schema 抽检 | ✅ | Organization（全站）/ WebSite（首页）/ Product + BreadcrumbList（产品页）/ BlogPosting（新闻页）全部具备、`url` 与 canonical 一致 |
| 图片 alt | ✅ 0 空 | 全站 `<img>` 均含非空 `alt` |

**本轮修复（维度 2 相关）**：`src/data/site.ts` 引用 `site.companyNameZh` 但从未定义 → 公司档案页「Chinese name」字段渲染为空 `<dd></dd>`。已补 `companyNameZh: '清河县汇盈汽车零部件有限公司'`，复验渲染正确。

---

## 维度 3 — AIO 配置

| 检查项 | 结果 | 证据 |
|---|---|---|
| 主站 `llms.txt` | ✅ | 83 处 URL 全 `carfilterspro.com` · 旧域名 `0` · 61 SKU / 8 品类全列 |
| 数据站 `llms.txt` | ✅ | 61 SKU 明细 + 8 品类 + fitment/reference/specification 全列 · 域名 `data.carfilterspro.com` · 回链主站 `carfilterspro.com` |

结构语义：两站 llms.txt 均「站点概览 → 品类 → SKU 明细 → 参考/合规」分层，符合 LLM 消费结构。

---

## 维度 4 — 合规页面

| 检查项 | 结果 | 证据 |
|---|---|---|
| 四页渲染 | ✅ | privacy-policy / terms / disclaimer / cookies 四页均正常输出（共享 `LegalPage` 脚手架，标题/H1/正文/TOC 齐全） |
| footer 链接 | ✅ | 首页 footer 含 4 个合规链接，指向正确路径 |
| 主体 / 联系一致 | ✅ | 四页均用同一 `site.ts` 数据源：`Qinghe County Huiying Automotive Parts Co., Ltd.` · `+86 13323237275` · `Martin@carfilterpro.com` · 地址一致（含本轮补上的中文名） |

---

## 维度 5 — 内链与孤儿

| 检查项 | 结果 | 证据 |
|---|---|---|
| 主站断链 | ✅ `0` | 92 页内部链接全解析通过 |
| 数据站断链 | ✅ `0` | 排除静态资源路径后，内容页链接全解析通过（8 类 relative URL 归一化后命中真实页面） |
| 主站孤儿页 | ✅ `0` | 92 页均有内链/导航/sitemap 可达 |
| 数据站孤儿页 | ✅ `0` | 89 内容页全可达（404 页按规排除） |
| 61 SKU 可达性 | ✅ 61 / 61 | 主站 `dist/products/{cat}/{slug}/` 全部存在；数据站 69 SKU 详情页 + 8 品类页 + SKU index 全在 nav |

---

## 维度 6 — 线上探测

| URL | 结果 |
|---|---|
| `https://carfilterspro.com/` | ✅ HTTP 200 |
| `https://carfilterspro.com/robots.txt` | ✅ HTTP 200 · 内容 `Sitemap: https://carfilterspro.com/sitemap-index.xml` |
| `https://carfilterspro.com/sitemap-index.xml` | ✅ HTTP 200 · 指向 `sitemap-0.xml` |
| `https://data.carfilterspro.com/` | ✅ HTTP 200 |
| `https://data.carfilterspro.com/robots.txt` | ✅ HTTP 200 · 内容 `Sitemap: https://data.carfilterspro.com/sitemap.xml` |
| `https://data.carfilterspro.com/sitemap.xml` | ✅ HTTP 200 · 89 URL |

**CF 部署时差注记**：本轮为源码级改动（补中文名 + 数据站 schema/脚本/数据域名收口），线上探测在 commit 前执行，反映的是「上一已部署版本」；本轮改动需 CF Pages 部署后方可线上复验。线上 robots.txt 已证明上批域名统一已实际部署生效。

---

## 修复项（本轮，共 5 项）

| # | 仓库 | 文件 | 问题 | 修复 |
|---|---|---|---|---|
| 1 | 主站 | `src/data/site.ts` | `site.companyNameZh` 未定义 → 公司档案「Chinese name」渲染空值 | 新增 `companyNameZh: '清河县汇盈汽车零部件有限公司'` |
| 2 | 数据站 | `overrides/main.html` | Organization schema：`alternateName` 含空串、`sameAs` 双斜杠残缺 URL、`addressRegion` 与主站不一致 | 去掉空串；`sameAs` 改为完整 Baidu Baike 编码 URL；`addressRegion` → `Hebei Province` |
| 3 | 数据站 | `data/procurement.json` | `contact` 字段引用旧域名 `huiyingfilter.com` | 改为 `carfilterspro.com` |
| 4 | 数据站 | `scripts/build-fitment-pages.py` | 生成器常量 `SITE_URL`/`MAIN_URL` + 3 处硬编码旧域名，若重生成会回写旧域名 | 常量 + 3 处硬编码全改为 `data.carfilterspro.com` / `carfilterspro.com` |
| 5 | 主站 | `scripts/gen-llms.py` | 生成器常量 `MAIN_URL`/`DATA_URL` + 4 处硬编码旧域名，若重生成会回写旧域名 | 全部改为 `carfilterspro.com` / `data.carfilterspro.com` |

> 修复项 3–5 属「生成器/数据源」层收口：当前已构建产物已正确，但若脚本重跑会回退到旧域名；本批连脚本一并修净，防止未来回退。

**复验**：主站 `npm run build` 92 页通过 · 数据站 `mkdocs build` 通过 · 两站全量旧域名残留复扫 `0` · 中文名/数据 schema 现场复验正确。

---

## 与上轮审计对照的改进项

| 上轮遗留 | 本批状态 |
|---|---|
| 数据站 `mkdocs.yml` `main_site` / `copyright` 仍引用 `huiyingfilter.com`（「另一仓库未动」） | ✅ 已全部统一到 `carfilterspro.com` / `data.carfilterspro.com` |
| 数据站 llms.txt 滞后（旧域名） | ✅ 已全量 `data.carfilterspro.com`，61 SKU / 8 品类 |
| 数据站 Organization schema `sameAs` 残缺 URL | ✅ 已修复为完整 Baidu Baike URL |
| 邮箱域名少 `s`（`carfilterpro.com`） | ⚠️ 仍待用户核实（见未解决清单） |
| 价格区间 `USD 10–60` 全站共享 | ⚠️ 仍待报价数据（见未解决清单） |

**本轮新增发现并修复（上轮未覆盖）**：
- `companyNameZh` 未定义导致中文名字段空值（主站）
- 数据站生成器脚本 + `procurement.json` 数据源残留旧域名（潜在回退风险）

---

## 未解决清单

1. **邮箱域名**：`Martin@carfilterpro.com` 少 `s`（应为 `carfilterspro`）。用户指定值，需确认邮箱归属后再改——不擅自更改。
2. **价格区间细化**：`USD 10–60 (reference only)` 全站 61 SKU 共享，建议按型号区间化（需真实报价数据）。
3. **数据站 404 页**：`site/404.html` 与首页标题重复（`Huiying Filter Data`），无 canonical / noindex。属 MkDocs 自动生成页，不在 sitemap 内、线上以 404 状态返回，影响极低；如需彻底消除可加自定义 404 模板（低优先级）。

---

## 构建 / 提交 / 推送

- 主站 `npm run build` → **92 页通过**（4.06s）
- 数据站 `mkdocs build` → **通过**（3.81s）
- 两仓 commit + push，同步 `0 / 0`（详见 git 提交记录）。
