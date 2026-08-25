/**
 * ALAN BIJU — EXECUTIVE CEO PORTFOLIO SCRIPT
 * Clean Architecture: Dynamic Mobile Drawer, ScrollSpy, Floating Actions, Audio Player & Forms
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initNavigation();
  initMobileMenu();
  initFloatingPill();
  initPodcastPlayer();
  initContactForm();
  initCopyEmail();
});

/* ==================== 1. NAVIGATION & SCROLLSPY ==================== */
function initNavigation() {
  const header = document.getElementById('main-header');
  const navItems = document.querySelectorAll('.nav-item');
  const mobileItems = document.querySelectorAll('.mobile-item');
  const sections = document.querySelectorAll('section[id]');
  const floatingPill = document.getElementById('mobile-floating-pill');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header sticky styling
    if (header) {
      header.classList.toggle('scrolled', scrollY > 20);
    }

    // Floating pill visibility on mobile
    if (floatingPill) {
      if (scrollY > 320) {
        floatingPill.classList.add('visible');
      } else {
        floatingPill.classList.remove('visible');
      }
    }

    // ScrollSpy active state
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });

      mobileItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* ==================== 2. MOBILE NAVIGATION DRAWER ==================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const nav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const links = document.querySelectorAll('.mobile-item, .mobile-drawer-cta');

  if (!menuBtn || !nav) return;

  function openMenu() {
    nav.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.classList.add('menu-locked');
  }

  function closeMenu() {
    nav.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.classList.remove('menu-locked');
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==================== 3. FLOATING ACTION PILL ==================== */
function initFloatingPill() {
  const scrollTopBtn = document.getElementById('floating-scroll-top');
  if (!scrollTopBtn) return;

  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==================== 4. PODCAST AUDIO SNIPPET ==================== */
function initPodcastPlayer() {
  const playBtn = document.getElementById('pod-play-btn');
  const playIcon = document.getElementById('pod-play-icon');
  const progressBar = document.getElementById('pod-bar-progress');
  const timeText = document.getElementById('pod-time-text');

  if (!playBtn) return;

  let playing = false;
  let progress = 25;
  let timer = null;

  playBtn.addEventListener('click', () => {
    playing = !playing;
    if (playing) {
      showToast('Playing AlanPod Space audio snippet...');
      if (playIcon) {
        playIcon.setAttribute('data-lucide', 'pause');
        if (window.lucide) window.lucide.createIcons();
      }
      timer = setInterval(() => {
        progress += 1;
        if (progress > 100) progress = 0;
        if (progressBar) progressBar.style.width = progress + '%';

        const totalSecs = 210;
        const current = Math.floor((progress / 100) * totalSecs);
        const m = Math.floor(current / 60);
        const s = current % 60;
        if (timeText) timeText.innerText = `${m}:${s < 10 ? '0' : ''}${s} / 3:30`;
      }, 400);
    } else {
      clearInterval(timer);
      if (playIcon) {
        playIcon.setAttribute('data-lucide', 'play');
        if (window.lucide) window.lucide.createIcons();
      }
    }
  });
}

/* ==================== 5. EXECUTIVE CONTACT FORM ==================== */
function initContactForm() {
  const form = document.getElementById('ceo-inquiry-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value;
    if (submitBtn) {
      submitBtn.innerHTML = `<span>Submitting...</span>`;
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (status) {
        status.className = 'form-status success';
        status.innerHTML = `✓ Thank you, <b>${name}</b>. Your inquiry has been routed to Alan's office. You will receive a direct reply within 24-48 hours.`;
      }
      showToast('Inquiry submitted successfully.');
      form.reset();

      if (submitBtn) {
        submitBtn.innerHTML = `<span>Submit Strategic Inquiry</span> <i data-lucide="send"></i>`;
        submitBtn.disabled = false;
        if (window.lucide) window.lucide.createIcons();
      }
    }, 1000);
  });
}

/* ==================== 6. FAST COPY EMAIL ==================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'alanbiju255@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    }).catch(() => {
      showToast(email);
    });
  });
}

/* ==================== 7. TOAST NOTIFICATION ==================== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<span style="color:var(--gold-light);">✓</span> ${msg}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}
