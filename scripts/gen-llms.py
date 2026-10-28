#!/usr/bin/env python3
"""Regenerate llms.txt for main site + data site from canonical products.json."""
import json

MAIN_PRODUCTS = '/root/.openclaw/workspace/repos/Huiying/src/data/products.json'
DATA_PRODUCTS = '/root/.openclaw/workspace/repos/data.huiying/data/products.json'

MAIN_URL = 'https://carfilterspro.com'
DATA_URL = 'https://data.carfilterspro.com'

CAT_DESC = {
    'air-filter': 'Engine air filters for cars, trucks and off-highway equipment.',
    'cabin-filter': 'Cabin air filters for clean in-cabin air.',
    'oil-filter': 'Engine oil filters for reliable lubrication.',
    'fuel-filter': 'Fuel filters for clean fuel delivery.',
    'wiper': 'Wiper blades and wiper products.',
    'brake-pads': 'Ceramic and semi-metallic brake pads matched by OE number.',
    'spark-plugs': 'Ignition spark plugs for gasoline engines, matched by OE and engine application.',
    'rubber-hoses': 'EPDM, NBR and silicone hoses for cooling, fuel and air-transfer circuits.',
}

CAT_NAME = {
    'air-filter': 'Air Filter',
    'cabin-filter': 'Cabin Filter',
    'oil-filter': 'Oil Filter',
    'fuel-filter': 'Fuel Filter',
    'wiper': 'Wiper',
    'brake-pads': 'Brake Pads',
    'spark-plugs': 'Spark Plugs',
    'rubber-hoses': 'Rubber Hoses',
}

def load(path):
    with open(path) as f:
        return json.load(f)

def main_llms(ds):
    cats = ds['categories']
    prods = ds['products']
    lines = []
    lines.append('# huiying Filter')
    lines.append('')
    lines.append('> Qinghe County Huiying Automotive Parts Co., Ltd. — a professional manufacturer of automotive and industrial filters (air, cabin, oil, fuel filters and wipers, plus brake pads, spark plugs and rubber hoses), integrating R&D, production and sales. Brand lineage since 1996; legal entity incorporated 2017. This file lists the main pages of the site for LLM consumption.')
    lines.append('')
    lines.append('## Site structure')
    lines.append('')
    lines.append(f'- [Home]({MAIN_URL}/): Company overview, product categories, sourcing highlights and latest news.')
    lines.append(f'- [Products]({MAIN_URL}/products/): All filter product categories.')
    for c in cats:
        lines.append(f'- [{CAT_NAME[c["slug"]]}]({MAIN_URL}/products/{c["slug"]}/): {c["desc"]}')
    lines.append('')
    lines.append('## Product SKUs')
    lines.append('')
    for p in prods:
        label = f'{p["name"]} {p["model"]}'.strip()
        lines.append(f'- [{label}]({MAIN_URL}/products/{p["category"]}/{p["slug"]}/): {CAT_NAME[p["category"]]} SKU.')
    lines.append('')
    lines.append('## Company')
    lines.append('')
    for label, href in [
        ('Company Profile', '/company-profile/'),
        ('Company Culture', '/culture/'),
        ('Factory', '/factory/'),
        ('Marketing', '/marketing/'),
        ('Download', '/download/'),
        ('Exhibition', '/exhibition/'),
        ('Contact', '/contact/'),
    ]:
        lines.append(f'- [{label}]({MAIN_URL}{href})')
    lines.append(f'- [Privacy Policy]({MAIN_URL}/privacy-policy/): Privacy policy.')
    lines.append(f'- [Terms of Service]({MAIN_URL}/terms/): Terms of service.')
    lines.append(f'- [Disclaimer]({MAIN_URL}/disclaimer/): Disclaimer.')
    lines.append(f'- [Cookie Policy]({MAIN_URL}/cookies/): Cookie policy.')
    lines.append('')
    lines.append('## News')
    lines.append('')
    lines.append(f'- [News]({MAIN_URL}/news/): Filter knowledge and company updates.')
    lines.append('')
    return '\n'.join(lines) + '\n'

def data_llms(ds):
    cats = ds['categories']
    prods = ds['products']
    lines = []
    lines.append('# Huiying Filter Data')
    lines.append('')
    lines.append(f'> Canonical product database for the huiying filter manufacturer — structured SKU records,')
    lines.append('> reference-level vehicle-fitment framework and filter reference data (media, OE prefix')
    lines.append('> patterns, size ranges, replacement intervals, procurement). Machine-readable, zero')
    lines.append(f'> marketing. {len(prods)} SKUs across {len(cats)} categories. Operator: Qinghe County Huiying Automotive Parts Co.,')
    lines.append('> Ltd. — commercial catalog and inquiries at carfilterspro.com.')
    lines.append('')
    lines.append(f'- [Home]({DATA_URL}/): data-site overview, section index and honest data posture.')
    lines.append(f'- [SKU Index]({DATA_URL}/products/): all {len(prods)} SKUs (identity verified; specs `source-verified` / blank).')
    for c in cats:
        n = sum(1 for p in prods if p['category'] == c['slug'])
        plural = 'SKU' if n == 1 else 'SKUs'
        lines.append(f'- [{CAT_NAME[c["slug"]]} category]({DATA_URL}/products/{c["slug"]}/): {n} {plural}.')
    lines.append('')
    lines.append('## SKU details')
    lines.append('')
    for p in prods:
        lines.append(f'- [SKU {p["model"]}]({DATA_URL}/products/{p["model"]}/): {CAT_NAME[p["category"]]} parameter page.')
    lines.append('')
    lines.append('## Reference')
    lines.append('')
    for label, href in [
        ('Fitment Index', '/fitment/'),
        ('Engine Air Filter fitment', '/fitment/air-filter/'),
        ('Engine Oil Filter fitment', '/fitment/oil-filter/'),
        ('Cabin Air Filter fitment', '/fitment/cabin-filter/'),
        ('Fuel Filter fitment', '/fitment/fuel-filter/'),
        ('Wiper fitment', '/fitment/wiper/'),
        ('Brake Pads fitment', '/fitment/brake-pads/'),
        ('Spark Plugs fitment', '/fitment/spark-plugs/'),
        ('Rubber Hoses fitment', '/fitment/rubber-hoses/'),
        ('OE Prefix Patterns', '/reference/oe-patterns/'),
        ('Size Ranges', '/reference/size-ranges/'),
        ('Replacement Intervals', '/reference/replacement-intervals/'),
        ('Procurement', '/reference/procurement/'),
        ('SKU–OE–Vehicle Association', '/reference/sku-oe-vehicle/'),
        ('Filter Media comparison', '/materials/media-comparison/'),
        ('Field Schema', '/specification/field-schema/'),
        ('Data Status Labels', '/specification/data-status/'),
        ('Sources & Disclaimer', '/specification/sources/'),
        ('Changelog', '/specification/changelog/'),
    ]:
        lines.append(f'- [{label}]({DATA_URL}{href})')
    lines.append('')
    lines.append('## Notes')
    lines.append('')
    lines.append('- Three-state data status: `reference` (framework / common-application), `source-verified`')
    lines.append('  (value published by the source catalog; OE↔brand is a fact), `fitment-verified`')
    lines.append('  (complete SKU-OE-vehicle-source-date record — 0 rows today).')
    lines.append('- OE numbers, cross-references, material and fitment are `source-verified` where the')
    lines.append('  congbenfilter.com catalog publishes them; fields the source does not supply are blank')
    lines.append('  (`NEEDS_VERIFICATION`), never invented.')
    lines.append('- Vehicle fitment is `reference` only — "reference material — not an exact-fitment tool".')
    lines.append('- Commercial catalog and quotations: carfilterspro.com (this data site is reference-only).')
    lines.append('')
    return '\n'.join(lines) + '\n'

def main():
    ds = load(MAIN_PRODUCTS)
    out = main_llms(ds)
    with open('/root/.openclaw/workspace/repos/Huiying/public/llms.txt', 'w') as f:
        f.write(out)
    print(f'[main] wrote public/llms.txt ({len(ds["products"])} SKUs, {len(ds["categories"])} categories)')

    ds2 = load(DATA_PRODUCTS)
    out2 = data_llms(ds2)
    with open('/root/.openclaw/workspace/repos/data.huiying/docs/llms.txt', 'w') as f:
        f.write(out2)
    print(f'[data] wrote docs/llms.txt ({len(ds2["products"])} SKUs, {len(ds2["categories"])} categories)')

if __name__ == '__main__':
    main()
