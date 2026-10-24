# BKM Technology Solutions

Marketing site and production WordPress theme for a Charlotte, NC technology consultancy — custom applications, system integration, application maintenance, and data processing/ETL for clients coast to coast.

The site also features **DraftShield**, BKM's private, fully-offline AI assistant for legal professionals.

Two deliverables live in this repository:

1. **A Vite + React site** — the live preview, used for design and content development.
2. **A production WordPress theme** at `wp-theme/`, packaged as an upload-ready `.zip` for EasyWP.

Both share the same design system: light canvas, navy structure, brand green for action, and Instrument Serif italic for emphasis.

---

## Quick start

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

> The `/bkm-theme.zip` download route only exists while the dev server is running — it is a Vite middleware, not a deployed endpoint.

---

## Download the WordPress theme

### From the running preview

```
http://localhost:5173/bkm-theme.zip
```

Served with `Content-Disposition: attachment`, so the browser saves it as `bkm-technology-solutions.zip`. Verified by `scripts/verify-download.mjs` (status, content type, byte length, zip signatures).

### From the file tree

The built archive is at:

```
wp-theme/bkm-technology-solutions.zip
```

### Do not use "Export project"

That zips the **entire** repository — React source, `node_modules`, build scripts. WordPress will reject it. The theme archive must contain exactly one folder at its root, which is what the builder produces.

---

## Repository layout

```
.
├── index.html                 Vite entry
├── src/                       React marketing site
│   ├── components/            Page sections (Hero, Services, Stack, …)
│   ├── data/site.ts           All copy and content, single source
│   ├── hooks/useMotion.ts     Reveal, scroll, active-section, tilt
│   └── index.css              Tailwind layers + design tokens
├── scripts/                   Verification and audit tooling
└── wp-theme/
    ├── bkm-technology-solutions/   The theme itself
    ├── bkm-technology-solutions.zip   Built, upload-ready archive
    └── INSTALL.md                  WordPress installation guide
```

### The theme, in detail

```
bkm-technology-solutions/
├── style.css                 Theme header (required by WordPress)
├── functions.php             Setup, asset loading, cache-busting, icons
├── index.php                 Required fallback / blog index
├── front-page.php            Marketing homepage
├── header.php  footer.php    Shared chrome, privacy dialog
├── page.php  single.php      Page and post templates
├── archive.php  search.php   404.php  comments.php
├── template-parts/           Homepage sections + post card
├── inc/                      Content, icons, customizer, contact handler
├── assets/css/main.css       Design system
├── assets/css/templates.css  Compatibility layer
└── assets/js/theme.js        No-dependency behaviour
```

No build step, no npm, no compiled assets inside the theme. `templates.css` maps the PHP templates' class names onto `main.css` rules — see [INSTALL.md](wp-theme/INSTALL.md) for why.

---

## Packaging the theme

```bash
npm run theme:package
```

Rebuilds the archive, then runs every check:

| Script | Verifies |
|---|---|
| `npm run theme:build` | Rebuild `bkm-technology-solutions.zip` |
| `npm run theme:check-css` | Every template class has a CSS rule |
| `npm run theme:check-tokens` | Every `var(--token)` is declared |
| `npm run theme:lint-php` | PHP structure: braces, strings, `<?php` openers |
| `npm run theme:verify` | Zip integrity + PHP cross-references |

Current state: **27 files, ~44 KB, all checks passing.**

The archive is written by `wp-theme/bkm-technology-solutions/scripts/build-zip.mjs` using only Node's standard library — no `zip` binary is available here, so the script emits the DEFLATE container itself.

---

## Site verification scripts

| Script | Purpose |
|---|---|
| `node scripts/verify-serve.mjs` | Each module transforms without a compile error |
| `node scripts/verify-modules.mjs` | Every route returns 200 with no Vite error body |
| `node scripts/verify-download.mjs` | `/bkm-theme.zip` is a genuine, valid download |
| `node scripts/verify-theme-zip.mjs` | Archive container, layout, and PHP cross-references |
| `node scripts/audit-theme.mjs` | No stale dark-theme or undefined color tokens |
| `node scripts/scan-opacity.mjs` | Invalid Tailwind opacity utilities |

Run the site checks **while the dev server is up**. The theme checks are standalone.

Two one-off helpers are also present: `fix-opacity.mjs` (rewrites invalid opacity values) and `gen-logo.mjs` (derives the triskelion geometry).

---

## Design system

| Token | Value | Role |
|---|---|---|
| `canvas` | `#F6F8FA` | Page background |
| `paper` | `#FFFFFF` | Card surfaces |
| `ink` | `#0B1220` | Headings |
| `navy` | `#22245F` | Structure, dark surfaces |
| `brand` | `#2FA24C` | Primary action |
| `jade` | `#0F766E` | Secondary accent |
| `steel` | `#475467` | Body text |

Type: **Inter** for UI, **Instrument Serif** italic for emphasis, **JetBrains Mono** for labels and metadata.

Accessibility is treated as a requirement, not a polish step: 4.5:1 minimum contrast, visible focus rings on every interactive element, skip links, ARIA state on toggles and dialogs, and full `prefers-reduced-motion` support (reveals resolve to their final state rather than animating).

---

## Installing on WordPress

Short version — full instructions in [wp-theme/INSTALL.md](wp-theme/INSTALL.md):

1. **Appearance → Themes → Add New → Upload Theme**
2. Choose `bkm-technology-solutions.zip` → **Install Now** → **Activate**
3. **Settings → Reading** → set a static front page (this is what loads `front-page.php`)
4. **Appearance → Customize → BKM Site Details** → set the contact email

The contact form posts to `admin-post.php`, so it works without JavaScript. It uses `wp_mail()`, which some hosts block — install an SMTP plugin if delivery fails.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "No valid themes found" on upload | Zip root has files directly instead of one folder | Rebuild with `npm run theme:build` |
| Theme active but unstyled | CSS blocked or cached | Purge EasyWP cache; confirm `assets/css/main.css` loads |
| Homepage shows the blog | No static front page set | **Settings → Reading** |
| Contact form cannot send | `wp_mail()` blocked by host | Install WP Mail SMTP |
| Blank page after activation | Fatal PHP error | Switch theme via **Appearance → Themes**, check host PHP log |
| `/bkm-theme.zip` returns 404 | Dev server not running | `npm run dev` |
