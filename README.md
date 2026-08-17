# fg-collect-portfolio

Public read-only view of the FG-CollectShop manifest, served at
[portfolio.futuregadgetlabs.com](https://portfolio.futuregadgetlabs.com).

Single `index.html` — vanilla JS, no build step. Fetches from the public
API endpoints exposed by `fg-collect-core`:

- `GET /api/v1/public/portfolio/summary`
- `GET /api/v1/public/portfolio/inventory`
- `GET /api/v1/public/portfolio/analytics`

## Deploy

Cloudflare Pages, connected to this repo. Custom domain: `portfolio.futuregadgetlabs.com`.

Build settings: none (static). Output directory: `/`.

The API host (`api.futuregadgetlabs.com`) must have `PORTFOLIO_ORIGIN=https://portfolio.futuregadgetlabs.com`
in its env so CORS lets this page through.

## Access control

`_worker.js` gates every request with HTTP Basic Auth via a Cloudflare Pages
Function. Configure in Pages project → **Settings → Environment variables**:

| Name | Type | Required | Notes |
|---|---|---|---|
| `PORTFOLIO_PASSWORD` | Encrypted (secret) | Yes | The password to share with viewers |
| `PORTFOLIO_USER`     | Plaintext           | No  | Defaults to `portfolio`             |

If `PORTFOLIO_PASSWORD` is unset the site loads with a red warning banner
instead of leaking — so a misconfigured deploy is loud, not silent. To
change the password, update the secret and redeploy (Pages picks up new
values on the next build; a re-deploy of the latest commit is enough).
