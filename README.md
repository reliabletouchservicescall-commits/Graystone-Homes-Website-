# Graystone-Homes-Website-

Website for **The Graystone Homes** — modern rental and property management in South Africa.
Built with React, Vite, React Router and Framer Motion, with light and dark modes.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploy on Cloudflare

The site deploys as a Cloudflare Worker with static assets, configured in `wrangler.jsonc`.

| Setting        | Value                 |
| -------------- | --------------------- |
| Build command  | `npm run build` (optional — wrangler also runs it) |
| Deploy command | `npx wrangler deploy` |
| Node version   | 22 (from `.nvmrc`)    |

`not_found_handling: "single-page-application"` in `wrangler.jsonc` serves `index.html` for routes
like `/about` and `/contact`, so they work on refresh. Do not add a `_redirects` file — Workers
rejects the SPA catch-all rule as an infinite loop.

## Editing content

Contact details, stats, navigation links and images live in `src/config/site.js`.
Logos are imported directly from `The Graystone Homes_LOGO/`.
