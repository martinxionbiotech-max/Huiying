# Guides Series — Publish Report

**Date:** 2026-10-28
**Scope:** carfilterspro.com `/guides/` series — 1 Pillar + 4 Cluster articles (English).
**Source:** `docs/source/guides-series-brief.md`

## Pages published

| # | Slug | URL | Words | Tables | FAQ | Checklist |
|---|------|-----|-------|--------|-----|-----------|
| P | automotive-filter-selection-guide | /guides/automotive-filter-selection-guide/ | 1754 | 1 | 5 | 8 (static) |
| C1 | air-filter-vs-cabin-air-filter | /guides/air-filter-vs-cabin-air-filter/ | 1152 | 1 | 4 | — |
| C2 | how-to-choose-an-oil-filter | /guides/how-to-choose-an-oil-filter/ | 1209 | 0 | 4 | 9 (static) |
| C3 | automotive-fuel-filter-types | /guides/automotive-fuel-filter-types/ | 1177 | 1 | 4 | — |
| C4 | replacement-filter-by-oe-number | /guides/replacement-filter-by-oe-number/ | 1569 | 1 | 5 | — |

Plus the series hub: `/guides/` (Pillar card + 4 Cluster cards).

## Internal link graph (article body)

- **Pillar → 4 Clusters** (4 links): C1, C2, C3, C4.
- **C1 → Pillar** (1 link) + inline category links to `/products/air-filter/` and `/products/cabin-filter/`.
- **C2 → Pillar + C4** (2 links).
- **C3 → Pillar + C4** (2 links).
- **C4 → Pillar + C2 + C3** (3 links).

Matches the source brief's plan exactly (Pillar↔Clusters; C2/C3 back to Pillar+C4; C4 back to Pillar+C2/C3).

## Cross-links to real pages

- **Product category backlinks — 4**: `/products/air-filter/`, `/products/cabin-filter/` (C1), `/products/oil-filter/` (C2), `/products/fuel-filter/` (C3).
- **Data-site records — 3** (C4 only, all directly relevant to the OE-number argument):
  - `https://data.carfilterspro.com/products/` (SKU index)
  - `https://data.carfilterspro.com/products/90915-YZZE1/` (source-verified Toyota oil filter)
  - `https://data.carfilterspro.com/products/17801-21050/` (source-verified Toyota Corolla air filter)
- **Footer**: added "Resources → Buying Guides" link (prevents orphan pages).

## SEO / markup verification

- 5 pages each: single `<h1>`, unique `<title>`, unique `description`, canonical URL, `Article` JSON-LD, `BreadcrumbList` JSON-LD.
- Breadcrumb trail: Home › Guides › article title.
- Sitemap: 6 new URLs (`/guides/` + 5 articles) present in `sitemap-index.xml`.

## Zero-fabrication discipline

- No new OE numbers beyond those in the brief. C4's only concrete examples are 90915-YZZE1 and 17801-21050, both already `source-verified` in the canonical dataset.
- No invented filtration efficiency / pressure / flow / certification figures anywhere.
- Evidence-status table (Candidate / Reference cross-checked / Specifications reviewed / Application verified) is labeled as internal management guidance, not industry certification.

## Build & links

- `npm run build` — 98 pages, 0 warnings.
- Internal links checked: **0 broken** (all guide↔guide, category and nav links resolve).
- Inline markdown links in conclusions render as real `<a>` anchors (fixed a double-escape bug before final build).

## Git

- Committed and pushed to `origin/main`.
