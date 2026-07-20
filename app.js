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
});
