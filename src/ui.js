const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function initHeader() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!header) return;

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const dropdowns = [...header.querySelectorAll("[data-nav-dropdown]")];
  const closeDropdowns = () => {
    dropdowns.forEach((dropdown) => {
      dropdown.querySelector("[data-nav-dropdown-toggle]")?.setAttribute("aria-expanded", "false");
      const panel = dropdown.querySelector("[data-nav-dropdown-menu]");
      if (panel) panel.hidden = true;
    });
  };
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("[data-nav-dropdown-toggle]");
    const panel = dropdown.querySelector("[data-nav-dropdown-menu]");
    trigger?.addEventListener("click", () => {
      const willOpen = trigger.getAttribute("aria-expanded") !== "true";
      closeDropdowns();
      trigger.setAttribute("aria-expanded", String(willOpen));
      if (panel) panel.hidden = !willOpen;
    });
    panel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeDropdowns));
  });
  document.addEventListener("click", (event) => {
    if (!dropdowns.some((dropdown) => dropdown.contains(event.target))) closeDropdowns();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openDropdown = dropdowns.find((dropdown) => dropdown.querySelector("[data-nav-dropdown-toggle]")?.getAttribute("aria-expanded") === "true");
    if (!openDropdown) return;
    closeDropdowns();
    openDropdown.querySelector("[data-nav-dropdown-toggle]")?.focus();
  });

  if (!toggle || !menu) return;
  const toggleLabel = toggle.querySelector(".menu-toggle-label");
  const setInert = (value) => {
    document.querySelector("main")?.toggleAttribute("inert", value);
    document.querySelector(".site-footer")?.toggleAttribute("inert", value);
    document.querySelector("[data-floating-whatsapp]")?.toggleAttribute("inert", value);
  };
  const close = (returnFocus = false) => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    if (toggleLabel) toggleLabel.textContent = "Menu";
    menu.hidden = true;
    header.classList.remove("is-menu-open");
    document.body.classList.remove("menu-open");
    setInert(false);
    if (returnFocus) toggle.focus();
  };
  const open = () => {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation");
    if (toggleLabel) toggleLabel.textContent = "Close";
    menu.hidden = false;
    header.classList.add("is-menu-open");
    document.body.classList.add("menu-open");
    setInert(true);
    window.setTimeout(() => menu.querySelector("a")?.focus(), 30);
  };

  toggle.addEventListener("click", () => {
    toggle.getAttribute("aria-expanded") === "true" ? close() : open();
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => close()));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") close(true);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1120 && toggle.getAttribute("aria-expanded") === "true") close();
  });
}

function initReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -35px" });
  elements.forEach((element) => observer.observe(element));
}

function activateTabs(group, targetId, focus = false) {
  if (!group) return;
  const tabs = [...group.querySelectorAll(":scope > .tab-list [role='tab']")];
  tabs.forEach((tab) => {
    const selected = tab.dataset.tabTarget === targetId;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = group.querySelector(`#${tab.dataset.tabTarget}`);
    if (panel) panel.hidden = !selected;
    if (selected && focus) tab.focus();
  });
}

function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const tabs = [...group.querySelectorAll(":scope > .tab-list [role='tab']")];
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTabs(group, tab.dataset.tabTarget));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = null;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activateTabs(group, tabs[nextIndex].dataset.tabTarget, true);
      });
    });
  });
}

function initBookingLinks() {
  const group = document.querySelector("#booking-tabs");
  if (!group) return;
  document.querySelectorAll("[data-booking]").forEach((link) => {
    link.addEventListener("click", () => {
      const type = link.dataset.booking;
      activateTabs(group, `booking-${type}`);
      if (link.dataset.room) {
        const select = document.querySelector("#room-type");
        if (select) {
          select.value = link.dataset.room;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
      if (link.dataset.interest) {
        const select = document.querySelector("#experience-interest");
        if (select) {
          select.value = link.dataset.interest;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    });
  });
}

function imageSet(base) {
  return [480, 800, 1200, 1600].map((width) => `${base}-${width}.webp ${width}w`).join(", ");
}

function initRoomGalleries() {
  document.querySelectorAll("[data-room-gallery]").forEach((gallery) => {
    const mainButton = gallery.querySelector("[data-room-main]");
    const mainImage = mainButton?.querySelector("img");
    if (!mainButton || !mainImage) return;
    gallery.querySelectorAll("[data-room-thumb]").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const base = thumb.dataset.imageBase;
        gallery.querySelectorAll("[data-room-thumb]").forEach((item) => item.setAttribute("aria-pressed", String(item === thumb)));
        mainImage.src = `${base}-800.webp`;
        mainImage.srcset = imageSet(base);
        mainImage.alt = thumb.dataset.alt;
        mainButton.dataset.lightboxSrc = `${base}-1600.webp`;
        const roomName = gallery.closest(".room-card")?.querySelector("h3")?.textContent || "Hotel room";
        mainButton.dataset.lightboxCaption = `${roomName} · Sample photograph`;
        mainButton.setAttribute("aria-label", `Enlarge ${roomName} sample photograph`);
      });
    });
  });
}

function initLightbox() {
  const dialog = document.querySelector("[data-lightbox]");
  if (!dialog) return;
  const image = dialog.querySelector("[data-lightbox-image]");
  const caption = dialog.querySelector("[data-lightbox-caption-text]");
  const closeButton = dialog.querySelector("[data-lightbox-close]");
  let triggers = [];
  let current = 0;
  let returnTarget = null;

  const render = () => {
    const trigger = triggers[current];
    if (!trigger) return;
    const text = trigger.dataset.lightboxCaption || "Sample venue photograph";
    image.src = trigger.dataset.lightboxSrc;
    image.alt = text;
    caption.textContent = text;
    const nextIndex = (current + 1) % triggers.length;
    const nextSource = triggers[nextIndex]?.dataset.lightboxSrc;
    if (nextSource) {
      const preload = new Image();
      preload.src = nextSource;
    }
  };
  const move = (direction) => {
    current = (current + direction + triggers.length) % triggers.length;
    render();
  };
  const open = (trigger) => {
    triggers = [...document.querySelectorAll("[data-lightbox-src]")];
    current = Math.max(0, triggers.indexOf(trigger));
    returnTarget = trigger;
    render();
    dialog.showModal();
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };
  const close = () => dialog.close();

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest?.("[data-lightbox-src]");
    if (trigger) open(trigger);
  });
  closeButton.addEventListener("click", close);
  dialog.querySelector("[data-lightbox-prev]").addEventListener("click", () => move(-1));
  dialog.querySelector("[data-lightbox-next]").addEventListener("click", () => move(1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    returnTarget?.focus();
  });
}

function initCarousel() {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll("[data-slide]")];
  const dots = [...carousel.querySelectorAll("[data-slide-to]")];
  const count = document.querySelector("[data-carousel-count]");
  const section = carousel.closest(".testimonials-section");
  let index = 0;
  let timer = null;

  const show = (next, manual = false) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.hidden = slideIndex !== index);
    dots.forEach((dot, dotIndex) => dot.setAttribute("aria-pressed", String(dotIndex === index)));
    if (count) count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    if (manual) {
      carousel.setAttribute("aria-live", "polite");
      stop();
    }
  };
  const start = () => {
    if (reducedMotion.matches || timer || document.hidden) return;
    carousel.setAttribute("aria-live", "off");
    timer = window.setInterval(() => show(index + 1), 7000);
  };
  const stop = () => {
    window.clearInterval(timer);
    timer = null;
  };

  document.querySelector("[data-carousel-prev]")?.addEventListener("click", () => show(index - 1, true));
  document.querySelector("[data-carousel-next]")?.addEventListener("click", () => show(index + 1, true));
  dots.forEach((dot) => dot.addEventListener("click", () => show(Number(dot.dataset.slideTo), true)));
  section?.addEventListener("mouseenter", stop);
  section?.addEventListener("mouseleave", start);
  section?.addEventListener("focusin", stop);
  section?.addEventListener("focusout", () => window.setTimeout(() => {
    if (!section.contains(document.activeElement)) start();
  }, 0));
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  show(0);
  start();
}

function initActiveNavigation() {
  if (!("IntersectionObserver" in window)) return;
  const links = [...document.querySelectorAll(".desktop-nav a")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-20% 0px -68%", threshold: 0 });
  links.forEach((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) observer.observe(target);
  });
}

export function initUI() {
  initHeader();
  initReveals();
  initTabs();
  initBookingLinks();
  initRoomGalleries();
  initLightbox();
  initCarousel();
  initActiveNavigation();
}
