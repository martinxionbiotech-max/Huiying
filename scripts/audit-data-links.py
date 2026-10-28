#!/usr/bin/env python3
"""Re-verify data.huiying link resolution with proper relative-URL handling (web-path based)."""
import os, re
from html.parser import HTMLParser
from urllib.parse import urlparse, urljoin

DATA = '/root/.openclaw/workspace/repos/data.huiying'

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.links.append(dict(attrs).get('href'))

def walk(root):
    out=[]
    for dp,_,fs in os.walk(root):
        for f in fs:
            if f.endswith('.html'): out.append(os.path.join(dp,f))
    return sorted(out)

def page_webpath(fp):
    rel = os.path.relpath(fp, os.path.join(DATA,'site'))
    if rel == 'index.html': return '/'
    if rel.endswith('/index.html'): return '/' + rel[:-len('index.html')]
    return '/' + rel[:-len('.html')]

def is_asset(u):
    return bool(re.search(r'\.(css|js|png|jpg|jpeg|webp|svg|ico|xml|txt|woff2?|gif|json|gz)$', u))

files = walk(os.path.join(DATA,'site'))
paths = set(page_webpath(fp) for fp in files)
# normalized (no trailing slash) set for matching
norm_paths = set(p.rstrip('/') for p in paths)

pages = {}
for fp in files:
    p = P(); p.feed(open(fp, encoding='utf-8', errors='replace').read())
    pages[fp] = p

print(f"data site pages: {len(paths)}")

broken = []
referenced = set()
for fp in files:
    p = pages[fp]
    rel_page = page_webpath(fp)
    # base web URL for resolving relative hrefs
    base = 'https://data.huiying.com' + rel_page
    for href in p.links:
        if not href: continue
        if href.startswith(('mailto:','tel:','#')):
            continue
        if is_asset(href): continue
        if href.startswith(('http://','https://')):
            pu = urlparse(href)
            if pu.netloc not in ('data.huiying.com','huiyingfilter.com'):
                continue
            path = pu.path
        else:
            full = urljoin(base, href)
            path = urlparse(full).path
        if not path: continue
        path = path.split('#')[0].split('?')[0]
        np = path.rstrip('/')
        if np == '':
            np = '/'
        referenced.add(np)
        # existence check
        if np == '/':
            continue
        if np not in norm_paths:
            broken.append((rel_page, href))

print(f"\nBroken internal links (resolved): {len(broken)}")
seen = set()
for rel, href in broken[:60]:
    key = (rel, href)
    if key in seen: continue
    seen.add(key)
    print(f"  {rel} -> {href}")

print(f"\nOrphan detection:")
orphans = []
for pt in sorted(paths):
    np = pt.rstrip('/')
    if np == '':
        continue
    if np not in referenced:
        orphans.append(pt)
print(f"Orphans (excluding root): {len(orphans)}")
for o in orphans:
    print(f"  ORPHAN: {o}")
