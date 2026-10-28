# Phase 1 P1 报告 — 技术 SEO 检查（sitemap · canonical · robots · 内链 · 元数据 · JSON-LD · 移动端 · 主站/子站一致性）

> 审计日期：2026-10-28 · **只审不改** · 全部为本地静态核查（`dist/` 产物）
> 命令清单与输出摘录见 §9

---

## 1. sitemap 全 URL 校验

### 结果：PASS ✅

| 检查项 | 结果 |
|---|---|
| sitemap-index.xml | 存在，指向 `sitemap-0.xml`（单分片） |
| sitemap-0.xml URL 数 | **92**（与页面总数一致） |
| URL 去重 | 92/92 唯一，0 重复 |
| 域名 | 100% `https://carfilterspro.com`（0 异域） |
| 尾斜杠 | 100% 以 `/` 结尾（0 缺尾斜杠，`trailingSlash: always` 生效） |
| XML 格式 | 合法（标准 `<urlset>` + 命名空间 + `<url><loc>`） |
| 本地 200 | 92 条 URL 均对应 `dist/` 下实际 index.html（与页面数吻合） |

**摘录**（sitemap-0.xml 首 15 条）：`/`、`/company-profile/`、`/contact/`、`/cookies/`、`/culture/`、`/disclaimer/`、`/download/`、`/exhibition/`、`/factory/`、`/marketing/`、`/news/`、`/news/…`（9 篇）、`/privacy-policy/`、`/products/`、`/products/air-filter/` …

---

## 2. canonical 一致性

### 结果：PASS ✅

- 逻辑：`BaseLayout.astro` → `new URL(Astro.url.pathname, Astro.site)`，天然自引用。
- **实测 92 页：0 个非自引用**（全部 `https://carfilterspro.com{path}`）。
- `noindex` prop 存在但**全站未使用**（0 页 noindex）→ canonical 全量输出，无遗漏。

---

## 3. robots 指令

### 结果：PASS ✅

```
User-agent: *
Allow: /

Sitemap: https://carfilterspro.com/sitemap-index.xml
```

- 全允许 + sitemap 声明，无 disallow 冲突。
- **无 `host` 指令**（现代 Google 忽略，非问题）。
- 无 robots meta 冲突（`noindex` 未启用）。

---

## 4. HTTP 状态逻辑（静态站 404 等）

### 结果：⚠️ 部分通过（无自定义 404）

- 静态站 `dist/` **无 `404.html`**，无 `_redirects`/平台配置。
- 未匹配路径由托管平台默认 404 处理（CF Pages 默认返回其 404 页）。
- **无 URL 迁移 → 无重定向需求**（符合铁律）。
- **发现（P1-1，低）**：建议补 `public/404.html`（Astro 会在静态托管下自动使用），当前为平台默认页，品牌体验缺失。

---

## 5. 内链断链复扫

### 结果：PASS ✅（主站 0 断链）

- 扫描范围：92 页所有 `<a href>`。
- **主站站内链接 3142 条 → 断链 0**。
- `data.carfilterspro.com` 兄弟站外链 162 条（fitment 参考链接，跨站，不在本仓断链判定范围）。

> 注：首轮脚本误把 `data.carfilterspro.com` 计入站内导致「70 断链」假阳性，修正排除跨站外链后归零。兄弟站 fitment 链接是否真实可达需在部署后网络级验证（本阶段未做 HTTP 实测，仅静态核对路径存在性）。

---

## 6. 元数据（title / description 唯一性 + 长度）

### 结果：PASS ✅（唯一性）· ⚠️（部分 desc 过短）

| 检查项 | 结果 |
|---|---|
| title 唯一性 | 92/92 唯一，**0 重复** |
| description 唯一性 | 92/92 唯一，**0 重复** |
| title 长度 | min 36 · max 115 · avg 71.9（健康） |
| description 长度 | min **18** · max 273 · avg 188.4 |

**desc 过短页（<40 字符）5 个**：

| 页面 | desc | 长度 |
|---|---|---|
| `/marketing/` | "Marketing network." | 18 |
| `/exhibition/` | "Exhibition pictures." | 20 |
| `/factory/` | "How to reach our factory." | 25 |
| `/contact/` | "Contact us for filter inquiries." | 32 |
| `/products/wiper/` | "Wiper blades and wiper products." | 32 |

**发现（P1-2，低）**：5 个辅助页 desc 过短，搜索引擎会截断或自行改写。建议扩到 120–155 字符。

---

## 7. 图片 alt（全非空）

### 结果：PASS ✅

- 92 页全部 `<img>` alt 非空（0 缺失、0 空串）。
- 补充：SKU 页/品类页/首页图片均带 `width`/`height` 属性（避免 CLS）。

---

## 8. JSON-LD 语法逐块解析验证

### 结果：PASS ✅（224 块全通过）

| 类型 | 块数 | json.loads 校验 |
|---|---|---|
| Organization | 92 | ✅ 0 失败 |
| WebSite | 1 | ✅ |
| Product | 61 | ✅ |
| BreadcrumbList | 61 | ✅ |
| BlogPosting | 9 | ✅ |
| **合计** | **224** | **✅ 0 失败** |

- 逐块 `json.loads`（Python）解析，92 页全部 script 块语法合法，无未转义字符/尾逗号/控制字符。
- 语义抽查：Organization 有 legalName/foundingDate/address；Product 有 sku/mpn/offers；BreadcrumbList 有完整 position 链；BlogPosting 有 datePublished/author/publisher。

---

## 9. 移动端（静态核查）

### 结果：PASS ✅（静态层）

| 检查项 | 结果 |
|---|---|
| viewport | `BaseLayout.astro` 含 `<meta name="viewport" content="width=device-width, initial-scale=1">` ✅ |
| 响应式断点 | Header（`@media max-width:900px` 汉堡菜单）、Footer（820px/520px）、各页 hero/grid 均有 `@media` 断点 ✅ |
| 图片 width/height | SKU/品类/首页图均声明 ✅ |
| 触控目标 | 汉堡菜单 44px、CTA 按钮正常尺寸 ✅ |

> 注：本阶段为**静态核查**（源码 + 产物 grep），未做真机/视口截图渲染测试。结论基于 CSS 断点存在性，非实测。

---

## 10. 主站 vs data 子站职责与实体一致性

### 10.1 同一主体

| 项目 | 主站（carfilterspro.com） | data 子站（data.carfilterspro.com） |
|---|---|---|
| 主体 | Qinghe County Huiying Automotive Parts Co., Ltd. | 同（`mkdocs.yml copyright` 同主体） |
| 统一社会信用代码 | `91130534MA0958NT84`（site.ts） | 同（子站 Organization JSON-LD） |
| 品牌 | huiying | huiying |

### 10.2 产品数据字节一致

- 主站 `src/data/products.json` ↔ 子站 `data/products.json`：**md5 一致**（`c7e74f297dfbf3d884e7e25719b68368`）。
- 61 SKU / 8 品类 / 字段结构完全一致。

### 10.3 功能分工

| 站 | 职责 | 页面数 |
|---|---|---|
| 主站 | 营销/公司/SKU 详情/新闻（human-readable + 转化） | 92 |
| data 子站 | 机器可读数据/适配矩阵/OE 模式库/规格规范（zero-marketing） | 90 |

- 主站 SKU 页的 fitment 段均链向 `data.carfilterspro.com/fitment/{category}/`（参考数据），职责分离清晰。
- **发现（P1-3，低）**：主站首页 hero 文案称「61 SKUs listed across the stocked air, cabin and oil ranges」，但实际 61 SKU 分布在 7 个品类（air/cabin/oil/fuel/brake/spark/hose），并非仅「air/cabin/oil」。**文案与实际品类覆盖不一致**，建议修正为「7 categories」或列出全部。

---

## 11. P1 检查结果汇总表

| # | 检查项 | 结果 | 备注 |
|---|---|---|---|
| 1 | sitemap 92 URL 校验 | ✅ PASS | 全合法 |
| 2 | canonical 一致性 | ✅ PASS | 全自引用 |
| 3 | robots 指令 | ✅ PASS | 全允许 |
| 4 | HTTP 状态逻辑（404） | ⚠️ 无自定义 404 | P1-1 |
| 5 | 内链断链 | ✅ PASS | 主站 0 断链 |
| 6a | 元数据唯一性 | ✅ PASS | 0 重复 |
| 6b | 元数据长度 | ⚠️ 5 页 desc<40 | P1-2 |
| 7 | 图片 alt 全非空 | ✅ PASS | 0 空 |
| 8 | JSON-LD 语法 | ✅ PASS | 224/224 |
| 9 | 移动端静态核查 | ✅ PASS | 断点/viewport 齐全 |
| 10 | 主站/子站一致性 | ✅ PASS | 数据字节一致 |

**P1 发现 3 项（均低优先级，只建议不实施）**：
- P1-1：补自定义 `404.html`。
- P1-2：5 个辅助页 desc 扩写。
- P1-3：首页 hero 品类文案修正（「air/cabin/oil」→ 全品类）。

---

## 12. 命令清单与输出摘录

```bash
# 构建
npm run build
# → 92 page(s) built in 3.88s · Complete! · sitemap-index.xml created

# sitemap 校验（Python 内联）
# sitemap-0.xml URL 数: 92 · 去重后: 92 重复: 0 · 非 carfilterspro.com: 0 · 无尾斜杠: 0

# JSON-LD/canonical/alt/title（Python 遍历 dist）
# HTML 页总数: 92
# JSON-LD 块总数=224 语法通过=224 失败=0
# canonical 非自引用数: 0
# 空/缺 alt 图片数: 0
# 重复 title 组数: 0 重复 desc 组数: 0
# title 长度 min/max/avg: 36 115 71.9
# desc 长度 min/max/avg: 18 273 188.4

# 内链（Python 遍历，排除 data.carfilterspro.com 跨站外链）
# 主站站内链接: 3142 · data 兄弟站外链数: 162 · 真实断链: 0

# 两仓产品数据一致性
# diff src/data/products.json ../data.huiying/data/products.json → IDENTICAL
# md5: c7e74f297dfbf3d884e7e25719b68368 (两仓一致)
```

---

*本报告为审计产出，未修改任何业务文件。*
