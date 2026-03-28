/* CIAD adapter - modifies the original basecamp JS for screen system */
function ciadInit() {
  // Lazy-load gallery iframes now that CIAD is visible
  if (typeof loadGalleryIframes === 'function') {
    setTimeout(loadGalleryIframes, 300);
  }
  var loader = document.getElementById('loader');
  if (loader) { loader.classList.add('done'); setTimeout(function() { loader.remove(); }, 100); }
  var hiddens = document.querySelectorAll('#screen-ciad .loading-hidden');
  for (var i = 0; i < hiddens.length; i++) hiddens[i].classList.remove('loading-hidden');
  setTimeout(function() { initPage(); }, 150);
}

// --- GLYPHS ------------------------------------------------
const G={
  play:   `<svg viewBox="0 0 28 28" fill="none"><polygon points="9,6 22,14 9,22" fill="currentColor" opacity=".92"/></svg>`,
  bolt:   `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="16,3 10,14 17,14 12,25"/></svg>`,
  circle: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="14" cy="14" r="8"/><circle cx="14" cy="14" r="3" fill="currentColor"/></svg>`,
  arrow:  `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="14" x2="23" y2="14"/><polyline points="16,7 23,14 16,21"/></svg>`,
  spark:  `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="14" y1="3" x2="14" y2="25"/><line x1="3" y1="14" x2="25" y2="14"/><line x1="6" y1="6" x2="22" y2="22"/><line x1="22" y1="6" x2="6" y2="22"/></svg>`,
  diamond:`<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="14,3 25,14 14,25 3,14"/></svg>`,
  square: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="6" y="6" width="16" height="16" rx="3"/></svg>`,
  loop:   `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 9A9 9 0 1 0 23 14"/><polyline points="19,5 23,9 19,13"/></svg>`,
  film:   `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="22" height="14" rx="2"/><line x1="8" y1="7" x2="8" y2="21"/><line x1="20" y1="7" x2="20" y2="21"/><line x1="3" y1="12" x2="8" y2="12"/><line x1="20" y1="12" x2="25" y2="12"/><line x1="3" y1="16" x2="8" y2="16"/><line x1="20" y1="16" x2="25" y2="16"/></svg>`,
  flash:  `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 3L6 16h8l-1 9 9-13h-8z"/></svg>`,
  people: `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10" cy="9" r="4"/><path d="M2 22c0-4 3.6-7 8-7"/><circle cx="20" cy="9" r="3"/><path d="M19 22c0-3 2.2-5.5 5-5.5"/></svg>`,
  quote:  `<svg viewBox="0 0 28 28" fill="currentColor"><path d="M7 8c-2.2 1.1-3.5 3-3.5 5.2 0 2.4 1.6 4.3 3.8 4.3 1.8 0 3.2-1.4 3.2-3.2 0-1.6-1.1-2.9-2.6-3.1.4-1.2 1.4-2.2 2.8-2.8L7 8zm11 0c-2.2 1.1-3.5 3-3.5 5.2 0 2.4 1.6 4.3 3.8 4.3 1.8 0 3.2-1.4 3.2-3.2 0-1.6-1.1-2.9-2.6-3.1.4-1.2 1.4-2.2 2.8-2.8L18 8z" opacity=".92"/></svg>`,
};

// --- GALLERY ------------------------------------------------
// --- GALLERY HLS STREAMS -------------------------------------------------
const galleryIds=[
  'https://vz-466dc643-be5.b-cdn.net/07762875-5f7d-4b12-9fb6-db7eeb9b80fa/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/e8e19d6f-d12e-449a-be7c-6c69bb852cbf/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/9f0348d6-000d-4a2d-8ff4-6f98092114d9/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/116842f8-5134-413d-8f7b-a9e3ec0e2c0e/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/6ad21f7a-14b3-4227-afb2-fabdfbba1f28/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/4aebdac6-1388-4476-abf6-2e0983174b80/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/938206ed-5c43-4cc3-98ce-515d5b290e86/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/435c71ed-b735-4b87-8ade-f7a7477e1bc9/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/614e3e2f-c031-47f9-b5ca-f51061f02a22/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/30ee8a76-a3dd-44e5-b808-72a6d146c785/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/77764055-fbdf-454b-91d7-82ebfbdeed2f/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/d7d48fc9-b0f6-407e-a8c0-5283aa12665a/playlist.m3u8',
  'https://vz-466dc643-be5.b-cdn.net/ccf7889d-3372-4abc-9ddb-1e1e2b00fabc/playlist.m3u8'
];
function buildGalleryRow(el, ids, offset){
  [...ids,...ids].forEach(function(src, i){
    var cell=document.createElement('div');cell.className='gcell';
    if(i < ids.length){
      // First set: real HLS stream (loads on CIAD open)
      cell.dataset.hlsSrc=src;
    } else {
      // Second set: static thumbnail only (seamless loop visual, no extra stream)
      var thumb=src.replace('playlist.m3u8','thumbnail.jpg');
      var img=document.createElement('img');
      img.src=thumb;img.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;pointer-events:none;';
      img.loading='lazy';
      cell.appendChild(img);
    }
    el.appendChild(cell);
  });
}
buildGalleryRow(document.getElementById('row1'),galleryIds.slice(0,7),0);
buildGalleryRow(document.getElementById('row2'),galleryIds.slice(7),0);

// Inject HLS video elements lazily when CIAD screen opens
function loadGalleryIframes(){
  document.querySelectorAll('.gcell[data-hls-src]').forEach(function(cell){
    var src=cell.dataset.hlsSrc;
    var vid=document.createElement('video');
    vid.muted=true;
    vid.autoplay=true;
    vid.loop=true;
    vid.playsInline=true;
    vid.setAttribute('playsinline','');
    if(window.Hls&&Hls.isSupported()){
      var hls=new Hls({lowLatencyMode:false,startLevel:-1,maxBufferLength:10});
      hls.loadSource(src);
      hls.attachMedia(vid);
      hls.on(Hls.Events.MANIFEST_PARSED,function(){vid.play().catch(function(){});});
    } else if(vid.canPlayType('application/vnd.apple.mpegurl')){
      vid.src=src;
      vid.play().catch(function(){});
    }
    cell.appendChild(vid);
    delete cell.dataset.hlsSrc;
  });
}
// requestIdleCallback fires when browser is idle after first paint
// fallback to setTimeout for Safari which doesn&rsquo;t support it
// Gallery iframes loaded lazily when CIAD screen opens - see ciadInit()


// --- CONTENT -----------------------------------------------

function setCurrency(c){
  const scope = document.getElementById('win-pricing') || document;
  scope.querySelectorAll('.price-inr').forEach(el=>{ el.style.display = c==='inr' ? 'inline' : 'none'; });
  scope.querySelectorAll('.price-usd').forEach(el=>{ el.style.display = c==='usd' ? 'inline' : 'none'; });
  const btnINR = scope.querySelector('#btn-inr');
  const btnUSD = scope.querySelector('#btn-usd');
  if(btnINR) btnINR.classList.toggle('active', c==='inr');
  if(btnUSD) btnUSD.classList.toggle('active', c==='usd');
}

// --- PORTFOLIO WORK ITEMS (Bunny HLS) ------------------------------------
const workItems=[
  {id:'w1',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/07762875-5f7d-4b12-9fb6-db7eeb9b80fa/playlist.m3u8',title:'Client \u2014 Project',desc:'Founder content series. Positioning, authority, and inbound lead generation.',tags:['Founder','Reels']},
  {id:'w2',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/e8e19d6f-d12e-449a-be7c-6c69bb852cbf/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Coach','LinkedIn']},
  {id:'w3',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/9f0348d6-000d-4a2d-8ff4-6f98092114d9/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Brand','Campaign']},
  {id:'w4',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/116842f8-5134-413d-8f7b-a9e3ec0e2c0e/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Founder','Podcast']},
  {id:'w5',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/6ad21f7a-14b3-4227-afb2-fabdfbba1f28/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Creator','Reels']},
  {id:'w6',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/4aebdac6-1388-4476-abf6-2e0983174b80/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Brand','B-Roll']},
  {id:'w7',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/938206ed-5c43-4cc3-98ce-515d5b290e86/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Founder','Authority']},
  {id:'w8',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/435c71ed-b735-4b87-8ade-f7a7477e1bc9/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Founder','Reels']},
  {id:'w9',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/614e3e2f-c031-47f9-b5ca-f51061f02a22/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Brand','Campaign']},
  {id:'w10',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/30ee8a76-a3dd-44e5-b808-72a6d146c785/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Coach','LinkedIn']},
  {id:'w11',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/77764055-fbdf-454b-91d7-82ebfbdeed2f/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Creator','Reels']},
  {id:'w12',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/d7d48fc9-b0f6-407e-a8c0-5283aa12665a/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Founder','Authority']},
  {id:'w13',hlsSrc:'https://vz-466dc643-be5.b-cdn.net/ccf7889d-3372-4abc-9ddb-1e1e2b00fabc/playlist.m3u8',title:'Client \u2014 Project',desc:'Short description of the project and what was produced.',tags:['Brand','B-Roll']},
];
function buildWorkContent(){return workItems.map(function(item){var thumb=item.hlsSrc.replace('playlist.m3u8','thumbnail.jpg');var tags=item.tags.map(function(t){return '<span class="work-tag">'+t+'</span>';}).join('');return '<div class="work-item" id="wi-'+item.id+'" onclick="toggleWork(\''+item.id+'\',\''+item.hlsSrc+'\')"><div class="work-thumb-row"><div class="work-thumb"><img src="'+thumb+'" alt="'+item.title+'" loading="lazy" onerror="this.style.display=\'none\'"><div class="play-badge"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 19,12 8,19"/></svg></div></div><div><div class="work-title">'+item.title+'</div><p class="work-desc">'+item.desc+'</p><div class="work-meta-row">'+tags+'</div></div></div><div class="work-embed" id="we-'+item.id+'" style="display:none;"></div></div>';}).join('');}

const folders=[
  // 0 TLDR
  { id:'tldr', preview:'60 seconds. the whole picture.', label:'TLDR', glyph:'flash', color:'fi-rose',
    eyebrow:'60 seconds', title:'TLDR', subtitle:"for the founder who isn&rsquo;t reading all of it.",
    content:`
      <div class="w-eye">tldr &mdash; for the founder who isn&rsquo;t reading all of it</div>
      <div class="w-h">you&rsquo;re busy. fair.<br><em>here&rsquo;s the short version.</em></div>

      <div class="w-step"><div class="w-sn">1</div><div><div class="w-st">before cameras &mdash; strategy</div><div class="w-sb">positioning calls. a proper brief. we figure out who you&rsquo;re talking to, what they actually care about, and what will make them stop scrolling. this is where most content fails. we sort it before a single camera comes out.</div></div></div>
      <div class="w-step"><div class="w-sn">2</div><div><div class="w-st">one shoot day</div><div class="w-sb">you show up once. we direct, shoot, handle everything. that&rsquo;s your entire monthly content commitment. done.</div></div></div>
      <div class="w-step"><div class="w-sn">3</div><div><div class="w-st">you don&rsquo;t touch it again</div><div class="w-sb">editing handled. revisions on frame.io &mdash; you watch, comment, approve right on the frame. everything scheduled and out the door for the full month.</div></div></div>

      <div class="w-div"></div>
      <p class="w-p">no daily decisions. no wondering what to post. no agency keeping your page active while your business stands still.</p>
      <div class="w-closer"><em>one shoot day. a month sorted. that&rsquo;s genuinely it.</em></div>
      <button class="w-cta" onclick="bookCall()">Book a Call &rarr;</button>

      <div class="w-next" onclick="openNextFolder('problem')">next: the problem &#8594;</div>
    `
  },

  // 1 THE PROBLEM
  { id:'problem', preview:'why most content fails. and why yours can&rsquo;t.', label:'The Problem', glyph:'bolt', color:'fi-pink',
    eyebrow:'The real problem', title:'The Real Problem', subtitle:"it was never effort. it was never budget.",
    content:`
      <div class="w-eye">the real problem</div>
      <div class="w-h">most content is built on<br><em>aesthetics and volume.</em><br>not on why anyone stops.</div>

      <p class="w-p">you already know content matters. you&rsquo;ve probably tried doing it yourself and realised fast &mdash; it&rsquo;s a full-time job. ideation, strategy, psychology, production, distribution. all at once. every single week. forever.</p>

      <div class="w-outcome"><div class="w-dot" style="background:var(--pink)"></div><div class="w-outcome-text">maybe you tried an agency. expensive. and if you&rsquo;re honest? they just kept your page alive. great for letting existing customers know you still exist. useless for reaching anyone new.</div></div>
      <div class="w-outcome"><div class="w-dot" style="background:var(--pink)"></div><div class="w-outcome-text">the agencies actually good at this are working with brands ten times your size. they won&rsquo;t take your call. and you can&rsquo;t afford them anyway.</div></div>
      <div class="w-outcome"><div class="w-dot" style="background:var(--pink)"></div><div class="w-outcome-text">and i think that&rsquo;s actually the problem. not your effort. not your budget. the model is broken. you don&rsquo;t need to post more. you need to post smarter.</div></div>

      <div class="w-div"></div>
      <div class="w-quote"><p>&ldquo;most agencies hand you edited files and move on. nobody&rsquo;s asking if you actually made your money back.&rdquo;</p></div>

      <div class="w-next" onclick="openNextFolder('reviews')">next: the word on the street &#8594;</div>
    `
  },

  // 2 HOW IT WORKS
  { id:'how', preview:'one shoot day. a month handled.', label:'How It Works', glyph:'arrow', color:'fi-violet',
    eyebrow:'4 steps', title:'How It Works', subtitle:'one day. one system.',
    content:`
      <div class="w-eye">how it works</div>
      <div class="w-h">one shoot day.<br><em>a month of content.</em><br>you don&rsquo;t come back to it until next month.</div>
      <div class="w-step"><div class="w-sn">01</div><div><div class="w-st">clarify your positioning</div><div class="w-sb">strategy calls. a proper brief. your positioning, your through-line, who you&rsquo;re talking to, what will make them stop. this is where most content falls apart &mdash; before anyone even picks up a camera. we fix it here.</div></div></div>
      <div class="w-step"><div class="w-sn">02</div><div><div class="w-st">batch shoot in one day</div><div class="w-sb">one focused shoot. you show up once. we direct, we capture, we handle everything on the day. that&rsquo;s your entire monthly content commitment &mdash; done.</div></div></div>
      <div class="w-step"><div class="w-sn">03</div><div><div class="w-st">distribute with intent</div><div class="w-sb">editing handled. revisions via frame.io &mdash; watch, comment, approve right on the frame. unlimited revisions. everything scheduled. you&rsquo;re done for the month.</div></div></div>
      <div class="w-step"><div class="w-sn">04</div><div><div class="w-st">learn and refine</div><div class="w-sb">we look at what resonated. we adjust the strategy. every month gets better &mdash; not because you did anything differently, but because the system compounds.</div></div></div>

      <div class="w-next" onclick="openNextFolder('outcomes')">next: what actually changes &#8594;</div>
    `
  },

  // 3 OUTCOMES
  { id:'outcomes', preview:'what actually changes when it works.', label:'Outcomes', glyph:'spark', color:'fi-green',
    eyebrow:'What changes', title:'What Changes', subtitle:'you show up once. everything else is handled.',
    content:`
      <div class="w-eye">what changes</div>
      <div class="w-h">you show up once a month.<br><em>everything else is handled.</em></div>
      <div class="w-outcome"><div class="w-dot"></div><div class="w-outcome-text">your ideal customer stops scrolling. because the content was built to make them stop &mdash; not just to look good in the feed.</div></div>
      <div class="w-outcome"><div class="w-dot"></div><div class="w-outcome-text">your message feels coherent. people understand what you do and why it&rsquo;s for them before they&rsquo;ve had a single conversation with you.</div></div>
      <div class="w-outcome"><div class="w-dot"></div><div class="w-outcome-text">your content works when you&rsquo;re not. the system runs. you focus on the actual business.</div></div>
      <div class="w-outcome"><div class="w-dot"></div><div class="w-outcome-text">you stop gambling on content. every piece has a reason to exist. you stop pouring in and hoping.</div></div>
      <div class="w-outcome"><div class="w-dot"></div><div class="w-outcome-text">content stops being the thing you&rsquo;re always behind on. after one shoot day, you&rsquo;re ahead for the entire month.</div></div>

      <button class="w-cta" onclick="bookCall()">Book a Call &#8594;</button>
      <div class="w-next" onclick="openNextFolder('fit')">next: is this for you? &#8594;</div>
    `
  },

  // 4 IS THIS YOU?
  { id:'fit', preview:'is this the right move for you?', label:'Is This You?', glyph:'diamond', color:'fi-cyan',
    eyebrow:'Fit check', title:'Is This For You?', subtitle:'honest.',
    content:`
      <div class="w-eye">is this for you</div>
      <div class="w-h">honest<br><em>fit check.</em></div>
      <div class="w-fit w-fit-yes">
        <div class="w-fit-tag">this works if</div>
        <ul>
          <li>you&rsquo;re a founder, coach, or creator who&rsquo;s past the figuring-it-out phase</li>
          <li>you&rsquo;ve tried content &mdash; yourself or through an agency &mdash; and it hasn&rsquo;t worked the way it should</li>
          <li>you want a month of content handled from one shoot day without touching it again</li>
          <li>you&rsquo;re done with agencies making content like it&rsquo;s 2017</li>
        </ul>
      </div>
      <div class="w-div"></div>
      <div class="w-fit w-fit-no">
        <div class="w-fit-tag">this doesn&rsquo;t work if</div>
        <ul>
          <li>you&rsquo;re chasing vanity numbers over actual business impact</li>
          <li>you want someone to &ldquo;just edit clips&rdquo;</li>
          <li>you want the output without the strategy and positioning work that makes it worth anything</li>
        </ul>
      </div>

      <button class="w-cta" onclick="bookCall()">Book a Call &#8594;</button>
      <div class="w-next" onclick="openNextFolder('pricing')">next: packages &#8594;</div>
    `
  },

  // 5 PACKAGES
  { id:'pricing', preview:'one shoot day. three tiers.', label:'Packages', glyph:'square', color:'fi-teal',
    eyebrow:'Packages', title:'Packages', subtitle:'one shoot day. across all packages.',
    content:`
      <div class="w-eye">packages</div>
      <div class="w-h">one shoot day per month.<br><em>across all packages.</em></div>
      <p class="w-p" style="font-size:12px;color:var(--muted);">the difference isn&rsquo;t ego. it&rsquo;s volume and how fast the feedback loop compounds.</p>
      <div class="currency-toggle"><button class="ctog-btn active" id="btn-inr" onclick="setCurrency('inr')">₹ INR</button><button class="ctog-btn" id="btn-usd" onclick="setCurrency('usd')">$ USD</button></div>
      <div class="w-tier">
        <div class="w-tier-header"><div class="w-tier-name">foundation</div></div>
        <div class="w-tier-vol">6</div><div class="w-tier-unit">videos / month</div>
        <div class="w-tier-price"><span class="price-inr">₹36,995</span><span class="price-usd">$399</span></div>
        <div class="w-tier-desc">For founders who need to stay visible without content taking over their week.</div>
      </div>
      <div class="w-tier featured">
        <div class="w-tier-header"><div class="w-tier-name">growth</div><div class="w-tier-badge">most common</div></div>
        <div class="w-tier-vol">12</div><div class="w-tier-unit">videos / month</div>
        <div class="w-tier-price"><span class="price-inr">₹54,995</span><span class="price-usd">$594</span></div>
        <div class="w-tier-desc">For founders ready to build authority and start pulling in inbound &mdash; consistently.</div>
      </div>
      <div class="w-tier">
        <div class="w-tier-header"><div class="w-tier-name">expansion</div></div>
        <div class="w-tier-vol">16&ndash;20</div><div class="w-tier-unit">videos / month</div>
        <div class="w-tier-price"><span class="price-inr">₹1,30,000</span><span class="price-usd">$1,404</span></div>
        <div class="w-tier-desc">For established founders turning their content into a proper revenue channel.</div>
      </div>
      <div class="w-note"><span class="w-note-icon">note</span><span class="w-note-text">pay 3 months upfront &rarr; save 10%.</span></div>
      <button class="w-cta" onclick="bookCall()">Book a Call &rarr;</button>
    
      <div class="w-next" onclick="openNextFolder('team')">next: meet the team &#8594;</div>
    `
  },

  // 6 THE WORD (testimonials)
  { id:'reviews', preview:'four founders. unprompted.', label:'The Word', glyph:'quote', color:'fi-teal',
    eyebrow:'Word on the street', title:'The Word on the Street', subtitle:'i didn&rsquo;t ask any of them to say this.',
    content:`
      <div class="w-eye">word on the street</div>
      <div class="w-h">four founders.<br><em>i didn&rsquo;t ask any of them to say this.</em></div>

      <div class="w-testi">
        <div class="w-testi-top">
          <div class="w-testi-avatar" id="testi-photo-1"><!-- SWAP: <img src="sarah.jpg" alt="Sarah Edwards"> -->S</div>
          <div class="w-testi-meta">
            <div class="w-testi-name">Sarah Edwards</div>
            <div class="w-testi-role">Founder, Copper + Cloves</div>
          </div>
        </div>
        <div class="w-testi-text">&ldquo;loved working with raj to create new content to deliver the messages that drive me and the business. his editing style helped shape this piece into something direct and impactful.&rdquo;</div>
      </div>

      <div class="w-testi">
        <div class="w-testi-top">
          <div class="w-testi-avatar" id="testi-photo-2"><!-- SWAP: <img src="patricia.jpg" alt="Patricia Cosma"> -->P</div>
          <div class="w-testi-meta">
            <div class="w-testi-name">Patricia Cosma</div>
            <div class="w-testi-role">Co-founder, Indian Cacao &amp; Craft Chocolate Festival</div>
          </div>
        </div>
        <div class="w-testi-text">&ldquo;i enjoy working with raj, he is very focused and motivated, which makes it a smooth experience. the results of his work are great without too much back and forth.&rdquo;</div>
      </div>

      <div class="w-testi">
        <div class="w-testi-top">
          <div class="w-testi-avatar" id="testi-photo-3"><!-- SWAP: <img src="kavya.jpg" alt="Kavya Peerbhoy"> -->K</div>
          <div class="w-testi-meta">
            <div class="w-testi-name">Kavya Peerbhoy</div>
            <div class="w-testi-role">Founder, &amp;Shine</div>
          </div>
        </div>
        <div class="w-testi-text">&ldquo;his first draft was excellent and exactly what i was looking for. he is easy to work with and truly understands what is required. i have worked with him on several projects since the first time.&rdquo;</div>
      </div>

      <div class="w-testi">
        <div class="w-testi-top">
          <div class="w-testi-avatar" id="testi-photo-4"><!-- SWAP: <img src="sakshee-aditya.jpg" alt="Sakshee & Aditya"> -->S</div>
          <div class="w-testi-meta">
            <div class="w-testi-name">Sakshee &amp; Aditya</div>
            <div class="w-testi-role">Co-founders, Stamp &amp; Seal Company</div>
          </div>
        </div>
        <div class="w-testi-text">&ldquo;he has an incredible talent for taking a moodboard and turning it into something even better than expected. what surprised me most was how he elevated the project with his creative ideas.&rdquo;</div>
      </div>

      <button class="w-cta" onclick="bookCall()">Book a Call &#8594;</button>
      <div class="w-next" onclick="openNextFolder('how')">next: how it works &#8594;</div>
    `
  },

  // 7 TEAM
  { id:'team', preview:'two people. your whole pipeline.', label:'Team', glyph:'people', color:'fi-cyan',
    eyebrow:'The people', title:'Meet the Team', subtitle:'we&rsquo;re not an agency.',
    content:`
      <div class="w-eye">meet the team</div>
      <div class="w-h">two people.<br><em>no fluff.</em></div>
      <p class="w-p">we&rsquo;re not an agency. we&rsquo;re two people who understand social at a level most agencies don&rsquo;t &mdash; because we grew up on it, study it obsessively, and build our own presence too. between the two of us, your entire content pipeline is covered. you show up for the shoot. we handle everything else.</p>
      <div class="w-div"></div>
      <div class="w-team-member">
        <div class="w-avatar" id="photo-raj"><!-- SWAP: <img src="raj.jpg" alt="Raj"> -->R</div>
        <div>
          <div class="w-tname">Raj Kashyap</div>
          <div class="w-trole">strategy · positioning · direction · editing</div>
          <p class="w-tbio">every client i&rsquo;ve ever had came through word of mouth. not ads, not cold outreach &mdash; people telling other people. that only happens when you genuinely want the person you&rsquo;re working with to win. i care about whether your content makes you money. not just whether it looks good.<br><br>i understand the psychology of why content works &mdash; not from a textbook but from years of being deep in it. i also build my own presence at <em>raj.uncurated</em>, testing what works in real time. i&rsquo;m not advising you on something i don&rsquo;t do myself.</p>
        </div>
      </div>
      <div class="w-team-member">
        <div class="w-avatar" id="photo-dhiman"><!-- SWAP: <img src="dhiman.jpg" alt="Dhiman"> -->D</div>
        <div>
          <div class="w-tname">Dhiman</div>
          <div class="w-trole">editing · post-production · execution</div>
          <p class="w-tbio">dhiman is the reason the work ships clean and on time. where i&rsquo;m ideas and instinct, dhiman is precision and patience &mdash; the kind of editor who notices what most people skip.<br><br>one of northeast india&rsquo;s fastest growing streamers &mdash; he understands social-first content not as a language he follows but as one he already speaks fluently.</p>
        </div>
      </div>
      <div class="w-note"><span class="w-note-icon">note</span><span class="w-note-text">between the two of us: strategy, ideation, shoot direction, editing, colour grading, distribution. everything your content needs &mdash; without the agency overhead or the agency indifference.</span></div>

      <button class="w-cta" onclick="bookCall()">Book a Call &#8594;</button>
      <div class="w-next" onclick="openNextFolder('work')">next: recent work &#8594;</div>
    `
  },

  // 8 RECENT WORK
  { id:'work', preview:'every frame from one day.', label:'Recent Work', glyph:'film', color:'fi-indigo',
    eyebrow:'Portfolio', title:'Recent Work', subtitle:'every frame you&rsquo;re about to see came from a single shoot day.',
    content:`
      <div class="w-eye">in the wild</div>
      <div class="w-h"><em>every frame from one day.</em></div>
      <p class="w-p" style="font-size:12px;color:var(--muted);margin-bottom:14px;">tap any project to watch.</p>
      ${buildWorkContent()}

      <div class="w-div"></div>
      <div class="w-closer"><em>you&rsquo;ve seen everything. ready to talk?</em></div>
      <button class="w-cta" onclick="bookCall()">Book a Call &#8594;</button>
    `
  },
];




const ICON_DESKTOP = 54;
const ICON_MOBILE  = 38;
// resolved at layout time
function getIcon(){ return window.innerWidth < 640 ? ICON_MOBILE : ICON_DESKTOP; }
const ICON_HALF = 27; // max of the two, used as safe margin
const PAD = 28; // minimum gap between folder edge and hero edge

const desktop = document.getElementById('desktop');
let openWindows={}, zTop=700, folderEls=[], expandedWork=null;
let heroRect = null; // measured after render

// --- HERO --------------------------------------------------
const hero = document.createElement('div');
hero.id = 'hero';
hero.innerHTML = `
  <div class="h-eye">Content in a Day</div>
  <h1 class="h-title">
    <span class="h-line">nobody's paying attention.</span>
    <em class="h-glow h-line">until they are.</em>
    <span class="h-line h-break"></span>
    <span class="h-line">one day.</span>
    <span class="h-line">a month of content.</span>
    <em class="h-glow h-line">built on science.</em>
  </h1>
  <button id="hero-cta" onclick="bookCall()">Book a Call &rarr;</button>
  <div class="h-sub">everything you need to know is in the folders.</div>
  <div class="h-science">
    <span class="h-science-pill">psychology</span>
    <span class="h-science-dot"></span>
    <span class="h-science-pill">strategy</span>
    <span class="h-science-dot"></span>
    <span class="h-science-pill">aesthetics</span>
  </div>`;
// Mobile: hero goes directly on body (desktop is hidden on mobile)
// Desktop: hero goes inside #desktop canvas
if(window.innerWidth < 640){
  document.body.appendChild(hero);
} else {
  desktop.appendChild(hero);
}

function positionHero() {
  if(window.innerWidth < 640) return; // CSS handles mobile hero position
  const vw = window.innerWidth, vh = window.innerHeight;
  const cy = vh * 0.50;
  Object.assign(hero.style, {
    position: 'absolute',
    top: cy + 'px',
    left: (vw / 2) + 'px',
    transform: 'translate(-50%, -50%)',
  });
}

function measureHero() {
  positionHero();
  // Force layout then measure
  hero.getBoundingClientRect(); // trigger reflow
  heroRect = hero.getBoundingClientRect();
}

// --- POSITION FOLDERS ------------------------------------
function computePositions() {
  const vw = window.innerWidth, vh = window.innerHeight;
  const n  = folders.length;
  const isMob = vw < 640;

  // -- MOBILE layout ---------------------------------------
  if (isMob) {
    const cx   = vw / 2;
    const ICON = 19; // half of 38px mobile icon

    // -- Measure actual hero bottom including CTA + sub ---------
    const heroTop = heroRect.top;
    const heroCta = document.getElementById('hero-cta');
    const heroSub = hero.querySelector('.h-sub');
    const ctaBot  = heroCta ? heroCta.getBoundingClientRect().bottom : heroRect.bottom;
    const subBot  = heroSub ? heroSub.getBoundingClientRect().bottom : heroRect.bottom;
    const heroBot = Math.max(heroRect.bottom, ctaBot, subBot);
    const heroCy  = (heroTop + heroBot) / 2;

    // -- Screen boundaries --------------------------------------
    const topSafe = ICON + 52;       // below status bar
    const botSafe = vh - ICON - 112; // above trusted-by strip

    const clamp = (y) => Math.max(topSafe, Math.min(y, botSafe));

    // -- ABOVE-HERO SPACE ---------------------------------------
    const aboveSpace = heroTop - topSafe;
    // Min 62px between stacked folder centres (38px icon + 14px label + 10px gap)
    const stackGap = Math.max(62, aboveSpace * 0.42);

    // Two stacked rows above:
    // yUpper = upper folder in each stack (TLDR left, The Problem right)
    // yLower = lower folder in each stack (The Word left, Recent Work right)
    // Team goes centre, halfway between upper and lower
    const yUpper = clamp(topSafe + aboveSpace * 0.22);
    const yLower = clamp(Math.max(yUpper + stackGap, topSafe + aboveSpace * 0.62));
    const yCentre = clamp((yUpper + yLower) / 2); // Team - centre column

    // -- FLANK - beside hero text -------------------------------
    const yFlank = clamp(heroCy);

    // -- BELOW HERO - single row, left + right ------------------
    const belowSpace = botSafe - heroBot;
    const yBelow = clamp(heroBot + Math.max(ICON + 36, belowSpace * 0.48));

    // -- X POSITIONS --------------------------------------------
    const xL = ICON + 14;        // far left edge
    const xR = vw - ICON - 14;   // far right edge

    // -- LAYOUT MAP (matches image 2 exactly) -------------------
    //
    //  TLDR(xL,yUpper)    Team(cx,yCentre)   The Problem(xR,yUpper)
    //  The Word(xL,yLower)                   Recent Work(xR,yLower)
    //
    //           ------- HERO TEXT -------
    //
    //  How It Works(xL,yFlank)         Outcomes(xR,yFlank)
    //
    //  Is This You?(xL,yBelow)         Packages(xR,yBelow)
    //
    //           --- TRUSTED BY ---
    //
    // Folder indices: 0:tldr 1:problem 2:how 3:outcomes
    //                 4:fit  5:pricing 6:reviews 7:team 8:work
    // Inward x for below row - not flush to edge, slightly inset
    const xBL = vw * 0.22;  // below-left inset
    const xBR = vw * 0.78;  // below-right inset

    const ordered = [
      { x: cx, y: clamp(yCentre) },  // 0 TLDR         - centre, staggered
      { x: xR, y: clamp(yUpper)  },  // 1 The Problem  - right col, upper
      { x: xL, y: clamp(yFlank)  },  // 2 How It Works - flank left
      { x: xR, y: clamp(yFlank)  },  // 3 Outcomes     - flank right
      { x: xBL,y: clamp(yBelow)  },  // 4 Is This You? - below inset-left
      { x: xBR,y: clamp(yBelow)  },  // 5 Packages     - below inset-right
      { x: xL, y: clamp(yLower)  },  // 6 The Word     - left col, lower
      { x: xL, y: clamp(yUpper)  },  // 7 Team         - left col, upper
      { x: xR, y: clamp(yLower)  },  // 8 Recent Work  - right col, lower
    ];

    return ordered.slice(0, n).map(p => ({
      x: Math.max(ICON + 8, Math.min(p.x, vw - ICON - 8)),
      y: Math.max(ICON + 8, Math.min(p.y, vh - ICON - 8)),
    }));

  // -- DESKTOP layout - perimeter scatter -------------------
  } else {
    const cx = vw / 2, cy = vh / 2;

    // Perimeter zones as absolute pixel positions
    // derived from fractions so they scale with viewport
    // 0:tldr 1:problem 2:how 3:outcomes 4:fit 5:pricing 6:reviews 7:team 8:work
    // Folders pulled closer to hero - perimeter feel with less dead space
    const map = [
      { x: vw * 0.13, y: vh * 0.20 },  // 0 TLDR         - top-left
      { x: vw * 0.40, y: vh * 0.13 },  // 1 The Problem  - top-centre-left
      { x: vw * 0.18, y: vh * 0.60 },  // 2 How It Works - left-mid-low
      { x: vw * 0.76, y: vh * 0.16 },  // 3 Outcomes     - top-right
      { x: vw * 0.24, y: vh * 0.82 },  // 4 Is This You? - bottom-left
      { x: vw * 0.54, y: vh * 0.84 },  // 5 Packages     - bottom-centre
      { x: vw * 0.82, y: vh * 0.46 },  // 6 The Word     - right-mid
      { x: vw * 0.82, y: vh * 0.68 },  // 7 Team         - right-low
      { x: vw * 0.18, y: vh * 0.78 },  // 8 Recent Work  - bottom-left inner
    ];

    // Safety: clamp to screen, avoid toggle (top 54px) and dock (bottom 80px)
    const margin = ICON_HALF + 16;
    return map.slice(0, n).map(p => ({
      x: Math.max(margin, Math.min(p.x, vw - margin)),
      y: Math.max(ICON_HALF + 54, Math.min(p.y, vh - ICON_HALF - 80)),
    }));
  }
}

// --- RENDER FOLDERS ----------------------------------------
function renderFolders() {
  measureHero();
  const pos = computePositions();

  if (folderEls.length === 0) {
    folders.forEach((f, i) => {
      const el = document.createElement('div');
      el.className = 'folder';
      el.style.animationDelay = (i * 0.05) + 's';
      const icon = document.createElement('div');
      // TLDR keeps rounded square (it&rsquo;s the special starting folder)
      // All others get macOS Tahoe folder shape
      const isTLDR = f.id === 'tldr';
      icon.className = isTLDR ? `ficon ${f.color}` : `ftahoe ${f.color}`;
      const glyph = document.createElement('div');
      glyph.className = 'fglyph'; glyph.innerHTML = G[f.glyph] || G.square;
      icon.appendChild(glyph);
      const lbl = document.createElement('div');
      lbl.className = 'flabel'; lbl.textContent = f.label;
      el.appendChild(icon); el.appendChild(lbl);
      attachInteraction(el, f);
      // Attach hover preview on desktop
      if(window._attachFolderPreview && f.preview){
        window._attachFolderPreview(el, f.preview);
      }
      desktop.appendChild(el);
      folderEls.push(el);
    });
  }

  folderEls.forEach((el, i) => {
    const p    = pos[i] || pos[pos.length - 1];
    const f    = folders[i];
    // Tahoe folders: 62-52 desktop, 46-38 mobile. Centre on x by width/2.
    const isTLDR   = f && f.id === 'tldr';
    const isMobNow = window.innerWidth < 640;
    const halfW = isTLDR ? getIcon()/2 : (isMobNow ? 23 : 31);
    const halfH = isTLDR ? getIcon()/2 : (isMobNow ? 19 : 26);
    el.style.left = (p.x - halfW) + 'px';
    el.style.top  = (p.y - halfH) + 'px';
  });
}

// --- INTERACTION -------------------------------------------
function attachInteraction(el, f) {
  let sX, sY, sL, sT, moved;
  function start(x, y) { moved=false; sX=x; sY=y; sL=parseFloat(el.style.left)||0; sT=parseFloat(el.style.top)||0; el.style.zIndex=++zTop; }
  function move(x, y)  { const dx=x-sX,dy=y-sY; if(Math.abs(dx)+Math.abs(dy)>6)moved=true; if(moved){el.classList.add('dragging');el.style.left=(sL+dx)+'px';el.style.top=(sT+dy)+'px';} }
  function end()       { el.classList.remove('dragging'); if(!moved)openWindow(f,el); }
  el.addEventListener('mousedown', e => { if(e.button!==0)return; e.preventDefault(); start(e.clientX,e.clientY); const mv=e=>move(e.clientX,e.clientY); const up=()=>{end();document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);}; document.addEventListener('mousemove',mv); document.addEventListener('mouseup',up); });
  el.addEventListener('touchstart', e => { const t=e.touches[0]; start(t.clientX,t.clientY); }, { passive:true });
  el.addEventListener('touchmove',  e => { const t=e.touches[0]; move(t.clientX,t.clientY); }, { passive:true });
  el.addEventListener('touchend', end);
}

// --- OPEN WINDOW - centred, auto-closes previous --------------
function openWindow(f, folderEl) {
  const prev = Object.keys(openWindows);
  prev.forEach(id => closeWindow(id));
  const delay = prev.length > 0 ? 80 : 0;
  setTimeout(() => {
    const win = document.createElement('div');
    win.className = 'window'; win.id = 'win-' + f.id;
    win.style.zIndex = ++zTop;
    // Set transform-origin based on folder position relative to viewport centre
    // so the window appears to expand from where the folder was
    if (window.innerWidth >= 640) {
      const fr2 = folderEl.getBoundingClientRect();
      const fcx = fr2.left + fr2.width  / 2;
      const fcy = fr2.top  + fr2.height / 2;
      // Express as percentage relative to the window's own centre (50%,50%)
      // We shift origin toward the folder: clamp to 20-80% so it never looks extreme
      const ox = Math.max(20, Math.min(80, ((fcx / window.innerWidth)  * 100).toFixed(1)));
      const oy = Math.max(20, Math.min(80, ((fcy / window.innerHeight) * 100).toFixed(1)));
      win.style.setProperty('--origin-x', ox + '%');
      win.style.setProperty('--origin-y', oy + '%');
    }
    // Position is handled entirely by CSS (top:50% left:50% transform)
    // Just set an initial left/top so mobile bottom-sheet override works
    win.style.left = '50%';
    win.style.top  = '50%';
    win.innerHTML = `
      <div class="winbar" id="tb-${f.id}">
        <div class="traffic"><div class="td td-x" data-close="${f.id}"></div><div class="td td-m" data-close="${f.id}"></div><div class="td td-z"></div></div>
        <div style="display:flex;align-items:center;gap:8px;flex:1;">
          <div class="ficon ${f.color}" style="width:26px;height:26px;border-radius:7px;"><div class="fglyph" style="width:13px;height:13px;">${G[f.glyph]||G.square}</div></div>
          <div class="wmeta"><strong>${f.title}</strong><span>${f.subtitle}</span></div>
        </div>
        <span class="wtag-top">${f.eyebrow}</span>
      </div>
      <div class="wbody">${f.content}
        <button class="w-close-btn" data-close="${f.id}">✕ Close</button>
        ${shouldShowEscHint() ? '<div class="esc-hint"><kbd>esc</kbd> to close</div>' : ''}
      </div>`;
    (document.getElementById('screen-ciad') || document.body).appendChild(win);
    openWindows[f.id] = win;
    // Show overlay
    document.getElementById('win-overlay').classList.add('active');
    var sc = document.getElementById('screen-ciad'); if(sc) sc.classList.add('has-open-window');
    markEscSeen();
    win.querySelectorAll('[data-close]').forEach(d => d.addEventListener('click', e => {
      e.stopPropagation();
      const id = d.dataset.close;
      if(window.innerWidth < 640 && document.getElementById('mob-panel')?.classList.contains('open')){
        // Mobile + panel open: close only this window, keep panel
        closeWindow(id);
        // Re-show panel overlay if needed
        document.getElementById('win-overlay').classList.remove('active');
      } else {
        closeAllWindows();
      }
    }));
    win.addEventListener('mousedown', e => { e.stopPropagation(); win.style.zIndex = ++zTop; });
    win.addEventListener('touchstart', e => { e.stopPropagation(); }, { passive:true });
    // Desktop: drag via titlebar
    if (window.innerWidth >= 640) attachWinDrag(win, win.querySelector('#tb-' + f.id));
  }, delay);
}

function handleOverlayClick() {
  // Mobile + panel open: close only windows, keep panel
  if(window.innerWidth < 640 && document.getElementById('mob-panel')?.classList.contains('open')){
    Object.keys(openWindows).forEach(id => closeWindow(id));
    document.getElementById('win-overlay').classList.remove('active');
    var sc3 = document.getElementById('screen-ciad'); if(sc3) sc3.classList.remove('has-open-window');
  } else {
    closeAllWindows();
  }
}
function closeAllWindows() {
  Object.keys(openWindows).forEach(id => closeWindow(id));
  document.getElementById('win-overlay').classList.remove('active');
  var sc2 = document.getElementById('screen-ciad'); if(sc2) sc2.classList.remove('has-open-window');
}

function closeWindow(id) {
  const w = openWindows[id]; if(!w) return;
  if(id==='work') expandedWork = null;
  w.classList.add('closing');
  setTimeout(() => {
    w.remove();
    delete openWindows[id];
    // Remove blur when no windows remain
    if(Object.keys(openWindows).length === 0){
      const panel = document.getElementById('mob-panel');
      if(panel) panel.classList.remove('has-window');
    }
  }, 100);
  if(Object.keys(openWindows).length <= 1)
    document.getElementById('win-overlay').classList.remove('active');
}

function attachWinDrag(win, handle) {
  let sX,sY,sL,sT;
  handle.addEventListener('mousedown', e => {
    if(e.target.classList.contains('td')) return; e.preventDefault();
    sX=e.clientX; sY=e.clientY; sL=parseFloat(win.style.left)||0; sT=parseFloat(win.style.top)||0; win.style.zIndex=++zTop;
    const mv=e=>{win.style.left=(sL+e.clientX-sX)+'px';win.style.top=Math.max(0,(sT+e.clientY-sY))+'px';};
    const up=()=>{document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);};
    document.addEventListener('mousemove',mv); document.addEventListener('mouseup',up);
  });
}

var openHls = null;
function destroyOpenHls(){if(openHls){openHls.destroy();openHls=null;}}
function toggleWork(itemId, hlsSrc) {
  var item=document.getElementById('wi-'+itemId);var embed=document.getElementById('we-'+itemId);
  if(!item||!embed) return;var isOpen=item.classList.contains('expanded');
  if(expandedWork&&expandedWork!==itemId){var pi=document.getElementById('wi-'+expandedWork);var pe=document.getElementById('we-'+expandedWork);if(pi)pi.classList.remove('expanded');if(pe){pe.style.display='none';pe.innerHTML='';destroyOpenHls();}}
  if(isOpen){item.classList.remove('expanded');embed.style.display='none';embed.innerHTML='';destroyOpenHls();expandedWork=null;}
  else{
    item.classList.add('expanded');embed.style.display='block';embed.innerHTML='';
    var wrap=document.createElement('div');wrap.className='vimeo-wrap';
    var vid=document.createElement('video');vid.autoplay=true;vid.loop=true;vid.controls=true;vid.playsInline=true;vid.setAttribute('playsinline','');vid.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:none;pointer-events:auto;';
    wrap.appendChild(vid);embed.appendChild(wrap);
    var closeEl=document.createElement('div');closeEl.className='close-embed';closeEl.innerHTML='<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/></svg>Close';
    closeEl.onclick=function(e){e.stopPropagation();toggleWork(itemId,hlsSrc);};embed.appendChild(closeEl);
    if(window.Hls&&Hls.isSupported()){openHls=new Hls({startLevel:-1,maxBufferLength:15});openHls.loadSource(hlsSrc);openHls.attachMedia(vid);openHls.on(Hls.Events.MANIFEST_PARSED,function(){vid.play().catch(function(){});});}
    else if(vid.canPlayType('application/vnd.apple.mpegurl')){vid.src=hlsSrc;vid.play().catch(function(){});}
    expandedWork=itemId;setTimeout(function(){item.scrollIntoView({behavior:'smooth',block:'nearest'});},80);
  }
}

function toggleTheme() {
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  document.getElementById('tgl-icon').textContent  = isDark ? '🌙' : '☀️';
  document.getElementById('tgl-label').textContent = isDark ? 'Dark mode' : 'Light mode';
  // Update browser chrome colour
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#0d0d0f' : '#F5EDE1';
}

// --- HERO SEQUENCE -----------------------------------------
function runHeroSequence(onComplete) {
  const isMob = window.innerWidth < 640;
  const eye   = hero.querySelector('.h-eye');
  const lines = hero.querySelectorAll('.h-line');
  const cta   = document.getElementById('hero-cta');
  const sub   = hero.querySelector('.h-sub');
  const sci   = hero.querySelector('.h-science');

  // Desktop: snappy - total ~1.1s
  // Mobile:  comfortable - total ~1.8s
  const seq = isMob ? [
    [eye,      40],
    [lines[0], 140],
    [lines[1], 400],
    [lines[2], 720],
    [lines[3], 760],
    [lines[4], 1000],
    [lines[5], 1260],
    [cta,      1560],
    [sub,      1720],
    [sci,      1900],
  ] : [
    [eye,      30],
    [lines[0], 100],
    [lines[1], 280],
    [lines[2], 500],
    [lines[3], 530],
    [lines[4], 680],
    [lines[5], 840],
    [cta,      1020],
    [sub,      1120],
    [sci,      1240],
  ];

  seq.forEach(([el, delay]) => {
    if (!el) return;
    setTimeout(() => el.classList.add('h-visible'), delay);
  });

  const done = isMob ? 1900 + 180 : 1240 + 120;
  setTimeout(onComplete, done);
}


// --- CURSOR TRAIL ------------------------------------------
(function(){
  if(window.innerWidth < 640) return;
  const TRAIL = 8;
  const dots = [];
  // Create pool of dots
  for(let i = 0; i < TRAIL; i++){
    const d = document.createElement('div');
    d.className = 'cursor-dot';
    d.style.opacity = String((1 - i / TRAIL) * 0.6);
    document.body.appendChild(d);
    dots.push({ el:d, x:0, y:0 });
  }
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  let frame;
  function tick(){
    // Each dot chases the one ahead with lag
    dots[0].x += (mx - dots[0].x) * 0.35;
    dots[0].y += (my - dots[0].y) * 0.35;
    for(let i = 1; i < TRAIL; i++){
      dots[i].x += (dots[i-1].x - dots[i].x) * 0.55;
      dots[i].y += (dots[i-1].y - dots[i].y) * 0.55;
    }
    dots.forEach((d, i) => {
      d.el.style.left = d.x + 'px';
      d.el.style.top  = d.y + 'px';
      // fade toward tail
      d.el.style.opacity = String((1 - i / TRAIL) * 0.5);
    });
    frame = requestAnimationFrame(tick);
  }
  tick();
  // Hide when cursor leaves window
  document.addEventListener('mouseleave', () => dots.forEach(d => d.el.style.opacity = '0'));
  document.addEventListener('mouseenter', () => {});
})();

// --- FOLDER HOVER PREVIEW ----------------------------------
(function(){
  if(window.innerWidth < 640) return;
  const preview = document.createElement('div');
  preview.className = 'folder-preview';
  document.body.appendChild(preview);

  let hoverTimer = null;

  function showPreview(text, x, y){
    preview.textContent = text;
    // Position above the folder, centred
    const pw = 200; // estimated max width
    const px = Math.max(8, Math.min(x - pw/2, window.innerWidth - pw - 8));
    const py = y - 44;
    preview.style.left = px + 'px';
    preview.style.top  = py + 'px';
    preview.classList.add('visible');
  }

  function hidePreview(){
    clearTimeout(hoverTimer);
    preview.classList.remove('visible');
  }

  // Attach to folder elements after render - called from renderFolders
  window._attachFolderPreview = function(el, text){
    el.addEventListener('mouseenter', (e) => {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        const r = el.getBoundingClientRect();
        showPreview(text, r.left + r.width/2, r.top);
      }, 600);
    });
    el.addEventListener('mouseleave', hidePreview);
    el.addEventListener('mousedown',  hidePreview);
  };
})();

// --- ESC TO CLOSE ------------------------------------------
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeAllWindows();
});

function shouldShowEscHint(){
  if(window.innerWidth < 640) return false;
  try{ return !localStorage.getItem('ciad_esc_seen'); }
  catch(e){ return false; }
}
function markEscSeen(){
  try{ localStorage.setItem('ciad_esc_seen','1'); }catch(e){}
}

// --- SCROLL NUDGE ------------------------------------------
(function(){
  let nudgeActive = false;
  let nudgeTimer  = null;

  // Store original hero content after sequence is done
  let originalHTML = null;

  const isMob = () => window.innerWidth < 640;
  const nudgeHTML = () => `
    <div class="h-eye" style="opacity:1;filter:none;transform:none;">Content in a Day</div>
    <h1 class="h-title" style="opacity:1;filter:none;transform:none;">
      <span style="display:block;">there&rsquo;s no scroll.</span>
      <em class="h-glow" style="display:block;opacity:1;filter:none;transform:none;animation:glowD 3.2s ease-in-out infinite;">${isMob() ? 'just tap on explore.' : 'just tap the folders.'}</em>
      <span style="display:block;font-size:0.72em;opacity:0.5;margin-top:0.18em;">:')</span>
    </h1>`;

  function showNudge(){
    if(nudgeActive) return;
    nudgeActive = true;
    clearTimeout(nudgeTimer);
    // Save original
    if(!originalHTML) originalHTML = hero.innerHTML;
    // Fade out
    hero.style.transition = 'opacity 0.3s ease';
    hero.style.opacity = '0';
    setTimeout(() => {
      hero.innerHTML = nudgeHTML();
      hero.style.opacity = '1';
      // After 1.8s, fade back
      nudgeTimer = setTimeout(() => {
        hero.style.opacity = '0';
        setTimeout(() => {
          hero.innerHTML = originalHTML;
          hero.style.opacity = '1';
          nudgeActive = false;
          // Re-attach hero-cta pointer events
          const cta = document.getElementById('hero-cta');
          if(cta) cta.style.pointerEvents = 'auto';
        }, 300);
      }, 1800);
    }, 300);
  }

  // Wheel - desktop
  window.addEventListener('wheel', (e) => {
    if(e.deltaY > 0) showNudge();
  }, { passive: true });

  // Touch swipe down - mobile hero screen only (not when panel is open)
  let _tsy = 0;
  window.addEventListener('touchstart', e => { _tsy = e.touches[0].clientY; }, { passive:true });
  window.addEventListener('touchmove', e => {
    const panel = document.getElementById('mob-panel');
    if(panel && panel.classList.contains('open')) return; // don&rsquo;t trigger inside panel
    if(_tsy - e.touches[0].clientY > 28) showNudge(); // upward swipe = trying to scroll
  }, { passive:true });

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if(['ArrowDown','Space','PageDown'].includes(e.code)) showNudge();
  });
})();


// --- MOBILE FOLDER LIST ------------------------------------
function buildMobilePanel(){
  if(window.innerWidth >= 640) return;
  const grid = document.getElementById('mob-panel-grid');
  if(!grid || grid.childElementCount > 0) return;

  folders.forEach((f) => {
    const card = document.createElement('div');
    card.className = 'mcard';

    // Icon
    const isTLDR = f.id === 'tldr';
    const iconDiv = document.createElement('div');
    iconDiv.className = isTLDR ? `mcard-icon ${f.color}` : `mcard-icon tahoe ${f.color}`;
    // Extract inner SVG content
    const svgInner = (G[f.glyph]||G.square).replace(/<svg[^>]*>/,'').replace('</svg>','');
    iconDiv.innerHTML = `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${svgInner}</svg>`;

    // Text
    const nameEl = document.createElement('div');
    nameEl.className = 'mcard-name';
    nameEl.textContent = f.label;

    const prevEl = document.createElement('div');
    prevEl.className = 'mcard-preview';
    prevEl.textContent = f.preview || f.subtitle;

    card.appendChild(iconDiv);
    card.appendChild(nameEl);
    card.appendChild(prevEl);

    card.addEventListener('click', () => {
      openWindow(f, card);
      // Blur panel behind the subfolder
      const panel = document.getElementById('mob-panel');
      if(panel) panel.classList.add('has-window');
    });

    grid.appendChild(card);
  });
}

function openMobilePanel(){
  const panel = document.getElementById('mob-panel');
  if(!panel) return;
  panel.classList.add('open');
  // Block body scroll - panel has its own scroll
  document.body.style.overflow = 'hidden';
}

function closeMobilePanel(){
  const panel = document.getElementById('mob-panel');
  if(!panel) return;
  panel.classList.remove('open');
  document.body.style.overflow = '';
}

// Swipe down to close panel
(function(){
  let startY = 0;
  document.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
  }, { passive:true });
  document.addEventListener('touchmove', e => {
    const panel = document.getElementById('mob-panel');
    if(!panel || !panel.classList.contains('open')) return;
    const scroll = document.getElementById('mob-panel-scroll');
    if(scroll && scroll.scrollTop > 0) return; // only close from top
    const dy = e.touches[0].clientY - startY;
    if(dy > 60) closeMobilePanel();
  }, { passive:true });
})();

// --- INIT --------------------------------------------------
function initPage() {
  if(window.innerWidth >= 640){
    renderFolders();
    // Click outside on desktop: #desktop now sits above the overlay (z-index:640)
    // so overlay clicks never fire -- wire click-outside directly on #desktop
    desktop.addEventListener('click', function(e){
      if(!e.target.closest('.folder') && document.getElementById('screen-ciad').classList.contains('has-open-window')){
        handleOverlayClick();
      }
    });
  } else {
    buildMobilePanel();
    positionHero();
    // Wire explore trigger
    const exploreBtn = document.getElementById('mob-explore');
    if(exploreBtn) exploreBtn.addEventListener('click', openMobilePanel);
    // Wire back button
    const backBtn = document.getElementById('mob-back');
    if(backBtn) backBtn.addEventListener('click', closeMobilePanel);
  }

  runHeroSequence(() => {
    if(window.innerWidth >= 640){
      document.querySelectorAll('.folder').forEach(el => {
        el.classList.add('folder-revealed');
      });
      // Desktop beacon
      const tldrEl = folderEls[0];
      if(tldrEl){
        setTimeout(() => tldrEl.classList.add('folder-beacon'), 400);
        tldrEl.addEventListener('click', () => tldrEl.classList.remove('folder-beacon'), { once:true });
      }
    } else {
      // Show explore trigger after hero sequence
      const exploreBtn = document.getElementById('mob-explore');
      if(exploreBtn) exploreBtn.classList.add('visible');
      // Show pinned TLDR
      const mobTldr = document.getElementById('mob-tldr');
      if(mobTldr){
        // Inject glyph
        const tldrFolder = folders[0];
        const glyphEl = document.getElementById('mob-tldr-glyph');
        if(glyphEl && tldrFolder) glyphEl.innerHTML = G[tldrFolder.glyph] || G.flash;
        // Position: below hero CTA, above trusted strip - measured
        function positionMobTldr(){
          const cta = document.getElementById('hero-cta');
          const trusted = document.getElementById('trusted');
          if(!cta || !trusted) return;
          const ctaBottom = cta.getBoundingClientRect().bottom;
          const trustedTop = trusted.getBoundingClientRect().top;
          const midY = (ctaBottom + trustedTop) / 2;
          mobTldr.style.top = midY + 'px';
          mobTldr.style.transform = 'translate(-50%, -50%)';
        }
        positionMobTldr();
        mobTldr.classList.add('visible');
        // Open TLDR window on tap
        mobTldr.addEventListener('click', () => {
          openWindow(folders[0], mobTldr);
          const ficon = mobTldr.querySelector('.ficon');
          if(ficon) ficon.style.animation = 'none';
        }, { once: true });
      }
    }
  });
}

let rt;
window.addEventListener('resize', () => {
  clearTimeout(rt);
  rt = setTimeout(renderFolders, 120);
});


function openNextFolder(folderId) {
  var idx = -1;
  for (var i = 0; i < folders.length; i++) { if (folders[i].id === folderId) { idx = i; break; } }
  if (idx === -1) return;
  var f = folders[idx];
  if (window.innerWidth < 640) {
    var panel = document.getElementById('mob-panel');
    if (panel && !panel.classList.contains('open')) openMobilePanel();
    setTimeout(function() {
      var cards = document.querySelectorAll('.mcard');
      openWindow(f, cards[idx] || document.body);
      if (panel) panel.classList.add('has-window');
    }, panel && !panel.classList.contains('open') ? 350 : 50);
  } else {
    var el = folderEls[idx] || folderEls[0];
    openWindow(f, el);
  }
}

function bookCall() { window.open('https://calendly.com/shootwraj/content-in-a-day?month=2026-03', '_blank'); }


/* The Brief - email bar logic */
(function(){
  var folderCloseCount = 0;
  var barDismissed = false;
  var barShown = false;
  try { barDismissed = sessionStorage.getItem('ciad_bar_dismissed') === '1'; } catch(e){}
  var _origClose = closeWindow;
  closeWindow = function(id) {
    _origClose(id);
    if (barDismissed || barShown) return;
    folderCloseCount++;
    if (folderCloseCount >= 2) {
      barShown = true;
      var bar = document.getElementById('email-bar');
      if (bar) bar.classList.add('visible');
    }
  };
  window.dismissEmailBar = function() {
    barDismissed = true; barShown = true;
    var bar = document.getElementById('email-bar');
    if (bar) bar.classList.remove('visible');
    try { sessionStorage.setItem('ciad_bar_dismissed', '1'); } catch(e){}
  };
  window.submitEmail = function() {
    var input = document.getElementById('eb-email');
    var form = document.getElementById('eb-form');
    var btn = document.getElementById('eb-submit');
    var email = input ? input.value.trim() : '';
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) {
      if (input) { input.style.borderColor = 'var(--pink)'; setTimeout(function(){ input.style.borderColor=''; }, 1500); }
      return;
    }
    if (btn) btn.disabled = true;
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    })
    .then(function(r){ return r.json(); })
    .then(function(data){
      if (data.ok) {
        form.innerHTML = '<div class="eb-success">you are in. first issue drops soon.</div>';
        setTimeout(function(){ window.dismissEmailBar(); }, 3000);
      } else {
        if (input) { input.style.borderColor = 'var(--pink)'; setTimeout(function(){ input.style.borderColor=''; }, 1500); }
        if (btn) btn.disabled = false;
      }
    })
    .catch(function(){
      if (btn) btn.disabled = false;
    });
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  var tc = document.querySelector('meta[name="theme-color"]');
  if (tc) tc.content = '#0d0d0f';
  var tglEl = document.getElementById('theme-toggle');
  if (tglEl) tglEl.style.display = 'flex';
  ciadInit();
});
