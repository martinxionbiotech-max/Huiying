// ---------------------------------------------------------------------------
// Product-page index-quality grading (quality review batch, 2026-10-28).
//
// Single source of truth for three consumers:
//  1. @astrojs/sitemap `filter` (astro.config.mjs) — excludes C-tier slugs so
//     thin / near-duplicate / not-ready SKU pages are dropped from the sitemap
//     while the pages themselves stay live and internally linked.
//  2. robots noindex flag ([slug].astro) — the "not-ready" subset of C gets
//     `<meta name="robots" content="noindex">` (strict "not prepared to take
//     part in search" reading); empty/near-duplicate C pages only leave the
//     sitemap and stay indexable/crawlable.
//  3. docs/index-quality-report.md — the grading list, exclusion list and
//     enrichment list.
//
// Grading model (evidence depth, per SKU):
//   A  — rich independent evidence: OE number + cross-reference + material
//        (and/or brand fitment) + source-verified, ≥3 unique spec fields.
//   B  — has a source but thin: OE-only congben SKUs (1–2 fields) and the
//        tianrui-traced SKUs (0 fields, distinct editorial identity, no dup).
//   C  — excluded: congben generic no-OE SKUs (templated / near-duplicate)
//        plus the near-duplicate OE SKU `oil-filter-15400-plc`.
// ---------------------------------------------------------------------------

export const GRADES = {
  A: [
    'oil-filter-90915-yzze1',
    'air-filter-17801-30070',
    'air-filter-17801-21050',
    'oil-filter-15400-plc-004',
    'air-filter-03-42776-010',
    'rubber-hoses-17127525023',
    'brake-pads-04465-04030',
    'air-filter-04e129620',
    'air-filter-16546-ed000',
    'air-filter-1500a098',
    'air-filter-17220-5r0-008',
    'air-filter-28113-2s000',
    'air-filter-a2700940004',
    'air-filter-13717811026',
    'air-filter-lr011593',
    'oil-filter-90915-yzze2',
    'oil-filter-a0001802309',
    'oil-filter-a2701800009',
    'oil-filter-04152-31080',
  ],
  B: [
    'of-690',
    'cf-691',
    'af-692',
    'af-693',
    'af-698',
    'af-699',
    'af-700',
    'af-701',
    'af-702',
    'af-703',
    'fuel-filter-500fh',
    'oil-filter-lf14000nn',
    'fuel-filter-ff5507',
    'air-filter-re596317',
    'oil-filter-35330-08010',
    'oil-filter-04152-37010',
    'brake-pads-04465-0k020',
    'oil-filter-04152-31090',
    'fuel-filter-900fg',
    'fuel-filter-1000fh',
    'oil-filter-15208-65f00',
    'fuel-filter-23390-0l070',
    'cabin-filter-87139-0n010',
  ],
  C: [
    'rubber-hoses-premium-nbr-nitrile-rubber-hose-china-factory-and',
    'oil-filter-15400-plc',
    'oil-filter-premium-motorcycle-fuel-and-oil-filters-china-fact',
    'rubber-hoses-custom-reinforced-silicone-turbo-heater-hose-china',
    'rubber-hoses-high-performance-braided-silicone-heater-vacuum-ho',
    'rubber-hoses-custom-epdm-rubber-elbow-hose-china-factory-and-le',
    'rubber-hoses-oil-resistant-nbr-automotive-fuel-hose-china-facto',
    'rubber-hoses-custom-high-temperature-radiator-silicone-hose-fac',
    'rubber-hoses-black-hydraulic-oil-fuel-hose-high-pressure-fuel-l',
    'rubber-hoses-custom-high-temp-radiator-hose-auto-elbow-silicone',
    'rubber-hoses-oil-resistant-nbr-automotive-fuel-hose',
    'rubber-hoses-custom-auto-black-elbow-epdm-rubber-hose-pipe-cool',
    'rubber-hoses-heat-resistant-braided-silicone-heater-vacuum-hose',
    'rubber-hoses-custom-reinforced-silicone-turbo-heater-hose-90-de',
    'oil-filter-motorcycle-oil-gasoline-filter-fuel-filters',
    'spark-plugs-auto-original-genuine-engine-spark-plug',
    'fuel-filter-diesel-fuel-filter-water-separator',
    'oil-filter-heavy-duty-trucks-oil-filters',
  ],
};

// C-tier sub-split — recorded separately per audit rule:
//   "未就绪" (not ready → noindex + sitemap exclude)  — zero source-published
//     spec fields (no OE/cross/material/dim/fit); placeholder SKU pages.
//   "空内容/近似重复" (empty / near-duplicate → sitemap exclude only) — still
//     generic/near-duplicate but carry ≥1 published field.
export const NOINDEX_SLUGS = [
  'rubber-hoses-black-hydraulic-oil-fuel-hose-high-pressure-fuel-l',
  'rubber-hoses-custom-high-temp-radiator-hose-auto-elbow-silicone',
  'rubber-hoses-oil-resistant-nbr-automotive-fuel-hose',
  'rubber-hoses-custom-auto-black-elbow-epdm-rubber-hose-pipe-cool',
  'rubber-hoses-heat-resistant-braided-silicone-heater-vacuum-hose',
  'rubber-hoses-custom-reinforced-silicone-turbo-heater-hose-90-de',
  'oil-filter-motorcycle-oil-gasoline-filter-fuel-filters',
  'spark-plugs-auto-original-genuine-engine-spark-plug',
  'fuel-filter-diesel-fuel-filter-water-separator',
  'oil-filter-heavy-duty-trucks-oil-filters',
];

// Every C-tier slug is excluded from the sitemap (noindex subset + the rest).
export const SITEMAP_EXCLUDED_SLUGS = GRADES.C;

export const NOINDEX_SET = new Set(NOINDEX_SLUGS);
export const SITEMAP_EXCLUDED_SET = new Set(SITEMAP_EXCLUDED_SLUGS);

/** True when the URL path (e.g. /products/air-filter/af-692/) is a C-tier page. */
export function isSitemapExcludedPath(pathname) {
  return SITEMAP_EXCLUDED_SLUGS.some((slug) => pathname.endsWith(`/${slug}/`));
}
