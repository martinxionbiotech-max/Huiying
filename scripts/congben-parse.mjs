#!/usr/bin/env node
/**
 * congben-parse.mjs — final parser for congbenfilter.com WP REST corpus.
 * All products use an `mqh_params_table` with INCONSISTENT field labels, so we
 * match keys by regex. Produces deduplicated canonical records mapped to Huiying
 * categories, with structured OE / material / fitment / cross-reference fields.
 *
 * Input:  /tmp/products_full_p{1..5}.json
 * Output: crawls/congben/products-raw.json
 *         crawls/congben/products-dedup.json  { canonical, noOe }
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'crawls/congben');
mkdirSync(OUT, { recursive: true });

const all = [];
for (let p = 1; p <= 5; p++) all.push(...JSON.parse(readFileSync(`/tmp/products_full_p${p}.json`, 'utf8')));

const unescape = (s) => (s || '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#0?39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/&#8217;|&rsquo;/g, "'").replace(/&#8216;|&lsquo;/g, "'")
  .replace(/&#8220;|&ldquo;/g, '"').replace(/&#8221;|&rdquo;/g, '"')
  .replace(/&#8211;|&ndash;/g, '-').replace(/&#8212;|&mdash;/g, '-')
  .replace(/&times;/g, 'x').replace(/&deg;/g, '°').replace(/&hellip;/g, '…')
  .replace(/&#0?38;/g, '&').replace(/&eacute;/g, 'é').replace(/&reg;/g, '®').replace(/&trade;/g, '™').replace(/&amp;/g, '&');
const stripTags = (s) => unescape(s).replace(/<[^>]+>/g, ' ');
const norm = (s) => stripTags(s).replace(/\s+/g, ' ').trim();
const decode = (s) => unescape(s);

// ---------------------------------------------------------------- params table
function parseParamsTable(html) {
  const m = html.match(/<table[^>]*mqh_params_table[\s\S]*?<\/table>/i);
  if (!m) return {};
  const cells = [...m[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((x) => norm(x[1]));
  const out = {};
  for (let i = 0; i + 1 < cells.length; i += 2) {
    const k = cells[i].replace(/:$/, '').trim();
    if (k && !(k in out)) out[k] = cells[i + 1];
  }
  return out;
}

// magic-12 spec table (used by a couple of products)
function parseMagic12(html) {
  const m = html.match(/<table[^>]*magic-12[^>]*>[\s\S]*?<\/table>/i);
  if (!m) return {};
  const out = {};
  for (const r of [...m[0].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]) {
    const cells = [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((x) => norm(x[1]));
    if (cells.length >= 2) { const k = cells[0].replace(/:$/, '').trim(); if (k) out[k] = cells[1]; }
  }
  return out;
}

// Make/Model/Year/Engine fitment table (present on a few products)
function parseFitmentTable(html) {
  for (const m of [...html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)]) {
    const t = m[1];
    const hdr = [...t.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((x) => norm(x[1]).toLowerCase()).slice(0, 6);
    if (!(hdr.includes('make') && hdr.includes('model'))) continue;
    const fitment = [];
    for (const r of [...t.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]) {
      const cells = [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((x) => norm(x[1]));
      if (cells.length === 0 || cells[0].toLowerCase() === 'make') continue;
      for (let i = 0; i + 3 < cells.length; i += 4) fitment.push({ make: cells[i], model: cells[i + 1], year: cells[i + 2], engine: cells[i + 3] });
    }
    return fitment;
  }
  return [];
}

function parseIntro(html) {
  const before = html.split(/<h2[^>]*>/i)[0];
  return [...before.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((x) => norm(x[1])).filter(Boolean);
}

function collectImages(acf, html) {
  const out = new Set();
  const push = (a) => { if (Array.isArray(a)) for (const u of a) if (typeof u === 'string' && /^https?:\/\//.test(u)) out.add(u); };
  push(acf?.images); push(acf?.gallery);
  if (typeof acf?.image === 'string' && /^https?:\/\//.test(acf.image)) out.add(acf.image);
  for (const u of [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)].map((x) => x[1])) if (/images\.cnmqh\.com|\.webp|\.jpe?g|\.png/i.test(u)) out.add(u);
  return [...out];
}

// ---------------------------------------------------------------- field extraction
// find the value for any key matching a regex
function findKey(params, ...regexes) {
  for (const [k, v] of Object.entries(params)) {
    for (const re of regexes) if (re.test(k)) return v;
  }
  return null;
}

const OE_KEYS = [
  /^oe\s*(no\.?|number|numbers|part\s*number|part\s*numbers|reference|ref|n°)?$/i,
  /^oem\s*(no\.?|number|numbers|part\s*number|part\s*numbers)?$/i,
  /^replaceable\s*oem$/i, /^alternative\s*oe$/i, /^additional\s*ref$/i,
  /^part\s*no\.?$/i, /^part\s*number$/i, /^model\s*number$/i,
  /^cross\s*reference$/i, /^cross\s*references$/i, /^interchange\s*(part|no\.?|number)?$/i,
];
const MATERIAL_KEYS = [/^material$/i, /^filter\s*media$/i, /^tube\s*material$/i, /^housing\s*material$/i];
const FITMENT_KEYS = [
  /^car\s*model(s)?$/i, /^car\s*model\s*(application|fit)$/i, /^fitment$/i, /^compatibility$/i,
  /^compatible\s*model(s)?$/i, /^compatible\s*brand(s)?$/i, /^compatible\s*engine(s)?$/i,
  /^engine\s*fitment$/i, /^engine\s*compatibility$/i,
];
const DIMENSION_KEYS = [/^dimensions?$/i, /^available\s*shapes?$/i, /^common\s*shapes?$/i, /^size(s)?$/i];
const CROSSREF_KEYS = [/^interchange\s*(part|no\.?|number)?$/i, /^cross\s*reference(s)?$/i, /^interchange$/i];

const splitOe = (v) => (v ? v.split(/[\/,;、|+]+/).map((s) => s.replace(/\s+/g, ' ').trim()).filter((x) => x && x !== '-' && !/^n\/a$/i.test(x)) : []);

// slug -> OE fallback. OE part numbers are alphanumeric tokens (optionally hyphen
// groups) that contain a digit. Exclude descriptive English words.
const STOP_WORDS = new Set(['china', 'factory', 'suppliers', 'supplier', 'filter', 'filters', 'premium', 'high', 'performance',
  'car', 'auto', 'engine', 'diesel', 'oil', 'air', 'fuel', 'cabin', 'truck', 'trucks', 'custom', 'motorcycle', 'spark', 'plug',
  'brake', 'pads', 'pad', 'hose', 'hoses', 'rubber', 'epdm', 'nbr', 'silicone', 'radiator', 'heater', 'vacuum', 'turbo',
  'elbow', 'pipe', 'coolant', 'standard', 'universal', 'coupler', 'extruder', 'water', 'separator', 'heavy', 'duty', 'tractor',
  'tractors', 'john', 'deere', 'replacement', 'parts', 'original', 'genuine', 'suitable', 'for', 'fits', 'fit', 'wholesale',
  'manufacturer', 'automotive', 'intake', 'high', 'a', 't', 'oe', 'oem', 'genuine']);

function oeFromSlug(slug) {
  const oes = [];
  const mLead = slug.match(/^(\d{5,})/);
  if (mLead) oes.push(mLead[1]);
  const mGroup = slug.match(/\b(\d{4,5}(?:-[a-z0-9]{2,6}){1,3})\b/i);
  if (mGroup) oes.push(mGroup[1].toUpperCase());
  // C) alphanumeric part-number tokens (letters+digits, length 4-20)
  for (const t of slug.split('-').filter(Boolean)) {
    const tl = t.toLowerCase();
    if (STOP_WORDS.has(tl)) continue;
    if (/\d/.test(t) && /[a-z]/i.test(t) && t.length >= 4 && t.length <= 22) oes.push(t.toUpperCase());
    // D) pure-digit part numbers 5-12 digits (e.g. 13717811026, 17127525023)
    else if (/^\d{5,12}$/.test(t)) oes.push(t);
  }
  return [...new Set(oes)];
}

// title-based OE extraction (preserves hyphens within an OE number).
function oeFromTitle(title) {
  const re = /\b(?:[A-Z]{1,3}\d{5,9}[A-Z0-9]{0,4}|\d{11,13}|\d{4,5}-\d{4,5}|\d{4,5}-[A-Z][A-Z0-9]{2,6}|\d{4,5}-\d{1,2}[A-Z]\d{1,3}(?:-\d{3})?|[A-Z]{2}\d{4,8}[A-Z]{0,3}|\d{2}[A-Z]\d{5,8}[A-Z]?|\d{4}[A-Z]\d{3}|\d{3,4}[A-Z]{2})\b/gi;
  const oes = [];
  for (const m of title.match(re) || []) {
    const u = m.toUpperCase();
    if (!oes.includes(u)) oes.push(u);
    if (oes.length >= 6) break;
  }
  return oes;
}

// ---------------------------------------------------------------- category
const SRC_SLUG = {
  1423: 'car-air-filter', 1427: 'truck-air-filter', 1432: 'construction-machinery-filter',
  1424: 'car-cabin-filter', 1425: 'car-oil-filter', 1428: 'truck-oil-filter', 1435: 'transmission-filter', 1416: 'motorcycle-filter',
  1426: 'car-fuel-filter', 1429: 'truck-fuel-filter', 1414: 'fuel-water-seperator-filter',
  1415: 'spark-plug', 1431: 'brake-pads',
  1418: 'silicone-hose', 1419: 'epdm-hose', 1420: 'nbr-hose', 1421: 'universal-silicone-coupler', 1422: 'silicone-extruder-hose', 1430: 'standard-auto-hose',
};
const ENGLISH_REAL_CATS = new Set(Object.keys(SRC_SLUG).map(Number));
const HOT_CAT = 1710;

function mapFinalCategory(productType, title, srcIds) {
  const t = `${productType || ''} ${title || ''}`.toLowerCase();
  const has = (src) => (srcIds || []).some((id) => SRC_SLUG[id] === src);
  if (has('brake-pads') || /\bbrake\s*pads?\b/.test(t)) return 'brake-pads';
  if (has('spark-plug') || /\bspark\s*plugs?\b/.test(t)) return 'spark-plugs';
  if (['epdm-hose', 'nbr-hose', 'silicone-hose', 'standard-auto-hose', 'universal-silicone-coupler', 'silicone-extruder-hose'].some((s) => has(s)) || /\bhose\b/.test(t)) return 'rubber-hoses';
  if (/\bcabin\b/.test(t) || has('car-cabin-filter')) return 'cabin-filter';
  if (/\bfuel\s*(water\s*)?separator\b/.test(t) || /\bfuel\s*filter\b/.test(t) || has('car-fuel-filter') || has('truck-fuel-filter') || has('fuel-water-seperator-filter')) return 'fuel-filter';
  if (/\boil\s*filter\b/.test(t) || has('car-oil-filter') || has('truck-oil-filter') || has('transmission-filter') || has('motorcycle-filter')) return 'oil-filter';
  if (/\bair\s*filter\b/.test(t) || has('car-air-filter') || has('truck-air-filter') || has('construction-machinery-filter')) return 'air-filter';
  return null;
}

// ---------------------------------------------------------------- run
const isAsciiSlug = (s) => /^[a-z0-9][a-z0-9-]*$/.test(s || '');
const rows = [];
for (const p of all) {
  if (!isAsciiSlug(p.slug)) continue;
  const ids = p.product_category || [];
  const inReal = ids.some((id) => ENGLISH_REAL_CATS.has(id));
  const isHot = ids.includes(HOT_CAT) && ids.length === 1;
  if (!inReal && !isHot) continue;

  const html = decode(p.content?.rendered || '');
  const params = parseParamsTable(html);
  const magic = parseMagic12(html);
  const title = norm(p.title?.rendered);
  const productType = params['Product Type'] || params['Filter Type'] || null;

  let oeRaw = findKey(params, ...OE_KEYS) || magic['OEM NO.'] || magic['OEM No.'] || magic['OEM'] || null;
  // material
  const material = findKey(params, ...MATERIAL_KEYS) || magic['Material'] || null;
  // fitment
  const fitmentText = findKey(params, ...FITMENT_KEYS) || null;
  const fitmentTable = parseFitmentTable(html);
  const carModel = findKey(params, /^car\s*model$/i) || null;
  const dimensions = findKey(params, ...DIMENSION_KEYS) || null;
  const crossRef = findKey(params, ...CROSSREF_KEYS) || null;

  // slug OE fallback ONLY when no params-table OE (generic/custom products)
  const oeTokens = splitOe(oeRaw);
  if (oeTokens.length === 0) {
    for (const so of oeFromTitle(title)) { if (oeTokens.length < 6) oeTokens.push(so); }
  }

  rows.push({
    id: p.id, slug: p.slug, link: p.link, title,
    excerpt: norm(p.excerpt?.rendered),
    productType,
    itemName: magic['Item Name'] || null,
    oe: oeTokens.length ? oeTokens.join(' / ') : null,
    material,
    carModel,
    fitmentText,
    engineFitment: params['Engine Fitment'] || null,
    dimensions,
    crossRef,
    interchange: params['Interchange'] || params['Interchange Part'] || null,
    origin: params['Origin'] || params['Place of Origin'] || null,
    certification: params['Certification'] || params['Certifications'] || null,
    color: params['Color'] || null,
    application: params['Application'] || null,
    moq: params['MOQ'] || null,
    leadTime: params['Lead Time'] || null,
    packing: magic['Packing'] || params['Packaging'] || null,
    weight: p.acf?.weight || null,
    images: collectImages(p.acf || {}, html),
    intro: parseIntro(html),
    fitment: fitmentTable,
    params,
    sourceCategorySlugs: ids.filter((id) => SRC_SLUG[id]).map((id) => SRC_SLUG[id]),
    isHot,
    category: mapFinalCategory(productType, title, ids),
  });
}
console.log(`Canonical English/hot products: ${rows.length}`);

// dedupe by primary OE
const byOe = new Map();
const noOe = [];
for (const r of rows) {
  const oes = splitOe(r.oe);
  if (oes.length === 0) { noOe.push(r); continue; }
  const key = oes[0].toUpperCase().replace(/[^a-z0-9]/g, '');
  if (!byOe.has(key)) { byOe.set(key, r); continue; }
  const prev = byOe.get(key);
  const better = (!prev.category && r.category) ? r : prev;
  better.images = [...new Set([...(prev.images || []), ...(r.images || [])])];
  if ((r.intro || []).length > (prev.intro || []).length) better.intro = r.intro;
  if (!better.fitment.length) better.fitment = r.fitment;
  // merge sparse per-SKU fields from the richer duplicate
  for (const f of ['material', 'carModel', 'fitmentText', 'engineFitment', 'crossRef', 'interchange', 'dimensions', 'productType']) {
    if (!better[f] && r[f]) better[f] = r[f];
  }
  better.titles = [...new Set([prev.title, r.title, ...(prev.titles || []), ...(r.titles || [])])];
  better.sourceCategorySlugs = [...new Set([...(prev.sourceCategorySlugs || []), ...(r.sourceCategorySlugs || [])])];
  if (!better.category) better.category = r.category || prev.category;
  byOe.set(key, better);
}

const canonical = [...byOe.values()];
writeFileSync(resolve(OUT, 'products-raw.json'), JSON.stringify(rows, null, 2));
writeFileSync(resolve(OUT, 'products-dedup.json'), JSON.stringify({ canonical, noOe }, null, 2));

const catCount = {};
for (const r of canonical) catCount[r.category || 'unmapped'] = (catCount[r.category || 'unmapped'] || 0) + 1;
console.log(`\nDistinct products (by primary OE): ${canonical.length}`);
console.log(`No-OE products: ${noOe.length}`);
console.log('\nCategory distribution:');
for (const [c, n] of Object.entries(catCount).sort((a, b) => b[1] - a[1])) console.log(`  ${c}: ${n}`);
console.log('\nNo-OE products:');
for (const r of noOe) console.log(`  [${r.slug}] type=${r.productType || r.itemName} cat=${r.category}`);
