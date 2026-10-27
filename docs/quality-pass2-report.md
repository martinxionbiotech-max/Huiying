# Quality Pass 2 — 报告

> 品牌 huiying · 主站 Astro (carfilterspro.com) · 数据站 MkDocs (data.huiying)
> 日期 2026-10-27 · 61 SKU 二次加深 + 原创度提升 + 图片二次编辑去重 → 发布

## 1. 产品信息二次加深（61 SKU · 100% 覆盖）

61 个 SKU 全部在 v1 基础上扩一轮，每 SKU 新增三块原创维度，并保留原有 application / selectionNotes / maintenance / buyerNote：

- **应用场景深化（scenarios）**：车型级别细分 + 工况条件 + 市场适配（沙尘/高温/寒区/城市拥堵/农业/长途车队等）。
- **技术要点深化（technical）**：该型号类别特有的结构/材质与性能关系（EPDM vs NBR vs 硅胶、旁通阀/止回阀、陶瓷配方、热值/螺纹长度、PU 边框密封等公开品类知识）。**零编造**：精确 OE 号保持源站 `verified-by-source` / `reference` 标注，不虚构尺寸/效率/微米值。
- **采购视角深化（procurement）**：该型号所在市场的采购注意事项 + 与同品类其他 SKU 的差异点（每 SKU 独有差异化）。

实现：`src/data/productContent.ts` 从 10 SKU 扩到 61 SKU（接口新增 `scenarios`/`technical`/`procurement` 三字段），SKU 页模板同步渲染三个新板块。

| 品类 | SKU 数 | 二次加深 |
|---|---|---|
| air-filter | 21 | ✓ |
| oil-filter | 16 | ✓ |
| rubber-hoses | 13 | ✓ |
| fuel-filter | 6 | ✓ |
| cabin-filter | 2 | ✓ |
| brake-pads | 2 | ✓ |
| spark-plugs | 1 | ✓ |
| **合计** | **61** | **100%** |

## 2. 原创度提升（去模板化）

61 SKU `desc` 由同品类模板句式（buildDesc switch）重写为每 SKU 不同开篇/角度/句式结构。

**同品类内 desc 两两相似度（Jaccard 词重叠）before → after：**

| 品类 | before (mean) | after (mean) | 重复 desc 组 |
|---|---|---|---|
| rubber-hoses | 0.915 | 0.215 | 6 → 0 |
| fuel-filter | 0.849 | 0.287 | 0 → 0 |
| oil-filter | 0.645 | 0.216 | 1 → 0 |
| air-filter | 0.479 | 0.206 | 1 → 0 |
| **全站唯一 desc** | 48 / 61 | **61 / 61** | — |

**抽查 10 SKU（45 对）两两相似度 before → after：**

| 指标 | before | after |
|---|---|---|
| mean | 0.249 | 0.162 |
| max | 0.895 | 0.426 |
| 相似度 > 0.5 的对数 | 8 | 0 |

**去模板化样例（rubber-hoses 原 6 条同文 → 每条独立开篇）：**

- before: `Rubber hose for cooling, fuel or air-transfer circuits. Compound (EPDM/NBR/silicone), reinforcement and inner diameter are confirmed per application — a hose that...`（×6 完全一致）
- after (HY-RH-643): `Black hydraulic, oil and fuel hose for high-pressure fuel line duty. Compound, reinforcement and inner diameter are confirmed per application...`
- after (HY-RH-647): `Heat-resistant braided silicone heater and vacuum hose. The silicone compound tolerates under-bonnet heat and the braid resists vacuum collapse...`
- after (HY-RH-640): `EPDM rubber elbow hose in premium EPDM for coolant and air circuits. EPDM resists water, glycol and heat ageing...`

## 3. 图片二次编辑 + 去重

| 项 | 结果 |
|---|---|
| ① 字节哈希复扫 | 371 文件 / 370 唯一 → 发现 **1 组字节重复**（`6a2fe246.jpg` == `e2302fd0.jpg`）→ 删除冗余 `e2302fd0`，修复 2 处引用（index.astro + company.ts） |
| ② 尺寸/格式优化 | 超大图 10 张 jpg(≥100KB) → **webp q82**（引用全重定向）；20 张 congben webp(>100KB) → q82 重编码；删除 11 张未引用 jpg(≥100KB)。**体积 19.53 MB → 15.39 MB（-3.2 MB）** |
| ③ 错配排查 | 主图所有权核对：**0 错配**（51 个源站 SKU 主图全部溯源到本 SKU 图片列表；"foreign-image" 命中为字节去重共享通用图的假阳性，非真错配） |
| ④ OCR 抽检 | 抽 30 张 congben 图，水印关键词（www/.com/©/品牌名/1688 等）**0 命中** |
| ⑤ 引用实存复扫 | 主站 897 处图片引用 **0 缺失**；重定向后 src 无残留 .jpg 死引用 |

## 4. 两仓构建 / 提交 / 推送

| 仓 | build | 断链 | 缺图 | 计数 | commit / push |
|---|---|---|---|---|---|
| Huiying（主站） | `npm run build` → 92 页 ✓ | 7194 内链 **0 断链** | **0 缺图** | 首页 `61 reference SKUs` · 8 品类计数一致 ✓ | quality-pass-2 ✓ |
| data.huiying（数据站） | `mkdocs build` → 90 页 ✓ | 9127 内链 **0 断链** | — | 61 SKU · 8 品类渲染一致 ✓ | quality-pass-2 ✓ |

- `data.huiying/data/products.json` 与主站 `src/data/products.json` **字节一致**（`diff -q` 通过）。
- 数据站 SKU/品类/fitment 页由 `build-fitment-pages.py` + `gen-nav.py` 重生成，SKU 页 `desc` 已流入新去模板文本。

## 5. 失败清单

- 无。抓取/解析/两仓 build 0 报错，图片 0 缺失，断链 0。
