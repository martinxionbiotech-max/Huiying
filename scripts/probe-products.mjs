#!/usr/bin/env node
// probe-products.mjs — extract name/category/desc/images for product detail pages.
const CHROMIUM_EXE = process.env.CHROMIUM_EXE || '/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome';
const { chromium } = (await import('/usr/lib/node_modules/openclaw/node_modules/playwright-core/index.js')).default;

const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['690','691','692','693','694','695','696','697','698','699','700','701','702','703'];

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

for (const id of ids) {
  const url = `https://www.tianruifilters.cn/product/${id}.html`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch { /* ignore */ }
  await page.waitForTimeout(700);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
  });
  await page.waitForTimeout(400);
  const data = await page.evaluate(() => {
    const h1 = [...document.querySelectorAll('h1')].map(e => e.innerText.trim()).filter(Boolean).join(' | ');
    const text = document.body.innerText.replace(/\n{2,}/g, '\n');
    // images excluding data URIs and tiny icons
    const imgs = [...document.querySelectorAll('img')].map(i => i.src).filter(s => s.startsWith('http') && !s.startsWith('data:'));
    return { h1, text, imgs };
  });
  console.log(`\n===== PRODUCT ${id} =====`);
  console.log('H1:', data.h1);
  // print the main body text (filtered)
  const lines = data.text.split('\n').map(l => l.trim()).filter(Boolean);
  console.log('TEXT:', lines.slice(0, 60).join(' | '));
  console.log('IMGS:', data.imgs.join('\n       '));
}

await browser.close();
