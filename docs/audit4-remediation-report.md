# Audit 4 — Remediation Report (carfilterspro)

**Date:** 2026-10-28
**Scope:** P0 (data consistency + fitment matrix redesign) · P1 (SKU template restructure) · positioning/homepage · per-SKU OG images
**Repos:** `Huiying` (Astro main site, 60 SKU · 8 categories) + `data.huiying` (MkDocs data site, 592-row fitment)

---

## 1. Three-state data status model — unified across both sites

Unified model applied to **all 60 SKUs** on both sites (byte-identical `products.json`):

| State | Meaning | Count (both sites) |
|---|---|---|
| `catalog-confirmed` | source-catalog field (OE / cross-reference / material); OE↔brand attribution is a fact | **33 OE-bearing SKUs** (26 with stated brand, 7 OE-only) |
| `factory-verified` | factory drawing / measurement | **0** (honestly empty) |
| `pending` | year / engine / thread / seal / bypass not verified | remaining fields on all 60 SKUs |

Supporting labels: `verified` (SKU identity) · `reference` (fitment matrix + vehicle model/year).

**Label migration:** `source-verified` → `catalog-confirmed` · `fitment-verified` → `factory-verified` · `NEEDS_VERIFICATION` → `pending`.

> Note: the brief mentioned "36 OE SKU association rows"; the canonical dataset actually contains **33** OE-bearing SKUs (the pre-existing data-site count). No OE relationship was invented to reach 36.

---

## 2. Case A / B — inconsistency fixes (both sites aligned)

### Case A — `17801-30070`
| Field | Before | After |
|---|---|---|
| Brand | data site `reference` + empty brand (main site "Toyota-pattern") | **Toyota** (OE-number brand attribution = source-catalog fact) |
| OE↔brand status | `reference` | **`catalog-confirmed`** |
| Main-site wording | "Toyota-pattern" | **"Toyota OE-pattern (catalog-confirmed)"** |

### Case B — `04152-31080`
| Field | Before | After |
|---|---|---|
| Brand | Toyota (models `["& Lexus"]` garbage) | **Toyota / Lexus** |
| Engine | "Toyota & Lexus (2.5L–3.5L engines)" presented as verified | **"2.5L–3.5L engine band (catalog reference)"** — not a verified fitment |
| Cross-reference | bare numbers | **annotated as source catalog** |
| Desc | "Thread, seal and bypass are confirmed per engine" | removed false confirmation; band marked catalog reference |

Both cases verified **same value on both sites** (diff on `products.json` → IDENTICAL; rendered HTML/MD aligned).

---

## 3. Fitment matrix redesign (data site)

- **592 rows frozen** (74 vehicles × 8 filter types) — no rows added.
- Each row now carries (blank / `reference`, never auto-generated):
  - `Fitment status` — three-state, **all `reference`**
  - `Evidence source` — blank (`—`)
  - `Verification date` — blank (`—`)
  - `Model year / engine (evidence)` — blank (`—`)
- **Status distribution:** 592 `reference` · 0 `catalog-confirmed` · 0 `factory-verified`.
- **Fitment index** now states plainly: the 74 models are a *reference model list* — not a claim that each model has a SKU, and not a verified fitment.
- **SKU–OE association** (33 real OE↔brand relationships) presented as a **separate partition** from the reference matrix (26 `catalog-confirmed` brand, 7 OE-only `reference`).

---

## 4. SKU page template restructure (60 SKU pages)

All 60 SKU pages rebuilt to the six-block structure:

1. **Product identity & purchase entry** — name / SKU / OE / source status / RFQ button
2. **Core technical parameters** — only `catalog-confirmed` fields; thread/seal/bypass/efficiency = `pending`
3. **Fitment & cross-reference** — OE↔brand `catalog-confirmed` vs model/year `reference`; no auto-inference
4. **Quality verification & documents** — "No published test data for this SKU — request from sales"
5. **OEM & private-label procurement** — packaging/label/MOQ/sampling/mixed-batch/lead time (confirm per order)
6. **Related products & technical materials** — category / guides / data-site SKU record link

Template render verified across 5 sampled SKUs (90915-YZZE1, 17801-30070, 04152-31080, 03-42776-010, HY-RH-603).

---

## 5. Performance-inference deletion

**28** unverifiable performance-inference sentences deleted/downgraded from `productContent.ts` (`technical` arrays + P0-1 editorial), replacing "media ↔ fine-particle / dust-holding capacity / bypass calibration" claims with honest material descriptions and `pending`/`general category knowledge` annotations. Procurement guidance (request-the-spec-in-writing) retained.

---

## 6. Homepage — positioning + five questions

- Positioning changed to **"Automotive Filter Manufacturer & OEM/Private Label Supplier"** (hero title + `site.positioning` + tagline).
- **Five-question block** rendered on the homepage:
  1. Do you make your own filters, or outsource? — own production core + supplementary lines explicit
  2. Can you develop from OE / sample / drawing?
  3. How do you control batch quality and traceability? — four-gate IQC/IPQC/FQC/OQC + AQL
  4. Do you support OEM / private label and multi-SKU orders?
  5. What do you need to give me a quote?
- Supplementary lines (brake pads / spark plugs / rubber hoses / wiper) framed as "supplementary lines" alongside four core filter lines.

---

## 7. Per-SKU OG images + canonical/sitemap

- **OG per-SKU: 60/60** — each SKU page carries `og:title`, `og:description`, `og:image` (first real product image) + `twitter:image`.
- `BaseLayout` extended with `ogTitle`/`ogDescription`/`ogImage` overrides (fallback = default brand image).
- Canonical self-reference: trailing-slash `always`; no C-tier SKU pages in sitemap.
- Sitemap: **88 canonical URLs** (42 SKU + 46 non-SKU incl. 16 guides), all trailing-slash, no `noindex`/C-tier leak. (Prior "73" predates the guides batch; reviewed and correct.)

---

## 8. Verification summary

| Check | Result |
|---|---|
| Main site build | ✅ 107 pages, 0 errors |
| Data site build (`mkdocs build`) | ✅ 0 errors |
| Case A/B status alignment (both sites same value) | ✅ |
| 6-block template render (5 sampled SKUs) | ✅ |
| Performance-inference deletions | ✅ 28 |
| Homepage five-question render | ✅ |
| OG image per-SKU | ✅ 60/60 |
| Broken internal page links | ✅ 0 (3928 page-to-page hrefs) |
| `products.json` byte-identical across repos | ✅ |
| Sitemap canonical-only | ✅ 88 URLs, no C-tier |

---

## 9. Commit & push

Both repos committed and pushed (see git log for `audit4-fix-*`):

- `data.huiying` — data/scripts/spec/docs three-state + matrix redesign
- `Huiying` — SKU template, productContent inference removal, homepage, positioning, OG, report

Sync check: `git status` → 0/0 ahead/behind on both repos after push.
