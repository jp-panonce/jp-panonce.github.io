/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Site theme (light/dark) toggle with persistence.
   */
  const themeKey = 'jp-theme-preference';

  function readSavedTheme() {
    try {
      return localStorage.getItem(themeKey);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(themeKey, theme);
    } catch (error) {
      // Ignore storage errors (private mode or disabled storage).
    }
  }

  function getPreferredTheme() {
    const savedTheme = readSavedTheme();
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }

  function updateThemeToggleButtons() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const icon = button.querySelector('i');
      if (icon) {
        icon.classList.remove('bi-moon-stars', 'bi-sun');
        icon.classList.add(isDark ? 'bi-sun' : 'bi-moon-stars');
      }

      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function ensureThemeToggleButton() {
    if (document.querySelector('[data-theme-toggle]')) {
      return;
    }

    const header = document.querySelector('#header');
    if (!header) {
      return;
    }

    let socialLinks = header.querySelector('.social-links');
    if (!socialLinks) {
      socialLinks = document.createElement('div');
      socialLinks.className = 'social-links text-center';
      header.appendChild(socialLinks);
    }

    const button = document.createElement('a');
    button.href = '#';
    button.className = 'theme-toggle';
    button.setAttribute('data-theme-toggle', '');
    button.innerHTML = '<i class="bi bi-moon-stars"></i>';
    socialLinks.prepend(button);
  }

  function initThemeToggle() {
    setTheme(getPreferredTheme());
    ensureThemeToggleButton();
    updateThemeToggleButtons();

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const nextTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        saveTheme(nextTheme);
        updateThemeToggleButtons();
      });
    });
  }

  initThemeToggle();

  /**
   * Homepage hero snap scrolling.
   */
  function initHeroSnapScroll() {
    if (!document.body.classList.contains('hero-snap-scroll')) {
      return;
    }

    const heroSection = document.querySelector('main .hero');
    if (!heroSection) {
      return;
    }

    const nextSection = heroSection.nextElementSibling;
    if (!nextSection) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isAnimating = false;
    let touchStartY = null;

    function snapTo(targetTop) {
      if (isAnimating) {
        return;
      }

      isAnimating = true;
      document.body.classList.add('hero-transitioning');

      window.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      window.setTimeout(() => {
        isAnimating = false;
        document.body.classList.remove('hero-transitioning');
      }, prefersReducedMotion ? 80 : 850);
    }

    function getNextSectionTop() {
      return nextSection.getBoundingClientRect().top + window.scrollY;
    }

    function exitHero() {
      if (isAnimating) {
        return;
      }

      const nextSectionTop = getNextSectionTop();
      const isWithinHeroZone = window.scrollY < (nextSectionTop - 120);
      if (!isWithinHeroZone) {
        return;
      }

      snapTo(nextSectionTop);
    }

    function returnToHero() {
      if (isAnimating || window.scrollY <= 30) {
        return;
      }

      const nextSectionTop = getNextSectionTop();
      const isWithinSnapBackZone = window.scrollY <= (nextSectionTop + 140);
      if (!isWithinSnapBackZone) {
        return;
      }

      snapTo(0);
    }

    window.addEventListener('wheel', (event) => {
      if (event.deltaY > 8) {
        exitHero();
      } else if (event.deltaY < -8) {
        returnToHero();
      }
    }, {
      passive: true
    });

    window.addEventListener('touchstart', (event) => {
      touchStartY = event.changedTouches?.[0]?.clientY ?? null;
    }, {
      passive: true
    });

    window.addEventListener('touchend', (event) => {
      const touchEndY = event.changedTouches?.[0]?.clientY ?? null;
      if (touchStartY !== null && touchEndY !== null && (touchStartY - touchEndY) > 16) {
        exitHero();
      } else if (touchStartY !== null && touchEndY !== null && (touchEndY - touchStartY) > 16) {
        returnToHero();
      }
      touchStartY = null;
    }, {
      passive: true
    });

    window.addEventListener('keydown', (event) => {
      const isTyping = event.target instanceof HTMLElement &&
        (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable);

      if (isTyping) {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        exitHero();
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp' || event.key === 'Home') {
        returnToHero();
      }
    });
  }

  initHeroSnapScroll();

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  const header = document.querySelector('#header');

  function headerToggle() {
    if (!headerToggleBtn || !header) {
      return;
    }

    if (window.innerWidth >= 1200) {
      document.body.classList.toggle('desktop-nav-collapsed');
      return;
    }

    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200 && headerToggleBtn && header) {
      header.classList.remove('header-show');
      headerToggleBtn.classList.add('bi-list');
      headerToggleBtn.classList.remove('bi-x');
    }
  });

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 70,
      backSpeed: 30,
      backDelay: 400
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();