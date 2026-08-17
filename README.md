# fg-collect-portfolio

Public read-only view of the FG-CollectShop manifest, served at
[tcg-portfolio.futuregadgetlabs.com](https://tcg-portfolio.futuregadgetlabs.com).

Single `index.html` — vanilla JS, no build step. Fetches from the public
API endpoints exposed by `fg-collect-core`:

- `GET /api/v1/public/portfolio/summary`
- `GET /api/v1/public/portfolio/inventory`
- `GET /api/v1/public/portfolio/analytics`

## Deploy

GitHub Pages, published by `.github/workflows/deploy.yml` on every push to `main`.
Custom domain `tcg-portfolio.futuregadgetlabs.com` is configured via the `CNAME`
file at the repo root.

The API host (`api.futuregadgetlabs.com`) must have
`PORTFOLIO_ORIGIN=https://tcg-portfolio.futuregadgetlabs.com` in its env
so CORS lets this page through.

## DNS

Cloudflare DNS: `CNAME tcg-portfolio → fg-collectshop.github.io` (proxied off).
