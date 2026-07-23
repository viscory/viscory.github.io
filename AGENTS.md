# Agent Memory — viscory.github.io

## Project
Personal portfolio site for Faiyaz Rahman (viscory). Built with Astro (static site generator). Outputs static HTML/CSS/JS to `dist/`. Deploys to GitHub Pages via CI.

**Key distinction**: The site is primarily static HTML/CSS but includes a small client-side script (~120 lines) for visual flair: HUD clock, Canvas rain/meteor particles, and an FSM mood button. All content renders without JS — the script is strictly additive.

## Architecture
```
src/
├── content/
│   ├── config.ts          — Zod schemas for projects + experience
│   ├── projects/*.md      — Markdown with frontmatter (title, startYear, url, tags)
│   └── experience/*.md    — Markdown with frontmatter (company, role, startDate, endDate, location)
├── styles/global.css      — Design tokens, typography, reset, 1px borders, instant hover
├── layouts/Layout.astro   — HTML shell, HUD, nav, footer, canvas, <slot />
├── pages/index.astro      — Queries getCollection() for projects + experience, renders all sections
├── scripts/interactive.ts — Client-side: HUD clock, Canvas rain/meteors, FSM mood button
└── env.d.ts               — Auto-generated type declarations
public/assets/             — headshot.jpg, resume.pdf, school-logo-1x.png
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
- **No gradients, no transitions** (except mood button animations — documented above). Hover is instant bg-fg swap.
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
1. Premialab — Full Stack Developer (Apr 2025–Present) — search screener, no-code reporting, peer analytics, market regime modeling, jsPDF, portfolio testing, whitelabel, DX overhaul
2. KM.ON Asia Limited — Junior Full Stack Developer (Jul 2023–Feb 2025) — multi-cloud React/Express platform, 1.5TB IoT pipeline, TimescaleDB at 2k+ ops/sec, Strimzi Kafka migration, Scala/MQTT microservice, SBOM/GitOps
3. Reap Technologies — Software Engineer Intern (Jun 2022–Sep 2022) — monolith→CSR refactor, TDD
4. BNP Paribas CIB — IT Strategist Contract (Feb 2021–Aug 2021) — Python replication across 200+ nodes, Kafka/ES pipeline, Four-Eyes deployment, C++ packet replay

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
- `pnpm run check` — lint:css + format + build (runs in CI and pre-commit)
- `.github/workflows/ci.yml` — Node 20, pnpm install → check → deploy to GitHub Pages
- `.husky/pre-commit` — lint:css + format + build + CHANGELOG staged & append-only
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
- CSS 3D cube, nav dots, scroll arrow, data flow graph, chat FAQ panel
- Stats grid ("meaningless numbers"), section-art SVGs ("weird boxes"), inline onclick handlers
- Bun toolchain (mise, oxlint, bun build scripts)
- Google Docs resume link (replaced by local PDF)
- All soft transitions and gradients

## Known Issues / Rough Edges
- The project went through ~10 rapid iterations. Current state is what survived user scrutiny.
- No automated visual testing — only structural (Astro build succeeds).
- Astro's dev server works, but there's no hot-reload-like experience (just standard Vite HMR).
- `.husky/pre-commit` builds with pnpm which is fast (~1s) but adds friction per commit.
