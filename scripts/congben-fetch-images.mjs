#!/usr/bin/env node
/**
 * congben-fetch-images.mjs — download all congbenfilter.com product images to
 * public/images/congben/ with SHA-256 byte-hash deduplication.
 *
 * Input:  crawls/congben/products-dedup.json  (canonical + noOe records w/ images)
 * Output: public/images/congben/<sha256-16>.<ext>
 *         crawls/congben/images-map.json       { url -> { file, sha256 } }
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IN = resolve(ROOT, 'crawls/congben/products-dedup.json');
const OUT_DIR = resolve(ROOT, 'public/images/congben');
const MAP_OUT = resolve(ROOT, 'crawls/congben/images-map.json');
mkdirSync(OUT_DIR, { recursive: true });

const data = JSON.parse(readFileSync(IN, 'utf8'));
const records = [...data.canonical, ...data.noOe];

const allUrls = new Set();
for (const r of records) for (const u of r.images || []) allUrls.add(u);
const urls = [...allUrls];
console.log(`Unique image URLs to fetch: ${urls.length}`);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

// existing files in OUT_DIR by sha prefix (first 16) — dedupe against prior runs
const byHash = new Map(); // sha256 -> file
const seen = new Map(); // url -> file

async function download(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36', Referer: 'https://www.congbenfilter.com/' } });
    if (!r.ok) return { ok: false, status: r.status };
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 100) return { ok: false, status: r.status, reason: 'too small' };
    return { ok: true, buf };
  } catch (e) {
    return { ok: false, status: 0, reason: e.message };
  } finally { clearTimeout(t); }
}

let ok = 0, dedup = 0, dead = 0;
const deadList = [];
const map = {};

for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  const r = await download(url);
  if (!r.ok) { dead++; deadList.push({ url, status: r.status }); }
  else {
    const h = sha256(r.buf);
    if (byHash.has(h)) { dedup++; map[url] = { file: byHash.get(h), sha256: h }; }
    else {
      const ext = /\.png/i.test(url) ? 'png' : /\.jpe?g/i.test(url) ? 'jpg' : 'webp';
      const fn = `${h.slice(0, 16)}.${ext}`;
      const outPath = resolve(OUT_DIR, fn);
      if (!existsSync(outPath)) writeFileSync(outPath, r.buf);
      byHash.set(h, fn);
      map[url] = { file: fn, sha256: h };
      ok++;
    }
  }
  if ((i + 1) % 50 === 0 || i === urls.length - 1) {
    process.stdout.write(`  ${i + 1}/${urls.length} (unique=${ok} dedup=${dedup} dead=${dead})\n`);
  }
  await sleep(80); // gentle pacing
}

writeFileSync(MAP_OUT, JSON.stringify({ unique: ok, dedup, dead, total: urls.length, deadList, map }, null, 2));
console.log(`\nDone. unique=${ok} dedup=${dedup} dead=${dead} total=${urls.length}`);
console.log(`Images -> ${OUT_DIR}`);
console.log(`Map    -> ${MAP_OUT}`);
