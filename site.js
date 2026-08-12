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

document.querySelectorAll("form[id^='appointment-form']").forEach((form) => form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submit = form.querySelector("button[type=submit]");
  submit.disabled = true;
  submit.textContent = "Sending request…";
  try {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!response.ok) throw new Error("Unable to send");
    form.reset();
    message.textContent = "Thank you — your appointment request is in. Our care team will contact you shortly to confirm a time.";
    message.classList.add("show");
  } catch {
    message.textContent = "We could not send that request right now. Please call +234 704 908 8169 and our team will help you.";
    message.classList.add("show");
    message.style.color = "#8d2d2d";
    message.style.background = "#fff0f0";
  } finally {
    submit.disabled = false;
    submit.textContent = "Request appointment";
  }
}));

document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });