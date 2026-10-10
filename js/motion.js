/**
 * AMCOB Coherent 2D Motion System Runtime
 * Native IntersectionObserver scroll triggers, coordinated featured switchers,
 * and accessible keyboard navigation without scroll hijacking or heavy loops.
 */

(function() {
  'use strict';

  // 1. Reduced Motion Check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Scroll-Triggered Reveal via IntersectionObserver
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.motion-reveal, .motion-stagger-parent');
    
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // 3. Coordinated Featured Content Slider (Explicit Manual Controls Only)
  function initFeaturedSliders() {
    const sliders = document.querySelectorAll('.featured-content-slider');

    sliders.forEach(slider => {
      const slides = slider.querySelectorAll('.featured-slide');
      const prevBtn = slider.querySelector('.featured-prev-btn');
      const nextBtn = slider.querySelector('.featured-next-btn');
      let currentIndex = 0;

      if (!slides.length) return;

      function updateSlide(newIndex) {
        slides[currentIndex].classList.remove('active');
        currentIndex = (newIndex + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
      }
    });
  }

  // 4. Quick FAQ Accordion Feedback
  function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close siblings in same accordion
        const parent = item.closest('.faq-accordion');
        if (parent) {
          parent.querySelectorAll('.faq-item').forEach(sibling => {
            if (sibling !== item) sibling.classList.remove('active');
          });
        }

        item.classList.toggle('active', !isActive);
      });
    });
  }

  // 5. Hero Perspective Switcher
  const perspectives = {
    summit: {
      src: '/assets/optimized/hero/amcob-summit-atrium.webp',
      alt: 'AMCOB Annual LEAD Summit Convening of Executives and Business Leaders',
      assembly: 'Annual LEAD Summit Executive Assembly',
      scope: 'North American Chapters and Bilateral Delegations'
    },
    boardroom: {
      src: '/assets/optimized/hero/amcob-executive-boardroom.webp',
      alt: 'AMCOB Peer Advisory Group Executive Boardroom Strategy Session',
      assembly: 'Peer Advisory Group (PAG) Strategy Forum',
      scope: 'Stage-Matched CEO Strategy and Ethical Governance'
    },
    gala: {
      src: '/assets/optimized/hero/amcob-annual-gala.webp',
      alt: 'AMCOB Annual Executive Gala and Keynote Assembly',
      assembly: 'AMCOB Annual Gala and Keynote Assembly',
      scope: '500+ Member Enterprises and Patron Leaders'
    }
  };

  window.setHeroPerspective = function(key) {
    const data = perspectives[key];
    if (!data) return;

    const img = document.getElementById('heroPhotoImg');
    const assemblyLabel = document.getElementById('captionAssembly');
    const scopeLabel = document.getElementById('captionScope');
    const pills = document.querySelectorAll('.perspective-pill');

    pills.forEach(pill => {
      if (pill.dataset.perspective === key) pill.classList.add('active');
      else pill.classList.remove('active');
    });

    if (img) {
      img.style.opacity = '0.3';
      setTimeout(() => {
        img.src = data.src;
        img.alt = data.alt;
        img.style.opacity = '1';
      }, 150);
    }

    if (assemblyLabel) assemblyLabel.textContent = data.assembly;
    if (scopeLabel) scopeLabel.textContent = data.scope;
  };

  // 6. Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveals();
      initFeaturedSliders();
      initFaqAccordions();
    });
  } else {
    initScrollReveals();
    initFeaturedSliders();
    initFaqAccordions();
  }
})();
