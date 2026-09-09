/* =============================================================
   src/js/config/tokens.js
   Centralized motion tokens. Every animation reads from here.
   ============================================================= */

export const MOTION = {
  duration: { fast: 0.25, base: 0.6, slow: 1.0, cinematic: 1.4 },
  easing: {
    outExpo: "cubic-bezier(.16,1,.3,1)",
    outQuint: "cubic-bezier(.22,1,.36,1)",
    inOutQuart: "cubic-bezier(.76,0,.24,1)",
    soft: "cubic-bezier(.4,0,.2,1)",
    spring: "cubic-bezier(.34,1.56,.64,1)",
  },
  delay: { step: 0.08, group: 0.12, section: 0.15 },
  distance: { xs: 12, sm: 22, md: 48, lg: 90 },
  scale: { hover: 1.03, active: 0.97, pop: 1.08 },
  opacity: { hidden: 0, dim: 0.5, shown: 1 },
  blur: { soft: 8, sharp: 0 },
  spring: { stiffness: 220, damping: 22 },
  revealThreshold: 0.14,
};

/* Per-page storytelling theme. Keep one language, vary the story. */
export const PAGE_THEMES = {
  home: { story: "ecosystem" },
  about: { story: "journey" },
  services: { story: "network" },
  "service-detail": { story: "flow" },
  projects: { story: "journey" },
  "project-detail": { story: "cinematic" },
  clients: { story: "network" },
  career: { story: "human" },
  contact: { story: "connection" },
  feedback: { story: "completion" },
  resources: { story: "completion" },
};

export function themeFor(page) {
  return PAGE_THEMES[page] || PAGE_THEMES.home;
}
