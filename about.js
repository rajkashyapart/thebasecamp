// About — one dominant photograph, thirty-five that recede.
//
// The mosaic must never crop a photo. A column masonry cannot manage that and
// a controlled row height at the same time: column count is a whole number,
// so the height jumps in steps. Justified rows fix it because row height is
// continuous.
//
// Standard algorithm: partition the tiles into rows, then scale every row so
// its widths sum to exactly the available width; a row's height falls out of
// the ratios in it.
//
// The pane is two regions. The hero band -- a strip of small tiles beside the
// one big photograph -- fills the first screen exactly, so its strip width has
// to be *solved* for; how many tiles go in the strip is searched. Everything
// below it simply flows at a chosen row height and takes whatever height that
// comes to, because past the fold there is nothing to fit.
//
// Until 2026-08-12 the whole mosaic was crushed into one viewport, which put
// thirty-six photographs at ~125px each. Raj: "are the rest of the images too
// small on desktop?" -- they were, and none of them could go, so the pane
// grew instead and the writing column stays put (position:sticky) while they
// scroll past it.

function initAbout() {
  var shots = document.querySelector('.shots');
  if (!shots) return;

  var tiles = Array.prototype.slice.call(shots.querySelectorAll('.tile'));
  if (!tiles.length) return;

  var hero = shots.querySelector('.tile.hero');
  var rest = tiles.filter(function (t) { return t !== hero; });

  var GAP = 7;
  // How much of the pane's width the hero may claim. The floor is high on
  // purpose: Raj, 2026-08-10, "the sizing of the main is enough of a focal
  // point" -- size is the only thing doing the hierarchy now that the other
  // photographs are back at full strength, so a hero that drifts down to 42%
  // of the pane is not merely smaller, it is the hierarchy failing.
  var HERO_MIN = 0.48, HERO_MAX = 0.64;

  function ratioOf(t) {
    var v = parseFloat(t.style.getPropertyValue('--ar'));
    if (v > 0) return v;
    var img = t.querySelector('img');
    return (img && img.naturalWidth) ? img.naturalWidth / img.naturalHeight : 0.75;
  }

  var heroRatio = hero ? ratioOf(hero) : 0.8;

  // Distance from the top of the mosaic to the bottom of the screen.
  // offsetTop walks up to the scroller, so this survives being scrolled.
  function available() {
    var screenEl = document.getElementById('screen-about');
    if (!screenEl) return 0;
    var top = 0, node = shots;
    while (node && node !== screenEl) { top += node.offsetTop; node = node.offsetParent; }
    return screenEl.clientHeight - top - 6;
  }

  // ---- packing ---------------------------------------------------------
  //
  // Every row is justified to its region's exact width, so a row's height
  // falls out of the ratios in it and no photograph is ever cropped.
  //
  // Rows are chosen by dynamic programming rather than greedily. A greedy
  // fill closes a row as soon as it is wide enough, which means the tiles
  // that do not make a full row end up in a short trailing one -- and a short
  // trailing row here sits in the bottom-right corner of the viewport with a
  // wedge of bare paper beside it. Partitioning into exactly r rows instead
  // makes every row full by construction; the only question is how many rows,
  // and that is cheap to try exhaustively.

  function stack(rows) {
    var t = 0;
    rows.forEach(function (r, i) { t += r.h + (i ? GAP : 0); });
    return t;
  }

  function avgH(rows) {
    var t = 0;
    rows.forEach(function (r) { t += r.h; });
    return t / rows.length;
  }

  // Rows within a region must be near enough each other that none of them
  // reads as a different kind of thing. The tolerance is a parameter because
  // the search relaxes it rather than giving up: returning nothing drops the
  // whole desktop page into the phone's column layout, which is a 25,000px
  // scroll, and a slightly uneven row is not worth that.
  function even(rows, lo, hi) {
    var a = avgH(rows);
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].h < a * lo || rows[i].h > a * hi) return false;
    }
    return true;
  }

  // prefix sums of the ratios, so a row's justified height is O(1)
  function prefix(list) {
    var p = [0];
    for (var i = 0; i < list.length; i++) p.push(p[i] + list[i]);
    return p;
  }
  function rowH(pre, a, b, W) {
    return (W - (b - a - 1) * GAP) / (pre[b] - pre[a]);
  }

  // Split tiles [a,b) into exactly r contiguous justified rows, each as close
  // to `t` tall as the ratios allow. Squared deviation, so one wildly wrong
  // row costs more than several slightly wrong ones.
  function split(pre, a, b, W, r, t) {
    var n = b - a, i, j, k;
    if (r < 1 || r > n) return null;
    var cost = [], cut = [];
    for (j = 0; j <= r; j++) {
      cost.push([]); cut.push([]);
      for (i = 0; i <= n; i++) { cost[j].push(Infinity); cut[j].push(-1); }
    }
    cost[0][0] = 0;
    for (j = 1; j <= r; j++) {
      for (i = j; i <= n; i++) {
        for (k = j - 1; k < i; k++) {
          if (cost[j - 1][k] === Infinity) continue;
          var h = rowH(pre, a + k, a + i, W);
          var c = cost[j - 1][k] + (h - t) * (h - t);
          if (c < cost[j][i]) { cost[j][i] = c; cut[j][i] = k; }
        }
      }
    }
    if (cost[r][n] === Infinity) return null;
    var rows = [];
    i = n;
    for (j = r; j >= 1; j--) {
      k = cut[j][i];
      var items = [];
      for (var q = k; q < i; q++) items.push(a + q);
      rows.unshift({ items: items, h: rowH(pre, a + k, a + i, W), stretch: true });
      i = k;
    }
    return rows;
  }

  // put every tile back as a direct child so a re-layout starts from scratch
  function unwrap() {
    var made = shots.querySelectorAll('.srow,.hband,.hstrip,.bband');
    if (!made.length) return;
    tiles.forEach(function (t) { shots.appendChild(t); });
    Array.prototype.forEach.call(made, function (r) { r.remove(); });
  }

  // Render solved rows as .srow elements inside `host`.
  function paint(host, list, els, rows, W) {
    rows.forEach(function (r) {
      var rowEl = document.createElement('div');
      rowEl.className = 'srow';
      var h = Math.max(1, Math.floor(r.h));
      var ws = r.items.map(function (ix) { return Math.max(1, Math.floor(h * list[ix])); });

      // Spread the rounding remainder a pixel at a time across the whole row
      // rather than dumping it on one tile. Flooring eight tile widths can
      // lose a dozen pixels between them, and handing all twelve to a single
      // 49px-wide photograph stretched it by a quarter.
      if (r.stretch) {
        var sumW = 0;
        ws.forEach(function (w) { sumW += w; });
        var rem = Math.round(W - (r.items.length - 1) * GAP) - sumW;
        var n = ws.length, step = Math.floor(rem / n), extra = rem - step * n;
        for (var m = 0; m < n; m++) {
          ws[m] = Math.max(1, ws[m] + step + (m < extra ? 1 : 0));
        }
      }

      r.items.forEach(function (ix, idx) {
        var el = els[ix];
        el.style.width = ws[idx] + 'px';
        el.style.height = h + 'px';
        rowEl.appendChild(el);
      });
      host.appendChild(rowEl);
    });
  }

  // The hero's two homes. On a phone it sits in the writing, directly under
  // the clients line, so a photograph arrives inside the first scroll instead
  // of after every word on the page; on a desktop it goes back to being the
  // right-hand pane's focal point. Moved rather than duplicated -- a second
  // copy is a second 1400px download and a second thing to keep in step.
  var anchor = document.querySelector('.col .clients');
  var col = document.querySelector('#about-inner .col');

  // Where the writing comes to rest. A column that fits pins at the top; one
  // that is taller than the viewport pins at minus its overflow, so it scrolls
  // just far enough to show its last line and stops there. Measured rather
  // than assumed -- the column is over the viewport at most desktop sizes, and
  // pinning those at 0 would park the playlist off-screen for the whole page.
  function pin(on) {
    if (!col) return;
    if (!on) { col.classList.remove('pinned'); col.style.top = ''; return; }
    var screenEl = document.getElementById('screen-about');
    var vh = screenEl ? screenEl.clientHeight : window.innerHeight;
    var over = col.scrollHeight - vh;
    col.style.top = (over > 0 ? -Math.ceil(over) : 0) + 'px';
    col.classList.add('pinned');
  }

  function placeHero(inline) {
    if (!hero) return;
    if (inline) {
      if (!anchor) return;
      hero.classList.add('inline');
      if (hero.previousElementSibling !== anchor) anchor.insertAdjacentElement('afterend', hero);
    } else if (hero.classList.contains('inline')) {
      hero.classList.remove('inline');
      shots.insertBefore(hero, shots.firstChild);
    }
  }

  // ── the drift ──────────────────────────────────────
  // The mosaic creeps upward on its own. Raj, 2026-08-12, asked for it to stop
  // when the cursor is on a photograph and to start again "only after the
  // mouse goes towards the writing area" -- so leaving a picture is not
  // enough on its own, the pointer has to arrive somewhere else.
  //
  // Constant motion, so it is linear and frame-rate independent: a fixed step
  // per frame runs at double speed on a 120Hz screen, and an eased drift reads
  // as the page deciding to move rather than a steady creep.
  var DRIFT = 24;      // css px per second
  var RESUME = 2500;   // ms of quiet before it takes over again after a scroll
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var drift = { on: false, hover: false, until: 0, last: 0, raf: 0, carry: 0 };

  function driftTick(now) {
    drift.raf = 0;
    var s = document.getElementById('screen-about');
    if (!drift.on || !s) return;
    // clamp the delta: a backgrounded tab hands back one enormous frame, and
    // the page would jump a screen the moment it is looked at again
    var dt = drift.last ? Math.min(100, now - drift.last) : 16;
    drift.last = now;
    if (!drift.hover && now >= drift.until && !document.hidden) {
      var max = s.scrollHeight - s.clientHeight;
      if (s.scrollTop < max - 0.5) {
        // carry the fraction: at 24px/s a 16ms frame is 0.38px, and a scrollTop
        // that rounds would swallow every one of them and never move at all
        drift.carry += DRIFT * dt / 1000;
        var step = Math.floor(drift.carry);
        if (step > 0) { drift.carry -= step; s.scrollTop = Math.min(max, s.scrollTop + step); }
      }
    }
    drift.raf = requestAnimationFrame(driftTick);
  }

  function setDrift(on) {
    on = !!on && !reduce.matches;
    if (on === drift.on) return;
    drift.on = on;
    drift.last = 0; drift.carry = 0;
    // Let the first screen land before anything moves. A page that starts
    // creeping the instant it appears reads as broken rather than alive, and
    // the hero band is composed to be looked at for a moment first.
    if (on) { drift.until = performance.now() + RESUME; drift.raf = requestAnimationFrame(driftTick); }
    else if (drift.raf) { cancelAnimationFrame(drift.raf); drift.raf = 0; }
  }

  function holdDrift() { drift.until = performance.now() + RESUME; }

  if (shots) shots.addEventListener('pointerenter', function () { drift.hover = true; });
  // arriving at the writing is the resume signal, and it is immediate -- it
  // clears the post-scroll hold too, because going back to the words is the
  // clearest possible statement that you are done scrolling yourself
  if (col) col.addEventListener('pointerenter', function () { drift.hover = false; drift.until = 0; });
  // the pointer leaving the window entirely counts as leaving the pictures,
  // or parking the cursor on a photograph and switching apps stops it forever
  document.addEventListener('pointerleave', function () { drift.hover = false; });
  var scroller = document.getElementById('screen-about');
  if (scroller) {
    scroller.addEventListener('wheel', holdDrift, { passive: true });
    scroller.addEventListener('touchmove', holdDrift, { passive: true });
  }

  function layout() {
    // On a phone you are scrolling regardless, and bigger pictures beat a
    // tidy fit, so the CSS column layout stays.
    if (window.innerWidth <= 820) {
      shots.classList.remove('justified');
      shots.style.height = '';
      unwrap();
      tiles.forEach(function (t) { t.style.width = ''; t.style.height = ''; });
      placeHero(true);
      pin(false);
      // no cursor to stop it and no pinned writing to drift past
      setDrift(false);
      return;
    }

    placeHero(false);
    pin(true);
    setDrift(true);
    unwrap();
    shots.classList.add('justified');
    var cs = getComputedStyle(shots);
    var W = shots.clientWidth - parseFloat(cs.paddingRight || 0) - parseFloat(cs.paddingLeft || 0);
    var H = available();
    if (W <= 0 || H <= 0) return;

    var ratios = rest.map(ratioOf);
    if (!hero) return;

    // shots.style.height is the border box, so the nav-clearing padding has
    // to come off before anything is packed into it
    var inner = H - parseFloat(cs.paddingTop || 0);
    if (inner <= 0) return;

    // Three things are searched together: how wide the hero is, how many
    // photographs go in the strip beside it, and how many rows each region
    // uses. Fixing any one of them first leaves the other two nothing to
    // trade with -- fixing the hero was what produced a 95px hole in the
    // bottom band, and fixing the split was what produced the short last row.
    var pre = prefix(ratios);
    var N = ratios.length;

    // Solved, not swept.
    //
    // Twenty-five photographs at whole row counts cannot tile a fixed pane:
    // every arrangement lands tens of pixels short, and that remainder has to
    // show up somewhere as a hole. The way out is one continuous dimension,
    // and the cheapest one to give up is the hero's height -- it is a
    // portrait with room above the head and below the elbow, so a few per
    // cent off it is invisible, where the same few per cent of bare paper in
    // the middle of the mosaic is the first thing you see.
    //
    // So: choose how many photographs go beside the hero and how many rows
    // each region uses, let the bottom band take its natural height, and give
    // the hero band exactly the rest. A strip of r rows has total height
    //     T = stripW * C1 - C2
    // which is linear in its width, so the width that makes the strip reach
    // the hero's foot exactly can be solved for rather than hunted. Two
    // passes settle it, because solving changes the width, which can change
    // which tiles fall in which row.
    function shape(rows) {
      var c1 = 0, c2 = 0;
      rows.forEach(function (r) {
        var s = 0;
        r.items.forEach(function (ix) { s += ratios[ix]; });
        c1 += 1 / s;
        c2 += (r.items.length - 1) * GAP / s;
      });
      return { c1: c1, c2: c2 - (rows.length - 1) * GAP };
    }

    // How tall a row wants to be once nothing is fitting it to a viewport:
    // four photographs across the pane. That is about twice the size they ran
    // at when all thirty-six shared one screen, which is the whole point of
    // letting the pane run past the fold. Derived from W rather than fixed, so
    // a 2560px monitor gets bigger pictures rather than more of them.
    var TARGET = W / (4 * 0.75);

    // Tried at three levels of fussiness rather than once. The envelope
    // below -- crop, row evenness, size disparity -- is what makes the mosaic
    // look considered, but a hard reject at every level means some counts of
    // photographs have no solution at all, and returning nothing drops the
    // desktop page into the phone's column layout: a 25,000px scroll instead
    // of a screen. Twenty-four photographs did exactly that. So the caps
    // loosen until something fits, and only then does it give up.
    //
    // Only the hero band is searched now. It is the one region still pinned to
    // a fixed height -- the first screen -- so it is the only one where the
    // width has to be solved rather than chosen.
    function attempt(cropCap, disp, lo, hi) {
      var out = null;
      var maxK = Math.min(12, N - 4);
      for (var k = 2; k <= maxK; k++) {
        for (var rA = 1; rA <= 5; rA++) {
          if (rA > k) continue;
          var sw = Math.round(W * 0.45), Arows = null, sh = null;
          for (var pass = 0; pass < 3; pass++) {
            Arows = split(pre, 0, k, sw, rA, (inner - (rA - 1) * GAP) / rA);
            if (!Arows) break;
            sh = shape(Arows);
            var solved = (inner + sh.c2) / sh.c1;
            if (!isFinite(solved) || solved <= 0) { Arows = null; break; }
            sw = Math.round(solved);
          }
          if (!Arows) continue;
          Arows = split(pre, 0, k, sw, rA, (inner - (rA - 1) * GAP) / rA);
          if (!Arows || !even(Arows, lo, hi)) continue;
          if (Math.abs(stack(Arows) - inner) > 2) continue;

          var hw = W - sw - GAP;
          if (hw < W * HERO_MIN || hw > W * HERO_MAX) continue;

          // how much of the hero this costs. cover crops from the centre,
          // so the number is the whole crop, split top and bottom
          var crop = Math.abs(1 - (hw / inner) / heroRatio);
          if (crop > cropCap) continue;

          // The strip and the rows under it hold the same kind of picture at
          // the same distance, so they have to be about the same size or the
          // strip reads as a second, lesser hero. This is a cost, not a cliff:
          // as a hard gate it either threw away every arrangement and fell
          // through to a looser pass, or accepted a 195px strip above 245px
          // rows because both sides happened to sit inside the tolerance.
          // Priced instead, a coherent strip can buy itself a slightly
          // narrower hero, which is the trade actually worth making.
          var ha = avgH(Arows);
          var gap = Math.abs(ha - TARGET) / Math.max(ha, TARGET);
          if (gap > disp) continue;

          // The biggest hero wins, with the crop it costs charged against
          // it. Scoring by least crop instead -- which is what this did --
          // bought a 1% crop with a hero only 42% of the pane wide, paying
          // in the one thing the page is built around.
          var score = -hw + crop * 220 + gap * 400;
          if (!out || score < out.score) {
            out = { rows: Arows, k: k, score: score, hw: hw, hh: Math.round(inner), sw: sw };
          }
        }
      }
      return out;
    }

    // Everything below the fold. No height to hit, so the row count is read
    // off the target instead of searched for: the tiles laid end to end at
    // TARGET are this many panes wide. Neighbouring counts are tried too,
    // because rounding can leave the rows visibly off the size asked for.
    function flow(a, b, t) {
      if (b - a < 1) return null;
      var sum = 0, i;
      for (i = a; i < b; i++) sum += ratios[i];
      var r = Math.max(1, Math.round(sum * t / W));
      var tries = [r, r + 1, r - 1, r + 2, r - 2], rows, j;
      // Two things matter and they pull apart, so both are scored rather than
      // one being used as a gate. Rows are stacked directly on each other with
      // a 7px gap, so a row much taller than the one above reads as two
      // different grids -- but taking the *tidiest* arrangement instead of the
      // right-sized one is worse: with 25 photographs it picked five rows of
      // five, perfectly even at 145px, which is the small-tile problem this
      // whole layout exists to fix. Closest to the target height wins, with a
      // small tax for needing a looser evenness band to get there.
      var bands = [[0.90, 1.11], [0.84, 1.19], [0.74, 1.36]];
      var best = null;
      for (j = 0; j < bands.length; j++) {
        for (i = 0; i < tries.length; i++) {
          if (tries[i] < 1 || tries[i] > b - a) continue;
          rows = split(pre, a, b, W, tries[i], t);
          if (!rows || !even(rows, bands[j][0], bands[j][1])) continue;
          var score = Math.abs(avgH(rows) - t) + j * t * 0.06;
          if (!best || score < best.score) best = { rows: rows, score: score };
        }
      }
      return best ? best.rows : split(pre, a, b, W, Math.min(b - a, r), t);
    }

    var best = attempt(0.11, 0.36, 0.74, 1.36)
            || attempt(0.16, 0.44, 0.68, 1.48)
            || attempt(0.24, 0.58, 0.60, 1.70);

    // Last resort: no hero band at all, just one justified block of every
    // photograph at the target row height. Plainer than intended, but it is a
    // page of pictures rather than a column of them.
    if (!best) {
      var allR = tiles.map(ratioOf), allPre = prefix(allR), sumA = 0;
      for (var q = 0; q < allR.length; q++) sumA += allR[q];
      var fr = Math.max(1, Math.round(sumA * TARGET / W));
      var flat = split(allPre, 0, allR.length, W, Math.min(allR.length, fr), TARGET);
      if (flat) {
        var fband = document.createElement('div');
        fband.className = 'bband';
        paint(fband, allR, tiles, flat, W);
        shots.appendChild(fband);
      }
      return;
    }

    var frag = document.createDocumentFragment();

    var hband = document.createElement('div');
    hband.className = 'hband';
    hband.style.height = best.hh + 'px';

    var strip = document.createElement('div');
    strip.className = 'hstrip';
    strip.style.width = best.sw + 'px';
    paint(strip, ratios, rest, best.rows, best.sw);
    hband.appendChild(strip);

    hero.style.width = best.hw + 'px';
    hero.style.height = best.hh + 'px';
    hband.appendChild(hero);
    frag.appendChild(hband);

    var below = flow(best.k, N, TARGET);
    if (below) {
      var bband = document.createElement('div');
      bband.className = 'bband';
      paint(bband, ratios, rest, below, W);
      frag.appendChild(bband);
    }

    shots.appendChild(frag);
  }

  layout();
  // Fonts and images both shift the mosaic's top edge once they land.
  window.addEventListener('load', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

  // The resting offset is measured off the column's height, and that height
  // is not final when layout() first runs -- the playlist unhides whenever
  // Spotify's controller is ready, which is after everything else. Without
  // this the writing pins 65px short of the floor and the playlist hangs in
  // mid-air. Setting top does not resize the column, so this cannot loop.
  if (col && window.ResizeObserver) {
    new ResizeObserver(function () {
      if (col.classList.contains('pinned')) pin(true);
    }).observe(col);
  }

  var t = null;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(layout, 120);
  });
}

// ── the playlist ─────────────────────────────────────────────────────────
//
// No browser will start audio on page load without a gesture, so "autoplay"
// here means: primed on load, started by the visitor's first click, tap,
// keypress or scroll -- whichever comes first. If they pause it on purpose we
// never start it again behind their back.
//
// The controller exposes position, duration and paused state, but not the
// current track's title, so the strip names the playlist instead of the song.

var PLAYLIST_URI = 'spotify:playlist:3AG6YEKfEY5FxRVe3yCU6S';

function initPlayer(IFrameAPI) {
  var host = document.getElementById('sp-embed');
  var strip = document.getElementById('player');
  var btn = document.getElementById('pl-toggle');
  var fill = document.getElementById('pl-fill');
  var bar = strip && strip.querySelector('.pl-bar');
  if (!host || !strip || !btn || !fill) return;

  var ctrl = null;
  var armed = false;       // has the first gesture been spent
  var userPaused = false;  // they pressed pause; do not resume for them
  var duration = 0;

  IFrameAPI.createController(host, { uri: PLAYLIST_URI, width: '100%', height: '80' }, function (c) {
    ctrl = c;
    strip.hidden = false;

    c.addListener('playback_update', function (e) {
      var d = e && e.data; if (!d) return;
      if (d.duration) duration = d.duration;
      var p = duration ? Math.min(1, d.position / duration) : 0;
      // transform, not width: width would relayout the strip 4x a second
      fill.style.transform = 'scaleX(' + p + ')';
      if (bar) bar.setAttribute('aria-valuenow', Math.round(p * 100));
      setPressed(!d.isPaused);
    });
  });

  function setPressed(playing) {
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    btn.setAttribute('aria-label', playing ? 'pause the playlist' : 'play the playlist');
  }

  btn.addEventListener('click', function () {
    if (!ctrl) return;
    var playing = btn.getAttribute('aria-pressed') === 'true';
    userPaused = playing;          // pressing pause is a decision, remember it
    armed = true;                  // and it counts as the first gesture
    ctrl.togglePlay();
  });

  // The first gesture anywhere starts it -- unless that gesture landed on the
  // player itself, in which case the button's own handler owns it and firing
  // here as well would play and immediately pause.
  function kick(e) {
    if (armed) return;
    if (e && e.target && e.target.closest && e.target.closest('#player')) { armed = true; return; }
    armed = true;
    if (ctrl && !userPaused) ctrl.play();
  }
  ['pointerdown', 'keydown', 'touchstart', 'wheel'].forEach(function (ev) {
    window.addEventListener(ev, kick, { passive: true });
  });

  // Leaving the page stops the music. A real navigation tears the iframe
  // down on its own; this is for the back/forward cache, which would
  // otherwise restore the page mid-song.
  window.addEventListener('pagehide', function () {
    try { if (ctrl) ctrl.pause(); } catch (err) {}
  });
}

// assigned at top level: the API script is async and may run at any moment
window.onSpotifyIframeApiReady = function (IFrameAPI) { initPlayer(IFrameAPI); };

document.addEventListener('DOMContentLoaded', function () { initAbout(); });
