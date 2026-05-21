(() => {
  const STORAGE_KEY = "site-theme";
  const RETRO = "retro";
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  function isRetro() {
    return root.getAttribute("data-theme") === RETRO;
  }

  function apply(theme) {
    if (theme === RETRO) {
      root.setAttribute("data-theme", RETRO);
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme === RETRO ? RETRO : "dark");
    } catch (_) {
      /* ignore private browsing */
    }
    updateButton();
  }

  function updateButton() {
    if (!btn) return;
    const retro = isRetro();
    btn.textContent = retro ? "Dark mode" : "Light mode";
    btn.setAttribute("aria-pressed", String(retro));
    btn.setAttribute(
      "title",
      retro ? "Return to the modern dark theme" : "Switch to early-internet light mode"
    );
    btn.setAttribute(
      "aria-label",
      retro ? "Switch to dark mode" : "Switch to early-internet light mode"
    );
  }

  updateButton();
  btn?.addEventListener("click", () => apply(isRetro() ? "dark" : RETRO));
})();
