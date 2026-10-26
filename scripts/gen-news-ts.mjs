#!/usr/bin/env node
// gen-news-ts.mjs — convert news-extracted.json into src/data/newsPosts.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const data = JSON.parse(readFileSync(resolve(ROOT, 'crawls/tianrui/news-extracted.json'), 'utf8'));

const slugs = {
  49: 'how-to-choose-air-filter',
  50: 'why-does-sludge-still-appear-in-the-oil-shell',
  51: 'frequently-asked-questions-about-excavator-filter-elements',
  52: 'the-lungs-of-the-engine-working-principle-of-the-air-filter',
  53: 'is-it-necessary-to-replace-the-oil-filter-while-maintaining-the-oil',
  54: 'good-engine-oil-changed-every-time-why-sludge-still-appears',
  55: 'oil-filter-the-knowledge-you-dont-know',
  56: 'the-importance-of-filter-efficiency-to-the-engine',
  57: 'the-misunderstanding-and-identification-method-of-air-filter',
};

const clean = (s) => s.replace(/\n{3,}/g, '\n\n').replace(/\s+\n/g, '\n').trim();
const posts = data.map((a) => ({
  id: a.id,
  slug: slugs[a.id],
  title: a.title,
  date: a.date,
  category: a.category, // 'company' | 'industry'
  body: clean(a.body),
}));

const catLabel = { company: 'Company News', industry: 'Industry News' };

const out = `// News posts — scraped from the source site (renamed Tianrui -> huiying).\nexport interface NewsPost {\n  id: number;\n  slug: string;\n  title: string;\n  date: string;\n  category: 'company' | 'industry';\n  categoryLabel: string;\n  body: string;\n}\n\nexport const newsCategories = [\n  { slug: 'company', label: 'Company News' },\n  { slug: 'industry', label: 'Industry News' },\n] as const;\n\nexport const newsPosts: NewsPost[] = ${JSON.stringify(posts.map((p) => ({ ...p, categoryLabel: catLabel[p.category] })), null, 2)};\n`;

writeFileSync(resolve(ROOT, 'src/data/newsPosts.ts'), out);
console.log('Wrote src/data/newsPosts.ts with', posts.length, 'posts');
