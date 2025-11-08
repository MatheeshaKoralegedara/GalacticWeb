document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ duration: 700, once: true });

  // Menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle && menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // Close nav when link clicked (mobile)
  document.querySelectorAll('#mainNav a').forEach(a => a.addEventListener('click', () => {
    mainNav.classList.remove('active');
    menuToggle.classList.remove('open');
  }));

  // Logo click scroll to top
  const logoImg = document.querySelector('.logo img');
  logoImg && logoImg.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  });

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

  // Counters
  const counters = document.querySelectorAll('.counter');
  function runCounter(el){
    const target = +el.dataset.target;
    const duration = 1200;
    let start = 0;
    const step = Math.max(1, Math.floor(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target; clearInterval(timer); }
      else el.textContent = start;
    }, 16);
  }
  const heroCard = document.querySelector('.card-inner');
  if (heroCard) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.counter').forEach(runCounter);
          cObs.unobserve(heroCard);
        }
      });
    }, { threshold: 0.2 });
    cObs.observe(heroCard);
  }

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
    const mailto = `mailto:galacticweb.dev@gmail.com?subject=${subject}&body=${body}`;

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
