// ── HUD Clock ──
const hudTime = document.getElementById("hud-time");
function tick() {
  if (!hudTime) return;
  const now = new Date();
  hudTime.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} HKT`;
}
tick();
setInterval(tick, 1000);

// ── Background: Rain + Escalating Meteors ──
const c = document.getElementById("bg") as HTMLCanvasElement;
if (c) {
  const ctx = c.getContext("2d")!;
  let W: number, H: number;
  const resize = () => {
    W = c.width = innerWidth;
    H = c.height = innerHeight;
  };
  resize();
  addEventListener("resize", resize);

  // Rain — always steady
  const drops = Array.from({ length: 150 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    l: 10 + Math.random() * 15,
    s: 1 + Math.random() * 2,
    o: 0.08 + Math.random() * 0.07,
  }));

  // Meteor system with escalating intensity
  interface M {
    x: number;
    y: number;
    dx: number;
    dy: number;
    life: number;
    trail: number;
    big?: boolean;
  }
  const meteors: M[] = [];
  const fireballs: M[] = [];
  let spawnTimer = 0;
  let intensityTimer = 0;
  let intensity: 1 | 2 | 3 | 4 | 5 = 1;

  // Intensity schedule: ramps up every 10s
  // Level 1 (0-10s): normal ~3s spacing
  // Level 2 (10-20s): faster spawning
  // Level 3 (20-40s): more, bigger trails
  // Level 4 (40-80s): heavy, occasional fireballs
  // Level 5 (80-120s): chaos — multiple fireballs, huge meteors
  // Then resets

  function getSpawnRate(): number {
    return [180, 120, 80, 50, 20][intensity - 1] + Math.random() * 50;
  }

  function getMeteorProps(): Partial<M> {
    const boost = [1, 1.2, 1.5, 2, 3][intensity - 1];
    const isBig = intensity >= 4 && Math.random() < 0.3;
    return {
      dx: (-8 - Math.random() * 6) * boost,
      dy: (4 + Math.random() * 4) * boost,
      trail: (3 + Math.random() * 2) * (isBig ? 2.5 : 1),
      big: isBig,
    };
  }

  function spawnMeteor() {
    const p = getMeteorProps();
    meteors.push({
      x: W + Math.random() * W * 0.5,
      y: Math.random() * H * 0.4,
      dx: p.dx!,
      dy: p.dy!,
      life: 1,
      trail: p.trail!,
      big: p.big,
    });
  }

  function spawnFireball() {
    fireballs.push({
      x: W + 50,
      y: Math.random() * H * 0.3,
      dx: -14 - Math.random() * 10,
      dy: 6 + Math.random() * 8,
      life: 1,
      trail: 6,
    });
  }

  function draw() {
    // Update intensity every 10s
    intensityTimer++;
    if (intensityTimer > 600) {
      // 10s at 60fps
      intensityTimer = 0;
      intensity = Math.min(intensity + 1, 5) as 1 | 2 | 3 | 4 | 5;
      if (intensity === 5) {
        // Peak: spawn extra fireballs immediately
        for (let i = 0; i < 3; i++) setTimeout(spawnFireball, i * 200);
      }
    }

    ctx.clearRect(0, 0, W, H);

    // Rain
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

    // Normal meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      const lw = m.big ? 4 : 2;
      ctx.strokeStyle = `rgba(255,255,255,${m.life * 0.9})`;
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.dx * m.trail, m.y - m.dy * m.trail);
      ctx.stroke();
      // Big meteors get a glow
      if (m.big) {
        ctx.strokeStyle = `rgba(255,255,255,${m.life * 0.3})`;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.dx * m.trail * 0.5, m.y - m.dy * m.trail * 0.5);
        ctx.stroke();
      }
      m.x += m.dx;
      m.y += m.dy;
      m.life -= 0.02;
      if (m.life <= 0) meteors.splice(i, 1);
    }

    // Fireballs
    for (let i = fireballs.length - 1; i >= 0; i--) {
      const f = fireballs[i];
      ctx.fillStyle = `rgba(255,255,255,${f.life})`;
      ctx.beginPath();
      ctx.arc(f.x, f.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${f.life * 0.3})`;
      ctx.beginPath();
      ctx.arc(f.x - f.dx * 0.5, f.y - f.dy * 0.5, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${f.life * 0.6})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      ctx.lineTo(f.x - f.dx * 4, f.y - f.dy * 4);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255,255,255,${f.life * 0.2})`;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(f.x - f.dx * 0.5, f.y - f.dy * 0.5);
      ctx.lineTo(f.x - f.dx * 6, f.y - f.dy * 6);
      ctx.stroke();
      f.x += f.dx;
      f.y += f.dy;
      f.life -= 0.008;
      if (f.life <= 0) fireballs.splice(i, 1);
    }

    // Spawn logic
    spawnTimer++;
    if (spawnTimer > getSpawnRate()) {
      spawnMeteor();
      // Higher intensity = sometimes spawn extra
      if (intensity >= 3 && Math.random() < 0.3) spawnMeteor();
      if (intensity >= 4 && Math.random() < 0.15) spawnFireball();
      spawnTimer = 0;
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// ── FSM Mood Button (starts innocent, goes feral on click) ──
const btn = document.getElementById("chat-btn");
if (btn) {
  const svgEl = btn.querySelector("svg");
  const moods = ["IDLE", "STAR", "BOLT", "MOON", "ROCKET"] as const;
  type Mood = (typeof moods)[number];

  // Abstract geometric icons — no faces
  const SVGS: Record<Mood, string> = {
    IDLE: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>', // target dot
    STAR: '<path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5L8 14l-6-4.5h7.5z" fill="currentColor"/>',
    BOLT: '<path d="M13 2L4 12h7v10l9-12h-7z" fill="currentColor"/>',
    MOON: '<path d="M12 2a10 10 0 1 0 10 10 8 8 0 0 1-10-10z" fill="currentColor"/>',
    ROCKET: '<path d="M12 2l8 10h-5v10H9V12H4z" fill="currentColor"/>',
  };

  // Start innocent — just a question mark
  const INITIAL_SVG =
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10.5 9.5a2 2 0 1 1 3 1.7c-.8.5-1.5 1-1.5 2.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16" r=".8" fill="currentColor"/>';

  const CLASSES: Record<Mood, string> = {
    IDLE: "",
    STAR: "chat-happy",
    BOLT: "chat-bolt",
    MOON: "chat-sleepy",
    ROCKET: "chat-rocket",
  };
  const TRANSITIONS: Record<Mood, Array<{ to: Mood; prob: number }>> = {
    IDLE: [
      { to: "STAR", prob: 0.25 },
      { to: "BOLT", prob: 0.1 },
      { to: "MOON", prob: 0.2 },
      { to: "ROCKET", prob: 0.15 },
      { to: "IDLE", prob: 0.3 },
    ],
    STAR: [
      { to: "IDLE", prob: 0.35 },
      { to: "ROCKET", prob: 0.3 },
      { to: "MOON", prob: 0.2 },
      { to: "BOLT", prob: 0.15 },
    ],
    BOLT: [
      { to: "IDLE", prob: 0.3 },
      { to: "ROCKET", prob: 0.25 },
      { to: "STAR", prob: 0.25 },
      { to: "MOON", prob: 0.2 },
    ],
    MOON: [
      { to: "IDLE", prob: 0.5 },
      { to: "STAR", prob: 0.25 },
      { to: "ROCKET", prob: 0.15 },
      { to: "BOLT", prob: 0.1 },
    ],
    ROCKET: [
      { to: "STAR", prob: 0.3 },
      { to: "IDLE", prob: 0.25 },
      { to: "BOLT", prob: 0.25 },
      { to: "MOON", prob: 0.2 },
    ],
  };

  let mood: Mood = "IDLE";
  let mx: number | null = null;
  let my: number | null = null;
  let clickCount = 0;
  let awakened = false;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function pickNext(from: Mood): Mood {
    const t = TRANSITIONS[from];
    let r = Math.random();
    for (const { to, prob } of t) {
      r -= prob;
      if (r <= 0) return to;
    }
    return t[t.length - 1].to;
  }

  function setMood(m: Mood) {
    mood = m;
    btn.className = "";
    if (svgEl) svgEl.innerHTML = SVGS[m];
    const cls = CLASSES[m];
    if (cls) btn.classList.add(cls);
    if (m === "BOLT" && mx !== null && my !== null) {
      btn.style.transition = "left .25s,top .25s";
      btn.style.left = `${Math.max(0, Math.min(innerWidth - 44, mx - 22))}px`;
      btn.style.top = `${Math.max(0, Math.min(innerHeight - 44, my - 22))}px`;
      btn.style.bottom = "auto";
      btn.style.right = "auto";
    } else if (m === "ROCKET") {
      btn.style.transition =
        "left 1.5s cubic-bezier(.68,-.55,.27,1.55),top 1.5s cubic-bezier(.68,-.55,.27,1.55)";
      btn.style.left = `${Math.random() * (innerWidth - 44)}px`;
      btn.style.top = `${Math.random() * (innerHeight - 44)}px`;
      btn.style.bottom = "auto";
      btn.style.right = "auto";
      btn.style.bottom = "auto";
      btn.style.right = "auto";
    } else if (m === "IDLE" || m === "STAR" || m === "MOON") {
      btn.style.left = "";
      btn.style.right = "";
      btn.style.bottom = "";
      btn.style.top = "";
      btn.style.transition = "";
    }
  }

  // First click: awaken
  btn.addEventListener("click", () => {
    if (!awakened) {
      awakened = true;
      clickCount = 1;
      if (svgEl) svgEl.innerHTML = SVGS.STAR;
      btn.classList.add("chat-happy");
      btn.style.transition = "";
      btn.style.left = "";
      btn.style.right = "";
      btn.style.bottom = "";
      btn.style.top = "";
      return;
    }
    clickCount++;
    setMood(clickCount % 4 === 0 ? "ROCKET" : pickNext(mood));
  });

  // Auto-transitions only after awakened
  setInterval(
    () => {
      if (awakened && Math.random() < 0.35) setMood(pickNext(mood));
    },
    4000 + Math.random() * 4000,
  );
}
