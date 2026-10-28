#!/usr/bin/env python3
"""Comprehensive technical-SEO audit for Huiying main site + data.huiying sub-site."""
import os, re, json, sys
from collections import Counter, defaultdict
from html.parser import HTMLParser
from urllib.parse import urlparse, urljoin

MAIN = '/root/.openclaw/workspace/repos/Huiying'
DATA = '/root/.openclaw/workspace/repos/data.huiying'

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = None
        self.in_title = False
        self.title_buf = []
        self.meta_desc = None
        self.canonical = None
        self.robots = None
        self.h1 = []
        self.h2 = []
        self.images = []  # (src, alt, has_alt)
        self.links = []   # href
        self.jsonld = []  # raw jsonld strings
        self.in_script = False
        self.script_type = None
        self.script_buf = []
        self.current_h = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title':
            self.in_title = True
            self.title_buf = []
        elif tag == 'meta':
            n = a.get('name','').lower()
            p = a.get('property','').lower()
            if n == 'description':
                self.meta_desc = a.get('content')
            elif n == 'robots':
                self.robots = a.get('content')
            elif p == 'og:description':
                self.meta_desc = self.meta_desc or a.get('content')
        elif tag == 'link':
            rel = a.get('rel','')
            if 'canonical' in rel:
                self.canonical = a.get('href')
        elif tag in ('h1','h2'):
            self.current_h = tag
            self._hbuf = []
        elif tag == 'img':
            self.images.append((a.get('src'), a.get('alt','') or '', 'alt' in a))
        elif tag == 'a':
            self.links.append(a.get('href'))
        elif tag == 'script':
            self.in_script = True
            self.script_type = a.get('type','')
            self.script_buf = []

    def handle_endtag(self, tag):
        if tag == 'title' and self.in_title:
            self.title = ''.join(self.title_buf).strip()
            self.in_title = False
        elif tag in ('h1','h2') and self.current_h == tag:
            txt = ''.join(self._hbuf).strip()
            if tag == 'h1':
                self.h1.append(txt)
            else:
                self.h2.append(txt)
            self.current_h = None
        elif tag == 'script' and self.in_script:
            raw = ''.join(self.script_buf).strip()
            if 'ld+json' in self.script_type and raw:
                self.jsonld.append(raw)
            self.in_script = False
            self.script_type = None

    def handle_data(self, data):
        if self.in_title:
            self.title_buf.append(data)
        if self.current_h in ('h1','h2'):
            self._hbuf.append(data)
        if self.in_script:
            self.script_buf.append(data)

def parse_file(path):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()
    p = PageParser()
    p.feed(html)
    return p, html

def walk_html(root):
    out = []
    for dirpath, dirs, files in os.walk(root):
        for fn in files:
            if fn.endswith('.html'):
                out.append(os.path.join(dirpath, fn))
    return sorted(out)

def url_path(u):
    if not u:
        return None
    if u.startswith('#'):
        return None
    if u.startswith(('http://','https://','mailto:','tel:','javascript:')):
        return None
    # strip query/fragment
    u = u.split('#')[0].split('?')[0]
    return u

def main():
    print("=" * 70)
    print("AUDIT: Huiying main site")
    print("=" * 70)
    main_files = walk_html(os.path.join(MAIN, 'dist'))
    print(f"HTML files: {len(main_files)}")

    # --- 1. SEO config ---
    titles = Counter()
    descs = Counter()
    h1_counts = []
    canonical_issues = []
    alt_missing = []
    img_total = 0
    img_no_alt = 0
    title_len_issues = []
    title_len_short = []
    pages = {}

    for fp in main_files:
        p, html = parse_file(fp)
        rel = os.path.relpath(fp, os.path.join(MAIN, 'dist'))
        pages[rel] = p
        if p.title:
            titles[p.title] += 1
        if p.meta_desc:
            descs[p.meta_desc] += 1
        h1_counts.append((rel, len(p.h1)))
        # canonical check
        if p.canonical is None:
            canonical_issues.append((rel, 'NO CANONICAL'))
        # alt coverage
        for src, alt, has_alt in p.images:
            img_total += 1
            if not has_alt:
                img_no_alt += 1
                alt_missing.append((rel, src))
        # title length
        if p.title:
            L = len(p.title)
            if L < 30 or L > 60:
                title_len_issues.append((rel, L, p.title))

    print(f"\n--- Title uniqueness ---")
    dups = {t:c for t,c in titles.items() if c > 1}
    print(f"Total unique titles: {len(titles)} / {len(main_files)} pages")
    print(f"Duplicate titles: {len(dups)}")
    for t,c in list(dups.items())[:20]:
        print(f"  [{c}x] {t[:100]}")

    print(f"\n--- Description uniqueness ---")
    ddups = {t:c for t,c in descs.items() if c > 1}
    print(f"Total unique descs: {len(descs)} / {len(main_files)} pages")
    print(f"Duplicate descs: {len(ddups)}")
    for t,c in list(ddups.items())[:10]:
        print(f"  [{c}x] {t[:100]}")

    print(f"\n--- H1 count ---")
    bad_h1 = [x for x in h1_counts if x[1] != 1]
    print(f"Pages with !=1 H1: {len(bad_h1)}")
    for rel, c in bad_h1[:20]:
        print(f"  {rel}: {c} H1")

    print(f"\n--- Canonical ---")
    print(f"Pages missing canonical: {len(canonical_issues)}")
    for rel, msg in canonical_issues[:20]:
        print(f"  {rel}: {msg}")

    print(f"\n--- Image alt coverage ---")
    print(f"Images total: {img_total}, missing alt: {img_no_alt} ({100*img_no_alt/max(img_total,1):.1f}%)")
    for rel, src in alt_missing[:20]:
        print(f"  {rel}: {src}")

    print(f"\n--- Title length (target 30-60) ---")
    print(f"Out of range: {len(title_len_issues)}")
    for rel, L, t in title_len_issues[:20]:
        print(f"  {rel}: {L} chars -> {t[:80]}")

    # --- schema check ---
    print(f"\n--- Schema (JSON-LD) render ---")
    # sample 10 SKU pages
    sku_pages = [r for r in main_files if '/products/' in r and r.endswith('/index.html') and not re.search(r'/products/[a-z-]+/index\.html$', r)]
    org_count = 0
    prod_count = 0
    bc_count = 0
    price_ok = 0
    price_bad = []
    sku_sample = sku_pages[:10] + sku_pages[len(sku_pages)//2:len(sku_pages)//2+5]
    for fp in sku_pages:
        p, html = parse_file(fp)
        rel = os.path.relpath(fp, os.path.join(MAIN,'dist'))
        types = []
        for ld in p.jsonld:
            try:
                d = json.loads(ld)
                t = d.get('@type')
                types.append(t)
                if t == 'Product':
                    prod_count += 1
                    offers = d.get('offers', {})
                    ps = offers.get('priceSpecification', {})
                    lo = offers.get('lowPrice'); hi = offers.get('highPrice')
                    mn = ps.get('minPrice'); mx = ps.get('maxPrice')
                    if 10 <= float(lo) <= 60 and 10 <= float(hi) <= 60 and 10 <= float(mn) <= 60 and 10 <= float(mx) <= 60:
                        price_ok += 1
                    else:
                        price_bad.append((rel, lo, hi, mn, mx))
                elif t == 'BreadcrumbList':
                    bc_count += 1
                elif t == 'Organization':
                    org_count += 1
            except Exception as e:
                pass
        if not any('Product' in t for t in types):
            price_bad.append((rel, 'NO Product schema', types))
    print(f"SKU pages: {len(sku_pages)}")
    print(f"Organization schema found: {org_count}")
    print(f"Product schema found: {prod_count}")
    print(f"BreadcrumbList found: {bc_count}")
    print(f"Price 10-60 USD OK: {price_ok}, bad: {len(price_bad)}")
    for x in price_bad[:10]:
        print(f"  {x}")

    # --- 4. Internal links / broken links ---
    print(f"\n--- Internal link check (main site) ---")
    all_paths = set()
    for fp in main_files:
        rel = os.path.relpath(fp, os.path.join(MAIN,'dist'))
        # normalize: dist/foo/index.html -> /foo/
        if rel == 'index.html':
            all_paths.add('/')
        elif rel.endswith('/index.html'):
            all_paths.add('/' + rel[:-len('index.html')])
        else:
            all_paths.add('/' + rel[:-len('.html')])
    broken = []
    for fp in main_files:
        p, html = parse_file(fp)
        rel = os.path.relpath(fp, os.path.join(MAIN,'dist'))
        for href in p.links:
            up = url_path(href)
            if up is None:
                continue
            if not up.startswith('/'):
                up = '/' + up
            # ignore asset links
            if re.search(r'\.(css|js|png|jpg|jpeg|webp|svg|ico|xml|txt|woff2?)$', up):
                continue
            if up not in all_paths:
                broken.append((rel, href))
    print(f"Broken internal links: {len(broken)}")
    for rel, href in broken[:30]:
        print(f"  {rel} -> {href}")

    # orphan detection
    print(f"\n--- Orphan page detection (main site) ---")
    # referenced set = all hrefs from any page (internal) + sitemap
    referenced = set()
    for fp in main_files:
        p, html = parse_file(fp)
        for href in p.links:
            up = url_path(href)
            if up is None: continue
            if not up.startswith('/'): up = '/' + up
            up = up.split('#')[0]
            referenced.add(up)
    # add sitemap
    sm = os.path.join(MAIN,'dist','sitemap-0.xml')
    if os.path.exists(sm):
        with open(sm) as f:
            for m in re.finditer(r'<loc>([^<]+)</loc>', f.read()):
                u = url_path(m.group(1))
                if u: referenced.add(u)
    # add nav/footer/index defaults
    orphans = []
    for path in sorted(all_paths):
        if path not in referenced:
            orphans.append(path)
    print(f"Total pages: {len(all_paths)}, orphan pages (no inbound): {len(orphans)}")
    for o in orphans:
        print(f"  ORPHAN: {o}")

    # --- 5. compliance pages ---
    print(f"\n--- Compliance pages ---")
    for pg in ['privacy-policy','terms','disclaimer','cookies']:
        fp = os.path.join(MAIN,'dist',pg,'index.html')
        if os.path.exists(fp):
            p, html = parse_file(fp)
            has_entity = 'Qinghe County Huiying Automotive Parts Co., Ltd.' in html
            has_email = 'Martin@carfilterpro.com' in html
            has_phone = '+86 13323237275' in html
            has_eff = 'Effective date' in html or 'effective date' in html
            print(f"  /{pg}/: H1={p.h1[0] if p.h1 else 'MISSING'} | entity={has_entity} email={has_email} phone={has_phone} effdate={has_eff}")
        else:
            print(f"  /{pg}/: MISSING")

    # llms.txt check
    print(f"\n--- llms.txt (main) ---")
    ll = os.path.join(MAIN,'dist','llms.txt')
    if os.path.exists(ll):
        txt = open(ll).read()
        # count SKU entries
        sku_lines = re.findall(r'\[[^\]]+\]\(https://huiyingfilter\.com/products/[a-z-]+/[^)]+\)', txt)
        # category entries
        cat_lines = re.findall(r'products/([a-z-]+)/\)', txt)
        print(f"  llms.txt SKU links: {len(sku_lines)}")
        print(f"  Categories mentioned: {sorted(set(cat_lines))}")
        # check for new categories
        for c in ['brake-pads','spark-plugs','rubber-hoses']:
            print(f"  contains {c}: {c in txt}")
    else:
        print("  llms.txt MISSING")

    print()
    print("=" * 70)
    print("AUDIT: data.huiying sub-site")
    print("=" * 70)
    data_files = walk_html(os.path.join(DATA, 'site'))
    print(f"HTML files: {len(data_files)}")

    # broken links in data site
    data_paths = set()
    for fp in data_files:
        rel = os.path.relpath(fp, os.path.join(DATA,'site'))
        if rel == 'index.html':
            data_paths.add('/')
        elif rel.endswith('/index.html'):
            data_paths.add('/' + rel[:-len('index.html')])
        else:
            data_paths.add('/' + rel[:-len('.html')])
    data_broken = []
    data_orphan_ref = set()
    for fp in data_files:
        p, html = parse_file(fp)
        rel = os.path.relpath(fp, os.path.join(DATA,'site'))
        for href in p.links:
            up = url_path(href)
            if up is None: continue
            if not up.startswith('/'): up = '/' + up
            if re.search(r'\.(css|js|png|jpg|jpeg|webp|svg|ico|xml|txt|woff2?)$', up): continue
            data_orphan_ref.add(up)
            if up not in data_paths and not up.startswith('https://huiyingfilter.com'):
                data_broken.append((rel, href))
    print(f"\n--- data site broken links ---")
    print(f"Broken: {len(data_broken)}")
    for rel, href in data_broken[:30]:
        print(f"  {rel} -> {href}")

    # cross-links
    print(f"\n--- cross-site links ---")
    main_to_data = 0
    data_to_main = 0
    for fp in main_files:
        p, html = parse_file(fp)
        for href in p.links:
            if 'data.huiying.com' in href:
                main_to_data += 1
    for fp in data_files:
        p, html = parse_file(fp)
        for href in p.links:
            if 'huiyingfilter.com' in href:
                data_to_main += 1
    print(f"main->data links: {main_to_data}")
    print(f"data->main links: {data_to_main}")

    # data orphan
    print(f"\n--- data site orphan ---")
    data_orphans = []
    for path in sorted(data_paths):
        if path not in data_orphan_ref:
            data_orphans.append(path)
    print(f"Total pages: {len(data_paths)}, orphans: {len(data_orphans)}")
    for o in data_orphans:
        print(f"  ORPHAN: {o}")

    # data llms
    print(f"\n--- data llms.txt ---")
    dll = os.path.join(DATA,'site','llms.txt')
    if os.path.exists(dll):
        txt = open(dll).read()
        print(f"  '10 SKUs' mentioned: {'10 SKUs' in txt}")
        print(f"  '61 SKUs' mentioned: {'61 SKUs' in txt}")
        print(f"  '5 categories' mentioned: {'5 categories' in txt}")
        print(f"  '8 categories' mentioned: {'8 categories' in txt}")
        for c in ['brake-pads','spark-plugs','rubber-hoses']:
            print(f"  contains {c}: {c in txt}")
    else:
        print("  data llms.txt MISSING")

if __name__ == '__main__':
    main()
