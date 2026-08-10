// About — one dominant photograph, twenty-five that recede.
//
// The mosaic has to fill the viewport on any screen and never crop a photo.
// A column masonry cannot do both: column count is a whole number, so the
// height jumps in steps and you get either an overflow or a dead band at the
// bottom. Justified rows fix it because row height is continuous.
//
// Standard algorithm: for a trial row height, greedily fill rows until each
// one is wide enough, then scale every row so its widths sum to exactly the
// available width. Sweep the trial height until the total lands on the space
// we actually have.
//
// The hero changes the shape of the problem. The pane is split into two
// regions -- a top band holding a strip of small tiles beside the hero, and
// a bottom band spanning the full width -- and the same solver runs on each.
// How many tiles go in the strip is not fixed: we try every split and keep
// whichever fills both regions closest to exactly.

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

  // Every partition of [a,b) into a W x H region that fits and looks even,
  // one per row count. The caller picks, because which one is best depends on
  // what the other region is doing.
  function parts(pre, a, b, W, H) {
    var out = [];
    if (H <= 0 || b - a < 1) return out;
    var maxR = Math.min(6, b - a);
    for (var r = 1; r <= maxR; r++) {
      var rows = split(pre, a, b, W, r, (H - (r - 1) * GAP) / r);
      if (!rows) continue;
      var total = stack(rows);
      if (total > H + 0.5 || !even(rows)) continue;
      out.push({ rows: rows, total: total, r: r, slack: H - total });
    }
    return out;
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

  function layout() {
    // On a phone you are scrolling regardless, and bigger pictures beat a
    // tidy fit, so the CSS column layout stays.
    if (window.innerWidth <= 820) {
      shots.classList.remove('justified');
      shots.style.height = '';
      unwrap();
      tiles.forEach(function (t) { t.style.width = ''; t.style.height = ''; });
      return;
    }

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

    // Tried at three levels of fussiness rather than once. The envelope
    // below -- crop, row evenness, size disparity -- is what makes the mosaic
    // look considered, but a hard reject at every level means some counts of
    // photographs have no solution at all, and returning nothing drops the
    // desktop page into the phone's column layout: a 25,000px scroll instead
    // of a screen. Twenty-four photographs did exactly that. So the caps
    // loosen until something fits, and only then does it give up.
    function attempt(cropCap, disp, lo, hi) {
      var out = null;
      for (var k = 3; k <= N - 3; k++) {
        for (var rB = 1; rB <= 5; rB++) {
          // the band at its own natural size, aimed at rows of equal height
          var tB = W / (((N - k) / rB) * 0.75);
          var Brows = split(pre, k, N, W, rB, tB);
          if (!Brows || !even(Brows, lo, hi)) continue;
          var TB = stack(Brows);
          var TA = inner - GAP - TB;
          if (TA < inner * 0.24 || TA > inner * 0.86) continue;

          for (var rA = 1; rA <= 6; rA++) {
            if (rA > k) continue;
            var sw = Math.round(W * 0.45), Arows = null, sh = null;
            for (var pass = 0; pass < 3; pass++) {
              Arows = split(pre, 0, k, sw, rA, (TA - (rA - 1) * GAP) / rA);
              if (!Arows) break;
              sh = shape(Arows);
              var solved = (TA + sh.c2) / sh.c1;
              if (!isFinite(solved) || solved <= 0) { Arows = null; break; }
              sw = Math.round(solved);
            }
            if (!Arows) continue;
            Arows = split(pre, 0, k, sw, rA, (TA - (rA - 1) * GAP) / rA);
            if (!Arows || !even(Arows, lo, hi)) continue;
            if (Math.abs(stack(Arows) - TA) > 2) continue;

            var hw = W - sw - GAP;
            if (hw < W * HERO_MIN || hw > W * HERO_MAX) continue;

            // how much of the hero this costs. cover crops from the centre,
            // so the number is the whole crop, split top and bottom
            var crop = Math.abs(1 - (hw / TA) / heroRatio);
            if (crop > cropCap) continue;

            // both regions hold the same kind of picture, so they have to be
            // about the same size as each other, not just internally tidy --
            // otherwise the strip reads as a second, lesser hero
            var ha = avgH(Arows), hb = avgH(Brows);
            if (Math.abs(ha - hb) / Math.max(ha, hb) > disp) continue;

            // The biggest hero wins, with the crop it costs charged against
            // it. Scoring by least crop instead -- which is what this did --
            // bought a 1% crop with a hero only 42% of the pane wide, paying
            // in the one thing the page is built around.
            var score = -hw + crop * 220;
            if (!out || score < out.score) {
              out = {
                top: { rows: Arows }, bot: { rows: Brows, total: TB },
                score: score, hw: hw, hh: Math.round(TA), sw: sw
              };
            }
          }
        }
      }
      return out;
    }

    var best = attempt(0.11, 0.36, 0.74, 1.36)
            || attempt(0.16, 0.44, 0.68, 1.48)
            || attempt(0.24, 0.58, 0.60, 1.70);

    // Last resort: no hero band at all, just one justified block of every
    // photograph. Plainer than intended, but it is a page of pictures that
    // fills the screen rather than a column that runs for twenty screens.
    if (!best) {
      var allR = tiles.map(ratioOf), allPre = prefix(allR), flat = null;
      for (var fr = 3; fr <= 8 && !flat; fr++) {
        var rows = split(allPre, 0, allR.length, W, fr, (inner - (fr - 1) * GAP) / fr);
        if (rows && stack(rows) <= inner + 0.5) flat = rows;
      }
      if (flat) {
        shots.style.height = H + 'px';
        var fband = document.createElement('div');
        fband.className = 'bband';
        fband.style.height = Math.round(stack(flat)) + 'px';
        paint(fband, allR, tiles, flat, W);
        shots.appendChild(fband);
      }
      return;
    }

    shots.style.height = H + 'px';
    var frag = document.createDocumentFragment();

    var hband = document.createElement('div');
    hband.className = 'hband';
    hband.style.height = best.hh + 'px';

    var strip = document.createElement('div');
    strip.className = 'hstrip';
    strip.style.width = best.sw + 'px';
    paint(strip, ratios, rest, best.top.rows, best.sw);
    hband.appendChild(strip);

    hero.style.width = best.hw + 'px';
    hero.style.height = best.hh + 'px';
    hband.appendChild(hero);
    frag.appendChild(hband);

    var bband = document.createElement('div');
    bband.className = 'bband';
    bband.style.height = Math.round(best.bot.total) + 'px';
    paint(bband, ratios, rest, best.bot.rows, W);
    frag.appendChild(bband);

    shots.appendChild(frag);
  }

  layout();
  // Fonts and images both shift the mosaic's top edge once they land.
  window.addEventListener('load', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

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
