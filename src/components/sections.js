/* =============================================================
   src/components/sections.js
   Higher-level section builders (compose cards + data).
   Pure: callers pass their own data (no global source-of-truth import).
   ============================================================= */
import { BRAND } from "./layout.js";
import {
  serviceCard, projectCard, projectFilter, clientCard, industryCard,
  teamCard, contactCard, animatedMetric, companyProfileCard, icon,
} from "./cards.js";
import { escapeHtml } from "./markup.js";

export function sectionHead({ eyebrow, title, lead }) {
  return `<div class="section-head reveal">
    ${eyebrow ? `<span class="eyebrow">${escapeHtml(eyebrow)}</span>` : ""}
    <h2>${escapeHtml(title)}</h2>
    ${lead ? `<p class="lead">${escapeHtml(lead)}</p>` : ""}
  </div>`;
}

/* ---- Page hero (inner pages) ---- */
export function pageHero({ eyebrow, title, lead, crumbs, bg }) {
  return `<section class="page-hero">
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/index.html">Home</a> <span aria-hidden="true">/</span> ${escapeHtml(crumbs || title)}</nav>
      <h1 data-split>${escapeHtml(title)}</h1>
      ${lead ? `<p class="lead">${escapeHtml(lead)}</p>` : ""}
    </div>
  </section>`;
}

/* ---- Hero (home) ---- */
export function hero() {
  return `<section class="hero" id="hero">
    <div class="hero-glow" aria-hidden="true"></div>
    <div class="container hero-inner">
      <div class="hero-content">
        <span class="eyebrow reveal">${escapeHtml(BRAND.tagline)}</span>
        <h1 class="reveal">Powering the Future with <span class="grad-text">Engineering Excellence</span></h1>
        <p class="hero-sub reveal">The unified expertise of <strong>Power Tech Consultants</strong> and <strong>Swain &amp; Sons Power Tech Pvt. Ltd.</strong> — delivering end-to-end consultancy across power generation, renewable energy, transmission and energy management.</p>
        <div class="hero-actions reveal">
          <a href="services.html" class="btn btn-primary" data-magnetic="0.25" data-cursor="cta">Explore Services</a>
          <a href="projects.html" class="btn btn-ghost" data-magnetic="0.2" data-cursor="cta">View Projects</a>
        </div>
        <div class="hero-badges reveal">
          <span class="badge">BEE Empanelled</span>
          <span class="badge">MNRE Empanelled</span>
          <span class="badge">IEX Channel Partner</span>
        </div>
       </div>
    </div>
    <a href="#company" class="scroll-cue" aria-label="Scroll to content"><span></span></a>
  </section>`;
}

/* Global 3D visual — a rotating multicolor octagon globe (3-ring spherical
   wireframe cage). Each ring is a PROPER octagon (8 line-segments meeting
   exactly at 8 corners); every corner emits an outer line, and the tip of
   each outer line sparks electrically. .octa-spin tumbles on all three axes.
   Geometry is computed at build time (no runtime JS). Each element carries a
   hue (--h) and index (--i) for staggered pulses/sparks. Pure CSS, file://-safe. */
/* Global energy field — a central 16-edge geometric "power core" rendered on
   a fixed full-viewport <canvas> by src/js/anim/energyField.js. The canvas is
   the single visual anchor; energy emits from all 16 edges, travels along
   curved transmission paths toward the viewport edges and pulses back. No CSS
   geometry, no deps, file://-safe. */
export function bgOctagon(intensity = "bold") {
  const canvas = `<canvas id="energyCanvas" aria-hidden="true"></canvas>`;
  return `<div class="bg-anim" data-intensity="${intensity}" aria-hidden="true">${canvas}</div>`;
}

/* ---- Two-company profiles (home + about) ---- */
export function companyProfiles(ptc, ssptpl) {
  return `<section class="section company" id="company">
    <div class="container">
      ${sectionHead({ eyebrow: "Who We Are", title: "Two Companies. One Power Tech Identity.", lead: "This platform represents both Power Tech Consultants (PTC) and Swain & Sons Power Tech Pvt. Ltd. (SSPTPL). Shared values, complementary strengths." })}
      <div class="company-grid">
        ${companyProfileCard(ptc)}
        ${companyProfileCard(ssptpl)}
      </div>
    </div>
  </section>`;
}

/* ---- Services overview (home) ---- */
export function servicesOverview(services) {
  const subset = services.slice(0, 6);
  return `<section class="section services" id="services">
    <div class="container">
      ${sectionHead({ eyebrow: "Capabilities", title: "Our Services", lead: "End-to-end engineering and advisory spanning the full power value chain — from feasibility to commissioning and trading." })}
      <div class="service-grid reveal-group">
        ${subset.map((s) => serviceCard(s)).join("")}
      </div>
      <div class="section-foot reveal"><a href="services.html" class="btn btn-outline">View All Services</a></div>
    </div>
  </section>`;
}

/* ---- What We Do ---- */
export function whatWeDo() {
  const works = [
    { icon: "📐", title: "Consultancy & Engineering", desc: "Feasibility, DPR/TEFR, basic & detailed engineering across plant types." },
    { icon: "🔎", title: "Energy Auditing", desc: "Investment-grade audits for industry, utilities and government." },
    { icon: "🛠️", title: "Project Management", desc: "Procurement assistance, construction supervision and commissioning." },
    { icon: "📜", title: "Technical & Regulatory Studies", desc: "Open access, PPA, tariff petitions and SERC/CERC advisory." },
    { icon: "🏗️", title: "EPC & Procurement", desc: "Design-build execution and vendor inspection for infrastructure." },
    { icon: "🌱", title: "Renewable Development", desc: "Solar, wind, biomass and small-hydro project execution." },
  ];
  return `<section class="section works" id="whatwedo">
    <div class="container">
      ${sectionHead({ eyebrow: "What We Do", title: "Work &amp; Capabilities", lead: "A cross-section of the work we deliver across the energy ecosystem." })}
      <div class="works-grid reveal-group">
        ${works.map((w, i) => `<article class="work-card ${i === 0 ? "wide" : ""} reveal">
          <span class="work-icon" aria-hidden="true">${w.icon}</span>
          <h3>${escapeHtml(w.title)}</h3>
          <p>${escapeHtml(w.desc)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

/* ---- Project showcase ---- */
export function projectShowcase({ projects, withFilter = true } = {}) {
  const list = projects || [];
  return `<section class="section projects" id="projects">
    <div class="container">
      ${sectionHead({ eyebrow: "Project Experience", title: "Projects Handled", lead: "Selected engagements across PTC and SSPTPL. Each project is clearly attributed to the delivering company." })}
      ${withFilter ? projectFilter() : ""}
      <div class="project-grid reveal-group" id="projectGrid">
        ${list.map((p) => projectCard(p)).join("")}
      </div>
      ${withFilter ? `<div class="section-foot reveal"><a href="projects.html" class="btn btn-outline">View All Projects</a></div>` : ""}
    </div>
  </section>`;
}

/* ---- Metrics ---- */
export function metricsSection(metrics) {
  return `<section class="section metrics" id="metrics">
    <div class="container">
      ${sectionHead({ eyebrow: "Impact", title: "Numbers That Speak" })}
      <div class="metric-grid">
        ${metrics.map((m) => animatedMetric(m)).join("")}
      </div>
    </div>
  </section>`;
}

/* ---- Why Choose Us ---- */
export function whyChoose(items) {
  return `<section class="section why" id="why">
    <div class="container">
      <div class="why-grid">
        <div class="why-intro reveal">
          ${sectionHead({ eyebrow: "Why Choose Us", title: "Engineering you can rely on." })}
          <p class="lead">Decades of hands-on experience from ex-utility leaders, accredited auditors and certified energy professionals.</p>
        </div>
        <div class="why-list reveal-group">
          ${items.map((w) => `<div class="why-item reveal"><span class="why-num">${escapeHtml(w.n)}</span><div><h3>${escapeHtml(w.title)}</h3><p>${escapeHtml(w.desc)}</p></div></div>`).join("")}
        </div>
      </div>
    </div>
  </section>`;
}

/* ---- Industries + client highlight (home) ---- */
export function industriesSection(industries, clients) {
  return `<section class="section industries" id="clients">
    <div class="container">
      ${sectionHead({ eyebrow: "Industries We Serve", title: "Sectors &amp; Clients", lead: "Trusted by government bodies, utilities, industry and renewables developers." })}
      <div class="industry-grid reveal-group">
        ${industries.map((i) => industryCard(i)).join("")}
      </div>
       <div class="client-marquee marquee reveal" aria-label="Selected clients and empanelments">
         <div class="marquee-track">
           ${clients.slice(0, 18).map((c) => `<span class="marquee-item client-chip" title="${escapeHtml(c.name)}">${escapeHtml(c.name)}</span>`).join("")}
         </div>
       </div>
      </div>
    </div>
  </section>`;
}

/* ---- Trust / credentials ---- */
export function trustSection(items) {
  return `<section class="section trust">
    <div class="container">
      ${sectionHead({ eyebrow: "Experience &amp; Trust", title: "Credentials &amp; Institutional Relationships", lead: "Selected empanelments and channel partnerships of PTC and SSPTPL." })}
      <div class="trust-grid reveal-group">
        ${items.map((t) => `<div class="trust-card reveal"><span class="company-badge ${t.company === "SSPTPL" ? "ssptpl" : "ptc"}">${escapeHtml(t.company)}</span><p>${escapeHtml(t.text)}</p></div>`).join("")}
      </div>
    </div>
  </section>`;
}

/* ---- CTA section ---- */
export function ctaSection() {
  return `  <section class="section cta" id="cta">
    <div class="container">
      <div class="cta-box reveal">
        <h2>Let's build a reliable, cleaner energy future.</h2>
        <p class="lead">Reach our team, explore careers, or share your feedback.</p>
        <div class="cta-actions">
          <a href="contact.html" class="btn btn-primary" data-magnetic="0.25" data-cursor="cta">Contact Us</a>
          <a href="career.html" class="btn btn-ghost" data-magnetic="0.2">Career</a>
          <a href="feedback.html" class="btn btn-ghost" data-magnetic="0.2">Feedback</a>
        </div>
        <div class="cta-contacts">
          <div><strong>Power Tech Consultants</strong><span>Bhubaneswar, Odisha, India</span></div>
          <div><strong>SSPTPL</strong><span>Regd. under Companies Act, Odisha</span></div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---- Homepage mini previews ---- */
export function miniPreview({ id, eyebrow, title, lead, ctaLabel, ctaHref }) {
  return `<section class="section mini" id="${id}">
    <div class="container reveal">
      <span class="eyebrow">${escapeHtml(eyebrow)}</span>
      <h2>${escapeHtml(title)}</h2>
      <p class="lead">${escapeHtml(lead)}</p>
      <a href="${ctaHref}" class="btn btn-outline">${escapeHtml(ctaLabel)}</a>
    </div>
  </section>`;
}

/* ---- Ecosystem (Power Bazar) ---- */
export function ecosystemBlock(e) {
  return `<section class="section ecosystem">
    <div class="container">
      ${sectionHead({ eyebrow: "Group Ecosystem", title: "Beyond the Two Companies" })}
      <div class="ecosystem-card reveal">
        <h3>${escapeHtml(e.name)}</h3>
        <p>${escapeHtml(e.note)}</p>
      </div>
    </div>
  </section>`;
}

/* ---- Our Approach (static, always-visible grid of steps) ---- */
export function principlesSection(items, { eyebrow = "Our Approach", title = "How We Deliver", lead = "" } = {}) {
  if (!items || !items.length) return "";
  const cards = items.map((it, i) => `<div class="approach-card">
      <span class="approach-index">${String(i + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(it.title)}</h3>
      <p>${escapeHtml(it.desc)}</p>
    </div>`).join("");
  return `<section class="section approach" id="approach">
    <div class="container">
      ${sectionHead({ eyebrow, title, lead })}
      <div class="approach-grid">${cards}</div>
    </div>
  </section>`;
}
