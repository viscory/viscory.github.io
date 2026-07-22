# Agent Memory — viscory.github.io

## Project
Personal portfolio site for Faiyaz Rahman (viscory). Built with Astro (static site generator). Outputs pure flat HTML/CSS to `dist/`. Deploys to GitHub Pages via CI.

## Architecture
```
src/
├── content/
│   ├── config.ts          — Zod schemas for projects + experience
│   ├── projects/*.md      — Markdown with frontmatter (title, startYear, url, tags)
│   └── experience/*.md    — Markdown with frontmatter (company, role, startDate, endDate, location)
├── styles/global.css      — Design tokens, typography, reset, 1px borders, instant hover
├── layouts/Layout.astro   — HTML shell, nav, footer, <slot />
├── pages/index.astro      — Queries getCollection() for projects + experience
└── env.d.ts               — Auto-generated type declarations
public/assets/             — headshot.jpg, resume.pdf, school-logo-1x.png, unnamed.png
dist/                      — Build output (HTML + assets)
.stylelintrc.json          — CSS enforcement (no named colors, no url(), strict units)
.prettierrc.mjs            — 2-space tabs, Astro parser
astro.config.mjs           — Site config (output: static, dir: ./dist)
```

**Build pipeline**: `pnpm install → pnpm run build → astro build` → outputs `dist/` → deployed to GitHub Pages via Actions.

## Design System (Strict Monochrome)
```
--color-bg: #000000        — Pure black background
--color-fg: #ffffff        — Pure white foreground
--font-heading: Helvetica Neue, Arial Black, Impact, system-ui, sans-serif
--font-body: SFMono-Regular, Menlo, Consolas, Monaco, monospace
```

- **No gray**. No `#888`, no `#eee`, no `#333`. Pure black/white only.
- **No gradients, no transitions**. Hover is instant bg-fg swap.
- **All structural divisions**: `1px solid #000000` borders.
- **Typography**: Giant heavy Neo-Grotesk headings / Tiny crisp monospaced body.
- **Fluid scale**: `clamp()` based on viewport width.

## Content (Source of Truth: RESUME.md)

### Identity
- **Name**: Faiyaz Rahman
- **Role**: Full Stack Developer
- **Location**: Hong Kong
- **Email**: faiman.rahyaz@gmail.com
- **GitHub**: viscory
- **LinkedIn**: faiyazr
- **Resume**: `public/assets/resume.pdf`

### Experience
1. Premialab — Full Stack Developer (Apr 2025–Present)
2. KM.ON Asia Limited — Junior Full Stack Developer (Jul 2023–Feb 2025)
3. Reap Technologies — Software Engineer Intern (Jun 2022–Sep 2022)
4. BNP Paribas CIB — IT Strategist Contract (Feb 2021–Aug 2021)

### Skills
Languages: Python, TypeScript, Java, Scala, Kotlin, Go, SQL, Terraform, Helm
Frameworks: Vue.js, React, Nest.js, Spring, Ktor, Flask, FastAPI
Platforms: Docker, K8s, ArgoCD, Kafka, PostgreSQL, MongoDB, Redis, ES
Clouds: AWS, Alibaba Cloud
AI/ML: AWS Bedrock, RAG, Vector DBs

### Projects
1. Homelab — 20+ self-hosted services, Golang CLI, Tailscale, VictoriaMetrics
2. paperless-py — Google Takeout → Paperless-ngx document extractor
3. reciprocus — Go blockchain FYP with PoW+Sincerity
4. chirper — Twitter-like social platform

### Education
CUHK — B.Sc. Computer Science, 2:1 (Sep 2018–Jun 2023)
Concentration: Database and Information Systems
Full Ride Scholarship, The 'Sunny' Award
English Debating Team, Google Developers Student Club

## CI / Tooling
- `pnpm run dev` — `astro dev` local dev server
- `pnpm run build` — `astro build` → outputs to `dist/`
- `pnpm run lint:css` — Stylelint (rejects named colors, external fonts, non-unit values)
- `pnpm run format` — Prettier check (2-space tabs, Astro parser)
- `.github/workflows/ci.yml` — Node 20, pnpm install → build → deploy to GitHub Pages
- `.husky/pre-commit` — build check + CHANGELOG must be staged + append-only
- `CHANGELOG.md` — append-only changelog

## Content Collections
Project data is validated by Zod at build time:
- `title: z.string().max(60)` — titles longer than 60 chars will fail the build
- `startYear: z.string().regex(/^\d{4}$/)` — must be a 4-digit year string
- `tags: z.array(z.string()).max(8)` — max 8 tags per project
- `url: z.string().url()` — must be a valid URL

Experience data is validated:
- `company: z.string().max(60)`
- `role: z.string().max(60)`

## What Was Removed (Failed Iterations)
- All client-side JavaScript (rain particles, shooting stars, CSS 3D cube, HUD clock, nav dots, scroll arrow, fade-in animations, data flow graph, chat FAQ, FSM mood button)
- Stats grid ("meaningless numbers"), section-art SVGs ("weird boxes"), inline onclick handlers
- Bun toolchain (mise, oxlint, bun build scripts)
- Google Docs resume link (replaced by local PDF)
- All soft transitions and gradients

## Known Issues / Rough Edges
- The project went through ~10 rapid iterations. Current state is what survived user scrutiny.
- No automated visual testing — only structural (Astro build succeeds).
- Astro's dev server works, but there's no hot-reload-like experience (just standard Vite HMR).
- The FSM mood button was a fun experiment but was removed in the Astro migration (zero-JS mandate).
- `.husky/pre-commit` runs `npm run build` which is fast (~1s) but adds friction per commit.
