// ── Rain Particles ──
const c = document.getElementById('bg') as HTMLCanvasElement;
const ctx = c.getContext('2d')!;

let W: number, H: number;
function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
resize();
addEventListener('resize', resize);

interface Drop {
  x: number; y: number; l: number; s: number; o: number;
}

const drops: Drop[] = Array.from({ length: 150 }, () => ({
  x: Math.random() * W, y: Math.random() * H, l: 10 + Math.random() * 15,
  s: 1 + Math.random() * 2, o: 0.08 + Math.random() * 0.07,
}));

function drawRain() {
  ctx.clearRect(0, 0, W, H);
  for (const d of drops) {
    ctx.strokeStyle = `rgba(255,255,255,${d.o})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x, d.y + d.l);
    ctx.stroke();
    d.y += d.s;
    if (d.y > H) { d.y = -d.l; d.x = Math.random() * W; }
  }
}

// ── Shooting Stars ──
interface Meteor {
  x: number; y: number; dx: number; dy: number; life: number; trail: number;
}

const meteors: Meteor[] = [];
let meteorTimer = 0;

function spawnMeteor() {
  meteors.push({
    x: W + Math.random() * W * 0.5,
    y: Math.random() * H * 0.4,
    dx: -8 - Math.random() * 6,
    dy: 4 + Math.random() * 4,
    life: 1,
    trail: 3 + Math.random() * 2,
  });
}

function drawMeteors() {
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    ctx.strokeStyle = `rgba(255,255,255,${m.life * 0.9})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.dx * m.trail, m.y - m.dy * m.trail);
    ctx.stroke();
    m.x += m.dx;
    m.y += m.dy;
    m.life -= 0.02;
    if (m.life <= 0) meteors.splice(i, 1);
  }
}

function animate() {
  drawRain();
  drawMeteors();
  meteorTimer++;
  if (meteorTimer > 180 + Math.random() * 120) {
    spawnMeteor();
    meteorTimer = 0;
  }
  requestAnimationFrame(animate);
}
animate();

// ── Section Tracking ──
const sections = document.querySelectorAll<HTMLElement>('section');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('#nav a');
const curSection = document.getElementById('cur-section')!;
const sectionNames = ['Full Stack Developer', 'About', 'Experience', 'Skills', 'Projects', 'Education'];

const obs = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const idx = [...sections].indexOf(e.target as HTMLElement);
        if (idx >= 0) curSection.textContent = sectionNames[idx];
        navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
      }
    }
  },
  { threshold: 0.3, rootMargin: '0px 0px -10% 0px' },
);
sections.forEach((s) => obs.observe(s));

// ── Scroll Arrow ──
const arrow = document.getElementById('scroll-arrow')!;
let arrowHidden = false;
arrow.addEventListener('click', () => {
  document.getElementById('about')!.scrollIntoView({ behavior: 'smooth' });
});
addEventListener(
  'scroll',
  () => {
    if (scrollY > 100 && !arrowHidden) {
      arrow.classList.add('hidden');
      arrowHidden = true;
    } else if (scrollY <= 100 && arrowHidden) {
      arrow.classList.remove('hidden');
      arrowHidden = false;
    }
  },
  { passive: true },
);

// ── Fade-in Sections ──
const fadeObs = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add('visible');
    }
  },
  { threshold: 0.1 },
);
document.querySelectorAll('.fade-in').forEach((el) => {
  if (!el.classList.contains('visible')) fadeObs.observe(el);
});

// ── Section Art Fade In/Out ──
const artObs = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      e.target.classList.toggle('visible', e.isIntersecting);
    }
  },
  { threshold: 0.25 },
);
document.querySelectorAll('.section-art').forEach((el) => {
  const section = el.closest('section');
  if (section && !section.classList.contains('visible')) artObs.observe(el);
});

// ── Chat FAQ ──
interface FaqItem {
  q: string;
  a: string;
}

const faq: FaqItem[] = [
  {
    q: 'What do you do?',
    a: "Full-stack developer building systems across AI, infrastructure, and product. Currently at Premialab working on fintech platforms.",
  },
  {
    q: 'What technologies do you use?',
    a: 'TypeScript, Python, Go, Vue/React, Kafka, Kubernetes, AWS Bedrock, PostgreSQL, Terraform, and more.',
  },
  { q: 'Where are you based?', a: 'Hong Kong.' },
  {
    q: 'How many years of experience?',
    a: '4+ years in full-stack development, data engineering, and platform infrastructure.',
  },
  {
    q: 'Are you open to work?',
    a: 'Always open to interesting opportunities. Reach out via email or LinkedIn.',
  },
  {
    q: 'How can I contact you?',
    a: 'Drop me an email at faiman.rahyaz@gmail.com or DM on LinkedIn.',
  },
];

const faqList = document.getElementById('faq-list')!;
for (const item of faq) {
  const q = document.createElement('div');
  q.className = 'q';
  q.textContent = item.q;
  const a = document.createElement('div');
  a.className = 'a';
  a.textContent = item.a;
  q.addEventListener('click', () => a.classList.toggle('open'));
  faqList.appendChild(q);
  faqList.appendChild(a);
}

function toggleChat() {
  document.getElementById('chat-panel')!.classList.toggle('open');
}
(document.getElementById('chat-btn') as HTMLButtonElement).onclick = toggleChat;

document.addEventListener('click', (e) => {
  const p = document.getElementById('chat-panel')!;
  const b = document.getElementById('chat-btn')!;
  if (p.classList.contains('open') && !p.contains(e.target as Node) && !b.contains(e.target as Node)) {
    p.classList.remove('open');
  }
});

// ── Data Flow Graph ──
const fc = document.getElementById('flow-canvas') as HTMLCanvasElement;
const fctx = fc.getContext('2d')!;
const flowNodes = ['SOURCES', 'INGEST', 'STREAM', 'PROCESS', 'STORE', 'SERVE'];
let flowT = 0;

function resizeFlow() {
  const r = fc.parentElement!.getBoundingClientRect();
  fc.width = Math.min(r.width - 2, 680);
  fc.height = 120;
}
resizeFlow();
addEventListener('resize', resizeFlow);

function drawFlow() {
  const w = fc.width;
  const h = fc.height;
  fctx.clearRect(0, 0, w, h);
  const cw = Math.min(70, w / flowNodes.length - 12);
  const gap = Math.min(16, w / flowNodes.length - cw);
  const startX = (w - (flowNodes.length * (cw + gap) - gap)) / 2;
  const y = h / 2 - 12;

  for (let i = 0; i < flowNodes.length; i++) {
    const x = startX + i * (cw + gap);
    fctx.strokeStyle = '#333';
    fctx.lineWidth = 1;
    fctx.strokeRect(x, y, cw, 24);
    fctx.fillStyle = '#555';
    fctx.font = '10px system-ui,sans-serif';
    fctx.textAlign = 'center';
    fctx.textBaseline = 'middle';
    fctx.fillText(flowNodes[i], x + cw / 2, y + 12);

    if (i < flowNodes.length - 1) {
      const nx = x + cw;
      const ny = y + 12;
      const ex = x + cw + gap;
      fctx.beginPath();
      fctx.moveTo(nx, ny);
      fctx.lineTo(ex - 6, ny - 4);
      fctx.lineTo(ex - 6, ny + 4);
      fctx.closePath();
      fctx.fillStyle = '#333';
      fctx.fill();

      const t = (flowT + i * 20) % 60;
      const px = nx + (ex - nx) * (t / 60);
      fctx.beginPath();
      fctx.arc(px, ny, 2.5, 0, Math.PI * 2);
      fctx.fillStyle = 'rgba(255,255,255,.6)';
      fctx.fill();
    }
  }
  flowT = (flowT + 1) % 60;
  requestAnimationFrame(drawFlow);
}
drawFlow();
