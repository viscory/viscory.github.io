// ── HUD Clock ──
const hudTime = document.getElementById('hud-time');
function tick() {
  if (!hudTime) return;
  const now = new Date();
  hudTime.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} HKT`;
}
tick();
setInterval(tick, 1000);

// ── Rain + Meteors ──
const c = document.getElementById('bg') as HTMLCanvasElement;
if (c) {
  const ctx = c.getContext('2d')!;
  let W: number, H: number;
  const resize = () => { W = c.width = innerWidth; H = c.height = innerHeight; };
  resize();
  addEventListener('resize', resize);

  const drops = Array.from({ length: 150 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    l: 10 + Math.random() * 15, s: 1 + Math.random() * 2, o: 0.08 + Math.random() * 0.07,
  }));

  const meteors: Array<{ x: number; y: number; dx: number; dy: number; life: number; trail: number }> = [];
  let meteorTimer = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const d of drops) {
      ctx.strokeStyle = `rgba(255,255,255,${d.o})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x, d.y + d.l); ctx.stroke();
      d.y += d.s;
      if (d.y > H) { d.y = -d.l; d.x = Math.random() * W; }
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      ctx.strokeStyle = `rgba(255,255,255,${m.life * 0.9})`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.dx * m.trail, m.y - m.dy * m.trail); ctx.stroke();
      m.x += m.dx; m.y += m.dy; m.life -= 0.02;
      if (m.life <= 0) meteors.splice(i, 1);
    }
    meteorTimer++;
    if (meteorTimer > 180 + Math.random() * 120) {
      meteors.push({ x: W + Math.random() * W * 0.5, y: Math.random() * H * 0.4, dx: -8 - Math.random() * 6, dy: 4 + Math.random() * 4, life: 1, trail: 3 + Math.random() * 2 });
      meteorTimer = 0;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ── FSM Mood Button ──
const btn = document.getElementById('chat-btn');
if (btn) {
  const svgEl = btn.querySelector('svg');
  const moods = ['IDLE', 'HAPPY', 'ANGRY', 'SLEEPY', 'JUMPY'] as const;
  type Mood = (typeof moods)[number];
  const SVGS: Record<Mood, string> = {
    IDLE: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>',
    HAPPY: '<path d="M7 14a5 5 0 0 0 10 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/>',
    ANGRY: '<path d="M13 2L4 14h6v8l10-12h-6z" fill="currentColor"/>',
    SLEEPY: '<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" fill="currentColor"/><text x="16" y="10" font-size="6" font-weight="700" fill="currentColor">z</text>',
    JUMPY: '<path d="M12 2l8 10h-5v10H9V12H4z" fill="currentColor"/>',
  };
  const CLASSES: Record<Mood, string> = { IDLE: '', HAPPY: 'chat-happy', ANGRY: 'chat-angry', SLEEPY: 'chat-sleepy', JUMPY: 'chat-jumpy' };
  const TRANSITIONS: Record<Mood, Array<{ to: Mood; prob: number }>> = {
    IDLE: [{ to: 'HAPPY', prob: .25 }, { to: 'ANGRY', prob: .1 }, { to: 'SLEEPY', prob: .2 }, { to: 'JUMPY', prob: .15 }, { to: 'IDLE', prob: .3 }],
    HAPPY: [{ to: 'IDLE', prob: .35 }, { to: 'JUMPY', prob: .3 }, { to: 'SLEEPY', prob: .2 }, { to: 'ANGRY', prob: .15 }],
    ANGRY: [{ to: 'IDLE', prob: .3 }, { to: 'JUMPY', prob: .25 }, { to: 'HAPPY', prob: .25 }, { to: 'SLEEPY', prob: .2 }],
    SLEEPY: [{ to: 'IDLE', prob: .5 }, { to: 'HAPPY', prob: .25 }, { to: 'JUMPY', prob: .15 }, { to: 'ANGRY', prob: .1 }],
    JUMPY: [{ to: 'HAPPY', prob: .3 }, { to: 'IDLE', prob: .25 }, { to: 'ANGRY', prob: .25 }, { to: 'SLEEPY', prob: .2 }],
  };

  let mood: Mood = 'IDLE';
  let mx: number | null = null;
  let my: number | null = null;
  let clickCount = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

  function pickNext(from: Mood): Mood {
    const t = TRANSITIONS[from];
    let r = Math.random();
    for (const { to, prob } of t) { r -= prob; if (r <= 0) return to; }
    return t[t.length - 1].to;
  }

  function setMood(m: Mood) {
    mood = m;
    btn.className = '';
    if (svgEl) svgEl.innerHTML = SVGS[m];
    const cls = CLASSES[m];
    if (cls) btn.classList.add(cls);
    if (m === 'ANGRY' && mx !== null && my !== null) {
      btn.style.transition = 'left .25s,top .25s';
      btn.style.left = `${Math.max(0, Math.min(innerWidth - 44, mx - 22))}px`;
      btn.style.top = `${Math.max(0, Math.min(innerHeight - 44, my - 22))}px`;
      btn.style.bottom = 'auto'; btn.style.right = 'auto';
    } else if (m === 'JUMPY') {
      btn.style.transition = 'left .1s,top .1s';
      btn.style.left = `${Math.random() * (innerWidth - 44)}px`;
      btn.style.top = `${Math.random() * (innerHeight - 44)}px`;
      btn.style.bottom = 'auto'; btn.style.right = 'auto';
    } else if (m === 'IDLE' || m === 'HAPPY' || m === 'SLEEPY') {
      btn.style.left = ''; btn.style.right = ''; btn.style.bottom = ''; btn.style.top = '';
      btn.style.transition = '';
    }
  }

  btn.addEventListener('click', () => {
    clickCount++;
    setMood(clickCount % 4 === 0 ? 'JUMPY' : pickNext(mood));
  });

  setInterval(() => {
    if (Math.random() < 0.35) setMood(pickNext(mood));
  }, 4000 + Math.random() * 4000);
}
