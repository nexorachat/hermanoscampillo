const WHATSAPP_NUMBER = "34614353842";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Menú para móviles.
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

// Los botones de los servicios abren WhatsApp con el servicio indicado.
document.querySelectorAll(".wa-service").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const title =
      link.closest(".service-card")
        ?.querySelector("h3")
        ?.textContent
        ?.trim() || "Consulta";

    const message =
      `Hola, quiero consultar sobre este servicio: ${title}. ` +
      "¿Podrían darme más información?";

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  });
});

// Formulario de contacto: prepara el mensaje y lo abre en WhatsApp.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const description = String(formData.get("message") || "").trim();

    const whatsappMessage = [
      "Hola, quiero consultar un trabajo.",
      "",
      `Nombre: ${name}`,
      `Teléfono de contacto: ${phone}`,
      `Servicio solicitado: ${service}`,
      `Descripción: ${description}`
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    if (formStatus) {
      formStatus.textContent =
        "Se abrirá WhatsApp para revisar el mensaje y enviarlo.";
    }

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );
  });
}

// Animaciones al aparecer las secciones en pantalla.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

// Año automático en el pie de página.
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
