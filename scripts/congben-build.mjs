#!/usr/bin/env node
/**
 * congben-build.mjs — assemble the enriched huiying catalog from the congben
 * parse output + downloaded images.
 *
 * Produces:
 *   crawls/congben/new-products.json   (60 normalized product records, ready to merge)
 *   crawls/congben/new-categories.json (3 new categories)
 *
 * The final merge into src/data/products.json is done by congben-merge.mjs so the
 * existing 10 SKUs are preserved byte-for-byte.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'crawls/congben');
mkdirSync(OUT, { recursive: true });

const dedup = JSON.parse(readFileSync(resolve(OUT, 'products-dedup.json'), 'utf8'));
const imgMap = JSON.parse(readFileSync(resolve(OUT, 'images-map.json'), 'utf8')).map;
const canonical = dedup.canonical;
const noOe = dedup.noOe;

// ---------------------------------------------------------------- helpers
const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
const slugify = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

const CAT_CODE = { 'air-filter': 'af', 'cabin-filter': 'cf', 'oil-filter': 'of', 'fuel-filter': 'ff', 'wiper': 'wb', 'brake-pads': 'bp', 'spark-plugs': 'sp', 'rubber-hoses': 'rh' };

// stop words that must never appear inside an OE token
const STOP_IN_OE = /CHINA|OIL|FUEL|FILTER|SERIES|HIGH|PRESSURE|AIR|HOSE|BRAKE|SPARK|PLUG|EPDM|NBR|SILICONE|RUBBER|WATER|SEPARATOR|PIPE|COOLANT|ELBOW|HEATER|VACUUM|TURBO|RADIATOR|COUPLER|STANDARD|UNIVERSAL|EXTRUDER/i;

// split a raw OE string into clean, deduped part-number tokens
function cleanOeTokens(raw) {
  const tokens = (raw || '').split(/[\/,;、|+\s]+/).map((s) => s.trim()).filter(Boolean);
  const out = [];
  for (const rawTok of tokens) {
    if (STOP_IN_OE.test(rawTok)) continue;
    // split hyphen-concatenated OE families on a repeated digit-prefix
    // e.g. "90915-YZZD1-90915-YZZD2" -> ["90915-YZZD1", "90915-YZZD2"]
    //      "17220-5R0-008"          -> ["17220-5R0-008"] (single OE, no repeat)
    let parts = [rawTok];
    const segs = rawTok.split('-');
    if (segs.length >= 4) {
      const seen = new Set();
      let splitAt = -1;
      for (let i = 0; i < segs.length; i++) {
        if (/^\d+$/.test(segs[i]) && seen.has(segs[i])) { splitAt = i; break; }
        seen.add(segs[i]);
      }
      if (splitAt > 0) parts = [segs.slice(0, splitAt).join('-'), segs.slice(splitAt).join('-')];
    }
    for (let t of parts) {
      if (STOP_IN_OE.test(t)) continue;
      if (/^[0-9A-Z][0-9A-Z-]{2,24}$/.test(t) && /\d/.test(t)) out.push(t.toUpperCase());
    }
  }
  return [...new Set(out)];
}

// brand detection
const BRANDS = [
  'Mercedes-Benz', 'Mercedes Benz', 'Volkswagen', 'VW', 'Toyota', 'Lexus', 'Honda', 'BMW', 'Mitsubishi',
  'Kia', 'Hyundai', 'Nissan', 'Ford', 'Land Rover', 'John Deere', 'Suzuki', 'Isuzu', 'Foton', 'JAC',
  'Freightliner', 'Detroit Diesel', 'Cummins', 'Fleetguard', 'Audi', 'Volvo', 'Renault', 'Peugeot', 'Mazda', 'Chevrolet',
];
const brandRe = new RegExp(`\\b(${BRANDS.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'i');

// canonical (proper-case) brand name
const CANONICAL_BRAND = {
  'mercedes-benz': 'Mercedes-Benz', 'mercedes benz': 'Mercedes-Benz', 'vw': 'Volkswagen', 'volkswagen': 'Volkswagen',
  'toyota': 'Toyota', 'lexus': 'Lexus', 'honda': 'Honda', 'bmw': 'BMW', 'mitsubishi': 'Mitsubishi',
  'kia': 'Kia', 'hyundai': 'Hyundai', 'nissan': 'Nissan', 'ford': 'Ford', 'land rover': 'Land Rover',
  'john deere': 'John Deere', 'suzuki': 'Suzuki', 'isuzu': 'Isuzu', 'foton': 'Foton', 'jac': 'JAC',
  'freightliner': 'Freightliner', 'detroit diesel': 'Detroit Diesel', 'cummins': 'Cummins', 'fleetguard': 'Fleetguard',
  'audi': 'Audi', 'volvo': 'Volvo', 'renault': 'Renault', 'peugeot': 'Peugeot', 'mazda': 'Mazda', 'chevrolet': 'Chevrolet',
};

function detectBrand(text) {
  const m = (text || '').match(brandRe);
  if (!m) return null;
  return CANONICAL_BRAND[m[1].toLowerCase()] || m[1];
}

// parse "Brand Model1, Model2, Model3" or "Brand X3 X5 X6" into {brand, models}
function parseFitment(text) {
  if (!text) return null;
  const t = norm(text);
  const brand = detectBrand(t);
  if (!brand) return { brand: null, models: [], raw: t };
  // remove the brand token(s) and common fillers, split on separators
  let rest = t;
  // strip known brand + descriptors
  rest = rest.replace(brandRe, ' ');
  rest = rest.replace(/\([^)]*\)/g, ' '); // remove parentheticals e.g. "(OE 04465-0K070)"
  rest = rest.replace(/\b(?:OE|OEM)\s*[0-9A-Za-z\-\.\/]+/gi, ' ');
  rest = rest.replace(/\b(?:for|suitable for|fit for|fits|fitment|application|model|models|compatible|compatibility|car|cars|engine|engines|series|etc\.?|and|&|china|factory|suppliers?|the|with|to)\b/gi, ' ');
  const models = rest.split(/[,/;、|]+/).map((s) => norm(s)).filter((s) => s && s.length > 0 && s.length <= 30 && !/^[\d\s]+$/.test(s));
  return { brand, models: [...new Set(models)].slice(0, 12), raw: t };
}

// extract brand+models from title (e.g. "...for Toyota Corolla...", "...for BMW X3 X5 X6...")
function fitmentFromTitle(title, slug) {
  const t = norm(title || '');
  const s = norm((slug || '').replace(/-/g, ' '));
  const combined = `${t} ${s}`;
  const brand = detectBrand(combined);
  if (!brand) return null;
  // models: tokens after brand that look like model names
  const m = combined.match(new RegExp(`\\b${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b([^.|]*?)(?:china|factory|supplier|filter|for|$)` , 'i'));
  let tail = m ? m[1] : '';
  tail = tail.replace(/\b(?:for|suitable for|fit for|fits|model|models|car|cars|engine|engines|series|high|performance|premium|air|oil|fuel|filter|replacement|parts?)\b/gi, ' ');
  const models = tail.split(/[\s,;\/]+/).map(norm).filter((x) => x && x.length <= 30 && /[a-z0-9]/i.test(x));
  // common model keywords
  const known = ['Corolla', 'Camry', 'RAV4', 'Prius', 'Avensis', 'Auris', 'Yaris', 'Hilux', 'X3', 'X5', 'X6', 'X1', 'Golf', 'Jetta', 'Passat', 'Tiguan', 'Polo', 'Civic', 'Accord', 'CR-V', 'CRV', 'City', 'Tiida', 'NV200', 'March', 'Elantra', 'Tucson', 'Santa Fe', 'Cascadia', 'Range Rover', 'Discovery', 'Defender', 'E-Class', 'C-Class', 'S-Class', 'GLC', 'Sprinter'];
  const filtered = [...new Set(models)].filter((x) => known.some((k) => x.toLowerCase().includes(k.toLowerCase())) || /\d/.test(x)).slice(0, 12);
  return { brand, models: filtered.length ? filtered : [...new Set(models)].slice(0, 6), raw: t };
}

function localImage(url) {
  const m = imgMap[url];
  return m ? `/images/congben/${m.file}` : null;
}

function mapImages(images) {
  const out = [];
  for (const u of images || []) {
    const p = localImage(u);
    if (p && !out.includes(p)) out.push(p);
  }
  return out;
}

// ---------------------------------------------------------------- clean name from title
function cleanName(productType, title, category) {
  const t = norm(title || '');
  let name = t;
  // strip SEO tail phrases (repeat to catch trailing "from China Factory")
  for (let i = 0; i < 4; i++) {
    name = name.replace(/[|·—–-]\s*(?:China|Factory|Suppliers?|Manufacturer|Wholesale|Leading|Reliable|Professional|from).*$/i, '');
    name = name.replace(/\s+(?:China|Factory|Suppliers?|Manufacturer|Wholesale|from|for)\s*$/i, '');
  }
  name = name.replace(/\b(?:China|Factory|Suppliers?|Manufacturer|Wholesale|Premium|High Quality|High Performance|Leading|Reliable|Professional|Custom|Original|Genuine|Suitable for|Fit for|Fits for|For|OE|OEM)\b/gi, ' ');
  name = name.replace(/\s+/g, ' ').trim();
  name = name.replace(/[|·—–-]\s*$/,'').trim();
  const clean = norm(name);
  const byCat = {
    'air-filter': 'Engine Air Filter', 'cabin-filter': 'Cabin Air Filter', 'oil-filter': 'Engine Oil Filter',
    'fuel-filter': 'Fuel Filter', 'brake-pads': 'Ceramic Brake Pads', 'spark-plugs': 'Spark Plug', 'rubber-hoses': 'Rubber Hose',
  };
  if (!clean || clean.length < 6) return byCat[category] || productType || clean;
  return clean.length > 55 ? clean.slice(0, 55) : clean;
}

// ---------------------------------------------------------------- original descriptions
// Original rewrite: category knowledge + product-specific features + procurement note.
function buildDesc(cat, rec) {
  const oe = (rec.oeNumbers && rec.oeNumbers[0]) ? rec.oeNumbers[0] : null;
  const oes = (rec.oeNumbers || []).slice(0, 4).join(', ');
  const material = rec.material;
  const fit = rec.fitment && rec.fitment.brand ? `${rec.fitment.brand}${rec.fitment.models.length ? ' ' + rec.fitment.models.join(', ') : ''}` : null;
  const cr = rec.crossReference;

  const matClause = material ? `, built with ${material.replace(/,\s*/g, ' and ')}${/media/i.test(material) ? '' : ' media'}` : '';
  const fitClause = fit ? `, listed for ${fit}` : '';
  const oeClause = oe ? `, matched to OE ${oes}` : '';
  const crClause = cr ? ` (cross-reference: ${cr})` : '';

  switch (cat) {
    case 'air-filter':
      return `Engine air filter that removes dust, sand and suspended particulate from intake air before it reaches the combustion chamber, protecting cylinders, pistons and piston rings from abrasive wear${matClause}${fitClause}${oeClause}${crClause}. Pleat spacing and media area are matched to the air-cleaner housing for the designed airflow, which is what keeps dust-holding capacity consistent across a batch and the return rate low.`.replace(/\s+/g, ' ').trim();
    case 'cabin-filter':
      return `Cabin air filter that traps dust, pollen and particulate before outside air reaches the passenger cabin, keeping occupants breathing cleaner air and protecting the HVAC blower${matClause}${fitClause}${oeClause}${crClause}. Edge-seal fit is the deciding quality point — a filter that rattles or leaks at the frame lets unfiltered air bypass the media, so frame type is confirmed per application.`.replace(/\s+/g, ' ').trim();
    case 'oil-filter':
      return `Engine oil filter that traps metal wear particles and carbon sludge from circulating oil, protecting the oil pump, bearings and bearing surfaces${matClause}${fitClause}${oeClause}${crClause}. Thread, seal diameter and bypass-valve setting are what separate a service-grade filter from a look-alike, and they are confirmed against the OE application before quoting.`.replace(/\s+/g, ' ').trim();
    case 'fuel-filter':
      return `Fuel filter that removes particulate${/\bwater\b/i.test(rec.name + ' ' + (rec.productType || '')) ? ' and free water' : ''} before fuel reaches the injectors and high-pressure pump${matClause}${fitClause}${oeClause}${crClause}. On common-rail diesel the filtration rating and any water-separation capability are the procurement checks that protect injectors from premature wear.`.replace(/\s+/g, ' ').trim();
    case 'brake-pads':
      return `Ceramic front brake pads${fitClause}${oeClause}${crClause}${matClause}. Friction formulation, backing-plate fit and the completeness of the noise/hardware kit determine pedal feel, disc life and return rate, so the full set contents are confirmed per application.`.replace(/\s+/g, ' ').trim();
    case 'spark-plugs':
      return `Spark plug for gasoline ignition${matClause}${fitClause}${oeClause}${crClause}. Heat range, thread reach and electrode gap are the details that must match the engine, so the exact application is confirmed per model before ordering.`.replace(/\s+/g, ' ').trim();
    case 'rubber-hoses':
      return `Rubber hose for cooling, fuel or air-transfer circuits${material ? `, supplied in ${material}` : ''}${fitClause}${oeClause}${crClause}. Compound (EPDM/NBR/silicone), reinforcement and inner diameter are confirmed per application — a hose that hardens, swells or collapses under heat or oil is a premature-failure risk, so the material is the first procurement check.`.replace(/\s+/g, ' ').trim();
    default:
      return `Aftermarket ${cat} part${matClause}${fitClause}${oeClause}${crClause}.`.replace(/\s+/g, ' ').trim();
  }
}

// ---------------------------------------------------------------- build records
const newProducts = [];
let seq = 0;
function add(rec, category, isGeneric) {
  seq++;
  const oeTokens = cleanOeTokens(rec.oe);
  const primaryOe = oeTokens[0] || null;
  // fitment: prefer structured carModel/fitmentText, fall back to all titles when sparse
  let fitment = parseFitment(rec.carModel || rec.fitmentText || rec.engineFitment || null);
  if (!fitment || !fitment.brand || !fitment.models.length) {
    const allTitles = [...(rec.titles || []), rec.title];
    for (const t of allTitles) {
      const cand = fitmentFromTitle(t, rec.slug);
      if (cand && cand.brand && cand.models.length) { fitment = cand; break; }
      if (cand && cand.brand && !fitment) fitment = cand;
    }
  }
  const engineFitment = rec.engineFitment || (rec.fitmentText && /engine/i.test(rec.fitmentText) ? rec.fitmentText : null);

  const name = cleanName(rec.productType, rec.title, category);
  const model = primaryOe ? primaryOe.toUpperCase() : `HY-${CAT_CODE[category].toUpperCase()}-${String(600 + seq).padStart(3, '0')}`;
  const slugBase = primaryOe ? primaryOe : slugify(rec.title).slice(0, 50);
  const slug = `${category}-${slugBase.toLowerCase()}`.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

  const images = mapImages(rec.images);
  const record = {
    slug,
    name,
    category,
    model,
    sourceId: rec.id,
    desc: '', // filled after fitment/oe known
    image: images[0] || '',
    gallery: images,
    oeNumbers: oeTokens.length ? oeTokens : null,
    crossReference: rec.crossRef || rec.interchange || null,
    material: rec.material || null,
    dimensions: rec.dimensions || null,
    fitment: fitment && fitment.brand ? { brand: fitment.brand, models: fitment.models, engine: engineFitment || null } : null,
    source: {
      name: 'congbenfilter.com',
      url: rec.link,
      status: primaryOe ? 'verified-by-source' : 'reference',
      retrieved: '2026-10-27',
    },
  };
  record.desc = buildDesc(category, { ...record, oeNumbers: record.oeNumbers || [], name, productType: rec.productType, material: rec.material, fitment: record.fitment, crossReference: record.crossReference });
  newProducts.push(record);
}

for (const r of canonical) {
  const cat = r.category || 'oil-filter'; // fallback for the motorcycle fuel/oil product
  add(r, cat, false);
}
for (const r of noOe) {
  // generic/custom products — category already set (or default)
  const cat = r.category || 'oil-filter';
  add(r, cat, true);
}

// dedupe by slug (safety)
const seen = new Set();
const final = [];
for (const p of newProducts) {
  if (seen.has(p.slug)) continue;
  seen.add(p.slug);
  final.push(p);
}

writeFileSync(resolve(OUT, 'new-products.json'), JSON.stringify(final, null, 2));

// new categories
const newCategories = [
  { slug: 'brake-pads', name: 'Brake Pads', code: 'bp', desc: 'Ceramic and semi-metallic brake pads for passenger cars, matched by OE number.' },
  { slug: 'spark-plugs', name: 'Spark Plugs', code: 'sp', desc: 'Ignition spark plugs for gasoline engines, matched by OE and engine application.' },
  { slug: 'rubber-hoses', name: 'Rubber Hoses', code: 'rh', desc: 'EPDM, NBR and silicone hoses for cooling, fuel and air-transfer circuits, custom and OE-matched.' },
];
writeFileSync(resolve(OUT, 'new-categories.json'), JSON.stringify(newCategories, null, 2));

// summary
const catCount = {};
for (const p of final) catCount[p.category] = (catCount[p.category] || 0) + 1;
console.log(`New products: ${final.length}`);
console.log('By category:');
for (const [c, n] of Object.entries(catCount).sort((a, b) => b[1] - a[1])) console.log(`  ${c}: ${n}`);
console.log('OE-covered products:', final.filter((p) => p.oeNumbers).length);
console.log('Fitment-structured products:', final.filter((p) => p.fitment).length);
console.log('Products with images:', final.filter((p) => p.image).length);
console.log('Products missing images:', final.filter((p) => !p.image).map((p) => p.slug));
