document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll("[data-include]");

  targets.forEach((el) => {
    const name = el.getAttribute("data-include");
    const url = `/partials/${name}.html`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${url} responded with ${res.status}`);
        return res.text();
      })
      .then((html) => {
        el.innerHTML = html;
        el.dispatchEvent(new CustomEvent("include:loaded", { bubbles: true, detail: { name } }));
      })
      .catch((err) => {
        console.error(`Failed to include "${name}":`, err);
      });
  });
});

document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".nav-toggle");
  if (!toggle) return;

  const list = toggle.closest("nav").querySelector(".site-nav__list");
  const isOpen = list.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});
