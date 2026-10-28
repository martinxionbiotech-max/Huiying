# Phase 1 P2 报告 — 内容集群建议（只建议不实施）

> 审计日期：2026-10-28 · **只建议不实施** · 基于现有知识资产评估证据支持度
> 铁律：**无验证适配数据不生成车型页** · 无迁移计划不动 URL

---

## 0. 现有知识资产盘点（决定四方向可行性的地基）

| 资产 | 位置 | 内容 | 证据强度 |
|---|---|---|---|
| 适配矩阵（reference-only） | `data.huiying/data/fitment.json` + `src/data/vehicleFitment.ts` | 13 品牌（10 乘用 + 3 商用）× 车型清单，8 品类 | **reference 级**，明确「非精确 OE 对照」 |
| OE 前缀模式库 | `data.huiying/data/oe-patterns.json` | OE 号前缀 → 品牌/体系模式 | reference 框架 |
| 尺寸参考区间 | `data.huiying/data/size-ranges.json` | 按车辆级别/机滤螺纹的尺寸区间 | reference 区间 |
| 替换周期参考 | `data.huiying/data/replacement-intervals.json` | 五类滤芯替换周期 | reference |
| 采购参考 | `data.huiying/data/procurement.json` | HS 编码 + MOQ/包装框架 | reference |
| 滤材对比 | `data.huiying/docs/materials/media-comparison.md` | 纤维素/混纺/合成/纳米 + 活性炭/玻纤/驻极 | 手写知识 |
| SKU 深度内容 | `src/data/productContent.ts` | 61 SKU application/scenarios/technical/procurement/maintenance | 已 de-templated |

**关键判断**：现有资产全是 **reference 级**（诚实标注非精确对照），**没有「已验证的精确 OE→车型→SKU」映射数据**。因此任何「车型页」都不能声称精确适配，只能做 reference 级聚合页。

---

## 1. 四方向建议

### 方向 A：四类滤清器（空/空/机/燃）深度内容集群

- **证据支持度：高** ✅
- **现状**：8 品类页已有 purchasingGuide + longTail + FAQ，但内容仍偏「品类概述」，缺「按应用场景/车型平台/采购痛点」的纵深。
- **建议内容**：
  - 空滤：按「轿车面板 / 卡车圆筒 / 农业设备」三分支深化；对齐 fitment 矩阵里 Toyota/Honda/Freightliner/John Deere 的典型应用。
  - 机滤：spin-on vs cartridge 技术纵深 + 旁通阀/止回阀工程点（SKU 深度内容已有雏形）。
  - 燃滤：柴油水分离器（500FH/900FG/1000FH/FF5507）专用集群——这是当前最独特的 SKU 资产。
  - 空滤（cabin）：活性炭 vs 普通 + 过敏市场卖点。
- **理由**：SKU 深度内容 + fitment 矩阵 + 滤材对比三资产齐全，可直接支撑，**无需新数据**。
- **顺序**：**第一优先**（零数据风险，纯内容编排）。

### 方向 B：滤清测试 / 质量体系内容

- **证据支持度：中** ⚠️
- **现状**：`company.ts` 已有 productionProcess/qualitySystem（IQC/IPQC/FQC/OQC 四门 + AQL 框架）+ equipmentCategories，但**均为 framework 描述，无具体测试数值/证书编号**。
- **建议内容**：把「真空测试」「AQL 采样」「IQC/IPQC/FQC/OQC」写成独立的技术页/栏目，诚实标注「具体 AQL 级别按订单约定」。
- **理由**：符合 E-E-A-T，且已有大量文字资产；但**不能添加具体测试数值**（无数据），否则违反零编造纪律。
- **顺序**：第二优先。

### 方向 C：OEM / 私牌采购内容

- **证据支持度：中** ⚠️
- **现状**：`company.ts` 已有 oemDeliveryProcess（sample→spec freeze→batch ID→MOQ/lead）+ exportMarkets + procurement 参考（HS 编码/MOQ 框架）。
- **建议内容**：OEM/私牌采购流程指南 + HS 编码出口参考 + 混合柜/多 SKU 订单说明。
- **理由**：B2B 转化价值高，资产基本现成；但 MOQ/HS 编码仍是 reference 级，需标注。
- **顺序**：第三优先（与方向 B 可并行）。

### 方向 D：OE 交叉参考验证内容

- **证据支持度：低** ⚠️⚠️
- **现状**：34 个 SKU 有 `oeNumbers`（verified-by-source）+ 16 个有 `crossReference`，但**无独立第三方 OE 交叉验证**（仅源站自报）。
- **建议内容**：OE 前缀模式库（oe-patterns.json）深度页 + 「如何用 OE 号匹配滤清器」指南。
- **铁律声明**：**无验证适配数据不生成车型页**。现有 oeNumbers 是「源站发布值」，非「我方验证值」，**不得**据此生成「Toyota Corolla 用 XX 滤清器」式的精确车型页（会产生错误适配风险 + 法律风险）。
- **建议**：只做「OE 号体系科普 + 前缀模式参考」层，不做「精确车型→SKU」断言页。
- **顺序**：**最后**（需先补充第三方验证数据，否则不做）。

---

## 2. 建议顺序与理由（汇总）

| 顺序 | 方向 | 证据支持度 | 数据风险 | 理由 |
|---|---|---|---|---|
| 1 | A 四类滤清器集群 | 高 | 零（纯编排） | 资产齐全，直接落地 |
| 2 | B 滤清测试/质量 | 中 | 低（无具体数值） | E-E-A-T 加分，资产现成 |
| 3 | C OEM/私牌采购 | 中 | 低（reference 标注） | B2B 转化价值 |
| 4 | D OE 交叉验证 | 低 | 高（缺独立验证） | 需先补验证数据，否则不做 |

---

## 3. 明确边界（铁律重申）

1. **无验证适配数据不生成车型页**：现有 fitment/oeNumbers 均为 reference/源站发布级，**不得**产出「精确车型→精确 SKU」断言页。
2. **不编造测试数值**：方向 B 只能做 framework 层，禁止添加具体效率/压差/认证编号。
3. **不迁移 URL**：所有建议基于现有 URL 结构内扩展，不动现有 92 页。
4. **只建议不实施**：本报告为建议，实施需另行授权。

---

*本报告为审计产出，未修改任何业务文件。*
