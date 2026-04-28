// Aloysius Ajai L. Portfolio - Interactivity & Utilities

// Respect users that prefer reduced motion.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile navigation toggle
const navToggleButton = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggleButton && siteNav) {
  navToggleButton.addEventListener('click', () => {
    const willOpen = !siteNav.classList.contains('open');
    siteNav.classList.toggle('open', willOpen);
    navToggleButton.setAttribute('aria-expanded', String(willOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// Smooth scroll for in-page anchors (if any)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  }

  function resetErrors() {
    [nameError, emailError, messageError].forEach((el) => (el.textContent = ''));
    formSuccess.textContent = '';
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    resetErrors();

    let isValid = true;
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    }
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email.';
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please enter a message.';
      isValid = false;
    }

    if (!isValid) return;

    // Simulate successful submission
    formSuccess.textContent = 'Thanks! Your message has been sent.';
    contactForm.reset();
  });
}

// Skills page: tabs and progress animation
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
if (tabButtons.length && tabPanels.length) {
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      // update tabs
      tabButtons.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      // update panels
      tabPanels.forEach((panel) => {
        const isTarget = panel.id === targetId;
        panel.classList.toggle('show', isTarget);
        panel.hidden = !isTarget;
      });
      // animate progress bars when panel shown
      animateVisibleProgress();
    });
  });

  function animateVisibleProgress() {
    document.querySelectorAll('.tab-panel.show .progress').forEach((bar) => {
      const span = bar.querySelector('span');
      const target = Number(bar.getAttribute('data-progress')) || 0;
      requestAnimationFrame(() => {
        span.style.width = target + '%';
      });
    });
  }

  // Trigger animation on load for default panel
  animateVisibleProgress();
}

// Skills page: metric counters
const metricNumbers = document.querySelectorAll('.metric-number');
if (metricNumbers.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = Number(el.getAttribute('data-target')) || 0;
        const durationMs = 1200;
        const start = performance.now();
        const startVal = 0;
        function tick(now) {
          const progress = Math.min(1, (now - start) / durationMs);
          const value = Math.floor(startVal + progress * (target - startVal));
          el.textContent = String(value);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  metricNumbers.forEach((n) => observer.observe(n));
}

// Global reveal animations for all pages
if (!prefersReducedMotion) {
  const revealSelectors = [
    '.hero-text',
    '.hero-media',
    '.feature-card',
    '.page-hero .container',
    '.about-media',
    '.about-text',
    '.skill-card',
    '.service-card',
    '.metric',
    '.info-card',
    '.contact-form',
    '.faq'
  ];

  const revealItems = document.querySelectorAll(revealSelectors.join(','));
  revealItems.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(index * 45, 450)}ms`;
  });

  document.querySelectorAll('.hero-text, .about-text, .contact-form').forEach((el) => {
    el.setAttribute('data-reveal', 'left');
  });
  document.querySelectorAll('.hero-media, .about-media').forEach((el) => {
    el.setAttribute('data-reveal', 'right');
  });
  document.querySelectorAll('.feature-card, .skill-card, .service-card, .metric, .info-card, .faq').forEach((el) => {
    el.setAttribute('data-reveal', 'zoom');
  });

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}


