// case-studies.js — case study folders + detail view with section sidebar.
// ES5 to match site convention. Content is a SCAFFOLD: real drafts where they
// could be derived; guiding prompts (marked) where Raj needs to fill the truth.

var VZ = 'https://vz-6f9a60bb-593.b-cdn.net/';
function csVid(id) { return VZ + id + '/playlist.m3u8'; }

// Section order requested: overview, context, insights, the problem, solution, the outcome
var CS_SECTIONS = [
  { key: 'overview', label: 'Overview' },
  { key: 'context', label: 'Context' },
  { key: 'insights', label: 'Insights' },
  { key: 'problem', label: 'The Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'outcome', label: 'The Outcome' }
];

// p() = a prompt placeholder (styled muted) for content Raj still needs to write.
function p(text) { return '<span class="cs-prompt">' + text + '</span>'; }

var CASE_STUDIES = [
  {
    id: 'upsurge-labs', client: 'Upsurge Labs', person: 'Sowmay Jain', sector: 'Tech · Founder content',
    teaser: 'Positioning a tech founder through a consistent reel series.',
    vid: csVid('46151b93-4758-4055-ab4d-944a470f7c17'),
    metrics: [{ v: '—', l: 'views' }, { v: '—', l: 'follower growth' }, { v: '—', l: 'inbound' }],
    quote: null,
    content: {
      overview: 'Founder-led content for Sowmay Jain — a consistent reel series built to position a tech founder for authority and inbound.',
      context: p('Where was Upsurge before? (founder invisible on social, posting inconsistently, no system to sustain it)'),
      insights: p('What did you learn about Sowmay&rsquo;s audience and what actually makes a tech founder&rsquo;s content stop the scroll?'),
      problem: p('The core problem in one line — what wasn&rsquo;t working, and why?'),
      solution: 'Strategy-first positioning, one focused shoot day, and a steady monthly reel cadence built around founder authority and inbound — not vanity volume.',
      outcome: p('What changed? Drop the real numbers — views, watch-time, followers gained, inbound conversations / calls booked.')
    }
  },
  {
    id: 'fresh-factory', client: 'The Fresh Factory', person: 'Prabhjot Dhami', sector: 'F&amp;B',
    teaser: 'Fresh produce, honest storytelling — content that sells without shouting.',
    vid: csVid('253d1a6a-6912-4c6b-ad40-8371dfcb829e'),
    metrics: [{ v: '—', l: 'reach' }, { v: '—', l: 'engagement' }, { v: '—', l: 'sales lift' }],
    quote: null,
    content: {
      overview: 'F&amp;B content for Prabhjot Dhami&rsquo;s The Fresh Factory — built around fresh produce and honest, appetite-led storytelling.',
      context: p('What was the brand&rsquo;s situation / goal before the work?'),
      insights: p('What did you notice about how F&amp;B audiences actually decide — and where most food content fails?'),
      problem: p('The core problem in one line.'),
      solution: 'Appetite-first direction, a single shoot day, and a content system tuned to make the right buyer stop — not just look good in the grid.',
      outcome: p('Real outcome + numbers — reach, saves, footfall/orders, whatever you have.')
    }
  },
  {
    id: 'copper-cloves', client: 'Copper + Cloves', person: 'Sarah Edwards', sector: 'Food brand · Founder',
    teaser: 'A voice as warm as the brand itself.',
    vid: csVid('fddf2783-d99b-440c-b433-0dbcbad3a07c'),
    metrics: [{ v: '—', l: 'views' }, { v: '—', l: 'growth' }, { v: '—', l: 'enquiries' }],
    quote: { text: 'loved working with raj to create new content to deliver the messages that drive me and the business. his editing style helped shape this piece into something direct and impactful.', name: 'Sarah Edwards', role: 'Founder, Copper + Cloves' },
    content: {
      overview: 'Content direction and personal branding for Sarah Edwards of Copper + Cloves — finding a voice as warm as the brand itself.',
      context: p('Where was Copper + Cloves / Sarah before? What did she want her content to do?'),
      insights: p('What did you learn about her audience and her on-camera strengths?'),
      problem: p('The core problem in one line.'),
      solution: 'Personal-brand positioning for the founder, then content directed and edited to feel direct and impactful — her words, sharpened.',
      outcome: p('Real outcome + numbers.')
    }
  },
  {
    id: 'insanely-good-coffee', client: 'Insanely Good Coffee', person: 'Aditya Kumar', sector: 'Coffee · Product',
    teaser: 'Brand and product content for a coffee that earns its name.',
    vid: csVid('48daa49e-172d-4934-9c0d-1136cf223339'),
    metrics: [{ v: '—', l: 'views' }, { v: '—', l: 'engagement' }, { v: '—', l: 'conversions' }],
    quote: null,
    content: {
      overview: 'Brand and product content for Aditya Kumar&rsquo;s Insanely Good Coffee.',
      context: p('Stage of the brand and the goal of the work?'),
      insights: p('What makes coffee/product content actually convert vs just look premium?'),
      problem: p('The core problem in one line.'),
      solution: 'Product-led direction and a content system designed to make the coffee feel as good as it is — built to convert, not just decorate.',
      outcome: p('Real outcome + numbers — orders, repeat, reach.')
    }
  },
  {
    id: 'kaheen', client: 'Kaheen', person: 'Shashank Arora', sector: 'Brand · Story',
    teaser: 'Content and direction with a point of view.',
    vid: csVid('2b6ecca6-96e1-4890-9170-1f60ef2ad41b'),
    metrics: [{ v: '—', l: 'reach' }, { v: '—', l: 'growth' }, { v: '—', l: 'impact' }],
    quote: null,
    content: {
      overview: 'Content and direction for Shashank Arora&rsquo;s Kaheen.',
      context: p('What is Kaheen, and where was it before the work?'),
      insights: p('The audience insight that shaped the direction.'),
      problem: p('The core problem in one line.'),
      solution: 'Story-first direction that gave the brand a clear point of view people could actually feel.',
      outcome: p('Real outcome + numbers.')
    }
  },
  {
    id: 'indian-cacao', client: 'Indian Cacao Festival', person: 'Patricia · Ketaki · Sneha', sector: 'Event · Campaign',
    teaser: 'Festival content for India&rsquo;s craft chocolate scene.',
    vid: csVid('7badd2e0-7d8c-42db-98a1-57c78b3e29fb'),
    metrics: [{ v: '—', l: 'reach' }, { v: '—', l: 'attendance' }, { v: '—', l: 'engagement' }],
    quote: { text: 'i enjoy working with raj, he is very focused and motivated, which makes it a smooth experience. the results of his work are great without too much back and forth.', name: 'Patricia Cosma', role: 'Co-founder, Indian Cacao &amp; Craft Chocolate Festival' },
    content: {
      overview: 'Festival content for Patricia, Ketaki &amp; Sneha — the Indian Cacao &amp; Craft Chocolate Festival.',
      context: p('What did the festival need content to do — awareness, ticket sales, vendor pull?'),
      insights: p('What did you learn about the audience for a niche craft-chocolate event?'),
      problem: p('The core problem in one line.'),
      solution: 'A campaign built to make a niche festival feel essential — direction and edits that carried the craft and the energy.',
      outcome: p('Real outcome + numbers — reach, footfall, ticket movement.')
    }
  }
];

// ---- render ----
var csHls = [];

function initCaseStudies() {
  var list = document.getElementById('cs-list');
  if (!list) return;
  for (var i = 0; i < CASE_STUDIES.length; i++) {
    (function (cs, idx) {
      var card = document.createElement('button');
      card.className = 'cs-card';
      card.setAttribute('aria-label', 'Open case study: ' + cs.client);
      card.innerHTML =
        '<div class="cs-card-no">' + (idx < 9 ? '0' : '') + (idx + 1) + '</div>' +
        '<div class="cs-card-body">' +
          '<div class="cs-card-client">' + cs.client + '</div>' +
          '<div class="cs-card-sector">' + cs.sector + '</div>' +
          '<div class="cs-card-teaser">' + cs.teaser + '</div>' +
        '</div>' +
        '<div class="cs-card-arrow">&#8594;</div>';
      card.addEventListener('click', function () { openCase(cs); });
      list.appendChild(card);
    })(CASE_STUDIES[i], i);
  }
}

function openCase(cs) {
  var detail = document.getElementById('cs-detail');
  var listWrap = document.getElementById('cs-listwrap');

  var nav = '';
  var sections = '';
  for (var s = 0; s < CS_SECTIONS.length; s++) {
    var sec = CS_SECTIONS[s];
    nav += '<a href="#cs-' + sec.key + '" class="cs-navlink" data-sec="' + sec.key + '">' +
             '<span class="cs-navnum">' + (s + 1) + '</span>' + sec.label + '</a>';
    sections += '<section id="cs-' + sec.key + '" class="cs-section">' +
                  '<div class="cs-section-label">' + (s + 1) + ' &middot; ' + sec.label + '</div>' +
                  '<div class="cs-section-body">' + (cs.content[sec.key] || '') + '</div>' +
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

  var quote = cs.quote
    ? '<figure class="cs-quote"><blockquote>&ldquo;' + cs.quote.text + '&rdquo;</blockquote>' +
      '<figcaption>' + cs.quote.name + ' &mdash; ' + cs.quote.role + '</figcaption></figure>'
    : '<figure class="cs-quote cs-quote-empty">' + p('client quote — pending') + '</figure>';

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
        quote +
        '<div class="cs-cta-wrap"><a href="hub.html" class="cs-cta">work with me &#8594;</a></div>' +
      '</div>' +
    '</div>';

  listWrap.style.display = 'none';
  detail.style.display = 'block';
  window.scrollTo(0, 0);

  document.getElementById('cs-back').addEventListener('click', closeCase);

  // hero video — lazy load + play
  var v = detail.querySelector('.cs-media video');
  if (v) {
    var src = cs.vid;
    if (v.canPlayType('application/vnd.apple.mpegurl')) { v.src = src; v.play().catch(function () {}); }
    else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
      var hls = new Hls({ enableWorker: true, startLevel: -1, maxBufferLength: 10 });
      hls.loadSource(src); hls.attachMedia(v); csHls.push(hls);
      hls.on(Hls.Events.MANIFEST_PARSED, function () { v.play().catch(function () {}); });
    }
  }

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
