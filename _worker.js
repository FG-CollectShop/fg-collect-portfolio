// Cloudflare Pages Function — HTTP Basic Auth gate for the entire site.
//
// Every request is intercepted. Missing / wrong credentials → 401 with a
// browser prompt. Correct credentials → the request is forwarded to the
// static asset store (env.ASSETS) which serves index.html and any other files.
//
// Configuration (set in Cloudflare Pages project → Settings → Environment
// variables → Production):
//   PORTFOLIO_PASSWORD  (secret, required)  — the password to share
//   PORTFOLIO_USER      (plaintext, optional) — defaults to "portfolio"
//
// If PORTFOLIO_PASSWORD is unset, the site opens with a warning banner
// instead of 401ing everyone — makes the "I forgot to set the secret"
// misconfig discoverable instead of silently locking us out.

const REALM = 'FG-CollectShop Portfolio';

export default {
  async fetch(request, env) {
    const expectedPassword = env.PORTFOLIO_PASSWORD;
    if (!expectedPassword) {
      const resp = await env.ASSETS.fetch(request);
      // Only patch HTML responses — leave images/JSON alone.
      const type = resp.headers.get('content-type') || '';
      if (!type.includes('text/html')) return resp;
      const html = await resp.text();
      const banner = `<div style="background:#f85149;color:#fff;padding:12px;text-align:center;font-family:sans-serif;font-size:14px;">
        ⚠️ PORTFOLIO_PASSWORD env var is not set in Cloudflare Pages — this site is currently PUBLIC.
      </div>`;
      return new Response(html.replace('<body>', '<body>' + banner), {
        status: resp.status,
        headers: resp.headers,
      });
    }

    const expectedUser = env.PORTFOLIO_USER || 'portfolio';
    const header = request.headers.get('Authorization') || '';
    const [scheme, encoded] = header.split(' ');

    let ok = false;
    if (scheme === 'Basic' && encoded) {
      try {
        const [user, pass] = atob(encoded).split(':');
        ok = user === expectedUser && pass === expectedPassword;
      } catch { /* malformed base64 → fall through */ }
    }

    if (!ok) {
      return new Response('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
          'Content-Type': 'text/plain',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
