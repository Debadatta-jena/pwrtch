/* =============================================================
   src/js/core/story.js — per-page interaction hooks.
   Each page reuses the global MotionSystem but tells its own story.
   ============================================================= */
import { $, $$, prefersReducedMotion } from "./utils.js";

export function runStory(page, theme) {
  timeline();
  capabilityNetwork();
  footerNetwork();
  feedbackRipple();
  careerMotion();
  switch (page) {
    case "about": aboutConnection(); break;
    case "services": break;
    case "clients": clientNetwork(); break;
    case "contact": contactConnection(); break;
    case "feedback": break;
    default: break;
  }
}

/* ---- About: timeline progress + two-company connection ---- */
function timeline() {
  const tl = $("[data-timeline]");
  if (!tl) return;
  if (prefersReducedMotion()) { tl.classList.add("in"); return; }
  const line = tl.querySelector(".timeline-spine");
  const update = () => {
    const r = tl.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height * 0.8 + vh * 0.2)));
    tl.style.setProperty("--p", p.toFixed(3));
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function aboutConnection() {
  const svg = $("[data-connection]");
  if (!svg) return;
  const draw = () => {
    const r = svg.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3)));
    svg.style.setProperty("--p", p.toFixed(3));
  };
  window.addEventListener("scroll", draw, { passive: true });
  draw();
}

/* ---- Services: capability network (click node -> reveal detail) ---- */
function capabilityNetwork() {
  const net = $("[data-capnet]");
  if (!net) return;
  const nodes = $$(".cap-node", net);
  const panels = $$(".cap-panel");
  const show = (slug) => {
    panels.forEach((p) => p.classList.toggle("show", p.dataset.service === slug));
  };
  nodes.forEach((n) => {
    n.addEventListener("click", () => {
      nodes.forEach((x) => x.classList.remove("active"));
      n.classList.add("active");
      show(n.dataset.service);
    });
  });
  if (nodes[0]) { nodes[0].classList.add("active"); show(nodes[0].dataset.service); }
}

/* ---- Clients: node network hover emphasis ---- */
function clientNetwork() {
  const net = $("[data-clientnet]");
  if (!net) return;
  const nodes = $$(".cn-node", net);
  nodes.forEach((n) => {
    n.addEventListener("pointerenter", () => nodes.forEach((x) => x.classList.toggle("dim", x !== n)));
    n.addEventListener("pointerleave", () => nodes.forEach((x) => x.classList.remove("dim")));
  });
}

/* ---- Contact: connection draw ---- */
function contactConnection() {
  const svg = $("[data-contactnet]");
  if (!svg) return;
  const draw = () => {
    const r = svg.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3)));
    svg.style.setProperty("--p", p.toFixed(3));
  };
  window.addEventListener("scroll", draw, { passive: true });
  draw();
}

/* ---- Career: subtle parallax on journey steps ---- */
function careerMotion() {
  if (prefersReducedMotion()) return;
  $$("[data-journey] .j-step").forEach((step, i) => {
    step.style.setProperty("--d", `${i * 0.08}s`);
  });
}

/* ---- Feedback: success ripple ---- */
function feedbackRipple() {
  const form = $("#feedbackForm");
  if (!form) return;
  form.addEventListener("submit", () => {
    const ripple = form.querySelector(".fb-ripple");
    if (ripple) { ripple.classList.remove("play"); void ripple.offsetWidth; ripple.classList.add("play"); }
  });
}

/* ---- Footer: lightweight 2D energy network ---- */
function footerNetwork() {
  const canvas = $("#footerNet");
  if (!canvas) return;
  if (prefersReducedMotion()) return;
  const ctx = canvas.getContext("2d");
  let w, h, nodes;
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = canvas.width = r.width * (window.devicePixelRatio || 1);
    h = canvas.height = r.height * (window.devicePixelRatio || 1);
    const N = 26;
    nodes = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    }));
  };
  resize();
  new ResizeObserver(resize).observe(canvas);
  const link = (a, b) => Math.hypot(a.x - b.x, a.y - b.y) < 130 * (window.devicePixelRatio || 1);
  let rafId = 0;
  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
    ctx.strokeStyle = "rgba(96,165,250,0.18)";
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (link(nodes[i], nodes[j])) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = "rgba(59,130,246,0.55)";
    nodes.forEach((n) => { ctx.beginPath(); ctx.arc(n.x, n.y, 2.2 * (window.devicePixelRatio || 1), 0, 7); ctx.fill(); });
    rafId = requestAnimationFrame(frame);
  };
  const start = () => { if (!rafId) frame(); };
  const stop = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } };
  /* Pause the animation loop when the footer is scrolled out of view. */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 }).observe(canvas);
  } else {
    start();
  }
}
