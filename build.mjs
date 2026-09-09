/* =============================================================
   build.mjs  — static site build pipeline (zero runtime deps)
   Renders page modules -> dist/*.html, bundles CSS/JS.
   ============================================================= */
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, readdirSync, statSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { page, orgJsonLd } from "./src/components/layout.js";
import * as home from "./src/pages/home.js";
import * as about from "./src/pages/about.js";
import * as services from "./src/pages/services.js";
import * as projectsPkg from "./src/pages/projects.js";
import * as clients from "./src/pages/clients.js";
import * as career from "./src/pages/career.js";
import * as contact from "./src/pages/contact.js";
import * as feedback from "./src/pages/feedback.js";
import { buildServiceDetailPages } from "./src/pages/service-detail.js";
import { buildProjectDetailPages } from "./src/pages/project-detail.js";
import * as resources from "./src/pages/resources.js";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "dist");

const PAGES = [
  { file: "index.html", mod: home, key: "home" },
  { file: "about.html", mod: about, key: "about" },
  { file: "services.html", mod: services, key: "services" },
  { file: "projects.html", mod: projectsPkg, key: "projects" },
  { file: "clients.html", mod: clients, key: "clients" },
  { file: "career.html", mod: career, key: "career" },
  { file: "contact.html", mod: contact, key: "contact" },
  { file: "feedback.html", mod: feedback, key: "feedback" },
  { file: "resources.html", mod: resources, key: "resources" },
];

const CSS_PARTS = [
  "base", "nav-footer", "hero", "sections", "cards",
  "pages", "motion", "motion-system", "page-stories", "visualizations",
  "3d", "marquee-preloader", "bg-anim",
];

function copyRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const d = join(dest, entry);
    if (statSync(s).isDirectory()) copyRecursive(s, d);
    else copyFileSync(s, d);
  }
}

/* =============================================================
   bundleRuntime() — dependency-free ESM -> classic IIFE bundle.
   Emits dist/js/app.js (ONE classic script) so the runtime works
   directly from file:// with no server and no ES-module CORS block.
   The module graph is a clean DAG with only named exports.
   ============================================================= */
const JSDIR = join(ROOT, "src/js");

function collectJs(dir, out) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) collectJs(p, out);
    else if (e.endsWith(".js")) out.push(p);
  }
}

function modId(absPath) {
  return absPath.slice(JSDIR.length + 1).split(/[\\/]/).join("/");
}

function resolve(fromId, spec) {
  const fromDir = fromId.split("/").slice(0, -1);
  const parts = spec.split("/");
  const out = fromDir.slice();
  for (const p of parts) {
    if (p === "." || p === "") continue;
    if (p === "..") out.pop();
    else out.push(p);
  }
  return out.join("/");
}

function transform(id, src) {
  const imports = [];
  const exported = [];
  src = src.replace(/^\s*import\s+(.+?)\s+from\s+["']([^"']+)["'];?\s*$/gm, (m, clause, spec) => {
    const resolved = resolve(id, spec);
    if (/^\*\s+as\s+/.test(clause.trim())) {
      const name = clause.trim().replace(/^\*\s+as\s+/, "").trim();
      imports.push(`const ${name} = require("${resolved}");`);
    } else if (/^\{/.test(clause.trim())) {
      const inner = clause.trim().replace(/^\{/, "").replace(/\}$/, "");
      imports.push(`const { ${inner} } = require("${resolved}");`);
    } else {
      imports.push(`const ${clause.trim()} = require("${resolved}");`);
    }
    return "";
  });
  src = src.replace(/^\s*import\s+["']([^"']+)["'];?\s*$/gm, (m, spec) => {
    imports.push(`require("${resolve(id, spec)}");`);
    return "";
  });
  src = src.replace(/export\s*\{([^}]+)\}\s*;?/g, (m, names) => {
    names.split(",").forEach((n) => {
      n = n.trim(); if (!n) return;
      const parts = n.split(/\s+as\s+/);
      const orig = parts[0].trim();
      const out = (parts[1] || parts[0]).trim();
      exported.push(`exports.${out} = ${orig};`);
    });
    return "";
  });
  src = src.replace(/export\s+(const|let|var)\s+([A-Za-z0-9_$]+)/g, (m, k, name) => {
    exported.push(`exports.${name} = ${name};`);
    return `${k} ${name}`;
  });
  src = src.replace(/export\s+function\s+([A-Za-z0-9_$]+)/g, (m, name) => {
    exported.push(`exports.${name} = ${name};`);
    return `function ${name}`;
  });
  src = src.replace(/export\s+class\s+([A-Za-z0-9_$]+)/g, (m, name) => {
    exported.push(`exports.${name} = ${name};`);
    return `class ${name}`;
  });
  return `function(module, exports, require){\n${imports.join("\n")}\n${src}\n${exported.join("\n")}\n}`;
}

function bundleRuntime() {
  const files = [];
  collectJs(JSDIR, files);
  const mods = files.map((f) => ({ id: modId(f), src: readFileSync(f, "utf8") }));
  let out = `(function(){\n  var __mods={}; var __modf={};\n`;
  out += `  function __require(id){\n    if(Object.prototype.hasOwnProperty.call(__mods,id)) return __mods[id];\n    var m={exports:{}}; __mods[id]=m.exports;\n    __modf[id](m,m.exports,__require);\n    return m.exports;\n  }\n`;
  for (const mod of mods) {
    out += `  __modf["${mod.id}"] = ${transform(mod.id, mod.src)};\n`;
  }
  out += `  __require("boot.js");\n})();\n`;
  mkdirSync(join(OUT, "js"), { recursive: true });
  writeFileSync(join(OUT, "js", "app.js"), out);
}

/* Convert local relative refs (href/src) to root-relative so pages served
   from any sub-directory (e.g. /projects/, /services/) resolve correctly.
   Skips absolute URLs, protocol-relative, anchors and special schemes. */
function absolutize(html) {
  return html.replace(/(href|src)\s*=\s*"([^"]+)"/g, (m, attr, url) => {
    if (/^(https?:|mailto:|tel:|#|data:|javascript:|\/)/i.test(url)) return m;
    const clean = url.split("#")[0].split("?")[0];
    if (!clean) return m;
    const suffix = url.slice(clean.length);
    return `${attr}="${"/" + clean}${suffix}"`;
  });
}

/* After normalising to root-relative (absolutize), rewrite local refs to be
   relative to the page's own directory so the site works both when served from
   a domain root AND when opened directly via file:// (double-click). */
function toRelative(html, depth) {
  const prefix = "../".repeat(Math.max(0, depth));
  return html.replace(/(href|src)\s*=\s*"(\/[^"]+)"/g, (m, attr, p) => {
    if (p === "/") return m;
    return `${attr}="${prefix}${p.slice(1)}"`;
  });
}

function build() {
  // Best-effort clean. If dist is locked by a running server, skip the
  // directory remove and simply overwrite files below (deterministic names).
  try { rmSync(OUT, { recursive: true, force: true }); } catch (e) { /* locked; overwrite instead */ }
  mkdirSync(join(OUT, "css"), { recursive: true });
  mkdirSync(join(OUT, "js"), { recursive: true });

  const css = CSS_PARTS.map((p) => readFileSync(join(ROOT, "src/css/parts", `${p}.css`), "utf8")).join("\n\n");
  writeFileSync(join(OUT, "css", "styles.css"), css);

  bundleRuntime();

  let count = 0;
  for (const { file, mod, key } of PAGES) {
    const body = mod.default();
    const html = page({
      title: mod.meta.title,
      description: mod.meta.description,
      bodyHtml: body,
      activeKey: mod.meta.activeKey,
      pageKey: key,
      canonical: mod.meta.canonical,
      jsonLd: mod.meta.jsonLd,
    });
    writeFileSync(join(OUT, file), toRelative(absolutize(html), file.split("/").length - 1));
    count++;
  }

  /* Generated detail pages */
  const details = [
    ...buildServiceDetailPages(),
    ...buildProjectDetailPages(),
  ];
  for (const d of details) {
    mkdirSync(join(OUT, dirname(d.file)), { recursive: true });
    writeFileSync(join(OUT, d.file), toRelative(absolutize(d.html), d.file.split("/").length - 1));
    count++;
  }

  /* Static assets (OG image, favicon, etc.) */
  try { copyRecursive(join(ROOT, "src/assets"), join(OUT, "assets")); } catch (e) { /* no assets dir */ }

  /* Friendly 404 page (root-relative links handled by absolutize). */
  const notFound = page({
    title: "Page Not Found — Power Tech Consultants & SSPTPL",
    description: "The page you were looking for could not be found.",
    bodyHtml: `<section class="section"><div class="container" style="text-align:center;padding:96px 0;">
      <span class="eyebrow reveal">Error 404</span>
      <h1 class="reveal">Page Not Found</h1>
      <p class="lead reveal">The page you were looking for doesn&rsquo;t exist or may have moved.</p>
      <p class="reveal" style="margin-top:22px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <a class="btn btn-primary" href="/index.html" data-cursor="cta">Back to Home</a>
        <a class="btn btn-ghost" href="/services.html" data-cursor="cta">Our Services</a>
      </p>
    </div></section>`,
    activeKey: "",
    pageKey: "error",
    canonical: "/404.html",
    jsonLd: orgJsonLd(),
  });
  writeFileSync(join(OUT, "404.html"), toRelative(absolutize(notFound), 0));
  count++;

  emitSeo();

  console.log(`Built ${count} pages -> ${OUT.replace(ROOT, ".")}`);
}

const SITE_BASE = "https://www.pwrtch.com";

function collectHtml(dir, out) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) collectHtml(p, out);
    else if (e.endsWith(".html")) out.push(p);
  }
}

function emitSeo() {
  const htmls = [];
  collectHtml(OUT, htmls);
  const urls = htmls
    .map((f) => {
      let rel = f.replace(OUT, "").replace(/\\/g, "/").replace(/^\//, "");
      const url = rel === "index.html" ? "/" : "/" + rel;
      return `  <url><loc>${SITE_BASE}${url}</loc></url>`;
    })
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  writeFileSync(join(OUT, "sitemap.xml"), sitemap);
  const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_BASE}/sitemap.xml\n`;
  writeFileSync(join(OUT, "robots.txt"), robots);
}

build();
