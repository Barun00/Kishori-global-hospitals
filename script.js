/* =========================================================
   KISHORI GLOBAL HOSPITAL
   Website Interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ---------- 1. MOBILE NAVIGATION ----------

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  function closeMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  function toggleMenu() {
    if (!menuToggle || !navMenu) return;

    const isOpen = navMenu.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);
    }
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", toggleMenu);

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navMenu.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) {
        closeMenu();
      }
    });
  }


  // ---------- 2. SCROLL REVEAL ANIMATIONS ----------

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    // Fallback: prevent sections from remaining hidden.
    window.setTimeout(() => {
      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight + 100) {
          element.classList.add("active");
        }
      });
    }, 1500);

  } else {
    // Older browser fallback.
    revealElements.forEach((element) => {
      element.classList.add("active");
    });
  }


  // ---------- 3. ACTIVE NAVIGATION LINKS ----------

  const navLinks = document.querySelectorAll(
    '#navMenu a[href^="#"]'
  );

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  function setActiveLink(sectionId) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("active", isActive);
    });
  }

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveLink(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.15, 0.3, 0.5]
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const sectionId = link.getAttribute("href").slice(1);

      if (sectionId) {
        setActiveLink(sectionId);
      }
    });
  });


  // ---------- 4. AUTOMATIC COPYRIGHT YEAR ----------

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // ---------- 5. APPOINTMENT DATE VALIDATION ----------

  const appointmentDate = document.getElementById("appointmentDate");

  function getLocalDateString() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  if (appointmentDate) {
    appointmentDate.min = getLocalDateString();
  }


  // ---------- 6. APPOINTMENT FORM DEMO ----------

  const appointmentForm = document.getElementById("appointmentForm");
  const appointmentMessage = document.getElementById(
    "appointmentMessage"
  );

  if (appointmentForm && appointmentMessage) {
    appointmentForm.addEventListener("submit", (event) => {
      event.preventDefault();

      appointmentMessage.textContent = "";
      appointmentMessage.setAttribute("role", "status");

      if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
      }

      const phoneInput = document.getElementById("patientPhone");
      const phoneDigits = phoneInput.value.replace(/\D/g, "");

      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        appointmentMessage.textContent =
          "Please enter a valid contact number containing 10 to 15 digits.";

        phoneInput.focus();
        return;
      }

      if (appointmentDate.value < getLocalDateString()) {
        appointmentMessage.textContent =
          "Please choose today or a future date.";

        appointmentDate.focus();
        return;
      }

      /*
       * FRONT-END DEMO ONLY
       *
       * There is no backend connection.
       * Do not claim that an appointment was booked or submitted.
       * No patient form data is stored or transmitted here.
       */

      appointmentMessage.textContent =
        "Form validation complete. This website demo has not sent your request to the hospital. Please call Reception at +91 7077772231 to arrange and confirm your appointment.";
    });
  }


  // ---------- 7. GENERAL CONTACT FORM DEMO ----------

  const contactForm = document.getElementById("contactForm");
  const contactMessageStatus = document.getElementById(
    "contactMessageStatus"
  );

  if (contactForm && contactMessageStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      contactMessageStatus.textContent = "";

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const phoneInput = document.getElementById("contactPhone");
      const phoneDigits = phoneInput.value.replace(/\D/g, "");

      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        contactMessageStatus.textContent =
          "Please enter a valid contact number containing 10 to 15 digits.";

        phoneInput.focus();
        return;
      }

      /*
       * FRONT-END DEMO ONLY
       *
       * The enquiry is not emailed, transmitted or saved.
       * A backend or approved form service is needed
       * to receive real enquiries.
       */

      contactMessageStatus.textContent =
        "Form validation complete. This website demo has not sent your enquiry. Please email kishoriglobalhospitals@gmail.com or call +91 7077772231 for assistance.";
    });
  }


  // ---------- 8. FAQ ACCESSIBILITY ----------

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const summary = item.querySelector("summary");

    if (summary) {
      summary.setAttribute("aria-label", summary.textContent.trim());
    }
  });


  // ---------- 9. EXTERNAL LINKS ----------

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });

});
// KGH logo intro
document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("siteIntro");

    if (!intro) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.setTimeout(() => {
        intro.classList.add("is-leaving");
    }, reducedMotion ? 200 : 1900);

    window.setTimeout(() => {
        intro.remove();
    }, reducedMotion ? 500 : 2700);
});