# carfilterspro（Huiying）全站回查审计报告

- **审计日期**：2026-10-28
- **主站**：Huiying（Astro）· 92 页 · 61 SKU · 8 品类
- **数据子站**：data.huiying（MkDocs）· 90 页（89 内容页 + 404）
- **审计维度**：SEO 配置 / AIO 配置 / 合规页面 / 内链 / 孤儿页检测 / 修复 / 报告

---

## 一、五维结果矩阵

### 1. SEO 配置 — 主站（92 页）

| 检查项 | 结果 | 证据 |
|---|---|---|
| title 全站唯一性 | ✅ PASS | 92/92 唯一，0 重复 |
| description 全站唯一性 | ✅ PASS（已修复） | 92/92 唯一；修复前 1 对重复（两条 sludge 新闻同 body） |
| 单 H1 核查 | ✅ PASS | 92/92 均为 1 个 H1 |
| canonical 正确指向 | ✅ PASS | 92/92 均有 canonical，0 缺失 |
| sitemap（主站） | ✅ PASS | sitemap-index.xml + sitemap-0.xml，92 个 URL |
| robots（主站） | ✅ PASS | `User-agent: * / Allow: /` + `Sitemap: https://huiyingfilter.com/sitemap-index.xml` |
| schema 渲染 | ✅ PASS | Organization 62 · Product 61 · BreadcrumbList 61 · price 10–60 USD OK 61 |
| 图片 alt 覆盖率 | ✅ PASS | 805/805 有 alt（100%） |
| title 长度 | ⚠️ NEEDS_VERIFICATION | 59/92 超出 30–60 字符（多为 >60，源于长 SKU 名/新闻标题 + 品牌后缀） |

**schema 抽查（10 SKU）**：Product 类型含 `AggregateOffer` + `PriceSpecification`（minPrice=10 / maxPrice=60 USD，valueAddedTaxIncluded=false），BreadcrumbList 4 级，Organization 全站渲染。价格区间符合 10–60 USD 要求。

### 2. AIO 配置

| 检查项 | 结果 | 证据 |
|---|---|---|
| 主站 llms.txt | ✅ PASS（已修复） | 修复前仅 10 SKU/5 品类，缺 brake-pads/spark-plugs/rubber-hoses；修复后 61 SKU / 8 品类 |
| data 站 llms.txt | ✅ PASS（已修复） | 修复前 "10 SKUs / 5 categories"；修复后 61 SKU / 8 品类 + 全 SKU 明细 |
| AI 可读性 | ✅ PASS | 结构化内容 + 语义 H 层级（h1→h2→h3） |

### 3. 合规页面

| 检查项 | 结果 | 证据 |
|---|---|---|
| privacy-policy | ✅ PASS | H1=Privacy Policy，实体/邮箱/电话/生效日期齐全 |
| terms | ✅ PASS | H1=Terms of Service，同上齐全 |
| disclaimer | ✅ PASS | H1=Disclaimer，同上齐全 |
| cookies | ✅ PASS | H1=Cookie Policy，同上齐全 |
| footer 链接 | ✅ PASS | complianceLinks 四页均在 footer |
| 主体一致 | ✅ PASS | `Qinghe County Huiying Automotive Parts Co., Ltd.` · `Martin@carfilterpro.com` · `+86 13323237275` 全站一致 |
| 生效日期 | ✅ PASS | effectiveDate = October 27, 2026 渲染于四页 |

### 4. 内链

| 检查项 | 结果 | 证据 |
|---|---|---|
| 主站全量断链 | ✅ PASS | 0 断链（内部 href 全解析） |
| data 站断链 | ✅ PASS | 0 断链（相对路径正确解析后） |
| 子站互链 | ✅ PASS | 主站→data 92 处 · data→主站 163 处 |
| 61 SKU 页内链可达性 | ✅ PASS | 品类页→SKU 页全联通（孤儿 0 佐证） |

### 5. 孤儿页检测

| 检查项 | 结果 | 证据 |
|---|---|---|
| 主站孤儿 | ✅ PASS | 92 页全部有入链，孤儿 0 |
| data 站孤儿 | ✅ PASS | 仅 /404（MkDocs 默认页，非内容孤儿） |

---

## 二、孤儿页清单

**主站**：无孤儿页（92/92 全部可达）。

**data 站**：无内容孤儿页。`/404` 为 MkDocs 自动生成的错误页，属预期，不记为孤儿。

---

## 三、修复记录

| # | 问题 | 文件 | 修复动作 |
|---|---|---|---|
| 1 | 主站 llms.txt 滞后（10 SKU/5 品类，缺 3 新品类 + 51 SKU） | `public/llms.txt` | 由 `scripts/gen-llms.py` 从 products.json 重生成：61 SKU / 8 品类 |
| 2 | data 站 llms.txt 滞后（"10 SKUs / 5 categories"） | `data.huiying/docs/llms.txt` | 同上重生成：61 SKU / 8 品类 + 全 SKU 明细链接 |
| 3 | data 站首页计数陈旧（10 SKU / 5 品类 / 370 行） | `data.huiying/docs/index.md` | 更新为 61 SKU / 8 品类 / 8 类 × 74 = 592 行 |
| 4 | data 站 fitment 生成器写死 "five core filter types" | `data.huiying/scripts/build-fitment-pages.py` | 改为 "core filter types"（动态） |
| 5 | data 站 fitment 页 title 与品类页重复（6 对） | `data.huiying/scripts/build-fitment-pages.py` | fitment 页加 `title:` frontmatter（`X — Fitment Reference`），修复重复 |
| 6 | 主站 description 重复（两条 sludge 新闻同 body） | `src/data/newsPosts.ts` | 重写第二条 sludge 新闻正文，描述去重 |
| 7 | title 后缀过长（"Manufacturer of high-tech filter"） | `src/data/site.ts` | tagline 缩短为 "Filter Manufacturer"，压缩全站 title 长度 |

**新增脚本**（可复用）：`scripts/gen-llms.py`（两站 llms.txt 生成）、`scripts/audit-recheck.py`（主站全量审计）、`scripts/audit-data-links.py`（data 站断链/孤儿）。

---

## 四、未解决项（NEEDS_VERIFICATION）

1. **主站 title 长度 59/92 超出 30–60 字符**：多为 >60，源于 congben 目录长 SKU 名（如 "Truck Engine Air Filter P320510 0342776010 03-42776-010"）与新闻长标题，叠加 `| huiying — Filter Manufacturer` 后缀（~30 字符）。已通过缩短 tagline 缓解，但长商品名/新闻标题属内容固有，建议后续在内容层截断或重写，不属本次技术审计强制修复项。

2. **data 站 `/404` 页 title 与首页同名**（均为 "Huiying Filter Data"）：MkDocs 默认行为，非内容孤儿，可接受。

---

## 五、构建 / 提交 / 推送

- **主站 build**：`npm run build` → 92 pages，成功。
- **data 站 build**：`mkdocs build` → 90 pages，成功（CJK 搜索资源清理 hook 正常）。
- 两仓分步 commit + push（见下文执行记录）。
