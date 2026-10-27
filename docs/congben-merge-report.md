# congbenfilter.com 目录并入报告

> 数据管道：Playwright 抓取 + WP REST API 结构化提取 → 精细化 → 并入 huiying 主站目录 → 同步 data.huiying
> 日期：2026-10-27 · 品牌 huiying · 主站 Astro · 数据站 MkDocs

## 结果摘要

| 指标 | 数值 |
|---|---|
| 抓取产品数（源站 API 总数） | 486（351 英文 + 135 多语言 SEO 重复页） |
| 规范英文/热销产品页 | 80 |
| 去重后独立产品 | 52（36 按主 OE + 16 通用/定制） |
| **并入 SKU 数** | **51** |
| 产品图片（去重前 → 后） | 513 唯一 URL → 300 唯一文件（字节哈希去重 213 · 死链 0） |
| SKU 总数（前 → 后） | 10 → 61 |
| 品类数（前 → 后） | 5 → 8 |
| OE 号覆盖 | 53 个独立 OE 号 · 34 个产品 |
| 适配车型覆盖 | 11 品牌 · 40 组品牌+车型 · 25 个产品 |

## 并入 SKU 分品类明细（51 新）

| 品类 | 数量 | 说明 |
|---|---|---|
| oil-filter 机油滤 | 15 | Toyota 90915/04152 系列、Honda 15400、Mercedes A270/A000、Suzuki 15208、Fleetguard LF14000NN、35330 变速箱滤 |
| air-filter 空气滤 | 13 | BMW 13717811026、VW 04E129620、Honda 17220、Mitsubishi 1500A098、Nissan 16546、Land Rover LR011593、John Deere RE596317、卡车 P320510 |
| rubber-hoses 橡胶管 | 13 | EPDM/NBR/硅胶定制管、BMW 17127525023 上水管 |
| fuel-filter 燃油滤 | 6 | FF5507、500FG/FH、900FG/FH、1000FH/FG 油水分离器、23390 |
| brake-pads 刹车片 | 2 | Toyota 04465-0K020/04030/0K070 陶瓷刹车片 |
| cabin-filter 空调滤 | 1 | Toyota 87139-0N010 |
| spark-plugs 火花塞 | 1 | 通用点火火花塞（source 标 reference） |

## 新品类清单（3）

1. **brake-pads**（刹车片）— code `bp` · 2 SKU
2. **spark-plugs**（火花塞）— code `sp` · 1 SKU
3. **rubber-hoses**（橡胶管）— code `rh` · 13 SKU

> 另：fuel-filter 原为空品类（stocked=false），现并入 6 个真实产品后已恢复进导航（stocked=true）。wiper 仍无产品，保持隐藏。

## 数据诚实口径

- 每个产品带 `source` 标注：`{ name: "congbenfilter.com", url, status, retrieved }`。
- 有 OE 号的产品 → `status: verified-by-source`（源站目录明确标注 OE）。
- 通用/定制产品（无单一 OE）→ `status: reference`。
- SKU 页 + 数据站 SKU 页均渲染：OE 号 / 交叉参考 / 材质 / 尺寸 / 适配车型 / 数据来源，缺项标 `Confirm per order specification`（不虚构）。
- 适配车型数据来自源站目录（品牌+车型），标注 `reference`——非独立验证的精确 OE 匹配。

## 两仓构建 / 提交 / 推送

| 仓 | build | commit | push |
|---|---|---|---|
| Huiying（主站） | `npm run build` → 92 页 ✓ | congben-merge-catalog + congben-merge-data | ✓ |
| data.huiying（数据站） | `mkdocs build` ✓ | congben-merge-sync | ✓ |

- `data.huiying/data/products.json` 与主站 `src/data/products.json` 字节一致（`diff -q` 通过）。
- 数据站 SKU 页 / 品类页 / 导航 / fitment 参考页（8 类）全部由 `scripts/build-fitment-pages.py` + `scripts/gen-nav.py` 重新生成，并清理 31 个过期 SKU 页。

## 验证

- SKU 数 10 → 61 ✓
- 品类数 5 → 8 ✓
- 新品类渲染（brake-pads / spark-plugs / rubber-hoses 品类页 + SKU 页）✓
- 图片引用全实存（0 缺失）✓
- 断链 0（424 个内链全解析）✓
- 去重统计：图片 513→300（去重 213）；产品 486→51（并入）

## 失败清单

- 无。抓取 76/76 页 OK，图片 0 死链，两仓 build 0 报错。
