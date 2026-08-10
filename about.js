// About — justified photo mosaic.
//
// The mosaic has to fill the viewport on any screen and never crop a photo.
// A column masonry cannot do both: column count is a whole number, so the
// height jumps in steps and you get either an overflow or a dead band at the
// bottom. Justified rows fix it because row height is continuous.
//
// Standard algorithm: for a trial row height, greedily fill rows until each
// one is wide enough, then scale every row so its widths sum to exactly the
// available width. Binary-search the trial height until the total lands on
// the space we actually have.

function initAbout() {
  var shots = document.querySelector('.shots');
  if (!shots) return;

  var tiles = Array.prototype.slice.call(shots.querySelectorAll('.tile'));
  if (!tiles.length) return;

  var GAP = 7;
  // The most a row may be squeezed to make an arrangement fit. object-fit
  // crops from the centre, so 0.86 takes 7% off the top of a photograph and
  // 7% off the bottom -- a sliver, nowhere near the old bug where portrait
  // photos in landscape tiles lost people's heads.
  var MIN_SCALE = 0.86;

  var ratios = tiles.map(function (t) {
    var v = parseFloat(t.style.getPropertyValue('--ar'));
    if (v > 0) return v;
    var img = t.querySelector('img');
    return (img && img.naturalWidth) ? img.naturalWidth / img.naturalHeight : 0.75;
  });

  // Distance from the top of the mosaic to the bottom of the screen.
  // offsetTop walks up to the scroller, so this survives being scrolled.
  function available() {
    var screenEl = document.getElementById('screen-about');
    if (!screenEl) return 0;
    var top = 0, node = shots;
    while (node && node !== screenEl) { top += node.offsetTop; node = node.offsetParent; }
    return screenEl.clientHeight - top - 6;
  }

  // Rows for a given trial height. The final row is left at the trial height
  // rather than stretched: a short last row is normal, a last row scaled from
  // three photos to full width is a wall.
  function plan(h, W) {
    var rows = [], cur = [], sum = 0;
    for (var i = 0; i < tiles.length; i++) {
      cur.push(i);
      sum += ratios[i];
      if (sum * h + (cur.length - 1) * GAP >= W) { rows.push(cur); cur = []; sum = 0; }
    }
    var partial = cur.length > 0;
    if (partial) rows.push(cur);

    // No orphans. A last row holding one photograph, left-aligned against a
    // wall of white, looks like a mistake -- so borrow from the row above
    // until it has company, as long as that row can spare it.
    if (partial && rows.length > 1) {
      var last = rows[rows.length - 1], prev = rows[rows.length - 2];
      while (last.length < 3 && prev.length > 3) last.unshift(prev.pop());
      // once it is no longer a runt it can justify like any other row
      if (last.length >= 3) partial = false;
    }

    var out = [], total = 0;
    for (var r = 0; r < rows.length; r++) {
      var s = 0;
      rows[r].forEach(function (ix) { s += ratios[ix]; });
      var isRunt = partial && r === rows.length - 1;
      var rh = isRunt
        ? Math.min((W - (rows[r].length - 1) * GAP) / s, h * 1.3)
        : (W - (rows[r].length - 1) * GAP) / s;
      out.push({ items: rows[r], h: rh, stretch: !isRunt });
      total += rh + GAP;
    }
    return { rows: out, total: total - GAP };
  }

  // put every tile back as a direct child so a re-layout starts from scratch
  function unwrap() {
    var rows = shots.querySelectorAll('.srow');
    if (!rows.length) return;
    tiles.forEach(function (t) { shots.appendChild(t); });
    Array.prototype.forEach.call(rows, function (r) { r.remove(); });
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
    var availH = available();
    if (W <= 0 || availH <= 0) return;

    // Sweep the trial height rather than bisecting it. A binary search
    // converges on the boundary between "fits" and "does not", so it only
    // ever sees the arrangements either side of that one crossing -- and the
    // arrangement we want here is usually the one just past it, which the
    // search then throws away. The scan is 173 iterations of an 18-element
    // loop, which costs nothing.
    var fits = null, smallest = null, near = null;
    for (var trial = 70; trial <= 760; trial += 1) {
      var p = plan(trial, W);
      // the tallest arrangement that still fits, uncropped
      if (p.total <= availH) {
        if (!fits || p.total > fits.total) fits = p;
      } else if (p.total <= availH / MIN_SCALE) {
        // ...and the shortest that overshoots by little enough to be
        // squeezed back in. Scaling it down costs a crop of a few per cent,
        // which is the difference between a mosaic that fills the page and
        // one that floats in the middle of it.
        if (!near || p.total < near.total) near = p;
      }
      if (!smallest || p.total < smallest.total) smallest = p;
    }

    // 18 photographs at these ratios partition into about three rows or about
    // four and nothing in between: three leaves ~350px of the pane empty,
    // four spills over by ~30. Take the four and shrink it -- but only ever
    // by MIN_SCALE, so no photograph loses more than a sliver.
    var best = fits || smallest;
    if (near && (!fits || near.total * MIN_SCALE > fits.total)) best = near;

    var scale = best.total > availH ? availH / best.total : 1;

    // Pin the pane to the full height and centre the rows in it, so any
    // remainder reads as margin above and below, not a dead band at the
    // bottom.
    shots.style.height = availH + 'px';

    // Explicit row elements rather than flex-wrap. Relying on wrapping meant a
    // single subpixel of rounding could tip the last tile of a row onto the
    // next line, and every row after it came out ragged.
    var frag = document.createDocumentFragment();
    best.rows.forEach(function (r) {
      var rowEl = document.createElement('div');
      rowEl.className = 'srow';
      // Widths come from the unscaled height so the row still spans W
      // exactly; only the rendered height shrinks, and object-fit:cover
      // takes the difference off the top and bottom of each photograph.
      var hw = Math.floor(r.h), h = Math.floor(r.h * scale), used = 0;
      r.items.forEach(function (ix, idx) {
        var last = idx === r.items.length - 1;
        var w = (last && r.stretch)
          ? Math.max(1, Math.floor(W - used - idx * GAP))   // absorb the rounding
          : Math.floor(hw * ratios[ix]);
        used += w;
        tiles[ix].style.width = w + 'px';
        tiles[ix].style.height = h + 'px';
        rowEl.appendChild(tiles[ix]);
      });
      frag.appendChild(rowEl);
    });
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

document.addEventListener('DOMContentLoaded', function () { initAbout(); });
