/* =============================================================
   src/js/core/utils.js — shared DOM + animation helpers
   ============================================================= */

export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () => window.matchMedia("(hover: none), (pointer: coarse)").matches;

/* requestAnimationFrame loop helper with auto-stop when idle */
export function rafLoop(update) {
  let raf = 0;
  let running = true;
  const tick = (t) => {
    if (!running) return;
    update(t);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return {
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
  };
}

/* Split text into words/lines for masked reveals */
export function splitWords(el) {
  if (el.dataset.split === "1") return Array.from(el.querySelectorAll(".w"));
  const text = el.textContent.trim();
  el.textContent = "";
  const frag = document.createDocumentFragment();
  text.split(/\s+/).forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "w";
    span.style.setProperty("--i", i);
    span.textContent = word;
    frag.appendChild(span);
    if (i < text.split(/\s+/).length - 1) frag.appendChild(document.createTextNode(" "));
  });
  el.appendChild(frag);
  el.dataset.split = "1";
  return Array.from(el.querySelectorAll(".w"));
}
