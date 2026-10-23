// Theme switch. Dark is the default; the choice is remembered per browser and
// applied by an inline script in <head> before first paint, so a returning
// visitor never sees the wrong palette flash.
const STORAGE_KEY = "mayfair-theme";

const THEMES = {
  dark: { next: "light", label: "Light mode", action: "Switch to light theme", color: "#0b0b0a" },
  light: { next: "dark", label: "Dark mode", action: "Switch to dark theme", color: "#f8f4ec" },
};

function storedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    // Storage can be blocked (private mode, file://); fall back to the default.
    return "dark";
  }
}

export function applyTheme(theme) {
  const root = document.documentElement;
  const resolved = theme === "light" ? "light" : "dark";
  const meta = THEMES[resolved];

  root.dataset.theme = resolved;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", meta.color);

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-label", meta.action);
    button.title = meta.action;
  });
  document.querySelectorAll("[data-theme-text]").forEach((label) => {
    label.textContent = meta.label;
  });

  return resolved;
}

export function initTheme() {
  const root = document.documentElement;
  applyTheme(root.dataset.theme ?? storedTheme());

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = THEMES[root.dataset.theme]?.next ?? "light";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore: the switch still works for this page view.
      }
    });
  });

  // Keep other tabs of the site in step with this one.
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) applyTheme(storedTheme());
  });
}
