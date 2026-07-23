# Changelog

All notable changes to this project are documented here.

## [Astro v5, Nav Highlight, Scroll Bar, Email Copy, Content Validation]

### Changed

- Upgraded Astro 4 → 5.18.2 (no breaking changes needed for content API)

### Added

- `src/scripts/interactive.ts`: Active nav highlighting on scroll (IntersectionObserver), scroll progress bar, email copy on hover/click
- `src/styles/global.css`: Styles for nav active state, scroll progress bar, email copy tooltip (`.btn-wrap`, `.btn-copy-tip`)
- `src/layouts/Layout.astro`: Preconnect links for CDN and weather API, scroll progress bar element
- `scripts/validate-content.mjs`: Content validation script checking bullet counts match RESUME.md
- `package.json`: Added `validate:content` script, added to `check` pipeline
- `.husky/pre-commit`: Added content validation step

### Fixed

- `src/styles/global.css`: Fixed `text-decoration: none` being stripped by CSS minifier — changed to `!important` on `.btn` class, removed redundant inline styles from hero links
- `src/scripts/interactive.ts`: Restored mood button section that was lost in a previous commit

- `pnpm-lock.yaml`: Updated for Astro 5 dependency tree
- `public/assets/cuhk-logo.png`: CUHK logo asset
- `src/content/config.ts`: Added `url` optional field to experience schema
- Experience files (`premialab.md`, `kmon.md`, `reap.md`, `bnp.md`): Restored all bullets to match RESUME.md exactly
- `src/pages/index.astro`: Removed redundant inline `text-decoration: none`, added email copy tooltip HTML

- `src/pages/index.astro`: Removed mood button HTML (was already absent); adjusted for layout consistency
- `src/styles/global.css`: Added print stylesheet (`@media print`), fixed named colors for Stylelint compliance
- `src/content/experience/premialab.md`: Bolded key terms for readability
- `public/googled313d947fad3a870.html`: Google Search Console verification file
- `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`: Added `@astrojs/sitemap` integration for automatic sitemap generation
- `public/robots.txt`: Allow all, point to sitemap
- `.github/workflows/ci.yml`: Added lychee link check step after build
- `.lychee.toml`: Config for lychee link checker
- `src/layouts/Layout.astro`: JSON-LD Person schema; GoatCounter analytics script
- `public/googled313d947fad3a870.html`: Google Search Console verification

### Fixed

- Print stylesheet: hides chrome (canvas, nav, footer, HUD), black-on-white for printing
- Interactive.ts: Removed mood button FSM code (button HTML was already removed earlier); added AQI fetch from HK Observatory

---

## [Fix Weather API Endpoint]

### Fixed

- `src/scripts/interactive.ts`: Changed HK Observatory API dataType from `flw` (forecast text) to `rhrread` (current hourly readings). Temperature now parses from `temperature.data[0].value`.

---

## [Downgrade pnpm 11 → 10]

### Changed

- `mise.toml`: `pnpm = "10"` (pnpm 11 errors on unapproved build scripts; pnpm 10 only warns)
- `.github/workflows/ci.yml`: `pnpm/action-setup` version 11 → 10
- Removed `.npmrc` (pnpm 10 doesn't require explicit build approvals)

### Fixed

- `src/pages/index.astro`: Education degree classification corrected to "Second Class Honours Upper Division"

### Fixed

- `src/pages/index.astro`: Bio corrected to "4+ years" (was "5+"); degree date removed; Premialab description rephrased ("AI-driven no-code reporting" not "modular CRUD")
- `src/layouts/Layout.astro`: Meta description corrected to "4+ years", removed AWS Bedrock mention
- `src/content/experience/premialab.md`: Rephrased line to "AI-driven no-code reporting system"
- `src/content/projects/homelab.md`: Added `endYear: "Present"`
- `src/scripts/interactive.ts`: Added HK Observatory weather API fetch (temperature in HUD)
- `src/content/config.ts`: Updated `endYear` schema to accept `"Present"` (for Homelab ongoing project)

### Changed

- `src/content/projects/homelab.md`, `paperless-py.md`: Updated startYear 2025→2026

### Fixed

- `src/content/experience/premialab.md`: Restored to 8 bullets matching RESUME.md (was 7 — merged peer group + market regime); added missing specifics: Qdrant eval, saved views, P95, 204 components, PDF parity, vol-adjusted betas/KDE, Threshold methodologies, WYSIWYG parity, nested performance attribution, Royal Bank of Canada, Jira-to-PR automation
- `src/content/experience/kmon.md`: Restored to 6 bullets (was 5 — missing TimescaleDB/2000 ops/sec bullet); added missing specifics: Java 17, Karapace, 100% data parity, edge hub back-off, KMSF payloads, semantic versioning from Git hooks
- `src/content/experience/bnp.md`: Restored to 4 bullets (was 3 — missing Four-Eyes Principle deployment compliance bullet); added missing: GIL multiprocessing, high-cardinality, .pcap histories
- `src/content/experience/reap.md`: Restored original text
- `AGENTS.md`: Updated experience section to match RESUME.md descriptions
- `src/scripts/interactive.ts`: Added HK Observatory weather API fetch (temperature in HUD)
- `src/styles/global.css`: Layout adjustments for HUD weather display

---

## [CI Fix: Standard Workflow + .npmrc]

### Changed

- `.github/workflows/ci.yml`: Restored standard `pnpm/action-setup@v4` + `setup-node@v4` with Node 22. Drops corepack/npm-install experiments.

### Fixed

- `.npmrc`: Added `only-built-dependencies=esbuild,sharp` (pnpm 11 requires explicit build approval)

---

## [Remixicon CDN + Mood Button Fix]

### Changed

- Replaced all hardcoded SVG icons with Remixicon CDN (`remixicon@4.6.0`) — hero links, project icons, mood button all use `ri-*` classes
- Mood button: BOLT and ROCKET moods now always use CSS transitions instead of instant position changes (no teleporting)
- Added `padding-bottom: 0.5rem` under hero link buttons
- `src/layouts/Layout.astro`: Switched Remixicon CDN from jsDelivr to cdnjs v4.6.0 (v4.9.1 404'd on cdnjs)
- `src/pages/index.astro`: Fixed reciprocus icon class `ri-bitcoin-line` → `ri-bit-coin-line` (correct Remixicon name)
- `.husky/pre-commit`: Removed hardcoded pnpm version, uses `mise exec --` from `mise.toml`; now lists changed files when CHANGELOG not staged; validates every staged file is mentioned in CHANGELOG entry
- `.github/workflows/ci.yml`: Bump Node 20→22 (pnpm 11 requires Node 22.13+)
- `.nojekyll`: Restored at repo root (prevents GitHub Pages Jekyll build on source branch)
- `.npmrc`: Added with `only-built-dependencies=esbuild,sharp` (pnpm 11 blocks all builds by default, needed for CI)
- `.github/workflows/ci.yml`: Replaced `pnpm/action-setup@v4` with `corepack enable && corepack prepare pnpm@11` (pnpm/action-setup self-installer fails on Node 24 runner)
- Mood button SVGs replaced with Remixicon `<i>` elements
- CSS updated: `#chat-btn i` instead of `#chat-btn svg` for styling

### Fixed

- reciprocus icon now properly uses `ri-bitcoin-line` (actual bitcoin icon from Remixicon)

---

## [Fix Batch: Icons, Semantics, Tooling]

### Fixed

- reciprocus icon now uses bitcoin Remixicon SVG (was globe)
- Project body descriptions now render Markdown properly (was raw source)
- Section labels (About, Experience, Skills, Projects, Education) changed to `<h2>` for proper document outline
- Fade-in CSS classes removed (dead code — never used)
- Mood button: removed duplicate `btn.style` assignments in ROCKET mood
- Root `.nojekyll` deleted (vestigial — only needed in `dist/`)
- `AGENTS.md` now honestly documents client-side JavaScript (HUD clock, rain/meteors, mood button)
- Pre-commit hook now runs `pnpm run lint:css` and `pnpm run format`, removed `2>/dev/null` stderr suppression
- `stylelintrc.json` allows `s`, `ms`, `deg` units (needed for mood button animations)

---

## [Unreleased]

### Changed

- Fixed 22 audit issues: SEO metadata, nav semantics (ul/li), prefers-reduced-motion, canvas clientWidth, devicePixelRatio, skill-tag class, experience date validation, CI lint/format checks, pre-commit stderr output, dead assets removed, pnpm-workspace.yaml removed, README honestly documents client JS

### Changed

- Migrated from Bun + TypeScript to **Astro** static site generator (pure HTML/CSS output, zero client JS)
- Strict monochrome design system — pure `#000` / `#fff` only, no gray, no gradients, no transitions
- Hero headers now use giant system Neo-Grotesks (`Helvetica Neue`, `Arial Black`) with tight letter-spacing
- Body/metadata now use tiny system monospaced stack (`SFMono-Regular`, `Menlo`, `Consolas`)
- All navigation uses semantic `<nav>` with anchor links instead of JS-controlled nav dots
- Experience and Project sections use 1px solid border tables with hanging-indent bullets
- Skills rendered as inline bordered tags with instant bg/fg hover swap
- Layout split into modular Astro components: `global.css`, `Layout.astro`, `index.astro`
- Assets moved from `assets/` to `public/assets/` for Astro compatibility

### Removed

- All client-side JavaScript: rain particles, shooting stars, CSS 3D cube, HUD clock, nav dots, scroll arrow, section fade-in animations, data flow graph, FAQ chat panel, FSM mood button
- TypeScript source: `src/main.ts`
- Bun toolchain: `mise.toml`, `bun.lock`, oxlint
- Old source files: `public/index.html`, `public/main.js`, `public/main.css`, `scripts/`, `tests/`

### Fixed

- Font sizing now fluid and consistent throughout via `clamp()` scale
- Bullet indentation uses proper `text-indent` for hanging alignment
- Skills tags use `white-space: nowrap` to prevent word splitting

---

## [FSM Mood Button & Content Cleanup]

### Changed

- Chat button is now a Finite State Machine with moods (IDLE, HAPPY, ANGRY, SLEEPY, JUMPY) — each mood has its own icon, animation, and probability-weighted transitions
- Button auto-transitions moods every 4-8 seconds without clicking
- ANGRY mood chases the cursor (moves towards mouse position)
- JUMPY mood teleports the button to random screen positions
- Every 4th click forces JUMPY mood
- Resume link now points to local PDF (`assets/resume.pdf`) instead of Google Docs
- Added 3 more projects: paperless-py, reciprocus, chirper
- Removed data flow canvas from About section (was "weird thing")
- Fixed bullet point indentation — wrapped lines now align under text, not under the dash
- Skills tags use `white-space: nowrap` to prevent word splitting

### Changed

- Chat button is now a gag: shakes, flips, explodes, and teleports on repeated clicks (4 escalating animations)
- Removed stats grid from About section (meaningless numbers)
- Removed section-art SVGs (weird boxes in experience/skills)
- Removed FAQ chat panel (replaced by gag button)
- Skills tags: added `white-space:nowrap` to prevent split words like ArgoCD/PostgreSQL
- Education: separated concentration, scholarships, and organizations onto individual lines
- Base font-size set to 15px with consistent sizing throughout
- Removed inline `onclick` from chat button (now uses addEventListener)
- Added Remixicon SVGs inline for all hero links (Email, GitHub, LinkedIn, Resume) and chat button
- Build output now goes to `dist/` — served locally on `localhost:8080` and deployed to GitHub Pages via CI
- HUD shows live Hong Kong time (HH:MM HKT) instead of name
- Stats: 5+ YoE (includes internships)
- CUHK logo now uses actual school logo image (`school-logo-1x.png`)
- KM.ON timeline item shows company logo (`unnamed.png`)
- FAQ rewritten to be concise and natural
- Removed stale `public/main.js` (output now goes to `dist/`)
- `.nojekyll` placed in `dist/` during build

### Fixed

- FOUC prevention code (inline script + body display:none) was hiding page content
- CSS was orphaned outside `<style>` tags after edit tool replacement
- Removed orphaned `public/main.css` (CSS is inline in index.html)

## [Initial Rewrite]

### Added

- Complete rewrite of portfolio site as a proper Bun + TypeScript project
- `src/main.ts` — TypeScript source for interactive features
- `public/index.html` — all content with inline CSS
- `mise.toml` — toolchain management with `bun@1.3.14`
- `package.json` — scripts for dev, build, lint, validate
- `scripts/validate.sh` — output validation checks
- `.github/workflows/ci.yml` — GitHub Actions CI
- `.husky/pre-commit` — pre-commit hooks
- `CHANGELOG.md` — this file, append-only
- `agent.md` — agent memory file

### Changed

- Replaced monolithic `index.html` with source/serve architecture
- Migrated inline JavaScript to TypeScript (`src/main.ts`)
- Corrected all experience data from RESUME.md
- Updated contact email to faiman.rahyaz@gmail.com
- Projects: replaced fabricated list with Homelab project
- Education: added CUHK details

### Removed

- All Next.js / LiveTerm boilerplate (20+ config files, 50 favicon assets, Docker, ESLint, etc.)

### Fixed

- Role corrected to Full Stack Developer (was Platform Engineer)
- Experience entries corrected to real work history
- Contact info corrected to faiman.rahyaz@gmail.com

### Changed

- Fixed hero link underlines: inline `text-decoration: none` on all 4 buttons (CSS minifier was stripping it)
- Fixed ROCKET mood transition: uses requestAnimationFrame so the browser registers the transition before position changes — no more instant snap
- Replaced reciprocus icon with globe icon
- Added `loading="lazy"` and `decoding="async"` to all images
