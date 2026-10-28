# Content Polish Report — carfilterspro guides + news

Date: 2026-10-28
Scope: `/guides/` (14 articles) + `/news/` (9 articles) — de-mechanisation, format check, AIO.
Discipline applied: all technical facts and compliance qualifiers preserved; expression changed, semantics unchanged.

## 1. Mechanical-pattern scan (before → after)

Counts across the 14 guides (`src/data/guidesPosts.ts`). News posts had effectively zero mechanical hits both before and after (already remediated in the earlier P1-2 pass).

| Pattern | Before | After |
|---|---|---|
| "For importers / wholesalers / distributors" audience openers | 26 | 14 |
| "However, " | 12 | 0 |
| "not automatically" | 22 | 0 |
| "This guide explains / provides" | 10 | 0 |
| "The problem / challenge is that" | 2 | 0 |
| "The key difference is straightforward" | 1 | 0 |
| "should not be assumed" | 8 | 0 |
| "should not be treated / interpreted as" (compliance cluster) | 14 | 7 |
| "not necessarily" | 12 | 14 |

**Top eliminated patterns:** "not automatically" (22→0), "However," (12→0), "This guide explains" (10→0), "should not be assumed" (8→0). Compliance qualifiers were varied, not removed — the conditional "does not by itself / does not necessarily / should not be read as" meaning is retained throughout ("reference", "under defined conditions", "not automatically"-equivalent conditions all keep their semantic weight).

## 2. Rewrite summary

- **Guides rewritten:** 14 (66 edit points — opener diversification, transition deletion, synonym-parallel merge, compliance-qualifier wording variation).
- **News paragraph splits:** 3 over-long prose paragraphs split at natural sentence boundaries (140→82, 121→90, 127→77 words).
- Waste-language deletion: formulaic intros ("This guide explains…"), redundant "For importers and wholesalers…" conclusion tags, and empty "However," transitions removed.

## 3. Format check — PASS

- **Single H1:** PASS — every guide and news page renders exactly one `<h1>` (the title).
- **H2/H3 hierarchy:** PASS — guides: h1 → h2 (sections) → h3 (subsections); news: h1 → h2 (analysis). No skipped levels.
- **Table rendering:** PASS — 20 tables checked, 0 header/row cell mismatches.
- **List/formula rendering:** PASS — `<ul>`/`<ol>`/`<table>`/`.frac` formula blocks render correctly via the data-driven templates.
- **Paragraph length:** PASS after 3 splits (no remaining guide paragraph > 90 words; news max is now 113 words in a numbered FAQ item, within normal range).

## 4. AIO settings

- **llms.txt:** 14 guides added under three pillar groups (Selection, Quality & Testing, OEM Sourcing) + 9 news posts listed under News.
- **Article schema:** verified present — `Article` (guides) and `BlogPosting` (news) JSON-LD with headline/date/author/publisher/mainEntityOfPage.
- **FAQ schema:** `FAQPage` JSON-LD added to the guide template (Question + acceptedAnswer per FAQ entry).
- **Breadcrumb:** `BreadcrumbList` JSON-LD + visible breadcrumb nav present on guide pages.
- **Data-site llms.txt:** no sync required — guides are main-site content; the data-site `llms.txt` lists only SKU/reference records and already exposes the data URLs the OE-number guide links to.

## 5. Verification

- `npm run build`: PASS — 107 pages built, 0 errors.
- Broken links: 0 (38 guide internal links, 3 external data links, 6 related-category links, 30 in-prose markdown links all resolve).
- Mechanical-pattern rescan: before→after table above.

## 6. Git

- Commit marker: `content-polish`
- Push: origin/main, ahead/behind 0/0 after push.
