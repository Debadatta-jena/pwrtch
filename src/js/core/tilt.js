/* =============================================================
   src/js/core/tilt.js — pointer-driven 3D tilt with light glare.
   Applied to any [data-tilt] element. Falls back to a plain
   lift on touch / reduced-motion (handled in CSS).
   ============================================================= */
import { $$, isTouch, prefersReducedMotion } from "./utils.js";

export function initTilt() {
  if (isTouch() || prefersReducedMotion()) return;
  $$("[data-tilt]").forEach((el) => {
    if (!el.querySelector(".tilt-glare")) {
      const g = document.createElement("span");
      g.className = "tilt-glare";
      el.appendChild(g);
    }
    const max = parseFloat(el.dataset.tilt) || 10;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      el.classList.add("is-tilting");
      const g = el.querySelector(".tilt-glare");
      if (g) {
        g.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        g.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      el.classList.remove("is-tilting");
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
  });
}
