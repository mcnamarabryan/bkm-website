# BKM Technology Solutions — WordPress theme

Upload-ready theme package: **`bkm-technology-solutions.zip`** (27 files, ~44 KB)

---

## Get the file

**Fastest way:** with the preview running, download it straight from the dev server:

```
http://localhost:5173/bkm-theme.zip
```

(That link serves `wp-theme/bkm-technology-solutions.zip` with the correct
`.zip` filename, so your browser saves it ready to upload.)

You can also grab it from the project tree at
`wp-theme/bkm-technology-solutions.zip`.

---

## Installing on EasyWP

EasyWP gives you a full WordPress admin, so the normal theme uploader works.

1. Log in to your EasyWP dashboard and open your site.
2. Click **WP Admin** (this opens `yourdomain.com/wp-admin`).
3. In the left menu go to **Appearance → Themes**.
4. Click **Add New** (top of the page), then **Upload Theme**.
5. Choose `bkm-technology-solutions.zip` and click **Install Now**.
6. When it finishes, click **Activate**.

> If the uploader rejects the file for a size limit, use the EasyWP **File Manager**
> (or SFTP) instead: extract nothing — just upload the `.zip` into
> `wp-content/themes/`, then extract it there so you end up with
> `wp-content/themes/bkm-technology-solutions/`. Then activate under
> **Appearance → Themes**.

### After activating

| Step | Where | What to do |
|------|-------|------------|
| Set the front page | **Settings → Reading** | "Your homepage displays" → **A static page**. Create a page (e.g. *Home*) with the default template and select it. `front-page.php` renders the full marketing site. |
| Set your email | **Appearance → Customize → BKM Site Details** | Contact form recipient, location, tagline, hero lead-in. Defaults to `admin@bkm-tech.com`. |
| Optional menu | **Appearance → Menus** | Without a menu, the built-in anchor nav is used automatically (`#services`, `#draftshield`, `#about`, `#stack`, `#contact`). |

The contact form emails the address set in the Customizer. It uses `wp_mail()`,
so confirm your host can send mail — EasyWP may require an SMTP plugin
(e.g. WP Mail SMTP) for reliable delivery.

---

## What's in the theme

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
├── assets/css/templates.css  Compatibility layer (see note)
└── assets/js/theme.js        No-dependency behaviour
```

No build step. No npm. No compiled assets.

### Note on `assets/css/templates.css`

`main.css` was ported from the original React/Tailwind build, so a handful of
template class names differ from it (`field-row` vs `form-row`,
`interest-pills` vs `form-chips`, `about-steps` vs `pillar-list`, etc.).
`templates.css` maps every drifted class onto the same visual rules and loads
after `main.css`. It also carries the WordPress-specific markup that `main.css`
never covered: core comment threads and the comment form, the contact form's
error state, the required-field marker, and the default search form.

### Caching

EasyWP caches static files aggressively. Asset URLs are versioned by file
modification time (`bkm_asset_version()` in `functions.php`), so a fresh deploy
produces new URLs and visitors do not get stale CSS.

If you change CSS and still see the old styles, purge the EasyWP cache once.

---

## Rebuilding and checking the zip

From the repo root:

```bash
npm run theme:package
```

That rebuilds the archive and then runs every check:

```bash
npm run theme:build          # rebuild the zip only
npm run theme:check-css      # every template class has a CSS rule
npm run theme:check-tokens   # every var(--token) is declared
npm run theme:lint-php       # PHP structure: braces, strings, <?php tags
npm run theme:verify         # zip integrity + PHP cross-references
```

Writes `wp-theme/bkm-technology-solutions.zip`. The `scripts/` folder is
excluded from the archive automatically.

Why a custom PHP check: this environment has no `php` binary, so `php -l` cannot
run. `theme:lint-php` tokenises each file closely enough to catch the mistakes
that actually break a theme on activation — unbalanced braces, unterminated
strings/comments, and a missing `<?php` opener.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| "The package could not be installed. No valid themes found." | Zip root contains files directly instead of one theme folder | Rebuild with `npm run theme:theme:build` — the builder always wraps in `bkm-technology-solutions/` |
| Theme activates but looks plain | `main.css`/`templates.css` blocked or cached | Purge EasyWP cache; confirm the theme URL loads `assets/css/main.css` |
| Homepage is the blog list | No static front page set | **Settings → Reading** → static page |
| Contact form says it could not send | `wp_mail()` blocked by host | Install WP Mail SMTP and configure |
| Blank white page after activation | A fatal PHP error | Check **Appearance → Themes** to switch back, then see the host's PHP error log |
