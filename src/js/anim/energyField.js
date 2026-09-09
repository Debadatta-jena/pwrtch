/* =============================================================
   src/js/anim/energyField.js
   Premium power-industry energy field for the central 16-edge
   "power core". Pure Canvas 2D — no deps, no modules, file://-safe.

   Concept: a large central 16-edge geometric core that emits
   energy from all 16 vertices. Emissions are asynchronous per
   edge, travel along curved transmission paths toward the
   viewport edges, and occasionally pulse back toward the core
   (two-way grid flow). Layered, object-pooled particles give
   depth; mouse/scroll add parallax; device tiers + reduced
   motion keep it production-safe.
   ============================================================= */

/* Deeper, saturated tones — these read clearly on a white page
   (bright tints would wash out, so we lean to mid/saturated hues). */
const PALETTE = [
  [37, 99, 235],    // electric blue
  [14, 165, 190],   // cyan
  [13, 148, 136],   // aqua / teal
  [22, 163, 74],    // green
  [124, 58, 237],   // violet
  [219, 39, 119],   // magenta
  [217, 119, 6],    // warm amber
];
/* bias toward blue / cyan / aqua so it never becomes a rainbow */
const WEIGHTS = [0, 0, 1, 1, 2, 3, 4, 5, 5, 6];
const pickColor = () => PALETTE[WEIGHTS[(Math.random() * WEIGHTS.length) | 0]];
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);

function detectTier() {
  const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  if (coarse || w < 720) return "low";
  if (cores <= 4 || w < 1100) return "mid";
  return "high";
}

export function initEnergyField() {
  const host = document.querySelector(".bg-anim");
  if (!host) return;
  let canvas = host.querySelector("canvas");
  if (!canvas) { canvas = document.createElement("canvas"); host.appendChild(canvas); }
  let field;
  try { field = new EnergyField(canvas, host); } catch (e) {
    if (window.console) console.warn("energyField init failed", e);
    return;
  }
  field.start();
  window.__energyField = field;
}

class EnergyField {
  constructor(canvas, host) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.host = host;
    this.reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    this.intensity = host.dataset.intensity === "soft" ? "soft" : "bold";
    this.tier = detectTier();
    this.cfg = {
      high: { maxP: 460, streams: 16, dpr: 2 },
      mid:  { maxP: 260, streams: 12, dpr: 1.5 },
      low:  { maxP: 120, streams: 6,  dpr: 1 },
    }[this.tier];
    this.intensityK = this.intensity === "soft" ? 0.6 : 1;

    this.N = 16;                       // 16 edges / 16 emission zones
    this.parts = [];
    this.streams = [];
    this.ambient = [];
    this.nextEmit = new Array(this.N).fill(0);

    this.yawO = Math.random() * TAU;
    this.yawI = Math.random() * TAU;
    this.pitchO = -0.52;
    this.pitchI = 0.62;
    this.corePulse = 0;

    this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    this.scrollY = window.scrollY || 0;
    this.baseCenter = { x: 0, y: 0 };
    this.center = { x: 0, y: 0 };
    this.textC = { x: 0, y: 0, hw: 1, hh: 1 };
    this.R = 240;
    this.fov = 900;
    this.W = 0; this.H = 0; this.dpr = 1;

    this.fps = 60; this._fAcc = 0; this._fN = 0; this._fT = 0; this._degraded = false;
    this.last = 0; this.rafId = 0; this._running = false;

    this.resize();
    this.buildStreams();
    this.bind();
  }

  rotY(p, t) { const c = Math.cos(t), s = Math.sin(t); return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]; }
  rotX(p, t) { const c = Math.cos(t), s = Math.sin(t); return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]; }
  proj(x, y, z) {
    const p = this.fov / (this.fov - z);
    return [this.center.x + x * p, this.center.y + y * p, z];
  }
  ringPoints(R, yaw, pitch, plane) {
    const out = [];
    for (let k = 0; k < this.N; k++) {
      const a = (k * TAU) / this.N;
      let p;
      if (plane === 0) p = [Math.cos(a) * R, Math.sin(a) * R, 0];
      else p = [Math.cos(a) * R, 0, Math.sin(a) * R];
      p = this.rotY(p, yaw);
      p = this.rotX(p, pitch);
      const pr = this.proj(p[0], p[1], p[2]);
      const zn = Math.max(0, Math.min(1, (p[2] + R) / (2 * R)));
      const alpha = 0.35 + 0.65 * zn;
      out.push({ x: pr[0], y: pr[1], z: pr[2], alpha, color: PALETTE[k % PALETTE.length] });
    }
    return out;
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.W = w; this.H = h;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.cfg.dpr);
    this.canvas.width = Math.floor(w * this.dpr);
    this.canvas.height = Math.floor(h * this.dpr);
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const desktop = w >= 1024;
    this.baseCenter.x = w * 0.5;
    this.baseCenter.y = desktop ? h * 0.46 : h * 0.42;
    this.R = Math.min(w, h) * (this.tier === "low" ? 0.24 : 0.30);
    this.fov = this.R * 3.2;
    /* calm zone around the hero copy so text stays readable */
    this.textC.x = w * 0.5;
    this.textC.y = h * 0.44;
    this.textC.hw = Math.min(w * 0.34, 430);
    this.textC.hh = h * 0.26;
    this.buildAmbient();
  }

  buildStreams() {
    const n = this.cfg.streams;
    this.streams = [];
    const now = performance.now();
    for (let i = 0; i < n; i++) {
      const k = Math.round((i * this.N) / n) % this.N;
      this.streams.push({
        k,
        long: true,                         // every stream reaches toward an edge
        ret: i % 2 === 0,                   // half send pulses back to the core
        curve: i % 2 ? 1 : -1,
        speed: rand(0.32, 0.7),
        color: PALETTE[i % PALETTE.length],
        next: now + rand(200, 1600),
        pulse: null,
        _s: null, _c: null, _e: null,
      });
    }
  }

  bind() {
    this._onResize = () => this.resize();
    window.addEventListener("resize", this._onResize);
    this._onMove = (e) => {
      this.mouse.tx = (e.clientX / this.W) * 2 - 1;
      this.mouse.ty = (e.clientY / this.H) * 2 - 1;
    };
    window.addEventListener("mousemove", this._onMove, { passive: true });
    this._onScroll = () => { this.scrollY = window.scrollY || 0; };
    window.addEventListener("scroll", this._onScroll, { passive: true });
    this._onVis = () => { if (document.hidden) this.stop(); else this.start(); };
    document.addEventListener("visibilitychange", this._onVis);
  }

  start() {
    if (this._running) return;
    this._running = true;
    this.last = performance.now();
    const loop = (t) => {
      if (!this._running) return;
      let dt = (t - this.last) / 1000;
      this.last = t;
      if (dt > 0.05) dt = 0.05;
      this.step(dt, t);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }
  stop() { this._running = false; if (this.rafId) cancelAnimationFrame(this.rafId); }

  step(dt, now) {
    this.sampleFps(dt, now);
    this.mouse.x += (this.mouse.tx - this.mouse.x) * Math.min(1, dt * 4);
    this.mouse.y += (this.mouse.ty - this.mouse.y) * Math.min(1, dt * 4);

    /* fixed, centred atom (no scroll drift) */
    this.center.x = this.baseCenter.x + this.mouse.x * 14;
    this.center.y = this.baseCenter.y + this.mouse.y * 11;

    const spO = this.reduce ? 0.05 : 0.14;
    const spI = this.reduce ? 0.04 : 0.23;
    this.yawO += (spO + this.mouse.x * 0.05) * dt;
    this.yawI -= (spI - this.mouse.x * 0.04) * dt;
    this.corePulse += dt * (this.reduce ? 0.6 : 1.1);

    const outer = this.ringPoints(this.R, this.yawO, this.pitchO, 0);
    const inner = this.ringPoints(this.R * 0.6, this.yawI, this.pitchI, 1);

    if (!this.reduce) {
      this.emitFromEdges(outer, now);
      this.updateParts(dt);
      this.updateAmbient(dt);
      this.updateStreams(outer, now, dt);
    }
    this.draw(outer, inner, now);
  }

  emitFromEdges(outer, now) {
    if (this.parts.length >= this.cfg.maxP) return;
    for (let k = 0; k < this.N; k++) {
      if (now < this.nextEmit[k]) continue;
      this.nextEmit[k] = now + rand(320, 1900);
      const o = outer[k];
      let dx = o.x - this.center.x, dy = o.y - this.center.y;
      const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
      const r = Math.random();
      if (r < 0.40) this.spawnSpark(o, dx, dy);
      else if (r < 0.62) this.spawnStreak(o, dx, dy);
      else if (r < 0.84) this.spawnCluster(o, dx, dy);
      else this.spawnArc(o, dx, dy);
      if (Math.random() < 0.5) this.spawnSpark(o, dx, dy); // denser field
    }
  }

  spawnSpark(o, dx, dy) {
    const a = Math.atan2(dy, dx) + rand(-0.55, 0.55);
    const sp = rand(80, 260);
    this.parts.push({
      type: "spark", dead: false, z: rand(0.35, 0.95),
      x: o.x, y: o.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
      life: rand(0.6, 1.3), max: 1.3, size: rand(1.6, 3.2), color: pickColor(),
    });
  }
  spawnStreak(o, dx, dy) {
    const a = Math.atan2(dy, dx) + rand(-0.35, 0.35);
    const sp = rand(110, 280);
    this.parts.push({
      type: "streak", dead: false, z: rand(0.4, 0.95),
      x: o.x, y: o.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
      ang: a, life: rand(0.6, 1.1), max: 1.1, size: rand(20, 46), color: pickColor(),
    });
  }
  spawnCluster(o, dx, dy) {
    const n = 3 + ((Math.random() * 4) | 0);
    for (let i = 0; i < n; i++) {
      const a = Math.atan2(dy, dx) + rand(-0.7, 0.7);
      const sp = rand(30, 110);
      this.parts.push({
        type: "particle", dead: false, z: rand(0.3, 0.9),
        x: o.x, y: o.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: rand(0.9, 1.8), max: 1.8, size: rand(1.4, 3.0), color: pickColor(),
      });
    }
  }
  spawnArc(o, dx, dy) {
    this.parts.push({
      type: "arc", dead: false, z: rand(0.5, 1),
      x: o.x, y: o.y, vx: 0, vy: 0, r: 3, vr: rand(46, 90),
      life: rand(0.5, 0.85), max: 0.85, size: 0, color: pickColor(),
    });
  }

  updateParts(dt) {
    const drift = this.scrollY * 0.12;
    for (const p of this.parts) {
      if (p.dead) continue;
      p.life -= dt;
      if (p.life <= 0) { p.dead = true; continue; }
      if (p.type === "arc") { p.r += p.vr * dt; continue; }
      p.x += p.vx * dt;
      p.y += p.vy * dt + drift * p.z * dt;
      p.vx *= 0.98; p.vy *= 0.98;
    }
    if (this.parts.length > this.cfg.maxP * 1.5) this.parts = this.parts.filter((p) => !p.dead);
  }

  updateStreams(outer, now, dt) {
    for (const s of this.streams) {
      const start = outer[s.k];
      let dx = start.x - this.center.x, dy = start.y - this.center.y;
      const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
      const reach = this.edgeReach(start.x, start.y, dx, dy);
      const ex = this.center.x + dx * reach, ey = this.center.y + dy * reach;
      const mx = (start.x + ex) / 2, my = (start.y + ey) / 2;
      const px = -dy, py = dx;
      const curve = s.curve * reach * 0.3;
      s._s = start; s._c = { x: mx + px * curve, y: my + py * curve }; s._e = { x: ex, y: ey };

      if (!s.pulse && now > s.next) {
        s.next = now + rand(700, 2200);
        s.pulse = {
          t: s.ret ? 1 : 0, tdir: s.ret ? -1 : 1,
          color: s.ret ? PALETTE[5] : s.color,
          size: rand(2.6, 4.2),
        };
      }
      if (s.pulse) {
        s.pulse.t += s.pulse.tdir * s.speed * dt;
        if (s.pulse.t > 1 || s.pulse.t < 0) s.pulse = null;
      }
    }
  }
  edgeReach(x, y, dx, dy) {
    const rx = dy !== 0 ? ((dy > 0 ? this.H : 0) - y) / dy : Infinity;
    const ry = dx !== 0 ? ((dx > 0 ? this.W : 0) - x) / dx : Infinity;
    const r = Math.min(rx, ry) * 0.98;
    return Math.max(r, this.R * 1.3);
  }
  bez(s, c, e, t) {
    const u = 1 - t;
    return [u * u * s.x + 2 * u * t * c.x + t * t * e.x, u * u * s.y + 2 * u * t * c.y + t * t * e.y];
  }

  draw(outer, inner, now) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);
    ctx.globalCompositeOperation = "source-over";

    this.drawHalo(ctx);
    this.drawAmbient(ctx);
    this.drawAtom(ctx, outer, inner, now);
    if (!this.reduce) this.drawStreams(ctx, outer);
    this.drawParts(ctx);
  }

  /* subtle light-blue haze so the energy has contrast on white */
  drawHalo(ctx) {
    const K = this.intensityK;
    const gc = this.guardAt(this.center.x, this.center.y);
    const g = ctx.createRadialGradient(this.center.x, this.center.y, 0, this.center.x, this.center.y, this.R * 1.7);
    g.addColorStop(0, `rgba(37,99,235,${0.12 * K * gc})`);
    g.addColorStop(0.5, `rgba(56,189,248,${0.05 * K * gc})`);
    g.addColorStop(1, "rgba(37,99,235,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.W, this.H);
  }

  /* ---- Atomic / nuclear model ---- */
  drawAtom(ctx, outer, inner, now) {
    const K = this.intensityK;
    const t = this.reduce ? 0 : now / 1000;

    /* faint atomic shell linking the 16 nuclei (rotates in 3D) */
    this.drawRing(ctx, outer, K * 0.5, 1.2, 4);

    /* central neutron: glow + solid core */
    const gcore = this.guardAt(this.center.x, this.center.y);
    const pulse = 0.18 + 0.12 * (0.5 + 0.5 * Math.sin(this.corePulse));
    const cr = this.R * (0.30 + 0.05 * Math.sin(this.corePulse));
    const g = ctx.createRadialGradient(this.center.x, this.center.y, 0, this.center.x, this.center.y, cr * 2.6);
    g.addColorStop(0, rgba([191, 219, 254], 0.85 * K * gcore));
    g.addColorStop(0.35, rgba(PALETTE[0], pulse * K * gcore));
    g.addColorStop(1, rgba(PALETTE[0], 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(this.center.x, this.center.y, cr * 2.6, 0, TAU); ctx.fill();
    ctx.fillStyle = rgba([224, 242, 254], 0.95 * K * gcore);
    ctx.shadowColor = rgba([56, 189, 248], 0.9); ctx.shadowBlur = 18;
    ctx.beginPath(); ctx.arc(this.center.x, this.center.y, this.R * 0.14, 0, TAU); ctx.fill();
    ctx.shadowBlur = 0;

    /* central neutron: electron + proton shells */
    this.drawOrbitPair(ctx, this.center.x, this.center.y, this.R * 0.52, 3, 2, t * 0.9, -t * 1.3, PALETTE[2], PALETTE[6], K);
    this.drawOrbitPair(ctx, this.center.x, this.center.y, this.R * 0.76, 4, 2, -t * 0.6, t * 0.9, PALETTE[4], PALETTE[5], K);

    /* 16 neutrons: dot + outward glowing spikes + orbiting electrons & protons */
    for (let k = 0; k < outer.length; k++) {
      const v = outer[k];
      const gv = this.guardAt(v.x, v.y);
      ctx.fillStyle = rgba(v.color, (0.7 + 0.3 * v.alpha) * K * gv);
      ctx.shadowColor = rgba(v.color, 0.95); ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(v.x, v.y, 4.2, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;

      let dx = v.x - this.center.x, dy = v.y - this.center.y;
      const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
      this.drawSpikes(ctx, v.x, v.y, dx, dy, v.color, K, t, k);
      this.drawOrbitPair(ctx, v.x, v.y, 22, 2, 1, t * 1.6 + k, -(t * 2.2) - k, v.color, PALETTE[6], K);
    }
  }

  drawOrbitPair(ctx, cx, cy, radius, eCount, pCount, ePhase, pPhase, eColor, pColor, K) {
    /* electrons: cool, tilted orbit (squash 0.62) */
    for (let i = 0; i < eCount; i++) {
      const a = ePhase + (i * TAU) / eCount;
      const x = cx + Math.cos(a) * radius;
      const y = cy + Math.sin(a) * radius * 0.62;
      const gg = this.guardAt(x, y);
      ctx.fillStyle = rgba(eColor, 0.9 * K * gg);
      ctx.shadowColor = rgba(eColor, 0.9); ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(x, y, 2.6, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;
    }
    /* protons: warm, inner radius, steeper tilt + opposite phase (3D counter-rotation) */
    const pr = radius * 0.6;
    for (let i = 0; i < pCount; i++) {
      const a = pPhase + (i * TAU) / pCount;
      const x = cx + Math.cos(a) * pr;
      const y = cy + Math.sin(a) * pr * 0.42;
      const gg = this.guardAt(x, y);
      ctx.fillStyle = rgba(pColor, 0.95 * K * gg);
      ctx.shadowColor = rgba(pColor, 0.95); ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(x, y, 2.9, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  drawSpikes(ctx, x, y, dx, dy, color, K, t, seed) {
    const N = 3;
    const baseLen = this.R * 0.42;
    ctx.lineCap = "round";
    for (let i = 0; i < N; i++) {
      const ang = Math.atan2(dy, dx) + (i - (N - 1) / 2) * 0.5 + t * 0.6 + seed;
      const ux = Math.cos(ang), uy = Math.sin(ang);
      const pls = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.7 + seed);
      const L = baseLen * pls;
      const ex = x + ux * L, ey = y + uy * L;
      const gm = this.guardAt((x + ex) / 2, (y + ey) / 2);
      const g = ctx.createLinearGradient(x, y, ex, ey);
      g.addColorStop(0, rgba(color, 0.5 * K * gm));
      g.addColorStop(1, rgba(color, 0));
      ctx.strokeStyle = g; ctx.lineWidth = 2.2;
      ctx.shadowColor = rgba(color, 0.7); ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = rgba(color, 0.6 * K * gm);
      ctx.beginPath(); ctx.arc(ex, ey, 1.8, 0, TAU); ctx.fill();
    }
    ctx.lineCap = "butt";
  }
  drawRing(ctx, ring, K, lw, blur) {
    for (let k = 0; k < ring.length; k++) {
      const a = ring[k], b = ring[(k + 1) % ring.length];
      const g = (this.guardAt(a.x, a.y) + this.guardAt(b.x, b.y)) / 2;
      ctx.strokeStyle = rgba(a.color, a.alpha * 0.95 * K * g);
      ctx.lineWidth = lw;
      ctx.shadowColor = rgba(a.color, 0.9); ctx.shadowBlur = blur;
      ctx.beginPath();       ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }

  /* energy released from each neutron travels out to the page edges (full-page coverage) */
  drawStreams(ctx, outer) {
    const K = this.intensityK;
    for (const s of this.streams) {
      if (!s._s || !s._e) continue;
      const g = (this.guardAt(s._s.x, s._s.y) + this.guardAt(s._e.x, s._e.y)) / 2;
      const grad = ctx.createLinearGradient(s._s.x, s._s.y, s._e.x, s._e.y);
      grad.addColorStop(0, rgba(s.color, 0.22 * K * g));
      grad.addColorStop(1, rgba(s.color, 0));
      ctx.strokeStyle = grad; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(s._s.x, s._s.y);
      ctx.quadraticCurveTo(s._c.x, s._c.y, s._e.x, s._e.y); ctx.stroke();
      if (s.pulse) {
        const tt = s.pulse.t;
        const pt = this.bez(s._s, s._c, s._e, tt);
        const gp = this.guardAt(pt[0], pt[1]);
        const a = (0.5 + 0.5 * Math.sin(tt * Math.PI)) * K * gp;
        ctx.fillStyle = rgba(s.pulse.color, a);
        ctx.shadowColor = rgba(s.pulse.color, 0.9); ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(pt[0], pt[1], s.pulse.size * (0.6 + 0.4 * Math.sin(tt * Math.PI)), 0, TAU); ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }

  drawParts(ctx) {
    const K = this.intensityK;
    for (const p of this.parts) {
      if (p.dead) continue;
      const lf = p.life / p.max;
      const px = p.x + this.mouse.x * p.z * 18;
      const py = p.y + this.mouse.y * p.z * 18;
      const dx = (px - this.textC.x) / this.textC.hw;
      const dy = (py - this.textC.y) / this.textC.hh;
      const inside = Math.sqrt(dx * dx + dy * dy) < 1;
      const guard = inside ? 0.32 + 0.68 * Math.sqrt(dx * dx + dy * dy) : 1;
      const a = lf * guard * K;

      if (p.type === "spark") {
        const fl = 0.6 + 0.4 * Math.sin(p.life * 38);
        ctx.fillStyle = rgba(p.color, a * (0.6 + fl * 0.4));
        ctx.shadowColor = rgba(p.color, 0.9); ctx.shadowBlur = 9;
        ctx.beginPath(); ctx.arc(px, py, p.size * 1.8, 0, TAU); ctx.fill();     // halo
        ctx.shadowBlur = 0;
        ctx.fillStyle = rgba([255, 255, 255], a * 0.5);
        ctx.beginPath(); ctx.arc(px, py, p.size * 0.7, 0, TAU); ctx.fill();    // hot core
      } else if (p.type === "streak") {
        const tx = px - Math.cos(p.ang) * p.size, ty = py - Math.sin(p.ang) * p.size;
        const g = ctx.createLinearGradient(tx, ty, px, py);
        g.addColorStop(0, rgba(p.color, 0)); g.addColorStop(1, rgba(p.color, a));
        ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = "round";
        ctx.shadowColor = rgba(p.color, 0.8); ctx.shadowBlur = 7;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py); ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (p.type === "particle") {
        ctx.fillStyle = rgba(p.color, a * 0.9);
        ctx.shadowColor = rgba(p.color, 0.85); ctx.shadowBlur = 7;
        ctx.beginPath(); ctx.arc(px, py, p.size * 1.6, 0, TAU); ctx.fill();
        ctx.shadowBlur = 0;
      } else if (p.type === "arc") {
        ctx.strokeStyle = rgba(p.color, a * 0.85);
        ctx.lineWidth = 1.8;
        ctx.shadowColor = rgba(p.color, 0.8); ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.arc(px, py, p.r, 0, TAU); ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
  }

  /* distance-based dimming so the centred core stays readable behind text */
  guardAt(x, y) {
    const dx = (x - this.textC.x) / this.textC.hw;
    const dy = (y - this.textC.y) / this.textC.hh;
    const d = Math.sqrt(dx * dx + dy * dy);
    return d < 1 ? (0.4 + 0.6 * d) : 1;
  }

  /* full-viewport ambient energy — makes the field cover the whole page */
  buildAmbient() {
    const n = { high: 120, mid: 70, low: 34 }[this.tier];
    this.ambient = [];
    for (let i = 0; i < n; i++) {
      this.ambient.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16,
        r: rand(1.0, 2.6),
        color: PALETTE[(Math.random() * PALETTE.length) | 0],
      });
    }
  }

  updateAmbient(dt) {
    for (const p of this.ambient) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.x < -12) p.x = this.W + 12; else if (p.x > this.W + 12) p.x = -12;
      if (p.y < -12) p.y = this.H + 12; else if (p.y > this.H + 12) p.y = -12;
    }
  }

  drawAmbient(ctx) {
    const K = this.intensityK;
    const A = this.ambient;
    const LINK = 170;
    ctx.lineWidth = 1;
    for (let i = 0; i < A.length; i++) {
      const a = A[i];
      const ga = this.guardAt(a.x, a.y);
      for (let j = i + 1; j < A.length; j++) {
        const b = A[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          const gb = this.guardAt(b.x, b.y);
          const al = (1 - d / LINK) * 0.16 * K * ga * gb;
          if (al <= 0.002) continue;
          ctx.strokeStyle = rgba(a.color, al);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = rgba(a.color, 0.30 * K * ga);
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, TAU); ctx.fill();
    }
  }

  /* atom model: orbiting electrons convey the rotation (no separate highlight) */

  sampleFps(dt, now) {
    this._fAcc += dt; this._fN++;
    if (now - this._fT > 1500) {
      this.fps = this._fN / this._fAcc;
      this._fT = now; this._fAcc = 0; this._fN = 0;
      if (!this._degraded && this.fps < 40 && this.tier === "high") {
        this._degraded = true;
        this.cfg = { maxP: 230, streams: 12, dpr: 1.5 };
        this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        this.resize();
      }
    }
  }
}
