import site from "../site.config.js";
import { isPreviewEnvironment, whatsappUrl } from "./site.js";

const fieldLabels = {
  venue: "Venue",
  name: "Name",
  phone: "Phone / WhatsApp",
  email: "Email",
  date: "Preferred date",
  time: "Preferred time",
  guests: "Guests / party size",
  seating: "Seating",
  requests: "Notes",
  roomType: "Room preference",
  checkIn: "Check-in",
  checkOut: "Check-out",
  rooms: "Number of rooms",
  interest: "Interested in",
};

function dateToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function setDateConstraints(form) {
  const today = dateToday();
  form.querySelectorAll("[data-future-date], [data-checkin]").forEach((input) => {
    input.min = today;
  });
  const checkIn = form.querySelector("[data-checkin]");
  const checkOut = form.querySelector("[data-checkout]");
  if (checkIn && checkOut) {
    checkOut.min = addDays(checkIn.value || today, 1);
    if (checkIn.value && checkOut.value && checkOut.value <= checkIn.value) {
      checkOut.value = addDays(checkIn.value, 1);
    }
  }
}

function validateField(field, form) {
  if (!field || field.disabled || field.type === "hidden") return true;
  const value = field.value.trim();
  let message = "";

  if (field.required && !value) {
    if (field.tagName === "SELECT") message = "Please choose an option.";
    else if (field.type === "date") message = "Please choose a date.";
    else if (field.type === "time") message = "Please choose a time.";
    else if (field.type === "email") message = "Please enter your email address.";
    else if (field.type === "tel") message = "Please enter a number we can reach you on.";
    else message = "Please complete this field.";
  } else if (value && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = "Please enter a valid email, such as name@example.com.";
  } else if (value && field.type === "tel") {
    const digits = value.replace(/\D/g, "");
    if (!/^[+()\d\s-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
      message = "Please enter a valid phone number, including the country code.";
    }
  } else if (value && field.name === "name" && value.length < 2) {
    message = "Please enter your full name.";
  } else if (value && (field.matches("[data-future-date]") || field.matches("[data-checkin]")) && value < dateToday()) {
    message = "Please choose today or a future date.";
  } else if (value && field.matches("[data-checkout]")) {
    const checkIn = form.querySelector("[data-checkin]");
    if (checkIn?.value && value <= checkIn.value) {
      message = "Check-out must be at least one day after check-in.";
    }
  }

  const wrapper = field.closest(".field");
  const error = wrapper?.querySelector(".field-error");
  wrapper?.classList.toggle("has-error", Boolean(message));
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) error.textContent = message;
  return !message;
}

function validateForm(form) {
  form.dataset.attempted = "true";
  const fields = [...form.querySelectorAll("input, select, textarea")].filter((field) =>
    field.required || field.type === "email" || field.type === "tel" || field.matches("[data-checkout]")
  );
  const results = fields.map((field) => validateField(field, form));
  const firstInvalid = fields[results.indexOf(false)];
  if (firstInvalid) {
    firstInvalid.focus();
    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }
  return true;
}

function formMessage(form) {
  const type = form.dataset.bookingForm;
  const introductions = {
    table: `Hello ${site.name}, I'd like to request a table reservation.`,
    room: `Hello ${site.name}, I'd like to enquire about a hotel stay.`,
    experience: `Hello ${site.name}, I'd like to make a VVIP / Snooker enquiry.`,
  };
  const lines = [introductions[type] || `Hello ${site.name}, I'd like to make an enquiry.`];
  const data = new FormData(form);
  for (const [key, value] of data.entries()) {
    if (["form-name", "bot-field"].includes(key) || !String(value).trim()) continue;
    lines.push(`${fieldLabels[key] || key}: ${value}`);
  }
  lines.push("Please let me know what is available. Thank you.");
  return lines.join("\n");
}

function updateWhatsApp(form) {
  const link = form.querySelector("[data-whatsapp-form]");
  if (link) link.href = whatsappUrl(formMessage(form));
}

function showResult(form, { error = false, preview = false } = {}) {
  const result = form.querySelector(".form-success");
  if (!result) return;
  const firstName = form.elements.name?.value.trim().split(/\s+/)[0] || "there";
  const type = form.dataset.bookingForm;
  const liveMessages = {
    table: "We’ve received your request. Our team will contact you shortly to confirm your table. Your reservation is not confirmed just yet.",
    room: "We’ve received your dates. Our stay team will reply with room availability and the next steps. No booking has been made yet.",
    experience: "We’ve received your plans. Your host will be in touch to confirm availability and shape the evening with you.",
  };

  result.classList.toggle("is-error", error);
  result.querySelector("strong").textContent = error
    ? "We couldn’t send that just yet."
    : `Thank you, ${firstName}.`;
  result.querySelector("[data-success-message]").textContent = error
    ? "Please try again, or use the WhatsApp button to send your request directly."
    : preview
      ? "Your request passed validation in this website preview, but was not sent. Once deployed to Netlify, the form will deliver it to your reservations team."
      : liveMessages[type];
  result.querySelector("use")?.setAttribute("href", error ? "#icon-close" : "#icon-check");
  result.hidden = false;
  result.focus({ preventScroll: true });
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function submitForm(form) {
  if (!validateForm(form)) return;
  if (form.elements["bot-field"]?.value) return;

  const button = form.querySelector("button[type='submit']");
  const original = button.innerHTML;
  button.disabled = true;
  button.textContent = "Sending request…";
  form.querySelector(".form-success").hidden = true;

  try {
    if (isPreviewEnvironment()) {
      await new Promise((resolve) => window.setTimeout(resolve, 550));
      showResult(form, { preview: true });
    } else {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      showResult(form);
    }
    form.reset();
    setDateConstraints(form);
    updateWhatsApp(form);
  } catch (error) {
    console.error(error);
    showResult(form, { error: true });
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
}

export function initForms() {
  const forms = document.querySelectorAll("[data-booking-form]");
  forms.forEach((form) => {
    form.noValidate = true;
    setDateConstraints(form);
    updateWhatsApp(form);

    const previewNote = form.querySelector("[data-preview-note]");
    if (previewNote && isPreviewEnvironment()) {
      previewNote.textContent = "Preview mode: submissions are simulated; Netlify Forms activates after deployment.";
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(form);
    });

    form.addEventListener("input", (event) => {
      const field = event.target;
      if (form.dataset.attempted || field.closest(".field")?.classList.contains("has-error")) {
        validateField(field, form);
      }
      if (field.matches("[data-checkin]")) setDateConstraints(form);
      form.querySelector(".form-success").hidden = true;
      updateWhatsApp(form);
    });
    form.addEventListener("change", () => {
      setDateConstraints(form);
      updateWhatsApp(form);
    });
    form.addEventListener("focusout", (event) => {
      if (event.target.value && !event.target.matches("textarea")) validateField(event.target, form);
    });

    form.querySelector("[data-whatsapp-form]")?.addEventListener("click", (event) => {
      updateWhatsApp(form);
      if (!validateForm(form)) event.preventDefault();
    });
  });
}
