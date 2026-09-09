/* =============================================================
   src/pages/clients.js — real client & empanelment directory
   (verbatim from pwrtch.com/clients.html).
   ============================================================= */
import { pageHero, trustSection, ctaSection, sectionHead } from "../components/sections.js";
import { clientCard } from "../components/cards.js";
import { clientNetwork } from "../components/visualizations.js";
import { escapeHtml } from "../components/markup.js";
import { GROUPS } from "../data/clients.js";
import { PTC, SSPTPL, trustItems } from "../data/company.js";

/* Every name below is from the "Our Important Clients" directory of pwrtch.com. */


/* Lightweight sector bucketing so the directory is navigable. */

const TRUST_ITEMS = trustItems();

export const meta = {
  title: "Clients — Power Tech Consultants & SSPTPL",
  description:
    "Clients and empanelments of Power Tech Consultants and SSPTPL across government, utilities, industry, renewables and developer organisations.",
  activeKey: "clients",
  canonical: "/clients.html",
};

export default function render() {
  const all = GROUPS.flatMap((g) => g.items);
  const grouped = GROUPS
    .map(
      (g) => `<div class="dir-group reveal">
        <h3>${escapeHtml(g.group)} <span class="dir-count">${g.items.length}</span></h3>
        <div class="client-grid reveal-group">
          ${g.items.map((c) => clientCard(c)).join("")}
        </div>
      </div>`
    )
    .join("");

  return [
    pageHero({ eyebrow: "Clients", title: "Clients & Empanelments", lead: "Trusted by government bodies, utilities, industry and renewables developers.", crumbs: "Clients", bg: true }),
    `<section class="section"><div class="container">
      <div class="client-marquee marquee reveal" aria-label="Selected clients and empanelments">
        <div class="marquee-track">
          ${all.map((c) => `<span class="marquee-item client-chip" title="${escapeHtml(c.name)}">${escapeHtml(c.name)}</span>`).join("")}
        </div>
      </div>
    </div></section>`,
    `<section class="section"><div class="container">
      ${sectionHead({ eyebrow: "Client Directory", title: "By Sector" })}
      ${grouped}
    </div></section>`,
    clientNetwork(GROUPS),
    trustSection(TRUST_ITEMS),
    ctaSection(),
  ].join("\n");
}
