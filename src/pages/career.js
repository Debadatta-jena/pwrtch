/* =============================================================
   src/pages/career.js — real content from pwrtch.com/careers.html
   and the internship programme (training_workshop.html).
   ============================================================= */
import { pageHero, ctaSection, sectionHead } from "../components/sections.js";
import { icon } from "../components/cards.js";
import { careerJourney } from "../components/visualizations.js";
import { escapeHtml } from "../components/markup.js";

const AREAS = [
  { icon: "audit", title: "Energy & Power Engineering", desc: "Audits, design, PMC and commissioning roles." },
  { icon: "trading", title: "Power Trading & Regulatory", desc: "Open access, REC, market operations." },
  { icon: "renewable", title: "Renewable Energy", desc: "Solar, wind, biomass and storage development." },
  { icon: "pmc", title: "Project Management", desc: "Construction supervision and procurement." },
  { icon: "industrial", title: "Industrial & Utility Ops", desc: "Operations, efficiency and compliance." },
  { icon: "training", title: "Digital & Analytics", desc: "Data, modelling and energy management tools." },
];

const ENV = [
  "Ownership of real infrastructure and energy projects",
  "Mentorship from ex-utility leaders and accredited auditors",
  "Cross-domain exposure: generation, transmission, trading",
  "A culture of engineering rigour and continuous learning",
];

const INTERN_OBJECTIVES = [
  "To bridge the gap between academics and Industry.",
  "To enhance the employability of the future emerging workforce.",
  "To help the students through competency development and industry exposure in the area of Power and Energy.",
  "To organize programs relevant to the industry and create differentiator for the students and prospective recruiters.",
];

export const meta = {
  title: "Career — Power Tech Consultants & SSPTPL",
  description:
    "Build a career in power engineering, energy audit and trading with the Power Tech group. Send your resume to hr@pwrtch.com.",
  activeKey: "career",
  canonical: "/career.html",
};

export default function render() {
  return [
    pageHero({
      eyebrow: "Career",
      title: "Build a Career in Power",
      lead: "We are a growing engineering, energy and power-trading group. Join us in shaping a reliable, cleaner energy future.",
      crumbs: "Career",
      bg: true,
    }),
    careerJourney([
      { title: "Learn", desc: "Mentorship from ex-utility leaders and accredited energy professionals." },
      { title: "Work", desc: "Own real infrastructure and energy projects across the value chain." },
      { title: "Grow", desc: "Cross-domain exposure: generation, transmission, trading and renewables." },
      { title: "Lead", desc: "Advance into technical and project leadership within the ecosystem." },
    ]),
    `<section class="section"><div class="container">
      ${sectionHead({ eyebrow: "Why Join", title: "Work That Matters" })}
      <div class="profile-detail">
        <div class="profile-card-lg reveal"><h4>We offer</h4><ul class="profile-list">${ENV
          .map((e) => `<li>${escapeHtml(e)}</li>`)
          .join("")}</ul></div>
        <div class="profile-card-lg reveal">
          <h4>Who we encourage</h4>
          <p>Fresh &amp; Experienced Degree, Diploma Engineers from Mechanical, Electrical Engineering background, Information Technology, Computer Science background, Fresh B.Sc. / BBA Graduates, MSc. / MBA, having good academic background and a zeal to learn are very much encouraged in our organization.</p>
          <p>They may send their resumes to <a href="mailto:hr@pwrtch.com">hr@pwrtch.com</a> along with detailed profile and expected remuneration.</p>
        </div>
      </div>
    </div></section>`,
    `<section class="section" style="background:var(--bg-soft);"><div class="container">
      ${sectionHead({ eyebrow: "Explore Areas", title: "Where You Could Fit" })}
      <div class="works-grid">${AREAS
        .map(
          (a) => `<article class="work-card reveal"><span class="work-icon" aria-hidden="true">${icon(a.icon)}</span><h3>${escapeHtml(a.title)}</h3><p>${escapeHtml(a.desc)}</p></article>`
        )
        .join("")}</div>
    </div></section>`,
    `<section class="section"><div class="container">
      ${sectionHead({ eyebrow: "Internship", title: "Learn by Doing" })}
      <div class="profile-detail">
        <div class="profile-card-lg reveal">
          <h4>Internship programme</h4>
          <p>We provide Internship Facilities to Engineering students, Law and MBA Students so that they can enhance their skill and shall be able to work in the field of Power and energy, Regulatory Issues.</p>
          <p>The Interns will work for a period of 12 month as per their course curriculum while they are pursuing their course work. We provide necessary work station and conference room facility to the Intern and certificate after successful completion of internship.</p>
          <p>In the past brilliant students of the reputed University like National Law University, Cuttack; Central University, Jharkhand; IIT Bhubaneswar have completed their internship program with us.</p>
        </div>
        <div class="profile-card-lg reveal">
          <h4>Objectives</h4>
          <ul class="profile-list">${INTERN_OBJECTIVES.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}</ul>
          <p>Send your resume to <a href="mailto:hr@pwrtch.com">hr@pwrtch.com</a> to apply.</p>
        </div>
      </div>
    </div></section>`,
    ctaSection(),
  ].join("\n");
}
