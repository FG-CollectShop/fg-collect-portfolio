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
