#!/usr/bin/env node
/**
 * fetch-images.mjs — download the full site image inventory.
 *
 * Source site serves images from omo-oss-image.thefastimg.com (primary), which
 * answers HTTP 567 (anti-hotlink) to direct requests. The sibling CDN host
 * omo-oss-image2.thefastimg.com serves the SAME bytes (HTTP 200). We rewrite the
 * host to the image2 sibling and download, preserving the original uuid filename.
 *
 * Input:
 *   crawls/tianrui/images-map.json   (crawl.mjs output: uuid -> url/ext/pages)
 *   + a rescan of every static HTML file (belt-and-suspenders for anything the
 *     renderer did not surface, e.g. JS-lazy img srcs already present in HTML).
 * Output:
 *   public/images/<uuid>.<ext>
 *   docs/collection-report.json fragment: { ok, dead }
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CRAWL_DIR = resolve(ROOT, 'crawls/tianrui');
const MAP_IN = resolve(CRAWL_DIR, 'images-map.json');
const OUT_DIR = resolve(ROOT, 'public/images');
const REPORT_OUT = resolve(ROOT, 'docs/collection-report.json');

const PRIMARY_HOST = 'omo-oss-image.thefastimg.com';
const FALLBACK_HOST = 'omo-oss-image2.thefastimg.com';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function collectUrls() {
  const set = new Map(); // uuid -> { url, ext, pages }
  // 1) crawl map
  if (existsSync(MAP_IN)) {
    const map = JSON.parse(readFileSync(MAP_IN, 'utf8'));
    for (const [u, v] of Object.entries(map)) {
      set.set(u, { url: v.url, ext: v.ext, pages: v.pages });
    }
  }
  // 2) rescan static HTML (also crawls/tianrui/rendered)
  const dirs = [CRAWL_DIR, resolve(CRAWL_DIR, 'rendered')];
  for (const d of dirs) {
    if (!existsSync(d)) continue;
    for (const f of readdirSync(d)) {
      if (!/\.html?$/.test(f)) continue;
      const html = readFileSync(join(d, f), 'utf8');
      const re = /https?:\/\/[a-z0-9.-]*thefastimg[^"'\s)>\\]*/gi;
      for (const m of html.match(re) || []) {
        const clean = m.replace(/\\u002F/g, '/').replace(/&amp;/g, '&');
        const uu = clean.match(UUID_RE);
        if (!uu) continue;
        const u = uu[0];
        const base = clean.split('?')[0];
        const ext = (base.split('.').pop() || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!set.has(u)) set.set(u, { url: base, ext: ext || 'img', pages: ['static-html'] });
      }
    }
  }
  return set;
}

async function downloadOnce(url, timeoutMs = 30000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const resp = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': UA, Referer: 'https://www.tianruifilters.cn/' } });
    if (!resp.ok) return { ok: false, status: resp.status, size: 0 };
    const buf = Buffer.from(await resp.arrayBuffer());
    return { ok: true, status: resp.status, size: buf.length, buf };
  } catch (e) {
    return { ok: false, status: 0, size: 0, error: e.message };
  } finally {
    clearTimeout(t);
  }
}

function rewrite(url) {
  return url.replace(PRIMARY_HOST, FALLBACK_HOST);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(resolve(ROOT, 'docs'), { recursive: true });

  const items = collectUrls();
  const entries = [...items.entries()];
  console.log(`Inventory: ${entries.length} unique images`);

  let ok = 0;
  let dead = 0;
  const deadList = [];
  const results = [];

  for (let i = 0; i < entries.length; i++) {
    const [uuid, v] = entries[i];
    const outPath = join(OUT_DIR, `${uuid}.${v.ext}`);
    // skip if already downloaded with non-zero bytes
    if (existsSync(outPath) && statSync(outPath).size > 0) {
      ok++;
      results.push({ uuid, file: `${uuid}.${v.ext}`, status: 'cached', size: statSync(outPath).size, pages: v.pages });
      continue;
    }
    const url = rewrite(v.url);
    const r = await downloadOnce(url);
    if (r.ok && r.size > 0) {
      writeFileSync(outPath, r.buf);
      ok++;
      results.push({ uuid, file: `${uuid}.${v.ext}`, status: 'ok', size: r.size, pages: v.pages });
    } else {
      // final fallback: original host
      const r2 = await downloadOnce(v.url);
      if (r2.ok && r2.size > 0) {
        writeFileSync(outPath, r2.buf);
        ok++;
        results.push({ uuid, file: `${uuid}.${v.ext}`, status: 'ok-original', size: r2.size, pages: v.pages });
      } else {
        dead++;
        deadList.push({ url: v.url, status: r.status || r2.status });
        results.push({ uuid, file: `${uuid}.${v.ext}`, status: 'dead', size: 0, pages: v.pages });
      }
    }
    if ((i + 1) % 10 === 0 || i === entries.length - 1) {
      process.stdout.write(`  ${i + 1}/${entries.length} (ok=${ok} dead=${dead})\n`);
    }
    await sleep(120);
  }

  writeFileSync(REPORT_OUT, JSON.stringify({ ok, dead, total: entries.length, deadList, results }, null, 2));
  console.log(`\nDone. ok=${ok} dead=${dead} total=${entries.length}`);
  console.log(`Images -> ${OUT_DIR}`);
  console.log(`Report -> ${REPORT_OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
