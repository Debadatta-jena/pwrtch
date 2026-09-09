/* =============================================================
   src/js/core/motion-system.js
   The single global motion language. Every page uses this.
   ============================================================= */
import { MOTION } from "../config/tokens.js";
import { $, $$, lerp, clamp, prefersReducedMotion, isTouch, splitWords, rafLoop } from "./utils.js";
import { initTilt } from "./tilt.js";
import { initScrollFx } from "./scroll-fx.js";

export class MotionSystem {
  constructor() {
    this.reduce = prefersReducedMotion();
    this.touch = isTouch();
    this.started = false;
  }

  init() {
    if (this.started) return;
    this.started = true;
    this.scrollProgress();
    this.reveal();
    this.text();
    this.counters();
    this.parallax();
    this.magnetic();
    this.hover();
    this.header();
    this.cursor();
    this.pageTransition();
    this.tilt();
    this.scrollFx();
    this.onLoad();
  }

  /* ---- 3D pointer tilt (data-tilt) ---- */
  tilt() { initTilt(); }

  /* ---- Advanced scroll FX (parallax-3d, marquee, preloader, pin, …) ---- */
  scrollFx() { initScrollFx(); }

  /* ---- Scroll progress bar ---- */
  scrollProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
        bar.style.transform = `scaleX(${clamp(p, 0, 1)})`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Reveal (variants via class, stagger via group) ---- */
  reveal() {
    const items = $$(".reveal, [data-reveal]");
    if (!items.length) return;
    if (this.reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    items.forEach((el) => {
      const v = el.dataset.reveal;
      if (v) {
        if (!el.classList.contains("reveal")) el.classList.add("reveal");
        el.classList.add("reveal-" + v);
      }
    });
    const groups = new Map();
    items.forEach((el) => {
      const g = el.closest(".reveal-group");
      if (g) {
        if (!groups.has(g)) groups.set(g, 0);
        const i = groups.get(g);
        groups.set(g, i + 1);
        el.style.setProperty("--d", `${Math.min(i, 8) * MOTION.delay.step}s`);
      }
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: MOTION.revealThreshold, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
    /* Hard fallback: never leave content hidden if the observer never fires */
    const revealAll = () => items.forEach((el) => el.classList.add("in"));
    if (document.readyState === "complete") setTimeout(revealAll, 1000);
    else window.addEventListener("load", () => setTimeout(revealAll, 1000), { once: true });
  }

  /* ---- Text reveal (words / mask) ---- */
  text() {
    const nodes = $$("[data-split]");
    if (!nodes.length) return;
    if (this.reduce) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }
    nodes.forEach((n) => splitWords(n));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.4 }
    );
    nodes.forEach((n) => io.observe(n));
    const showAll = () => nodes.forEach((n) => n.classList.add("in"));
    if (document.readyState === "complete") setTimeout(showAll, 1000);
    else window.addEventListener("load", () => setTimeout(showAll, 1000), { once: true });
  }

  /* ---- Counters ---- */
  counters() {
    const nums = $$(".metric-num");
    if (!nums.length) return;
    const run = (el) => {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      const target = parseFloat(el.dataset.target || "0");
      const suffix = el.dataset.suffix || "";
      if (this.reduce) { el.textContent = target.toLocaleString() + suffix; return; }
      const dur = MOTION.duration.slow * 1000;
      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    const io = new IntersectionObserver((es, obs) => es.forEach((x) => { if (x.isIntersecting) { run(x.target); obs.disconnect(); } }), { threshold: 0.5 });
    nums.forEach((n) => io.observe(n));
    setTimeout(() => nums.forEach(run), 1000);
  }

  /* ---- Parallax (data-parallax) ---- */
  parallax() {
    if (this.reduce || this.touch) return;
    const els = $$("[data-parallax]");
    if (!els.length) return;
    const items = els.map((el) => ({ el, speed: parseFloat(el.dataset.parallax) || 0.2 }));
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      items.forEach(({ el, speed }) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const offset = (center - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${(-offset * speed * 100).toFixed(2)}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---- Magnetic buttons (data-magnetic) ---- */
  magnetic() {
    if (this.reduce || this.touch) return;
    $$("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.3;
      el.style.willChange = "transform";
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ---- Hover states (mostly CSS; just mark interactive) ---- */
  hover() {
    $$("[data-hover]").forEach((el) => el.classList.add("hover-" + el.dataset.hover));
  }

  /* ---- Header shrink + active nav ---- */
  header() {
    const header = $("#siteHeader");
    if (!header) return;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Custom cursor (desktop) — event-driven, no idle rAF ---- */
  cursor() {
    if (this.touch || this.reduce) return;
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my, ticking = false;
    const step = () => {
      rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      if (Math.abs(rx - mx) > 0.4 || Math.abs(ry - my) > 0.4) requestAnimationFrame(step);
      else ticking = false;
    };
    document.addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (!ticking) { ticking = true; requestAnimationFrame(step); }
    });
    const setCursor = (mode, label) => {
      ring.dataset.mode = mode || "";
      const lbl = ring.querySelector(".cursor-label");
      if (lbl) lbl.textContent = label || "";
    };
    $$("[data-cursor]").forEach((el) => {
      el.addEventListener("pointerenter", () => setCursor(el.dataset.cursor, el.dataset.cursorLabel || ""));
      el.addEventListener("pointerleave", () => setCursor("", ""));
    });
    document.addEventListener("pointerdown", () => ring.classList.add("down"));
    document.addEventListener("pointerup", () => ring.classList.remove("down"));
  }

  /* ---- Cinematic page transitions ---- */
  pageTransition() {
    const overlay = document.getElementById("pageTransition");
    if (!overlay) return;
    const playOut = () => overlay.classList.add("out");
    const links = $$('a[href$=".html"]:not([target]):not([data-no-transition])');
    const onClick = (e) => {
      const a = e.currentTarget;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (this.reduce) return;
      e.preventDefault();
      overlay.classList.remove("out");
      overlay.classList.add("in");
      setTimeout(() => { window.location.href = a.href; }, 620);
    };
    links.forEach((a) => a.addEventListener("click", onClick));
    if (!this.reduce) window.addEventListener("pageshow", playOut);
    else overlay.classList.add("out");
  }

  onLoad() {
    document.documentElement.classList.add("ms-ready");
  }
}
