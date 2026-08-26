// The nav.
//
// A floating capsule at the bottom centre, after oddfellows.tv. Raj,
// 2026-08-26, picked the placement and two behaviours off that reference and
// left the rest: the material stays warm paper, the link set stays ours.
//
// Everything below builds on markup that is already in all seven HTML files
// -- a brand and five anchors -- rather than editing seven files to add a
// wrapper, a pill and two panels. The anchors stay real anchors; they are
// only re-parented.
//
//   #pg-nav
//     .nav-panel        height 0 -> measured, grows the capsule upward
//       .nav-panel-in   contents, crossfaded in behind the growth
//     .nav-row          brand + links, welded to the bottom edge
//       .pg-links
//         .nav-pill     one mark, moved by transform
//
// The capsule is bottom-anchored, so growing the panel moves its top edge up
// and the row never moves. That is the difference between one object getting
// bigger and a popover appearing above a bar.

// ── contact ──────────────────────────────────────────────────────────────
// Every one of these already exists somewhere on the site -- the first two in
// About's last line, the third on CIAD's button. Nothing here is written.
var NAV_CONTACT = [
  { label: 'email', text: 'hello@rajkashyap.studio', href: 'mailto:hello@rajkashyap.studio' },
  { label: 'instagram', text: 'uncurated.raj', href: 'https://instagram.com/uncurated.raj' },
  { label: 'book a call', text: 'content in a day', href: 'https://calendly.com/shootwraj/content-in-a-day' }
];

var NAV_OPEN_DELAY = 160;   // ms of hover before case studies unfolds
var NAV_PANEL_MS = 340;     // matches the height transition in styles.css

function initNav() {
  var nav = document.getElementById('pg-nav');
  if (!nav) return;

  // index.html hides the nav until the intro is done
  var isIntro = document.getElementById('screen-video');
  if (!isIntro) nav.classList.add('nav-visible');

  var brand = nav.querySelector('.pg-brand');
  var links = nav.querySelector('.pg-links');
  if (!links) return;

  // ── structure ──────────────────────────────────────────────────────────
  var row = document.createElement('div');
  row.className = 'nav-row';
  if (brand) row.appendChild(brand);
  row.appendChild(links);

  var panel = document.createElement('div');
  panel.className = 'nav-panel';
  var panelIn = document.createElement('div');
  panelIn.className = 'nav-panel-in';
  panel.appendChild(panelIn);

  nav.appendChild(panel);
  nav.appendChild(row);

  // the underline the pill replaces
  var oldInk = nav.querySelector('.nav-ink');
  if (oldInk && oldInk.parentNode) oldInk.parentNode.removeChild(oldInk);

  // ── contact: the one item with no page behind it ───────────────────────
  var contactBtn = document.createElement('button');
  contactBtn.type = 'button';
  contactBtn.id = 'nav-contact';
  contactBtn.setAttribute('aria-expanded', 'false');
  contactBtn.textContent = 'Contact';
  links.appendChild(contactBtn);

  var pill = document.createElement('i');
  pill.className = 'nav-pill idle';
  pill.setAttribute('aria-hidden', 'true');
  links.appendChild(pill);

  var items = Array.prototype.slice.call(links.querySelectorAll('a,button'));
  var active = links.querySelector('a.active');

  // ── the pill ───────────────────────────────────────────────────────────
  // transform + width rather than left + width: the element is absolutely
  // positioned so a width change relayouts nothing but itself, and the travel
  // is the part the eye follows.
  var home = null;

  function boxOf(el) {
    var a = el.getBoundingClientRect(), b = links.getBoundingClientRect();
    return { x: a.left - b.left, w: a.width };
  }

  function place(el, roaming, silent) {
    if (!el) { pill.classList.add('idle'); return; }
    var box = boxOf(el);
    if (silent) pill.style.transition = 'none';
    pill.classList.remove('idle');
    pill.classList.toggle('roaming', !!roaming);
    // 8px of air either side, so the mark is a mark and not a button
    pill.style.width = (box.w + 16) + 'px';
    pill.style.transform = 'translateX(' + (box.x - 8) + 'px)';
    if (silent) {
      // one frame with the transition off, or every page load slides the pill
      // in from x=0 -- which is not a navigation, so it should not animate
      pill.offsetHeight;
      pill.style.transition = '';
    }
  }

  function rest(silent) {
    home = active;
    place(home, false, silent);
  }

  rest(true);

  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    items.forEach(function (el) {
      el.addEventListener('pointerenter', function () { place(el, el !== home); });
    });
    links.addEventListener('pointerleave', function () { rest(false); });
  }

  // Fonts land after this runs and every label changes width with them, so
  // the mark would sit off its word for the first second of the page.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { rest(true); });
  }

  // ── the panels ─────────────────────────────────────────────────────────
  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function contactHTML() {
    var rows = '';
    for (var i = 0; i < NAV_CONTACT.length; i++) {
      var c = NAV_CONTACT[i];
      var ext = c.href.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '';
      rows += '<a href="' + c.href + '"' + ext + '>' + esc(c.text) +
              '<span class="np-sub">' + esc(c.label) + '</span></a>';
    }
    // "say hello" is his, off About's last line -- the same sentence these
    // three links were taken from. Not a label I wrote.
    return '<div class="nav-panel-head"><div class="nav-panel-label">say hello</div></div>' +
           '<div class="nav-panel-list">' + rows + '</div>';
  }

  // The six come from CASE_STUDIES, the array case-studies.html already
  // renders its list from. Never a second copy of the names here -- that is
  // the same rule that keeps the five multiples in one place.
  function studiesHTML() {
    if (typeof CASE_STUDIES === 'undefined') return '';
    var rows = '';
    for (var i = 0; i < CASE_STUDIES.length; i++) {
      var cs = CASE_STUDIES[i];
      rows += '<a href="case-studies.html#' + cs.id + '">' + cs.client +
              '<span class="np-sub">' + cs.sector + '</span></a>';
    }
    // counted, never typed: a seventh study would make a hardcoded "six" a lie
    return '<div class="nav-panel-head"><div class="nav-panel-label">' +
             CASE_STUDIES.length + ' studies</div></div>' +
           '<div class="nav-panel-list">' + rows + '</div>';
  }

  var openKind = null;
  var hoverTimer = null;
  var closeTimer = null;

  function measure() {
    // height:auto does not transition, so the box is told the number. Read it
    // off the contents with the panel briefly unclipped.
    var prev = panel.style.height;
    panel.style.height = 'auto';
    var h = panel.scrollHeight;
    panel.style.height = prev;
    panel.offsetHeight;
    return h;
  }

  function openPanel(kind) {
    clearTimeout(closeTimer);
    if (openKind === kind) return;
    var html = kind === 'contact' ? contactHTML() : studiesHTML();
    if (!html) return;

    var first = openKind === null;
    openKind = kind;
    panelIn.innerHTML = html;

    if (kind === 'contact') {
      var x = document.createElement('button');
      x.type = 'button';
      x.className = 'nav-close';
      x.setAttribute('aria-label', 'close');
      x.innerHTML = '&#10005;';
      x.addEventListener('click', closePanel);
      var head = panelIn.querySelector('.nav-panel-head');
      if (head) head.appendChild(x);
    }

    nav.classList.add('nav-open');
    panel.style.height = measure() + 'px';
    contactBtn.setAttribute('aria-expanded', kind === 'contact' ? 'true' : 'false');
    // swapping contents while already open should not re-run the fade
    if (!first) panelIn.style.transitionDelay = '0s';
    else panelIn.style.transitionDelay = '';
  }

  function closePanel() {
    if (openKind === null) return;
    openKind = null;
    nav.classList.remove('nav-open');
    panel.style.height = '0px';
    contactBtn.setAttribute('aria-expanded', 'false');
    // the contents come out with the box rather than being cut at the end
    closeTimer = setTimeout(function () {
      if (openKind === null) panelIn.innerHTML = '';
    }, NAV_PANEL_MS);
  }

  contactBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (openKind === 'contact') closePanel();
    else openPanel('contact');
  });

  // Case studies keeps its href and navigates on click. The panel is a
  // desktop shortcut on the way to it, not a replacement for it -- which is
  // also why it is hover-only: on a touch screen the tap is the navigation.
  var csLink = document.getElementById('pg-cs-link');
  if (csLink && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    csLink.addEventListener('pointerenter', function () {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () { openPanel('studies'); }, NAV_OPEN_DELAY);
    });
    csLink.addEventListener('pointerleave', function () { clearTimeout(hoverTimer); });
    nav.addEventListener('pointerleave', function () {
      clearTimeout(hoverTimer);
      if (openKind === 'studies') closePanel();
    });
  }

  document.addEventListener('click', function (e) {
    if (openKind !== null && !nav.contains(e.target)) closePanel();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openKind !== null) { closePanel(); contactBtn.focus(); }
  });

  // ── what the rest of the site sits on ──────────────────────────────────
  // The collapsed row plus the gap under it and the same again as air above,
  // published so no page hardcodes a number that drifts when the nav's type
  // changes. Measured off .nav-row, never off #pg-nav -- the capsule is
  // several hundred pixels tall while a panel is open and every page on the
  // site would reflow around it.
  var t = null;
  function measureNav() {
    var gap = parseFloat(getComputedStyle(nav).getPropertyValue('--nav-gap')) || 20;
    document.documentElement.style.setProperty('--nav-clear', (row.offsetHeight + gap * 2) + 'px');
  }
  measureNav();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureNav);
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(function () {
      measureNav();
      rest(true);
      if (openKind !== null) panel.style.height = measure() + 'px';
    }, 120);
  });
}

document.addEventListener('DOMContentLoaded', initNav);
