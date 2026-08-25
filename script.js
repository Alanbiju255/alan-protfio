/**
 * ALAN BIJU — EXECUTIVE CEO PORTFOLIO SCRIPT
 * Clean Professional Architecture: Navigation, Audio Player, Clipboard & Form Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initHeaderScroll();
  initMobileMenu();
  initPodcastPlayer();
  initContactForm();
  initCopyEmail();
});

/* ==================== 1. HEADER SCROLL & NAV ACTIVE ==================== */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }

    // ScrollSpy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
}

/* ==================== 2. MOBILE NAVIGATION ==================== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('mobile-nav');
  const links = document.querySelectorAll('.mobile-item');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

/* ==================== 3. PODCAST AUDIO SNIPPET ==================== */
function initPodcastPlayer() {
  const playBtn = document.getElementById('pod-play-btn');
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
    }
  });
}

/* ==================== 4. EXECUTIVE CONTACT FORM ==================== */
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

/* ==================== 5. FAST COPY EMAIL ==================== */
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

/* ==================== 6. TOAST NOTIFICATION ==================== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<span style="color:var(--gold-light);">✓</span> ${msg}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}
