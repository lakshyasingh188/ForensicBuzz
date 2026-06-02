// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Intersection Observer for scroll animations
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.feature-card, .category-card, .testimonial-card, .faq-item, .timeline-item, .stat-card, .plan-card'
  );
  elements.forEach(el => observer.observe(el));
}

// ===========================
// ANIMATED COUNTER
// ===========================

/**
 * Animate counter numbers on scroll
 */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target.toLocaleString();
            entry.target.classList.add('counted');
          }
        };

        updateCounter();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// ===========================
// MOBILE MENU TOGGLE
// ===========================

/**
 * Handle mobile hamburger menu
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ===========================
// SMOOTH SCROLL
// ===========================

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===========================
// STICKY NAVBAR
// ===========================

/**
 * Handle sticky navbar styling on scroll
 */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 231, 255, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// ===========================
// FAQ ACCORDION
// ===========================

/**
 * Initialize FAQ accordion functionality
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

// ===========================
// BUTTON INTERACTIONS
// ===========================

/**
 * Add button click effects
 */
function initButtonInteractions() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      // Remove existing ripple if any
      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// ===========================
// NAVBAR ACTIVE LINK
// ===========================

/**
 * Highlight active navigation link based on scroll position
 */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// ===========================
// PARALLAX EFFECT
// ===========================

/**
 * Add parallax effect to hero section
 */
function initParallax() {
  const heroVisual = document.querySelector('.hero-visual');

  if (!heroVisual) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const heroRect = heroSection.getBoundingClientRect();

    if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
      heroVisual.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
  });
}

// ===========================
// FORM VALIDATION
// ===========================

/**
 * Handle button actions (placeholder for actual form submission)
 */
function initButtonActions() {
  // Get Started button
  const getStartedButtons = document.querySelectorAll('.btn-primary');

  getStartedButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      // Check if it's a "Get Started" or "Start Learning" button
      if (this.textContent.includes('Get Started') || this.textContent.includes('Start Learning')) {
        e.preventDefault();
        showNotification('Redirecting to registration...', 'info');
        // In production, this would redirect to signup page
        setTimeout(() => {
          console.log('Would redirect to signup page');
        }, 1000);
      }
    });
  });

  // Plan selection buttons
  const planButtons = document.querySelectorAll('.plan-card .btn');

  planButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const planCard = this.closest('.plan-card');
      const planName = planCard.querySelector('h3').textContent;
      showNotification(`Selected: ${planName}`, 'success');
    });
  });

  // Mock test view button
  const mockTestButton = document.querySelector('.dashboard-card .btn');
  if (mockTestButton) {
    mockTestButton.addEventListener('click', function (e) {
      e.preventDefault();
      showNotification('Opening mock test details...', 'info');
    });
  }
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================

/**
 * Handle keyboard navigation for accessibility
 */
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
      const navMenu = document.querySelector('.nav-menu');
      const hamburger = document.querySelector('.hamburger');
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    }

    // Tab key for FAQ navigation
    if (e.key === 'Tab') {
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('keydown', (ke) => {
          if (ke.key === 'Enter' || ke.key === ' ') {
            ke.preventDefault();
            item.classList.toggle('active');
          }
        });
      });
    }
  });
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

/**
 * Debounce function for scroll events
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===========================
// INITIALIZATION
// ===========================

/**
 * Initialize all features when DOM is ready
 */
function initializeApp() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
    return;
  }

  // Initialize all features
  initScrollAnimations();
  animateCounters();
  initMobileMenu();
  initSmoothScroll();
  initStickyNavbar();
  initFAQAccordion();
  initButtonInteractions();
  initActiveNavLink();
  initParallax();
  initButtonActions();
  initKeyboardNavigation();

  console.log('ForensicBuzz website initialized successfully');
}

// Start initialization
initializeApp();

// ===========================
// RESPONSIVE ADJUSTMENTS
// ===========================

/**
 * Handle responsive behavior
 */
window.addEventListener('resize', debounce(() => {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');

  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
  }
}, 250));

// ===========================
// ANALYTICS & TRACKING
// ===========================

/**
 * Track user interactions (placeholder for analytics)
 */
function trackEvent(eventName, eventData = {}) {
  console.log(`Event: ${eventName}`, eventData);
  // In production, send to analytics service like Google Analytics
}

// Track button clicks
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    trackEvent('button_click', {
      buttonText: e.target.textContent,
      buttonClass: e.target.className
    });
  }
});

// Track section views
window.addEventListener('scroll', debounce(() => {
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      trackEvent('section_view', {
        sectionId: section.id
      });
    }
  });
}, 1000));

// ===========================
// ADDITIONAL STYLES FOR JS
// ===========================

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(2, 6, 23, 0.95);
        backdrop-filter: blur(10px);
        padding: 2rem;
        gap: 1rem;
        border-bottom: 1px solid rgba(0, 231, 255, 0.1);
    }

    .nav-link.active::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }

        .nav-menu.active {
            display: flex;
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
