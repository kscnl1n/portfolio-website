// This page simply exists to route to Github pages
// Since this is a static site, there isn't much functionality for this page

(() => {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
})();