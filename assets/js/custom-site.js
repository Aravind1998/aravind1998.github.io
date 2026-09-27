/* ===================================================================
   ARAVIND SURESH — PERSONAL PORTFOLIO
   Theme Switcher, Project Filter, & Interactivity
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initMobileNav();
  initScrollSpy();
  initProjectFilters();
  initCopyEmail();
  initContactForm();
});

/* --- Theme Engine --- */
function initThemeEngine() {
  const themeBtn = document.getElementById('theme-picker-btn');
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeOptions = document.querySelectorAll('.theme-option');
  const currentThemeLabel = document.getElementById('current-theme-label');

  const themes = {
    midnight: { name: 'Midnight', icon: 'fa-moon' },
    cyber: { name: 'Cyberpunk', icon: 'fa-bolt' },
    nord: { name: 'Nord Frost', icon: 'fa-snowflake' },
    light: { name: 'Minimal Light', icon: 'fa-sun' }
  };

  // Get saved or default theme
  const savedTheme = localStorage.getItem('as-portfolio-theme') || 'midnight';
  applyTheme(savedTheme);

  // Toggle Dropdown
  if (themeBtn && themeDropdown) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!themeDropdown.contains(e.target) && !themeBtn.contains(e.target)) {
        themeDropdown.classList.remove('show');
      }
    });
  }

  // Theme option selection
  themeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const selected = option.getAttribute('data-set-theme');
      applyTheme(selected);
      if (themeDropdown) themeDropdown.classList.remove('show');
    });
  });

  function applyTheme(themeKey) {
    if (!themes[themeKey]) themeKey = 'midnight';
    
    if (themeKey === 'midnight') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeKey);
    }

    localStorage.setItem('as-portfolio-theme', themeKey);

    // Update active class in options
    themeOptions.forEach((opt) => {
      if (opt.getAttribute('data-set-theme') === themeKey) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Update button label
    if (currentThemeLabel) {
      currentThemeLabel.textContent = themes[themeKey].name;
    }
  }
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinksList = document.querySelectorAll('.nav-link');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('mobile-open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking link
    navLinksList.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
}

/* --- ScrollSpy Navigation --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --- Project Filters --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Copy Email Toast --- */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast-notification');
  const email = 'aravindsuresh98@gmail.com';

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        // Fallback
        const temp = document.createElement('input');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast('Email copied to clipboard!');
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    const msgSpan = toast.querySelector('.toast-text') || toast;
    msgSpan.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

/* --- Contact Form --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name-input')?.value || '';
    const email = document.getElementById('email-input')?.value || '';
    const message = document.getElementById('msg-input')?.value || '';

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
    
    // Open user's default email client
    window.location.href = `mailto:aravindsuresh98@gmail.com?subject=${subject}&body=${body}`;
  });
}
