document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const statusEl = form.querySelector(".contact-form__status");
  const submitBtn = form.querySelector('button[type="submit"]');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const company = form.company.value;

    statusEl.textContent = "";
    statusEl.classList.remove("is-error", "is-success");

    if (!name || !email || !message) {
      statusEl.textContent = "Please fill in your name, email, and message.";
      statusEl.classList.add("is-error");
      return;
    }

    if (!emailPattern.test(email)) {
      statusEl.textContent = "Please enter a valid email address.";
      statusEl.classList.add("is-error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      statusEl.textContent = "Thanks — your message is on its way. I'll get back to you soon.";
      statusEl.classList.add("is-success");
      form.reset();
    } catch (err) {
      statusEl.textContent = err.message || "Something went wrong. Please try again later.";
      statusEl.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    }
  });
});
