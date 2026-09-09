/* =============================================================
   src/js/core/forms.js — client-side validation only (no network)
   ============================================================= */
(function () {
  function validate(form) {
    let ok = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const wrap = field.closest(".field");
      const valid = field.value.trim() !== "" && (field.type !== "email" || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value));
      if (wrap) wrap.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });
    const ratingGroup = form.querySelector('input[name="rating"]');
    if (ratingGroup) {
      const checked = form.querySelector('input[name="rating"]:checked');
      if (!checked) { ok = false; }
    }
    return ok;
  }

  function status(el, msg, isError) {
    el.textContent = msg;
    el.classList.toggle("error", !!isError);
  }

  const contact = document.getElementById("contactForm");
  if (contact) {
    const st = document.getElementById("cfStatus");
    contact.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(contact)) {
        status(st, "Please complete the required fields.", true);
        return;
      }
      status(st, "Thanks! (Prototype — not submitted.)", false);
      contact.reset();
    });
  }

  const feedback = document.getElementById("feedbackForm");
  if (feedback) {
    const st = document.getElementById("fbStatus");
    feedback.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(feedback)) {
        status(st, "Please complete the required fields.", true);
        return;
      }
      status(st, "Thanks for your feedback! (Prototype — not stored.)", false);
      feedback.reset();
    });
  }
})();
