# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Changed

- Added Remixicon SVGs inline for all hero links (Email, GitHub, LinkedIn, Resume) and chat button
- Chat button now uses Remixicon message icon instead of "?" character
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
