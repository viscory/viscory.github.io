# viscory.github.io

Personal portfolio site for Faiyaz Rahman. Built with [Astro](https://astro.build), strict monochrome editorial design, with light client-side interactivity.

## Quick Start

```bash
pnpm install
pnpm run dev       # local dev server at localhost:4321
pnpm run build     # production build → dist/
pnpm run preview   # preview production build locally
```

## Tooling

```bash
pnpm run lint:css  # Stylelint — rejects named colors, non-unit values
pnpm run format    # Prettier — checks formatting (2-space tabs, Astro + TypeScript)
pnpm run check     # lint:css + format + build — runs in CI
```

## Architecture

```
src/
├── content/
│   ├── config.ts              # Zod schemas (projects, experience)
│   ├── projects/*.md          # Markdown with frontmatter
│   └── experience/*.md        # Markdown with frontmatter
├── styles/global.css           # Design tokens, typography, 1px borders, instant hover
├── layouts/Layout.astro        # HTML shell, nav, footer, <slot/>, loads interactive.ts
├── pages/index.astro           # Queries content collections, renders all sections
├── scripts/interactive.ts      # Client-side: HUD clock, rain/meteor canvas, FSM mood button
└── env.d.ts                    # TypeScript declarations
```

### Interactive Features (Client-Side JS)

The site is primarily static HTML/CSS but includes a small (~120 line) client script for:

- **HUD clock** — live Hong Kong time, updates every second
- **Rain + meteors** — Canvas 2D particle animation with escalating intensity (resets every 2 min)
- **Mood button** — bottom-right button with FSM-based mood cycling (click to awaken, then cycles through star/bolt/moon/rocket moods)

All animations respect `prefers-reduced-motion`. The page renders without JS — all content is visible without the script running.

### Content Collections

Projects are validated at build time:

```ts
title: z.string().max(60)
startYear: z.string().regex(/^\d{4}$/)
tags: z.array(z.string()).max(8)
```

Experience dates are validated:

```ts
startDate: z.string().regex(/^(Jan|Feb|...)\s\d{4}$/)
endDate: z.string().regex(/^(Jan|Feb|...)\s\d{4}$/).or(z.literal('Present'))
```

### Design System

| Token | Value |
|-------|-------|
| `--color-bg` | `#000000` |
| `--color-fg` | `#ffffff` |
| `--font-heading` | `Helvetica Neue`, `Arial Black`, system-ui |
| `--font-body` | `SFMono-Regular`, `Menlo`, `Consolas`, monospace |
| Borders | `1px solid #000000` only |
| Hover | Instant bg/fg inversion |

Strict monochrome palette — no gray, no gradients. Hover states are instant block inversions with no transitions. The mood button and HUD are the only elements with visual animations (documented above).

## Deployment

GitHub Actions builds and deploys `dist/` to GitHub Pages on push to `master`:

1. `pnpm/action-setup` + `actions/setup-node` v20
2. `pnpm install`
3. `pnpm run lint:css` + `pnpm run format` + `pnpm run build`
4. `peaceiris/actions-gh-pages` → publishes `dist/`

## Pre-commit

The `.husky/pre-commit` hook runs `pnpm run build` and validates that `CHANGELOG.md` is staged and append-only.

## License

MIT
