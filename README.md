# viscory.github.io

Personal portfolio site for Faiyaz Rahman. Built with [Astro](https://astro.build), strict monochrome design, zero client JavaScript.

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
pnpm run format    # Prettier — checks formatting (2-space tabs, Astro parser)
pnpm run check     # build + lint:css + format — runs before commit
```

## Architecture

```
src/
├── content/
│   ├── config.ts              # Zod schemas (projects, experience)
│   ├── projects/*.md          # Markdown with frontmatter
│   └── experience/*.md        # Markdown with frontmatter
├── styles/global.css           # Design tokens, typography, instant hover inversions
├── layouts/Layout.astro        # HTML shell, nav, footer, <slot/>
├── pages/index.astro           # Queries content collections, renders all sections
└── env.d.ts                    # TypeScript declarations
```

### Content Collections

Projects are validated at build time:

```ts
title: z.string().max(60)
startYear: z.string().regex(/^\d{4}$/)
tags: z.array(z.string()).max(8)
```

Experience entries are validated:

```ts
company: z.string().max(60)
role: z.string().max(60)
```

### Design System

| Token | Value |
|-------|-------|
| `--color-bg` | `#000000` |
| `--color-fg` | `#ffffff` |
| `--font-heading` | `Helvetica Neue`, `Arial Black`, system-ui |
| `--font-body` | `SFMono-Regular`, `Menlo`, `Consolas`, monospace |
| Borders | `1px solid #000000` only |
| Hover | Instant bg/fg inversion — no transitions |

No gray, no gradients, no client JS. Pure flat HTML/CSS output.

## Deployment

GitHub Actions builds and deploys `dist/` to GitHub Pages on push to `master`. The CI pipeline:

1. `actions/checkout`
2. `actions/setup-node` v20
3. `npm install`
4. `npm run build`
5. `peaceiris/actions-gh-pages` → publishes `dist/`

## Pre-commit

The `.husky/pre-commit` hook runs `npm run build` and validates that `CHANGELOG.md` is staged and append-only.

## License

MIT
