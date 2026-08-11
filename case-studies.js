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
  { key: 'overview', label: 'Overview' },
  { key: 'context', label: 'Context' },
  { key: 'insights', label: 'Insights' },
  { key: 'problem', label: 'The Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'outcome', label: 'The Outcome' }
];

var CASE_STUDIES = [
  {
    id: 'copper-cloves', client: 'Copper + Cloves', person: 'Sarah Edwards', sector: 'Food brand &middot; Founder',
    teaser: 'Saying the things only she could say.',
    vid: csVid('fddf2783-d99b-440c-b433-0dbcbad3a07c'),
    metrics: [{ v: '3&times;', l: 'their average post' }],
    quote: { text: 'loved working with raj to create new content to deliver the messages that drive me and the business. his editing style helped shape this piece into something direct and impactful.', name: 'Sarah Edwards', role: 'Founder, Copper + Cloves' },
    content: {
      overview: 'Counter-positioning, ideation, direction, shoot and edit for Sarah Edwards of Copper + Cloves &mdash; all of it handled here.',
      context: 'A warm brand in a category where everyone already had good photography and roughly the same things to say.',
      insights: 'Everyone is different, and that difference is the one thing a competitor cannot copy. The way out of a red ocean isn&rsquo;t better execution &mdash; it&rsquo;s saying the things only you can say.',
      problem: 'She was competing in the same water as everyone else, on things anyone could have said.',
      solution: 'Counter-positioning first &mdash; finding the things only she could say &mdash; then ideation, direction, shoot and edit.',
      outcome: 'The work ran 3&times; their average post.'
    }
  },
  {
    id: 'upsurge-labs', client: 'Upsurge Labs', person: 'Sowmay Jain', sector: 'Tech &middot; Company content',
    teaser: 'A company building in public, at volume, on a 48-hour clock.',
    vid: csVid('46151b93-4758-4055-ab4d-944a470f7c17'),
    metrics: [{ v: '48', l: 'videos' }, { v: '3&ndash;11&times;', l: 'their average post' }],
    quote: null,
    content: {
      overview: 'Editing across everything Upsurge Labs was building &mdash; Sowmay, the product, the team, the progress. 48 videos, every cut back inside a 48-hour window.',
      context: 'Upsurge was building fast and wanted all of it on camera &mdash; the founder, the product, the team, the milestones. Someone had to turn a constant stream of raw footage into things people would actually watch.',
      insights: 'A company posting about itself is boring unless every cut has a reason to exist. A product demo, a team moment and a founder take each need their own edit logic &mdash; not one template.',
      problem: 'They were generating more raw material than they could turn into content.',
      solution: 'Edit only, at volume and on a clock. 48 videos, each one back inside 48 hours, cut to whatever that particular piece of footage needed rather than to a house format.',
      outcome: 'The run went 3&ndash;11&times; their average post, with nothing ever waiting on the edit.'
    }
  },
  {
    id: 'fresh-factory', client: 'The Fresh Factory', person: 'Prabhjot Dhami', sector: 'F&amp;B',
    teaser: 'Honest beats styled, when freshness is the whole pitch.',
    vid: csVid('253d1a6a-6912-4c6b-ad40-8371dfcb829e'),
    metrics: [{ v: 'up to 5&times;', l: 'their average post' }],
    quote: null,
    content: {
      overview: 'Concept, direction, shoot and edit for Prabhjot Dhami&rsquo;s The Fresh Factory.',
      context: 'A produce business whose entire pitch is freshness, selling into a feed full of styled food that never resembles what actually arrives.',
      insights: 'People have been trained to distrust food photography. For a brand selling real produce, honest outperforms perfect.',
      problem: 'Their content looked like everyone else&rsquo;s, so it carried none of the thing that made them different.',
      solution: 'Concept, direction, shoot and edit built to show the produce as it is &mdash; because for this brand, that was the whole argument.',
      outcome: 'The work went up to 5&times; their average post.'
    }
  },
  {
    id: 'insanely-good-coffee', client: 'Insanely Good Coffee', person: 'Aditya Kumar', sector: 'Coffee &middot; Product',
    teaser: 'A full brand content run, without ever being in the room.',
    vid: csVid('48daa49e-172d-4934-9c0d-1136cf223339'),
    metrics: [{ v: '2.5&times;', l: 'their average post' }],
    quote: null,
    content: {
      overview: 'Positioning, ideation, concept and edit for Aditya Kumar&rsquo;s Insanely Good Coffee &mdash; handled entirely remotely.',
      context: 'A coffee brand and a content lead who were never once in the same room.',
      insights: 'Remote only fails when the brief is thin. Lock positioning and concept before anyone picks up a camera and the footage comes back usable the first time.',
      problem: 'Making brand content carry a product I was never physically near.',
      solution: 'Positioning, ideation, concept and edit, run remotely end to end, with the thinking locked before anything was shot.',
      outcome: 'The set ran 2.5&times; their average post.'
    }
  },
  {
    id: 'kaheen', client: 'Kaheen', person: 'Shashank Arora', sector: 'Brand &middot; Story',
    teaser: 'Positioning, concept, direction, shoot and edit.',
    vid: csVid('2b6ecca6-96e1-4890-9170-1f60ef2ad41b'),
    metrics: [{ v: '5&ndash;20&times;', l: 'their average post' }],
    quote: null,
    content: {
      overview: 'Positioning, concept, direction, shoot and edit for Shashank Arora&rsquo;s Kaheen.',
      // TODO(raj): context, insights and problem still need what Kaheen
      // actually is, who it is for, and where it was before the work.
      // Empty strings render nothing at all, so the page stays clean until then.
      context: '',
      insights: '',
      problem: '',
      solution: 'Positioning, concept, direction, shoot and edit &mdash; all of it handled here.',
      outcome: 'The work ran 5&ndash;20&times; their average post.'
    }
  },
  {
    id: 'indian-cacao', client: 'Indian Cacao Festival', person: 'Patricia &middot; Ketaki &middot; Sneha', sector: 'Event &middot; Campaign',
    teaser: 'Making a niche category feel like a room you had to be in.',
    vid: csVid('7badd2e0-7d8c-42db-98a1-57c78b3e29fb'),
    metrics: [{ v: '5&ndash;20&times;', l: 'their average post' }, { v: 'sold out', l: 'the festival' }],
    quote: { text: 'i enjoy working with raj, he is very focused and motivated, which makes it a smooth experience. the results of his work are great without too much back and forth.', name: 'Patricia Cosma', role: 'Co-founder, Indian Cacao &amp; Craft Chocolate Festival' },
    content: {
      overview: 'Content direction, on-ground coverage and edit for Patricia, Ketaki &amp; Sneha &mdash; the Indian Cacao &amp; Craft Chocolate Festival.',
      context: 'A craft chocolate festival in a country where craft chocolate is still a new idea, with a room to fill.',
      insights: 'Niche events don&rsquo;t sell on explanation, they sell on atmosphere. People buy the feeling of being in the room and learn what cacao is once they&rsquo;re in it.',
      problem: 'Selling a category most people didn&rsquo;t know they cared about yet.',
      solution: 'Content direction across the festival, on-ground coverage, and an edit that carried the craft and the energy rather than explaining them.',
      outcome: 'The work ran 5&ndash;20&times; their average post, and the festival sold out.'
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
