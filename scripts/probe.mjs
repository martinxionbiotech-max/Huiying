#!/usr/bin/env node
// probe.mjs — render one page with Playwright and dump structure for inspection.
import { writeFileSync } from 'node:fs';

const CHROMIUM_EXE = process.env.CHROMIUM_EXE || '/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome';
const { chromium } = (await import('/usr/lib/node_modules/openclaw/node_modules/playwright-core/index.js')).default;

const url = process.argv[2] || 'https://www.tianruifilters.cn/product/690.html';

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
await page.setExtraHTTPHeaders({ 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' });

const responses = [];
page.on('response', (r) => {
  const u = r.url();
  if (/thefastimg|\.(png|jpe?g|gif|webp|svg)/i.test(u)) responses.push([r.status(), u]);
});

await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1500);
// scroll to trigger lazy-load
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(800);

const html = await page.content();
writeFileSync('/tmp/probe.html', html);

// dump image srcs
const imgs = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('img').forEach(i => { if (i.src) out.push(i.src); });
  return out;
});
// text
const text = await page.evaluate(() => document.body.innerText);

console.log('=== IMAGE RESPONSES ===');
responses.forEach(([s, u]) => console.log(s, u));
console.log('=== IMG SRCs ===');
imgs.forEach(u => console.log(u));
console.log('=== BODY TEXT (first 4000) ===');
console.log(text.slice(0, 4000));

await browser.close();
