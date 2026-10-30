// md-negotiation (Phase 5) — Cloudflare Pages Functions middleware.
// Same URL: browsers get HTML; clients requesting text/markdown get Markdown.
// Only explicit `text/markdown` triggers negotiation; q=0 and wildcards never do.

const MANIFEST_PATH = '/_md/manifest.json';
let manifestPromise = null;

async function getManifest(env) {
  if (!manifestPromise) {
    manifestPromise = env.ASSETS
      .fetch(new URL(MANIFEST_PATH, 'https://carfilterspro.com'))
      .then((r) => {
        if (!r.ok) throw new Error(`manifest unavailable: ${r.status}`);
        return r.json();
      })
      .catch((e) => {
        manifestPromise = null; // allow retry on next request
        throw e;
      });
  }
  return manifestPromise;
}

// Parse Accept into { type: q } map. Parameters (charset etc.) are ignored;
// q values parsed from media-range parameters.
function parseAccept(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(',')) {
    const seg = part.trim().split(';');
    const type = seg[0].trim().toLowerCase();
    let q = 1;
    for (const s of seg.slice(1)) {
      const kv = s.trim().split('=');
      if (kv[0].trim().toLowerCase() === 'q') {
        const n = parseFloat(kv[1]);
        q = Number.isNaN(n) ? 1 : n;
      }
    }
    if (type) out[type] = Math.max(out[type] ?? 0, q);
  }
  return out;
}

// Deterministic policy: markdown is served only when the client explicitly
// names text/markdown with q > 0 and q >= q(text/html). On equal q, markdown
// wins (explicitly requesting markdown signals intent). q=0 → HTML.
function wantsMarkdown(acceptHeader) {
  const q = parseAccept(acceptHeader);
  const mdQ = q['text/markdown'];
  if (mdQ === undefined || mdQ <= 0) return false;
  const htmlQ = q['text/html'] ?? 0;
  return mdQ >= htmlQ;
}

function normalizePath(pathname) {
  // Never touch the filesystem; lookup keys come from the build-time manifest.
  if (pathname.endsWith('/')) return pathname;
  return pathname + '/';
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'GET' && request.method !== 'HEAD') return context.next();

  if (!wantsMarkdown(request.headers.get('Accept') || '')) return context.next();

  try {
    const manifest = await getManifest(env);
    const url = new URL(request.url);
    const key = normalizePath(url.pathname);
    const mdPath = manifest[key];
    if (!mdPath) return context.next(); // no markdown for this route → original HTML

    const asset = await env.ASSETS.fetch(new URL(mdPath, url.origin));
    if (!asset.ok) return context.next(); // missing asset → fall back to HTML

    return new Response(asset.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
        // Cache safety (Phase 6): HTML and Markdown share one URL. Until cache-key
        // behavior is verified on the deployment, negotiated responses are no-store.
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    // Any failure (manifest fetch, asset fetch) → original HTML, never an error page.
    return context.next();
  }
}
