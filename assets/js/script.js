const packageModal = document.querySelector("#packageDetailModal");
const contactForm = document.querySelector("#contact-form");
const navbar = document.querySelector(".navbar");

if (navbar) {
  const updateNavbar = () => {
    const hero = document.querySelector(".hero");
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 720;
    navbar.classList.toggle("is-scrolled", window.scrollY + 68 >= heroBottom);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
}

if (packageModal) {
  const packageTitle = document.querySelector("#packageModalTitle");
  const packageRegion = document.querySelector(".package-detail-region");
  const packageDuration = document.querySelector(".package-detail-duration");
  const packagePrice = document.querySelector(".package-detail-price-value");
  const packageImage = document.querySelector(".package-detail-image");
  const packageDescription = document.querySelector(".package-detail-description");
  const packageBookButton = document.querySelector(".package-book-button");
  const contactSubject = document.querySelector("#contact-subject");
  let focusContactAfterClose = false;

  packageModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;

    if (!button) {
      return;
    }

    packageTitle.textContent = button.dataset.title;
    packageRegion.textContent = button.dataset.region;
    packageDuration.textContent = button.dataset.duration;
    packagePrice.textContent = button.dataset.price;
    packageImage.src = button.dataset.image;
    packageImage.alt = `${button.dataset.title} - ${button.dataset.region}`;
    packageDescription.textContent = button.dataset.description;
  });

  packageBookButton.addEventListener("click", () => {
    contactSubject.value = `Pemesanan paket: ${packageTitle.textContent}`;
    focusContactAfterClose = true;
    bootstrap.Modal.getOrCreateInstance(packageModal).hide();
  });

  packageModal.addEventListener("hidden.bs.modal", () => {
    if (!focusContactAfterClose) {
      return;
    }

    focusContactAfterClose = false;
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    contactSubject.focus({ preventScroll: true });
  });
}

if (contactForm) {
  const fields = Array.from(contactForm.querySelectorAll("input, textarea"));
  const successMessage = contactForm.querySelector(".contact-success");

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      successMessage.classList.add("d-none");
      field.classList.remove("is-valid");

      if (field.value.trim() && field.checkValidity()) {
        field.classList.remove("is-invalid");
        field.removeAttribute("aria-invalid");
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    successMessage.classList.add("d-none");

    let firstInvalidField;

    fields.forEach((field) => {
      const isValid = field.value.trim() !== "" && field.checkValidity();
      field.classList.toggle("is-invalid", !isValid);
      field.classList.toggle("is-valid", isValid);
      field.setAttribute("aria-invalid", String(!isValid));

      if (!isValid && !firstInvalidField) {
        firstInvalidField = field;
      }
    });

    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    successMessage.classList.remove("d-none");
    contactForm.reset();
    fields.forEach((field) => {
      field.classList.remove("is-valid");
      field.removeAttribute("aria-invalid");
    });
  });
}
