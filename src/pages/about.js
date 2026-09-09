/* =============================================================
   src/pages/about.js
   ============================================================= */
import {
  pageHero, companyProfiles, trustSection, ecosystemBlock, sectionHead,
} from "../components/sections.js";
import { teamCard } from "../components/cards.js";
import { timeline, twoCompanyConnection } from "../components/visualizations.js";
import { escapeHtml } from "../components/markup.js";
import { PTC, SSPTPL, PEOPLE, STARTUPS, ECOSYSTEM, STORY, trustItems } from "../data/company.js";

const TRUST_ITEMS = trustItems();

function capList(items) {
  return `<ul class="profile-list">${items.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>`;
}

export const meta = {
  title: "About — Power Tech Consultants & SSPTPL",
  description:
    "Profiles of Power Tech Consultants (PTC) and Swain & Sons Power Tech Pvt. Ltd. (SSPTPL), their capabilities, empanelments, channel partnerships and leadership.",
  activeKey: "about",
  canonical: "/about.html",
};

export default function render() {
  const ptcBlock = `<section class="section">
    <div class="container">
      ${sectionHead({ eyebrow: "Company Profile", title: PTC.name })}
      <div class="profile-detail">
        <div class="profile-card-lg reveal" data-reveal="left">
          <span class="company-badge ptc">PTC</span>
          <p>${escapeHtml(PTC.profile)}</p>
          <h4>Core work</h4>
          ${capList(PTC.coreWork)}
        </div>
        <div class="profile-card-lg reveal" data-reveal="right">
          <h4>Empanelments</h4>
          ${capList(PTC.empanelments)}
        </div>
      </div>
    </div>
  </section>`;

  const ssBlock = `<section class="section" style="background:var(--bg-soft);">
    <div class="container">
      ${sectionHead({ eyebrow: "Company Profile", title: SSPTPL.name })}
      <div class="profile-detail">
        <div class="profile-card-lg reveal" data-reveal="left">
          <span class="company-badge ssptpl">SSPTPL</span>
          <p>${escapeHtml(SSPTPL.profile)}</p>
          <h4>Core work</h4>
          ${capList(SSPTPL.coreWork)}
        </div>
        <div class="profile-card-lg reveal" data-reveal="right">
          <h4>Channel partnerships</h4>
          ${capList(SSPTPL.channelPartners)}
          <h4>Achievements so far</h4>
          ${capList(SSPTPL.achievements)}
        </div>
      </div>
    </div>
  </section>`;

  const team = `<section class="section">
    <div class="container">
      ${sectionHead({ eyebrow: "Leadership & Team", title: "Key Persons", lead: "Consulting engineers and accredited energy auditors with decades of utility and industry experience." })}
      <div class="person-grid reveal-group">
        ${PEOPLE.map((p) => teamCard(p)).join("")}
      </div>
    </div>
  </section>`;

  const startups = `<section class="section" style="background:var(--bg-soft);">
    <div class="container">
      ${sectionHead({ eyebrow: "Group Ecosystem", title: "Startup Companies", lead: "SSPTPL works as an incubator and promotes innovation and entrepreneurship, providing mentoring, infrastructural, business development and marketing support to the following startup companies." })}
      <div class="startup-grid reveal-group">
        ${STARTUPS.map((s) => `<div class="startup-card reveal"><span class="startup-name">${escapeHtml(s)}</span></div>`).join("")}
      </div>
    </div>
  </section>`;

  return [
    pageHero({ eyebrow: "About", title: "About Power Tech", lead: "Two companies, one power-tech identity — engineering, energy and trading expertise.", crumbs: "About Us", bg: true }),
    companyProfiles(PTC, SSPTPL),
    timeline(STORY, { eyebrow: "Our Story", title: "From Consulting House to Ecosystem" }),
    ptcBlock,
    ssBlock,
    twoCompanyConnection(),
    team,
    startups,
    trustSection(TRUST_ITEMS),
    ecosystemBlock(ECOSYSTEM),
  ].join("\n");
}
