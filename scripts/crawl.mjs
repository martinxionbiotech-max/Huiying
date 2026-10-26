#!/usr/bin/env node
/**
 * crawl.mjs — full-site crawl of tianruifilters.cn.
 *
 * Enumerates every content page, renders it with Playwright Chromium, scrolls to
 * trigger lazy-load, intercepts every image network response (plus DOM <img> src
 * and CSS background-image), saves rendered HTML + visible text, and records the
 * complete image inventory (source URL -> local uuid filename + which pages use it).
 *
 * Anti-hotlink note (verified on the sibling hongyingfilter build): the primary
 * CDN host omo-oss-image.thefastimg.com answers HTTP 567 to direct requests; the
 * sibling host omo-oss-image2.thefastimg.com serves the same bytes (HTTP 200).
 * Image DOWNLOADING is done by a separate fetch-images.mjs so the crawl stays
 * idempotent; this script only records URLs + page context.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CRAWL_DIR = resolve(ROOT, 'crawls/tianrui');
const RENDER_DIR = resolve(CRAWL_DIR, 'rendered');
const TEXT_DIR = resolve(CRAWL_DIR, 'text');
const MAP_OUT = resolve(CRAWL_DIR, 'images-map.json');

const BASE = 'https://www.tianruifilters.cn';
const CHROMIUM_EXE = process.env.CHROMIUM_EXE || '/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome';
const DELAY_MS = Number(process.env.DELAY_MS || 2500);

// --- page inventory (enumerated from nav + product/news listing recon) ------
const pages = [
  // home
  { slug: 'home', url: `${BASE}/` },
  // company (8)
  { slug: 'company-profile', url: `${BASE}/Company_Profile.html` },
  { slug: 'culture', url: `${BASE}/Culture.html` },
  { slug: 'factory', url: `${BASE}/factory.html` },
  { slug: 'marketing', url: `${BASE}/marketing.html` },
  { slug: 'download', url: `${BASE}/Download.html` },
  { slug: 'exhibition', url: `${BASE}/Exhibition_Pictures.html` },
  { slug: 'contact', url: `${BASE}/contact.html` },
  { slug: 'privacy-policy', url: `${BASE}/privacy_policy.html` },
  // news listing (3) + articles (8)
  { slug: 'news-index', url: `${BASE}/news/1/` },
  { slug: 'news-company', url: `${BASE}/news/2/` },
  { slug: 'news-industry', url: `${BASE}/news/3/` },
  { slug: 'news-50', url: `${BASE}/news/50.html` },
  { slug: 'news-51', url: `${BASE}/news/51.html` },
  { slug: 'news-52', url: `${BASE}/news/52.html` },
  { slug: 'news-53', url: `${BASE}/news/53.html` },
  { slug: 'news-54', url: `${BASE}/news/54.html` },
  { slug: 'news-55', url: `${BASE}/news/55.html` },
  { slug: 'news-56', url: `${BASE}/news/56.html` },
  { slug: 'news-57', url: `${BASE}/news/57.html` },
  // product categories (6)
  { slug: 'product-cat-37', url: `${BASE}/product/37/` },
  { slug: 'product-cat-38', url: `${BASE}/product/38/` },
  { slug: 'product-cat-39', url: `${BASE}/product/39/` },
  { slug: 'product-cat-40', url: `${BASE}/product/40/` },
  { slug: 'product-cat-41', url: `${BASE}/product/41/` },
  { slug: 'product-cat-42', url: `${BASE}/product/42/` },
  // product SKU details (14)
  ...Array.from({ length: 14 }, (_, i) => 690 + i).map((n) => ({
    slug: `product-${n}`, url: `${BASE}/product/${n}.html`,
  })),
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function loadChromium() {
  for (const spec of ['playwright', 'playwright-core', '/usr/lib/node_modules/openclaw/node_modules/playwright-core/index.js']) {
    try {
      const m = await import(spec);
      return (m.default || m).chromium;
    } catch { /* keep trying */ }
  }
  throw new Error('no chromium module found');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function slugifyFile(slug) { return slug.replace(/[^a-zA-Z0-9_-]/g, '_'); }

async function main() {
  mkdirSync(RENDER_DIR, { recursive: true });
  mkdirSync(TEXT_DIR, { recursive: true });

  const chromium = await loadChromium();
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, userAgent: UA });
  const page = await ctx.newPage();

  // image inventory: uuid -> { url, ext, pages: Set, alt }
  const imageMap = {};
  const uuidRe = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  const recordImage = (url, slug, alt = '') => {
    if (!url || !/^https?:/.test(url)) return;
    if (url.startsWith('data:')) return;
    const m = url.match(uuidRe);
    if (!m) return;
    const u = m[0];
    const base = url.split('?')[0];
    const ext = (base.split('.').pop() || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!imageMap[u]) imageMap[u] = { url: base, ext: ext || 'img', pages: new Set(), alt: alt || '' };
    imageMap[u].pages.add(slug);
    if (alt && !imageMap[u].alt) imageMap[u].alt = alt;
  };

  // intercept image network responses (catches CSS bg + lazy-load)
  page.on('response', (r) => {
    const ct = r.headers()['content-type'] || '';
    const u = r.url();
    if (/image|octet-stream/.test(ct) || /\.(png|jpe?g|gif|webp|svg|ico)(\?|$)/i.test(u)) {
      recordImage(u, '__response__');
    }
  });

  for (let i = 0; i < pages.length; i++) {
    const { slug, url } = pages[i];
    const ok = await (async () => {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      } catch { /* proceed */ }
      await sleep(1200);
      // scroll for lazy-load
      await page.evaluate(async () => {
        const step = 700;
        const h = document.body.scrollHeight;
        for (let y = 0; y <= h; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
        window.scrollTo(0, 0);
      }).catch(() => {});
      await sleep(500);

      const html = await page.content();
      const text = await page.evaluate(() => document.body.innerText).catch(() => '');

      // DOM images (with alt + current src, may differ from network due to lazy)
      const domImgs = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll('img').forEach((i) => {
          const src = i.currentSrc || i.src || '';
          out.push({ src, alt: i.alt || '' });
        });
        // CSS background images
        const bg = [];
        document.querySelectorAll('*').forEach((el) => {
          const bi = getComputedStyle(el).backgroundImage;
          if (bi && bi !== 'none') {
            const m = bi.match(/url\(["']?([^"')]+)["']?\)/);
            if (m) bg.push({ src: m[1], alt: '' });
          }
        });
        return { imgs: out, bg };
      }).catch(() => ({ imgs: [], bg: [] }));

      writeFileSync(resolve(RENDER_DIR, `${slugifyFile(slug)}.html`), html);
      writeFileSync(resolve(TEXT_DIR, `${slugifyFile(slug)}.txt`), text);

      for (const { src, alt } of domImgs.imgs) recordImage(src, slug, alt);
      for (const { src } of domImgs.bg) recordImage(src, slug);

      return true;
    })();

    process.stdout.write(`${ok ? 'OK ' : 'FAIL'} ${slug}  (${i + 1}/${pages.length})\n`);
    await sleep(DELAY_MS);
  }

  await browser.close();

  // serialize map (Sets -> arrays)
  const out = {};
  for (const [u, v] of Object.entries(imageMap)) {
    out[u] = { url: v.url, ext: v.ext, alt: v.alt, pages: [...v.pages] };
  }
  writeFileSync(MAP_OUT, JSON.stringify(out, null, 2));
  console.log(`\nDone. ${Object.keys(out).length} unique images recorded -> ${MAP_OUT}`);
  console.log(`Rendered HTML -> ${RENDER_DIR}`);
  console.log(`Visible text  -> ${TEXT_DIR}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
