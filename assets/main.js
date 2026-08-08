// APEX ULTRA — smartwatch4u.store
// Sticky order bar: reveal after the hero has scrolled past.
(function () {
  var bar = document.getElementById('stickyBar');
  if (!bar) return;

  var hero = document.querySelector('.hero');
  var threshold = hero ? hero.offsetTop + hero.offsetHeight : 480;

  function onScroll() {
    if (window.scrollY > threshold) {
      bar.classList.add('show');
    } else {
      bar.classList.remove('show');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
