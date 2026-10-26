# huiying 站 · 合规页检查补全深化报告（compliance-suite）

> 生成时间：2026-10-26 · 仓库：`Huiying`（Astro · 品牌 huiying · 域名 huiyingfilter.com）
> 范围：隐私政策深化 + 新建 Terms / Disclaimer / Cookies + Footer Legal 接线 + 人工审查对齐

## 一、总体结论

| 指标 | 结果 |
| --- | --- |
| 合规页总数 | **4**（隐私政策深化 1 + 新建 3） |
| 页面总数（build） | 35 → **38** |
| Footer Legal 区块 | 4 链接全站接线 ✅ |
| 运营主体一致性 | 与 Organization JSON-LD 完全一致 ✅ |
| build | ✅ 通过（38 pages，2.63s） |

## 二、逐页词数 before → after（正文词数口径）

| 页面 | before | after | 节数（h2） | 新增/深化要点 |
| --- | ---: | ---: | ---: | --- |
| 隐私政策 `/privacy-policy/` | 437 | 1387 | 4 → **15** | GDPR 9 项权利 + CCPA 专节 + 保留期 + 国际传输 + 未成年人 16 岁 |
| 服务条款 `/terms/`（新建） | — | 1160 | 18 | 8 条禁止用途 + 询盘非报价 + 责任限制/赔偿/不可抗力/完整协议/准据法 |
| 免责声明 `/disclaimer/`（新建） | — | 551 | 10 | 规格以正式单为准 + 参考价 10–60 USD + 非专业建议 + 无 AI 生成图 |
| Cookie 政策 `/cookies/`（新建） | — | 485 | 7 | 分类表（必要/分析/功能/广告）如实声明 + 浏览器退出 |

## 三、隐私政策深化内容（15 节）

数据收集范围/用途/共享 → 合法处理依据（GDPR）→ 共享与披露 → 国际传输保障 → 数据保留期 → 安全措施 → **GDPR 9 项权利**（访问/更正/删除/可携带/反对/撤回同意/限制处理/自动化决策/向监管机构投诉）→ **CCPA 专节**（收集类别 / 不销售不共享 / 加州权利 5 项）→ 未成年人（16 岁门槛）→ Cookies → 第三方链接 → 政策更新 → 联系方式。

## 四、人工审查对齐清单

| 对齐项 | 状态 |
| --- | --- |
| 运营主体 `Qinghe County Huiying Filter Manufacturing Co., Ltd.` | 四页均明确 ✅ |
| 联系方式 `davidwang@huiyingfilter.com` | 四页均出现 ✅ |
| 联系方式 `+86-319-8291681` | 四页均出现 ✅ |
| 生效日期 `2026-10-26`（Last updated + Effective date） | 四页均出现 ✅ |
| 主体信息与 Organization schema 一致（huiyingfilter.com） | 同一 `site.ts` 数据源 ✅ |
| 诚实口径（不虚增功能 / 不声称不实认证） | 如实：无分析/广告/功能 cookie · 无 AI 生成图 · 询盘非报价 ✅ |
| 数据保留期 | 询盘 ≤24 月 / 日志 ≤90 天 ✅ |

## 五、Footer 接线

`src/data/site.ts` 的 `complianceLinks` 由 1 项扩展为 4 项，Footer `Legal` 区块全站渲染：

1. Privacy Policy `/privacy-policy/`
2. Terms of Service `/terms/`
3. Disclaimer `/disclaimer/`
4. Cookie Policy `/cookies/`

同时将 `companyLinks`（Company 列）中的 Privacy Policy 移除，避免与 Legal 列重复。

## 六、实现结构

- `src/data/legal.ts` — 四份合规文档单一数据源（引用 `site.ts` 主体/联系方式/域名）。
- `src/components/LegalPage.astro` — 共用法律页脚手架：Hero + 自动目录（TOC）+ 稳健 Markdown 渲染（h2/h3、有序/无序列表、表格、粗体/斜体/链接、锚点）。
- `src/pages/` — `privacy-policy.astro`（重写）、`terms.astro`、`disclaimer.astro`、`cookies.astro`（新建）。
- `src/data/company.ts` — 移除旧 `privacyPolicy`（已迁移至 legal.ts）。

## 七、诚实口径说明

- **Cookie**：本站为静态 Astro 站，无分析/广告/功能/营销 cookie，无第三方追踪，无需同意横幅——已如实声明「仅必要 cookie，不使用分析/广告追踪」。
- **AI 图像**：全站图片为源站采集照片，未使用 AI 生成图——免责声明已如实声明「不使用 AI 生成图」，并保留「产品图仅示意、以实样为准」表述。
- **认证**：未声称任何不实认证；价格 10–60 USD 标注为「参考价」，规格以正式规格单/样品确认单为准。
