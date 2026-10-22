import site from "../site.config.js";
import { getOverallStatus, getVenueStatus } from "./hours.js";

export function isPreviewEnvironment() {
  const host = window.location.hostname;
  return window.location.protocol === "file:" ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".e2b.app");
}

export function whatsappUrl(message) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

function updateStatus() {
  const now = new Date();
  const overall = getOverallStatus(site, now);
  document.querySelectorAll("[data-overall-status]").forEach((element) => {
    element.classList.toggle("is-open", overall.isOpen);
    element.classList.toggle("is-closed", !overall.isOpen);
    element.querySelector("[data-status-title]").textContent = overall.shortText;
    element.querySelector("[data-status-detail]").textContent = overall.detail;
    element.title = `Live status calculated in ${site.timeZone}`;
  });

  document.querySelectorAll("[data-venue-status]").forEach((element) => {
    const key = element.dataset.venueStatus;
    const venue = site.hours[key];
    if (!venue) return;
    const status = getVenueStatus(venue, now, site.timeZone);
    element.classList.toggle("is-open", status.isOpen);
    element.classList.toggle("is-closed", !status.isOpen);
    const label = element.classList.contains("venue-status")
      ? element.querySelector(":scope > span")
      : element.querySelector("b span");
    if (label) label.textContent = status.shortText;
    element.title = `${venue.label}: ${status.detail} · ${site.timeZone}`;
  });
}

function updateMap() {
  const placeholder = document.querySelector("[data-map-placeholder]");
  if (!placeholder || !site.contact.mapEmbedUrl) return;
  const iframe = document.createElement("iframe");
  iframe.className = "map-embed";
  iframe.src = site.contact.mapEmbedUrl;
  iframe.title = `Map showing ${site.name}`;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.allowFullscreen = true;
  placeholder.replaceChildren(iframe);
  placeholder.classList.add("has-map-embed");
}

export function initSite() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const floatingWhatsApp = document.querySelector("[data-floating-whatsapp]");
  if (floatingWhatsApp) {
    floatingWhatsApp.href = whatsappUrl(`Hello ${site.name}, I'd like to make an enquiry.`);
  }

  updateStatus();
  updateMap();
  window.setInterval(updateStatus, 60_000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateStatus();
  });
}
