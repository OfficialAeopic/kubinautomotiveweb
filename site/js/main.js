/* Kubin Automotive Service - main.js v3.1.0
   v3.1.0: Contact form mailto: bridge fallback. When /api/contact fails
           (Resend not yet configured), open user's mail client with prefilled
           payload to Kubin.Automotive@yahoo.com. UI shows success either way.
   v3.0.0: Replaced mobile slide-out with full-screen mobile overlay menu.
           Added services accordion for mobile overlay. Active link detection
           updated for directory-based clean URLs.
   v2.0.0: Added service tab switcher + scroll reveal from prospect mockup.
           Nav hide/show, mobile toggle, active link detection preserved.
           Contact form submit handler preserved (wired to /api/contact).
*/

(function () {
  'use strict';

  /* ========================
     Auto-hiding nav on scroll
  ======================== */
  const header = document.querySelector('.site-header');
  let lastY = 0;
  let ticking = false;

  function handleScroll() {
    const y = window.scrollY;

    if (y > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (y > lastY && y > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ========================
     Mobile overlay menu
  ======================== */
  const navToggle     = document.querySelector('.nav-toggle');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose   = document.getElementById('mobileOverlayClose');

  function openOverlay() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.add('active');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    if (navToggle) {
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.remove('active');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    if (navToggle) {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (navToggle && mobileOverlay) {
    navToggle.addEventListener('click', function () {
      if (mobileOverlay.classList.contains('active')) {
        closeOverlay();
      } else {
        openOverlay();
      }
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', closeOverlay);
    }

    // Close when any overlay link is clicked
    mobileOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeOverlay);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
        closeOverlay();
      }
    });
  }

  /* ========================
     Mobile Services accordion
  ======================== */
  var mobDropdown       = document.querySelector('.mob-dropdown');
  var mobDropdownToggle = document.querySelector('.mob-dropdown-toggle');

  if (mobDropdown && mobDropdownToggle) {
    mobDropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      mobDropdown.classList.toggle('open');
    });
  }

  /* ========================
     Active nav link
  ======================== */
  var path = window.location.pathname;
  // Mark active on desktop nav links
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var normalHref = href.replace(/\/$/, '');
    var normalPath = path.replace(/\/$/, '');
    if (normalPath === normalHref || (normalHref !== '' && normalPath.startsWith(normalHref + '/'))) {
      link.classList.add('active');
    }
  });
  // Mark active on overlay links
  document.querySelectorAll('.mob-link, .mob-sub-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var normalHref = href.replace(/\/$/, '');
    var normalPath = path.replace(/\/$/, '');
    if (normalPath === normalHref || (normalHref !== '' && normalPath.startsWith(normalHref + '/'))) {
      link.classList.add('active');
    }
  });

  /* ========================
     Service Tab System
  ======================== */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length && tabPanels.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-tab');

        // Deactivate all
        tabBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        tabPanels.forEach(function (panel) {
          panel.classList.remove('active');
          panel.style.opacity = '0';
        });

        // Activate target
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const activePanel = document.getElementById('tab-' + target);
        if (activePanel) {
          activePanel.classList.add('active');
          // Two rAF so display:block renders before opacity transition
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              activePanel.style.opacity = '1';
            });
          });
        }
      });
    });

    // Ensure first panel is visible on load
    const firstPanel = document.querySelector('.tab-panel.active');
    if (firstPanel) {
      firstPanel.style.opacity = '1';
    }
  }

  /* ========================
     Scroll Reveal
  ======================== */
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal="left"], [data-reveal="right"]');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger siblings in the same parent
            const siblings = Array.from(
              entry.target.parentElement.querySelectorAll('[data-reveal], [data-reveal="left"], [data-reveal="right"]')
            );
            const index = siblings.indexOf(entry.target);
            const delay = index * 80;
            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ========================
     Contact form handler
     (DO NOT MODIFY — wired to /api/contact Resend backend)
  ======================== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('.form-submit');
    const statusEl = document.getElementById('form-status');

    function showStatus(type, message) {
      if (!statusEl) return;
      const icon = type === 'success' ? '&#10003;' : '&#9888;';
      statusEl.className = 'form-status ' + type;
      statusEl.innerHTML = '<span class="form-status-icon">' + icon + '</span><span>' + message + '</span>';
      statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function clearErrors() {
      contactForm.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
      });
    }

    function validateField(input) {
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.classList.add('error');
        return false;
      }
      if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.classList.add('error');
        return false;
      }
      return true;
    }

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearErrors();

      const fields = ['name', 'email', 'phone', 'vehicle', 'service'];
      let valid = true;

      fields.forEach(function (id) {
        const el = document.getElementById(id);
        if (el && !validateField(el)) valid = false;
      });

      if (!valid) {
        showStatus('error', 'Please fill in all required fields.');
        return;
      }

      const payload = {
        name:    document.getElementById('name').value.trim(),
        email:   document.getElementById('email').value.trim(),
        phone:   document.getElementById('phone').value.trim(),
        vehicle: document.getElementById('vehicle').value.trim(),
        service: document.getElementById('service').value,
        date:    (document.getElementById('pref-date') || {}).value || '',
        message: (document.getElementById('message') || {}).value.trim() || '',
        website: (document.getElementById('website') || {}).value || ''
      };

      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending...';

      // Bridge fallback: when /api/contact fails (Resend domain not yet
      // verified, env var missing, or network down), build a mailto: link
      // with the prefilled payload so the lead is not lost. The user's
      // mail client opens with a draft to Kubin.Automotive@yahoo.com.
      // Once RESEND_API_KEY + domain verification are live in Vercel,
      // this fallback becomes dead code that never triggers.
      function openMailtoFallback() {
        var subject = encodeURIComponent('Appointment Request from ' + payload.name);
        var lines = [
          'Name: ' + payload.name,
          'Email: ' + payload.email,
          'Phone: ' + payload.phone,
          'Vehicle: ' + payload.vehicle,
          'Service: ' + payload.service,
          'Preferred date: ' + payload.date,
          'Message: ' + payload.message
        ];
        var body = encodeURIComponent(lines.join('\n'));
        window.location.href = 'mailto:Kubin.Automotive@yahoo.com?subject=' + subject + '&body=' + body;
      }

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
          contactForm.reset();
          showStatus('success', 'Thanks, we will reach out within 1 business day.');
        } else {
          openMailtoFallback();
          contactForm.reset();
          showStatus('success', 'Thanks, your email client just opened with the request. Send it to confirm, or call (979) 779-7484.');
          console.warn('contact API returned non-success, used mailto fallback', data);
        }
      } catch (err) {
        openMailtoFallback();
        contactForm.reset();
        showStatus('success', 'Thanks, your email client just opened with the request. Send it to confirm, or call (979) 779-7484.');
        console.warn('contact API errored, used mailto fallback', err);
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Request Appointment';
      }
    });

    // Live validation clear on input
    contactForm.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        this.classList.remove('error');
      });
    });
  }

})();
