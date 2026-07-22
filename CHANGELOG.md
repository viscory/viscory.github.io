# Changelog

All notable changes to this project are documented here.

## [Unreleased]

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
