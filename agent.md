# Agent Memory — viscory.github.io

## Project
Personal portfolio site for Faiyaz Rahman (viscory). Single-file `index.html`, pure HTML/CSS/JS, zero dependencies. Deploys to GitHub Pages.

## Design Constraints
- **Black & white only** — no colors. Palette: `--bg: #000`, `--heading: #eee`, `--body: #888`, `--link: #666`, `--label: #555`, `--border: #333`, `--subtle: #222`
- **System fonts** — `system-ui, -apple-system, sans-serif`. No Google Fonts, no CDN.
- **Zero dependencies** — no npm, no Three.js, no React, no Tailwind, no external JS/CSS.
- **Single file** — everything in `index.html`.
- **No "vibe coded" look** — clean, minimal, typography-focused like kennyslid.ing.
- **Section graphics** — each section has a unique SVG graphic that fades in/out on scroll.

## Files in Repo
- `index.html` — the entire site
- `assets/headshot.jpg` — circular grayscale headshot
- `.nojekyll` — tells GitHub Pages not to use Jekyll
- `.prettierignore` — protects index.html from formatters
- `.gitignore` — minimal
- `agent.md` — this file
- `.github/workflows/ci.yml` — GitHub Actions CI
- `.husky/pre-commit` — pre-commit hooks
- `tests/test-html.sh` — HTML validation tests

## Content Data (Source of Truth: RESUME.md)

### Identity
- **Name**: Faiyaz Rahman
- **Role**: Full Stack Developer
- **Location**: Hong Kong
- **Phone**: +85254227780
- **Email**: faiman.rahyaz@gmail.com
- **GitHub**: [viscory](https://github.com/viscory)
- **LinkedIn**: [linkedin](https://linkedin.com/in/faiyazr) — need to confirm exact URL
- **Resume URL**: confirm with user

### Tagline
Full-stack systems across AI, infra, and product.

### Stats (About section)
4+ years · 1.5M msg/day · Multi-cloud · 15+ microservices

### About Bio
Full-stack developer with 4+ years delivering systems across AI, infrastructure, and product. Architected multi-cloud fintech platforms, scaled Kafka to 1.5M+ messages/day, built Bedrock/RAG pipelines for quantitative reporting. Comfortable in NestJS/TypeScript APIs, Vue/React UIs, and the GitOps glue between them.

### Experience
1. **Premialab** — Hong Kong  
   *Full Stack Developer* — Apr 2025 – Present  
   - Built a sub-300ms hybrid search screener over 100k+ instruments using pgvector/HNSW with Titan dense embeddings + BM25 sparse via RRF; ag-Grid frontend with virtualized rows
   - Architected a modular CRUD persistence engine with Vue.js, FastAPI, NestJS, and AWS Bedrock (Claude 3.5 Sonnet); implemented RAG pipeline over financial reports for automated commentary
   - Engineered peer group analytics using Python (Pandas/NumPy) and PostgreSQL for volume-adjusted betas, rolling regressor graphs, and KDE distributions
   - Built low-latency quantitative data pipeline integrating C++ calculation engine containerized via Docker
   - Eliminated legacy headless browser infrastructure by shifting to client-side jsPDF; 80% reduction in report generation time
   - Engineered TypeScript pipeline parsing Excel models to dynamically generate Jest integration tests
   - Enabled tier-one institutional rollouts for Société Générale, RBC, and Schroders via tenant whitelabel configurations
   - Accelerated CI workflows by migrating ESLint to Rust-based Oxlint; integrated SonarQube

2. **KM.ON Asia Limited** — Hong Kong  
   *Junior Full Stack Developer* — Jul 2023 – Feb 2025  
   - Architected full-stack React.js/Express.js energy platform across AWS (EU) and Alibaba Cloud (China); Terraform IaC, ArgoCD, Helm charts with custom data-routing for GDPR/PIPL compliance
   - Engineered two-tier fan-out Python/Lambda data pipeline ingesting 1.5 TB of raw IoT log histories
   - Deployed AWS RDS Aurora PostgreSQL with TimescaleDB hypertables; sustained 2,000+ ops/sec write-throughput
   - Executed live production migration from legacy messaging to Strimzi Kafka/Karapace; custom KafkaConnectors processing 10M+ messages daily with DLQ
   - Developed Scala microservice over MQTT for bidirectional binary BLOB streaming to textile machinery
   - Integrated SBOM generation and Trivy scans into CI/CD for 15+ microservices

3. **Reap Technologies** — Hong Kong  
   *Software Engineer Intern* — Jun 2022 – Sep 2022  
   - Migrated legacy monolithic codebase into Controller-Service-Repository architecture using TDD
   - Engineered integration test suites with Docker scaffolding and mocked services

4. **BNP Paribas CIB** — Hong Kong  
   *IT Strategist (Contract)* — Feb 2021 – Aug 2021  
   - Engineered distributed fan-out data replication engine in Python routing payloads based on live server latencies
   - Designed ingestion pipeline using Kafka and Elasticsearch for sub-second dashboard refreshes
   - Developed automated deployment scripts enforcing Four-Eyes Principle with multi-party approval
   - Optimized multi-threaded C++ packet replay system using non-blocking condition variables

### Skills
Languages: Python, TypeScript, Java, Scala, Kotlin, Go, SQL, Terraform, Helm
AI/ML: AWS Bedrock, RAG, Vector DBs, Prompt Engineering
Frameworks: Vue.js, React, Nest.js, Spring, Ktor, Flask, FastAPI, Pandas
Platforms: Docker, Kubernetes, ArgoCD, Kafka, PostgreSQL, MongoDB, Redis, Elasticsearch
Clouds: AWS, Alibaba Cloud
Architecture: Microservices, Event-Driven, CQRS, GitOps, CI/CD, REST

### Projects
1. **Homelab** — 2025–Present  
   20+ self-hosted services with Golang deployment tooling and Tailscale networking.
   - Golang CLI toolchain around centralized service registry for 20+ services
   - Zero-exposure network: Tailscale mesh VPN, MagicDNS, Pi-hole, Caddy reverse proxy with self-managed PKI
   - Multi-layer observability: VictoriaMetrics, Loki, Grafana, Alertmanager, Gatus, Scrutiny
   - Engineering rigor: ruff, mypy, pytest pre-commit hooks, SHA256-pinned images, append-only changelog

### Education
**The Chinese University of Hong Kong** — Sep 2018 – Jun 2023
B.Sc. in Computer Science, Second Class Honours Upper Division (2:1)
- Concentration: Database and Information Systems
- Honors: Full Ride Admission Scholarship, The 'Sunny' Award
- Activities: English Debating Team, Google Developers Student Club

### Section Graphics
Each section has a unique SVG graphic that fades in/out via IntersectionObserver:
- **Premialab**: Data grid/search with neural nodes
- **KM.ON**: Cloud/IoT with signal waves
- **Reap**: Architecture refactoring blocks
- **BNP**: Network replication topology
- **Homelab**: Container/server stack
- **CUHK**: Academic shield with "60"

### FAQ Questions (Chat Panel)
1. What do you do? → Full-stack developer building systems across AI, infra, and product.
2. What technologies do you use? → TypeScript, Python, Go, Vue/React, Kafka, Kubernetes, AWS Bedrock, PostgreSQL.
3. Where are you based? → Hong Kong.
4. How many years of experience? → 4+ years.
5. Are you open to work? → Always open to interesting opportunities.
6. How can I contact you? → faiman.rahyaz@gmail.com or LinkedIn.

## Visual Features
- Background canvas: ~150 white rain streaks, opacity 0.08-0.15, falling vertically
- Shooting stars: every 3-5 seconds, top-right to bottom-left, ~1s duration
- CSS 3D cube: pure CSS rotating wireframe cube in background (miocene.io technique)
- Sticky HUD top-left: name + current section
- Nav dots right side: 6 dots tracking scroll position
- Bouncing scroll arrow bottom-center, fades after first scroll
- Data flow canvas in About section: animated SOURCES→INGEST→STREAM→PROCESS→STORE→SERVE
- Chat "?" button bottom-right: FAQ panel with 6 pre-computed Q&A
- Per-section SVGs: unique geometric graphics fading in/out per section
- All sections fade in on scroll (IntersectionObserver)
- Headshot: circular, grayscale via CSS filter

## Deployment
- Push to master → GitHub Pages auto-deploys
- Also works by opening index.html directly or `python3 -m http.server`
