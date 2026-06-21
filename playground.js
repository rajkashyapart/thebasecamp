var WCX = 1800, WCY = 1400;

var photoCards = [
  // -- TOP-LEFT (far, bleeds edge) --
  {x:-740, y:-380, w:320, h:320, rot:-1.0, src:'https://picturesbyrajj.b-cdn.net/20230907%20-%20IMG_1655%20-%20Raj%20Kashyap92023raj.webp'},
  {x:-520, y:-320, w:200, h:200, rot:1.5, src:'https://picturesbyrajj.b-cdn.net/20230908%20-%20IMG_2075%20-%20Raj%20Kashyap122023raj.webp'},

  // -- TOP-CENTRE (above hero, pushed up) --
  {x:-120, y:-500, w:380, h:253, rot:0.6, src:'https://picturesbyrajj.b-cdn.net/20230907%20-%20IMG_1737-Enhanced-NR%20-%20Raj%20Kashyap102023raj.webp'},
  {x:220, y:-440, w:180, h:180, rot:-1.2, src:'https://picturesbyrajj.b-cdn.net/20230907%20-%20IMG_1747%20-%20Raj%20Kashyap112023raj.webp'},

  // -- TOP-RIGHT (far, bleeds edge) --
  {x:540, y:-360, w:420, h:298, rot:0.8, src:'https://picturesbyrajj.b-cdn.net/an%20art%20village22019raj.webp'},
  {x:780, y:-200, w:220, h:220, rot:-1.5, src:'https://picturesbyrajj.b-cdn.net/20230908%20-%20IMG_2116%20-%20Raj%20Kashyap132023raj.webp'},

  // -- LEFT-MID (pushed far left) --
  {x:-760, y:-20, w:280, h:187, rot:-0.8, src:'https://picturesbyrajj.b-cdn.net/it\'s%20her52020raj.webp'},
  {x:-640, y:160, w:340, h:227, rot:1.2, src:'https://picturesbyrajj.b-cdn.net/hault32020raj.webp'},

  // -- RIGHT-MID (pushed far right) --
  {x:620, y:40, w:300, h:300, rot:-0.5, src:'https://picturesbyrajj.b-cdn.net/IMG_1788-Enhanced-NR22022raj62022raj.webp'},
  {x:780, y:220, w:200, h:300, rot:1.0, src:'https://picturesbyrajj.b-cdn.net/IMG_18822022Raj%20Kashyap72022raj.webp'},

  // -- BOTTOM-LEFT (far, bleeds edge) --
  {x:-720, y:340, w:380, h:380, rot:1.0, src:'https://picturesbyrajj.b-cdn.net/IMG_2252-Enhanced-NR32023raj142023raj.webp'},
  {x:-430, y:400, w:220, h:147, rot:-1.5, src:'https://picturesbyrajj.b-cdn.net/IMG_25282022Raj%20Kashyap82022raj.webp'},

  // -- BOTTOM-CENTRE --
  {x:-40, y:380, w:340, h:227, rot:-0.6, src:'https://picturesbyrajj.b-cdn.net/green%20is%20the%20color42020raj.webp'},
  {x:240, y:460, w:260, h:260, rot:1.4, src:'https://picturesbyrajj.b-cdn.net/IMG_9371152026raj.webp'},

  // -- BOTTOM-RIGHT (far, bleeds edge) --
  {x:500, y:340, w:420, h:280, rot:0.8, src:'https://picturesbyrajj.b-cdn.net/IMG_29022019raj%20kashyap12019raj.webp'}
];

var videoCards = [
  {x:-380, y:-100, w:280, h:210, rot:0.7, src:'https://vz-6f9a60bb-593.b-cdn.net/a8317bc8-6c30-4e9a-a4c9-45afce91f3f1/playlist.m3u8'},
  {x:380, y:-60, w:250, h:188, rot:-1.1, src:'https://vz-6f9a60bb-593.b-cdn.net/b9ccf117-6681-4d1e-8015-9fbf6cec778e/playlist.m3u8'},
  {x:-200, y:440, w:300, h:225, rot:-0.4, src:'https://vz-6f9a60bb-593.b-cdn.net/3c36aee0-bec7-4b61-bd69-9b1a07f04676/playlist.m3u8'}
];

var textCards = [
  {x:-440, y:-200, w:200, h:110, rot:-1.0, bg:'#3a8597', headline:"i guess you can't defeat someone who's just having fun :')", dark:true},
  {x:480, y:-140, w:190, h:100, rot:0.8, bg:'#6098a3', headline:'why do you think in the ways you think?', dark:true},
  {x:340, y:340, w:180, h:100, rot:-0.6, bg:'#ff7bac', headline:"🍡 i hope you win", dark:true}
];

var G_STICK = '<svg width="14" height="20" viewBox="0 0 14 20" fill="none"><circle cx="7" cy="3.2" r="2.2" stroke="currentColor" stroke-width="1"/><line x1="7" y1="5.4" x2="7" y2="11.2" stroke="currentColor" stroke-width="1"/><line x1="2.5" y1="8" x2="7" y2="10.2" stroke="currentColor" stroke-width="1"/><line x1="11.5" y1="8" x2="7" y2="10.2" stroke="currentColor" stroke-width="1"/><line x1="7" y1="11.2" x2="4.5" y2="17.5" stroke="currentColor" stroke-width="1"/><line x1="7" y1="11.2" x2="9.5" y2="17.5" stroke="currentColor" stroke-width="1"/></svg>';
var G_EYE = '<svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M1 6C4 1 14 1 17 6C14 11 4 11 1 6Z" stroke="currentColor" stroke-width="1"/><circle cx="9" cy="6" r="2" fill="currentColor"/></svg>';
var pgGlyphs = [
  // stick figures - near hero and in open gaps
  {svg:G_STICK, cls:'', pos:[[-180,-180],[200,-200],[-160,200],[180,160],[-420,80],[460,-60]]},
  // eyes - sprinkled around mid-ring
  {svg:G_EYE, cls:'g', pos:[[-300,-300],[350,-280],[-320,300],[380,220],[0,-300],[0,300]]},
  // sticks - outer ring gaps
  {svg:G_STICK, cls:'b', pos:[[500,-250],[-500,-250],[500,250],[-500,280]]},
  // eyes - outer corners
  {svg:G_EYE, cls:'', pos:[[-650,0],[650,0],[-200,440],[250,-420]]}
];

// Mobile: replace card positions with viewport-friendly layout (fits 390px wide phone)
var isMobile = window.innerWidth < 640;

// Mobile uses a vertical scroll feed (see initPlaygroundFeed) — no canvas reposition.

// Float animation index assignment (cycles 0-7)
var pgFloatIdx = 0;

function initPlayground() {
  var world = document.getElementById('pg-world');
  if (world.childElementCount > 0) return;

  var ct = document.createElement('div');
  ct.className = 'pg-center';
  ct.style.left = WCX + 'px';
  ct.style.top = WCY + 'px';
  ct.innerHTML = '<span class="pg-headline">never stop playing &lt;3</span><div class="pg-sub">drag to move</div><a href="hub.html" class="pg-cta">work with me &#8594;</a>';
  world.appendChild(ct);

  var isDragging = false;
  var allCardEls = []; // track all card elements for tidy-up

  function addCard(c, i, delayed) {
    var el = document.createElement('div');
    var floatClass = 'pgFloat' + (pgFloatIdx % 8);
    pgFloatIdx++;
    el.className = 'pg-card pg-card-link ' + floatClass;
    el.style.cssText = 'left:'+(WCX+c.x)+'px;top:'+(WCY+c.y)+'px;width:'+c.w+'px;height:'+c.h+'px;transform:rotate('+c.rot+'deg);z-index:'+(5+(i%8))+';';
    el.dataset.rot = c.rot;
    el.dataset.homeLeft = (WCX+c.x);
    el.dataset.homeTop = (WCY+c.y);
    if (delayed) { el.style.opacity = '0'; el.style.transition = 'opacity 0.6s ease'; setTimeout(function() { el.style.opacity = '1'; }, 50); }
    var img = document.createElement('img');
    img.src = c.src; img.alt = ''; img.loading = i < 3 ? 'eager' : 'lazy'; img.draggable = false;
    el.appendChild(img);
    allCardEls.push({el:el, data:c});

    var cardDragging = false, cardMoved = false, csx, csy, csl, cst;
    var DRAG_SCALE = 0.96;
    // Spring physics for elastic drag
    var springX = 0, springY = 0;
    var targetX = 0, targetY = 0;
    var springVX = 0, springVY = 0;
    var cardRafId = null;
    var SPRING_STIFFNESS = 0.12;
    var SPRING_DAMPING = 0.74;
    var MESH_INTENSITY = 0.3;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function cardSpringTick() {
      if (!cardDragging) return;
      var fx = (targetX - springX) * SPRING_STIFFNESS;
      var fy = (targetY - springY) * SPRING_STIFFNESS;
      springVX = (springVX + fx) * SPRING_DAMPING;
      springVY = (springVY + fy) * SPRING_DAMPING;
      springX += springVX;
      springY += springVY;

      el.style.left = (csl + springX) + 'px';
      el.style.top = (cst + springY) + 'px';

      if (!reducedMotion) {
        // Mesh warp: skew + tilt from velocity
        var skewX = Math.max(-10, Math.min(10, springVX * MESH_INTENSITY));
        var skewY = Math.max(-6, Math.min(6, springVY * MESH_INTENSITY * 0.4));
        var rotZ = Math.max(-4, Math.min(4, springVX * 0.06));
        el.style.transform = 'perspective(600px) rotate('+(c.rot + rotZ)+'deg) scale('+DRAG_SCALE+') skewX('+skewX+'deg) skewY('+skewY+'deg)';
      } else {
        el.style.transform = 'rotate('+c.rot+'deg) scale('+DRAG_SCALE+')';
      }

      cardRafId = requestAnimationFrame(cardSpringTick);
    }

    // Settle spring: card coasts to rest after release with momentum
    function cardSettleTick() {
      var fx = (targetX - springX) * 0.08;
      var fy = (targetY - springY) * 0.08;
      springVX = (springVX + fx) * 0.82;
      springVY = (springVY + fy) * 0.82;
      springX += springVX;
      springY += springVY;
      el.style.left = (csl + springX) + 'px';
      el.style.top = (cst + springY) + 'px';

      // Warp decays during settle
      if (!reducedMotion) {
        var skewX = Math.max(-10, Math.min(10, springVX * MESH_INTENSITY));
        var skewY = Math.max(-6, Math.min(6, springVY * MESH_INTENSITY * 0.4));
        var settleScale = DRAG_SCALE + (1 - DRAG_SCALE) * (1 - Math.min(1, (Math.abs(springVX) + Math.abs(springVY)) * 0.5));
        el.style.transform = 'perspective(600px) rotate('+c.rot+'deg) scale('+settleScale+') skewX('+skewX+'deg) skewY('+skewY+'deg)';
      }

      if (Math.abs(springVX) + Math.abs(springVY) > 0.15) {
        cardRafId = requestAnimationFrame(cardSettleTick);
      } else {
        // Fully settled
        el.style.transform = 'rotate('+c.rot+'deg) scale(1)';
        el.classList.remove('drop-settle');
        el.style.animationPlayState = 'running';
        checkRecenter();
      }
    }

    function cardDragStart(cx, cy) {
      cardDragging = true; cardMoved = false;
      csx = cx; csy = cy;
      csl = parseInt(el.style.left) || 0; cst = parseInt(el.style.top) || 0;
      springX = 0; springY = 0; targetX = 0; targetY = 0;
      springVX = 0; springVY = 0;
      el.classList.add('dragging-macos');
      el.style.transform = 'rotate('+c.rot+'deg) scale('+DRAG_SCALE+')';
      el.style.boxShadow = '0 22px 70px rgba(30,25,20,0.22), 0 4px 16px rgba(30,25,20,0.08)';
      cancelAnimationFrame(cardRafId);
      cardRafId = requestAnimationFrame(cardSpringTick);
    }
    function cardDragMove(cx, cy) {
      if (!cardDragging) return;
      var dx = cx - csx, dy = cy - csy;
      if (Math.abs(dx) + Math.abs(dy) > 4) cardMoved = true;
      if (cardMoved) {
        targetX = dx;
        targetY = dy;
      }
    }
    function cardDragEnd() {
      if (!cardDragging) return;
      cardDragging = false;
      cancelAnimationFrame(cardRafId);
      el.classList.remove('dragging-macos');
      el.classList.add('drop-settle');
      el.style.boxShadow = '';
      // Coast to rest with spring settle instead of hard stop
      targetX = springX; targetY = springY;
      cardRafId = requestAnimationFrame(cardSettleTick);
      if (!cardMoved) window.location.href='hub.html';
    }
    // Mouse events
    el.addEventListener('mousedown', function(e) {
      e.stopPropagation(); e.preventDefault();
      cardDragStart(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', function(e) { cardDragMove(e.clientX, e.clientY); });
    window.addEventListener('mouseup', function() { cardDragEnd(); });
    // Touch events
    el.addEventListener('touchstart', function(e) {
      e.stopPropagation();
      var t = e.touches[0];
      cardDragStart(t.clientX, t.clientY);
    }, {passive: true});
    window.addEventListener('touchmove', function(e) {
      if (!cardDragging) return;
      var t = e.touches[0];
      cardDragMove(t.clientX, t.clientY);
    }, {passive: true});
    window.addEventListener('touchend', function() { cardDragEnd(); });
    var hasFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (hasFinePointer) {
      el.addEventListener('mouseenter', function() {
        if (!cardDragging) {
          el.style.animationPlayState = 'paused';
          el.style.transform = 'perspective(600px) rotate('+c.rot+'deg) translateY(-6px) scale(1.04) rotateX(4deg)';
          el.style.cursor = 'grab';
        }
      });
      el.addEventListener('mouseleave', function() {
        if (!cardDragging) {
          el.style.transform = 'rotate('+c.rot+'deg)';
          el.style.animationPlayState = 'running';
        }
      });
    }
    world.appendChild(el);
  }

  function addVideoCard(c, i) {
    var el = document.createElement('div');
    var floatClass = 'pgFloat' + (pgFloatIdx % 8);
    pgFloatIdx++;
    el.className = 'pg-card pg-card-link pg-video-card ' + floatClass;
    el.style.cssText = 'left:'+(WCX+c.x)+'px;top:'+(WCY+c.y)+'px;width:'+c.w+'px;height:'+c.h+'px;transform:rotate('+c.rot+'deg);z-index:'+(5+(i%8))+';opacity:0;transition:opacity 0.6s ease;';
    el.dataset.rot = c.rot;
    el.dataset.homeLeft = (WCX+c.x);
    el.dataset.homeTop = (WCY+c.y);
    var vid = document.createElement('video');
    vid.muted = true; vid.loop = true; vid.playsInline = true; vid.autoplay = true;
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
    vid.draggable = false;
    vid.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:inherit;pointer-events:none;';

    if (vid.canPlayType('application/vnd.apple.mpegurl')) {
      vid.src = c.src;
      vid.play().catch(function(){});
    } else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
      var hls = new Hls({ enableWorker: true, startLevel: -1 });
      hls.loadSource(c.src);
      hls.attachMedia(vid);
      hls.on(Hls.Events.MANIFEST_PARSED, function() { vid.play().catch(function(){}); });
    }

    el.appendChild(vid);
    allCardEls.push({el:el, data:c});

    // Reuse same drag logic as photo cards
    var cardDragging = false, cardMoved = false, csx, csy, csl, cst;
    var DRAG_SCALE = 0.96;
    var springX = 0, springY = 0, targetX = 0, targetY = 0;
    var springVX = 0, springVY = 0, cardRafId = null;
    var SPRING_STIFFNESS = 0.12, SPRING_DAMPING = 0.74, MESH_INTENSITY = 0.3;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function cardSpringTick() {
      if (!cardDragging) return;
      var fx = (targetX - springX) * SPRING_STIFFNESS;
      var fy = (targetY - springY) * SPRING_STIFFNESS;
      springVX = (springVX + fx) * SPRING_DAMPING;
      springVY = (springVY + fy) * SPRING_DAMPING;
      springX += springVX; springY += springVY;
      el.style.left = (csl + springX) + 'px';
      el.style.top = (cst + springY) + 'px';
      if (!reducedMotion) {
        var skewX = Math.max(-10, Math.min(10, springVX * MESH_INTENSITY));
        var skewY = Math.max(-6, Math.min(6, springVY * MESH_INTENSITY * 0.4));
        var rotZ = Math.max(-4, Math.min(4, springVX * 0.06));
        el.style.transform = 'perspective(600px) rotate('+(c.rot + rotZ)+'deg) scale('+DRAG_SCALE+') skewX('+skewX+'deg) skewY('+skewY+'deg)';
      } else {
        el.style.transform = 'rotate('+c.rot+'deg) scale('+DRAG_SCALE+')';
      }
      cardRafId = requestAnimationFrame(cardSpringTick);
    }
    function cardSettleTick() {
      var fx = (targetX - springX) * 0.08;
      var fy = (targetY - springY) * 0.08;
      springVX = (springVX + fx) * 0.82;
      springVY = (springVY + fy) * 0.82;
      springX += springVX; springY += springVY;
      el.style.left = (csl + springX) + 'px';
      el.style.top = (cst + springY) + 'px';
      if (!reducedMotion) {
        var skewX = Math.max(-10, Math.min(10, springVX * MESH_INTENSITY));
        var skewY = Math.max(-6, Math.min(6, springVY * MESH_INTENSITY * 0.4));
        var settleScale = DRAG_SCALE + (1 - DRAG_SCALE) * (1 - Math.min(1, (Math.abs(springVX) + Math.abs(springVY)) * 0.5));
        el.style.transform = 'perspective(600px) rotate('+c.rot+'deg) scale('+settleScale+') skewX('+skewX+'deg) skewY('+skewY+'deg)';
      }
      if (Math.abs(springVX) + Math.abs(springVY) > 0.15) {
        cardRafId = requestAnimationFrame(cardSettleTick);
      } else {
        el.style.transform = 'rotate('+c.rot+'deg) scale(1)';
        el.classList.remove('drop-settle');
        el.style.animationPlayState = 'running';
        checkRecenter();
      }
    }
    function cardDragStart(cx, cy) {
      cardDragging = true; cardMoved = false;
      csx = cx; csy = cy;
      csl = parseInt(el.style.left) || 0; cst = parseInt(el.style.top) || 0;
      springX = 0; springY = 0; targetX = 0; targetY = 0;
      springVX = 0; springVY = 0;
      el.classList.add('dragging-macos');
      el.style.transform = 'rotate('+c.rot+'deg) scale('+DRAG_SCALE+')';
      el.style.boxShadow = '0 22px 70px rgba(30,25,20,0.22), 0 4px 16px rgba(30,25,20,0.08)';
      cancelAnimationFrame(cardRafId);
      cardRafId = requestAnimationFrame(cardSpringTick);
    }
    function cardDragMove(cx, cy) {
      if (!cardDragging) return;
      var dx = cx - csx, dy = cy - csy;
      if (Math.abs(dx) + Math.abs(dy) > 4) cardMoved = true;
      if (cardMoved) { targetX = dx; targetY = dy; }
    }
    function cardDragEnd() {
      if (!cardDragging) return;
      cardDragging = false;
      cancelAnimationFrame(cardRafId);
      el.classList.remove('dragging-macos');
      el.classList.add('drop-settle');
      el.style.boxShadow = '';
      targetX = springX; targetY = springY;
      cardRafId = requestAnimationFrame(cardSettleTick);
      if (!cardMoved) window.location.href='hub.html';
    }
    el.addEventListener('mousedown', function(e) { e.stopPropagation(); e.preventDefault(); cardDragStart(e.clientX, e.clientY); });
    window.addEventListener('mousemove', function(e) { cardDragMove(e.clientX, e.clientY); });
    window.addEventListener('mouseup', function() { cardDragEnd(); });
    el.addEventListener('touchstart', function(e) { e.stopPropagation(); var t = e.touches[0]; cardDragStart(t.clientX, t.clientY); }, {passive: true});
    window.addEventListener('touchmove', function(e) { if (!cardDragging) return; var t = e.touches[0]; cardDragMove(t.clientX, t.clientY); }, {passive: true});
    window.addEventListener('touchend', function() { cardDragEnd(); });
    var hasFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (hasFinePointer) {
      el.addEventListener('mouseenter', function() {
        if (!cardDragging) {
          el.style.animationPlayState = 'paused';
          el.style.transform = 'perspective(600px) rotate('+c.rot+'deg) translateY(-6px) scale(1.04) rotateX(4deg)';
          el.style.cursor = 'grab';
        }
      });
      el.addEventListener('mouseleave', function() {
        if (!cardDragging) { el.style.transform = 'rotate('+c.rot+'deg)'; el.style.animationPlayState = 'running'; }
      });
    }
    world.appendChild(el);
    setTimeout(function() { el.style.opacity = '1'; }, 50);
  }

  // First 3 cards load immediately
  for (var fi = 0; fi < Math.min(3, photoCards.length); fi++) { addCard(photoCards[fi], fi, false); }
  // Rest fade in after 2.5s
  setTimeout(function() {
    for (var ri = 3; ri < photoCards.length; ri++) { addCard(photoCards[ri], ri, true); }
    // Video cards load with the delayed batch
    for (var vi = 0; vi < videoCards.length; vi++) { addVideoCard(videoCards[vi], vi); }
  }, 2500);

  textCards.forEach(function(c, i) {
    var el = document.createElement('div');
    el.className = 'pg-text-card';
    el.style.cssText = 'left:'+(WCX+c.x)+'px;top:'+(WCY+c.y)+'px;width:'+c.w+'px;height:'+c.h+'px;transform:rotate('+c.rot+'deg);z-index:'+(15+i)+';animation-delay:'+(0.6+i*0.05).toFixed(2)+'s;';
    var inner = document.createElement('div');
    inner.className = 'pg-text-inner';
    inner.style.background = c.bg;
    var h = document.createElement('div');
    h.className = 'pg-text-h';
    h.textContent = c.headline;
    if (c.dark) h.style.color = '#f5f2ee';
    inner.appendChild(h);
    if (c.tag) {
      var t = document.createElement('div');
      t.className = 'pg-text-tag';
      t.textContent = c.tag;
      if (c.dark) t.style.color = 'rgba(245,242,238,0.4)';
      inner.appendChild(t);
    }
    el.appendChild(inner);
    world.appendChild(el);
  });

  pgGlyphs.forEach(function(g) {
    g.pos.forEach(function(p) {
      var el = document.createElement('div');
      el.className = 'pg-glyph' + (g.cls ? ' '+g.cls : '');
      el.style.left = (WCX+p[0])+'px';
      el.style.top = (WCY+p[1])+'px';
      el.innerHTML = g.svg;
      world.appendChild(el);
    });
  });

  var canvas = document.getElementById('pg-canvas');
  var pgWorld = document.getElementById('pg-world');
  var dragging=false, startX, startY, offX=0, offY=0, velX=0, velY=0, lastX, lastY, rafId;
  var scale = 1, minScale = 1, maxScale = 3;
  var homeX = 0, homeY = 0;

  function applyTransform() { pgWorld.style.transform = 'translate('+offX+'px,'+offY+'px) scale('+scale+')'; }
  function getNavHeight() { var n = document.getElementById('pg-nav'); return n ? n.offsetHeight : 0; }
  function centerView() { var nh = getNavHeight(); offX = window.innerWidth/2 - WCX; offY = (window.innerHeight + nh)/2 - WCY; homeX = offX; homeY = offY; applyTransform(); }
  centerView();
  window.addEventListener('resize', function() { centerView(); scale = 1; applyTransform(); hideRecenter(); });

  // Re-center button
  var recenterBtn = document.createElement('button');
  recenterBtn.className = 'pg-recenter';
  recenterBtn.textContent = 're-center';
  recenterBtn.style.opacity = '0';
  recenterBtn.style.pointerEvents = 'none';
  canvas.parentElement.appendChild(recenterBtn);
  var recenterVisible = false;

  function cardsDrifted() {
    for (var ci = 0; ci < allCardEls.length; ci++) {
      var ce = allCardEls[ci].el;
      if (parseInt(ce.style.left) !== parseInt(ce.dataset.homeLeft) || parseInt(ce.style.top) !== parseInt(ce.dataset.homeTop)) return true;
    }
    return false;
  }
  function checkRecenter() {
    var drifted = Math.abs(offX - homeX) > 30 || Math.abs(offY - homeY) > 30 || scale > 1.05 || cardsDrifted();
    if (drifted && !recenterVisible) {
      recenterVisible = true;
      recenterBtn.style.opacity = '1';
      recenterBtn.style.pointerEvents = 'auto';
    } else if (!drifted && recenterVisible) {
      hideRecenter();
    }
  }
  function hideRecenter() {
    recenterVisible = false;
    recenterBtn.style.opacity = '0';
    recenterBtn.style.pointerEvents = 'none';
  }
  recenterBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    cancelAnimationFrame(rafId);
    velX = velY = 0;
    scale = 1;
    pgWorld.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    offX = homeX; offY = homeY;
    applyTransform();
    // Tidy up: spring all cards back to original positions
    allCardEls.forEach(function(entry, idx) {
      var ce = entry.el, cd = entry.data;
      ce.style.transition = 'left 0.45s cubic-bezier(0.34,1.56,0.64,1), top 0.45s cubic-bezier(0.34,1.56,0.64,1), transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
      ce.style.transitionDelay = (idx * 0.03) + 's';
      ce.style.left = ce.dataset.homeLeft + 'px';
      ce.style.top = ce.dataset.homeTop + 'px';
      ce.style.transform = 'rotate('+cd.rot+'deg)';
      ce.style.animationPlayState = 'running';
    });
    hideRecenter();
    setTimeout(function() {
      pgWorld.style.transition = 'none';
      allCardEls.forEach(function(entry) {
        entry.el.style.transition = '';
        entry.el.style.transitionDelay = '';
      });
    }, 650);
  });

  // Scroll to zoom (into only, clamped at minScale on zoom out)
  canvas.addEventListener('wheel', function(e) {
    e.preventDefault();
    var rect = canvas.getBoundingClientRect();
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    // Point in world space under cursor before zoom
    var wx = (mouseX - offX) / scale;
    var wy = (mouseY - offY) / scale;
    var delta = e.deltaY > 0 ? -0.08 : 0.08;
    var newScale = Math.min(maxScale, Math.max(minScale, scale + delta));
    // Adjust offset so the point under cursor stays fixed
    offX = mouseX - wx * newScale;
    offY = mouseY - wy * newScale;
    scale = newScale;
    applyTransform();
    checkRecenter();
  }, {passive:false});

  // Pinch to zoom (mobile)
  var lastPinchDist = 0, pinching = false;
  canvas.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      pinching = true; dragging = false;
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDist = Math.sqrt(dx*dx + dy*dy);
      return;
    }
    if(e.target.closest('.pg-card,.pg-text-card,.pg-cta,.pg-links')) return;
    var t=e.touches[0]; dragging=true;
    startX=t.clientX-offX; startY=t.clientY-offY;
    lastX=t.clientX; lastY=t.clientY; velX=velY=0; cancelAnimationFrame(rafId);
  }, {passive:true});
  canvas.addEventListener('touchmove', function(e) {
    if (pinching && e.touches.length === 2) {
      e.preventDefault();
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      var dist = Math.sqrt(dx*dx + dy*dy);
      var midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      var midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      var rect = canvas.getBoundingClientRect();
      var mx = midX - rect.left, my = midY - rect.top;
      var wx = (mx - offX) / scale, wy = (my - offY) / scale;
      var factor = dist / lastPinchDist;
      var newScale = Math.min(maxScale, Math.max(minScale, scale * factor));
      offX = mx - wx * newScale;
      offY = my - wy * newScale;
      scale = newScale;
      lastPinchDist = dist;
      applyTransform();
      checkRecenter();
      return;
    }
    if(!dragging) return; var t=e.touches[0];
    velX=t.clientX-lastX; velY=t.clientY-lastY;
    lastX=t.clientX; lastY=t.clientY;
    offX=t.clientX-startX; offY=t.clientY-startY; applyTransform(); e.preventDefault();
  }, {passive:false});
  canvas.addEventListener('touchend', function(e) {
    if (pinching && e.touches.length < 2) { pinching = false; checkRecenter(); return; }
    dragging=false; coast(); checkRecenter();
  });

  canvas.addEventListener('mousedown', function(e) {
    if (e.target.closest('.pg-card,.pg-text-card,.pg-cta,.pg-links')) return;
    dragging=true; canvas.classList.add('dragging');
    startX=e.clientX-offX; startY=e.clientY-offY;
    lastX=e.clientX; lastY=e.clientY; velX=velY=0;
    cancelAnimationFrame(rafId); e.preventDefault();
  });
  window.addEventListener('mousemove', function(e) {
    if(!dragging) return; velX=e.clientX-lastX; velY=e.clientY-lastY;
    lastX=e.clientX; lastY=e.clientY; offX=e.clientX-startX; offY=e.clientY-startY; applyTransform();
  });
  window.addEventListener('mouseup', function() { if(!dragging) return; dragging=false; canvas.classList.remove('dragging'); coast(); checkRecenter(); });
  function coast() { velX*=0.91; velY*=0.91; offX+=velX; offY+=velY; applyTransform();
    if(Math.abs(velX)>0.25||Math.abs(velY)>0.25) rafId=requestAnimationFrame(coast);
    else checkRecenter();
  }
}

// ============================================================
// MOBILE: vertical scroll feed (no drag/pan world).
// Hero on top, then a 2-column scrapbook feed of photos, videos
// and text cards, closing on a CTA. Desktop is untouched.
// ============================================================
function initFeedVideo(rec) {
  var v = rec.el, src = rec.src;
  if (v.canPlayType('application/vnd.apple.mpegurl')) {
    v.src = src; v.play().catch(function(){});
  } else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
    var hls = new Hls({ enableWorker: true, startLevel: -1, maxBufferLength: 10 });
    hls.loadSource(src); hls.attachMedia(v);
    hls.on(Hls.Events.MANIFEST_PARSED, function() { v.play().catch(function(){}); });
  } else {
    v.src = src;
  }
}

function initPlaygroundFeed() {
  var canvas = document.getElementById('pg-canvas');
  if (!canvas || document.getElementById('pg-feed')) return;

  var feed = document.createElement('div');
  feed.id = 'pg-feed';

  // weave photos + videos + text cards into a single ordered stream
  var photos = photoCards.slice();
  var vids = videoCards.slice();
  var texts = textCards.slice();
  var order = [];
  var pi = 0, vi = 0, ti = 0, n = 0;
  while (pi < photos.length || vi < vids.length || ti < texts.length) {
    if (pi < photos.length) order.push({ kind: 'photo', data: photos[pi++] });
    if (pi < photos.length) order.push({ kind: 'photo', data: photos[pi++] });
    if (n % 2 === 0 && ti < texts.length) order.push({ kind: 'text', data: texts[ti++] });
    else if (vi < vids.length) order.push({ kind: 'video', data: vids[vi++] });
    else if (ti < texts.length) order.push({ kind: 'text', data: texts[ti++] });
    n++;
  }

  // editorial rows: mostly single cards (varied width + offset), the odd pair/wide.
  // everything floats with margins; tall videos never go full-width.
  var pattern = ['solo-l', 'pair', 'solo-r', 'wide', 'solo-c', 'pair', 'solo-r', 'solo-l', 'wide', 'pair', 'solo-c'];
  var rows = [];
  var oi = 0, pc = 0;
  while (oi < order.length) {
    var t = pattern[pc % pattern.length]; pc++;
    if (t === 'pair' && oi + 1 < order.length) {
      rows.push({ type: 'pair', items: [order[oi], order[oi + 1]] }); oi += 2;
    } else if (t === 'wide') {
      rows.push({ type: order[oi].kind === 'video' ? 'solo-c' : 'wide', items: [order[oi]] }); oi += 1;
    } else {
      rows.push({ type: (t === 'pair' ? 'solo-c' : t), items: [order[oi]] }); oi += 1;
    }
  }

  // scatter a few glyph rows between the cards
  var glyphAt = { 2: G_EYE, 5: G_STICK, 8: G_EYE, 11: G_STICK };
  var stream = [];
  for (var ri = 0; ri < rows.length; ri++) {
    stream.push(rows[ri]);
    if (glyphAt[ri]) stream.push({ type: 'glyph', svg: glyphAt[ri] });
  }

  var videoEls = [];
  var ci = 0;
  for (var r = 0; r < stream.length; r++) {
    var row = stream[r];

    if (row.type === 'glyph') {
      var gr = document.createElement('div');
      gr.className = 'pgf-row pgf-glyphrow';
      var gl = document.createElement('div');
      gl.className = 'pgf-glyph';
      gl.style.setProperty('--rot', (((r % 2) ? -1 : 1) * (6 + (r % 5))) + 'deg');
      gl.innerHTML = row.svg;
      gr.appendChild(gl);
      feed.appendChild(gr);
      continue;
    }

    var rowEl = document.createElement('div');
    rowEl.className = 'pgf-row pgf-' + row.type;
    for (var k = 0; k < row.items.length; k++) {
      var it = row.items[k];
      var card = document.createElement('div');
      var rot = ((ci % 2 === 0) ? 1 : -1) * (0.7 + (ci % 3) * 0.35);
      card.className = 'pgf-item pgf-' + it.kind;
      card.style.setProperty('--rot', rot.toFixed(2) + 'deg');
      card.style.animationDelay = (Math.min(ci, 12) * 0.04) + 's';
      ci++;

      if (it.kind === 'photo') {
        var img = document.createElement('img');
        img.loading = 'lazy'; img.draggable = false; img.alt = '';
        img.src = it.data.src;
        card.appendChild(img);
      } else if (it.kind === 'video') {
        var v = document.createElement('video');
        v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
        v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', '');
        v.setAttribute('muted', ''); v.setAttribute('autoplay', '');
        v.setAttribute('preload', 'metadata');
        v.setAttribute('poster', it.data.src.replace('playlist.m3u8', 'thumbnail.jpg'));
        v.draggable = false;
        card.appendChild(v);
        videoEls.push({ el: v, src: it.data.src, inited: false });
      } else {
        card.style.background = it.data.bg;
        var sp = document.createElement('span');
        sp.textContent = it.data.headline;
        card.appendChild(sp);
      }
      rowEl.appendChild(card);
    }
    feed.appendChild(rowEl);
  }

  // closing moment at the end of the feed
  var outro = document.createElement('div');
  outro.className = 'pgf-outro';
  outro.innerHTML =
    '<div class="pgf-outro-line">that’s the playground.</div>' +
    '<a href="hub.html" class="pgf-outro-cta">work with me &#8594;</a>';
  feed.appendChild(outro);

  canvas.appendChild(feed);

  // soft scrim behind the centred hero so the blend stays legible over busy photos
  var heroScrim = document.createElement('div');
  heroScrim.className = 'pgf-hero-scrim';
  heroScrim.setAttribute('aria-hidden', 'true');
  canvas.appendChild(heroScrim);

  // fixed, always-centred hero that blends over the cards as they scroll
  var hero = document.createElement('div');
  hero.className = 'pgf-hero-fixed';
  hero.innerHTML =
    '<h1 class="pgf-title">never stop playing &lt;3</h1>' +
    '<a href="hub.html" class="pgf-cta">work with me &#8594;</a>';
  canvas.appendChild(hero);

  // Autoplay muted+looping as each video scrolls into view. iOS won't start
  // an off-screen muted video, so play on intersection (a touch early via
  // rootMargin) rather than all-at-once on load.
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function(entries) {
      for (var e = 0; e < entries.length; e++) {
        var tgt = entries[e].target, rec = null;
        for (var k = 0; k < videoEls.length; k++) { if (videoEls[k].el === tgt) { rec = videoEls[k]; break; } }
        if (!rec) continue;
        if (entries[e].isIntersecting) {
          if (!rec.inited) { initFeedVideo(rec); rec.inited = true; }
          var p = rec.el.play();
          if (p && p.catch) p.catch(function(){});
        } else {
          rec.el.pause();
        }
      }
    }, { root: canvas, threshold: 0.2, rootMargin: '0px 0px 300px 0px' });
    for (var q = 0; q < videoEls.length; q++) vio.observe(videoEls[q].el);
  } else {
    for (var z = 0; z < videoEls.length; z++) { initFeedVideo(videoEls[z]); videoEls[z].inited = true; }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (isMobile) initPlaygroundFeed();
  else initPlayground();
});
