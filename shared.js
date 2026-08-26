// The nav.
//
// A floating capsule at the bottom centre, after oddfellows.tv.
//
// Raj, 2026-08-26: "there are too many things in the nav bar. i wanna reduce
// options for a visitor while keeping the same amount of context in the page."
// Six items became three on the front page and four everywhere else, and
// nothing became unreachable -- what came out of the bar went into a panel
// under the item it belongs to.
//
// He named the two visitors this has to serve: someone who wants to see the
// work and the capabilities, and someone who already knows and is trying to
// get in touch. So there are exactly two panels, one for each of them, and
// each is one gesture deep from every page on the site.
//
//   playground   only when you are not already on it. Raj's own idea, off
//                oddfellows: the slot for where you are is a wasted slot.
//                Their version relabels it "home"; his word for home is
//                playground, so the item simply is not there instead.
//   work         -> the reel. Hovering gives the two pages the work lives on
//                and nothing from inside them. Raj, 2026-08-26: "work should
//                only show 2 things upon pop up, not the options within the
//                subpages as well." The six studies were in here and they
//                were the panel deciding for the visitor which study to read.
//   about        -> about. Nothing underneath it, so no panel.
//   contact      -> work with me, and the panel says so in his words. One
//                option: the panel is what the word means, not a menu.
//
// The markup lives here rather than in seven HTML files. It was duplicated
// across all of them, which is how the old bar ended up carrying a dead
// <i class="nav-ink"> in six copies. The anchors are still real anchors.
//
//   #pg-nav
//     .nav-panel        height 0 -> measured, grows the capsule upward
//       .nav-panel-in   contents, crossfaded in behind the growth
//     .nav-row          the links, welded to the bottom edge
//       .pg-links
//         .nav-pill     one mark, moved by transform

var NAV = [
  { key: 'playground', label: 'playground', href: 'playground.html',
    hideOn: ['playground.html', 'index.html'] },
  { key: 'work', label: 'work', href: 'portfolio.html', panel: 'work',
    owns: ['portfolio.html', 'case-studies.html'] },
  { key: 'about', label: 'about', href: 'about.html', owns: ['about.html'] },
  { key: 'contact', label: 'contact', href: 'hub.html', panel: 'contact',
    owns: ['hub.html', 'ciad.html'] }
];


var NAV_OPEN_DELAY = 160;   // ms of hover before a panel unfolds
var NAV_PANEL_MS = 340;     // matches the height transition in styles.css

function navPage() {
  var p = location.pathname.split('/').pop();
  return p === '' ? 'index.html' : p;
}

function initNav() {
  var nav = document.getElementById('pg-nav');
  if (!nav) return;

  var here = navPage();
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  // index.html hides the nav until the intro is done
  if (!document.getElementById('screen-video')) nav.classList.add('nav-visible');

  // ── structure ──────────────────────────────────────────────────────────
  var panel = document.createElement('div');
  panel.className = 'nav-panel';
  var panelIn = document.createElement('div');
  panelIn.className = 'nav-panel-in';
  panel.appendChild(panelIn);

  var row = document.createElement('div');
  row.className = 'nav-row';
  var links = document.createElement('div');
  links.className = 'pg-links';
  row.appendChild(links);

  nav.innerHTML = '';
  nav.appendChild(panel);
  nav.appendChild(row);

  var byKey = {};
  var active = null;

  for (var i = 0; i < NAV.length; i++) {
    var item = NAV[i];
    if (item.hideOn && item.hideOn.indexOf(here) !== -1) continue;
    var a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    a.setAttribute('data-key', item.key);
    if (item.panel) a.setAttribute('aria-expanded', 'false');
    if (item.owns && item.owns.indexOf(here) !== -1) {
      a.classList.add('active');
      active = a;
    }
    links.appendChild(a);
    byKey[item.key] = a;
  }

  var pill = document.createElement('i');
  pill.className = 'nav-pill idle';
  pill.setAttribute('aria-hidden', 'true');
  links.appendChild(pill);

  var items = Array.prototype.slice.call(links.querySelectorAll('a'));

  // ── the pill ───────────────────────────────────────────────────────────
  // transform + width rather than left + width: the element is absolutely
  // positioned so a width change relayouts nothing but itself, and the travel
  // is the part the eye follows.
  var home = null;

  function place(el, roaming, silent) {
    // The label under the mark has to be legible against the mark, not
    // against the bar: near-black on the pink fill, warm white on the blue
    // wash. So the class travels with the pill.
    items.forEach(function (n) { n.classList.remove('pill-here'); });
    nav.classList.toggle('nav-roam', !!roaming);
    if (!el) { pill.classList.add('idle'); return; }
    el.classList.add('pill-here');
    var a = el.getBoundingClientRect(), b = links.getBoundingClientRect();
    if (silent) pill.style.transition = 'none';
    pill.classList.remove('idle');
    pill.classList.toggle('roaming', !!roaming);
    // 8px of air either side, so the mark is a mark and not a button
    pill.style.width = (a.width + 16) + 'px';
    pill.style.transform = 'translateX(' + (a.left - b.left - 8) + 'px)';
    if (silent) {
      // one frame with the transition off, or every page load slides the pill
      // in from x=0 -- which is not a navigation, so it should not animate
      pill.offsetHeight;
      pill.style.transition = '';
    }
  }

  function rest(silent) { home = active; place(home, false, silent); }
  rest(true);

  // Fonts land after this runs and every label changes width with them, so
  // the mark would sit off its word for the first second of the page.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { rest(true); });
  }

  // ── the panels ─────────────────────────────────────────────────────────
  // No section heads and no second lines. A panel that lists what is inside
  // the pages it points at is the panel making the choice for the visitor,
  // which is the opposite of what this pass is for. The head element is only
  // built where there is no hover, because that is the only place the close
  // button has a job.
  function link(href, text) {
    return '<a href="' + href + '">' + text + '</a>';
  }

  function panelHTML(kind) {
    var rows = kind === 'work'
      ? link('portfolio.html', 'things i&rsquo;ve made') +
        link('case-studies.html', 'capabilities')
      : link('hub.html', 'let&rsquo;s build something');
    return (fine ? '' : '<div class="nav-panel-head"></div>') +
           '<div class="nav-panel-list">' + rows + '</div>';
  }

  var openKind = null;
  var hoverTimer = null;
  var closeTimer = null;

  // Raj, 2026-08-26: "once i hover on case studies, the pop up doesnt [go]
  // away even if i move mouse to somewhere else."
  //
  // pointerleave on the nav was the only thing closing it, and the nav is
  // 664x288 while a panel is open -- so moving along the bar to another link,
  // which is exactly where the mouse goes next, never left the box. Landing on
  // any other item closes it now, and so does the pointer being outside the
  // capsule at all, watched at the document because an element that resizes
  // under the cursor does not fire a leave event reliably.
  function outside(e) {
    var r = nav.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right ||
        e.clientY < r.top || e.clientY > r.bottom) closePanel();
  }
  function watch(on) {
    var m = on ? 'addEventListener' : 'removeEventListener';
    document[m]('pointermove', outside, { passive: true });
    window[m]('wheel', closePanel, { passive: true });
  }

  function measure() {
    // height:auto does not transition, so the box is told the number
    var prev = panel.style.height;
    panel.style.height = 'auto';
    var h = panel.scrollHeight;
    panel.style.height = prev;
    panel.offsetHeight;
    return h;
  }

  function setExpanded(kind) {
    items.forEach(function (el) {
      if (el.hasAttribute('aria-expanded')) {
        el.setAttribute('aria-expanded', el.getAttribute('data-key') === kind ? 'true' : 'false');
      }
    });
  }

  function openPanel(kind) {
    clearTimeout(closeTimer);
    if (openKind === kind) return;
    var html = panelHTML(kind);

    var first = openKind === null;
    openKind = kind;
    panelIn.innerHTML = html;

    var head = panelIn.querySelector('.nav-panel-head');
    if (head) {
      var x = document.createElement('button');
      x.type = 'button';
      x.className = 'nav-close';
      x.setAttribute('aria-label', 'close');
      x.innerHTML = '&#10005;';
      x.addEventListener('click', function (e) { e.preventDefault(); closePanel(); });
      head.appendChild(x);
    }

    nav.classList.add('nav-open');
    panel.style.height = measure() + 'px';
    watch(true);
    setExpanded(kind);
    // swapping contents while already open should not re-run the fade
    panelIn.style.transitionDelay = first ? '' : '0s';
  }

  function closePanel() {
    if (openKind === null) return;
    openKind = null;
    watch(false);
    nav.classList.remove('nav-open');
    panel.style.height = '0px';
    setExpanded(null);
    // the contents come out with the box rather than being cut at the end
    closeTimer = setTimeout(function () {
      if (openKind === null) panelIn.innerHTML = '';
    }, NAV_PANEL_MS);
  }

  // ── what opens them ────────────────────────────────────────────────────
  items.forEach(function (el) {
    var kind = el.getAttribute('data-key');
    var hasPanel = el.hasAttribute('aria-expanded');

    if (fine) {
      el.addEventListener('pointerenter', function () {
        place(el, el !== home);
        clearTimeout(hoverTimer);
        if (hasPanel) {
          hoverTimer = setTimeout(function () { openPanel(kind); }, NAV_OPEN_DELAY);
        } else if (openKind !== null) {
          // arriving anywhere else in the bar is a decision to leave
          closePanel();
        }
      });
      el.addEventListener('pointerleave', function () { clearTimeout(hoverTimer); });
      return;
    }

    // No hover here, so a panel would be unreachable and the six studies with
    // it -- portfolio.html has no other link to them. First tap opens, and the
    // panel leads with the page the item points at, so the destination is a
    // visible row rather than a hidden second tap.
    if (!hasPanel) return;
    el.addEventListener('click', function (e) {
      if (openKind === kind) return;   // second tap follows the link
      e.preventDefault();
      openPanel(kind);
    });
  });

  if (fine) {
    links.addEventListener('pointerleave', function () { rest(false); });
    nav.addEventListener('pointerleave', function () {
      clearTimeout(hoverTimer);
      closePanel();
    });
  }

  document.addEventListener('click', function (e) {
    if (openKind !== null && !nav.contains(e.target)) closePanel();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openKind !== null) {
      var k = byKey[openKind];
      closePanel();
      if (k) k.focus();
    }
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
