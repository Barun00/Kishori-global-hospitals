/* ============================================================
   KISHORI GLOBAL HOSPITAL
   Website interactions + Supabase appointment/contact forms
   Preserves existing homepage behaviour and layout.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const db = window.kghSupabase;


  // ----------------------------------------------------------
  // 1. MOBILE NAVIGATION
  // ----------------------------------------------------------

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

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
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
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) closeMenu();
    });
  }


  // ----------------------------------------------------------
  // 2. SCROLL REVEAL ANIMATIONS
  // ----------------------------------------------------------

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

    // Fallback: don't leave initially visible content hidden.
    window.setTimeout(() => {
      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight + 100) {
          element.classList.add("active");
        }
      });
    }, 1500);

  } else {
    revealElements.forEach((element) => {
      element.classList.add("active");
    });
  }


  // ----------------------------------------------------------
  // 3. ACTIVE NAVIGATION LINKS
  // ----------------------------------------------------------

  const navLinks = document.querySelectorAll(
    '#navMenu a[href^="#"]'
  );

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  function setActiveLink(sectionId) {
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${sectionId}`
      );
    });
  }

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
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

      if (sectionId) setActiveLink(sectionId);
    });
  });


  // ----------------------------------------------------------
  // 4. AUTOMATIC COPYRIGHT YEAR
  // ----------------------------------------------------------

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // ----------------------------------------------------------
  // 5. FORM UTILITIES
  // ----------------------------------------------------------

  function getLocalDateString() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function isValidPhone(value) {
    const digits = String(value || "").replace(/\D/g, "");

    return digits.length >= 10 && digits.length <= 15;
  }

  function showFormMessage(element, text, type = "") {
    if (!element) return;

    element.textContent = text;

    element.classList.remove(
      "form-success",
      "form-error"
    );

    if (type === "success") {
      element.classList.add("form-success");
    }

    if (type === "error") {
      element.classList.add("form-error");
    }
  }

  function setFormBusy(form, busy) {
    const button = form.querySelector('button[type="submit"]');

    if (!button) return;

    if (busy) {
      if (!button.dataset.originalHTML) {
        button.dataset.originalHTML = button.innerHTML;
      }

      button.disabled = true;
      button.textContent = "Submitting...";

    } else {
      button.disabled = false;

      if (button.dataset.originalHTML) {
        button.innerHTML = button.dataset.originalHTML;
        delete button.dataset.originalHTML;
      }
    }
  }

  function showBackendUnavailable(element, formType) {
    if (!db) {
      showFormMessage(
        element,
        `${formType} service is not connected. Please contact the hospital directly.`,
        "error"
      );

      return true;
    }

    return false;
  }


  // ----------------------------------------------------------
  // 6. APPOINTMENT DATE VALIDATION
  // ----------------------------------------------------------

  const appointmentDate = document.getElementById(
    "appointmentDate"
  );

  if (appointmentDate) {
    appointmentDate.min = getLocalDateString();
  }


  // ----------------------------------------------------------
  // 7. APPOINTMENT FORM -> SUPABASE
  // ----------------------------------------------------------

  const appointmentForm = document.getElementById(
    "appointmentForm"
  );

  const appointmentMessage = document.getElementById(
    "appointmentMessage"
  );

  if (appointmentForm && appointmentMessage) {
    appointmentForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      showFormMessage(appointmentMessage, "");

      if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
      }

      const patientName = document
        .getElementById("patientName")
        .value.trim();

      const patientPhone = document
        .getElementById("patientPhone")
        .value.trim();

      const department = document
        .getElementById("appointmentDepartment")
        .value;

      const preferredDate = appointmentDate.value;

      const preferredTime = document
        .getElementById("appointmentTime")
        ?.value || "";

      const preferredDoctor = document
        .getElementById("doctorName")
        .value.trim();

      const visitReason = document
        .getElementById("visitReason")
        .value.trim();

      if (!isValidPhone(patientPhone)) {
        showFormMessage(
          appointmentMessage,
          "Please enter a valid phone number containing 10 to 15 digits.",
          "error"
        );

        document.getElementById("patientPhone").focus();
        return;
      }

      if (preferredDate < getLocalDateString()) {
        showFormMessage(
          appointmentMessage,
          "Please select today or a future appointment date.",
          "error"
        );

        appointmentDate.focus();
        return;
      }

      if (showBackendUnavailable(
        appointmentMessage,
        "Online appointment"
      )) {
        return;
      }

      setFormBusy(appointmentForm, true);

      try {
        const { error } = await db
          .from("appointments")
          .insert({
            patient_name: patientName,
            phone: patientPhone,
            department: department,
            preferred_doctor: preferredDoctor,
            preferred_date: preferredDate,
            preferred_time: preferredTime,
            visit_reason: visitReason,
            consent: true
          });

        if (error) {
          console.error(
            "Appointment submission failed:",
            error.code || "UNKNOWN_ERROR"
          );

          showFormMessage(
            appointmentMessage,
            "We could not save your appointment request. Please call reception at +91 7077772231.",
            "error"
          );

          return;
        }

        appointmentForm.reset();

        if (appointmentDate) {
          appointmentDate.min = getLocalDateString();
        }

        showFormMessage(
          appointmentMessage,
          "Your appointment request has been received. It is not yet a confirmed booking. Please contact reception to confirm availability.",
          "success"
        );

      } catch (error) {
        console.error("Appointment service unavailable.");

        showFormMessage(
          appointmentMessage,
          "The booking service is temporarily unavailable. Please call the hospital.",
          "error"
        );

      } finally {
        setFormBusy(appointmentForm, false);
      }
    });
  }


  // ----------------------------------------------------------
  // 8. CONTACT FORM -> SUPABASE
  // ----------------------------------------------------------

  const contactForm = document.getElementById("contactForm");

  const contactMessageStatus = document.getElementById(
    "contactMessageStatus"
  );

  if (contactForm && contactMessageStatus) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      showFormMessage(contactMessageStatus, "");

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const name = document
        .getElementById("contactName")
        .value.trim();

      const phone = document
        .getElementById("contactPhone")
        .value.trim();

      const email = document
        .getElementById("contactEmail")
        .value.trim();

      const category = document
        .getElementById("enquiryCategory")
        .value;

      const messageText = document
        .getElementById("contactMessage")
        .value.trim();

      if (!isValidPhone(phone)) {
        showFormMessage(
          contactMessageStatus,
          "Please enter a valid phone number containing 10 to 15 digits.",
          "error"
        );

        document.getElementById("contactPhone").focus();
        return;
      }

      if (showBackendUnavailable(
        contactMessageStatus,
        "Online enquiry"
      )) {
        return;
      }

      setFormBusy(contactForm, true);

      try {
        const { error } = await db
          .from("contact_messages")
          .insert({
            name: name,
            phone: phone,
            email: email,
            category: category,
            message: messageText,
            consent: true
          });

        if (error) {
          console.error(
            "Contact submission failed:",
            error.code || "UNKNOWN_ERROR"
          );

          showFormMessage(
            contactMessageStatus,
            "We could not save your enquiry. Please email kishoriglobalhospitals@gmail.com or contact reception.",
            "error"
          );

          return;
        }

        contactForm.reset();

        showFormMessage(
          contactMessageStatus,
          "Your enquiry has been received for authorised hospital staff to review.",
          "success"
        );

      } catch (error) {
        console.error("Contact service unavailable.");

        showFormMessage(
          contactMessageStatus,
          "The enquiry service is temporarily unavailable. Please contact the hospital by phone or email.",
          "error"
        );

      } finally {
        setFormBusy(contactForm, false);
      }
    });
  }


  // ----------------------------------------------------------
  // 9. FAQ ACCESSIBILITY
  // ----------------------------------------------------------

  document.querySelectorAll(".faq-item").forEach((item) => {
    const summary = item.querySelector("summary");

    if (summary) {
      summary.setAttribute(
        "aria-label",
        summary.textContent.trim()
      );
    }
  });


  // ----------------------------------------------------------
  // 10. EXTERNAL LINK SAFETY
  // ----------------------------------------------------------

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });


  // ----------------------------------------------------------
  // 11. CONFIGURATION STATUS
  // ----------------------------------------------------------

  if (!db) {
    console.warn(
      "KGH: Supabase client unavailable. Check script order and supabase-config.js."
    );
  } else {
    console.info("KGH: Website interactions initialized.");
  }

});