# E-E-A-T 改写批报告 — 公司主体 + 联系信息重写与强化

日期：2026-10-27 · 批次标记：`eeat-rewrite` · 覆盖两仓（主站 Huiying + 数据站 data.huiying）

## 1. 新法律主体（权威口径）

| 字段 | 值 | 来源 · 检索日期 |
|---|---|---|
| 公司名（中） | 清河县汇盈汽车零部件有限公司 | 工商数据 · 2026-10-25 |
| 公司名（英） | Qinghe County Huiying Automotive Parts Co., Ltd. | 工商数据 · 2026-10-25 |
| 统一社会信用代码 | 91130534MA0958NT84 | 天眼查快照经搜狗聚合 · 2026-10-25 |
| 法定代表人 | 刘风秀（Liu Fengxiu） | 天眼查快照经搜狗聚合 · 2026-10-25 |
| 成立日期（实体） | 2017-10-10 | 天眼查快照经搜狗聚合 · 2026-10-25 |
| 注册资本 | 100 万元（RMB 1,000,000） | 天眼查快照经搜狗聚合 · 2026-10-25 |
| 注册地址 | 河北省邢台市清河县闽江街以北、九华山路以西 | 天眼查快照经搜狗聚合 · 2026-10-25 |
| 经营范围 | 汽车零部件制造 | 工商数据 · 2026-10-25 |
| 品牌渊源 | 1996（brand lineage，与法律实体 2017-10-10 明确区分） | 品牌历史表述 |
| 百度百科词条 | https://baike.baidu.com/item/清河县汇盈汽车零部件有限公司/54139720 | 页面地域封锁 403 无法抓正文，URL 即权威引用，诚实注记「Baidu Baike company entry」 |

**零编造纪律**：上表每一项均标注来源与检索日期。百科词条正文不可抓取，仅以 URL 作为 sameAs 引用与外链，未虚构词条内容。

## 2. 联系信息（全站一致）

- 姓名：Martin
- 邮箱：Martin@carfilterpro.com
- 电话 | 微信：+86 13323237275（`tel:+8613323237275`）
- WhatsApp 按钮：保持不变（+86 15903195739 · https://wa.me/8615903195739）

## 3. 改名/联系替换对照表

### 主站 `Huiying`（10 个文件）

| 文件 | 旧值 → 新值 |
|---|---|
| `src/data/site.ts` | 公司名、短名、地址、邮箱、电话全部替换；新增 `legalName`/`foundingDate`/`companyNameZh`/`addressZh`/`phoneHref`/`contactName`/信用代码/法人/注册资本/百科 URL |
| `src/data/company.ts` | `companyProfile.description` 原创重写；下载文件名 `huiying Filter Manufacturing` → `Huiying Automotive Parts`；新增 `companyDisclosure` + `brandLineage` 导出 |
| `src/data/legal.ts` | 隐私/条款/免责/饼干 4 页 description 改模板字面量引用新实体名；生效/更新日期 2026-10-26 → 2026-10-27 |
| `src/layouts/BaseLayout.astro` | Organization JSON-LD：`name`+`legalName`+`alternateName`（品牌/短名/中文名）+`foundingDate:2017-10-10`+`email`+`telephone`+注册地址 `streetAddress`+`sameAs`（百科 URL）+`contactPoint.name` |
| `src/components/Footer.astro` | 页脚法律行自动引用新实体名；`Tel:` → `Phone \| WeChat:`；`tel:` 用 `phoneHref` |
| `src/pages/contact.astro` | `Tel:` → `Phone \| WeChat:`；`tel:` 用 `phoneHref` |
| `src/pages/company-profile.astro` | 新增「品牌渊源 vs 法律实体」段 + 「法律主体与注册信息」披露块 + 百科 dofollow 外链 |
| `src/pages/factory.astro` | 新增主体披露块 + 百科引用；修正未用 `site` 导入 |
| `src/pages/index.astro` | hero facts：`Founded 1996` → `Brand since 1996` + 新增 `Incorporated 2017`；strength 文案口径区分 |
| `public/llms.txt` | 公司名 + 「brand lineage since 1996 / incorporated 2017」口径 |

### 数据站 `data.huiying`（3 个文件）

| 文件 | 旧值 → 新值 |
|---|---|
| `mkdocs.yml` | `copyright` 法律主体名替换 |
| `overrides/main.html` | Organization JSON-LD：name/legalName/alternateName/foundingDate/email/telephone/sameAs/address 全量同步 |
| `docs/llms.txt` | `Operator:` 法律主体名替换 |

## 4. 百科引用落地位置

| 位置 | 形式 |
|---|---|
| `src/layouts/BaseLayout.astro` schema `sameAs` | `["https://baike.baidu.com/item/清河县汇盈汽车零部件有限公司/54139720"]` |
| About 页（company-profile） | dofollow 外链 `rel="noopener"`（无 nofollow），文案「Company profile on Baidu Baike」+ 403 诚实注记 |
| Factory 页 | 同上，dofollow 外链 + 注记 |
| `data.huiying/overrides/main.html` schema `sameAs` | 同步 |
| footer | 页脚法律行引用实体名（无外链，schema 已含 sameAs） |

## 5. 品牌渊源 vs 实体口径

- 站点首页 hero facts 现为两项并列：**Brand since 1996** 与 **Incorporated 2017**。
- `site.since = 1996` 保留为品牌渊源，页脚 `EST. 1996` 表品牌成立。
- `site.foundingDate = '2017-10-10'` 为法律实体成立日，写入 Organization JSON-LD `foundingDate`。
- About / Factory 披露块显式区分：品牌可追溯至 1996，运营法律主体 2017-10-10 注册，经营范围汽车零部件制造。

## 6. 残留复扫

- 主站 `src/` + `public/`：旧名 / 旧邮箱 / 旧电话 **0 命中**。
- 数据站 `docs/` + `mkdocs.yml` + `overrides/`：旧名 / 旧邮箱 / 旧电话 **0 命中**。
- 构建产物 `dist/`（主站）与 `site/`（数据站）：旧名/旧联系 **0 命中**。

> 复扫范围说明：`crawls/`（源站 tianrui 抓取镜像）与历史审计报告（`docs/collection-report.md`、`docs/compliance-report.md` 等）为历史存档/源材料，非线上内容，未改写；`dist/`、`site/` 为构建产物（已重新生成）、`crawls/` 均不在 git 跟踪内。

## 7. 验证结果

- 主站 `npm run build`：✅ 38 page(s) built · 3.17s
- 数据站 `mkdocs build`：✅ built in 1.62s（仅 MkDocs 2.0 未来兼容性警告，非错误）
- 联系信息三处渲染一致（footer / contact / schema）：✅ Martin@carfilterpro.com · +86 13323237275
- 百科链接渲染（About 外链 / footer 实体名 / schema sameAs）：✅
