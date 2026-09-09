/* =============================================================
   src/js/boot.js — entry point, runs once on every page.
   ============================================================= */
import { MotionSystem } from "./core/motion-system.js";
import { themeFor } from "./config/tokens.js";
import { $, $$ } from "./core/utils.js";
import { runStory } from "./core/page-stories.js";
import { initEnergyField } from "./anim/energyField.js";

document.documentElement.classList.add("js");

/* Interaction modules (nav toggle, form validation, filters) */
import "./core/nav.js";
import "./core/forms.js";
import "./core/filter.js";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pageKey = document.body.dataset.page || "home";
const theme = themeFor(pageKey);

/* Staged home hero intro (added before motion init so reveal delays apply;
   removed after it plays once). */
if (pageKey === "home") {
  document.body.classList.add("home-intro");
  window.setTimeout(() => document.body.classList.remove("home-intro"), 2600);
}

try {
  const ms = new MotionSystem();
  ms.init();
  runStory(pageKey, theme);
} catch (err) {
  document.documentElement.classList.remove("js");
  const p = document.getElementById("preloader");
  if (p) p.classList.add("done");
  if (window.console) console.error(err);
}
/* Background energy field runs independently, so a failure elsewhere can
   never disable it (it must animate on the home page too). */
try {
  initEnergyField();
} catch (err) {
  if (window.console) console.error(err);
}
