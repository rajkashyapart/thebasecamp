var WCX = 1800, WCY = 1400;

var photoCards = [
  // -- TOP-LEFT (far, bleeds edge) --
  {x:-740, y:-380, w:320, h:320, rot:-1.0, src:'https://picturesbyraj.b-cdn.net/20230907%20-%20IMG_1655%20-%20Raj%20Kashyap.jpg'},
  {x:-520, y:-320, w:200, h:200, rot:1.5, src:'https://picturesbyraj.b-cdn.net/20230908%20-%20IMG_2075%20-%20Raj%20Kashyap.jpg'},

  // -- TOP-CENTRE (above hero, pushed up) --
  {x:-120, y:-500, w:380, h:253, rot:0.6, src:'https://picturesbyraj.b-cdn.net/20230907%20-%20IMG_1737-Enhanced-NR%20-%20Raj%20Kashyap.jpg'},
  {x:220, y:-440, w:180, h:180, rot:-1.2, src:'https://picturesbyraj.b-cdn.net/20230907%20-%20IMG_1747%20-%20Raj%20Kashyap.jpg'},

  // -- TOP-RIGHT (far, bleeds edge) --
  {x:540, y:-360, w:420, h:298, rot:0.8, src:'https://picturesbyraj.b-cdn.net/an%20art%20village.jpg'},
  {x:780, y:-200, w:220, h:220, rot:-1.5, src:'https://picturesbyraj.b-cdn.net/20230908%20-%20IMG_2116%20-%20Raj%20Kashyap.jpg'},

  // -- LEFT-MID (pushed far left) --
  {x:-760, y:-20, w:280, h:187, rot:-0.8, src:'https://picturesbyraj.b-cdn.net/it%27s%20her.JPG'},
  {x:-640, y:160, w:340, h:227, rot:1.2, src:'https://picturesbyraj.b-cdn.net/hault.jpg'},

  // -- RIGHT-MID (pushed far right) --
  {x:620, y:40, w:300, h:300, rot:-0.5, src:'https://picturesbyraj.b-cdn.net/IMG_1788-Enhanced-NR22022raj.jpg'},
  {x:780, y:220, w:200, h:300, rot:1.0, src:'https://picturesbyraj.b-cdn.net/IMG_18822022Raj%20Kashyap.JPG'},

  // -- BOTTOM-LEFT (far, bleeds edge) --
  {x:-720, y:340, w:380, h:380, rot:1.0, src:'https://picturesbyraj.b-cdn.net/IMG_2252-Enhanced-NR32023raj.jpg'},
  {x:-430, y:400, w:220, h:147, rot:-1.5, src:'https://picturesbyraj.b-cdn.net/IMG_25282022Raj%20Kashyap.JPG'},

  // -- BOTTOM-CENTRE --
  {x:-40, y:380, w:340, h:227, rot:-0.6, src:'https://picturesbyraj.b-cdn.net/green%20is%20the%20color.jpg'},

  // -- BOTTOM-RIGHT (far, bleeds edge) --
  {x:500, y:340, w:420, h:280, rot:0.8, src:'https://picturesbyraj.b-cdn.net/IMG_29022019raj%20kashyap.JPG'}
];

var textCards = [
  {x:-440, y:-200, w:200, h:110, rot:-1.0, bg:'#3a8597', headline:"you can't defeat someone who's just having fun :')", tag:'raj.uncurated', dark:true},
  {x:480, y:-140, w:190, h:100, rot:0.8, bg:'#6098a3', headline:'are you better today than you were yesterday?', tag:'the question', dark:true},
  {x:340, y:340, w:180, h:100, rot:-0.6, bg:'#ff7bac', headline:"i wish to die knowing i had fun! :')", tag:'raj.uncurated', dark:true}
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

if (isMobile) {
  // Photo cards -- two vertical zones, max ~8% overlap between any two cards.
  // Top zone (y < -148): cards staggered horizontally across 390px viewport.
  // Bottom zone (y > 148): mirrored logic below hero.
  photoCards = [
    {x:-150, y:-385, w:145, h:145, rot:-1.0, src:photoCards[0].src},
    {x:28,   y:-360, w:110, h:110, rot:1.5,  src:photoCards[1].src},
    {x:155,  y:-310, w:125, h:83,  rot:-0.8, src:photoCards[2].src},
    {x:-195, y:-232, w:90,  h:60,  rot:-1.2, src:photoCards[3].src},
    {x:168,  y:-222, w:110, h:72,  rot:0.8,  src:photoCards[4].src},
    {x:-195, y:152,  w:90,  h:60,  rot:-0.8, src:photoCards[5].src},
    {x:162,  y:148,  w:110, h:72,  rot:2.0,  src:photoCards[6].src},
    {x:-148, y:222,  w:130, h:87,  rot:-0.5, src:photoCards[7].src},
    {x:25,   y:235,  w:90,  h:60,  rot:1.0,  src:photoCards[8].src},
    {x:145,  y:295,  w:115, h:115, rot:-1.8, src:photoCards[9].src}
  ];
  // Text cards -- no card overlaps more than 8% with any photo card
  textCards = [
    {x:35,   y:-225, w:135, h:78, rot:-1.0, bg:'#3a8597', headline:"you can't defeat someone who's just having fun :')", tag:'raj.uncurated', dark:true},
    {x:150,  y:228,  w:130, h:70, rot:0.8,  bg:'#6098a3', headline:'are you better today than you were yesterday?', tag:'the question', dark:true},
    {x:-155, y:315,  w:130, h:70, rot:-0.6, bg:'#ff7bac', headline:"i wish to die knowing i had fun! :')", tag:'raj.uncurated', dark:true}
  ];
  // Glyphs -- organically scattered. Near-hero glyphs at y:+-118-132 (just outside hero zone).
  // Far glyphs reach toward canvas edges for depth.
  pgGlyphs = [
    {svg:G_STICK, cls:'', pos:[[-78,-122],[82,-118],[-164,126],[134,132],[-90,-328],[74,305]]},
    {svg:G_EYE,   cls:'g', pos:[[-48,-345],[98,-302],[-190,110],[200,100],[-18,328],[112,368]]},
    {svg:G_STICK, cls:'b', pos:[[212,-160],[-220,-182],[210,188],[-214,200]]},
    {svg:G_EYE,   cls:'',  pos:[[-238,-190],[232,-114],[-50,372],[80,-405]]}
  ];
}

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

  function addCard(c, i, delayed) {
    var el = document.createElement('div');
    var floatClass = 'pgFloat' + (pgFloatIdx % 8);
    pgFloatIdx++;
    el.className = 'pg-card pg-card-link ' + floatClass;
    el.style.cssText = 'left:'+(WCX+c.x)+'px;top:'+(WCY+c.y)+'px;width:'+c.w+'px;height:'+c.h+'px;transform:rotate('+c.rot+'deg);z-index:'+(5+(i%8))+';';
    el.dataset.rot = c.rot;
    if (delayed) { el.style.opacity = '0'; el.style.transition = 'opacity 0.6s ease'; setTimeout(function() { el.style.opacity = '1'; }, 50); }
    var img = document.createElement('img');
    img.src = c.src; img.alt = ''; img.loading = i < 3 ? 'eager' : 'lazy'; img.draggable = false;
    el.appendChild(img);
    var cardDragging = false, cardMoved = false, csx, csy, csl, cst;
    function cardDragStart(cx, cy) {
      cardDragging = true; cardMoved = false;
      csx = cx; csy = cy;
      csl = parseInt(el.style.left) || 0; cst = parseInt(el.style.top) || 0;
      el.style.zIndex = '80'; el.style.cursor = 'grabbing';
      el.style.transition = 'none';
      el.style.animationPlayState = 'paused';
    }
    function cardDragMove(cx, cy) {
      if (!cardDragging) return;
      var dx = cx - csx, dy = cy - csy;
      if (Math.abs(dx) + Math.abs(dy) > 4) cardMoved = true;
      if (cardMoved) { el.style.left = (csl + dx) + 'px'; el.style.top = (cst + dy) + 'px'; }
    }
    function cardDragEnd() {
      if (!cardDragging) return;
      cardDragging = false; el.style.cursor = 'grab';
      el.style.transition = 'box-shadow 0.25s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      el.style.animationPlayState = 'running';
      if (!cardMoved) window.location.href='hub.html';
    }
    // Mouse events
    el.addEventListener('mousedown', function(e) {
      e.stopPropagation(); e.preventDefault();
      cardDragStart(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', function(e) { cardDragMove(e.clientX, e.clientY); });
    window.addEventListener('mouseup', function() { cardDragEnd(); });
    // Touch events for mobile
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
    world.appendChild(el);
  }

  // First 3 cards load immediately
  for (var fi = 0; fi < Math.min(3, photoCards.length); fi++) { addCard(photoCards[fi], fi, false); }
  // Rest fade in after 2.5s
  setTimeout(function() {
    for (var ri = 3; ri < photoCards.length; ri++) { addCard(photoCards[ri], ri, true); }
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
    var t = document.createElement('div');
    t.className = 'pg-text-tag';
    t.textContent = c.tag;
    if (c.dark) t.style.color = 'rgba(245,242,238,0.4)';
    inner.appendChild(h); inner.appendChild(t); el.appendChild(inner);
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

  function checkRecenter() {
    var drifted = Math.abs(offX - homeX) > 30 || Math.abs(offY - homeY) > 30 || scale > 1.05;
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
    hideRecenter();
    setTimeout(function() { pgWorld.style.transition = 'none'; }, 550);
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

document.addEventListener('DOMContentLoaded', function() { initPlayground(); });
