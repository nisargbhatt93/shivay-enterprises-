// ============================================
//  SHIVAY ENTERPRISE — LANDING PAGE SCRIPT
// ============================================

/* ---- NAVBAR SCROLL EFFECT ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- MOBILE HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ---- REVEAL ON SCROLL ---- */
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---- METRIC BARS ANIMATION ---- */
function setupMetricBars() {
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.metric-fill').forEach(bar => {
          bar.classList.add('animated');
        });
        metricObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const metricsCard = document.querySelector('.metrics-card');
  if (metricsCard) metricObserver.observe(metricsCard);
}

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
function setupActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
}

/* ---- SAVE CONTACT (vCard) ---- */
function saveContact() {
  const btn = document.getElementById('save-vcf-btn');

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Priyanka Vaghela
N:Vaghela;Priyanka;;;
ORG:Shivay Enterprise
TITLE:Marketing Head
TEL;TYPE=CELL,VOICE:+917041797059
TEL;TYPE=WORK,VOICE:+919316329983
EMAIL;TYPE=WORK:shivayenterprises825@gmail.com
NOTE:Services: Digital Marketing, Website Development, App Development, SEO, Social Media, Branding
URL:https://shivayenterprise.in
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Priyanka_Vaghela_ShivayEnterprise.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Visual feedback
  const orig = btn.innerHTML;
  btn.style.background = 'linear-gradient(135deg, #25D366, #1ba356)';
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20"><polyline points="20 6 9 17 4 12"/></svg> Saved!`;

  setTimeout(() => {
    btn.style.background = '';
    btn.innerHTML = orig;
  }, 3000);
}

/* ---- CONTACT FORM SUBMIT ---- */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  // Build mailto link
  const subject = encodeURIComponent(`New Enquiry from ${name} — Shivay Enterprise`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`
  );

  btn.classList.add('sending');
  btn.textContent = 'Opening email...';

  window.location.href = `mailto:shivayenterprises825@gmail.com?subject=${subject}&body=${body}`;

  setTimeout(() => {
    btn.classList.remove('sending');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
        <polyline points="20 6 9 17 4 12"/>
      </svg> Message Sent!`;
    btn.style.background = 'linear-gradient(135deg, #25D366, #1ba356)';

    setTimeout(() => {
      btn.style.background = '';
      btn.innerHTML = `Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      document.getElementById('contact-form').reset();
    }, 3000);
  }, 1500);
}

/* ---- RIPPLE EFFECT ON BUTTONS ---- */
function addRipples() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `
        position:absolute; width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,0.15); border-radius:50%;
        transform:scale(0); animation:ripple 0.6s linear; pointer-events:none;
      `;
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });
}

// Inject ripple keyframes
const s = document.createElement('style');
s.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(s);

/* ---- COUNTER ANIMATION FOR HERO STATS ---- */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const text = counter.textContent;
    counter.style.opacity = '0';
    counter.style.transform = 'translateY(10px)';
    counter.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    setTimeout(() => {
      counter.style.opacity = '1';
      counter.style.transform = 'translateY(0)';
    }, 800 + Math.random() * 400);
  });
}

/* ---- SMOOTH PARALLAX ON HERO ORBS ---- */
function setupParallax() {
  const orbs = document.querySelectorAll('.hero-orb');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orbs.forEach((orb, i) => {
      orb.style.transform = `translateY(${y * (0.08 + i * 0.04)}px)`;
    });
  }, { passive: true });
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  setupReveal();
  setupMetricBars();
  setupActiveNav();
  addRipples();
  animateCounters();
  setupParallax();
});
