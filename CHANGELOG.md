# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Changed

- Build output now goes to `dist/` — served locally on `localhost:8080` and deployed to GitHub Pages via CI
- HUD now shows live Hong Kong time (HH:MM HKT) instead of name
- Stats: 5+ YoE (includes internships)
- CUHK logo now uses actual school logo image (`school-logo-1x.png`)
- KM.ON timeline item now shows company logo (`unnamed.png`)
- FAQ rewritten to be concise and natural
- Removed stale `public/main.js` (output now goes to `dist/`)
- `.nojekyll` placed in `dist/` during build

### Fixed

- FOUC prevention code (inline script + body display:none) was hiding page content and never showing it back, resulting in white screen
- CSS was orphaned outside `<style>` tags after edit tool replacement — restructured so all CSS is properly inside the style block
- Removed orphaned `public/main.css` (CSS is inline in index.html)

- FOUC prevention code (inline script + body display:none) was hiding page content and never showing it back, resulting in white screen
- CSS was orphaned outside `<style>` tags after edit tool replacement — restructured so all CSS is properly inside the style block
- Removed orphaned `public/main.css` (CSS is inline in index.html)

### Added

- Complete rewrite of portfolio site as a proper Bun + TypeScript project
- `src/main.ts` — TypeScript source for interactive features (rain particles, shooting stars, data flow graph, section tracking, FAQ chat)
- `public/index.html` — all content (hero, about, experience, skills, projects, education) with inline CSS
- `public/main.js` — compiled output from TypeScript (via `bun build`)
- `mise.toml` — toolchain management with `bun@1.3.14`
- `package.json` — scripts for dev, build, lint, validate
- `scripts/validate.sh` — output validation checks
- `.github/workflows/ci.yml` — GitHub Actions CI (lint + build + validate)
- `.husky/pre-commit` — pre-commit hook (build + validate)
- `CHANGELOG.md` — this file, append-only
- `agent.md` — agent memory file for context

### Changed

- Replaced monolithic `index.html` with source/serve architecture
- Migrated inline JavaScript to TypeScript (`src/main.ts`)
- Migrated CSS to dedicated `<style>` block in `public/index.html`
- Corrected all experience data from RESUME.md (role: Full Stack Developer at Premialab, KM.ON, Reap, BNP Paribas)
- Updated contact email to faiman.rahyaz@gmail.com
- Projects: replaced fabricated list with Homelab project
- Education: added CUHK details (2:1, Database/IS concentration, awards, activities)

### Removed

- All Next.js / LiveTerm boilerplate (20+ config files, 50 favicon assets, Docker, Husky, ESLint, etc.)
- Inline `<script>` (now external `main.js`)
- Outdated shell-based test suite (replaced by Bun-based validation)

### Fixed

- Role corrected to Full Stack Developer (was Platform Engineer)
- Experience entries corrected to real work history (was fabricated "Wavenet" data)
- Contact info corrected to faiman.rahyaz@gmail.com
