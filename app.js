// Builds mailto links from data attributes at runtime instead of shipping
// a plain "name@domain" string in the HTML source. This stops the cheap,
// automated scrapers that just regex-scan page source for email addresses.
// It will not stop a determined, JS-executing bot -- that's a spam-reduction
// measure, not a hard security boundary.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.js-email').forEach(function (el) {
    var user = el.getAttribute('data-user');
    var domain = el.getAttribute('data-domain');
    if (!user || !domain) return;

    var address = user + '@' + domain;
    el.setAttribute('href', 'mailto:' + address);

    var label = el.querySelector('.js-email-text');
    if (label) label.textContent = address;
  });

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navlinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }
});
