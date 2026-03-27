function initAbout() {
  var ab = document.getElementById('about-back');
  if (ab) setTimeout(function() { ab.classList.add('visible'); }, 200);
  var items = document.querySelectorAll('#screen-about .about-obj');
  for (var i = 0; i < items.length; i++) {
    (function(el, idx) {
      setTimeout(function() { el.classList.add('in'); }, 180 + idx * 140);
    })(items[i], i);
  }
}
// Video intro — preload-gated
// logo breathes until Bunny fires any playback event (play/playing/timeupdate)
// -> logo out -> cover dissolves -> headline in -> ended -> both fade to playground

document.addEventListener('DOMContentLoaded', function() { initAbout(); });
