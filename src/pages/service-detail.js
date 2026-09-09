/* =============================================================
   src/pages/service-detail.js — generates one page per service.
   ============================================================= */
import { SERVICES } from "../data/services.js";
import { page, serviceJsonLd } from "../components/layout.js";
import { pageHero, ctaSection } from "../components/sections.js";
import { escapeHtml, mediaPlaceholder, serviceSlug } from "../components/markup.js";

const FLOWS = {
  "01": ["Sun", "PV Array", "Inverter", "Grid / Usage"],
  "02": ["Sun", "Concentrator", "Steam", "Turbine", "Power"],
  "03": ["Biomass", "Boiler", "Turbo-Generator", "Grid"],
  "04": ["Feedstock", "Reactor", "Bio-diesel", "Distribution"],
  "05": ["Wind", "Rotor", "Generator", "Grid"],
  "06": ["Water", "Turbine", "Generator", "Transmission"],
  "07": ["Fuel", "Boiler", "Turbine", "Steam Cycle", "Power"],
  "08": ["Gas", "Turbine", "Generator", "Heat Recovery", "Power"],
  "09": ["Building / Plant", "Energy Flow", "Measurement", "Analysis", "Optimization", "Savings"],
  "10": ["Load Centre", "Substation", "Transmission", "Generation"],
  "11": ["Brief", "Plan", "Procure", "Construct", "Commission"],
  "12": ["Generator", "Market", "Trading", "Buyer", "Settlement"],
  "13": ["Concept", "Feasibility", "DPR / TEFR", "Approval"],
  "14": ["Process", "Assessment", "Design", "Implement", "Monitor"],
  "15": ["Assess", "Train", "Certify", "Improve"],
  "16": ["Site", "Concept", "Feasibility", "Plan"],
};

function flowFor(s) {
  const steps = FLOWS[s.num] || [s.title, "Assess", "Design", "Deliver", "Impact"];
  return `<ol class="flow reveal-group">
    ${steps
      .map(
        (st, i) => `<li class="flow-step reveal" style="--i:${i}">
          <span class="flow-dot"></span>
          <span class="flow-label">${escapeHtml(st)}</span>
        </li>`
      )
      .join("")}
  </ol>`;
}

export function buildServiceDetailPages() {
  return SERVICES.map((s) => {
    const slug = serviceSlug(s.title);
    const file = `services/${slug}.html`;
    const body = [
      pageHero({ eyebrow: `Service ${s.num} · ${s.company}`, title: s.title, lead: s.overview, crumbs: "Services" }),
      `<section class="section"><div class="container service-detail">
        <div class="sd-grid">
          <div class="sd-main reveal">
            <h2>How it works</h2>
            <p class="lead">A clear, engineered pathway — from assessment to impact.</p>
            ${flowFor(s)}
            <h3>Scope</h3><p>${escapeHtml(s.scope)}</p>
            <h3>Capabilities</h3>
            <ul class="check-list">${s.capabilities.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
          </div>
          <aside class="sd-aside reveal">
            ${mediaPlaceholder(s.image, s.company + " · " + s.title)}
            <div class="sd-meta">
              <span class="service-company ${s.company.toLowerCase()}">${escapeHtml(s.company)}</span>
              <a href="/services.html" class="link-arrow">All services &rarr;</a>
            </div>
          </aside>
        </div>
      </div></section>`,
      ctaSection(),
    ].join("\n");
    const html = page({
      title: `${s.title} — Power Tech`,
      description: s.overview,
      bodyHtml: body,
      activeKey: "services",
      pageKey: "service-detail",
      canonical: "/" + file,
      jsonLd: serviceJsonLd(s),
    });
    return { file, html };
  });
}
