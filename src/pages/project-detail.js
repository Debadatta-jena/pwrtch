/* =============================================================
   src/pages/project-detail.js — generates one page per project.
   ============================================================= */
import { getAllProjects } from "../data/projects.js";
import { page, projectJsonLd } from "../components/layout.js";
import { ctaSection, sectionHead } from "../components/sections.js";
import { escapeHtml, mediaPlaceholder, companyBadge } from "../components/markup.js";

export function buildProjectDetailPages() {
  const projects = getAllProjects();
  return projects.map((p, idx) => {
    const slug = `${p.company.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${idx}`;
    const file = `projects/${slug}.html`;
    const related = projects.filter((x) => x !== p).slice(0, 3);
    const body = [
      `<section class="project-hero">
        <div class="container">
          <div class="crumbs"><a href="/index.html">Home</a> <span>/</span> <a href="/projects.html">Projects</a> <span>/</span> ${escapeHtml(p.name)}</div>
          <div class="ph-top">${companyBadge(p.company)}<span class="project-tagline">${escapeHtml(p.category)}</span></div>
          <h1 class="reveal" data-split>${escapeHtml(p.name)}</h1>
          <p class="lead reveal">${escapeHtml(p.scope)}</p>
        </div>
      </section>`,
      `<section class="section"><div class="container">
        <div class="sd-grid">
          <div class="sd-main reveal">
            <h2>Overview</h2><p>${escapeHtml(p.scope)}</p>
            <h3>Scope of Work</h3><p>${escapeHtml(p.scope)}</p>
            <h3>Technical Details</h3>
            <ul class="check-list">
              <li>Client: ${escapeHtml(p.client)}</li>
              <li>Location: ${escapeHtml(p.location)}</li>
              <li>Sector: ${escapeHtml(p.sector)}</li>
              ${p.capacity ? `<li>Capacity: ${escapeHtml(p.capacity)}</li>` : ""}
            </ul>
          </div>
          <aside class="sd-aside reveal">
            ${mediaPlaceholder(p.image, p.sector)}
          </aside>
        </div>
      </div></section>`,
      `<section class="section" style="background:var(--bg-soft);"><div class="container">
        ${sectionHead({ eyebrow: "Project Impact", title: "Delivered Value" })}
        <p class="lead reveal" style="text-align:center;max-width:60ch;margin:0 auto;">${escapeHtml(p.scope)}</p>
      </div></section>`,
      `<section class="section"><div class="container">
        ${sectionHead({ eyebrow: "Continue", title: "Related Projects" })}
        <div class="project-grid">
          ${related.map((r) => `<article class="project-card reveal" data-company="${escapeHtml(r.company)}" data-category="${escapeHtml(r.category).toLowerCase().replace(/[^a-z0-9]+/g, "-")}">
            ${mediaPlaceholder(r.image, r.sector)}
            <div class="project-body">
              <div class="project-top"><span class="project-tagline">${escapeHtml(r.category)}</span>${companyBadge(r.company)}</div>
              <h3>${escapeHtml(r.name)}</h3>
              <p>${escapeHtml(r.scope)}</p>
            </div>
          </article>`).join("")}
        </div>
      </div></section>`,
      ctaSection(),
    ].join("\n");
    const html = page({
      title: `${p.name} — Power Tech Project`,
      description: p.scope,
      bodyHtml: body,
      activeKey: "projects",
      pageKey: "project-detail",
      canonical: "/" + file,
      jsonLd: projectJsonLd(p),
    });
    return { file, html };
  });
}
