# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Changed

- Migrated from Bun + TypeScript to **Astro** static site generator
- Strict monochrome design system — pure `#000` / `#fff` only, no gray, no gradients, no transitions
- Hero headers: giant system Neo-Grotesks (`Helvetica Neue`, `Arial Black`) with tight letter-spacing
- Body/metadata: tiny system monospaced stack (`SFMono-Regular`, `Menlo`, `Consolas`)
- All client-side JavaScript removed — site renders as pure flat HTML/CSS
- Navigation uses semantic `<nav>` with `href` anchors instead of JS-controlled dots
- Experience and Project sections use 1px solid border tables with hanging indent bullets
- Skills rendered as inline bordered tags with instant hover inversion (bg/fg swap)
- Footer with name + location

### Removed

- All interactive features: rain particles, shooting stars, CSS 3D cube, HUD clock, nav dots, scroll arrow, section fade-ins, data flow graph, FAQ panel, FSM mood button
- All client JS: `src/main.ts`, canvas code, IntersectionObserver, chat handler
- Bun toolchain: `mise.toml`, `bun.lock`, oxlint, bun build scripts
- Old source files: `public/index.html`, `public/main.js`, `public/main.css`
- Section-art SVGs, stats grid, inline `onclick` handlers

### Fixed

- Font sizing is now fluid and consistent throughout (`clamp()` scales)
- Bullet indentation uses proper `text-indent` for hanging alignment
- Skills tags use `white-space: nowrap` to prevent word splitting

## [Previous States]

See git history for earlier iterations.
