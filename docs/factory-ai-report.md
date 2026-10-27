# Factory Page Image Remaster — AI 配图批（Seedream）

- 日期：2026-10-27
- 站点：Huiying（Astro）
- 页面：`/factory/`（`src/pages/factory.astro` + `src/data/company.ts` 的 `factoryInfo.image`）
- 图片管线：image-agent（Seedream / 火山方舟 Ark）
- 模型：`doubao-seedream-4-5-251128`（文生图，`probe --json` 实测可用；请求 `size=2K` + `aspect_ratio=4:3` → 实际生成 2304×1728）

## 目标与纪律

- 工厂页原站抽取图不理想，用 Seedream 重制 8 张工厂主题图。
- **无字无水印**：CLI 默认 `watermark=false`（无 AI 水印）；prompt 用纯视觉名词并以固定正句收尾
  `Clean frame with no text, no labels, no lettering, no watermark.`
- 带字物体（仪表/标牌/设备屏幕）用宽景/鸟瞰构图规避；OCR 复检归零。
- 精确缩放：PIL 居中裁切 + LANCZOS → 1600×1200 WebP（q82, method=6）。
- 交付目录：`public/images/factory-ai/`（与真实源图分目录管理；原站图保留在 `public/images/` 未删）。

## 生成明细（8 张）

| 文件名 | 主题 | 初始 seed | 最终 seed | 重生成次数 |
|---|---|---|---|---|
| factory-01-1600x1200 | 车间全景（宽景） | 201 | 201 | 0 |
| factory-02-1600x1200 | 滤芯生产线 | 202 | 202 | 0 |
| factory-03-1600x1200 | 折纸机工位 | 203 | 203 | 0 |
| factory-04-1600x1200 | 质检台（测量工具静物） | 204 | 304 | 1（OCR 触发） |
| factory-05-1600x1200 | 滤清器成品特写（无标签） | 205 | 205 | 0 |
| factory-06-1600x1200 | 仓储货架 | 206 | 206 | 0 |
| factory-07-1600x1200 | 出口纸箱包装区（无印刷字） | 207 | 207 | 0 |
| factory-08-1600x1200 | 实验室台面（烧杯/粒子计） | 208 | 308 | 1（OCR 触发） |

重生成合计：**2 次**（factory-04、factory-08 各 1 次，均由 OCR 复检触发，换 seed 后归零）。

## OCR 复检结果（PIL→PNG→tesseract，psm 3/6/11）

- 判定标准：真字 = 跨 PSM 复现的一致有意义词/数字；假阳性 = 短、无意义、逐 seed 变的随机令牌。
- 初扫（2304×1728 原图）：
  - factory-04 首版（seed 204）：`44` 在 psm6/psm11 复现 → 疑为测量工具刻度数字 → 换 seed 重生成。
  - factory-08 首版（seed 208）：psm3 命中 `omer/nr/Peer/ae` 等短令牌（玻璃烧杯反射假阳性，但 psm3 非空，从严换 seed）。
  - 其余 6 张 psm3 全空，psm6/11 仅短随机令牌 → 判定无字。
- 终扫（交付的 1600×1200 WebP）：
  - **7/8 张 psm3 全空 = 0 字**。
  - factory-08 仅命中 `erent`（单条非复现无意义片段，玻璃反射假阳性，跨 PSM 不复现）→ 判假阳性，保留最干净版并记录。
- 结论：**真字归零**；无 AI 水印；唯一残留为 factory-08 玻璃反射 OCR 假阳性（非真字）。

## 替换对照表

| 位置 | 原图 | 新图 | alt |
|---|---|---|---|
| hero（`factoryInfo.image`） | `/images/cdb5ad87-…jpg` | `/images/factory-ai/factory-01-1600x1200.webp` | Huiying filter factory workshop panorama |
| 画廊 1（production area） | `/images/4ccdbf70-…jpg` | factory-01-1600x1200.webp | workshop panorama |
| 画廊 2（manufacturing line） | `/images/961d7908-…png` | factory-02-1600x1200.webp | filter production line |
| 画廊 3（workshop） | `/images/b1412b80-…png` | factory-03-1600x1200.webp | filter paper pleating machine |
| 画廊 4（production equipment） | `/images/b27a61f1-…png` | factory-04-1600x1200.webp | quality inspection bench |
| 画廊 5（quality control） | `/images/b5a75dda-…jpg` | factory-05-1600x1200.webp | finished filter element |
| 画廊 6（warehousing） | `/images/cdb5ad87-…jpg` | factory-06-1600x1200.webp | warehousing |
| 画廊 7（technical support） | `/images/de9d5cc3-…png` | factory-07-1600x1200.webp | packaging and dispatch |
| 画廊 8（packaging and dispatch） | `/images/f160b99a-…jpg` | factory-08-1600x1200.webp | laboratory testing |

- alt 均为自然描述，无「AI」字样（用户明确要求无 AI 水印/标注）。
- 原站图（8 张 UUID 原图）保留在 `public/images/`，未删除。

## 验证

- `npm run build`：38 页构建成功（含 `/factory/`）。
- factory 页 9 图渲染（1 hero + 8 画廊，factory-01 复用于 hero 与画廊第 1 位），全部实存于 `dist/images/factory-ai/`。
- OCR 终复扫（factory-ai 目录）：0 真字。
- 全站图片缺失复扫：src 侧 42 个 `/images/` 引用、dist 侧 40 个引用，**0 缺失**。
- git commit（`factory-ai-images` 标记）+ push + 同步 0/0。
