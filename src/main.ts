// ── HUD Clock ──
const hudTime = document.getElementById("hud-time")!;
function tick() {
  const now = new Date();
  hudTime.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} HKT`;
}
tick();
setInterval(tick, 1000);

// ── Background Canvas (Rain + Meteors) ──
const c = document.getElementById("bg") as HTMLCanvasElement;
const ctx = c.getContext("2d")!;
let W: number, H: number;
function resize() {
  W = c.width = innerWidth;
  H = c.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const drops = Array.from({ length: 150 }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  l: 10 + Math.random() * 15,
  s: 1 + Math.random() * 2,
  o: 0.08 + Math.random() * 0.07,
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
    if (d.y > H) {
      d.y = -d.l;
      d.x = Math.random() * W;
    }
  }
}

const meteors: Array<{
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
  trail: number;
}> = [];
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
const sections = document.querySelectorAll<HTMLElement>("section");
const navLinks = document.querySelectorAll<HTMLAnchorElement>("#nav a");
new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const idx = [...sections].indexOf(e.target as HTMLElement);
        navLinks.forEach((a, i) => a.classList.toggle("active", i === idx));
      }
    }
  },
  { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
).observe(sections[0]); // observe all
sections.forEach((s) => {
  new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add("visible");
      }
    },
    { threshold: 0.1 },
  ).observe(s);
});

// ── Scroll Arrow ──
const arrow = document.getElementById("scroll-arrow")!;
let arrowHidden = false;
arrow.addEventListener("click", () =>
  document.getElementById("about")!.scrollIntoView({ behavior: "smooth" }),
);
addEventListener(
  "scroll",
  () => {
    if (scrollY > 100 && !arrowHidden) {
      arrow.classList.add("hidden");
      arrowHidden = true;
    } else if (scrollY <= 100 && arrowHidden) {
      arrow.classList.remove("hidden");
      arrowHidden = false;
    }
  },
  { passive: true },
);

// ── Chat Button FSM ──
type Mood = "IDLE" | "HAPPY" | "ANGRY" | "SLEEPY" | "JUMPY";
interface MoodState {
  svg: string;
  anim: string;
  transitions: Array<{ to: Mood; prob: number }>;
  onActivate?: () => void;
}

const SVGS: Record<Mood, string> = {
  IDLE: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>',
  HAPPY:
    '<path d="M7 14a5 5 0 0 0 10 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/>',
  ANGRY: '<path d="M13 2L4 14h6v8l10-12h-6z" fill="currentColor"/>',
  SLEEPY:
    '<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" fill="currentColor"/><text x="16" y="10" font-size="6" font-weight="700" fill="currentColor">z</text>',
  JUMPY: '<path d="M12 2l8 10h-5v10H9V12H4z" fill="currentColor"/>',
};

const FSM: Record<Mood, MoodState> = {
  IDLE: {
    svg: SVGS.IDLE,
    anim: "",
    transitions: [
      { to: "HAPPY", prob: 0.25 },
      { to: "ANGRY", prob: 0.1 },
      { to: "SLEEPY", prob: 0.2 },
      { to: "JUMPY", prob: 0.15 },
      { to: "IDLE", prob: 0.3 },
    ],
  },
  HAPPY: {
    svg: SVGS.HAPPY,
    anim: "chat-happy",
    transitions: [
      { to: "IDLE", prob: 0.35 },
      { to: "JUMPY", prob: 0.3 },
      { to: "SLEEPY", prob: 0.2 },
      { to: "ANGRY", prob: 0.15 },
    ],
    onActivate: () => {
      btn.style.transform = "";
      btn.style.left = "";
      btn.style.right = "";
      btn.style.bottom = "";
      btn.style.top = "";
    },
  },
  ANGRY: {
    svg: SVGS.ANGRY,
    anim: "chat-angry",
    transitions: [
      { to: "IDLE", prob: 0.3 },
      { to: "JUMPY", prob: 0.25 },
      { to: "HAPPY", prob: 0.25 },
      { to: "SLEEPY", prob: 0.2 },
    ],
    onActivate: () => {
      if (mx || my) {
        btn.style.transition = "left .3s,top .3s";
        btn.style.left = `${Math.max(0, Math.min(innerWidth - 44, mx! - 22))}px`;
        btn.style.top = `${Math.max(0, Math.min(innerHeight - 44, my! - 22))}px`;
        btn.style.bottom = "auto";
        btn.style.right = "auto";
      }
    },
  },
  SLEEPY: {
    svg: SVGS.SLEEPY,
    anim: "chat-sleepy",
    transitions: [
      { to: "IDLE", prob: 0.5 },
      { to: "HAPPY", prob: 0.25 },
      { to: "JUMPY", prob: 0.15 },
      { to: "ANGRY", prob: 0.1 },
    ],
    onActivate: () => {
      btn.style.transform = "";
      btn.style.left = "";
      btn.style.right = "";
      btn.style.bottom = "";
      btn.style.top = "";
    },
  },
  JUMPY: {
    svg: SVGS.JUMPY,
    anim: "chat-jumpy",
    transitions: [
      { to: "HAPPY", prob: 0.3 },
      { to: "IDLE", prob: 0.25 },
      { to: "ANGRY", prob: 0.25 },
      { to: "SLEEPY", prob: 0.2 },
    ],
    onActivate: () => {
      btn.style.transition = "left .12s,top .12s";
      btn.style.left = `${Math.random() * (innerWidth - 44)}px`;
      btn.style.top = `${Math.random() * (innerHeight - 44)}px`;
      btn.style.bottom = "auto";
      btn.style.right = "auto";
    },
  },
};

let mood: Mood = "IDLE";
let mx: number | null = null;
let my: number | null = null;
let gagClicks = 0;

const btn = document.getElementById("chat-btn")!;
const svgEl = btn.querySelector("svg")!;

// Track mouse for ANGRY chase
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function pickTransition(from: Mood): Mood {
  const t = FSM[from].transitions;
  let r = Math.random();
  for (const { to, prob } of t) {
    r -= prob;
    if (r <= 0) return to;
  }
  return t[t.length - 1].to;
}

function setMood(m: Mood) {
  mood = m;
  const state = FSM[m];
  btn.className = "";
  if (state.anim) btn.classList.add(state.anim);
  svgEl.innerHTML = state.svg;
  state.onActivate?.();
}

btn.addEventListener("click", () => {
  gagClicks++;
  // Every 4 clicks force JUMPY as a treat
  const next = gagClicks % 4 === 0 ? ("JUMPY" as Mood) : pickTransition(mood);
  setMood(next);
});

// Idle auto-transitions every 4-8 seconds
setInterval(
  () => {
    if (Math.random() < 0.35) setMood(pickTransition(mood));
  },
  4000 + Math.random() * 4000,
);
