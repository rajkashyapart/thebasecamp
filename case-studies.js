// case-studies.js -- case study folders + detail view with section sidebar.
// ES5 to match site convention.
//
// Content is Raj's, from the writing sessions of 2026-08-09. Anything still
// unwritten is simply an empty string: empty sections don't render, don't
// appear in the sidebar, and leave no gap. Nothing internal is ever shown to
// a visitor -- the old p() prompt placeholders were visible on the live site.

var VZ = 'https://vz-6f9a60bb-593.b-cdn.net/';
function csVid(id) { return VZ + id + '/playlist.m3u8'; }

// Section order requested: overview, context, insights, the problem, solution, the outcome
var CS_SECTIONS = [
  { key: 'overview', label: 'overview' },
  { key: 'context', label: 'context' },
  { key: 'insights', label: 'insights' },
  { key: 'problem', label: 'the problem' },
  { key: 'solution', label: 'solution' },
  { key: 'outcome', label: 'the outcome' }
];

var CASE_STUDIES = [
  {
    id: 'copper-cloves', client: 'copper + cloves', person: 'sarah edwards', sector: 'food brand &middot; founder',
    teaser: 'sarah was tired of her own page turning salesy and losing essence of individuality.',
    vid: csVid('fddf2783-d99b-440c-b433-0dbcbad3a07c'),
    metrics: [{ v: '3&times;', l: 'their average post' }],
    quote: { text: 'loved working with raj to create new content to deliver the messages that drive me and the business. his editing style helped shape this piece into something direct and impactful.', name: 'sarah edwards', role: 'founder, copper + cloves' },
    // Raj's own sentences from the 2026-08-12 dump. Typos fixed, whole lines
    // cut, NOTHING re-said -- see CLAUDE.md section 6, "copy is his, verbatim".
    // An earlier pass paraphrased all six of these into balanced clauses and
    // he called it "unnatural AI slop language".
    //
    // Scored 22 sentences against NNV + Harry Dry; seven failed both, and not
    // one of them failed on language. Four were cut outright (claims about me,
    // or a line restating its neighbour). Two needed a fact that did not exist
    // yet and he supplied both: what counter-positioning Sarah actually meant,
    // and 2 shoot days. NOTE that is 6 videos over 2 days -- CIAD's foundation
    // tier packages 6 videos as 1 shoot day, so these are not the same claim.
    // This is 2020 work, not the current offer; don't "reconcile" them.
    //
    // Cross-checked against the updated framework 2026-08-12: 26 sentences,
    // one finding. Overview had two lines doing the same job -- "and we still
    // work together often" and "6 years later, we've helped each other's
    // businesses in multiple ways". 2020-to-now is arithmetic the reader
    // already has from sentence one, so the second line's only unique content
    // was the vague tail; cutting it whole removed both problems at once and
    // needed no clause cut. "she wanted thought leadership" clipped with his
    // approval ("do what's necessary") -- a landing-page word; "conversations
    // among the community" is the half he told me to keep.
    //
    // "3.5x her average" is STILL OFF, and it is the one open item that no
    // instruction can close: the set averages 14.7k against a ~5.7k baseline,
    // which is 2.6x, not the 3x in the metrics box. Only Raj knows which
    // window each was measured on. Held, never rewritten -- that is the rule.
    content: {
      // Chronological, and the reorder is the whole point: "pretty aesthetic
      // cinematic videos" is what he was making for her in 2020, and it is
      // verbatim the thing the solution section rejects four sections later.
      // Nothing on the page points at that. Say less than you know -- the
      // reader connecting it is worth more than a sentence explaining it, and
      // that sentence would be mine anyway.
      overview: 'sarah was my first customer in 2020. i was working as a freelancer with her to make pretty aesthetic cinematic videos. these videos were made in 2024. and we still work together often.',
      context: 'founded by sarah edwards, they sell vegan food that even someone who&rsquo;s not vegan might most likely enjoy. she also runs multiple c+c outlets.',
      insights: 'there is a way to talk about yourself and your brand while at the same time making the viewer feel heard &amp; seen. what made the difference is unselfish truth the industry is scared of saying out loud. especially on social. better isn&rsquo;t better, different is what&rsquo;s often better. that&rsquo;s how outliers form. crocs, coca cola, nothing phone.',
      problem: 'her content wasn&rsquo;t landing as it seemed &lsquo;selfish&rsquo; content to the viewer. she needed conversations among the community. while having the time to focus on her f&amp;b business.',
      // "2 shoot days." opens rather than closes: at the end it sat directly
      // beside "2017" and the two numbers read as one commenting on the other.
      solution: '2 shoot days. we were able to counter position sarah. her truth about going vegan, her truth about diet. her not-so-conventional takes laid out on camera, on our scripts. i disagree with most smmas, and clients always get the same pitch from these agencies: pretty aesthetic cinematic videos. a strategy well suited for 2017, but not today.',
      outcome: '13k views on the 1st video. 20k next, 11k next, 19k next, 15k next, 10k next. &lsquo;why i started copper + cloves&rsquo; performed the best with 20k views, with the most comments and creating conversations ever on her personal brand.'
    }
  },
  {
    id: 'upsurge-labs', client: 'upsurge labs', person: 'sowmay jain', sector: 'tech &middot; company content',
    teaser: 'a company building in public, at volume, on a 48-hour clock.',
    vid: csVid('46151b93-4758-4055-ab4d-944a470f7c17'),
    metrics: [{ v: '48', l: 'videos' }, { v: '3&ndash;11&times;', l: 'their average post' }],
    quote: null,
    content: {
      overview: 'editing across everything upsurge labs was building &mdash; sowmay, the product, the team, the progress. 48 videos, every cut back inside a 48-hour window.',
      context: 'upsurge was building fast and wanted all of it on camera &mdash; the founder, the product, the team, the milestones. someone had to turn a constant stream of raw footage into things people would actually watch.',
      insights: 'a company posting about itself is boring unless every cut has a reason to exist. a product demo, a team moment and a founder take each need their own edit logic &mdash; not one template.',
      problem: 'they were generating more raw material than they could turn into content.',
      solution: 'edit only, at volume and on a clock. 48 videos, each one back inside 48 hours, cut to whatever that particular piece of footage needed rather than to a house format.',
      outcome: 'the run went 3&ndash;11&times; their average post, with nothing ever waiting on the edit.'
    }
  },
  {
    id: 'fresh-factory', client: 'the fresh factory', person: 'prabhjot dhami', sector: 'f&amp;b',
    teaser: 'honest beats styled, when freshness is the whole pitch.',
    vid: csVid('253d1a6a-6912-4c6b-ad40-8371dfcb829e'),
    metrics: [{ v: 'up to 5&times;', l: 'their average post' }],
    quote: null,
    content: {
      overview: 'concept, direction, shoot and edit for prabhjot dhami&rsquo;s the fresh factory.',
      context: 'a produce business whose entire pitch is freshness, selling into a feed full of styled food that never resembles what actually arrives.',
      insights: 'people have been trained to distrust food photography. for a brand selling real produce, honest outperforms perfect.',
      problem: 'their content looked like everyone else&rsquo;s, so it carried none of the thing that made them different.',
      solution: 'concept, direction, shoot and edit built to show the produce as it is &mdash; because for this brand, that was the whole argument.',
      outcome: 'the work went up to 5&times; their average post.'
    }
  },
  {
    id: 'insanely-good-coffee', client: 'insanely good coffee', person: 'aditya kumar', sector: 'coffee &middot; product',
    teaser: 'a full brand content run, without ever being in the room.',
    vid: csVid('48daa49e-172d-4934-9c0d-1136cf223339'),
    metrics: [{ v: '2.5&times;', l: 'their average post' }],
    quote: null,
    content: {
      overview: 'positioning, ideation, concept and edit for aditya kumar&rsquo;s insanely good coffee &mdash; handled entirely remotely.',
      context: 'a coffee brand and a content lead who were never once in the same room.',
      insights: 'remote only fails when the brief is thin. lock positioning and concept before anyone picks up a camera and the footage comes back usable the first time.',
      problem: 'making brand content carry a product i was never physically near.',
      solution: 'positioning, ideation, concept and edit, run remotely end to end, with the thinking locked before anything was shot.',
      outcome: 'the set ran 2.5&times; their average post.'
    }
  },
  {
    id: 'kaheen', client: 'kaheen', person: 'shashank arora', sector: 'brand &middot; story',
    teaser: 'positioning, concept, direction, shoot and edit.',
    vid: csVid('2b6ecca6-96e1-4890-9170-1f60ef2ad41b'),
    metrics: [{ v: '5&ndash;20&times;', l: 'their average post' }],
    quote: null,
    content: {
      overview: 'positioning, concept, direction, shoot and edit for shashank arora&rsquo;s kaheen.',
      // TODO(raj): context, insights and problem still need what Kaheen
      // actually is, who it is for, and where it was before the work.
      // Empty strings render nothing at all, so the page stays clean until then.
      context: '',
      insights: '',
      problem: '',
      solution: 'positioning, concept, direction, shoot and edit &mdash; all of it handled here.',
      outcome: 'the work ran 5&ndash;20&times; their average post.'
    }
  },
  {
    id: 'indian-cacao', client: 'indian cacao festival', person: 'patricia &middot; ketaki &middot; sneha', sector: 'event &middot; campaign',
    teaser: 'making a niche category feel like a room you had to be in.',
    vid: csVid('7badd2e0-7d8c-42db-98a1-57c78b3e29fb'),
    metrics: [{ v: '5&ndash;20&times;', l: 'their average post' }, { v: 'sold out', l: 'the festival' }],
    quote: { text: 'i enjoy working with raj, he is very focused and motivated, which makes it a smooth experience. the results of his work are great without too much back and forth.', name: 'patricia cosma', role: 'co-founder, indian cacao &amp; craft chocolate festival' },
    content: {
      overview: 'content direction, on-ground coverage and edit for patricia, ketaki &amp; sneha &mdash; the indian cacao &amp; craft chocolate festival.',
      context: 'a craft chocolate festival in a country where craft chocolate is still a new idea, with a room to fill.',
      insights: 'niche events don&rsquo;t sell on explanation, they sell on atmosphere. people buy the feeling of being in the room and learn what cacao is once they&rsquo;re in it.',
      problem: 'selling a category most people didn&rsquo;t know they cared about yet.',
      solution: 'content direction across the festival, on-ground coverage, and an edit that carried the craft and the energy rather than explaining them.',
      outcome: 'the work ran 5&ndash;20&times; their average post, and the festival sold out.'
    }
  }
];

// ---- render ----
var csHls = [];

// The figure a study is actually about. Upsurge also carries a "48 videos"
// metric, and the volume is not the proof -- the multiple against their own
// average is, and it is the same number CIAD and the portfolio quote.
// The hedge is part of the fact and never drops, but it hangs on its own line
// above the number so six of these read as a column of figures that start
// together rather than "3&times;" trailing off the end of "up to 5&times;".
// Same treatment as CIAD's reel row.
function csMult(cs) {
  if (!cs.metrics) return '';
  for (var i = 0; i < cs.metrics.length; i++) {
    if (!/average post/i.test(cs.metrics[i].l)) continue;
    return cs.metrics[i].v.replace(/^up to\s+/i, '<i>up to</i>');
  }
  return '';
}

// ---- the multiple, drawn ------------------------------------------------
//
// The page's whole argument is one number per row, and a number set in a
// column is read rather than seen. Drawn against the client's own baseline
// it is a picture: six lines down the page, and you know the shape of the
// work before you have read a word.
//
// Parsed out of the same metric string csMult() prints -- NOT a second
// field. Three files already hold these five figures and the rule is that
// moving one moves all three; a parallel `bar:` property would have been a
// fourth place for them to disagree, inside the same file as the first.
//
// CS_BAR_MAX is 20 because the largest claim on the page is 5-20x. One scale
// across all six rows, so the lines are comparable to each other as well as
// to their own baselines -- a per-row scale would make every row look
// identical, which says nothing.
var CS_BAR_MAX = 20;

function csMultRange(cs) {
  if (!cs.metrics) return null;
  for (var i = 0; i < cs.metrics.length; i++) {
    var m = cs.metrics[i];
    if (!/average post/i.test(m.l)) continue;
    // entities out, so '3&ndash;11&times;' reads as '3-11'
    var s = String(m.v).replace(/&ndash;|&mdash;/g, '-').replace(/&times;|&#215;/g, '')
                       .replace(/&[a-z]+;/g, '').replace(/[^0-9.\-\sa-z]/gi, '');
    var upTo = /up to/i.test(m.v);
    var nums = s.match(/\d+(?:\.\d+)?/g);
    if (!nums || !nums.length) return null;
    var lo = parseFloat(nums[0]);
    var hi = nums.length > 1 ? parseFloat(nums[1]) : lo;
    // "up to 5x" claims no floor, so the solid part stops at their own
    // average and the whole reach above it is drawn as the lighter tail.
    // The hedge is part of the fact -- it never becomes a flat 5x here
    // either.
    if (upTo) { hi = lo; lo = 1; }
    return { lo: lo, hi: hi, upTo: upTo };
  }
  return null;
}

// solid = what it reliably did, light = how far it went. Widths are set as
// percentages of the track so the drawing survives any column width.
function csBarHTML(cs, idx) {
  var r = csMultRange(cs);
  if (!r) return '';
  var pct = function (v) { return (Math.min(v, CS_BAR_MAX) / CS_BAR_MAX * 100).toFixed(2) + '%'; };
  // The tick needs saying once, not six times. On the first row it carries a
  // label and becomes the legend for the five under it; repeating it down the
  // page would be the same fact stated six times, which is what makes a list
  // feel like a form.
  var legend = idx === 0
    ? '<i class="cs-bar-legend" style="left:' + pct(1) + '">their average post</i>'
    : '';
  return '<span class="cs-bar' + (idx === 0 ? ' has-legend' : '') + '" aria-hidden="true">' +
           '<i class="cs-bar-track"></i>' +
           // their own average post, the thing every multiple is a multiple of
           '<i class="cs-bar-base" style="left:' + pct(1) + '"></i>' +
           '<i class="cs-bar-reach" style="--to:' + pct(r.hi) + '"></i>' +
           '<i class="cs-bar-solid" style="--to:' + pct(r.lo) + '"></i>' +
           legend +
         '</span>';
}

// The frame takes the video's shape. Every reel here is vertical bar one, and
// the media box was a hard 16/9, so the common case was being centre-cropped.
// videoWidth/videoHeight is the only honest source for this -- the manifest
// does not say, and guessing from the filename says less.
function csFitFrame(v) {
  if (!v || !v.parentElement) return;
  var frame = v.parentElement;
  function apply() {
    if (v.videoWidth && v.videoHeight) {
      frame.style.setProperty('--vr', (v.videoWidth / v.videoHeight).toFixed(4));
    }
  }
  v.addEventListener('loadedmetadata', apply);
  apply();
}

// Every reel made for this client. portfolio.js is the source and this page
// loads it for its data alone -- all three of its init functions bail when
// their own DOM is absent, so nothing else happens. Copying the ids across
// would be a second list to keep in step, which is exactly the trap the five
// figures spread over three files already document.
function csReels(cs) {
  if (typeof projects === 'undefined') return [];
  var out = [], seen = {};
  seen[cs.vid] = true; // the hero is already at the top of the page
  // Case-insensitive, and it has to be: this file's client names are lowercase
  // to match the rest of the site, portfolio.js's are still title case, and
  // matching them exactly silently returned nothing at all.
  var want = String(cs.client).toLowerCase();
  for (var i = 0; i < projects.length; i++) {
    var p = projects[i];
    // matched on subtitle too: "come spend christmas with us" and "c+c menu"
    // are Copper + Cloves work filed under their own names
    if (String(p.name).toLowerCase() !== want &&
        String(p.subtitle).toLowerCase() !== want) continue;
    var items = p.items || [];
    for (var j = 0; j < items.length; j++) {
      if (items[j].type !== 'video' || seen[items[j].src]) continue;
      seen[items[j].src] = true;
      out.push(items[j].src);
    }
  }
  return out;
}

// Reels mount as they scroll into the row and unmount once they are well past
// it. Upsurge has twelve; twelve live HLS instances on one page is a stalled
// tab, and preload="none" alone would still leave every one of them attached.
function csMountReels(root) {
  var row = root.querySelector('.cs-reelrow');
  if (!row) return;
  var live = [];

  function unmount(v) {
    if (v._hls) { try { v._hls.destroy(); } catch (e) {} v._hls = null; }
    try { v.pause(); } catch (e) {}
    v.removeAttribute('src');
    v.dataset.mounted = '';
  }

  function mount(v) {
    if (v.dataset.mounted) { v.play().catch(function () {}); return; }
    v.dataset.mounted = '1';
    csFitFrame(v);
    var src = v.getAttribute('data-src');
    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = src; v.play().catch(function () {});
    } else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
      var h = new Hls({ enableWorker: true, startLevel: -1, maxBufferLength: 6 });
      h.loadSource(src); h.attachMedia(v); v._hls = h; csHls.push(h);
      h.on(Hls.Events.MANIFEST_PARSED, function () { v.play().catch(function () {}); });
    }
    live.push(v);
    while (live.length > 6) unmount(live.shift());
  }

  if (!('IntersectionObserver' in window)) { return; }
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var v = entries[i].target;
      if (entries[i].isIntersecting) mount(v);
      else if (v.dataset.mounted) { try { v.pause(); } catch (e) {} }
    }
  }, { root: row, threshold: 0.2 });
  var vids = row.querySelectorAll('video');
  for (var k = 0; k < vids.length; k++) io.observe(vids[k]);
}

function initCaseStudies() {
  var list = document.getElementById('cs-list');
  if (!list) return;
  for (var i = 0; i < CASE_STUDIES.length; i++) {
    (function (cs, idx) {
      var card = document.createElement('button');
      card.className = 'cs-card';
      card.setAttribute('aria-label', 'open case study: ' + cs.client);
      card.innerHTML =
        '<div class="cs-card-no">' + (idx < 9 ? '0' : '') + (idx + 1) + '</div>' +
        '<div class="cs-card-body">' +
          '<div class="cs-card-client">' + cs.client + '</div>' +
          '<div class="cs-card-sector">' + cs.sector + '</div>' +
          '<div class="cs-card-teaser">' + cs.teaser + '</div>' +
        '</div>' +
        '<div class="cs-card-mult">' + csMult(cs) + csBarHTML(cs, idx) + '</div>' +
        '<div class="cs-card-arrow">&#8594;</div>';
      card.addEventListener('click', function () { openCase(cs); });
      list.appendChild(card);
    })(CASE_STUDIES[i], i);
  }
  csDrawBars(list);
}

// Draw once on arrival, then hold -- the same rule CIAD's ring and stationed
// line follow. Linear, because a line being traced is constant motion and an
// eased one arrives before the number beside it has finished being read.
// scaleX off a left origin rather than an animated width: it is the same
// picture on the GPU instead of in layout.
//
// One observer, unobserving as it fires, so a bar never redraws on the way
// back up the page. A drawing that replays every scroll stops being a
// drawing and becomes a loop.
function csDrawBars(list) {
  var bars = list.querySelectorAll('.cs-bar');
  if (!bars.length) return;

  var reduced = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < bars.length; i++) bars[i].classList.add('is-drawn');
    return;
  }

  var io = new IntersectionObserver(function (entries, obs) {
    for (var e = 0; e < entries.length; e++) {
      if (!entries[e].isIntersecting) continue;
      var el = entries[e].target;
      obs.unobserve(el);
      // When two or three rows land together on the first screen, they
      // cascade rather than snapping at once. 70ms, and it is capped so a
      // fast scroll to the sixth row never sits waiting on a queue.
      var n = Math.min(parseInt(el.getAttribute('data-i'), 10) || 0, 3);
      el.style.transitionDelay = (n * 70) + 'ms, ' + (n * 70 + 90) + 'ms';
      el.classList.add('is-drawn');
    }
  }, { threshold: 0.6 });

  for (var b = 0; b < bars.length; b++) {
    bars[b].setAttribute('data-i', b);
    io.observe(bars[b]);
  }
}

function openCase(cs) {
  var detail = document.getElementById('cs-detail');
  var listWrap = document.getElementById('cs-listwrap');

  // Only sections with real copy get rendered, and the numbering counts what
  // is actually shown -- so an unwritten section leaves no gap and no orphan
  // sidebar link pointing at nothing.
  var nav = '';
  var sections = '';
  var n = 0;
  for (var s = 0; s < CS_SECTIONS.length; s++) {
    var sec = CS_SECTIONS[s];
    var body = cs.content[sec.key];
    if (!body) continue;
    n++;
    nav += '<a href="#cs-' + sec.key + '" class="cs-navlink" data-sec="' + sec.key + '">' +
             '<span class="cs-navnum">' + n + '</span>' + sec.label + '</a>';
    sections += '<section id="cs-' + sec.key + '" class="cs-section">' +
                  '<div class="cs-section-label">' + n + ' &middot; ' + sec.label + '</div>' +
                  '<div class="cs-section-body">' + body + '</div>' +
                '</section>';
  }

  var metrics = '';
  if (cs.metrics && cs.metrics.length) {
    metrics = '<div class="cs-metrics">';
    for (var m = 0; m < cs.metrics.length; m++) {
      metrics += '<div class="cs-metric"><div class="cs-metric-v">' + cs.metrics[m].v + '</div>' +
                 '<div class="cs-metric-l">' + cs.metrics[m].l + '</div></div>';
    }
    metrics += '</div>';
  }

  // Everything else made for this client, after the reading and before the
  // testimonial: the sections are the argument, this is the body of work the
  // argument is about. No reels means no strip -- a heading over nothing is
  // the placeholder rule.
  var reels = csReels(cs);
  var reelRow = '';
  if (reels.length) {
    reelRow = '<section class="cs-reels">' +
                '<div class="cs-section-label">everything we made for them</div>' +
                '<div class="cs-reelrow">';
    for (var r = 0; r < reels.length; r++) {
      reelRow += '<div class="cs-reel"><video muted loop playsinline webkit-playsinline ' +
                 'preload="none" poster="' + reels[r].replace('playlist.m3u8', 'thumbnail.jpg') +
                 '" data-src="' + reels[r] + '"></video></div>';
    }
    reelRow += '</div></section>';
  }

  // No quote means no quote block. An empty bordered box reads as broken.
  var quote = cs.quote
    ? '<figure class="cs-quote"><blockquote>&ldquo;' + cs.quote.text + '&rdquo;</blockquote>' +
      '<figcaption>' + cs.quote.name + ' &mdash; ' + cs.quote.role + '</figcaption></figure>'
    : '';

  detail.innerHTML =
    '<button class="cs-back" id="cs-back">&#8592; all case studies</button>' +
    '<header class="cs-hero">' +
      '<div class="cs-hero-eyebrow">' + cs.sector + '</div>' +
      '<h1 class="cs-hero-client">' + cs.client + '</h1>' +
      '<div class="cs-hero-person">' + cs.person + '</div>' +
    '</header>' +
    '<div class="cs-layout">' +
      '<aside class="cs-sidebar"><nav class="cs-nav">' + nav + '</nav></aside>' +
      '<div class="cs-content">' +
        '<div class="cs-media"><video muted loop playsinline webkit-playsinline preload="none" ' +
          'poster="' + cs.vid.replace('playlist.m3u8', 'thumbnail.jpg') + '"></video></div>' +
        metrics +
        sections +
        reelRow +
        quote +
        '<div class="cs-cta-wrap"><a href="hub.html" class="cs-cta">work with me &#8594;</a></div>' +
      '</div>' +
    '</div>';

  listWrap.style.display = 'none';
  detail.style.display = 'block';
  window.scrollTo(0, 0);

  document.getElementById('cs-back').addEventListener('click', closeCase);

  // hero video -- lazy load + play
  var v = detail.querySelector('.cs-media video');
  if (v) {
    csFitFrame(v);
    var src = cs.vid;
    if (v.canPlayType('application/vnd.apple.mpegurl')) { v.src = src; v.play().catch(function () {}); }
    else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
      var hls = new Hls({ enableWorker: true, startLevel: -1, maxBufferLength: 10 });
      hls.loadSource(src); hls.attachMedia(v); csHls.push(hls);
      hls.on(Hls.Events.MANIFEST_PARSED, function () { v.play().catch(function () {}); });
    }
  }

  csMountReels(detail);

  // scroll-spy: highlight the section in view
  var links = detail.querySelectorAll('.cs-navlink');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      for (var e = 0; e < entries.length; e++) {
        if (entries[e].isIntersecting) {
          var id = entries[e].target.id.replace('cs-', '');
          for (var l = 0; l < links.length; l++) {
            links[l].classList.toggle('active', links[l].getAttribute('data-sec') === id);
          }
        }
      }
    }, { rootMargin: '-45% 0px -45% 0px' });
    var secs = detail.querySelectorAll('.cs-section');
    for (var q = 0; q < secs.length; q++) spy.observe(secs[q]);
  }
}

function closeCase() {
  for (var i = 0; i < csHls.length; i++) { try { csHls[i].destroy(); } catch (e) {} }
  csHls = [];
  document.getElementById('cs-detail').style.display = 'none';
  document.getElementById('cs-detail').innerHTML = '';
  document.getElementById('cs-listwrap').style.display = 'block';
  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', initCaseStudies);
