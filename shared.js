document.addEventListener('DOMContentLoaded', function() {
  var nav = document.getElementById('pg-nav');
  // Hide nav on intro/load screen (index.html)
  var isIntro = document.getElementById('screen-video');
  if (nav && !isIntro) nav.classList.add('nav-visible');
});
