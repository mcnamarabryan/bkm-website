# BKM Technology Solutions — Style Guide

The design system for the BKM Technology Solutions brand, as implemented in the
WordPress theme (`bkm-technology-solutions/`). This guide is the single source
of truth for anyone building or extending pages, posts, or the companion
DraftShield product UI.

> **How to read the values** — every hex, variable, and class name below comes
> directly from `assets/css/main.css` (tokens in `:root`) and `templates.css`.
> If a value is quoted here, it is what ships in the theme.

---

## 1. Brand

### Positioning

- **Company:** BKM Technology Solutions LLC — Charlotte, North Carolina; serving clients coast to coast.
- **Promise:** *"Stable · Secure · Growth."*
- **What we do:** custom applications, system integration, application maintenance, and data processing / ETL.
- **Voice:** plain, confident, engineering-led. Say what the system does; skip hype. Talk about the client's business, not our process.

### The logo — "triskelion"

The mark is a hexagonal triskelion: three interlocking chevron arms cut from a
hexagon ring, rotating clockwise out of a shared center. It is rendered as pure
SVG (`bkm_get_logo_mark()` in `inc/icons.php`) and stays crisp at any size.

| Variant | Mark + text | Used for |
| --- | --- | --- |
| **Mark only** | the triskelion alone | favicons, avatars, app tiles |
| **Compact** | mark + **BKM** / **TECHNOLOGY SOLUTIONS** | header (`.brand-lockup`) |
| **Full** | mark + BKM Technology Solutions LLC + tagline | footer brand block |

Wordmark rules — keep it correct:

- **Always** write the full name **"BKM Technology Solutions"** (the wordmark's
  sub-line is `Technology Solutions`, never just `Technology`).
- Do not recolor, rotate, stretch, or add drop shadows to the mark.
- The optional navy plate + green bloom may only be used together (nav/footer).

### DraftShield (product)

DraftShield is BKM's private, offline AI assistant. It borrows the same tokens
and components, with a privacy-first emphasis:

- Copy leads with **offline / private / on your hardware**.
- The only dark surface in the system is DraftShield's **navy gradient card**
  (`.ds-audience` / `.ds-navy`) — use `#2c2f73 → #1b1d52`.
- On dark navy, body text is `rgba(255,255,255,0.7)`; headings are `#fff`.

---

## 2. Color Palette

### Core tokens (from `assets/css/main.css`)

| Token | Hex | Role |
| --- | --- | --- |
| `--canvas` | `#F6F8FA` | Page background |
| `--paper` | `#FFFFFF` | Card / form surfaces |
| `--mist` | `#EDF1F6` | Subtle wells, code background |
| `--ink` | `#0B1220` | Headings, primary text |
| `--hairline` | `#E4E9F0` | Borders, dividers |

### Brand accents

| Token | Hex | Role |
| --- | --- | --- |
| `--brand` | `#2FA24C` | Primary action, links, focus |
| `--brand-light` | `#4CC46A` | Gradient highlight |
| `--brand-deep` | `#1B7A36` | Brand text on tint, hover |
| `--brand-tint` | `#EAF7EE` | Brand chip / highlight background |
| `--brand-soft` | `#D7EEDF` | Secondary brand background |

### Structure / secondary

| Token | Hex | Role |
| --- | --- | --- |
| `--navy` | `#22245F` | Structure, dark buttons, dark surface |
| `--navy-deep` | `#1B1D52` | Dark gradient end |
| `--navy-mid` | `#2C2F73` | Dark gradient start |
| `--navy-soft` | `#EEF0F8` | Navy chip background |
| `--navy-tint` | `#E3E6F3` | Deeper navy wash |
| `--jade` | `#0F766E` | Secondary accent (maintenance, ETL cards) |
| `--jade-deep` | `#115E59` | Jade text on tint |
| `--jade-tint` | `#E6F4F2` | Jade chip background |

### Text scale (grays)

| Token | Hex | Use |
| --- | --- | --- |
| `--steel` | `#475467` | Body text |
| `--steel-soft` | `#667085` | Secondary body text |
| `--steel-mute` | `#98A2B3` | Small labels, muted info |
| `--steel-faint` | `#C6CDD8` | Disabled, dividers, placeholders (with care) |

### Usage rules

- **Background is light** — the page canvas is `--canvas`; cards are `--paper`.
- **One dark surface allowed** — the DraftShield navy card only.
- **Action is green.** Buttons, links, focus rings, and active states use `--brand`.
- **Structure is navy.** Header CTA, footer anchor, pagination current page.
- Body copy must meet **4.5:1 contrast** on its background. Do not set body text
  in `--steel-faint`; reserve it for placeholders and non-essential meta.

### The signature text gradient

Headline emphasis uses the **green→navy italic serif** gradient
(`.text-gradient`):

```
linear-gradient(100deg, #1b7a36 0%, #2fa24c 40%, #22245f 100%)
```

Rules:

- Apply only to the serif italic accent word(s) in a heading (`.section-heading h2 em`).
- Never apply to whole sentences or body copy.
- On the navy DraftShield card, use the plain white text gradient for light surfaces instead of this token.

---

## 3. Typography

Three fonts, three jobs.

| Font | Fallback | Job |
| --- | --- | --- |
| **Inter** (300–700) | `system-ui` | All UI, body, buttons, headings |
| **Instrument Serif** (italic) | `Georgia` | Expressive emphasis — one italic word per heading only |
| **JetBrains Mono** (400–500) | `ui-monospace` | Eyebrows, labels, metadata, code, tags |

### Type scale (from the theme)

| Element | Size | Weight | Tracking | Notes |
| --- | --- | --- | --- | --- |
| Hero title `.hero-title` | 2.9 → 4.6rem | 600 | -0.03em | line-height 0.98 |
| Section heading `h2` | 2.35 → 3.4rem | 600 | -0.025em | line-height 1.05 |
| DraftShield title `.ds-title` | 2.6 → 3.4rem | 600 | -0.02em | line-height 1.02 |
| Card heading `h3` | 1.5rem | 600 | -0.015em | line-height 1.1 |
| Body `.section-heading > p` | 1.0625rem | 400 | — | line-height 1.7 |
| Small body | 13–14.5px | 400 | — | line-height 1.45–1.7 |
| Mono eyebrow `.eyebrow` | 11px | 400 | +0.24em | uppercase |
| Mono label `.label` | 10.5px | 400 | +0.18em | uppercase |

### Rules

- Headings: Inter 600, tight tracking (-0.02em base), line-height ≤1.1, color `--ink`.
- Body: line-height **1.6–1.7**, color `--steel`.
- The serif is an **accent**, never a workhorse. One italic word, in `--brand` family gradient.
- Mono means "system": eyebrows, labels, dates, file paths, tags. Keep uppercase + wide tracking.

---

## 4. Layout & Spacing

- **Grid:** 8px base unit. All spacing is a multiple of 8.
- **Shell:** `max-width: 78rem`, centered; gutter `1.25rem` (20px) → `2rem` (32px) at ≥640px.
- **Section:** vertical padding `6rem` (96px) → `8rem` (128px) at ≥640px.
- **Radii:** cards and panels `--radius` = `1.5rem` (24px); small chips/pills are `999px`; fields `0.75rem`.
- **Hairline dividers** `.hairline`: a 1px gradient line (`transparent → #dde3ec → transparent`) used between major sections.
- **Breakpoints:** 640 (sm), 768 (md), 1024 (lg). Mobile-first.

---

## 5. Components

### Buttons (`.btn-primary`, `.btn-navy`, `.btn-ghost`)

Shared anatomy: pill (`999px`), inline-flex, `0.875rem` / 600 weight, padding
`0.875rem 1.5rem`, hover lifts **-2px** with a deeper shadow.

| Variant | Look | Use |
| --- | --- | --- |
| `.btn-primary` | green gradient `#2fa24c → #1b7a36`, white text | main call to action |
| `.btn-navy` | navy gradient `#2c2f73 → #1b1d52`, white text | secondary/structural action |
| `.btn-ghost` | white bg, `--hairline` border, navy text | tertiary / quiet action |

Disabled: `opacity: 0.4`, `cursor: not-allowed`, no lift (see DraftShield's
"Coming soon" pill).

### Cards

- `.card-surface` — white, 1px `--hairline` border, soft shadow.
- Accent variants for service cards: `.accent-brand`, `.accent-navy`, `.accent-jade`
  (colored icon chip, hover border, matching bullet dots).
- Hover: lift to `--shadow-lift`, border to the accent color.

### Fields & forms

- `.field` — 14px, `0.75rem` radius, `--hairline` border, `--paper` bg.
- Focus: brand border + `0 0 0 4px rgba(47,162,76,0.1)` ring.
- `.label` — mono, 10.5px, uppercase, `--steel-mute`.
- Chips / interest pills (`.interest-pill` with `aria-pressed`): pill toggle picked = brand tint + brand border.
- Success state (`.contact-success`): brand tint panel with a green check circle.

### Header & navigation

- Fixed header, transparent at top → `.is-scrolled` = white `rgba(255,255,255,0.85)` + blur(20px) + `--hairline` bottom border.
- Height `4.5rem`; `.nav-link` gets a 2px brand underline on hover/active.
- Scroll progress: 1px gradient `--brand-deep → --brand → --jade`.
- Mobile: `.mobile-sheet` panel, backdrop blur, ESC closes.

### The hero "system console"

A signature motif: a white terminal card showing a pipeline
(Legacy System → Integration → Data/ETL → Custom App) with a live
`.is-active` highlight and a mono log block. Use it to communicate
engineering and process; do not replace it with generic stock imagery.

### Motion

| Pattern | Implementation |
| --- | --- |
| Scroll reveal | `.reveal` (0 opacity, translate3d 0/22px) → `.is-visible`; 0.8s cubic-bezier(0.16,1,0.3,1) |
| Hover lift | `translateY(-2px)` + `--shadow-lift` |
| Pulse ring | `@keyframes bkm-pulse-ring` (2.8s) — used on "live" dots |
| Marquee | `@keyframes bkm-marquee` (42s linear) — tech stack strip |

Reduced motion: the global `prefers-reduced-motion` block sets animation and
transition durations to ~0 and resolves reveals instantly. Always keep
functional states (hover, focus, open) visible *without* motion.

---

## 6. Accessibility (WCAG 2.1 AA)

- **Contrast:** body text `--steel` (#475467) on white/canvas passes 4.5:1. Headings `--ink` pass easily. Keep it that way.
- **Focus:** `:focus-visible` = 2px `--brand` outline, 3px offset, radius 6px. Every interactive element must show it.
- **Labels:** every field has a visible `.label` + `for`/`id`.
- **ARIA:** menu toggle uses `aria-expanded`; dialog uses `role="dialog"` + `aria-modal`; pills use `aria-pressed`; progressbars/live regions as appropriate.
- **Skip link:** first element in `<body>` ("Skip to content").
- **Touch targets:** interactive elements ≥ 44px (40px icon buttons, 44px+ pills).
- **Keyboard:** menu closes on ESC and restores focus; dialog traps focus and returns it.

---

## 7. Copy & Content

- **Tone:** "We build custom solutions that fit your exact requirements." Direct, specific, plain.
- **Do** lead with the client's outcome; name the actual technology (C#, Laravel, ETL, RAG).
- **Don't** use stock-photo hero imagery, emoji, or filler adjectives.
- **DraftShield:** always include privacy + "fully offline"; append the disclaimer:
  > *DraftShield is in development. Capabilities described here reflect the intended product and may change before release.*

---

## 8. Platform mapping

| Concept | React / Tailwind (`tailwind.config.js`) | WordPress (`main.css :root`) |
| --- | --- | --- |
| Background | `canvas: #F6F8FA` | `--canvas: #f6f8fa` |
| Ink | `ink: #0B1220` | `--ink: #0b1220` |
| Brand | `brand.DEFAULT: #2FA24C` | `--brand: #2fa24c` |
| Navy | `navy.DEFAULT: #22245F` | `--navy: #22245f` |
| Jade | `jade.DEFAULT: #0F766E` | `--jade: #0f766e` |
| Radii | `rounded-3xl` (1.5rem) | `--radius: 1.5rem` |
| Shadow lift | `shadow-lift` | `--shadow-lift` |

Change tokens in both places so the marketing site and the WordPress theme stay
in lockstep. The DraftShield desktop app should consume the same palette.

---

*Maintained alongside `assets/css/main.css`, `assets/css/templates.css` and the
React build in the repository root. If this guide and the code disagree, the
code is the implementation and this file should be updated.*
