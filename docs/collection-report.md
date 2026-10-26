# huiying 建站采集报告

> 从源站全站采集（公司 + 产品 + 全部图片）→ 空仓搭建 Astro 站 → 品牌全替换为 huiying。
> 生成时间：2026-10-26

## 一、采集概况

| 指标 | 数值 |
| --- | --- |
| 采集页面总数 | **40**（1 首页 + 8 公司 + 3 新闻列表 + 8 新闻正文 + 6 品类 + 14 产品详情） |
| 建站生成页面 | **35**（含静态路由展开） |
| 唯一图片发现 | **64** |
| 图片下载成功 | **62** |
| 图片下载失败 | **2**（源站 404，见「残留清单」） |

### 页面明细

| 区块 | 页面数 | 说明 |
| --- | --- | --- |
| 首页 | 1 | `/` |
| 产品 | 16 | 1 总览 + 5 品类（空气/空调/机油/燃油/雨刮）+ 10 SKU 详情 |
| 公司 | 8 | Profile / Culture / Factory / Marketing / Download / Exhibition / Contact / Privacy |
| 新闻 | 10 | 1 总览 + 9 文章 |
| **合计** | **35** | |

## 二、品类与 SKU

- **品类 5 个**：Air Filter（空气滤清器）、Cabin Filter（空调滤清器）、Oil Filter（机油滤清器）、Fuel Filter（燃油滤清器）、Wiper（雨刮）
- **SKU 10 个**：
  - 空气滤清器 ×8（源站 ID 692/693/698-703 → HY-AF-*）
  - 空调滤清器 ×1（源站 ID 691 → HY-CF-691）
  - 机油滤清器 ×1（源站 ID 690 → HY-OF-690）
- 燃油滤清器、雨刮品类在源站为**空品类**（0 SKU），已按源站如实保留为「准备中」落地页。

## 三、品牌替换

- 源站品牌文本出现 **835 行**（含每页页眉 logo「TIANRUI FILTER」+ 页脚「Qinghe County Tianrui Filter Manufacturing Co., Ltd.」的重复渲染）。
- 已替换要点：
  - `Qinghe County Tianrui Filter Manufacturing Co., Ltd.` → `Qinghe County Huiying Filter Manufacturing Co., Ltd.`
  - `Tianrui Filter Manufacturing` / `Tianrui Filter` → `huiying Filter Manufacturing` / `huiying Filter`
  - `TIANRUI FILTER`（logo alt）→ 文本 Logo `HY` + `huiying`（未复用源站 logo 位图）
  - `davidwang@tianruifilter.com` → `davidwang@huiyingfilter.com`
- **替换后站点残留：0**（`src/` + `dist/` 全文 grep，大小写不敏感，含 `天瑞`）。

## 四、残留清单

### 4.1 文本残留

无。`src/` + `dist/` 中 0 处 `Tianrui`/`TIANRUI`/`天瑞`。

> 说明：`scripts/`（抓取脚本）与 `crawls/`（已 gitignore 的原始抓取数据）中保留源站域名与品牌字样，属采集工具与原始数据，非站点内容。

### 4.2 图片下载失败（源站 404，无法恢复）

| 图片 | 状态 |
| --- | --- |
| `ac7dfb0c-9f66-4346-a20f-f226255c788d.png` | 源站 404（首页，双域均 404） |
| `de378b30-b55f-4eab-91de-bef0d9ae88aa.png` | 源站 404（双域均 404） |

### 4.3 图片内嵌文字（像素层含品牌字样，无法替换，如实标注）

以下源图 ALT 含品牌字样，判定为「图片内嵌文字不可替换」。新站已**不复用**这些位图（页眉改用文本 Logo，页头横幅改用文本样式）：

| 图片 | 内嵌文字 | 处置 |
| --- | --- | --- |
| `b27a61f1...png` | `TIANRUI FILTER`（logo） | 未用，改用文本 Logo `HY` |
| `e7c649ac...jpg` | `TIANRUI Hub Logistics Centralization` | 未用 |
| `dbd03028...jpg` | `TIANRUI FILTER` | 未用 |
| `0e4af394...jpg` | `Tianrui Filter Manufacturing` | 未用 |
| `f160b99a/b5a75dda/4ccdbf70...jpg` | `ABOUT US` / `TECHNICAL SUPPORT` / `PRODUCTS` 横幅 | 未用，改用文本页头 |

其余已用图片（产品图、工厂图、展会图、文化图标）像素层无品牌文字，仅 ALT 曾含品牌字样，已在新站替换为干净 ALT。

## 五、构建与验证

| 检查项 | 结果 |
| --- | --- |
| `npm run build` | ✅ 35 页面，0 错误 |
| 全页面渲染 | ✅ 首页 / 产品 / SKU / 公司 ×8 / 新闻 ×10 |
| 图片引用实存复扫 | ✅ 28 个引用路径，0 缺失 |
| 品牌替换 grep 复扫 | ✅ `src/`+`dist/` 0 残留 |

## 六、Git

- 提交至 `origin/main`（空仓首次提交）。
- 已 gitignore：`node_modules/`、`dist/`、`.astro/`、`crawls/`。
