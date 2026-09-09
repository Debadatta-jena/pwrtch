/* =============================================================
   src/pages/resources.js — downloadable references & tariff orders
   (verbatim "Latest Updates" from pwrtch.com home, plus public
   energy authorities). PDFs are linked externally to pwrtch.com.
   ============================================================= */
import { pageHero, ctaSection, sectionHead } from "../components/sections.js";
import { escapeHtml } from "../components/markup.js";
import { PDF_BASE, TARIFF_PDFS, REFERENCES } from "../data/resources.js";







export const meta = {
  title: "Resources — Power Tech Consultants & SSPTPL",
  description:
    "Tariff orders and reference links for energy, power and regulatory professionals — power trading, renewable and energy-efficiency resources.",
  activeKey: "resources",
  canonical: "/resources.html",
};

function pdfCard(r) {
  const url = PDF_BASE + encodeURIComponent(r.file).replace(/%20/g, " ");
  return `<a class="resource-card reveal" href="${escapeHtml(url)}" target="_blank" rel="noopener">
    <span class="resource-kind">PDF</span>
    <h3>${escapeHtml(r.title)}</h3>
    <span class="resource-cta">Download &rarr;</span>
  </a>`;
}

function refCard(r) {
  return `<a class="resource-card reveal" href="${escapeHtml(r.url)}" target="_blank" rel="noopener">
    <span class="resource-kind">LINK</span>
    <h3>${escapeHtml(r.title)}</h3>
    <p>${escapeHtml(r.note)}</p>
    <span class="resource-cta">Visit &rarr;</span>
  </a>`;
}

export default function render() {
  return [
    pageHero({ eyebrow: "Resources", title: "Resources & References", lead: "Tariff orders and authoritative references for energy, power and regulatory professionals.", crumbs: "Resources", bg: true }),
    `<section class="section"><div class="container">
      ${sectionHead({ eyebrow: "Latest Updates", title: "Tariff Orders (FY 2020-21)" })}
      <div class="resource-grid">
        ${TARIFF_PDFS.map(pdfCard).join("")}
      </div>
    </div></section>`,
    `<section class="section" style="background:var(--bg-soft);"><div class="container">
      ${sectionHead({ eyebrow: "Authorities", title: "Reference Links" })}
      <div class="resource-grid">
        ${REFERENCES.map(refCard).join("")}
      </div>
    </div></section>`,
    ctaSection(),
  ].join("\n");
}
