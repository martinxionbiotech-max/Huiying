#!/usr/bin/env node
/**
 * congben-merge.mjs — merge the 60 new congben products + 3 new categories into
 * src/data/products.json, preserving the existing 10 SKUs.
 *
 * Output: src/data/products.json (existing + new)
 *         crawls/congben/merge-summary.json
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PRODUCTS_PATH = resolve(ROOT, 'src/data/products.json');

const existing = JSON.parse(readFileSync(PRODUCTS_PATH, 'utf8'));
const newProducts = JSON.parse(readFileSync(resolve(ROOT, 'crawls/congben/new-products.json'), 'utf8'));
const newCategories = JSON.parse(readFileSync(resolve(ROOT, 'crawls/congben/new-categories.json'), 'utf8'));

// category icons: use a representative product image per new category
const iconFor = {};
for (const c of newCategories) {
  const first = newProducts.find((p) => p.category === c.slug && p.image);
  iconFor[c.slug] = first ? first.image : '';
}

const categoriesWithIcon = newCategories.map((c) => ({ ...c, icon: iconFor[c.slug] || `/images/${c.slug}.png` }));

// existing category slugs
const existingCatSlugs = new Set(existing.categories.map((c) => c.slug));
const existingProductSlugs = new Set(existing.products.map((p) => p.slug));

// add new categories (skip any that already exist)
for (const c of categoriesWithIcon) {
  if (!existingCatSlugs.has(c.slug)) existing.categories.push(c);
}

// add new products (skip slug collisions)
let added = 0;
const skipped = [];
for (const p of newProducts) {
  if (existingProductSlugs.has(p.slug)) { skipped.push(p.slug); continue; }
  existing.products.push(p);
  existingProductSlugs.add(p.slug);
  added++;
}

// bump meta
existing._meta.version = '0.2.0';
existing._meta.generated = '2026-10-27';
existing._meta.source = 'huiying + congbenfilter.com (merged)';
existing._meta.purpose = 'Single source of truth for the huiying main site product pages (huiying brand + congben catalog).';

writeFileSync(PRODUCTS_PATH, JSON.stringify(existing, null, 2));

// summary
const catCount = {};
for (const p of existing.products) catCount[p.category] = (catCount[p.category] || 0) + 1;
const summary = {
  before: { products: 10, categories: existing.categories.length - 3 },
  after: { products: existing.products.length, categories: existing.categories.length },
  addedProducts: added,
  addedCategories: categoriesWithIcon.map((c) => c.slug),
  skipped,
  categoryCounts: catCount,
};
writeFileSync(resolve(ROOT, 'crawls/congben/merge-summary.json'), JSON.stringify(summary, null, 2));

console.log(`Existing products before: 10`);
console.log(`Products after: ${existing.products.length} (added ${added}, skipped ${skipped.length})`);
console.log(`Categories after: ${existing.categories.length}`);
console.log('Category counts:');
for (const [c, n] of Object.entries(catCount).sort((a, b) => b[1] - a[1])) console.log(`  ${c}: ${n}`);
