// ---- build your month ---------------------------------------------------
//
// The primary card's three facts used to be three ranges -- "1-3 days / mo",
// "6-20 videos", "from Rs 36,995" -- which is three questions a visitor has
// to answer for themselves before the card means anything. Dragging answers
// all three at once, for the volume they actually want, and fills in their
// month while it does it.
//
// OD_TIERS comes from ciad.js, loaded above. Not copied: the same three
// packages already live there and in CLAUDE.md's record of them, and a
// fourth copy is a fourth place for the site to quote a different price.
// It snaps to the three because interpolating would invent prices Raj has
// never quoted -- the same reason CIAD's slider snaps.

var HUB_MONTH_DAYS = 30;

function hubBuildMonth() {
  var wrap = document.getElementById('hub-month');
  if (!wrap) return;
  var html = '';
  // 7ms a square, same as the deck: the sweep is charming, a 350ms tail on
  // a drag is not.
  for (var d = 0; d < HUB_MONTH_DAYS; d++) {
    html += '<i class="hub-day" style="--d:' + (d * 7) + 'ms"></i>';
  }
  wrap.innerHTML = html;
}

// Spread the posts across the month rather than filling from the left. A
// solid block on days 1-12 would be showing a batch, which is the thing this
// product is not.
function hubPaintMonth(videos) {
  var days = document.querySelectorAll('.hub-day');
  if (!days.length) return;
  var step = HUB_MONTH_DAYS / videos;
  var on = {};
  for (var i = 0; i < videos; i++) on[Math.round(i * step)] = true;
  for (var d = 0; d < days.length; d++) days[d].classList.toggle('is-on', !!on[d]);
}

function hubSetTier(i) {
  if (typeof OD_TIERS === 'undefined' || !OD_TIERS.length) return;
  i = Math.max(0, Math.min(OD_TIERS.length - 1, i));
  var t = OD_TIERS[i];

  var days = document.getElementById('hub-days');
  var vol = document.getElementById('hub-vol-out');
  var price = document.getElementById('hub-price');
  if (days) days.innerHTML = t.days;
  // " a month" comes off: the label above says "you get" and the fact
  // beside it says "your month", so the words are already there twice.
  // It also kept "16-20 videos a month" on two lines while the other two
  // facts sat on one, which reads as the row breaking rather than as a
  // longer answer.
  if (vol) vol.innerHTML = t.volLabel.replace(/\s+a month$/, '');
  if (price) price.innerHTML = t.inr + ' / mo';

  // Their choice rides through to the deck, so CIAD's price screen opens on
  // the package they just built instead of making them build it twice.
  var btn = document.querySelector('.hub-opt-btn');
  if (btn) btn.setAttribute('href', 'ciad.html?pkg=' + i);

  hubPaintMonth(t.videos);
}

// The drag hint. Once, when the card is on screen, and after the card's own
// spring entrance has settled -- a hint that plays while the thing is still
// flying in is a hint nobody sees.
function hubDragHint(vol) {
  if (!vol) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var fired = false;
  function go() {
    if (fired) return;
    fired = true;
    setTimeout(function () { vol.classList.add('hint'); }, 900);
  }
  if (!('IntersectionObserver' in window)) { go(); return; }
  var io = new IntersectionObserver(function (es) {
    for (var i = 0; i < es.length; i++) {
      if (es[i].isIntersecting) { io.disconnect(); go(); }
    }
  }, { threshold: 0.6 });
  io.observe(vol);
}

function initHubBuild() {
  var vol = document.getElementById('hub-vol');
  // No slider, or ciad.js never arrived: the markup already carries the
  // foundation tier's real values, so the card reads exactly as it did
  // before rather than emptying out.
  if (!vol || typeof OD_TIERS === 'undefined') return;
  hubBuildMonth();
  vol.addEventListener('input', function () {
    hubSetTier(parseInt(this.value, 10));
  });
  hubSetTier(parseInt(vol.value, 10));
}

function initHub() {
  hubDragHint(document.getElementById('hub-vol'));
  var pgNavHub = document.getElementById('pg-nav');
  if (pgNavHub) pgNavHub.classList.add('nav-visible');
  initHubBuild();
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
