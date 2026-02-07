(function () {
  "use strict";

  const header = document.getElementById("header");
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll(".nav__link");
  const contactForm = document.getElementById("contact-form");
  const themeToggle = document.getElementById("theme-toggle");
  const THEME_KEY = "portfolio-theme";

  // Theme: light / dark (saved in localStorage)
  function getTheme() {
    return localStorage.getItem(THEME_KEY) || "dark";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    }
  }

  function toggleTheme() {
    setTheme(getTheme() === "light" ? "dark" : "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    setTheme(getTheme());
  }

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
      navToggle.setAttribute("aria-expanded", navMenu.classList.contains("show"));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        navMenu.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      });
    }
  }

  // Header background on scroll
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // Smooth scroll for anchor links (fallback for older browsers)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Contact form: send to Discord webhook
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1469657142465396788/kj0WK50u_eKczkis7pPt4XVlnWBZ2XW0YtTWohDDtsY7j_OmJRPtaH9qrVCkL6U1mz9N";
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const name = (contactForm.querySelector("#name") || {}).value || "";
      const email = (contactForm.querySelector("#email") || {}).value || "";
      const message = (contactForm.querySelector("#message") || {}).value || "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      const payload = {
        content: null,
        embeds: [
          {
            title: "New message from portfolio",
            color: 5814783,
            fields: [
              { name: "Name", value: name || "*not provided*", inline: true },
              { name: "Email", value: email || "*not provided*", inline: true },
              { name: "Message", value: message || "*empty*", inline: false },
            ],
            footer: { text: "Contact form" },
            timestamp: new Date().toISOString(),
          },
        ],
      };

      fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (res.ok) {
            alert("Thanks! Your message has been sent.");
            contactForm.reset();
          } else {
            throw new Error("Webhook request failed");
          }
        })
        .catch(function () {
          alert("Something went wrong. Please try again or email me directly.");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
          }
        });
    });
  }

  // Up (back to top) button
  const upBtn = document.getElementById("up-btn");
  if (upBtn) {
    function toggleUpBtn() {
      if (window.scrollY > 400) {
        upBtn.classList.add("visible");
      } else {
        upBtn.classList.remove("visible");
      }
    }
    window.addEventListener("scroll", toggleUpBtn, { passive: true });
    toggleUpBtn();
    upBtn.addEventListener("click", function () {
      document.getElementById("hero").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Hero title: slow typing effect for "Rebeka"
  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) {
    const titleTextEl = heroTitle.querySelector(".hero__title-text");
    const titleCursorEl = heroTitle.querySelector(".hero__title-cursor");
    const name = "Rebeka";
    if (titleTextEl) {
      let i = 0;
      var typeInterval = 220;
      function typeLetter() {
        if (i <= name.length) {
          titleTextEl.textContent = name.slice(0, i);
          i += 1;
          setTimeout(typeLetter, typeInterval);
        } else {
          if (titleCursorEl) titleCursorEl.style.visibility = "hidden";
        }
      }
      setTimeout(typeLetter, 800);
    }
  }

  // Client reviews: repeat flow 1…10 then again 1…10 (seamless loop)
  const reviewsFlow = document.querySelector(".reviews__flow");
  const reviewsTrack = document.querySelector(".reviews__track");
  if (reviewsFlow && reviewsTrack) {
    const groups = reviewsFlow.querySelectorAll(".reviews__flow-group");
    const group = groups[0];
    if (group && groups.length >= 2) {
      const speed = 0.55;
      let offset = 0;
      let groupWidth = 0;
      let rafId = null;
      let isPaused = false;

      function measure() {
        groupWidth = group.offsetWidth;
      }

      function tick() {
        if (isPaused) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        if (!groupWidth) {
          measure();
          rafId = requestAnimationFrame(tick);
          return;
        }
        offset -= speed;
        if (offset <= -groupWidth) {
          offset = 0;
        }
        reviewsFlow.style.transform = "translateX(" + offset + "px)";
        rafId = requestAnimationFrame(tick);
      }

      function start() {
        reviewsFlow.style.animation = "none";
        measure();
        if (groupWidth) {
          offset = 0;
          reviewsFlow.style.transform = "translateX(0)";
          rafId = requestAnimationFrame(tick);
        } else {
          requestAnimationFrame(start);
        }
      }

      reviewsFlow.addEventListener("mouseenter", function () {
        isPaused = true;
      });
      reviewsFlow.addEventListener("mouseleave", function () {
        isPaused = false;
      });
      window.addEventListener("resize", function () {
        measure();
        if (offset <= -groupWidth) offset = 0;
      });
      if (document.readyState === "complete") {
        setTimeout(start, 150);
      } else {
        window.addEventListener("load", function () {
          setTimeout(start, 150);
        });
      }
    }
  }

  // Scroll-triggered animations
  const animatedEls = document.querySelectorAll(".animate-on-scroll");
  if (animatedEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
    );
    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }
})();
