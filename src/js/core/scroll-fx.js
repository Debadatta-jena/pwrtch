/* =============================================================
   src/js/core/scroll-fx.js — advanced scroll-driven motion:
   layered 3D parallax, seamless marquee, intro preloader,
   sticky/pinned storytelling, lerp anchor scroll, per-section
   reading progress, and SVG path drawing.
   Everything is reduced-motion / touch aware.
   ============================================================= */
import { $, $$, clamp, prefersReducedMotion, isTouch } from "./utils.js";

export function initScrollFx() {
  parallax3D();
  marquee();
  preloader();
  smoothScroll();
  sectionProgress();
  svgDraw();
}

/* ---- Layered 3D parallax (within a .scene-3d) ---- */
function parallax3D() {
  if (prefersReducedMotion() || isTouch()) return;
  const els = $$("[data-depth]");
  if (!els.length) return;
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0.2;
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(-offset * depth * 80).toFixed(2)}px, ${(depth * 40).toFixed(2)}px)`;
    });
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ---- Seamless marquee ---- */
function marquee() {
  const SPEED = 36; // px per second — calm, constant crawl
  const setup = (m) => {
    const track = m.querySelector(".marquee-track");
    if (!track) return;
    if (!track.dataset.dup) { track.innerHTML += track.innerHTML; track.dataset.dup = "1"; }
    const w = track.scrollWidth || track.offsetWidth || track.children.length * 160;
    const dur = Math.min(600, (w / 2) / SPEED);
    track.style.setProperty("--marquee-dur", `${dur.toFixed(1)}s`);
  };
  const list = $$(".marquee");
  list.forEach(setup);
  // Recompute once fonts/layout settle (scrollWidth is unreliable pre-paint).
  if (document.readyState !== "complete") window.addEventListener("load", () => list.forEach(setup));
  window.addEventListener("resize", () => list.forEach(setup));
}

/* ---- Intro preloader ---- */
function preloader() {
  const el = document.getElementById("preloader");
  if (!el) return;
  if (prefersReducedMotion()) { el.classList.add("done"); return; }
  const bar = el.querySelector(".preloader-bar > i");
  const path = el.querySelector(".preloader-bolt path");
  if (path && path.getTotalLength) path.style.setProperty("--len", Math.ceil(path.getTotalLength()));
  requestAnimationFrame(() => { if (bar) bar.style.width = "82%"; });
  const finish = () => {
    if (bar) bar.style.width = "100%";
    setTimeout(() => el.classList.add("done"), 280);
  };
  if (document.readyState === "complete") setTimeout(finish, 500);
  else window.addEventListener("load", () => setTimeout(finish, 500));
  setTimeout(() => el.classList.add("done"), 4000); // safety net
}

/* ---- Lerp-free, native-smooth in-page anchor scroll ---- */
function smoothScroll() {
  if (prefersReducedMotion()) return;
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ---- Per-section reading progress ---- */
function sectionProgress() {
  const bars = $$("[data-section-progress]");
  if (!bars.length) return;
  const update = () => {
    bars.forEach((bar) => {
      const sec = bar.closest("[data-section]") || bar.parentElement;
      const r = sec.getBoundingClientRect();
      const p = clamp((window.innerHeight - r.top) / r.height, 0, 1);
      bar.style.transform = `scaleX(${p.toFixed(3)})`;
    });
  };
  window.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  update();
}

/* ---- Scroll-linked SVG path drawing ---- */
function svgDraw() {
  const svgs = $$("[data-svg-draw]");
  if (!svgs.length) return;
  svgs.forEach((svg) => {
    const path = svg.querySelector("path");
    if (!path || !path.getTotalLength) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    if (prefersReducedMotion()) { path.style.strokeDashoffset = 0; return; }
    const draw = () => {
      const r = svg.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.9 - r.top) / (r.height + vh * 0.2), 0, 1);
      path.style.strokeDashoffset = len * (1 - p);
    };
    window.addEventListener("scroll", draw, { passive: true });
    draw();
  });
}
