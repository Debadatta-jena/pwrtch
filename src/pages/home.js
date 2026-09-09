/* =============================================================
   src/pages/home.js — homepage composition (data sourced per-page).
   ============================================================= */
import { SERVICES } from "../data/services.js";
import { PROJECTS, getFeaturedProjects } from "../data/projects.js";
import { CLIENTS } from "../data/clients.js";
import { PTC, SSPTPL } from "../data/company.js";
import {
  hero, companyProfiles, servicesOverview, whatWeDo, projectShowcase,
  metricsSection, whyChoose, industriesSection, trustSection, ctaSection, miniPreview,
  principlesSection,
} from "../components/sections.js";

/* Honest, defensible figures (all traceable to pwrtch.com content). */
const METRICS = [
  { value: 16, suffix: "", label: "Service categories offered", verified: true },
  { value: 28, suffix: "+", label: "Energy-intensive industries audited under PAT Cycle-V", verified: true },
  { value: 150, suffix: "+", label: "Clients & empanelments served", verified: true },
  { value: 10, suffix: "", label: "Rajasthan thermal power plants — PAT baseline audits", verified: true },
];

const WHY = [
  { n: "01", title: "BEE Accredited Energy Auditor Firm (EmAEA)", desc: "Monitoring & Verification Audit of Designated Consumers under the PAT Scheme; accredited under the Energy Conservation Act, 2001." },
  { n: "02", title: "MNRE Empanelled Solar EPC", desc: "Empanelled by MNRE for Grid Connected Rooftop and Solar Power Plants; dealer and channel partner for leading solar OEMs." },
  { n: "03", title: "IEX Channel Partner for Odisha", desc: "Power and REC trading, open access and regulatory support through the Indian Energy Exchange." },
  { n: "04", title: "Ex-utility leadership", desc: "Consultants formerly with GRIDCO, OPTCL and other utilities with 30+ years in generation, transmission and distribution." },
  { n: "05", title: "SERC / CERC petition experience", desc: "Preparation and hearing of tariff, RPO, open-access and grid-support-charge matters before OERC and regulatory commissions." },
  { n: "06", title: "Two complementary companies", desc: "PTC brings consultancy & engineering; SSPTPL brings trading, EPC and renewable execution." },
];

const INDUSTRIES = [
  { icon: "steel", title: "Steel & Ferro Alloys", desc: "Energy audits, PAT advisory and regulatory support for steel, sponge iron and ferro-alloy plants." },
  { icon: "aluminium", title: "Aluminium & Metals", desc: "Smelter, power complex and mining energy audits under PAT and BEE guidelines." },
  { icon: "utilities", title: "Utilities & DISCOMs", desc: "Third-party SOP audits, disaster-resilient DPRs and tariff/petition support for utilities." },
  { icon: "government", title: "Government & Institutions", desc: "Investment-grade audits of government buildings, hospitals and institutional campuses." },
  { icon: "renewable", title: "Renewable Energy", desc: "Solar, wind, biomass and small-hydro DPR/TEFR, EPC and power evacuation studies." },
  { icon: "petrochemical", title: "Petroleum & Petrochemical", desc: "Refinery lighting audits, fertiliser and petrochemical energy studies." },
  { icon: "manufacturing", title: "Manufacturing & Cement", desc: "Energy management, motor-replacement and process efficiency programmes." },
  { icon: "infrastructure", title: "Railways & Infrastructure", desc: "Traction sub-station studies, BEEP retrofits and EV/solar charging feasibility." },
];

const TRUST = [
  ...PTC.empanelments.map((text) => ({ text, company: "PTC" })),
  ...SSPTPL.channelPartners.map((text) => ({ text, company: "SSPTPL" })),
];

export const meta = {
  title: "Power Tech Consultants & Swain & Sons Power Tech Pvt. Ltd.",
  description:
    "Engineering, energy and power consultancy across PTC and SSPTPL — project management, energy audit, renewable energy and power trading.",
  activeKey: "home",
  canonical: "/index.html",
};

export default function render() {
  return [
    hero(),
    companyProfiles(PTC, SSPTPL),
    servicesOverview(SERVICES),
    whatWeDo(),
    projectShowcase({ projects: getFeaturedProjects(6), withFilter: true }),
    metricsSection(METRICS),
    whyChoose(WHY),
    principlesSection([
      { title: "Assess", desc: "Investment-grade audits, DPR/TEFR and feasibility studies that de-risk the decision before a rupee is committed." },
      { title: "Design", desc: "Basic and detailed engineering, statutory grid studies and regulatory petitions — prepared by ex-utility experts." },
      { title: "Deliver", desc: "Project management consultancy, procurement assistance and EPC execution through to commissioning." },
      { title: "Sustain", desc: "Power trading, open access and energy management that keep assets performing for the long run." },
    ], { lead: "A disciplined, end-to-end method — from first assessment to measurable outcomes." }),
    industriesSection(INDUSTRIES, CLIENTS),
    trustSection(TRUST),
    miniPreview({ id: "career", eyebrow: "Career", title: "Build a Career in Power", lead: "Join engineers and auditors shaping India's energy transition.", ctaLabel: "Explore Careers", ctaHref: "career.html" }),
    miniPreview({ id: "contact", eyebrow: "Contact Us", title: "Talk to Our Team", lead: "Reach Power Tech Consultants or SSPTPL for your requirement.", ctaLabel: "Contact Us", ctaHref: "contact.html" }),
    miniPreview({ id: "feedback", eyebrow: "Feedback", title: "Share Your Feedback", lead: "Your input helps us improve our engagement.", ctaLabel: "Give Feedback", ctaHref: "feedback.html" }),
    ctaSection(),
  ].join("\n");
}
