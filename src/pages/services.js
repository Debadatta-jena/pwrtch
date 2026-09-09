/* =============================================================
   src/pages/services.js — real service architecture (verbatim from pwrtch.com).
   Content is sourced from ../data/services.js.
   ============================================================= */
import { pageHero, ctaSection, sectionHead } from "../components/sections.js";
import { capabilityNetwork } from "../components/visualizations.js";
import { escapeHtml, serviceSlug } from "../components/markup.js";
import { SERVICES } from "../data/services.js";

/* 16 service categories, derived from the pwrtch.com service menu and the
   "Range Services" / "Energy Audit" / "Power Trading" / "PMC" / "Transmission"
   / "Industrial" / "Tourism" / "Training" pages. */


export const meta = {
  title: "Services — Power Tech Consultants & SSPTPL",
  description:
    "Sixteen service categories: renewable energy, thermal, energy audit, transmission, PMC, power trading & regulatory, industrial, training and tourism.",
  activeKey: "services",
  canonical: "/services.html",
};

export default function render() {
  return [
    pageHero({ eyebrow: "Services", title: "Our Services", lead: "A structured architecture of engineering, consultancy and execution services across the full power value chain.", crumbs: "Services", bg: true }),
    capabilityNetwork(SERVICES),
    `<section class="section" style="background:var(--bg-soft);"><div class="container">
      ${sectionHead({ eyebrow: "Full Architecture", title: "Sixteen Service Categories" })}
      <div class="svc-grid-alt">
        ${SERVICES.map((s) => {
          const slug = serviceSlug(s.title);
          return `<article class="svc-row reveal">
          <span class="svc-num">${escapeHtml(s.num)}</span>
          <div class="svc-row-body">
            <div class="service-head"><h3>${escapeHtml(s.title)}</h3><span class="service-company ${s.company.toLowerCase()}">${escapeHtml(s.company)}</span></div>
            <p>${escapeHtml(s.overview)}</p>
            <a class="link-arrow" href="services/${slug}.html">Read more &rarr;</a>
          </div>
        </article>`;
        }).join("")}
      </div>
    </div></section>`,
    ctaSection(),
  ].join("\n");
}
