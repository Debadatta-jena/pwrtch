/* =============================================================
   src/components/cards.js
   Reusable card / unit components.
   ============================================================= */
import { escapeHtml, companyBadge, mediaPlaceholder } from "./markup.js";

const ICONS = {
  audit: "📊", renewable: "🌱", thermal: "🔥", generation: "⚡", trading: "🤝",
  transmission: "🗼", pmc: "🛠️", industrial: "🏭", training: "🎓", other: "🧩",
  steel: "🏗️", aluminium: "🔩", mining: "⛏️", manufacturing: "🏭", infrastructure: "🌉",
  government: "🏛️", utilities: "💡", commercial: "🏢", petrochemical: "🛢️",
};
export function icon(name) {
  return ICONS[name] || "⚡";
}
function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function initials(name) {
  return name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

/* ---- ServiceCard / ServiceExplorer ---- */
export function serviceCard(s, detailed = false) {
  const cap = detailed
    ? `<ul class="svc-cap">${s.capabilities.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
       <p class="svc-scope"><b>Scope:</b> ${escapeHtml(s.scope)}</p>`
    : "";
  return `<article class="service-card reveal" data-tilt="6" data-hover="glow">
    <div class="service-icon" aria-hidden="true" data-tilt-layer style="--tz:26px">${icon(s.icon)}</div>
    <div class="service-head">
      <h3>${escapeHtml(s.title)}</h3>
      <span class="service-company ${s.company.toLowerCase()}">${escapeHtml(s.company)}</span>
    </div>
    <p>${escapeHtml(s.overview)}</p>
    ${cap}
    ${detailed ? `<a href="projects.html" class="link-arrow">Related projects &rarr;</a>` : ""}
  </article>`;
}

/* ---- ProjectCard / ProjectFilter ---- */
export function projectCard(p) {
  return `<article class="project-card reveal" data-hover="lift" data-company="${escapeHtml(p.company)}" data-category="${slug(p.category)}">
    ${mediaPlaceholder(p.image, p.sector)}
    <div class="project-body">
      <div class="project-top">
        <span class="project-tagline">${escapeHtml(p.category)}</span>
        ${companyBadge(p.company)}
      </div>
      <h3>${escapeHtml(p.name)}</h3>
      <dl class="project-meta">
        <div><dt>Client</dt><dd>${escapeHtml(p.client)}</dd></div>
        <div><dt>Location</dt><dd>${escapeHtml(p.location)}</dd></div>
        <div><dt>Sector</dt><dd>${escapeHtml(p.sector)}</dd></div>
        ${p.capacity ? `<div><dt>Capacity</dt><dd>${escapeHtml(p.capacity)}</dd></div>` : ""}
      </dl>
      <p>${escapeHtml(p.scope)}</p>
    </div>
  </article>`;
}

export function projectFilter() {
  const cats = ["Energy Audit", "Renewable", "Thermal", "Transmission", "Industrial", "Power Trading/Regulatory", "PMC"];
  const companyBtns = ["All", "PTC", "SSPTPL"]
    .map((c, i) => `<button data-filter="${i === 0 ? "all" : slug(c)}" class="${i === 0 ? "active" : ""}">${escapeHtml(c)}</button>`)
    .join("");
  const catBtns = cats
    .map((c) => `<button data-filter="${slug(c)}">${escapeHtml(c)}</button>`)
    .join("");
  return `<div class="filter-bar reveal" role="group" aria-label="Filter projects">
      <div class="filter-group">${companyBtns}</div>
      <div class="filter-group">${catBtns}</div>
    </div>`;
}

/* ---- ClientCard (logo grid) ---- */
export function clientCard(c) {
  const ini = c.name.replace(/\(.*?\)/g, "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("");
  return `<article class="client-card reveal" data-hover="glow" title="${escapeHtml(c.name)} (${escapeHtml(c.category)})">
    <span class="client-logo" aria-hidden="true">${escapeHtml(ini)}</span>
    <span class="client-name">${escapeHtml(c.name)}</span>
    <span class="client-cat">${escapeHtml(c.category)}</span>
  </article>`;
}

/* ---- IndustryCard ---- */
export function industryCard(i) {
  return `<article class="industry-card reveal" data-tilt="7" data-hover="glow" tabindex="0">
    <span class="industry-icon" aria-hidden="true" data-tilt-layer style="--tz:22px">${icon(i.icon)}</span>
    <h3>${escapeHtml(i.title)}</h3>
    <p>${escapeHtml(i.desc)}</p>
  </article>`;
}

/* ---- TeamCard ---- */
export function teamCard(p) {
  return `<article class="person reveal" data-tilt="5" data-hover="lift">
    <div class="p-top">
      <div class="p-avatar" aria-hidden="true">${initials(p.name)}</div>
      ${companyBadge(p.company)}
    </div>
    <h3>${escapeHtml(p.name)}</h3>
    <div class="p-role">${escapeHtml(p.role)}</div>
    <p>${escapeHtml(p.bio)}</p>
  </article>`;
}

/* ---- ContactCard ---- */
export function contactCard(co, kind) {
  const emails = co.emails.map((e) => `<div class="c-row"><b>Email</b><a href="mailto:${escapeHtml(e)}">${escapeHtml(e)}</a></div>`).join("");
  const phones = co.phones.map((p) => `<div class="c-row"><b>Phone</b><a href="tel:${escapeHtml(p.replace(/\s/g, ""))}">${escapeHtml(p)}</a></div>`).join("");
  return `<div class="contact-card reveal" data-hover="lift">
    <h3>${escapeHtml(co.name)} <span class="company-badge ${kind}">${escapeHtml(kind === "ssptpl" ? "SSPTPL" : "PTC")}</span></h3>
    ${emails}
    ${phones}
  </div>`;
}

/* ---- AnimatedMetric ---- */
export function animatedMetric(m) {
  return `<div class="metric reveal">
    <span class="metric-num" data-target="${m.value}" data-suffix="${escapeHtml(m.suffix || "")}">0</span>
    <span class="metric-label">${escapeHtml(m.label)}</span>
    ${m.verified ? '<span class="metric-verified" title="Verified / defensible">&#10003; verified</span>' : ""}
  </div>`;
}

/* ---- CompanyProfile card ---- */
export function companyProfileCard(c) {
  const cls = c.abbr === "SSPTPL" ? "ssptpl" : "ptc";
  return `<article class="company-card reveal" data-tilt="6" data-hover="glow">
    <div class="company-tag tag-${cls}">${escapeHtml(c.abbr)}</div>
    <h3>${escapeHtml(c.name)}</h3>
    <p>${escapeHtml(c.profile)}</p>
    <ul class="check-list">${c.coreWork.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}</ul>
    <a href="about.html" class="link-arrow">Explore About &rarr;</a>
  </article>`;
}
