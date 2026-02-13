/* =========================================
   FORENSICBUZZ – FINAL WORKING SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     DARK / LIGHT MODE TOGGLE
  =============================== */
  const themeSwitch = document.getElementById("themeSwitch");

  if (themeSwitch) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      themeSwitch.checked = true;
    }

    themeSwitch.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    });
  }

  /* ===============================
     HERO BUTTON – Start Your Journey
  =============================== */
  const heroBtn = document.querySelector(".cta");

  if (heroBtn) {
    heroBtn.addEventListener("click", function () {
      // Smooth scroll to cards section
      const featureSection = document.querySelector(".features");
      if (featureSection) {
        featureSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* ===============================
     FEATURE CARD BUTTONS
  =============================== */
  const cardButtons = document.querySelectorAll(".card-btn");

  if (cardButtons.length > 0) {
    cardButtons.forEach(function (btn, index) {
      btn.addEventListener("click", function () {

        // DIRECT PAGE OPEN (NO DELAY)
        if (index === 0) {
          window.location.href = "mcq.html";
        }

        if (index === 1) {
          window.location.href = "previous-year.html";
        }

        if (index === 2) {
          window.location.href = "mock.html";
        }

      });
    });
  }

  /* ===============================
     NAVIGATION LINKS FIX
  =============================== */
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {

      const href = this.getAttribute("href");

      // Agar section link hai (#)
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
      // Agar page link hai
      else if (href && href !== "#") {
        window.location.href = href;
      }

    });
  });

});
/* ===============================
   HERO HEADING CLICK (BUTTON)
=============================== */
const heroHeadingBtn = document.getElementById("heroHeadingBtn");

if (heroHeadingBtn) {
  heroHeadingBtn.addEventListener("click", function () {
    const featureSection = document.querySelector(".features");

    if (featureSection) {
      featureSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("learnMoreBtn");
    const extraContent = document.getElementById("extraContent");

    btn.addEventListener("click", function() {
        if (extraContent.style.display === "block") {
            extraContent.style.display = "none";
            btn.textContent = "Learn More";
        } else {
            extraContent.style.display = "block";
            btn.textContent = "Show Less";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const glassNav = document.getElementById("glassNav");

    if (menuToggle && glassNav) {
        menuToggle.addEventListener("click", function () {
            glassNav.classList.toggle("active");
        });
    }

});
