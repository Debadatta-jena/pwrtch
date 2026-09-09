/* =============================================================
   src/js/core/filter.js — project filter (company + category)
   ============================================================= */
(function () {
  document.querySelectorAll(".filter-bar").forEach((bar) => {
    const section = bar.closest("section");
    const cards = section ? Array.from(section.querySelectorAll(".project-card")) : [];
    if (!cards.length) return;
    const groups = Array.from(bar.querySelectorAll(".filter-group"));
    let activeCompany = "all", activeCat = "all";

    bar.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const group = btn.closest(".filter-group");
      const gi = groups.indexOf(group);
      group.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      if (gi === 0) activeCompany = f;
      else activeCat = f;

      cards.forEach((c) => {
        const okC = activeCompany === "all" || c.dataset.company.toLowerCase() === activeCompany;
        const okCat = activeCat === "all" || c.dataset.category === activeCat;
        c.style.display = okC && okCat ? "" : "none";
      });
    });
  });
})();
