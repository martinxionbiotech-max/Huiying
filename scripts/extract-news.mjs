#!/usr/bin/env node
// extract-news.mjs — produce clean news data from crawled text files.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEXT = resolve(ROOT, 'crawls/tianrui/text');

const cats = {
  49: 'industry', 50: 'company', 51: 'company', 52: 'industry',
  53: 'industry', 54: 'industry', 55: 'industry', 56: 'industry', 57: 'industry',
};

const out = [];
for (let n = 49; n <= 57; n++) {
  const raw = readFileSync(resolve(TEXT, `news-${n}.txt`), 'utf8');
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);

  // find title: line before "Release time:"
  let title = '';
  let date = '';
  let idx = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^Release time:/i.test(lines[i])) {
      date = (lines[i].replace(/^Release time:\s*/i, '') + ' ' + (lines[i + 1] || '')).trim();
      date = date.replace(/\s+/g, ' ').replace(/\.$/, '');
      // title is the previous non-empty line (dedup of title appears twice)
      title = lines[i - 1] || '';
      idx = i + 2;
      break;
    }
  }

  // body: from idx to before "TAG:" or "Previous"/"Next"/"Recommend"
  const bodyLines = [];
  for (let i = idx; i < lines.length; i++) {
    const l = lines[i];
    if (/^(TAG:|Previous|Next|Recommend)/.test(l)) break;
    if (/^(HOME|ABOUT US|PRODUCTS|BLOG|TECHNICAL SUPPORT|CONTACT|News Center|Company News|Industry News|Home page|News)$/.test(l)) continue;
    if (l === title) continue; // skip repeated title
    bodyLines.push(l);
  }

  // dedup consecutive duplicates (source repeats the first paragraph)
  const body = [];
  for (const l of bodyLines) {
    if (body[body.length - 1] === l) continue;
    body.push(l);
  }
  const bodyText = body.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();

  out.push({ id: n, title, date, category: cats[n], body: bodyText });
}

writeFileSync(resolve(ROOT, 'crawls/tianrui/news-extracted.json'), JSON.stringify(out, null, 2));
console.log('Extracted', out.length, 'articles');
for (const a of out) console.log(`news-${a.id} [${a.category}] ${a.date} | ${a.title} | body=${a.body.length} chars`);
