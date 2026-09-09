/* =============================================================
   src/components/layout.js
   Layout primitives: <head>, header, footer, page shell.
   ============================================================= */
import { brandMarkSVG, escapeHtml } from "./markup.js";
import { footerNetwork } from "./visualizations.js";
import { bgOctagon } from "./sections.js";

export const BRAND = {
  name: "Power Tech Consultants & Swain & Sons Power Tech Pvt. Ltd.",
  short: "POWER TECH",
  tagline: "Power / Energy / Engineering / Technology",
};

const SITE_BASE = "https://www.pwrtch.com";
const OG_IMAGE = "https://www.pwrtch.com/assets/og-image.svg";

const NAV = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "services", label: "Services", href: "services.html" },
  { key: "about", label: "About Us", href: "about.html" },
  { key: "projects", label: "Projects Handled", href: "projects.html" },
  { key: "clients", label: "Clients", href: "clients.html" },
  { key: "resources", label: "Resources", href: "resources.html" },
  { key: "career", label: "Career", href: "career.html" },
  { key: "contact", label: "Contact Us", href: "contact.html" },
  { key: "feedback", label: "Feedback", href: "feedback.html" },
];

/* Breadcrumb trail per page (label | url). The current page is appended. */
const TRAILS = {
  home: [],
  about: ["About Us|/about.html"],
  services: ["Services|/services.html"],
  "service-detail": ["Services|/services.html"],
  projects: ["Projects Handled|/projects.html"],
  "project-detail": ["Projects Handled|/projects.html"],
  clients: ["Clients|/clients.html"],
  resources: ["Resources|/resources.html"],
  career: ["Career|/career.html"],
  contact: ["Contact Us|/contact.html"],
  feedback: ["Feedback|/feedback.html"],
};

export function breadcrumbJsonLd(pageKey, title, canonical) {
  const trail = (TRAILS[pageKey] || []).map((s) => {
    const [name, url] = s.split("|");
    return { name, url };
  });
  trail.push({ name: title, url: canonical || "/" });
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: /^https?:\/\//i.test(t.url) ? t.url : SITE_BASE + t.url,
    })),
  });
}

function orgRef() {
  return { "@type": "Organization", name: "Power Tech Consultants & Swain & Sons Power Tech Pvt. Ltd.", url: SITE_BASE };
}

export function serviceJsonLd(s) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.overview,
    serviceType: s.title,
    provider: orgRef(),
  });
}

export function projectJsonLd(p) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Project",
    name: p.name,
    description: p.scope,
    location: p.location,
    provider: orgRef(),
  });
}

export function contactJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Power Tech Consultants & SSPTPL",
    provider: orgRef(),
  });
}

export function head(meta = {}) {
  const title = meta.title || "Power Tech Consultants & SSPTPL";
  const description = meta.description || "Power Tech Consultants (PTC) and Swain & Sons Power Tech Pvt. Ltd. (SSPTPL) — engineering, energy and power consultancy.";
  const canonical = meta.canonical || "/index.html";
  const raw = meta.jsonLd;
  const blocks = Array.isArray(raw) ? raw : raw ? [raw] : [orgJsonLd()];
  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:site_name" content="Power Tech Consultants & SSPTPL" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <meta name="theme-color" content="#ffffff" />
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/styles.css" />
  ${blocks.map((j) => `<script type="application/ld+json">${j}</script>`).join("\n  ")}
  <script>
    (function(){
      function fail(){ var d=document.documentElement; d.classList.remove('js'); var p=document.getElementById('preloader'); if(p) p.classList.add('done'); }
      function check(){ if(!document.documentElement.classList.contains('ms-ready')) fail(); }
      if(document.readyState==='complete'){ setTimeout(check, 800); }
      else { window.addEventListener('load', function(){ setTimeout(check, 800); }); }
      setTimeout(check, 5000);
    })();
  </script>
</head>`;
}

export function orgJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Power Tech Consultants & Swain & Sons Power Tech Pvt. Ltd.",
    url: "https://www.pwrtch.com",
    description:
      "Engineering, energy and power consultancy: project management, energy audit, renewable energy and power trading.",
    sameAs: [
      "https://www.linkedin.com/in/power-tech-consultants-40380a33",
      "https://twitter.com/PTC_PowerTech",
    ],
  });
}

export function header(activeKey) {
  const links = NAV.map(
    (n) =>
      `<a href="${n.href}" class="${n.key === activeKey ? "active" : ""}"${n.key === activeKey ? ' aria-current="page"' : ""} data-nav>${escapeHtml(n.label)}</a>`
  ).join("");

  return `<header class="site-header" id="siteHeader">
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Power Tech home">
        <span class="brand-mark">${brandMarkSVG()}</span>
        <span class="brand-text">
          <strong>POWER TECH</strong>
          <small>PTC &middot; SSPTPL</small>
        </span>
      </a>
      <nav class="primary-nav" id="primaryNav" aria-label="Primary">${links}</nav>
      <a href="contact.html" class="btn btn-primary header-cta">Get in Touch</a>
      <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="primaryNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

export function footer() {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
    ${footerNetwork()}
    <div class="container footer-grid">
      <div class="footer-brand">
        <span class="brand-text">
          <strong>POWER TECH</strong>
          <small>PTC &middot; SSPTPL</small>
        </span>
        <p>Engineering, energy and power consultancy across India.</p>
      </div>
      <div class="footer-col">
        <h4>Companies</h4>
        <a href="about.html">Power Tech Consultants</a>
        <a href="about.html">Swain &amp; Sons Power Tech Pvt. Ltd.</a>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <a href="services.html">Services</a>
        <a href="projects.html">Projects Handled</a>
        <a href="clients.html">Clients</a>
        <a href="career.html">Career</a>
        <a href="contact.html">Contact Us</a>
        <a href="feedback.html">Feedback</a>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <a href="mailto:pwrtch@gmail.com">pwrtch@gmail.com</a>
        <a href="mailto:sspt12@gmail.com">sspt12@gmail.com</a>
        <a href="tel:06742386219">+91 674 238 6219</a>
        <span>Bhubaneswar, Odisha, India</span>
        <div class="social">
          <a href="https://www.linkedin.com/in/power-tech-consultants-40380a33" aria-label="LinkedIn">in</a>
          <a href="https://twitter.com/PTC_PowerTech" aria-label="Twitter">tw</a>
          <a href="https://www.facebook.com/Power-Tech-Consultants-208419805885109" aria-label="Facebook">fb</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom container">
      <span>&copy; ${year} Power Tech Consultants &amp; Swain &amp; Sons Power Tech Pvt. Ltd.</span>
      <span>Power / Energy / Engineering / Technology.</span>
    </div>
  </footer>`;
}

export function page({ title, description, bodyHtml, activeKey = "", pageKey = "", scripts = [], jsonLd, canonical }) {
  const scriptTags = scripts.map((s) => `<script src="${s}"></script>`).join("\n  ");
  const canonicalRaw = canonical || "/index.html";
  const canonicalAbs = canonicalRaw.startsWith("/") ? SITE_BASE + canonicalRaw : canonicalRaw;
  const bc = breadcrumbJsonLd(pageKey, title, canonicalAbs);
  const specific = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const allJson = pageKey === "home" ? [orgJsonLd(), ...specific] : [bc, ...specific];
  return `<!DOCTYPE html>
<html lang="en">
${head({ title, description, jsonLd: allJson, canonical: canonicalAbs })}
<body data-page="${pageKey}" data-anim="on">
  ${bgOctagon(pageKey === "home" ? "bold" : "soft")}
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="scrollProgress" aria-hidden="true"></div>
  <div id="pageTransition" aria-hidden="true"><span class="pt-line"></span><span class="pt-core"></span></div>
  <div id="cursorDot" aria-hidden="true"></div>
  <div id="cursorRing" aria-hidden="true"><span class="cursor-label"></span></div>
  <div id="preloader" role="status" aria-label="Loading">
    <svg class="preloader-bolt" viewBox="0 0 64 64" aria-hidden="true"><path d="M36 4 L16 36 L30 36 L26 60 L50 24 L34 24 Z"/></svg>
    <div class="preloader-pulse"></div>
    <div class="preloader-bar"><i></i></div>
    <div class="preloader-label">Powering up</div>
  </div>
  ${header(activeKey)}
  <main id="main">
${bodyHtml}
  </main>
  ${footer()}
  <script defer src="js/app.js"></script>
</body>
</html>`;
}
