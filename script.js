// Pooja Mishra — portfolio interactions
(function () {
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  var links = document.querySelector('.nav-links');

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        menuBtn.classList.remove('open');
      });
    });
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('.bar i').forEach(function (b) { b.style.width = b.dataset.w + '%'; });
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Count up
  var counters = document.querySelectorAll('[data-count]');
  var co = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var end = parseFloat(el.dataset.count);
      var dec = (el.dataset.count.split('.')[1] || '').length;
      var suffix = el.dataset.suffix || '';
      var pad = el.dataset.pad ? parseInt(el.dataset.pad, 10) : 0;
      var start = null;
      function tick(t) {
        if (!start) start = t;
        var p = Math.min((t - start) / 1400, 1);
        var v = end * (1 - Math.pow(1 - p, 3));
        var s = v.toFixed(dec);
        if (pad) s = s.padStart(pad, '0');
        el.textContent = s + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      co.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(function (c) { co.observe(c); });

  // Connect form -> opens the visitor's email app with a ready message
  var form = document.getElementById('connect-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var d = new FormData(form);
      var topic = d.get('topic') || 'General enquiry';
      var subject = 'Portfolio enquiry: ' + topic;
      var body = 'Hello Pooja,\n\n' + d.get('message') + '\n\n— ' + d.get('name') + '\n' + d.get('email');
      window.location.href = 'mailto:pm533740@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var note = document.getElementById('form-note');
      if (note) note.textContent = 'Opening your email app with the message ready to send…';
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
