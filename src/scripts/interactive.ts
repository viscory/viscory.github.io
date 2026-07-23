// ── HUD Clock ──
const hudTime = document.getElementById("hud-time");
function tick() {
  if (!hudTime) return;
  const now = new Date();
  hudTime.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} HKT`;
}
tick();
setInterval(tick, 1000);

// ── HK Observatory Weather ──
const weatherEl = document.getElementById("hud-weather");
if (weatherEl) {
  async function fetchWeather() {
    try {
      const r = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en",
      );
      const d = await r.json();
      const temp = d.temperature?.data?.[0]?.value ?? d.temperature?.value;
      if (temp !== undefined) weatherEl.textContent = `${temp}\u00b0 / `;
    } catch {}
  }
  fetchWeather();
  setInterval(fetchWeather, 300000);
}

// ── Active nav on scroll ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-list a");
if (sections.length && navLinks.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.hash === `#${e.target.id}`),
          );
        }
      }
    },
    { threshold: 0.3 },
  );
  sections.forEach((s) => obs.observe(s));
}

// ── Scroll progress bar ──
const progBar = document.getElementById("scroll-progress");
if (progBar) {
  addEventListener("scroll", () => {
    const pct = scrollY / (document.documentElement.scrollHeight - innerHeight);
    progBar.style.width = `${Math.min(pct * 100, 100)}%`;
  });
}

// ── Email copy ──
const emailBtn = document.getElementById("email-btn");
const emailTip = document.getElementById("email-tip");
if (emailBtn && emailTip) {
  emailBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("faiman.rahyaz@gmail.com");
      emailTip.textContent = "Copied!";
      emailTip.classList.add("show");
      setTimeout(() => {
        emailTip.textContent = "Copy";
        emailTip.classList.remove("show");
      }, 1500);
    } catch {}
  });
  emailBtn.addEventListener("mouseenter", () => emailTip.classList.add("show"));
  emailBtn.addEventListener("mouseleave", () =>
    emailTip.classList.remove("show"),
  );
}

// ── Check motion preference ──
const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Rain + Meteors + Fireballs ──
const c = document.getElementById("bg") as HTMLCanvasElement;
if (c) {
  const ctx = c.getContext("2d")!;
  let W: number, H: number;
  let dpr = 1;
  const resize = () => {
    dpr = devicePixelRatio || 1;
    W = c.width = document.documentElement.clientWidth * dpr;
    H = c.height = document.documentElement.clientHeight * dpr;
    c.style.width = document.documentElement.clientWidth + "px";
    c.style.height = document.documentElement.clientHeight + "px";
  };
  resize();
  addEventListener("resize", resize);

  const drops = Array.from({ length: 150 }, () => ({
    x: Math.random() * document.documentElement.clientWidth,
    y: Math.random() * document.documentElement.clientHeight,
    l: 10 + Math.random() * 15,
    s: 1 + Math.random() * 2,
    o: 0.08 + Math.random() * 0.07,
  }));

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

  function getSpawnRate() {
    return [180, 120, 80, 50, 20][intensity - 1] + Math.random() * 50;
  }
  function getMeteorProps() {
    const boost = [1, 1.2, 1.5, 2, 3][intensity - 1];
    const big = intensity >= 4 && Math.random() < 0.3;
    return {
      dx: (-8 - Math.random() * 6) * boost,
      dy: (4 + Math.random() * 4) * boost,
      trail: (3 + Math.random() * 2) * (big ? 2.5 : 1),
      big,
    };
  }
  function spawnMeteor() {
    const p = getMeteorProps();
    meteors.push({
      x: W + Math.random() * W * 0.5,
      y: Math.random() * H * 0.4,
      dx: p.dx,
      dy: p.dy,
      life: 1,
      trail: p.trail,
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
    intensityTimer++;
    if (intensityTimer > 600) {
      intensityTimer = 0;
      intensity = Math.min(intensity + 1, 5) as 1 | 2 | 3 | 4 | 5;
      if (intensity === 5)
        for (let i = 0; i < 3; i++) setTimeout(spawnFireball, i * 200);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W / dpr, H / dpr);

    for (const d of drops) {
      ctx.strokeStyle = `rgba(255,255,255,${d.o})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.l);
      ctx.stroke();
      d.y += d.s;
      if (d.y > H / dpr) {
        d.y = -d.l;
        d.x = (Math.random() * W) / dpr;
      }
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      ctx.strokeStyle = `rgba(255,255,255,${m.life * 0.9})`;
      ctx.lineWidth = m.big ? 4 : 2;
      ctx.beginPath();
      ctx.moveTo(m.x / dpr, m.y / dpr);
      ctx.lineTo((m.x - m.dx * m.trail) / dpr, (m.y - m.dy * m.trail) / dpr);
      ctx.stroke();
      if (m.big) {
        ctx.strokeStyle = `rgba(255,255,255,${m.life * 0.3})`;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(m.x / dpr, m.y / dpr);
        ctx.lineTo(
          (m.x - m.dx * m.trail * 0.5) / dpr,
          (m.y - m.dy * m.trail * 0.5) / dpr,
        );
        ctx.stroke();
      }
      m.x += m.dx;
      m.y += m.dy;
      m.life -= 0.02;
      if (m.life <= 0) meteors.splice(i, 1);
    }
    for (let i = fireballs.length - 1; i >= 0; i--) {
      const f = fireballs[i];
      const fx = f.x / dpr,
        fy = f.y / dpr;
      ctx.fillStyle = `rgba(255,255,255,${f.life})`;
      ctx.beginPath();
      ctx.arc(fx, fy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${f.life * 0.3})`;
      ctx.beginPath();
      ctx.arc(
        fx - (f.dx * 0.5) / dpr,
        fy - (f.dy * 0.5) / dpr,
        14,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${f.life * 0.6})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx - (f.dx * 4) / dpr, fy - (f.dy * 4) / dpr);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255,255,255,${f.life * 0.2})`;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(fx - (f.dx * 0.5) / dpr, fy - (f.dy * 0.5) / dpr);
      ctx.lineTo(fx - (f.dx * 6) / dpr, fy - (f.dy * 6) / dpr);
      ctx.stroke();
      f.x += f.dx;
      f.y += f.dy;
      f.life -= 0.008;
      if (f.life <= 0) fireballs.splice(i, 1);
    }
    spawnTimer++;
    if (spawnTimer > getSpawnRate()) {
      spawnMeteor();
      if (intensity >= 3 && Math.random() < 0.3) spawnMeteor();
      if (intensity >= 4 && Math.random() < 0.15) spawnFireball();
      spawnTimer = 0;
    }
    if (!prefersReducedMotion()) requestAnimationFrame(draw);
  }
  draw();
}

// ── FSM Mood Button ──
const btn = document.getElementById("chat-btn");
if (btn) {
  const svgEl = btn.querySelector("svg") || btn.querySelector("i");
  const moods = ["IDLE", "STAR", "BOLT", "MOON", "ROCKET"] as const;
  type Mood = (typeof moods)[number];

  const SVGS: Record<Mood, string> = {
    IDLE: '<i class="ri-question-line"></i>',
    STAR: '<i class="ri-star-line"></i>',
    BOLT: '<i class="ri-flashlight-line"></i>',
    MOON: '<i class="ri-moon-line"></i>',
    ROCKET: '<i class="ri-rocket-2-line"></i>',
  };

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
    if (CLASSES[m]) btn.classList.add(CLASSES[m]);

    const reduced = prefersReducedMotion();
    const resetPos = () => {
      btn.style.left = "";
      btn.style.right = "";
      btn.style.bottom = "";
      btn.style.top = "";
      btn.style.transition = "";
    };

    if (m === "BOLT" && mx !== null && my !== null && !reduced) {
      btn.style.transition = "left .35s ease,top .35s ease";
      btn.style.left = `${Math.max(0, Math.min(innerWidth - 44, mx - 22))}px`;
      btn.style.top = `${Math.max(0, Math.min(innerHeight - 44, my - 22))}px`;
      btn.style.bottom = "auto";
      btn.style.right = "auto";
    } else if (m === "ROCKET" && !reduced) {
      btn.style.transition =
        "left 1.5s cubic-bezier(.68,-.55,.27,1.55),top 1.5s cubic-bezier(.68,-.55,.27,1.55)";
      btn.style.left = `${Math.random() * (innerWidth - 44)}px`;
      btn.style.top = `${Math.random() * (innerHeight - 44)}px`;
    } else {
      resetPos();
    }
  }

  btn.addEventListener("click", () => {
    if (!awakened) {
      awakened = true;
      clickCount = 1;
      if (svgEl) svgEl.innerHTML = SVGS.STAR;
      btn.classList.add("chat-happy");
      return;
    }
    clickCount++;
    setMood(clickCount % 4 === 0 ? "ROCKET" : pickNext(mood));
  });

  setInterval(
    () => {
      if (awakened && Math.random() < 0.35) setMood(pickNext(mood));
    },
    4000 + Math.random() * 4000,
  );
}
