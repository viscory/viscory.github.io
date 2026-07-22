// ── HUD Clock ──
const hudTime = document.getElementById("hud-time");
function tick() {
  if (!hudTime) return;
  const now = new Date();
  hudTime.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} HKT`;
}
tick();
setInterval(tick, 1000);

// ── Rain + Meteors + Fireball ──
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

  const drops = Array.from({ length: 150 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    l: 10 + Math.random() * 15,
    s: 1 + Math.random() * 2,
    o: 0.08 + Math.random() * 0.07,
  }));

  const meteors: Array<{
    x: number;
    y: number;
    dx: number;
    dy: number;
    life: number;
    trail: number;
  }> = [];
  let meteorTimer = 0;

  // Big fireball — rare, huge, dramatic
  let fireball: {
    x: number;
    y: number;
    dx: number;
    dy: number;
    life: number;
  } | null = null;
  let fireballTimer = 0;

  function spawnFireball() {
    fireball = {
      x: W + 50,
      y: Math.random() * H * 0.3,
      dx: -12 - Math.random() * 8,
      dy: 6 + Math.random() * 6,
      life: 1,
    };
  }

  function draw() {
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

    // Fireball — big, bright, dramatic
    if (fireball) {
      const f = fireball;
      // Bright white core
      ctx.fillStyle = `rgba(255,255,255,${f.life})`;
      ctx.beginPath();
      ctx.arc(f.x, f.y, 8, 0, Math.PI * 2);
      ctx.fill();
      // Outer glow
      ctx.fillStyle = `rgba(255,255,255,${f.life * 0.3})`;
      ctx.beginPath();
      ctx.arc(f.x - f.dx * 0.5, f.y - f.dy * 0.5, 14, 0, Math.PI * 2);
      ctx.fill();
      // Trail
      ctx.strokeStyle = `rgba(255,255,255,${f.life * 0.6})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      ctx.lineTo(f.x - f.dx * 4, f.y - f.dy * 4);
      ctx.stroke();
      // Wider faint trail
      ctx.strokeStyle = `rgba(255,255,255,${f.life * 0.2})`;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(f.x - f.dx * 0.5, f.y - f.dy * 0.5);
      ctx.lineTo(f.x - f.dx * 6, f.y - f.dy * 6);
      ctx.stroke();

      f.x += f.dx;
      f.y += f.dy;
      f.life -= 0.008;
      if (f.life <= 0) fireball = null;
    }

    meteorTimer++;
    if (meteorTimer > 180 + Math.random() * 120) {
      meteors.push({
        x: W + Math.random() * W * 0.5,
        y: Math.random() * H * 0.4,
        dx: -8 - Math.random() * 6,
        dy: 4 + Math.random() * 4,
        life: 1,
        trail: 3 + Math.random() * 2,
      });
      meteorTimer = 0;
    }

    fireballTimer++;
    // Fireball every ~15-25 seconds
    if (fireballTimer > 900 + Math.random() * 600 && !fireball) {
      spawnFireball();
      fireballTimer = 0;
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// ── FSM Mood Button ──
const btn = document.getElementById("chat-btn");
if (btn) {
  const svgEl = btn.querySelector("svg");
  const moods = ["IDLE", "HAPPY", "ANGRY", "SLEEPY", "JUMPY"] as const;
  type Mood = (typeof moods)[number];

  // Remixicon-style SVGs for each mood
  const SVGS: Record<Mood, string> = {
    IDLE: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
    HAPPY:
      '<path d="M7 14a5 5 0 0 0 10 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="9.5" r="1.5" fill="currentColor"/><circle cx="15" cy="9.5" r="1.5" fill="currentColor"/><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    ANGRY:
      '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 8.5l3 2-3 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16.5 8.5l-3 2 3 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 14.5a4 4 0 0 0 8 0" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    SLEEPY:
      '<path d="M12 2a10 10 0 1 0 10 10 8 8 0 0 1-10-10z" fill="currentColor"/><path d="M8 14c.5 1 2 2 4 2s3.5-1 4-2" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round"/>',
    JUMPY: '<path d="M12 2l8 10h-5v10H9V12H4z" fill="currentColor"/>',
  };

  const CLASSES: Record<Mood, string> = {
    IDLE: "",
    HAPPY: "chat-happy",
    ANGRY: "chat-angry",
    SLEEPY: "chat-sleepy",
    JUMPY: "chat-jumpy",
  };
  const TRANSITIONS: Record<Mood, Array<{ to: Mood; prob: number }>> = {
    IDLE: [
      { to: "HAPPY", prob: 0.25 },
      { to: "ANGRY", prob: 0.1 },
      { to: "SLEEPY", prob: 0.2 },
      { to: "JUMPY", prob: 0.15 },
      { to: "IDLE", prob: 0.3 },
    ],
    HAPPY: [
      { to: "IDLE", prob: 0.35 },
      { to: "JUMPY", prob: 0.3 },
      { to: "SLEEPY", prob: 0.2 },
      { to: "ANGRY", prob: 0.15 },
    ],
    ANGRY: [
      { to: "IDLE", prob: 0.3 },
      { to: "JUMPY", prob: 0.25 },
      { to: "HAPPY", prob: 0.25 },
      { to: "SLEEPY", prob: 0.2 },
    ],
    SLEEPY: [
      { to: "IDLE", prob: 0.5 },
      { to: "HAPPY", prob: 0.25 },
      { to: "JUMPY", prob: 0.15 },
      { to: "ANGRY", prob: 0.1 },
    ],
    JUMPY: [
      { to: "HAPPY", prob: 0.3 },
      { to: "IDLE", prob: 0.25 },
      { to: "ANGRY", prob: 0.25 },
      { to: "SLEEPY", prob: 0.2 },
    ],
  };

  let mood: Mood = "IDLE";
  let mx: number | null = null;
  let my: number | null = null;
  let clickCount = 0;
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
    if (m === "ANGRY" && mx !== null && my !== null) {
      btn.style.transition = "left .25s,top .25s";
      btn.style.left = `${Math.max(0, Math.min(innerWidth - 44, mx - 22))}px`;
      btn.style.top = `${Math.max(0, Math.min(innerHeight - 44, my - 22))}px`;
      btn.style.bottom = "auto";
      btn.style.right = "auto";
    } else if (m === "JUMPY") {
      btn.style.transition = "left .1s,top .1s";
      btn.style.left = `${Math.random() * (innerWidth - 44)}px`;
      btn.style.top = `${Math.random() * (innerHeight - 44)}px`;
      btn.style.bottom = "auto";
      btn.style.right = "auto";
    } else if (m === "IDLE" || m === "HAPPY" || m === "SLEEPY") {
      btn.style.left = "";
      btn.style.right = "";
      btn.style.bottom = "";
      btn.style.top = "";
      btn.style.transition = "";
    }
  }

  btn.addEventListener("click", () => {
    clickCount++;
    setMood(clickCount % 4 === 0 ? "JUMPY" : pickNext(mood));
  });

  setInterval(
    () => {
      if (Math.random() < 0.35) setMood(pickNext(mood));
    },
    4000 + Math.random() * 4000,
  );
}
