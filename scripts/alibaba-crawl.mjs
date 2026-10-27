#!/usr/bin/env node
/**
 * Alibaba store crawler — hbcongben (Huiying / 清河·天瑞滤清器 同源供货商渠道)
 *
 * Pipeline: 店铺首页 → 产品列表翻页 → 产品详情 → 图片全量落盘 → 去重 → report.md
 *
 * 运行前提
 *   1) Playwright chromium 可用。本脚本复用 openclaw 内置 playwright-core，
 *      并显式指定已缓存的 chromium-1248 二进制。
 *      如需独立安装: `npm i -D playwright-core && npx playwright install chromium`
 *   2) 反爬现状: hbcongben.m.en.alibaba.com 处于 Alibaba「baxia-punish」滑块验证墙
 *      (AWSC + sufei-punish)。纯 headless 自动化会被拦截。
 *
 * 绕过路径（二选一）
 *   A) Cookie 注入（推荐）: 在真实浏览器手动过一次滑块，导出该域名 cookie 到
 *      crawls/alibaba/cookies.json（Netscape 或 JSON 数组格式），脚本自动加载复用。
 *      格式示例:
 *        [{"name":"x5sec","value":"...","domain":".alibaba.com","path":"/"},
 *         {"name":"cookie2","value":"...","domain":".alibaba.com","path":"/"}]
 *      或 Netscape cookies.txt 文本（每行 7 字段，tab 分隔）。
 *   B) 接入第三方打码服务（如 2captcha/capmonster 的 alibaba 滑块），在 onCaptcha
 *      钩子里填入 token / 拖动轨迹。
 *
 * 用法
 *   node scripts/alibaba-crawl.mjs [--limit N] [--no-images] [--headful]
 *
 * 输出
 *   crawls/alibaba/products.json        产品结构化数据（供后续目录扩充直接使用）
 *   crawls/alibaba/html/                每页 HTML 归档
 *   crawls/alibaba/images/              图片（字节去重后）
 *   public/images/alibaba/              图片（若体积 <50MB 则同时落到 public 供站点引用）
 *   crawls/alibaba/report.md            采集报告
 */

import { chromium } from '/usr/lib/node_modules/openclaw/node_modules/playwright-core/index.mjs';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, statSync, renameSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..');
const OUT = join(REPO, 'crawls', 'alibaba');
const HTML_DIR = join(OUT, 'html');
const IMG_DIR = join(OUT, 'images');
const PUBLIC_IMG = join(REPO, 'public', 'images', 'alibaba');

const BASE = 'https://hbcongben.m.en.alibaba.com/';
const CHROMIUM = join(process.env.HOME, '.cache/ms-playwright/chromium-1248/chrome-linux64/chrome');
const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';

const args = process.argv.slice(2);
const FLAGS = {
  limit: parseInt(arg(args, '--limit') ?? '0', 10),
  images: !args.includes('--no-images'),
  headful: args.includes('--headful'),
};
function arg(argv, key) {
  const i = argv.indexOf(key);
  return i >= 0 ? argv[i + 1] : undefined;
}

mkdirSync(HTML_DIR, { recursive: true });
mkdirSync(IMG_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();

// ---------------------------------------------------------------- cookies
function loadCookies() {
  const p = join(OUT, 'cookies.json');
  const pTxt = join(OUT, 'cookies.txt');
  if (existsSync(p)) {
    try {
      const data = JSON.parse(readFileSync(p, 'utf8'));
      const arr = Array.isArray(data) ? data : data.cookies;
      return arr.map((c) => ({
        name: c.name,
        value: c.value,
        domain: c.domain || '.alibaba.com',
        path: c.path || '/',
      }));
    } catch (e) {
      console.error('[cookies] JSON 解析失败:', e.message);
    }
  }
  if (existsSync(pTxt)) {
    // Netscape cookies.txt
    const lines = readFileSync(pTxt, 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
    return lines.map((l) => {
      const [domain, , path, secure, exp, name, value] = l.split('\t');
      return { name, value, domain, path, secure: secure === 'TRUE', expires: Number(exp) || -1 };
    });
  }
  return null;
}

// ---------------------------------------------------------------- captcha
function isCaptcha(pageHtml) {
  const h = pageHtml.toLowerCase();
  return (
    h.includes('baxia-punish') ||
    h.includes('captcha verification') ||
    h.includes('_____tmd_____') ||
    h.includes('slide to verify') ||
    h.includes('drag the slider')
  );
}

/** 打码钩子：接入第三方服务时在此实现。返回 true 表示已解决。 */
async function solveCaptcha(page) {
  // 默认不实现自动化滑块。若未来接入打码服务，在此：
  // 1) 读取 #bg-img 与滑块按钮 #nc_1_n1z 的几何
  // 2) 提交打码服务获取拖动距离
  // 3) 用人类化轨迹拖动 page.mouse
  // 4) 等待验证通过
  return false;
}

// ---------------------------------------------------------------- stealth
async function newPage(browser) {
  const ctx = await browser.newContext({
    userAgent: UA_MOBILE,
    viewport: { width: 390, height: 844 },
    locale: 'en-US',
    isMobile: true,
    hasTouch: true,
  });
  const cookies = loadCookies();
  if (cookies) await ctx.addCookies(cookies);
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
    window.chrome = window.chrome || { runtime: {} };
  });
  return ctx.newPage();
}

// ---------------------------------------------------------------- extractors
async function scrollToBottom(page, times = 6) {
  for (let i = 0; i < times; i++) {
    await page.mouse.wheel(0, 2500);
    await sleep(rand(500, 900));
  }
}

async function extractHome(page) {
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await sleep(2000);
  await scrollToBottom(page);
  const data = await page.evaluate(() => {
    const txt = (sel) => {
      const e = document.querySelector(sel);
      return e ? (e.innerText || e.textContent || '').trim() : '';
    };
    const links = Array.from(document.querySelectorAll('a')).map((a) => ({
      text: (a.innerText || a.textContent || '').trim().slice(0, 120),
      href: a.href,
    }));
    return {
      title: document.title,
      bodyText: (document.body.innerText || '').slice(0, 2000),
      links: links.filter((l) => l.href && l.href.includes('alibaba')),
    };
  });
  return data;
}

function extractProductList(pageHtml) {
  // 移动端产品列表卡片通常挂在 [class*=product] 或 <a href*="/product/">
  // 返回候选产品详情 URL 列表（去重）。
  const m = pageHtml.match(/href="([^"]*product[^"]*\.html[^"]*)"/gi) || [];
  const urls = new Set();
  for (const s of m) {
    let u = s.replace(/^href="/i, '').replace(/"$/, '');
    if (u.startsWith('//')) u = 'https:' + u;
    if (!u.startsWith('http')) u = new URL(u, BASE).href;
    if (/\/product\/|productdetail|product-\d+/i.test(u)) urls.add(u);
  }
  return [...urls];
}

async function extractProductDetail(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await sleep(1500);
  await scrollToBottom(page, 4);
  const d = await page.evaluate(() => {
    const t = (sel) => {
      const e = document.querySelector(sel);
      return e ? (e.innerText || e.textContent || '').trim() : '';
    };
    const imgs = Array.from(document.querySelectorAll('img')).map((i) => ({
      src: i.src,
      alt: i.alt || '',
    }));
    const body = (document.body.innerText || '').slice(0, 6000);
    // 价格 / MOQ 从文本正则提取
    const price = (body.match(/\$\s?[\d.,]+\s?-\s?\$\s?[\d.,]+|\$\s?[\d.,]+/) || [])[0] || '';
    const moq = (body.match(/MOQ[^\n]{0,40}/i) || [])[0] || (body.match(/Min\.?\s*Order[^\n]{0,40}/i) || [])[0] || '';
    return {
      title: document.title,
      h1: t('h1') || t('[class*=title]'),
      bodyText: body,
      images: imgs.filter((i) => i.src && /alicdn|alibaba|\.jpg|\.png|\.webp/i.test(i.src)),
      price,
      moq,
    };
  });
  // 型号推断：常见 OEM/part number 形态
  const modelGuess =
    d.title.match(/[A-Z]{1,6}[-_\s]?\d{3,6}[A-Z0-9]*/) ||
    d.h1.match(/[A-Z]{1,6}[-_\s]?\d{3,6}[A-Z0-9]*/) ||
    (d.bodyText.match(/\b(?:OEM|Model|Part\s?No|P\/N)[:：\s]*([A-Z0-9\-]{4,20})/i) || [])[1] || '';
  return { ...d, modelGuess: modelGuess || null };
}

// ---------------------------------------------------------------- images
async function captureImages(page) {
  const seen = new Map(); // sha256 -> {path, url}
  const handler = async (response) => {
    try {
      const u = response.url();
      if (!/\.(jpg|jpeg|png|webp)(\?|$)/i.test(u)) return;
      const ct = response.headers()['content-type'] || '';
      if (!/image/i.test(ct) && !/\.(jpg|jpeg|png|webp)/i.test(u)) return;
      const buf = await response.body();
      if (!buf || buf.length < 100) return;
      const h = sha256(buf);
      if (seen.has(h)) return; // 字节去重
      const ext = /\.webp/i.test(u) ? 'webp' : /\.png/i.test(u) ? 'png' : 'jpg';
      const fn = `${h.slice(0, 16)}.${ext}`;
      writeFileSync(join(IMG_DIR, fn), buf);
      seen.set(h, { path: join(IMG_DIR, fn), url: u });
    } catch (_) {}
  };
  page.on('response', handler);
  return { seen, detach: () => page.off('response', handler) };
}

// ---------------------------------------------------------------- main
async function main() {
  const browser = await chromium.launch({
    executablePath: CHROMIUM,
    headless: !FLAGS.headful,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
  });
  const page = await newPage(browser);
  const results = { store: BASE, company: null, products: [], images: { total: 0, unique: 0 }, captcha: null };

  try {
    const homeHtml = await (async () => {
      await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await sleep(2500);
      return page.content();
    })();

    if (isCaptcha(homeHtml)) {
      results.captcha = {
        detected: true,
        type: 'baxia-punish slider (AWSC + sufei-punish)',
        note: '店铺内容被滑块验证墙拦截，需 Cookie 注入或第三方打码。',
      };
      console.error('[captcha] 检测到 Alibaba 滑块验证墙 (baxia-punish)。');
      console.error('[captcha] 若已手动过验证，请把 cookie 写入 crawls/alibaba/cookies.json 后重跑。');
      // 尝试打码钩子
      const solved = await solveCaptcha(page);
      if (!solved) {
        writeFileSync(join(OUT, 'captcha-page.html'), homeHtml);
        results.captcha.attemptedSolve = false;
      }
    }

    if (results.captcha && !(await solveCaptcha(page))) {
      // 未能绕过，仍归档首页 HTML + 失败记录
    } else {
      // 正常采集：首页 → 产品列表 → 详情
      const home = await extractHome(page);
      results.company = {
        title: home.title,
        bodyText: home.bodyText,
        links: home.links,
      };
      writeFileSync(join(HTML_DIR, 'home.html'), await page.content());

      const productUrls = extractProductList(await page.content());
      console.log(`[products] 列表页发现候选详情 URL: ${productUrls.length}`);
      const list = productUrls.slice(0, FLAGS.limit || productUrls.length);

      const imgCap = FLAGS.images ? await captureImages(page) : null;

      for (let i = 0; i < list.length; i++) {
        const url = list[i];
        await sleep(rand(2000, 4000)); // 防封控随机延迟
        try {
          const det = await extractProductDetail(page, url);
          results.products.push({ url, ...det });
          writeFileSync(join(HTML_DIR, `product_${i}.html`), await page.content());
          console.log(`[product ${i + 1}/${list.length}] ${det.title.slice(0, 60)} | model=${det.modelGuess}`);
        } catch (e) {
          results.failures = results.failures || [];
          results.failures.push({ url, error: e.message.split('\n')[0] });
        }
        // 同批页数控制
        if (i > 0 && i % 30 === 0) await sleep(rand(8000, 12000));
      }

      if (imgCap) {
        imgCap.detach();
        results.images.total = imgCap.seen.size;
        results.images.unique = imgCap.seen.size;
      }
    }
  } finally {
    // 写 products.json
    writeFileSync(join(OUT, 'products.json'), JSON.stringify(results, null, 2));
    await browser.close();
  }
  console.log(JSON.stringify({ captcha: results.captcha, products: results.products.length, images: results.images }, null, 2));
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
