#!/usr/bin/env node
/**
 * congben-crawl.mjs — Playwright crawl of congbenfilter.com product + category
 * pages. Renders each page, scrolls to trigger lazy-load, and archives HTML to
 * crawls/congben/html/. Structured fields come from the WP REST API (congben-parse.mjs);
 * this crawl archives rendered HTML for provenance and captures any images the API
 * missed (added to the image map).
 *
 * Input:  crawls/congben/products-dedup.json
 * Output: crawls/congben/html/{type}_{slug}.html
 *         crawls/congben/crawl-images-map.json (supplemental image capture)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '/usr/lib/node_modules/openclaw/node_modules/playwright-core/index.mjs';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'crawls/congben/html');
mkdirSync(OUT, { recursive: true });

const CHROMIUM = process.env.CHROMIUM_EXE || '/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const data = JSON.parse(readFileSync(resolve(ROOT, 'crawls/congben/products-dedup.json'), 'utf8'));
const records = [...data.canonical, ...data.noOe];
const productLinks = records.map((r) => r.link).filter(Boolean);

// category pages (from nav enumeration)
const BASE = 'https://www.congbenfilter.com';
const categoryLinks = [
  `${BASE}/products/`,
  `${BASE}/products/auto-car-filter/`,
  `${BASE}/products/auto-car-filter/car-air-filter/`,
  `${BASE}/products/auto-car-filter/car-cabin-filter/`,
  `${BASE}/products/auto-car-filter/car-oil-filter/`,
  `${BASE}/products/auto-car-filter/car-fuel-filter/`,
  `${BASE}/products/oil-filter/`,
  `${BASE}/products/brake-pads/`,
  `${BASE}/products/spark-plug/`,
  `${BASE}/products/rubber-hose/`,
  `${BASE}/products/fuel-water-seperator-filter/`,
  `${BASE}/products/truck-filter-element/`,
  `${BASE}/products/motorcycle-filter/`,
  `${BASE}/products/transmission-filter/`,
  `${BASE}/products/construction-machinery-filter/`,
  `${BASE}/hot-products/`,
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const slugify = (s) => (s || 'x').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80);

const capturedImages = new Map(); // url -> true

async function main() {
  const browser = await chromium.launch({ executablePath: CHROMIUM, headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, userAgent: UA });
  const page = await ctx.newPage();

  page.on('response', (r) => {
    const u = r.url();
    if (/images\.cnmqh\.com|\.webp|\.jpe?g|\.png/i.test(u) && /^https?:/.test(u)) capturedImages.set(u, true);
  });

  const jobs = [
    ...categoryLinks.map((u, i) => ({ type: 'category', slug: `cat-${i}`, url: u })),
    ...productLinks.map((u) => ({ type: 'product', slug: slugify(u.split('/product/')[1]?.replace(/\.html$/, '') || u), url: u })),
  ];
  console.log(`Crawl jobs: ${jobs.length} (${categoryLinks.length} categories + ${productLinks.length} products)`);

  let ok = 0, fail = 0;
  for (let i = 0; i < jobs.length; i++) {
    const { type, slug, url } = jobs[i];
    let status = 'OK';
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await sleep(rand(600, 1200));
      await page.evaluate(async () => {
        const step = 700;
        const h = document.body.scrollHeight;
        for (let y = 0; y <= h; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
        window.scrollTo(0, 0);
      }).catch(() => {});
      await sleep(400);
      const html = await page.content();
      writeFileSync(resolve(OUT, `${type}_${slug}.html`), html);
      ok++;
    } catch (e) {
      status = 'FAIL';
      fail++;
    }
    process.stdout.write(`  ${status} ${type} ${slug.slice(0, 50)}  (${i + 1}/${jobs.length})\n`);
    await sleep(rand(1500, 3200)); // anti-block random delay
  }

  await browser.close();
  writeFileSync(resolve(ROOT, 'crawls/congben/crawl-images-map.json'), JSON.stringify({ total: capturedImages.size, urls: [...capturedImages] }, null, 2));
  console.log(`\nDone. ok=${ok} fail=${fail}. HTML -> ${OUT}`);
  console.log(`Supplemental images captured during render: ${capturedImages.size}`);
}

main().catch((e) => { console.error('FATAL:', e); process.exit(1); });
