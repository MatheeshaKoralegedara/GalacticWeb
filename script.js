document.addEventListener('DOMContentLoaded', () => {
  // Scroll-reveal for [data-reveal] elements
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  // Menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('active');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
    });
  }

  // Close nav when link clicked (mobile)
  document.querySelectorAll('#mainNav a').forEach(a => a.addEventListener('click', () => {
    mainNav.classList.remove('active');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  // Active nav link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`#mainNav .nav-link[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(n => n.classList.remove('active'));
        link && link.classList.add('active');
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => observer.observe(s));

  // Contact form (mailto fallback)
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formOk = document.getElementById('formOk');

  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cname').value.trim();
    const email = document.getElementById('cemail').value.trim();
    const msg = document.getElementById('cmsg').value.trim();
    if (!name || !email || !msg) { alert('Please complete all fields.'); return; }
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rx.test(email)) { alert('Please enter a valid email.'); return; }

    form.style.display = 'none';
    if (formSuccess) formSuccess.hidden = false;

    const subject = encodeURIComponent(`GalacticWeb Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
    const mailto = `mailto:matheeshask7@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => { window.location.href = mailto; }, 700);
  });

  if (formOk) formOk.addEventListener('click', () => {
    const f = document.getElementById('contactForm');
    f && (f.style.display = '');
    if (formSuccess) formSuccess.hidden = true;
    document.getElementById('cname').value = '';
    document.getElementById('cemail').value = '';
    document.getElementById('cmsg').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // year
  const yearEl = document.getElementById('year');
  yearEl && (yearEl.textContent = new Date().getFullYear());
});
