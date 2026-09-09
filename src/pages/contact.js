/* =============================================================
   src/pages/contact.js — real contact details (from pwrtch.com/contact-us).
   ============================================================= */
import { pageHero, sectionHead } from "../components/sections.js";
import { contactJsonLd } from "../components/layout.js";
import { contactCard } from "../components/cards.js";
import { contactConnection } from "../components/visualizations.js";
import { escapeHtml } from "../components/markup.js";

const CONTACT = {
  ptc: {
    name: "Power Tech Consultants",
    emails: ["pwrtch@gmail.com"],
    phones: ["0674-2386219", "0671-2328844", "9937112760", "8327733623", "9437155337"],
    offices: [
      "Corporate & Correspondence Office: Plot No. K-8-82, Kalinga Nagar, Ghatikia, Bhubaneswar-751003, Odisha. Phone: 0674-2386219; Mobile: 9937112760, 8327733623; WhatsApp: 9437155337; Email: pwrtch@gmail.com",
      "Registered Office: 1-A/6, Swati Villa, Surya Vihar, Link Road, Cuttack-753012, Odisha. Phone: 0671-2328844; Mobile: 9937112760, 8327733623; WhatsApp: 9437155337; Email: pwrtch@gmail.com",
    ],
  },
  ssptpl: {
    name: "Swain & Sons Power Tech Private Limited",
    emails: ["sspt12@gmail.com"],
    phones: ["0674-2386219", "0671-2328844", "9937159760", "9937109790", "9937112760", "8327733623", "9437155337"],
    offices: [
      "Corporate & Correspondence Office: Plot No. K-8-82, Kalinga Nagar, Ghatikia, Bhubaneswar-751003, Odisha. Phone: 0674-2386219; Mobile: 9937159760, 9937109790, 9937112760, 8327733623; WhatsApp: 9437155337; Email: sspt12@gmail.com",
      "Registered Office: Swati Villa, Surya Vihar, Link Road, Cuttack-753012, Odisha. Phone: 0671-2328844; Mobile: 9937159760, 9937109790, 9937112760, 8327733623; WhatsApp: 9437155337; Email: sspt12@gmail.com",
    ],
  },
};

export const meta = {
  title: "Contact Us — Power Tech Consultants & SSPTPL",
  description:
    "Reach Power Tech Consultants and Swain & Sons Power Tech Pvt. Ltd. Corporate and registered offices in Bhubaneswar and Cuttack, Odisha.",
  activeKey: "contact",
  canonical: "/contact.html",
  jsonLd: contactJsonLd(),
};

export default function render() {
  return [
    pageHero({ eyebrow: "Contact Us", title: "Get in Touch", lead: "Reach either company below at its Bhubaneswar or Cuttack office.", crumbs: "Contact Us", bg: true }),
    `<section class="section"><div class="container">
      ${sectionHead({ eyebrow: "Channels", title: "Contact Details" })}
      <div class="contact-grid">
        ${contactCard(CONTACT.ptc, "ptc")}
        ${contactCard(CONTACT.ssptpl, "ssptpl")}
      </div>
      <div class="offices reveal"><h3>Offices</h3><ul class="profile-list">${CONTACT.ptc.offices.concat(CONTACT.ssptpl.offices).map((o) => `<li>${escapeHtml(o)}</li>`).join("")}</ul></div>
    </div></section>`,
    contactConnection(),
    `<section class="section" style="background:var(--bg-soft);"><div class="container">
      ${sectionHead({ eyebrow: "Write to Us", title: "Send a Message" })}
      <div class="form-wrap reveal">
        <form class="contact-form" id="contactForm" novalidate>
          <div class="form-grid">
            <div class="field"><label for="cf-name">Name *</label><input id="cf-name" name="name" type="text" required autocomplete="name" /></div>
            <div class="field"><label for="cf-email">Email *</label><input id="cf-email" name="email" type="email" required autocomplete="email" /></div>
            <div class="field"><label for="cf-company">Company</label><input id="cf-company" name="company" type="text" autocomplete="organization" /></div>
            <div class="field"><label for="cf-phone">Phone</label><input id="cf-phone" name="phone" type="tel" autocomplete="tel" /></div>
            <div class="field field-full"><label for="cf-company2">Which company?</label>
              <select id="cf-company2" name="to">
                <option value="PTC">Power Tech Consultants</option>
                <option value="SSPTPL">Swain &amp; Sons Power Tech Pvt. Ltd.</option>
              </select></div>
            <div class="field field-full"><label for="cf-message">Message *</label><textarea id="cf-message" name="message" rows="5" required></textarea></div>
          </div>
          <div class="form-actions"><button type="submit" class="btn btn-primary">Send Message</button><span class="form-status" id="cfStatus" role="status" aria-live="polite"></span></div>
          <p class="form-note">This static site does not submit data. Wire the form to your backend / form service for production use.</p>
        </form>
      </div>
    </div></section>`,
  ].join("\n");
}
