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

---

# Batch 2 — Quality & Testing (5) + OEM Sourcing (4)

**Date:** 2026-10-28
**Scope:** carfilterspro.com `/guides/` — 9 more articles (Quality pillar + 4 clusters; OEM pillar + 3 clusters).
**Source:** `docs/source/guides-series-brief-2.md`

## Pages published

| # | Slug | URL | Words | Tables | FAQ | Checklist | Formulas |
|---|------|-----|-------|--------|-----|-----------|----------|
| QP | automotive-filter-quality-testing | /guides/automotive-filter-quality-testing/ | 1942 | 1 | 5 | — | — |
| QC1 | automotive-air-filter-efficiency-test | /guides/automotive-air-filter-efficiency-test/ | 1339 | 1 | 4 | — | — |
| QC2 | oil-filter-multi-pass-test | /guides/oil-filter-multi-pass-test/ | 1180 | 1 | 4 | — | 1 (Beta ratio) |
| QC3 | filter-media-pressure-drop-dust-holding-capacity | /guides/filter-media-pressure-drop-dust-holding-capacity/ | 1372 | 1 | 4 | — | — |
| QC4 | automotive-filter-quality-inspection | /guides/automotive-filter-quality-inspection/ | 1759 | 0 | 5 | 26 (A–F) | — |
| OP | oem-automotive-filter-sourcing | /guides/oem-automotive-filter-sourcing/ | 3035 | 3 | 6 | 9 (RFQ) | 1 (landed cost) |
| OC1 | how-to-evaluate-automotive-filter-manufacturer | /guides/how-to-evaluate-automotive-filter-manufacturer/ | 3044 | 3 | 5 | — | 2 (total cost, weighted score) |
| OC2 | oem-automotive-filter-sourcing-from-sample-to-production | /guides/oem-automotive-filter-sourcing-from-sample-to-production/ | 2687 | 4 | 6 | 15 (production readiness) | — |
| OC3 | automotive-filter-packaging-container-loading | /guides/automotive-filter-packaging-container-loading/ | 2415 | 2 | 6 | 16 (pre-shipment) | 3 (carton volume, example, logistics cost) |

Guides total: 6 → **15** pages (14 articles + `/guides/` overview hub).

## Internal link graph

- **Quality pillar ↔ 4 clusters**: pillar links all four clusters; each cluster links back to the pillar; cross-cluster QC1↔QC3.
- **OEM pillar ↔ 3 clusters**: pillar links all three clusters; each cluster links back to the pillar; cross-cluster OC1↔OC2, OC1↔OC3, OC2↔OC3.
- **Cross-series + selection pillar**: Quality pillar ↔ OEM pillar; both pillars → Selection pillar (`automotive-filter-selection-guide`).
- Every internal link targets a real `/guides/` URL (this batch's 9 + the prior 6).

## Cross-links to real pages

- **Product category backlinks — 4** (all real published pages):
  - `/products/air-filter/`, `/products/cabin-filter/`, `/products/oil-filter/`, `/products/fuel-filter/`.
- **Data-site records — 0** (no OE-number-specific claims in this batch; nothing to link).

## Zero-fabrication discipline

- No ISO/SAE or other specific standard numbers added anywhere.
- No claim that CarFiltersPro or its suppliers passed specific tests; no invented lab reports.
- Efficiency / Beta ratio / pressure drop / dust-holding capacity all carry condition qualifiers.
- Beta-ratio example is labelled "a mathematical example, not a performance claim about any particular automotive oil filter."
- Inspection (A–F), RFQ, production-readiness, and pre-shipment checklists are labelled as original buyer templates, not official certification/standards.

## SEO / markup verification

- 9 pages each: single `<h1>`, unique `<title>`, unique `description`, canonical URL, `Article` JSON-LD, `BreadcrumbList` JSON-LD.
- `/guides/` now groups three pillars: Selection / Quality & Testing / OEM Sourcing.
- Sitemap: 9 new guide URLs present in `sitemap-index.xml`.

## Build & links

- `npm run build` — 107 pages, 0 warnings, 0 errors.
- Internal link check: **0 broken** guide/product links (verified against `dist/`).

## Git

- Committed and pushed to `origin/main` (batch-2 marker).
