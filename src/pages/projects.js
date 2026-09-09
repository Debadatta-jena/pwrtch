/* =============================================================
   src/pages/projects.js — project & engagement record (composition).
   Data lives in ../data/projects.js.
   ============================================================= */
import { pageHero, projectShowcase, ctaSection } from "../components/sections.js";
import { PROJECTS, getAllProjects, getFeaturedProjects } from "../data/projects.js";

export const meta = {
  title: "Projects Handled — Power Tech Consultants & SSPTPL",
  description:
    "Filterable record of real engagements across PTC and SSPTPL: energy audits, solar EPC, open-access power trading, T&D engineering, industrial and tourism feasibility studies.",
  activeKey: "projects",
  canonical: "/projects.html",
};

export default function render() {
  const projects = getAllProjects();
  return [
    pageHero({ eyebrow: "Projects Handled", title: "Project Experience", lead: "A record of real engagements across both companies. Filter by entity or category.", crumbs: "Projects Handled" }),
    `<section class="section"><div class="container">
      ${projectShowcase({ projects, withFilter: true }).replace('<div class="section-foot reveal"><a href="projects.html" class="btn btn-outline">View All Projects</a></div>', "")}
    </div></section>`,
    ctaSection(),
  ].join("\n");
}
