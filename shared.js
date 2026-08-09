document.addEventListener('DOMContentLoaded', function() {
  var nav = document.getElementById('pg-nav');
  // Hide nav on intro/load screen (index.html)
  var isIntro = document.getElementById('screen-video');
  if (nav && !isIntro) nav.classList.add('nav-visible');

  // Publish the real nav height as --nav-h so fixed UI can sit under it
  // without hardcoding a number that drifts when the nav's type changes.
  if (!nav) return;
  var t = null;
  function measureNav() {
    document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }
  measureNav();
  window.addEventListener('resize', function() {
    clearTimeout(t);
    t = setTimeout(measureNav, 120);
  });
});
