(function () {
  /**
   * Minimal bootstrap for Home Page (screen 10:441).
   * - Preloads key images used by the screen to avoid flicker.
   * - Adds simple hover affordances to icon buttons if present.
   * - Exposes a PUBLIC_INTERFACE function initHomePage10441 to allow manual bootstrapping.
   */

  // PUBLIC_INTERFACE
  function initHomePage10441() {
    /** Initialize interactions and preloading for Home Page (10:441). */
    try {
      const root = document.getElementById('screen_home-page_10_441');
      if (!root) return;

      // Preload key images if not already cached
      const preloadSrcs = [
        // Root BG
        './figmaimages/figma_image_10_441.png',
        // Top grid images
        './figmaimages/figma_image_10_480.png',
        './figmaimages/figma_image_10_481.png',
        './figmaimages/figma_image_10_484.png',
        './figmaimages/figma_image_10_483.png',
        // Icons used
        './figmaimages/figma_image_17_183.svg',
        './figmaimages/figma_image_17_174.svg',
        './figmaimages/figma_image_10_479.svg',
        './figmaimages/figma_image_10_499.svg',
        './figmaimages/figma_image_10_501.svg',
        './figmaimages/figma_image_10_442_36_9156.svg',
        './figmaimages/figma_image_10_442_36_9157.svg',
        './figmaimages/figma_image_10_442_140_8816.svg',
        './figmaimages/figma_image_10_442_140_8802.svg',
      ];

      preloadSrcs.forEach((src) => {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.src = src;
      });

      // Add simple hover styles for interactive-looking elements
      const clickableSelectors = [
        '#el-17-181',          // hamburger
        '#el-10-478',          // search icon
        '#el-10-498',          // gps icon
        '#el-10-500',          // bell icon
        '#el-22-202 .arr-17-173',
        '#el-22-202 .arr-17-175',
        '#el-22-202 .arr-17-177',
        '#el-22-202 .arr-17-179',
        '#el-22-202 .arr-22-177',
        '#el-22-202 .arr-22-183',
        '#el-22-202 .arr-22-179',
        '#el-22-202 .arr-22-181',
      ];

      clickableSelectors.forEach((sel) => {
        root.querySelectorAll(sel).forEach((el) => {
          el.style.cursor = 'pointer';
          el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-1px)';
          });
          el.addEventListener('mouseleave', () => {
            el.style.transform = 'none';
          });
          // Non-functional click: just visual feedback
          el.addEventListener('click', () => {
            el.style.transition = 'opacity .15s ease';
            el.style.opacity = '0.8';
            setTimeout(() => { el.style.opacity = ''; }, 150);
          });
        });
      });

      // Upgrade "Search" placeholder area to focusable region for accessibility
      const searchBox = document.getElementById('el-10-474');
      if (searchBox) {
        searchBox.setAttribute('tabindex', '0');
        searchBox.setAttribute('role', 'searchbox');
        searchBox.setAttribute('aria-label', 'Search');
        searchBox.addEventListener('focus', () => {
          const bg = searchBox.querySelector('.bg');
          if (bg) bg.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.08)';
        });
        searchBox.addEventListener('blur', () => {
          const bg = searchBox.querySelector('.bg');
          if (bg) bg.style.boxShadow = 'none';
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('initHomePage10441 encountered an issue:', e);
    }
  }

  // Auto-init after DOM ready if the screen exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.getElementById('screen_home-page_10_441')) {
        initHomePage10441();
      }
    });
  } else {
    // DOM already loaded
    if (document.getElementById('screen_home-page_10_441')) {
      initHomePage10441();
    }
  }

  // Expose to global for explicit bootstrapping if needed
  window.initHomePage10441 = initHomePage10441;
})();
