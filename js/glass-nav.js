/**
 * AMCOB Glass Navigation Script
 * Manages masthead scroll elevation, dropdown panel toggling, keyboard accessibility, and mobile drawer.
 */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlassNav);
  } else {
    initGlassNav();
  }

  function initGlassNav() {
    const header = document.querySelector('.site-header');
    const dropdownWrappers = document.querySelectorAll('.nav-dropdown-wrapper');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');

    // 1. Scroll elevation effect
    function handleScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Dropdown management (Click & Keyboard)
    dropdownWrappers.forEach((wrapper) => {
      const btn = wrapper.querySelector('.nav-trigger-btn');
      const panel = wrapper.querySelector('.glass-dropdown-panel');

      if (!btn || !panel) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = panel.classList.contains('open');

        // Close any other open panels first
        closeAllDropdowns();

        if (!isOpen) {
          openDropdown(btn, panel);
        }
      });

      // Hover support with intent delay
      let hoverTimeout;
      wrapper.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          closeAllDropdowns(panel);
          openDropdown(btn, panel);
        }, 80);
      });

      wrapper.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          closeDropdown(btn, panel);
        }, 120);
      });

      // Escape key closes open dropdown and returns focus to button
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDropdown(btn, panel);
          btn.focus();
        }
      });
    });

    function openDropdown(btn, panel) {
      panel.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown(btn, panel) {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function closeAllDropdowns(exceptPanel = null) {
      dropdownWrappers.forEach((w) => {
        const b = w.querySelector('.nav-trigger-btn');
        const p = w.querySelector('.glass-dropdown-panel');
        if (p && p !== exceptPanel) {
          closeDropdown(b, p);
        }
      });
    }

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown-wrapper')) {
        closeAllDropdowns();
      }
    });

    // 3. Mobile Drawer Toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
          closeMobileDrawer();
        } else {
          openMobileDrawer();
        }
      });

      function openMobileDrawer() {
        mobileDrawer.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

      function closeMobileDrawer() {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
          closeMobileDrawer();
          mobileToggle.focus();
        }
      });
    }
  }
})();
