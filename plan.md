# Power Tech Consultants & SSPTPL — Project Plan & Work Log

> Single source of truth for the corporate website of **Power Tech Consultants (PTC)** and
> **Swain & Sons Power Tech Pvt. Ltd. (SSPTPL)**. Covers the objective, architecture, full
> file structure, the background animation engine, every piece of work done so far, and how
> to verify changes.

---

## 1. Objective

Build a **fully static** corporate website that:

- Represents two allied power/energy/engineering companies (PTC + SSPTPL) under one brand.
- Opens by **double-clicking `dist/index.html` over `file://`** — **no server required**.
- Ships a premium, on-brand background animation on **every page**: a centered, 3D-rotating
  **atomic / nuclear power model** (16 edge "neutrons", each with orbiting electrons & protons,
  glowing spikes, and energy released across the whole page).
- Has rich content: 16 service categories with full detail pages, a large "Projects Handled"
  catalogue, clients, resources, careers, contact, feedback.
- Is production-safe: degrades by device, respects `prefers-reduced-motion`, and never lets a
  UI bug blank the page.

### Hard constraints (non-negotiable)
- **No runtime dependencies.** Build uses only Node built-ins.
- **No ES modules at runtime.** The bundle is a single classic IIFE (`dist/js/app.js`) so
  `file://` (which blocks `type="module"` CORS) works.
- **Node only** for the build step. The *user* never runs a server — they only double-click.

---

## 2. Tech Stack

| Concern        | Choice |
|----------------|--------|
| Markup         | Plain HTML5 (generated from JS template functions at build time) |
| Styles         | Plain CSS, 13 concatenated "parts" → `dist/css/styles.css` |
| Runtime JS     | Vanilla JS, bundled into one classic IIFE (`app.js`) |
| Animation      | Canvas 2D (no WebGL / no libraries) |
| Fonts          | Google Fonts `Manrope` + `Sora` (system-font fallback if offline) |
| Build          | `build.mjs` (Node, zero deps) |
| Data           | Plain JS modules (`src/data/*.js`) |
| SEO            | JSON-LD, `sitemap.xml`, `robots.txt`, canonical/OG/meta per page |

No bundler (webpack/vite), no framework (React/Vue), no CSS preprocessor. Intentionally kept
dependency-free so the output is bullet-proof and the build never breaks from a stale lockfile.

---

## 3. Design Language

### Brand
- **Name:** POWER TECH — *PTC · SSPTPL*
- **Tagline:** Power / Energy / Engineering / Technology
- **Brand mark:** lightning bolt SVG with a blue→amber diagonal gradient (`#2563eb` → `#f59e0b`).

### Color system (animation palette — `energyField.js`)
Deeper, saturated tones chosen because bright tints **wash out on a white page**:

```
PALETTE = [
  [37, 99, 235],   // electric blue
  [14, 165, 190],  // cyan
  [13, 148, 136],  // aqua / teal
  [22, 163, 74],   // green
  [124, 58, 237],  // violet
  [219, 39, 119],  // magenta
  [217, 119, 6],   // warm amber  (used for PROTONS)
]
```

### Motion tokens — `src/js/config/tokens.js`
Centralized durations, easings (`outExpo`, `outQuint`, `inOutQuart`, `spring`…), distances,
scales, reveal thresholds. Every animation reads from `MOTION`. Per-page "story" themes
(`ecosystem`, `journey`, `network`, `flow`, `cinematic`, `human`, `connection`, `completion`)
drive `page-stories.js` reveals.

### Visual layering (stacking)
```
body              → white background
.bg-anim          → position:fixed; inset:0; z-index:-1; pointer-events:none
  <canvas>        → paints the energy field, behind all content
content (cards)   → normal flow; frosted-glass (backdrop-filter) blurs the canvas behind them
```
This gives the "energy behind glass" look while keeping text readable.

---

## 4. Project Structure

```
pwrtchweb/
├─ build.mjs                 # Static build pipeline (zero deps)
├─ serve.mjs                 # Optional tiny static server (npm run serve)
├─ package.json              # scripts: build / serve / serve:static
├─ plan.md                   # THIS file
├─ src/
│  ├─ assets/
│  │  ├─ favicon.svg
│  │  └─ og-image.svg
│  ├─ css/
│  │  └─ parts/              # 13 CSS files concatenated (in build order)
│  │     ├─ base.css         # reset, typography, layout primitives, variables
│  │     ├─ nav-footer.css
│  │     ├─ hero.css
│  │     ├─ sections.css
│  │     ├─ cards.css
│  │     ├─ pages.css
│  │     ├─ motion.css
│  │     ├─ motion-system.css
│  │     ├─ page-stories.css
│  │     ├─ visualizations.css
│  │     ├─ 3d.css
│  │     ├─ marquee-preloader.css
│  │     └─ bg-anim.css      # .bg-anim stage + 50% glass cards + reduced-motion
│  ├─ components/
│  │  ├─ layout.js           # head(), header(), footer(), page() shell, JSON-LD, breadcrumbs
│  │  ├─ markup.js           # helpers: escapeHtml, brandMarkSVG, serviceSlug, companyBadge, mediaPlaceholder
│  │  ├─ sections.js         # bgOctagon(), hero(), pageHero(), feature/CTA sections
│  │  ├─ cards.js            # card builders (service, project, client, profile…)
│  │  └─ visualizations.js   # footerNetwork() SVG
│  ├─ data/
│  │  ├─ company.js          # dual-company facts
│  │  ├─ services.js         # 16 service entries (→ 16 detail pages)
│  │  ├─ projects.js         # large "Projects Handled" catalogue (→ ~121 detail pages)
│  │  ├─ clients.js
│  │  └─ resources.js
│  ├─ js/
│  │  ├─ boot.js             # entry point (runs on every page)
│  │  ├─ anim/
│  │  │  └─ energyField.js   # ★ the background animation engine (see §9)
│  │  ├─ config/
│  │  │  └─ tokens.js        # MOTION + PAGE_THEMES
│  │  ├─ core/
│  │  │  ├─ utils.js         # $, $$, helpers
│  │  │  ├─ motion-system.js # IntersectionObserver reveal engine
│  │  │  ├─ nav.js           # mobile nav toggle
│  │  │  ├─ forms.js         # form validation
│  │  │  ├─ filter.js        # service/project filtering
│  │  │  ├─ page-stories.js  # per-page reveal choreography
│  │  │  ├─ scroll-fx.js     # scroll progress, parallax
│  │  │  └─ tilt.js          # pointer tilt on cards
│  │  └─ (pages below render body HTML)
│  └─ pages/
│     ├─ home.js
│     ├─ about.js
│     ├─ services.js         # 16-category list + "Read more" links
│     ├─ service-detail.js   # buildServiceDetailPages() → 16 pages
│     ├─ projects.js
│     ├─ project-detail.js   # buildProjectDetailPages() → ~121 pages
│     ├─ clients.js
│     ├─ career.js
│     ├─ contact.js
│     ├─ feedback.js
│     └─ resources.js
└─ dist/                     # BUILD OUTPUT (generated, do not edit by hand)
   ├─ index.html … (147 pages)
   ├─ css/styles.css
   ├─ js/app.js
   ├─ assets/
   ├─ sitemap.xml
   └─ robots.txt
```

### Build output composition (147 pages)
- **9 primary pages:** `index`, `about`, `services`, `projects`, `clients`, `career`,
  `contact`, `feedback`, `resources`.
- **16 service detail pages** generated from `services.js` (one per service).
- **~121 project detail pages** generated from `projects.js`.
- **`404.html`** friendly error page.
- Plus `sitemap.xml`, `robots.txt`, and copied `assets/`.

---

## 5. Build & Run

```bash
# From repo root (Node 24+)
node build.mjs                 # → rebuilds dist/ (147 pages, css, js, sitemap, robots)
npm run build                  # same
npm run serve                  # build + start serve.mjs (optional local server)
npm run serve:static          # serve existing dist/ only
```

**To view the site (user workflow):** just **double-click `dist/index.html`** (works over
`file://`). No server needed.

### How the build works (`build.mjs`)
1. Reads the 13 CSS parts, concatenates → `dist/css/styles.css`.
2. `bundleRuntime()` walks `src/js`, transforms each ESM file into a CommonJS-style
   `function(module, exports, require){…}` wrapper, and stitches them into a single IIFE
   `(function(){ … __require("boot.js"); })()` → `dist/js/app.js`. This keeps the module
   graph intact while being `file://`-safe (no module CORS).
3. For each page in `PAGES`, calls `mod.default()` for the body, wraps it in `page({…})`, and
   writes HTML. Links are first made root-relative (`absolutize`) then converted to
   page-relative (`toRelative`) so the site works both served and via `file://`.
4. Generates detail pages (services + projects), the 404 page, and `sitemap.xml`/`robots.txt`.

---

## 6. Pages & Navigation

**Primary nav** (`layout.js → NAV`):
Home · Services · About Us · Projects Handled · Clients · Resources · Career · Contact Us · Feedback

**Breadcrumbs:** per-page trail in `TRAILS`, emitted as `BreadcrumbList` JSON-LD.

**SEO per page:** `<title>`, description, canonical, OpenGraph/Twitter, theme-color, and one or
more JSON-LD blocks:
- `orgJsonLd()` (Organization) — on home.
- `breadcrumbJsonLd()` — every page.
- `serviceJsonLd()` / `projectJsonLd()` / `contactJsonLd()` — detail pages.

---

## 7. Components & Runtime Modules

- **layout.js** — `head()`, `header()`, `footer()`, `page()` (the HTML shell),
  `orgJsonLd`, `breadcrumbJsonLd`, `serviceJsonLd`, `projectJsonLd`, `contactJsonLd`.
  `page()` injects `bgOctagon()` on **every** page and sets `<body data-anim="on">`.
- **markup.js** — pure helpers incl. **`serviceSlug(title)`** (lowercase, non-alphanumerics →
  `-`) which links the services list to its detail page.
- **sections.js** — `bgOctagon()` returns
  `<div class="bg-anim" data-intensity="bold|soft"><canvas id="energyCanvas"></canvas></div>`;
  also `hero()` / `pageHero()`.
- **cards.js / visualizations.js** — card builders and the footer SVG network.
- **boot.js** — entry; inits `MotionSystem`, `runStory`, and — **isolated in its own
  try/catch** — `initEnergyField()`. So a failure in motion/nav can never disable the
  background animation.
- **motion-system / page-stories / scroll-fx / tilt / nav / forms / filter / utils** — the
  interactive UI layer (reveals, nav, validation, filtering, parallax, cursor).

---

## 8. The Background Animation — `energyField.js` (core deliverable)

Pure Canvas 2D, no deps, `file://`-safe. Exposes `initEnergyField()` which finds `.bg-anim`,
grabs the canvas, and starts `EnergyField`.

### 8.1 Architecture
- **Loop:** `requestAnimationFrame` loop with clamped `dt` (≤ 50 ms). `step(dt, now)` →
  `draw(outer, inner, now)`.
- **Device tiers:** `detectTier()` → `high | mid | low` from pointer/width/cores, tuning
  particle caps (460/260/120), stream count (16/12/6), and DPR cap (2/1.5/1).
- **FPS auto-degrade:** if FPS < 40 on `high`, it drops to a lighter config once.
- **Visibility pause:** `visibilitychange` stops/restarts the loop (battery friendly).
- **Reduced motion:** `prefers-reduced-motion` → calm mode (no sparks/beams/ambient;
  electrons/protons/spikes render static via `t = 0`).

### 8.2 Coordinate system (3D-ish)
- `ringPoints(R, yaw, pitch, plane)` → 16 points on a ring, rotated by `rotY`/`rotX` and
  projected with `proj(x,y,z)` (simple perspective, `fov`). Depth (`z`) drives per-point
  `alpha`. This is what makes the ring look like it rotates in 3D.
- `this.N = 16` (the 16 edges / 16 emission zones).
- `baseCenter` is **fixed at `0.5 * width`** and ~`0.46 * height` (desktop) so the atom is
  **centered and does NOT drift with scroll** (per explicit user direction: "fix in center and
  rotate in a 3D plane"). Mouse adds a small parallax (`±14 / ±11` px).

### 8.3 The atomic model (`drawAtom`)
- **Faint shell** — `drawRing()` connects the 16 vertices (the "atomic shell"), rotating in 3D.
- **Central neutron** — radial glow + solid core, with **two electron+proton shells**
  (`drawOrbitPair` at `R*0.52` and `R*0.76`).
- **16 outer neutrons** — each is a bright dot at a ring vertex.
  ```
  for (k = 0..15) {
    draw neutron dot
    drawSpikes(...)        // 3 glowing outward beams
    drawOrbitPair(...)     // electrons + protons orbiting THIS neutron
  }
  ```

### 8.4 Electrons & protons — `drawOrbitPair(cx, cy, radius, eCount, pCount, ePhase, pPhase, eColor, pColor, K)`
Renders both particle types so each neutron reads as a tiny 3D nucleus:
- **Electrons** — cool palette color (`PALETTE[2]` aqua / `PALETTE[4]` violet / per-neutron
  color), tilted orbit (`radius * 0.62` vertical squash).
- **Protons** — **warm amber `PALETTE[6]`**, placed on an **inner radius** (`radius * 0.6`),
  with a **steeper tilt** (`* 0.42`) and **opposite phase** (`-t * 2.2`), so they visibly
  counter-rotate against the electrons → convincing 3D.

### 8.5 Energy release — "cover all over the page"
Three systems make energy fill the viewport (this is the "missing inner circle" the user meant
— it was never a literal ring, it is full-page energy coverage):

1. **`drawStreams` + `updateStreams`** — curved Bézier beams from **each neutron out to the
   viewport edge** (`edgeReach()` computes distance to the nearest screen edge). A bright pulse
   travels along each beam. Restored specifically to bring back "cover all over the page like
   previous."
2. **`emitFromEdges`** — spawns sparks / streaks / particle clusters / arcs from each neutron
   (now with higher velocity & longer life so they travel farther).
3. **Ambient network** — full-viewport field of nodes with proximity links (`drawAmbient`),
   made **denser & brighter** in the latest pass (counts 120/70/34; link alpha 0.10→0.16;
   node alpha 0.22→0.30; link distance 150→170).

### 8.6 Readability guard — `guardAt(x, y)`
Returns a dimming factor that approaches `0.4` inside a calm ellipse around the hero copy and
`1` outside it. Applied to halo, neutrons, spikes, beams, and particles so the centered core
never harms text legibility while energy at the page edges stays vivid.

### 8.7 Boot isolation
`initEnergyField()` runs in its **own try/catch** in `boot.js`, so the background animation
survives any unrelated UI error (it must animate on the home page especially).

### 8.8 Notable bug fixed during this work
A `ReferenceError: now is not defined` on the **first frame** halted the rAF loop and left a
**blank (plain) page**. Cause: `draw()` was called as `this.draw(outer, inner)` without
forwarding `now`, yet `drawAtom` referenced `now`. Fixed by changing the signature to
`draw(outer, inner, now)` and the call site to `this.draw(outer, inner, now)`. Now caught by the
headless test (§12).

---

## 9. Cards — 50% Frosted Glass

`src/css/parts/bg-anim.css` applies a frosted-glass treatment to **all cards** via a broad
selector so nothing is missed:
```css
body[data-anim="on"] [class*="-card"] { /* 50% transparent frosted glass */ }
```
plus explicit non-`-card` items (`.metric, .why-item, .svc-row, .svc-group, .filter-group,
.client-chip, .mini, .person, .form-wrap, .j-step, .section.alt, .cap-panel`). The cards blur
the canvas behind them, producing the "energy behind glass" aesthetic.

---

## 10. Services "Read more" → Detail Pages

- `markup.js → serviceSlug(title)` turns a service title into a URL slug.
- `services.js` renders the 16-category list; each row's "Read more →" links to
  `services/${slug}.html`.
- `service-detail.js → buildServiceDetailPages()` emits one fully-detailed page per service
  (overview, scope, capabilities, company badge, JSON-LD `Service`).
- Verified: 16 read-more links present; `linkcheck` reports no broken local references.

---

## 11. Work Log (chronological)

1. **Scaffold + pure-static build.** `build.mjs` (ESM→IIFE, file://-safe), `layout.js` shell,
   CSS parts, data modules, all pages, SEO/JSON-LD, sitemap/robots.
2. **Canvas energy field (v1).** 16-edge geometric core emitting energy from all vertices along
   curved transmission paths to screen edges; ambient network; mouse/scroll parallax; tiers.
3. **Centering + full-page coverage.** Moved core to `baseCenter.x = 0.5` (centered on all
   viewports), added the full-viewport **ambient** network, added a travelling highlight, and
   extended the `guardAt` calm-zone to the globe/halo/streams so text stays readable.
4. **Services deep-linking.** Added `serviceSlug`, wired "Read more" links in the services list,
   refactored `service-detail.js` to use the slug. Built & verified 16 detail pages.
5. **Atomic/nuclear model (v2).** Replaced the globe with `drawAtom`: central neutron + 16
   ring nuclei (bright dots), each with orbiting **electrons** + outward **spikes** + sparks;
   **fixed, centered** 3D rotation (removed scroll drift per user request); removed the old
   `drawGlobe`/`drawStreams`/`drawCurrent`.
6. **Bug fix — blank page.** Found & fixed the `now` ReferenceError halting the rAF loop
   (headless frame test). Rebuilt & verified.
7. **Electrons + protons + full-page energy (current).** Per user clarification:
   - Did **not** add a literal inner ring (the "missing inner circle" = full-page energy).
   - Added **protons** orbiting every neutron (warm amber, inner radius, opposite tilt).
   - Added **protons** to the central neutron shells.
   - **Restored edge-reaching energy beams** (`drawStreams`/`updateStreams`) + made the
     **ambient network denser/brighter** + let sparks/streaks travel farther → energy now
     "covers all over the page like previous."

---

## 12. Verification & QA

A **headless Node harness** (`_test_atom.mjs`, created ad-hoc then removed) stubs `window`/
`document`/`canvas`/`requestAnimationFrame`, imports `energyField.js`, runs ~10 animation
frames, and **fails loudly if any frame throws** (this is how the `now` bug was caught).

Standard checks (run after every change):
```bash
node build.mjs                                              # 147 pages
node --check dist/js/app.js                                 # syntax
node <tmp>/linkcheck.mjs                                    # no broken local refs
node <tmp>/smoke.js dist/js/app.js                          # bundle loads w/o ref errors
# grep dist/js/app.js for drawOrbitPair / drawStreams       # confirm compiled
```
All four currently pass.

---

## 13. Known Limitations & Future Ideas

- **Fonts need network.** Google Fonts load over the network; offline they fall back to system
  fonts (graceful, but not pixel-identical). Could inline a subset for true offline fidelity.
- **No CSS minification** at build time (fine for a static brochure site; could add).
- **Typo-driven requirements.** Several requests arrived as phonetic typos ("flask" = also,
  "fleme"/"inner circle" = full-page energy coverage, "neutrone" = neutron). Each was clarified
  before implementation; the interpretations are recorded in §8 and §11.
- **Content is placeholder-rich.** `mediaPlaceholder()` supplies branded gradient SVG slots
  instead of unlicensed photography — swap for real images when available.
- **Possible future pages:** blog/articles (beyond "Resources" list), case-study carousels,
  interactive project map, language toggle (EN/ଓଡ଼ିଆ).
- **Accessibility:** ensure all interactive widgets have focus styles; verify contrast of
  frosted cards over the animation.

---

## 14. Quick Reference — Commands

| Task | Command |
|------|---------|
| Rebuild everything | `node build.mjs` |
| View locally (optional server) | `npm run serve` |
| **View (primary workflow)** | double-click `dist/index.html` |
| Syntax check bundle | `node --check dist/js/app.js` |
| Check links | `node <tmp>/linkcheck.mjs` |
| Smoke-test bundle | `node <tmp>/smoke.js dist/js/app.js` |

*End of plan.*
