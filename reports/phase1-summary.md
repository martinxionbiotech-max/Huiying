# Phase 1 审计总结 — 优先发现 · 已验证事实 vs 假设 · 风险 · 回滚

> 审计日期：2026-10-28 · **只审不改** · 报告产出目录 `reports/`
> 生产部署未执行 · 本地 commit 未 push

---

## 1. 优先发现清单（P0/P1/P2 分级）

### P0（SKU 身份与证据，6 项）

| # | 发现 | 证据 | 影响 | 建议 | 修复成本 |
|---|---|---|---|---|---|
| P0-1 | RFQ 表单无服务端邮件能力 | `contact.astro` `action="mailto:…"` | 询价提交依赖用户邮件客户端，可能丢单 | Formspree/CF Workers（只建议） | 低 |
| P0-2 | 8 张 AI 工厂图无 AI 标注 | `factory-ai-report.md` + `factory.astro` | 读者误判实拍，诚实性张力 | 加示意/AI 标注（需用户决策） | 低 |
| P0-3 | dimensions 字段 93% 缺失 | 57/61 SKU 无尺寸 | 规格表大量 Confirm per order | 从源站补录 | 中 |
| P0-4 | 10 个 huiying 自有 SKU 无 source 记录 | sourceId 690–703 无 `source` 字段 | 溯源链断裂（tianrui 来源未保留） | 补 source 记录 | 低 |
| P0-5 | 同源近似重复 SKU 页 | N-gram 0.544/0.489（P320510、NBR hose 各两条 slug） | cannibalization | canonical 指向主 slug | 低 |
| P0-6 | schema 断言 InStock + 10–60 USD 无库存/可见价支撑 | `[slug].astro` offers | 结构化数据与页面不一致 | 改 availability 或去价格 | 低 |

### P1（技术 SEO，3 项，均低优先级）

| # | 发现 | 证据 | 建议 |
|---|---|---|---|
| P1-1 | 无自定义 404 | `dist/` 无 404.html | 补 `public/404.html` |
| P1-2 | 5 辅助页 desc<40 字符 | marketing/exhibition/factory/contact/wiper | 扩写至 120–155 |
| P1-3 | 首页 hero 品类文案不一致 | 「air/cabin/oil」但实际 7 品类 61 SKU | 改为全品类表述 |

### P2（内容集群建议，4 方向，只建议）

| 顺序 | 方向 | 证据支持度 |
|---|---|---|
| 1 | 四类滤清器深度集群 | 高 |
| 2 | 滤清测试/质量体系 | 中 |
| 3 | OEM/私牌采购 | 中 |
| 4 | OE 交叉验证 | 低（缺独立验证，先补数据） |

---

## 2. 已验证事实 vs 假设（分离标注）

### 已验证事实（有直接证据）

1. **构建**：`npm run build` → 92 页，0 错误（实测日志）。
2. **sitemap**：92 URL，全 carfilterspro.com，全尾斜杠，0 重复（实测）。
3. **canonical**：92 页全自引用（实测）。
4. **JSON-LD**：224 块全通过 `json.loads`（实测）。
5. **内链**：主站站内 3142 条，断链 0（实测）。
6. **图片 alt**：92 页全非空（实测）。
7. **title/desc 唯一性**：0 重复（实测）。
8. **两仓产品数据字节一致**：md5 `c7e74f…`（实测）。
9. **61 SKU / 8 品类**：products.json 实际计数；wiper 空品类 0 SKU。
10. **价格 schema-only**：61 页正文 0 可见价格，仅 JSON-LD offers（实测）。
11. **询价链接**：61/61 SKU 页全含 ?product= 预填（实测）。
12. **company 声明已标注 site-claimed**：`company.ts` sourceNote 明确（源码证据）。
13. **AI 工厂图有完整生成记录**：`factory-ai-report.md`（Seedream，OCR 0 真字）。

### 假设（推断，无直接证据）

1. **「62 源图」的实际数字**：collection-report.json 记录 62 下载成功，但**实际保留 50 张**（12 张源站内嵌品牌图未保留）+ 1 张新制 hero-concept。故「62 源图」是采集数，非当前站点在库数——**当前在库源实拍 = 50 张**。
2. **生产部署状态**：本阶段未部署，`dist/` 是本地构建产物；线上是否已部署历史版本未核实（审计范围限于仓库文件 + 本地构建）。
3. **data.carfilterspro.com 线上可达性**：未做 HTTP 实测，仅静态核对（需网络级验证才能确认 162 条跨站外链真实可达）。
4. **移动端真实渲染**：仅静态核查 CSS 断点存在性，未做真机/视口截图测试。

---

## 3. 未解决风险

| 风险 | 等级 | 说明 |
|---|---|---|
| RFQ 表单丢单风险 | 高 | mailto: 无服务端，需升级 |
| AI 工厂图诚实性张力 | 中高 | 用户指令无标注 vs 诚实披露纪律冲突 |
| 公司产能声明无独立证据 | 中 | 10,000m²/100+/3线/20+ 均 site-claimed |
| dimensions 字段大面积缺失 | 中 | 93% SKU 无尺寸，采购信息密度低 |
| 溯源链断裂（10 SKU） | 中 | tianrui 来源未在数据集保留 |
| 同源重复页 cannibalization | 中低 | P320510 / NBR hose 各两条 slug |
| schema 价格/库存与页面不一致 | 中低 | InStock + 10–60 USD 无支撑 |
| 无自定义 404 | 低 | 平台默认页 |

---

## 4. 回滚说明

**本阶段未修改任何业务文件**（`src/`、`public/`、`data/`、`docs/` 均未改动），仅新增 `reports/` 下 5 个审计报告文件。

- **回滚方式**：丢弃本次 commit 即完全回滚（`git reset --hard HEAD~1` 或删除 reports/ 目录）。
- **无生产影响**：未 push、未部署。
- **git 状态**：本次仅 commit `reports/` 5 文件，工作树保持干净（详见 §5）。

---

## 5. 报告产出与提交状态

### 报告文件（`reports/`）

| 文件 | 内容 |
|---|---|
| `phase1-inventory.md` | 仓库结构/构建/数据集/模板/sitemap/robots/canonical/JSON-LD/表单/重定向/图片/data 子站 |
| `phase1-p0.md` | SKU 溯源/零编造核查/空规格/重复文案/价格/询价链接/RFQ/公司声明/图片真实性 |
| `phase1-p1.md` | 技术 SEO 检查（sitemap/canonical/robots/内链/元数据/JSON-LD/移动端/主站子站一致性） |
| `phase1-p2.md` | 内容集群建议（四方向，只建议） |
| `phase1-summary.md` | 本文件（优先发现/事实 vs 假设/风险/回滚） |

### 推送状态

- **未 push**（本地 commit，待用户授权生产部署时再 push）。
- 本地 commit 信息建议：`docs(audit): phase 1 audit reports (inventory + p0/p1/p2 + summary)`。

---

## 6. 一屏速览（中文紧凑）

- **清单规模**：92 页 · 61 SKU · 8 品类（wiper 空）· 359 图（50 源实拍 + 8 AI + 300 congben + 1 概念）。
- **P0 发现 6 项**（高 1 · 中高 1 · 中 3 · 中低 1）；**P1 发现 3 项**（均低）；**P2 建议 4 方向**（只建议）。
- **SKU 溯源分布**：verified-by-source 34 · reference 17 · 无 source 10（huiying 自有，源 tianrui）。
- **空规格字段**：dimensions 缺 57（93%）· crossReference 缺 45 · material 缺 39 · fitment 缺 36 · oeNumbers 缺 27。
- **重复文案 top 3**：P320510↔03-42776-010（0.544）· NBR hose 两条 slug（0.489）· 重卡机滤两页（0.389）。
- **RFQ 表单局限**：mailto: action，无服务端邮件能力，提交依赖用户邮件客户端。
- **工厂图片分类**：50 tianrui 实拍（保留）· 8 Seedream AI（无 AI 标注，合规张力）· 300 congben 源站产品图。
- **历史声明证据状态**：1996=品牌渊源（已区分 2017 实体）· 产能数字全部 site-claimed 无独立证据。
- **P1 检查**：sitemap PASS · canonical PASS · robots PASS · 内链 PASS（0 断链）· 元数据唯一性 PASS（5 页 desc 过短）· alt PASS · 移动端 PASS（静态）· 主站/子站数据一致 PASS。
- **JSON-LD 语法校验**：224 块全通过，0 失败。
- **未解决风险**：RFQ 丢单（高）、AI 图诚实性（中高）、产能无证据（中）、dimensions 缺失（中）、溯源断裂（中）、重复页（中低）、schema 价格不一致（中低）、无 404（低）。
- **报告路径**：`reports/phase1-{inventory,p0,p1,p2,summary}.md`。
- **推送状态**：**未推——待授权**。

---

*本报告为审计产出。Phase 1 未修改任何业务文件，未 push，未部署。*
