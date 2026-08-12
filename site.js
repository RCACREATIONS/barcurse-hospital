const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => navLinks.classList.remove("open")));
}

const modal = document.querySelector("#booking-modal");
const openBooking = () => {
  if (!modal) return;
  modal.classList.add("open");
  document.body.classList.add("modal-open");
  modal.querySelector("input")?.focus();
};
document.querySelectorAll("[data-booking]").forEach((button) => button.addEventListener("click", openBooking));
modal?.addEventListener("click", (event) => {
  if (event.target === modal || event.target.closest("[data-close-modal]")) {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }
});

// All appointment requests are sent straight to the clinic's WhatsApp number.
const WHATSAPP_NUMBER = "2347049088169";

const buildWhatsAppMessage = (data) => {
  const lines = [
    "New appointment request — Barcruse Outpatient Clinic",
    `Name: ${data.name || ""}`,
    `Phone: ${data.phone || ""}`,
    data.email ? `Email: ${data.email}` : null,
    `Service: ${data.service || ""}`,
    `Preferred date: ${data.date || ""}`,
    data.notes ? `Notes: ${data.notes}` : null,
  ].filter(Boolean);
  return lines.join("\n");
};

const showFormMessage = (form, text, isError) => {
  const messageEl = form.querySelector(".form-message");
  if (!messageEl) return;
  messageEl.textContent = text;
  messageEl.classList.add("show");
  messageEl.style.color = isError ? "#8d2d2d" : "";
  messageEl.style.background = isError ? "#fff0f0" : "";
};

document.querySelectorAll("form[id^='appointment-form']").forEach((form) => form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submit = form.querySelector("button[type=submit]");
  const data = Object.fromEntries(new FormData(form));

  const required = ["name", "phone", "service", "date"];
  const missing = required.some((key) => !String(data[key] || "").trim());
  if (missing) {
    showFormMessage(form, "Please fill in your name, phone, service and preferred date.", true);
    return;
  }

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;

  if (submit) submit.disabled = true;
  window.open(waUrl, "_blank", "noopener");
  showFormMessage(form, "Opening WhatsApp — just hit send there to complete your appointment request.", false);
  form.reset();
  if (submit) submit.disabled = false;
}));

document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
