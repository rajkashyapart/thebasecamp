// portfolio.js — mosaic grid + project windows
// ES5 syntax to match site convention

var projects = [
  // --- CONTENT & PERSONAL BRANDING ---
  {
    id: 'sarah-edwards',
    name: 'Sarah Edwards',
    subtitle: 'Copper + Cloves',
    category: 'content',
    description: 'Content direction and personal branding for Sarah Edwards of Copper + Cloves \u2014 building a voice that feels as warm as the brand itself.',
    items: [
      { type: 'photo', src: '', size: 'big' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'tall' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'wide' },
      { type: 'photo', src: '', size: 'reg' }
    ]
  },
  {
    id: 'upsurge-labs',
    name: 'Upsurge Labs',
    subtitle: 'Tech Content',
    category: 'content',
    description: 'Content strategy and production for Upsurge Labs \u2014 making tech feel human.',
    items: [
      { type: 'photo', src: '', size: 'wide' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'tall' },
      { type: 'photo', src: '', size: 'reg' }
    ]
  },
  {
    id: 'fresh-factory',
    name: 'The Fresh Factory',
    subtitle: 'F&B Content',
    category: 'content',
    description: 'Brand content for The Fresh Factory \u2014 fresh produce, honest storytelling.',
    items: [
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'wide' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'tall' }
    ]
  },
  // --- FOOD & BEVERAGE ---
  {
    id: 'fifty50-menu',
    name: 'Fifty 50 Menu',
    subtitle: 'Food & Beverage',
    category: 'fnb',
    description: 'Menu design and food photography for Fifty 50.',
    items: [
      { type: 'photo', src: '', size: 'tall' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'wide' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'reg' }
    ]
  },
  {
    id: 'christmas-cc',
    name: 'Come Spend Christmas With Us',
    subtitle: 'Copper + Cloves',
    category: 'fnb',
    description: 'A holiday campaign for Copper + Cloves \u2014 warmth, spice, and everything nice.',
    items: [
      { type: 'photo', src: '', size: 'big' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'wide' },
      { type: 'photo', src: '', size: 'reg' }
    ]
  },
  {
    id: 'cc-menu',
    name: 'C+C Menu',
    subtitle: 'Copper + Cloves',
    category: 'fnb',
    description: 'Menu photography and layout for Copper + Cloves.',
    items: [
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'tall' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'wide' },
      { type: 'photo', src: '', size: 'reg' }
    ]
  },
  // --- EVENTS ---
  {
    id: 'ame-pashm',
    name: 'AME',
    subtitle: 'Pashm',
    category: 'events',
    description: 'Event coverage and content for AME by Pashm.',
    items: [
      { type: 'photo', src: '', size: 'wide' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'tall' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'reg' }
    ]
  },
  {
    id: 'cultfit-release',
    name: 'Cultfit Release Event',
    subtitle: 'Cult.fit',
    category: 'events',
    description: 'Event documentation and content for the Cult.fit release.',
    items: [
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'big' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'wide' }
    ]
  },
  // --- PERSONAL ---
  {
    id: 'personal',
    name: 'Personal',
    subtitle: 'Photos',
    category: 'personal',
    playgroundLink: true,
    description: 'Photographs from life, wandering, and the in-between.',
    items: [
      { type: 'photo', src: '', size: 'tall' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'wide' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'big' }
    ]
  }
];

// Placeholder colors for empty src
var placeholderColors = [
  '#d4c5b4', '#c2b3a0', '#bfad98', '#d0c0ae', '#c8b8a4',
  '#b8a892', '#d6c8b8', '#c4b6a2', '#ccbdab', '#daced0'
];

// ---- State ----
var openWin = null;
var openWinId = null;
var carouselState = null;
var zTop = 800;
var hlsInstances = [];

// ---- Init ----
function initPortfolio() {
  buildMosaic();
  staggerReveal();
  bindOverlay();
  bindKeyboard();
  initLens();
}

// ---- Glass sphere cursor ----
function initLens() {
  var lens = document.getElementById('port-lens');
  var mosaic = document.getElementById('port-mosaic');
  if (!lens || !mosaic) return;

  var lensX = 0, lensY = 0, targetX = 0, targetY = 0;
  var isActive = false;
  var rafId = null;
  var hasFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  // Spring-like lerp for smooth follow
  function tick() {
    lensX += (targetX - lensX) * 0.15;
    lensY += (targetY - lensY) * 0.15;
    lens.style.left = lensX + 'px';
    lens.style.top = lensY + 'px';
    rafId = requestAnimationFrame(tick);
  }

  function showLens() {
    if (isActive) return;
    isActive = true;
    lens.classList.add('active');
    rafId = requestAnimationFrame(tick);
  }

  function hideLens() {
    if (!isActive) return;
    isActive = false;
    lens.classList.remove('active');
    cancelAnimationFrame(rafId);
  }

  if (hasFinePointer) {
    // Desktop: follow mouse
    var screen = document.getElementById('screen-port');
    screen.addEventListener('mousemove', function(e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isActive) {
        lensX = e.clientX;
        lensY = e.clientY;
        lens.style.left = lensX + 'px';
        lens.style.top = lensY + 'px';
      }
      showLens();
    });
    screen.addEventListener('mouseleave', function() {
      hideLens();
    });
    // Hide lens when window is open
  } else {
    // Mobile: show on touch, follow finger
    mosaic.addEventListener('touchstart', function(e) {
      var t = e.touches[0];
      targetX = t.clientX; targetY = t.clientY;
      lensX = t.clientX; lensY = t.clientY;
      lens.style.left = lensX + 'px';
      lens.style.top = lensY + 'px';
      showLens();
    }, { passive: true });
    mosaic.addEventListener('touchmove', function(e) {
      var t = e.touches[0];
      targetX = t.clientX; targetY = t.clientY;
    }, { passive: true });
    mosaic.addEventListener('touchend', function() {
      hideLens();
    });
  }
}

// ---- Build Mosaic Grid ----
function buildMosaic() {
  var mosaic = document.getElementById('port-mosaic');
  if (!mosaic) return;

  // Flatten all project items into grid cells
  var cells = [];
  for (var p = 0; p < projects.length; p++) {
    var proj = projects[p];
    for (var i = 0; i < proj.items.length; i++) {
      cells.push({
        project: proj,
        item: proj.items[i],
        itemIndex: i
      });
    }
  }

  // Shuffle cells for organic mix (deterministic seed for consistency)
  var shuffled = shuffleWithSeed(cells, 42);

  for (var c = 0; c < shuffled.length; c++) {
    var cell = shuffled[c];
    var el = document.createElement('div');
    el.className = 'mo-cell';
    if (cell.item.size === 'wide') el.className += ' mo-cell--wide';
    else if (cell.item.size === 'tall') el.className += ' mo-cell--tall';
    else if (cell.item.size === 'big') el.className += ' mo-cell--big';

    el.setAttribute('data-name', cell.project.name);
    el.setAttribute('data-project', cell.project.id);
    el.setAttribute('data-item-index', cell.itemIndex);

    if (cell.item.src) {
      if (cell.item.type === 'video') {
        var vid = document.createElement('video');
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.setAttribute('playsinline', '');
        vid.setAttribute('webkit-playsinline', '');
        vid.draggable = false;
        el.appendChild(vid);
        el.setAttribute('data-hls', cell.item.src);
      } else {
        var img = document.createElement('img');
        img.loading = 'lazy';
        img.draggable = false;
        img.alt = cell.project.name;
        img.src = cell.item.src;
        el.appendChild(img);
      }
    } else {
      // Placeholder for empty src
      el.style.backgroundColor = placeholderColors[c % placeholderColors.length];
    }

    el.addEventListener('click', (function(projId, clickedEl) {
      return function() { openProjectWindow(projId, clickedEl); };
    })(cell.project.id, el));

    mosaic.appendChild(el);
  }

  // Set up IntersectionObserver for video autoplay
  setupVideoObserver();
}

// Deterministic shuffle (Fisher-Yates with seeded random)
function shuffleWithSeed(arr, seed) {
  var a = arr.slice();
  var s = seed;
  function rand() {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  }
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(rand() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

// ---- Video Observer (play/pause on visibility) ----
function setupVideoObserver() {
  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      var vid = entries[i].target.querySelector('video');
      if (!vid) continue;
      if (entries[i].isIntersecting) {
        var hlsSrc = entries[i].target.getAttribute('data-hls');
        if (hlsSrc && !vid.src && !vid._hlsInit) {
          initHls(vid, hlsSrc);
          vid._hlsInit = true;
        }
        vid.play().catch(function(){});
      } else {
        vid.pause();
      }
    }
  }, { threshold: 0.3 });

  var cells = document.querySelectorAll('.mo-cell[data-hls]');
  for (var i = 0; i < cells.length; i++) {
    observer.observe(cells[i]);
  }
}

// ---- HLS Init ----
function initHls(videoEl, src) {
  if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
    videoEl.src = src;
    videoEl.play().catch(function(){});
  } else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
    var hls = new Hls({ enableWorker: true, startLevel: -1, maxBufferLength: 10 });
    hls.loadSource(src);
    hls.attachMedia(videoEl);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      videoEl.play().catch(function(){});
    });
    hlsInstances.push(hls);
    videoEl._hls = hls;
  }
}

// ---- Stagger Reveal ----
function staggerReveal() {
  // Header elements
  var objs = document.querySelectorAll('.port-obj');
  for (var i = 0; i < objs.length; i++) {
    (function(el, delay) {
      setTimeout(function() { el.classList.add('in'); }, delay);
    })(objs[i], 180 + i * 140);
  }

  // Grid cells — IntersectionObserver for scroll-based reveal
  if ('IntersectionObserver' in window) {
    var cellObserver = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('in');
          cellObserver.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px 60px 0px' });

    var cells = document.querySelectorAll('.mo-cell');
    for (var i = 0; i < cells.length; i++) {
      (function(el, idx) {
        setTimeout(function() { cellObserver.observe(el); }, idx * 30);
      })(cells[i], i);
    }
  } else {
    var fallbackCells = document.querySelectorAll('.mo-cell');
    for (var i = 0; i < fallbackCells.length; i++) { fallbackCells[i].classList.add('in'); }
  }
}

// ---- Open Project Window ----
function openProjectWindow(projectId, clickedEl) {
  if (openWin) closeProjectWindow();

  var proj = null;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].id === projectId) { proj = projects[i]; break; }
  }
  if (!proj) return;

  var delay = openWin ? 80 : 0;
  setTimeout(function() {
    var win = document.createElement('div');
    win.className = 'window';
    win.id = 'win-' + proj.id;
    win.style.zIndex = ++zTop;

    // Transform origin from clicked cell
    if (window.innerWidth >= 640 && clickedEl) {
      var r = clickedEl.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var ox = Math.max(20, Math.min(80, (cx / window.innerWidth * 100)));
      var oy = Math.max(20, Math.min(80, (cy / window.innerHeight * 100)));
      win.style.setProperty('--origin-x', ox + '%');
      win.style.setProperty('--origin-y', oy + '%');
    }

    win.style.left = '50%';
    win.style.top = '50%';

    var categoryLabel = proj.category === 'content' ? 'content' :
                        proj.category === 'fnb' ? 'f&amp;b' :
                        proj.category === 'events' ? 'events' : 'personal';

    var slidesHtml = '';
    var hasItems = false;
    for (var s = 0; s < proj.items.length; s++) {
      var item = proj.items[s];
      hasItems = true;
      if (item.src) {
        if (item.type === 'video') {
          slidesHtml += '<div class="wcarousel-slide" data-hls-src="' + item.src + '"><video muted loop playsinline webkit-playsinline></video></div>';
        } else {
          slidesHtml += '<div class="wcarousel-slide"><img src="' + item.src + '" alt="' + proj.name + '" draggable="false"></div>';
        }
      } else {
        slidesHtml += '<div class="wcarousel-slide wcarousel-slide--placeholder" style="background:' + placeholderColors[s % placeholderColors.length] + ';"><span class="wcarousel-placeholder-text">' + proj.name + '</span></div>';
      }
    }

    var playgroundLinkHtml = proj.playgroundLink ?
      '<a href="playground.html" class="w-next" style="text-decoration:none;">visit playground &rarr;</a>' : '';

    var escHint = window.innerWidth >= 640 ? '<div class="esc-hint"><kbd>esc</kbd> to close</div>' : '';

    win.innerHTML =
      '<div class="winbar" id="tb-' + proj.id + '">' +
        '<div class="traffic"><div class="td td-x" data-close="' + proj.id + '"></div><div class="td td-m" data-close="' + proj.id + '"></div><div class="td td-z"></div></div>' +
        '<div style="display:flex;align-items:center;gap:8px;flex:1;">' +
          '<div class="wmeta"><strong>' + proj.name + '</strong><span>' + proj.subtitle + '</span></div>' +
        '</div>' +
        '<span class="wtag-top">' + categoryLabel + '</span>' +
      '</div>' +
      '<div class="wbody">' +
        '<p class="w-p" style="margin-bottom:16px;">' + proj.description + '</p>' +
        (hasItems ? (
          '<div class="wcarousel">' +
            '<div class="wcarousel-track">' + slidesHtml + '</div>' +
            '<button class="wcarousel-arrow wcarousel-arrow--l" aria-label="Previous">&#8249;</button>' +
            '<button class="wcarousel-arrow wcarousel-arrow--r" aria-label="Next">&#8250;</button>' +
          '</div>' +
          '<div class="wcarousel-counter">1 / ' + proj.items.length + '</div>'
        ) : '') +
        playgroundLinkHtml +
        '<button class="w-close-btn" data-close="' + proj.id + '">\u2715 Close</button>' +
        escHint +
      '</div>';

    var screen = document.getElementById('screen-port');
    screen.appendChild(win);
    openWin = win;
    openWinId = proj.id;

    document.getElementById('win-overlay').classList.add('active');
    // Hide lens while window is open
    var lens = document.getElementById('port-lens');
    if (lens) lens.classList.remove('active');

    var closeEls = win.querySelectorAll('[data-close]');
    for (var ci = 0; ci < closeEls.length; ci++) {
      closeEls[ci].addEventListener('click', function(e) {
        e.stopPropagation();
        closeProjectWindow();
      });
    }

    win.addEventListener('mousedown', function(e) {
      e.stopPropagation();
      win.style.zIndex = ++zTop;
    });
    win.addEventListener('touchstart', function(e) { e.stopPropagation(); }, { passive: true });

    if (window.innerWidth >= 640) {
      attachWinDrag(win, win.querySelector('#tb-' + proj.id));
    }

    var carousel = win.querySelector('.wcarousel');
    if (carousel) {
      initCarousel(carousel, win);
    }
  }, delay);
}

// ---- Close Window ----
function closeProjectWindow() {
  if (!openWin) return;
  openWin.classList.add('closing');

  var vids = openWin.querySelectorAll('video');
  for (var i = 0; i < vids.length; i++) {
    if (vids[i]._hls) {
      vids[i]._hls.destroy();
      vids[i]._hls = null;
    }
  }

  var w = openWin;
  setTimeout(function() { w.remove(); }, 120);
  openWin = null;
  openWinId = null;
  carouselState = null;
  document.getElementById('win-overlay').classList.remove('active');
}

// ---- Window Drag ----
function attachWinDrag(win, handle) {
  var sX, sY, sL, sT;
  handle.addEventListener('mousedown', function(e) {
    if (e.target.classList.contains('td')) return;
    e.preventDefault();
    sX = e.clientX; sY = e.clientY;
    sL = parseFloat(win.style.left) || 0;
    sT = parseFloat(win.style.top) || 0;
    win.style.zIndex = ++zTop;
    function mv(e) {
      win.style.left = (sL + e.clientX - sX) + 'px';
      win.style.top = Math.max(0, (sT + e.clientY - sY)) + 'px';
    }
    function up() {
      document.removeEventListener('mousemove', mv);
      document.removeEventListener('mouseup', up);
    }
    document.addEventListener('mousemove', mv);
    document.addEventListener('mouseup', up);
  });
}

// ---- Carousel ----
function initCarousel(wrapEl, winEl) {
  var track = wrapEl.querySelector('.wcarousel-track');
  var slides = wrapEl.querySelectorAll('.wcarousel-slide');
  var counter = winEl.querySelector('.wcarousel-counter');
  var arrowL = wrapEl.querySelector('.wcarousel-arrow--l');
  var arrowR = wrapEl.querySelector('.wcarousel-arrow--r');
  var current = 0;
  var total = slides.length;

  carouselState = { goTo: goTo, current: current, total: total };

  function goTo(idx) {
    if (idx < 0) idx = 0;
    if (idx >= total) idx = total - 1;
    current = idx;
    carouselState.current = current;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    if (counter) counter.textContent = (current + 1) + ' / ' + total;

    for (var i = 0; i < slides.length; i++) {
      var vid = slides[i].querySelector('video');
      if (!vid) continue;
      if (i === current) {
        var hlsSrc = slides[i].getAttribute('data-hls-src');
        if (hlsSrc && !vid._hlsInit) {
          initHls(vid, hlsSrc);
          vid._hlsInit = true;
        }
        vid.play().catch(function(){});
      } else {
        vid.pause();
      }
    }
  }

  // Init first slide video
  if (slides[0]) {
    var firstVid = slides[0].querySelector('video');
    var firstHls = slides[0].getAttribute('data-hls-src');
    if (firstVid && firstHls && !firstVid._hlsInit) {
      initHls(firstVid, firstHls);
      firstVid._hlsInit = true;
      firstVid.play().catch(function(){});
    }
  }

  arrowL.addEventListener('click', function(e) { e.stopPropagation(); goTo(current - 1); });
  arrowR.addEventListener('click', function(e) { e.stopPropagation(); goTo(current + 1); });

  // Touch swipe
  var startX = 0, startY = 0, dx = 0, swiping = false;
  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    dx = 0; swiping = true;
    track.style.transition = 'none';
  }, { passive: true });

  track.addEventListener('touchmove', function(e) {
    if (!swiping) return;
    dx = e.touches[0].clientX - startX;
    var dy = Math.abs(e.touches[0].clientY - startY);
    if (dy > Math.abs(dx)) { swiping = false; return; }
    var offset = -(current * 100) + (dx / track.offsetWidth * 100);
    track.style.transform = 'translateX(' + offset + '%)';
  }, { passive: true });

  track.addEventListener('touchend', function() {
    track.style.transition = '';
    if (!swiping) { goTo(current); return; }
    if (dx < -40) goTo(current + 1);
    else if (dx > 40) goTo(current - 1);
    else goTo(current);
    swiping = false;
  });
}

// ---- Overlay + Keyboard ----
function bindOverlay() {
  var overlay = document.getElementById('win-overlay');
  if (overlay) {
    overlay.addEventListener('click', function() { closeProjectWindow(); });
  }
}

function bindKeyboard() {
  document.addEventListener('keydown', function(e) {
    if (!openWin) return;
    if (e.key === 'Escape') { closeProjectWindow(); return; }
    if (carouselState) {
      if (e.key === 'ArrowLeft') { carouselState.goTo(carouselState.current - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { carouselState.goTo(carouselState.current + 1); e.preventDefault(); }
    }
  });
}

// ---- Boot ----
document.addEventListener('DOMContentLoaded', initPortfolio);
