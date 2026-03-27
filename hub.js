function initHub() {
  var pgNavHub = document.getElementById('pg-nav');
  if (pgNavHub) pgNavHub.classList.add('nav-visible');
  setTimeout(function() {
    var hl = document.getElementById('hub-loader');
    if (hl) hl.classList.add('done');
    setTimeout(function() {
      var hb = document.getElementById('hub-back');
      var hc = document.getElementById('hub-content');
      if (hb) hb.classList.add('visible');
      if (hc) hc.classList.add('visible');
    }, 200);
  }, 1200);
}


document.addEventListener('DOMContentLoaded', function() { initHub(); });
