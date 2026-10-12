
"use strict";

const WHATSAPP_NUMBER = "34614353842";

// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

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

// Botones de consulta de cada servicio
document.querySelectorAll(".wa-service").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const card = link.closest(".service-card");
    const title = card?.querySelector("h3")?.textContent?.trim()
      || "Consulta sobre un servicio";

    const message = [
      "Hola, Hermanos Campillo.",
      "",
      `Quería consultar el siguiente servicio: ${title}.`,
      "¿Podrían darme más información?"
    ].join("\n");

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  });
});

// Formulario de contacto
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
      "Hola, Hermanos Campillo. Quiero consultar un trabajo.",
      "",
      `Nombre: ${name}`,
      `Teléfono de contacto: ${phone}`,
      `Servicio solicitado: ${service}`,
      "",
      "Descripción del trabajo:",
      description
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    if (formStatus) {
      formStatus.textContent =
        "Abriendo WhatsApp. Revisa el mensaje y pulsa Enviar para remitir la consulta.";
    }

    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    // Si el navegador bloquea la nueva pestaña, abre WhatsApp en la actual.
    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }
  });
}

// Animaciones de entrada al desplazarse por la página
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Año del pie de página
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
