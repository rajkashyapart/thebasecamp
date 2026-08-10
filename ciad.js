// Outlier content in a day.
//
// Five screens, crossed in about a minute. There is exactly one action on
// screen at any moment: the button in the bar, which morphs from "find out"
// into "book a call" at the end.
//
// The rail used to be a clock, 08:00 to 19:00. Only the smallest package is
// shootable in a day -- growth takes two and expansion three -- so the hours
// were claiming something untrue and the stops are chapters now. The ground
// still warms across the five, which is progression rather than time of day.
//
// Everything else that used to live here -- nine folders, a desktop, a window
// manager, a marquee, an email bar -- is gone. The call does that selling now.

var OD = {
  i: 0,
  n: 5,
  track: null,
  deck: null,
  screen: null,
  // The ground warms as you go. One property, no ornament -- it is the only
  // thing left carrying a sense of travel now that the clock is gone.
  tones: ['#f5f2ee', '#f4f1eb', '#f6f1e8', '#f2ebe1', '#efe7dc'],
  labels: [
    'find out &rarr;',
    'next &rarr;',
    'next &rarr;',
    'see the price &rarr;',
    'book a call &rarr;'
  ]
};

// The three packages, and nothing between them. A slider that interpolated
// would be inventing prices Raj has never quoted, so it snaps to the three
// he has. Cadence is arithmetic off 30 days -- no promise in it. Shoot days
// are Raj's own figures (2026-08-11): six videos fit in one day, twelve take
// two, sixteen to twenty take three. They are the real commitment the client
// makes, so they are stated, not implied.
//
// Entities, not literal glyphs: this file has been corrupted before by a
// stray rupee sign or en dash inside a string.
var OD_TIERS = [
  { name: 'foundation', videos: 6,  days: '1 shoot day',  inr: '&#8377;36,995',   usd: '$399',
    cadence: 'one every 5 days',      volLabel: '6 videos a month' },
  { name: 'growth',     videos: 12, days: '2 shoot days', inr: '&#8377;54,995',   usd: '$594',
    cadence: 'one every 2&ndash;3 days', volLabel: '12 videos a month' },
  { name: 'expansion',  videos: 18, days: '3 shoot days', inr: '&#8377;1,30,000', usd: '$1,404',
    cadence: 'one every other day',   volLabel: '16&ndash;20 videos a month' }
];

var OD_REELS = [
  { src: 'https://vz-6f9a60bb-593.b-cdn.net/2b6ecca6-96e1-4890-9170-1f60ef2ad41b/playlist.m3u8', name: 'Kaheen' },
  { src: 'https://vz-6f9a60bb-593.b-cdn.net/fddf2783-d99b-440c-b433-0dbcbad3a07c/playlist.m3u8', name: 'Copper + Cloves' },
  { src: 'https://vz-6f9a60bb-593.b-cdn.net/a0bd786e-b67c-4c1f-b53a-2a25e3542227/playlist.m3u8', name: 'Upsurge Labs' },
  { src: 'https://vz-6f9a60bb-593.b-cdn.net/4c09e742-2c9f-4c7d-918a-4b05c8e30f53/playlist.m3u8', name: 'The Fresh Factory' },
  { src: 'https://vz-6f9a60bb-593.b-cdn.net/f7b91a7c-a8b3-46d1-8465-bd9b134db124/playlist.m3u8', name: 'Insanely Good Coffee' }
];

function odReduced() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ---- the deck ---------------------------------------------------------

function odGo(next, animate) {
  if (next < 0) next = 0;
  if (next > OD.n - 1) next = OD.n - 1;
  var changed = next !== OD.i;
  OD.i = next;

  OD.track.style.transition = (animate === false || odReduced())
    ? 'none'
    : 'transform 0.48s cubic-bezier(0.32,0.72,0,1)';
  OD.track.style.transform = 'translate3d(' + (-100 * OD.i) + '%,0,0)';

  OD.screen.style.setProperty('--od-ground', OD.tones[OD.i]);

  var fill = document.getElementById('od-rail-fill');
  if (fill) fill.style.transform = 'scaleX(' + (OD.i / (OD.n - 1)) + ')';

  var ticks = document.querySelectorAll('.od-tick');
  for (var t = 0; t < ticks.length; t++) {
    var on = t === OD.i;
    ticks[t].classList.toggle('is-on', on);
    ticks[t].setAttribute('aria-selected', on ? 'true' : 'false');
  }

  var slides = document.querySelectorAll('.od-slide');
  for (var s = 0; s < slides.length; s++) {
    slides[s].classList.toggle('is-on', s === OD.i);
    slides[s].setAttribute('aria-hidden', s === OD.i ? 'false' : 'true');
  }

  odSetLabel(OD.labels[OD.i], changed);
  if (OD.i !== 3) odStopReels();
}

// The label swap is a crossfade between two words in the same place, which
// always reads as two objects unless you blur through the middle of it.
function odSetLabel(html, animate) {
  var el = document.getElementById('od-go-label');
  if (!el) return;
  if (animate === false || odReduced()) { el.innerHTML = html; return; }
  el.classList.add('is-swapping');
  window.setTimeout(function () {
    el.innerHTML = html;
    el.classList.remove('is-swapping');
  }, 130);
}

function odNext() {
  if (OD.i >= OD.n - 1) { odBook(); return; }
  odGo(OD.i + 1, true);
}

// Whatever month they built rides into the booking, so the call already knows
// what they picked instead of asking them to say it again.
function odBook() {
  var t = OD_TIERS[odTierIndex];
  var url = 'https://calendly.com/shootwraj/content-in-a-day' +
            '?utm_source=ciad&utm_content=' + t.name + '-' + t.videos;
  window.open(url, '_blank');
}

// ---- drag -------------------------------------------------------------
//
// A flick should be enough. Distance alone means a slow, long drag counts and
// a fast, short one does not, which is backwards from how the hand works.

function odAttachDrag() {
  var startX = 0, startY = 0, dx = 0, t0 = 0;
  var dragging = false, locked = false, axis = '';

  OD.deck.addEventListener('pointerdown', function (e) {
    // Anything that owns its own horizontal gesture keeps it. The volume
    // slider is the reason this list has form controls in it: the deck was
    // capturing the pointer the moment the drag went sideways, so the thumb
    // never moved and the page slid instead. Every reel is a button, which
    // is what hands the reel row's sideways scroll back to the row.
    if (e.target.closest('button, a, input, select, textarea, label')) return;
    dragging = true; locked = false; axis = '';
    startX = e.clientX; startY = e.clientY; dx = 0;
    t0 = Date.now();
    OD.track.style.transition = 'none';
  });

  OD.deck.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var mx = e.clientX - startX;
    var my = e.clientY - startY;

    // Decide once whether this is a horizontal drag or a vertical scroll,
    // then stop asking. Re-deciding mid-gesture is what makes carousels
    // fight the page.
    if (!locked) {
      if (Math.abs(mx) < 6 && Math.abs(my) < 6) return;
      axis = Math.abs(mx) > Math.abs(my) ? 'x' : 'y';
      locked = true;
      if (axis === 'x') OD.deck.setPointerCapture(e.pointerId);
    }
    if (axis !== 'x') return;

    dx = mx;
    // Friction rather than a wall at the ends.
    if ((OD.i === 0 && dx > 0) || (OD.i === OD.n - 1 && dx < 0)) dx *= 0.32;
    OD.track.style.transform =
      'translate3d(calc(' + (-100 * OD.i) + '% + ' + dx + 'px),0,0)';
  });

  function end(e) {
    if (!dragging) return;
    dragging = false;
    if (axis !== 'x') { locked = false; return; }
    locked = false;
    if (e && e.pointerId != null && OD.deck.hasPointerCapture &&
        OD.deck.hasPointerCapture(e.pointerId)) {
      OD.deck.releasePointerCapture(e.pointerId);
    }
    var dt = Math.max(1, Date.now() - t0);
    var v = Math.abs(dx) / dt;
    var far = Math.abs(dx) > OD.deck.offsetWidth * 0.2;
    if ((far || v > 0.11) && Math.abs(dx) > 12) {
      odGo(dx < 0 ? OD.i + 1 : OD.i - 1, true);
    } else {
      odGo(OD.i, true);
    }
    dx = 0;
  }

  OD.deck.addEventListener('pointerup', end);
  OD.deck.addEventListener('pointercancel', end);
}

// ---- the reels --------------------------------------------------------

var odHls = null;

function odStopReels() {
  if (odHls) { odHls.destroy(); odHls = null; }
  var open = document.querySelector('.od-reel.is-playing');
  if (open) {
    var v = open.querySelector('video');
    if (v) v.remove();
    open.classList.remove('is-playing');
  }
}

function odBuildReels() {
  var wrap = document.getElementById('od-reels');
  if (!wrap) return;
  var html = '';
  for (var i = 0; i < OD_REELS.length; i++) {
    var r = OD_REELS[i];
    var poster = r.src.replace('playlist.m3u8', 'thumbnail.jpg');
    html += '<button type="button" class="od-reel" data-src="' + r.src + '" ' +
            'style="--d:' + (i * 45) + 'ms" aria-label="watch ' + r.name + '">' +
            '<img src="' + poster + '" alt="' + r.name + '" loading="lazy">' +
            '<span class="od-reel-play" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 19,12 8,19"/></svg>' +
            '</span></button>';
  }
  wrap.innerHTML = html;

  wrap.addEventListener('click', function (e) {
    var cell = e.target.closest('.od-reel');
    if (!cell) return;
    if (cell.classList.contains('is-playing')) { odStopReels(); return; }
    odStopReels();
    odPlay(cell);
  });
}

// Tapping a reel is an explicit request to watch it, so it plays with sound.
// Autoplay policy allows an unmuted play() inside a user gesture; if a browser
// refuses anyway, fall back to muted rather than leaving a dead frame. Only one
// reel is ever playing (odStopReels runs first), so nothing overlaps.
function odPlay(cell) {
  var src = cell.getAttribute('data-src');
  var v = document.createElement('video');
  v.playsInline = true;
  v.muted = false;
  v.volume = 1;
  v.loop = true;
  v.setAttribute('playsinline', '');
  cell.appendChild(v);
  cell.classList.add('is-playing');

  function start() {
    var p = v.play();
    if (p && p.catch) {
      p.catch(function () {
        v.muted = true;
        v.play().catch(function () {});
      });
    }
  }

  if (v.canPlayType('application/vnd.apple.mpegurl')) {
    v.src = src;
    start();
  } else if (window.Hls && window.Hls.isSupported()) {
    odHls = new window.Hls({ maxBufferLength: 12 });
    odHls.loadSource(src);
    odHls.attachMedia(v);
    odHls.on(window.Hls.Events.MANIFEST_PARSED, start);
  }
}

// ---- the wheel --------------------------------------------------------
//
// A trackpad does not send one event per gesture, it sends a burst and then a
// long inertia tail. Firing per event walks four slides on one flick, so the
// deck accumulates delta to a threshold, moves once, then stays locked until
// the stream actually stops -- the tail extends the lock rather than queueing
// another move. One gesture, one slide.

function odAttachWheel() {
  var acc = 0, lock = false, unlock = null;
  var THRESHOLD = 60;   // a light nudge should not move the page
  var SETTLE = 520;     // the slide takes 480ms; let it land first
  var QUIET = 140;      // how long the wheel must be silent before unlocking

  function relock(ms) {
    window.clearTimeout(unlock);
    unlock = window.setTimeout(function () { lock = false; acc = 0; }, ms);
  }

  OD.deck.addEventListener('wheel', function (e) {
    // A slide tall enough to scroll owns the wheel until it reaches its edge.
    // Taking it earlier would trap content the visitor cannot reach.
    var slide = document.querySelectorAll('.od-slide')[OD.i];
    if (slide && slide.scrollHeight > slide.clientHeight + 2) {
      var atTop = slide.scrollTop <= 0;
      var atEnd = slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 2;
      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atEnd)) return;
    }

    var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (!d) return;
    e.preventDefault();

    if (lock) { acc = 0; relock(QUIET); return; }

    acc += d;
    if (Math.abs(acc) < THRESHOLD) return;

    var dir = acc > 0 ? 1 : -1;
    acc = 0;
    // Nowhere to go at the ends -- don't start a lock for a move that cannot
    // happen, or the deck feels stuck for half a second.
    if ((dir > 0 && OD.i === OD.n - 1) || (dir < 0 && OD.i === 0)) return;

    lock = true;
    odGo(OD.i + dir, true);
    relock(SETTLE);
  }, { passive: false });
}

// ---- the month --------------------------------------------------------
//
// Thirty squares, one per day. Drag the volume and the month fills in front
// of you. It is the same metaphor as the deck, one turn further on: the page
// has been showing you a day, and this is what the day pays out.

var OD_MONTH_DAYS = 30;
var odTierIndex = 1;

function odBuildMonth() {
  var wrap = document.getElementById('od-month');
  if (!wrap) return;
  var html = '';
  // The sweep across the month is charming; a 350ms tail on a drag is not.
  // 7ms a square keeps the last one inside 200ms of the thumb.
  for (var d = 0; d < OD_MONTH_DAYS; d++) {
    html += '<i class="od-day" style="--d:' + (d * 7) + 'ms"></i>';
  }
  wrap.innerHTML = html;
}

// Spread n posts evenly across the month rather than filling from the left --
// a block of colour on days 1-12 would be showing a batch, which is exactly
// the thing this product is not.
function odPaintMonth(videos) {
  var days = document.querySelectorAll('.od-day');
  if (!days.length) return;
  var step = OD_MONTH_DAYS / videos;
  var on = {};
  for (var i = 0; i < videos; i++) on[Math.round(i * step)] = true;
  for (var d = 0; d < days.length; d++) days[d].classList.toggle('is-on', !!on[d]);
}

function odSetTier(i) {
  odTierIndex = Math.max(0, Math.min(OD_TIERS.length - 1, i));
  var t = OD_TIERS[odTierIndex];

  var name = document.getElementById('od-tier');
  var price = document.getElementById('od-price');
  var vol = document.getElementById('od-vol-out');
  var days = document.getElementById('od-days');
  var cad = document.getElementById('od-cadence');

  if (name) name.innerHTML = t.name;
  if (price) {
    price.innerHTML = '<span class="od-inr">' + t.inr + '</span>' +
                      '<span class="od-usd">' + t.usd + '</span>';
  }
  if (vol) vol.innerHTML = t.volLabel;
  if (days) days.innerHTML = t.days;
  if (cad) cad.innerHTML = t.cadence;

  var marks = document.querySelectorAll('.od-range-marks span');
  for (var m = 0; m < marks.length; m++) marks[m].classList.toggle('is-on', m === odTierIndex);

  odPaintMonth(t.videos);
}

function odCurrency(c) {
  var price = document.querySelector('.od-inner-price');
  if (price) price.classList.toggle('show-usd', c === 'usd');
  var inr = document.getElementById('od-inr-btn');
  var usd = document.getElementById('od-usd-btn');
  if (inr) inr.classList.toggle('is-on', c === 'inr');
  if (usd) usd.classList.toggle('is-on', c === 'usd');
}

// ---- boot -------------------------------------------------------------

function ciadInit() {
  OD.track = document.getElementById('od-track');
  OD.deck = document.getElementById('od-deck');
  OD.screen = document.getElementById('screen-ciad');
  if (!OD.track || !OD.deck || !OD.screen) return;

  odBuildReels();
  odAttachDrag();
  odAttachWheel();

  var go = document.getElementById('od-go');
  if (go) go.addEventListener('click', odNext);

  var ticks = document.querySelectorAll('.od-tick');
  for (var t = 0; t < ticks.length; t++) {
    ticks[t].addEventListener('click', function () {
      odGo(parseInt(this.getAttribute('data-go'), 10), true);
    });
  }

  var inr = document.getElementById('od-inr-btn');
  var usd = document.getElementById('od-usd-btn');
  if (inr) inr.addEventListener('click', function () { odCurrency('inr'); });
  if (usd) usd.addEventListener('click', function () { odCurrency('usd'); });

  odBuildMonth();
  var vol = document.getElementById('od-vol');
  if (vol) {
    vol.addEventListener('input', function () { odSetTier(parseInt(this.value, 10)); });
    // clicking a package name moves the slider to it
    var marks = document.querySelectorAll('.od-range-marks span');
    for (var k = 0; k < marks.length; k++) {
      (function (idx, el) {
        el.addEventListener('click', function () { vol.value = idx; odSetTier(idx); });
      })(k, marks[k]);
    }
  }
  odSetTier(1);

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    // The volume slider is a native range and left/right is how you drive it.
    // Without this the deck eats the keypress and the page jumps a screen
    // while the visitor is trying to change their package.
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); odGo(OD.i + 1, true); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); odGo(OD.i - 1, true); }
    else if (e.key === 'Home') { e.preventDefault(); odGo(0, true); }
    else if (e.key === 'End') { e.preventDefault(); odGo(OD.n - 1, true); }
  });

  odMeasureBar();
  var rt = null;
  window.addEventListener('resize', function () {
    window.clearTimeout(rt);
    rt = window.setTimeout(odMeasureBar, 120);
  });

  odGo(0, false);
  document.body.classList.add('od-ready');
}

// The bar is one row on a desktop and two on a phone. Publishing its real
// height is the only way a slide can clear it at every size.
function odMeasureBar() {
  var bar = document.querySelector('.od-bar');
  if (!bar || !OD.screen) return;
  OD.screen.style.setProperty('--od-bar-h', bar.offsetHeight + 'px');
}

document.addEventListener('DOMContentLoaded', ciadInit);
