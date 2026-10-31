# Graystone-Homes-Website-

Website for **The Graystone Homes** — modern rental and property management in South Africa.
Built with React, Vite, React Router and Framer Motion, with light and dark modes.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploy on Cloudflare Pages

Connect this repository in Cloudflare Pages and use:

| Setting                | Value           |
| ---------------------- | --------------- |
| Framework preset       | Vite            |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Node version           | 22 (from `.nvmrc`) |

`public/_redirects` sends every route to `index.html`, so pages like `/about` and `/contact` work on refresh.

## Editing content

Contact details, stats, navigation links and images live in `src/config/site.js`.
Logos are imported directly from `The Graystone Homes_LOGO/`.
