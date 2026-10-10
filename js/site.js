// AMCOB Digital Flagship - Client Runtime
// Accessible interactions, live search, and dynamic directory filtering

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navDesktop = document.querySelector('.nav-desktop');
  if (menuToggle && navDesktop) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      if (isExpanded) {
        navDesktop.style.display = 'none';
      } else {
        navDesktop.style.display = 'flex';
        navDesktop.style.flexDirection = 'column';
        navDesktop.style.position = 'absolute';
        navDesktop.style.top = '80px';
        navDesktop.style.left = '0';
        navDesktop.style.right = '0';
        navDesktop.style.background = '#ffffff';
        navDesktop.style.padding = '24px';
        navDesktop.style.borderBottom = '1px solid var(--border-light)';
        navDesktop.style.boxShadow = 'var(--shadow-lg)';
      }
    });
  }

  // 2. Directory Live Search & Filter
  const directorySearch = document.getElementById('directorySearch');
  const directoryCategory = document.getElementById('directoryCategory');
  const directoryCards = document.querySelectorAll('.business-card-item');

  function filterDirectory() {
    if (!directoryCards.length) return;
    const query = (directorySearch ? directorySearch.value.toLowerCase().trim() : '');
    const cat = (directoryCategory ? directoryCategory.value.toLowerCase().trim() : 'all');

    let visibleCount = 0;
    directoryCards.forEach(card => {
      const title = card.getAttribute('data-name')?.toLowerCase() || '';
      const cardCat = card.getAttribute('data-category')?.toLowerCase() || '';
      const desc = card.getAttribute('data-desc')?.toLowerCase() || '';

      const matchesQuery = !query || title.includes(query) || desc.includes(query);
      const matchesCat = (cat === 'all' || cardCat.includes(cat));

      if (matchesQuery && matchesCat) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const countEl = document.getElementById('directoryResultCount');
    if (countEl) {
      countEl.textContent = `Showing ${visibleCount} verified business${visibleCount === 1 ? '' : 'es'}`;
    }
  }

  if (directorySearch) directorySearch.addEventListener('input', filterDirectory);
  if (directoryCategory) directoryCategory.addEventListener('change', filterDirectory);

  window.filterBySector = function(sector) {
    if (!directoryCategory) return;
    for (let i = 0; i < directoryCategory.options.length; i++) {
      if (directoryCategory.options[i].value.toLowerCase().includes(sector.toLowerCase())) {
        directoryCategory.selectedIndex = i;
        break;
      }
    }
    if (directorySearch) directorySearch.value = '';
    filterDirectory();
    const target = document.getElementById('directoryContainer');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 3. Blog & Books Filter Pills
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const container = pill.closest('.filter-container');
      if (!container) return;
      container.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter')?.toLowerCase() || 'all';
      const items = container.querySelectorAll('.filterable-item');
      items.forEach(item => {
        const itemCat = item.getAttribute('data-category')?.toLowerCase() || '';
        if (filterVal === 'all' || itemCat.includes(filterVal)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Join Page Tier Selection
  const tierInputs = document.querySelectorAll('input[name="membership_tier"]');
  const selectedTierDisplay = document.getElementById('selectedTierSummary');
  if (tierInputs.length && selectedTierDisplay) {
    tierInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const tierName = e.target.getAttribute('data-name');
        const tierPrice = e.target.getAttribute('data-price');
        selectedTierDisplay.textContent = `Selected: ${tierName} (${tierPrice})`;
      });
    });
  }

  // 5. FAQ Accordion Toggle (Design System Component)
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-item');
      if (!item) return;
      const isActive = item.classList.contains('active');
      const parent = item.closest('.faq-accordion');
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      }
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 6. Recent Members Horizontal Carousel Slider
  const membersTrack = document.getElementById('recentMembersTrack');
  const prevMemberBtn = document.getElementById('recentMembersPrev');
  const nextMemberBtn = document.getElementById('recentMembersNext');

  if (membersTrack && prevMemberBtn && nextMemberBtn) {
    prevMemberBtn.addEventListener('click', () => {
      membersTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextMemberBtn.addEventListener('click', () => {
      membersTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
});
