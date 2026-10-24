/**
 * BKM Technology Solutions — theme behaviour.
 *
 * No dependencies, no build step. Everything degrades gracefully: if this file
 * fails to load the page is still fully readable and navigable.
 */
(function () {
  'use strict';

  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Header */
  function initHeader() {
    var header = doc.querySelector('.site-header');
    if (!header) return;

    var bar = doc.querySelector('.scroll-progress-bar');

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);

      if (bar) {
        var max = doc.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        bar.style.width = pct * 100 + '%';
      }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------- Mobile menu */
  function initMobileMenu() {
    var sheet = doc.querySelector('.mobile-sheet');
    var toggle = doc.querySelector('.menu-toggle');
    if (!sheet || !toggle) return;

    var scrim = sheet.querySelector('.mobile-backdrop');

    function setOpen(open) {
      sheet.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      doc.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(!sheet.classList.contains('is-open'));
    });

    if (scrim) {
      scrim.addEventListener('click', function () {
        setOpen(false);
      });
    }

    sheet.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('click', function () {
        setOpen(false);
      });
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sheet.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------- Reveals */
  function initReveals() {
    var items = doc.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* --------------------------------------------------- Active nav section */
  function initActiveSection() {
    var links = doc.querySelectorAll('.nav-link[data-target]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sections = [];
    links.forEach(function (link) {
      var target = doc.getElementById(link.getAttribute('data-target'));
      if (target) sections.push({ link: link, target: target });
    });
    if (!sections.length) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          sections.forEach(function (pair) {
            var on = pair.target === entry.target;
            pair.link.classList.toggle('is-active', on);
            if (on) {
              pair.link.setAttribute('aria-current', 'true');
            } else {
              pair.link.removeAttribute('aria-current');
            }
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach(function (pair) {
      io.observe(pair.target);
    });
  }

  /* ---------------------------------------------- Smooth anchor scrolling */
  function initSmoothScroll() {
    doc.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-scroll], a[href^="#"]');
      if (!trigger) return;

      var id = trigger.getAttribute('data-scroll') || trigger.getAttribute('href');
      if (!id || id === '#') return;

      var target = doc.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      history.replaceState(null, '', id);
    });
  }

  /* -------------------------------------------------------- Back to top */
  function initBackToTop() {
    doc.querySelectorAll('[data-top]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ------------------------------------------------------ Pipeline hover */
  function initPipeline() {
    var list = doc.querySelector('.pipeline');
    if (!list) return;

    var items = list.querySelectorAll('li');
    items.forEach(function (li) {
      li.addEventListener('mouseenter', function () {
        items.forEach(function (o) {
          o.classList.remove('is-active');
        });
        li.classList.add('is-active');
      });
      li.addEventListener('focusin', function () {
        items.forEach(function (o) {
          o.classList.remove('is-active');
        });
        li.classList.add('is-active');
      });
    });
  }

  /* --------------------------------------------------- Privacy dialog */
  function initDialog() {
    var dialog = doc.getElementById('bkm-privacy');
    if (!dialog) return;

    var openers = doc.querySelectorAll('[data-privacy-open]');
    var closers = dialog.querySelectorAll('[data-privacy-close]');
    var lastFocus = null;

    function open() {
      lastFocus = doc.activeElement;
      dialog.hidden = false;
      doc.body.style.overflow = 'hidden';
      var closer = dialog.querySelector('[data-privacy-close]');
      if (closer) closer.focus();
    }

    function close() {
      dialog.hidden = true;
      doc.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    openers.forEach(function (btn) {
      btn.addEventListener('click', open);
    });

    closers.forEach(function (btn) {
      btn.addEventListener('click', close);
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !dialog.hidden) close();
    });

    // Focus trap.
    dialog.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      var focusable = dialog.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && doc.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && doc.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* -------------------------------------------------- Contact form UX */
  function initContactForm() {
    var form = doc.querySelector('.contact-form');
    if (!form) return;

    var success = doc.querySelector('.contact-success');
    var submit = form.querySelector('.contact-submit');
    var nameField = form.querySelector('#bkm-name');
    var nameOut = doc.querySelector('[data-success-name]');

    // Interest pills are checkboxes; keep them in sync with ARIA state.
    form.querySelectorAll('.interest-pill input').forEach(function (input) {
      input.addEventListener('change', function () {
        input.closest('.interest-pill').setAttribute(
          'aria-pressed',
          input.checked ? 'true' : 'false',
        );
      });
    });

    if (!success) return;

    form.addEventListener('submit', function () {
      if (submit) {
        submit.disabled = true;
        submit.dataset.label = submit.textContent;
        submit.textContent = submit.getAttribute('data-sending') || 'Sending…';
      }
    });

    // WordPress posts the form and reloads; the interstitial state is handled
    // server-side. This hook only exists for the no-JS-free nicety of showing
    // the greeting name if the theme is used with a plugin that returns JSON.
    if (nameOut && nameField) {
      nameOut.textContent = nameField.value.trim().split(' ')[0] || 'there';
    }
  }

  /* ------------------------------------------------------------- Boot */
  function boot() {
    initHeader();
    initMobileMenu();
    initReveals();
    initActiveSection();
    initSmoothScroll();
    initBackToTop();
    initPipeline();
    initDialog();
    initContactForm();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
