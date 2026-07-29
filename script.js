/* ============================================================
   THE VELVET FORK — Premium Fine Dining Restaurant
   script.js — Complete Vanilla JavaScript
   ============================================================ */

'use strict';

/* --------------------------------------------------
   UTILITY HELPERS
-------------------------------------------------- */

/** Shorthand querySelector */
const $ = (selector, parent = document) => parent.querySelector(selector);

/** Shorthand querySelectorAll → Array */
const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));


/* --------------------------------------------------
   1. DOM CONTENT LOADED — Initialize Everything
-------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initGalleryLightbox();
  initTestimonialsSlider();
  initReservationForm();
  initNewsletterForm();
  initBackToTop();
  initSmoothScroll();
  initActiveNavHighlight();
  setMinReservationDate();
});


/* --------------------------------------------------
   2. STICKY HEADER — Scrolled State
-------------------------------------------------- */
function initHeader() {
  const header = $('#header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run immediately in case page loads scrolled
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}


/* --------------------------------------------------
   3. MOBILE MENU — Hamburger Toggle
-------------------------------------------------- */
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobile-nav');
  if (!hamburger || !mobileNav) return;

  const mobileLinks = $$('.mobile-nav-link, .mobile-nav-cta', mobileNav);

  const openMenu = () => {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on nav link click
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      hamburger.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
      closeMenu();
    }
  });
}


/* --------------------------------------------------
   4. SCROLL REVEAL — Intersection Observer
-------------------------------------------------- */
function initScrollReveal() {
  const revealEls = $$('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Once revealed, stop observing
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}


/* --------------------------------------------------
   5. GALLERY LIGHTBOX
-------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = $$('.gallery-item');
  const lightbox     = $('#lightbox');
  const lightboxImg  = $('#lightbox-img');
  const closeBtn     = $('#lightbox-close');
  const prevBtn      = $('#lightbox-prev');
  const nextBtn      = $('#lightbox-next');
  const backdrop     = $('#lightbox-backdrop');

  if (!lightbox || !galleryItems.length) return;

  // Build image sources array from gallery items
  const images = galleryItems.map((item) => {
    const img = item.querySelector('.gallery-img');
    return { src: img?.src || '', alt: img?.alt || '' };
  });

  let currentIndex = 0;

  /* Open lightbox */
  const openLightbox = (index) => {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  /* Close lightbox */
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Return focus to opened gallery item
    galleryItems[currentIndex]?.focus?.();
  };

  /* Navigate */
  const navigate = (direction) => {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    // Animate transition
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = `scale(0.92) translateX(${direction * 20}px)`;
    setTimeout(() => {
      updateLightboxImage();
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1) translateX(0)';
    }, 200);
  };

  /* Update displayed image */
  const updateLightboxImage = () => {
    const { src, alt } = images[currentIndex];
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  };

  /* Click gallery items */
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));

    // Keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  /* Controls */
  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  /* Keyboard navigation */
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  /* Touch/swipe support */
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1);
  }, { passive: true });
}


/* --------------------------------------------------
   6. TESTIMONIALS SLIDER
-------------------------------------------------- */
function initTestimonialsSlider() {
  const slider   = $('#testimonials-slider');
  const slides   = $$('.testimonial-slide');
  const prevBtn  = $('#testimonial-prev');
  const nextBtn  = $('#testimonial-next');
  const dots     = $$('.tdot');

  if (!slider || !slides.length) return;

  let currentSlide = 0;
  let autoPlayInterval = null;
  const AUTOPLAY_DELAY = 5000; // 5 seconds

  /* Go to a specific slide */
  const goToSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
      dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
    });
  };

  /* Navigate by direction */
  const navigate = (direction) => {
    goToSlide(currentSlide + direction);
    resetAutoplay();
  };

  /* Autoplay */
  const startAutoplay = () => {
    autoPlayInterval = setInterval(() => goToSlide(currentSlide + 1), AUTOPLAY_DELAY);
  };

  const resetAutoplay = () => {
    clearInterval(autoPlayInterval);
    startAutoplay();
  };

  /* Event Listeners */
  prevBtn?.addEventListener('click', () => navigate(-1));
  nextBtn?.addEventListener('click', () => navigate(1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoplay();
    });
  });

  /* Touch/swipe support */
  let swipeStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    swipeStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].screenX - swipeStartX;
    if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1);
  }, { passive: true });

  /* Pause on hover */
  const sliderWrap = slider.closest('.testimonials-slider-wrap');
  sliderWrap?.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  sliderWrap?.addEventListener('mouseleave', startAutoplay);

  /* Initialize */
  goToSlide(0);
  startAutoplay();
}


/* --------------------------------------------------
   7. RESERVATION FORM — Validation + Success
-------------------------------------------------- */
function initReservationForm() {
  const form    = $('#reservation-form');
  const success = $('#reservation-success');
  if (!form || !success) return;

  /* Set field references */
  const fields = {
    name:    { el: $('#res-name'),   err: $('#err-name'),   validate: validateName   },
    email:   { el: $('#res-email'),  err: $('#err-email'),  validate: validateEmail  },
    phone:   { el: $('#res-phone'),  err: $('#err-phone'),  validate: validatePhone  },
    guests:  { el: $('#res-guests'), err: $('#err-guests'), validate: validateGuests },
    date:    { el: $('#res-date'),   err: $('#err-date'),   validate: validateDate   },
    time:    { el: $('#res-time'),   err: $('#err-time'),   validate: validateTime   },
  };

  /* Real-time validation on blur */
  Object.values(fields).forEach(({ el, err, validate }) => {
    if (!el) return;
    el.addEventListener('blur', () => {
      const error = validate(el.value.trim());
      showFieldError(el, err, error);
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const error = validate(el.value.trim());
        showFieldError(el, err, error);
      }
    });
  });

  /* Form submission */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    Object.values(fields).forEach(({ el, err, validate }) => {
      if (!el) return;
      const error = validate(el.value.trim());
      showFieldError(el, err, error);
      if (error) isValid = false;
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Success — show premium success message
    showReservationSuccess(form, success);
  });
}

/* Show/hide field errors */
function showFieldError(el, errEl, message) {
  if (!el || !errEl) return;
  if (message) {
    errEl.textContent = message;
    el.classList.add('error');
  } else {
    errEl.textContent = '';
    el.classList.remove('error');
  }
}

/* Show success state */
function showReservationSuccess(form, success) {
  form.style.opacity = '0';
  form.style.transform = 'translateY(20px)';
  form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  setTimeout(() => {
    form.hidden = true;
    form.style.opacity = '';
    form.style.transform = '';
    success.hidden = false;
    success.style.opacity = '0';
    setTimeout(() => {
      success.style.opacity = '1';
      success.style.transition = 'opacity 0.5s ease';
    }, 20);
  }, 420);
}

/* Validators */
function validateName(value) {
  if (!value) return 'Full name is required.';
  if (value.length < 2) return 'Name must be at least 2 characters.';
  if (!/^[a-zA-Z\s\-']+$/.test(value)) return 'Please enter a valid name.';
  return '';
}

function validateEmail(value) {
  if (!value) return 'Email address is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Please enter a valid email address.';
  return '';
}

function validatePhone(value) {
  if (!value) return 'Phone number is required.';
  const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
  if (!phoneRegex.test(value)) return 'Please enter a valid phone number.';
  return '';
}

function validateGuests(value) {
  if (!value) return 'Please select number of guests.';
  return '';
}

function validateDate(value) {
  if (!value) return 'Please select a reservation date.';
  const selected = new Date(value);
  const today    = new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) return 'Date cannot be in the past.';
  return '';
}

function validateTime(value) {
  if (!value) return 'Please select a reservation time.';
  return '';
}

/* Set minimum reservation date to today */
function setMinReservationDate() {
  const dateInput = $('#res-date');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}


/* --------------------------------------------------
   8. NEWSLETTER FORM
-------------------------------------------------- */
function initNewsletterForm() {
  const form = $('#newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = $('#newsletter-email');
    const btn = $('#newsletter-btn');
    if (!emailInput || !btn) return;

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      emailInput.style.borderColor = '#e05c5c';
      emailInput.style.boxShadow = '0 0 0 3px rgba(224, 92, 92, 0.1)';
      return;
    }

    // Success state
    const originalText = btn.textContent;
    btn.textContent = '✓ Subscribed!';
    btn.style.opacity = '0.8';
    btn.disabled = true;
    emailInput.value = '';
    emailInput.style.borderColor = '';
    emailInput.style.boxShadow = '';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.opacity = '';
      btn.disabled = false;
    }, 3500);
  });
}


/* --------------------------------------------------
   9. BACK TO TOP BUTTON
-------------------------------------------------- */
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* --------------------------------------------------
   10. SMOOTH SCROLL for Anchor Links
-------------------------------------------------- */
function initSmoothScroll() {
  // Already handled by CSS scroll-behavior: smooth
  // But we add offset correction for fixed header
  const HEADER_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* --------------------------------------------------
   11. ACTIVE NAV LINK HIGHLIGHT on Scroll
-------------------------------------------------- */
function initActiveNavHighlight() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const HEADER_OFFSET = 100;

  const onScroll = () => {
    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - HEADER_OFFSET;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentSection) {
        link.style.color = 'var(--clr-gold)';
      } else {
        link.style.color = '';
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initialize on page load
}


/* --------------------------------------------------
   12. PARALLAX EFFECT on Scroll (subtle, performant)
-------------------------------------------------- */
(function initParallax() {
  const parallaxSections = $$('.parallax-section');
  if (!parallaxSections.length) return;

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const onScroll = () => {
    parallaxSections.forEach((section) => {
      const rect   = section.getBoundingClientRect();
      const middle = window.innerHeight / 2;
      const offset = (rect.top - middle) * 0.2;
      section.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* --------------------------------------------------
   13. HEADER HERO PARALLAX — Hero bg subtle movement
-------------------------------------------------- */
(function initHeroParallax() {
  const hero = $('#home');
  if (!hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const onScroll = () => {
    if (window.scrollY > window.innerHeight) return;
    const offset = window.scrollY * 0.35;
    hero.style.backgroundPositionY = `calc(center + ${offset}px)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* --------------------------------------------------
   14. MENU CARD — Tilt micro-interaction (3D hover)
-------------------------------------------------- */
(function initCardTilt() {
  const cards = $$('.menu-card');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Only on devices that support hover (not touch)
  if (window.matchMedia('(hover: none)').matches) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) *  6;

      card.style.transform = `translateY(-10px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
})();


/* --------------------------------------------------
   15. FOOTER — Gold divider decorative line animation
-------------------------------------------------- */
(function initFooterReveal() {
  const footer = $('#footer');
  if (!footer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.style.borderTopColor = 'rgba(201, 164, 92, 0.35)';
          observer.unobserve(footer);
        }
      });
    },
    { threshold: 0.05 }
  );

  observer.observe(footer);
})();


/* --------------------------------------------------
   16. HEADER CTA — Pulse highlight when visible in viewport
-------------------------------------------------- */
(function initCtaPulse() {
  const cta = $('#header-cta');
  if (!cta) return;

  // Subtle glow pulse after 3s on page load
  setTimeout(() => {
    cta.style.boxShadow = '0 0 0 5px rgba(201, 164, 92, 0.3), 0 4px 20px rgba(201, 164, 92, 0.3)';
    setTimeout(() => {
      cta.style.boxShadow = '';
      cta.style.transition = 'box-shadow 0.8s ease';
    }, 800);
  }, 3000);
})();


/* --------------------------------------------------
   17. PAGE LOAD — Preloader fade-out effect
-------------------------------------------------- */
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  // Fallback if load event doesn't fire promptly
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 800);
})();


/* --------------------------------------------------
   18. CONSOLE SIGNATURE
-------------------------------------------------- */
console.log(
  '%c✦ The Velvet Fork %c\nPremium Fine Dining | New York\nCrafted with passion.',
  'color: #C9A45C; font-family: Georgia, serif; font-size: 16px; font-weight: bold;',
  'color: #B7B7B7; font-size: 11px; font-family: monospace;'
);
