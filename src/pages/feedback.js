/* =============================================================
   src/pages/feedback.js — real content from pwrtch.com/feedback.html
   ============================================================= */
import { pageHero, sectionHead } from "../components/sections.js";
import { escapeHtml } from "../components/markup.js";

export const meta = {
  title: "Feedback — Power Tech Consultants & SSPTPL",
  description: "Share your feedback about our services and engagement. Email infopwrtch@gmail.com.",
  activeKey: "feedback",
  canonical: "/feedback.html",
};

export default function render() {
  const topics = ["Service quality", "Project delivery", "Communication", "Technical Depth", "Other"];
  return [
    pageHero({ eyebrow: "Feedback", title: "Share Your Feedback", lead: "Tell us how we did. Your input helps us improve every engagement.", crumbs: "Feedback" }),
    `<section class="section"><div class="container">
      ${sectionHead({ eyebrow: "We're Listening", title: "Your Feedback" })}
      <p class="lead" style="text-align:center;max-width:60ch;margin:0 auto 28px;">For any feedback related to us and our services, please mail us to <a href="mailto:infopwrtch@gmail.com">infopwrtch@gmail.com</a> along with your details.</p>
      <div class="form-wrap reveal">
        <form class="feedback-form" id="feedbackForm" novalidate>
          <div class="form-grid">
            <div class="field"><label for="fb-name">Name</label><input id="fb-name" name="name" type="text" autocomplete="name" /></div>
            <div class="field"><label for="fb-email">Email</label><input id="fb-email" name="email" type="email" autocomplete="email" /></div>
            <div class="field field-full"><label for="fb-company">Company / Project</label><input id="fb-company" name="company" type="text" autocomplete="organization" /></div>
            <div class="field field-full"><label>How would you rate us?</label>
              <div class="rating" role="radiogroup" aria-label="Rating">
                ${[1, 2, 3, 4, 5].map((n) => `<label class="rating-star"><input type="radio" name="rating" value="${n}" /><span aria-hidden="true">&#9733;</span></label>`).join("")}
              </div>
            </div>
            <div class="field field-full"><label for="fb-topic">Topic</label>
              <select id="fb-topic" name="topic">${topics.map((t) => `<option>${escapeHtml(t)}</option>`).join("")}</select></div>
            <div class="field field-full"><label for="fb-message">Your feedback *</label><textarea id="fb-message" name="message" rows="5" required></textarea></div>
          </div>
          <div class="form-actions"><button type="submit" class="btn btn-primary">Submit Feedback</button><span class="fb-ripple" aria-hidden="true"></span><span class="form-status" id="fbStatus" role="status" aria-live="polite"></span></div>
          <p class="form-note">This static site does not store data. Wire the form to your backend / form service for production use.</p>
        </form>
      </div>
    </div></section>`,
  ].join("\n");
}
