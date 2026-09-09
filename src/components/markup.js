/* =============================================================
   src/components/helpers.js
   Small pure helpers used by all components.
   ============================================================= */

export function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function brandMarkSVG() {
  return `
    <svg viewBox="0 0 48 48" width="38" height="38" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ptcBolt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
      <path d="M27 4 L12 27 H22 L20 44 L36 19 H25 Z" fill="url(#ptcBolt)" />
    </svg>`;
}

export function serviceSlug(title) {
  return String(title).toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function companyBadge(company) {
  const cls = company === "SSPTPL" ? "ssptpl" : "ptc";
  return `<span class="company-badge ${cls}">${escapeHtml(company)}</span>`;
}

/* Image placeholder slot (SVG + label, with alt/role for a11y).
   Used instead of unlicensed photography. */
export function mediaPlaceholder(kind, label) {
  const gradients = {
    solar: "linear-gradient(135deg,#fde68a,#f59e0b)",
    wind: "linear-gradient(135deg,#bfdbfe,#2563eb)",
    thermal: "linear-gradient(135deg,#fca5a5,#dc2626)",
    transmission: "linear-gradient(135deg,#c7d2fe,#4f46e5)",
    trading: "linear-gradient(135deg,#a7f3d0,#10b981)",
    industrial: "linear-gradient(135deg,#e5e7eb,#64748b)",
    institutional: "linear-gradient(135deg,#ddd6fe,#7c3aed)",
    regulatory: "linear-gradient(135deg,#fbcfe8,#db2777)",
    infrastructure: "linear-gradient(135deg,#bae6fd,#0ea5e9)",
    default: "linear-gradient(135deg,#e0e7ff,#2563eb)",
  };
  const bg = gradients[kind] || gradients.default;
  const safeLabel = escapeHtml(label || kind);
  return `
    <div class="media-ph" role="img" aria-label="${safeLabel}" style="background:${bg}">
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <g fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.2">
          <path d="M0 46 Q25 30 50 44 T100 40" />
          <path d="M0 54 Q30 40 55 52 T100 50" />
        </g>
        <g stroke="rgba(255,255,255,0.35)" stroke-width="0.8">
          <line x1="14" y1="0" x2="14" y2="60" /><line x1="38" y1="0" x2="38" y2="60" />
          <line x1="62" y1="0" x2="62" y2="60" /><line x1="86" y1="0" x2="86" y2="60" />
        </g>
      </svg>
      <span class="media-ph-label">${safeLabel}</span>
    </div>`;
}
