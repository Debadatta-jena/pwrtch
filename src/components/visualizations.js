/* =============================================================
   src/components/viz.js — server-rendered visual storytelling blocks.
   ============================================================= */
import { escapeHtml } from "./markup.js";

/* ---- About: vertical timeline ---- */
export function timeline(items, { eyebrow, title, lead } = {}) {
  const rows = items
    .map(
      (it) => `<li class="tl-item reveal">
        <span class="tl-dot"></span>
        <div class="tl-card">
          <span class="tl-year">${escapeHtml(it.year)}</span>
          <h4>${escapeHtml(it.title)}</h4>
          <p>${escapeHtml(it.text)}</p>
        </div>
      </li>`
    )
    .join("");
  return `<section class="section timeline-section">
    <div class="container">
      <div class="section-head reveal"><span class="eyebrow">${escapeHtml(eyebrow || "Journey")}</span><h2>${escapeHtml(title || "Our Story")}</h2>${lead ? `<p class="lead">${escapeHtml(lead)}</p>` : ""}</div>
      <ol class="timeline" data-timeline>${rows}</ol>
    </div>
  </section>`;
}

/* ---- About: two-company connection diagram ---- */
export function twoCompanyConnection() {
  return `<section class="section">
    <div class="container">
      <div class="section-head reveal"><span class="eyebrow">One Ecosystem</span><h2>PTC &amp; SSPTPL — Connected</h2></div>
      <div class="connection-wrap reveal" data-connection>
        <svg viewBox="0 0 600 320" class="connection-svg" aria-hidden="true">
          <defs><linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2563eb"/><stop offset="100%" stop-color="#f59e0b"/></linearGradient></defs>
          <path class="conn-line" d="M120 160 C 220 160, 260 160, 300 160" />
          <path class="conn-line" d="M480 160 C 380 160, 340 160, 300 160" />
          <path class="conn-line" d="M300 160 C 300 90, 300 90, 300 70" />
          <circle class="conn-node" cx="120" cy="160" r="10"/>
          <circle class="conn-node" cx="300" cy="160" r="14"/>
          <circle class="conn-node" cx="480" cy="160" r="10"/>
          <circle class="conn-node" cx="300" cy="70" r="8"/>
          <circle class="conn-node" cx="220" cy="120" r="6"/>
          <circle class="conn-node" cx="380" cy="200" r="6"/>
        </svg>
        <div class="conn-labels">
          <div class="conn-ptc"><span class="company-badge ptc">PTC</span><small>Energy · Engineering · Consultancy</small></div>
          <div class="conn-core"><strong>POWER / ENERGY</strong></div>
          <div class="conn-ssptpl"><span class="company-badge ssptpl">SSPTPL</span><small>Trading · EPC · Renewable · Infrastructure</small></div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---- Services: capability network (radial) ---- */
export function capabilityNetwork(services) {
  const N = services.length;
  const nodes = services
    .map((s, i) => {
      const ang = (-90 + (i * 360) / N) * (Math.PI / 180);
      const x = 50 + 38 * Math.cos(ang);
      const y = 50 + 38 * Math.sin(ang);
      const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const short = s.title.split(" ").slice(0, 2).join(" ");
      return `<button class="cap-node" data-service="${slug}" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;--i:${i}" aria-label="${escapeHtml(s.title)}">${escapeHtml(short)}</button>`;
    })
    .join("");
  const lines = services
    .map((s, i) => {
      const ang = (-90 + (i * 360) / N) * (Math.PI / 180);
      const x = 50 + 38 * Math.cos(ang);
      const y = 50 + 38 * Math.sin(ang);
      return `<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="cap-line" />`;
    })
    .join("");

  const panels = services
    .map((s) => {
      const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return `<div class="cap-panel" data-service="${slug}">
        <span class="service-company ${s.company.toLowerCase()}">${escapeHtml(s.company)}</span>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.overview)}</p>
        <ul class="svc-cap">${s.capabilities.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
        <p class="svc-scope"><b>Scope:</b> ${escapeHtml(s.scope)}</p>
        <a href="services/${slug}.html" class="link-arrow">Explore this service &rarr;</a>
      </div>`;
    })
    .join("");

  return `<section class="section">
    <div class="container">
      <div class="section-head reveal"><span class="eyebrow">Capability Network</span><h2>Explore the Power System</h2><p class="lead">Select a node to illuminate its capability path.</p></div>
      <div class="cap-net reveal" data-capnet>
        <svg viewBox="0 0 100 100" class="cap-svg" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>
        <div class="cap-center">ENERGY</div>
        ${nodes}
      </div>
      <div class="cap-detail" id="capDetail">${panels}</div>
    </div>
  </section>`;
}

/* ---- Clients: node network ---- */
export function clientNetwork(groups) {
  const all = groups.flatMap((g) => g.items);
  const placed = all
    .map((c, i) => {
      const ang = (i * 137.5 * Math.PI) / 180;
      const rad = 30 + (i % 5) * 7;
      const x = 50 + rad * Math.cos(ang);
      const y = 50 + rad * Math.sin(ang);
      return `<button class="cn-node" style="left:${Math.min(92, Math.max(8, x)).toFixed(1)}%;top:${Math.min(92, Math.max(8, y)).toFixed(1)}%;--i:${i}" title="${escapeHtml(c.name)}"><span>${escapeHtml(c.name.split(/\s+/).slice(0, 1)[0][0] + (c.name.split(/\s+/)[1] ? c.name.split(/\s+/)[1][0] : ""))}</span></button>`;
    })
    .join("");
  return `<section class="section">
    <div class="container">
      <div class="section-head reveal"><span class="eyebrow">Client Ecosystem</span><h2>A Living Network</h2><p class="lead">Hover a node to focus its connection to the Power Tech ecosystem.</p></div>
      <div class="client-net reveal" data-clientnet>
        <div class="cn-center">POWER<br/>TECH</div>
        ${placed}
      </div>
    </div>
  </section>`;
}

/* ---- Contact: connection diagram ---- */
export function contactConnection() {
  return `<section class="section">
    <div class="container">
      <div class="connection-wrap reveal" data-contactnet>
        <svg viewBox="0 0 600 260" class="connection-svg" aria-hidden="true">
          <path class="conn-line" d="M300 60 L 180 200" />
          <path class="conn-line" d="M300 60 L 420 200" />
          <circle class="conn-node" cx="300" cy="60" r="12"/>
          <circle class="conn-node" cx="180" cy="200" r="10"/>
          <circle class="conn-node" cx="420" cy="200" r="10"/>
        </svg>
        <div class="conn-labels contacts-layout">
          <div class="conn-core"><strong>LOCATION</strong></div>
          <div class="conn-ptc"><span class="company-badge ptc">PTC</span><small>Bhubaneswar, Odisha</small></div>
          <div class="conn-ssptpl"><span class="company-badge ssptpl">SSPTPL</span><small>Odisha, India</small></div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---- Career: human journey ---- */
export function careerJourney(steps) {
  return `<section class="section"><div class="container">
    <div class="section-head reveal"><span class="eyebrow">Your Path</span><h2>Learn · Work · Grow · Lead</h2></div>
    <div class="journey reveal-group" data-journey>
      ${steps
        .map(
          (s, i) => `<div class="j-step reveal">
            <span class="j-num">${i + 1}</span>
            <h3>${escapeHtml(s.title)}</h3>
            <p>${escapeHtml(s.desc)}</p>
          </div>`
        )
        .join("")}
    </div>
  </div></section>`;
}

/* ---- Footer network canvas ---- */
export function footerNetwork() {
  return `<div class="footer-net"><canvas id="footerNet" aria-hidden="true"></canvas></div>`;
}
