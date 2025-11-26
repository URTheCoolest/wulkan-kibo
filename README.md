# Wulkan Kibo (static scaffold)
**Project Overview**

- **Type**: Static HTML website (hand-authored pages, CSS and JavaScript).
- **Deployment config**: `vercel.json` is present and configured to serve `public/**` using `@vercel/static` (see **Build / Deployment** below for implications).

This repository contains a small static website for "Wulkan Kibo" — a collection of HTML recipe pages, a shared stylesheet and a site-wide JS file that powers navigation, search, filters, and a demo contact form.

**File Outline**

- **`vercel.json`**: Vercel configuration. Specifies `"builds": [{ "src": "public/**", "use": "@vercel/static" }]` meaning Vercel will serve files under `public/` as a static site.
- **`robots.txt`**: Search engine robots settings and a `Sitemap:` reference pointing at the deployed Vercel domain.
- **`sitemap.xml`**: Sitemap listing the main site URLs (absolute URLs pointing to a Vercel app). Useful for SEO.
- **`LICENSE`**: MIT license for the repository.
- **`.gitignore`** / **`.gitattributes`**: Git helpers (ignore rules and attributes).

**Top-level HTML Pages**

- **`index.html`**: Home / landing page. Contains hero, featured recipes, search box, navigation, hero CTA buttons, video modal markup, and includes `assets/css/styles.css` and `assets/js/main.js`.
- **`about.html`**: About page with mission, features, and a team section (references team images in `assets/images/team/`).
- **`contact.html`**: Contact page with a demo contact form (client-side handling in `assets/js/main.js`) and notes about using Formspree or a serverless endpoint.

**Recipes Directory (`recipes/`)**

- **`recipes/index.html`**: Recipes listing page — search input, filter tags, client-side pagination placeholder, and recipe cards linking to individual recipe pages.
- **`recipes/african-jollof.html`**: Recipe detail for African Jollof Rice. Includes JSON-LD structured data (`<script type="application/ld+json">`), ingredients, steps, video embed (YouTube fallback), and tips.
- **`recipes/peanut-stew.html`**: Recipe detail for West African Peanut Stew. Includes structured data, video embed, and full instructions.
- **`recipes/plantain-fritters.html`**: Recipe detail for Plantain Fritters (Kelewele). Same structure as the other recipe pages.

**Assets**

- **`assets/css/styles.css`**: Main stylesheet (large, production-ready CSS). Contains theme variables, responsive layout rules, components (hero, nav, recipe cards, forms, modal, team, etc.), print styles, and reduced-motion support.
- **`assets/js/main.js`**: Main JavaScript file that:
	- Manages theme toggle and persists choice in `localStorage`.
	- Handles mobile navigation toggle.
	- Implements debounced search on the home and recipe listing pages.
	- Implements client-side tag filtering and simple client-side pagination.
	- Provides video modal open/close and YouTube iframe insertion.
	- Provides a demo contact form submission flow (simulated success) and instructions for integrating Formspree or a serverless endpoint.
	- Includes a development helper `generateSitemap()` and exposes it to `window`.
- **`assets/icons/`**
	- **`favicon.svg`**: Scalable favicon used in pages. An optional `favicon.png` is referenced in some pages (check presence).
- **`assets/images/`**
	- Various recipe thumbnails and hero images such as `jollof-thumb.png`, `jollof-thumb-2.png`, `peanut-thumb.png`, `peanut-thumb-2.png`, `plantain-thumb.png` and others.
	- **`assets/images/team/`**: Team member photos referenced on the About page (`jarod.jpg`, `josiah.jpg`, `iga.jpg`, etc.).

**Public Directory (`public/`)**

- The workspace also includes a `public/` directory with a parallel `assets/` copy (e.g. `public/assets/css/styles.css`). The Vercel config targets `public/**` for deployment. This repository currently contains site pages at the repository root (not under `public/`), which affects deployment (see below).

**Config & Meta Files**

- **`manifest.json`**: Referenced from `index.html` (`<link rel="manifest" href="manifest.json">`) — I did not find a `manifest.json` file in the repo. If you need PWA support, add `manifest.json` to the root or `public/`.
- **`sitemap.xml`**: Exists at repo root and lists site URLs. Update the `<loc>` entries to match your final domain.
- **`robots.txt`**: Allows all crawlers and points to the sitemap hosted on the Vercel domain.

**Build / Deployment Notes**

- The site is a static site (no server-side framework like Next.js detected). All pages are pre-written HTML files.
- `vercel.json` currently uses `@vercel/static` with `src: "public/**"`. This means only files placed under `public/` will be served by Vercel when using that config. Two common options:
	- Move or copy your HTML files and assets into `public/` (mirror the repo root pages into `public/`) so Vercel serves them as-is.
	- Or update `vercel.json` to change the `src` or use a different target (for example, remove `builds` so Vercel serves the repository root, or change to `src: "**"` depending on your needs).
- If you want a simple deploy of the current layout without moving files, remove or edit `vercel.json` so Vercel's default static configuration serves the repo root.

**SEO & Accessibility**

- Pages include meta tags for SEO, Open Graph, and Twitter cards.
- Recipe pages include JSON-LD `Recipe` structured data to improve rich results in search.
- Accessibility considerations present: skip links, aria attributes, focus handling in modal, accessible form labels.

**License**

- The repository uses the MIT License (`LICENSE` file). Check and update author/copyright lines if required.

**Recommended Next Steps**

- Decide how you want to deploy on Vercel: move site files into `public/` or update `vercel.json`.
- Add `manifest.json` if you plan to use PWA features (or remove the link if not needed).
- Double-check image references (some pages reference `favicon.png` or `/assets/videos/` fallbacks that may not exist).
- If you want to make the recipes data-driven, consider converting the `recipes/` pages to a small static generator or a JSON-driven client-side renderer.

---

If you'd like, I can now:
- Move the top-level HTML files into `public/` and update internal paths so the current `vercel.json` works as-is, or
- Update `vercel.json` to serve root files instead of `public/**`, or
- Generate a more concise site map or missing `manifest.json` for you.

Tell me which of the next steps you'd like me to run and I'll proceed.

**Repository File Tree**

```
wulkan-kibo/
├─ about.html
├─ contact.html
├─ index.html
├─ LICENSE
├─ README.md
├─ robots.txt
├─ sitemap.xml
├─ vercel.json
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ icons/
│  │  ├─ favicon.svg
│  │  ├─ volcano.svg
│  │  └─ README.md
│  ├─ images/
│  │  ├─ hero.jpg
│  │  ├─ jollof-thumb.png
│  │  ├─ jollof-thumb-2.png
│  │  ├─ peanut-thumb.png
│  │  ├─ peanut-thumb-2.png
│  │  ├─ plantain-thumb.png
│  │  └─ team/
│  │     ├─ iga.jpg
│  │     ├─ ignacy.jpg
│  │     ├─ nina.jpg
│  │     └─ roman.jpg
│  └─ js/
│     └─ main.js
└─ recipes/
	├─ index.html
	├─ african-jollof.html
	├─ peanut-stew.html
	└─ plantain-fritters.html

```

Note: The tree above reflects the repository layout as-of this inspection and flags the `manifest.json` reference that appears to be missing. If you want exact byte-for-byte verification or a generated tree file (`TREE.md`), I can create that next.

