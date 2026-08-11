// portfolio.js — mosaic grid + project windows
// ES5 syntax to match site convention

var VZ = 'https://vz-6f9a60bb-593.b-cdn.net/';
var PB = 'https://picturesbyrajj.b-cdn.net/';
function vid(id) { return VZ + id + '/playlist.m3u8'; }

var projects = [
  // --- CLIENT WORK ---
  {
    id: 'sarah-edwards',
    name: 'Copper + Cloves',
    subtitle: 'Sarah Edwards',
    category: 'content',
    description: 'Content direction and personal branding for Sarah Edwards of Copper + Cloves \u2014 a voice as warm as the brand itself.',
    role: 'counter-positioning, ideation, direction, shoot, edit &mdash; all of it mine',
    outcome: '3&times; their average post, no ad spend',
    items: [
      { type: 'video', src: vid('fddf2783-d99b-440c-b433-0dbcbad3a07c'), size: 'big' },
      { type: 'video', src: vid('7c61d479-6e79-4c32-be60-4d43444bc460'), size: 'tall' },
      { type: 'video', src: vid('45b55665-fbc0-40a2-b107-8cc2392df7d5'), size: 'reg' }
    ]
  },
  {
    id: 'upsurge-labs',
    name: 'Upsurge Labs',
    subtitle: 'Sowmay Jain',
    category: 'content',
    description: 'Founder-led content for Sowmay Jain of Upsurge Labs \u2014 a consistent reel series built around positioning, authority, and inbound.',
    role: 'edit &mdash; 48 videos, every cut back inside a 48-hour window',
    outcome: '3&ndash;11&times; their average post, no ad spend',
    items: [
      { type: 'video', src: vid('46151b93-4758-4055-ab4d-944a470f7c17'), size: 'tall' },
      { type: 'video', src: vid('eb2d2262-f579-4b69-9ea3-5b4db0bcac2c'), size: 'reg' },
      { type: 'video', src: vid('94a35c54-1a17-4274-9db2-1077df921326'), size: 'tall' },
      { type: 'video', src: vid('88d0078a-ec67-4871-87a7-0d4904ef56cf'), size: 'reg' },
      { type: 'video', src: vid('71f04e11-d2eb-485a-85cb-6c0dbf02bb61'), size: 'big' },
      { type: 'video', src: vid('70f608a1-a634-41cd-ab5d-73abba65b553'), size: 'tall' },
      { type: 'video', src: vid('98cf5a99-3e54-4e29-add8-c3cbd0967426'), size: 'reg' },
      { type: 'video', src: vid('a0bd786e-b67c-4c1f-b53a-2a25e3542227'), size: 'tall' },
      { type: 'video', src: vid('f356a125-b8c7-4c72-8606-2fe40fe09a00'), size: 'reg' },
      { type: 'video', src: vid('11a08b41-13fa-400f-9e9d-7d0bf2052acc'), size: 'tall' },
      { type: 'video', src: vid('0eed0697-3383-40bf-a7a9-5891cb5f6fee'), size: 'wide' },
      { type: 'video', src: vid('43c7b527-b655-42dc-8424-7826d3505517'), size: 'reg' }
    ]
  },
  {
    id: 'fresh-factory',
    name: 'The Fresh Factory',
    subtitle: 'Prabhjot Dhami',
    category: 'fnb',
    description: 'F&amp;B content for Prabhjot Dhami of The Fresh Factory \u2014 fresh produce, honest storytelling.',
    role: 'concept, direction, shoot, edit',
    outcome: 'up to 5&times; their average post, no ad spend',
    items: [
      { type: 'video', src: vid('253d1a6a-6912-4c6b-ad40-8371dfcb829e'), size: 'tall' },
      { type: 'video', src: vid('4c09e742-2c9f-4c7d-918a-4b05c8e30f53'), size: 'reg' },
      { type: 'video', src: vid('6f7637de-1352-4010-b03d-9c22c6975142'), size: 'wide' },
      { type: 'video', src: vid('3be08a4b-12b5-429c-81b5-3d7f037274d3'), size: 'tall' }
    ]
  },
  {
    id: 'insanely-good-coffee',
    name: 'Insanely Good Coffee',
    subtitle: 'Aditya Kumar',
    category: 'fnb',
    description: 'Brand and product content for Aditya Kumar of Insanely Good Coffee.',
    role: 'positioning, ideation, concept, edit &mdash; handled entirely remote',
    outcome: '2.5&times; their average post, no ad spend',
    items: [
      { type: 'video', src: vid('48daa49e-172d-4934-9c0d-1136cf223339'), size: 'tall' },
      { type: 'video', src: vid('a900299f-5c7c-45ea-9f2f-5d076c4a019f'), size: 'reg' },
      { type: 'video', src: vid('f7b91a7c-a8b3-46d1-8465-bd9b134db124'), size: 'wide' }
    ]
  },
  {
    id: 'kaheen',
    name: 'Kaheen',
    subtitle: 'Shashank Arora',
    category: 'content',
    description: 'Content and direction for Shashank Arora of Kaheen.',
    role: 'positioning, concept, direction, shoot, edit',
    outcome: '5&ndash;20&times; their average post, no ad spend',
    items: [
      { type: 'video', src: vid('2b6ecca6-96e1-4890-9170-1f60ef2ad41b'), size: 'tall' },
      { type: 'video', src: vid('fb502bdb-185e-4356-89f0-b9be31eb77cf'), size: 'reg' }
    ]
  },
  // --- FOOD & BEVERAGE ---
  {
    id: 'fifty50-menu',
    name: 'Fifty 50 Menu',
    subtitle: 'Food & Beverage',
    category: 'fnb',
    description: 'Menu design and food photography for Fifty 50.',
    // TODO(raj): fill these two in. keep each to one line.
    role: '',
    outcome: '',
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
    // TODO(raj): fill these two in. keep each to one line.
    role: '',
    outcome: '',
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
    // TODO(raj): fill these two in. keep each to one line.
    role: '',
    outcome: '',
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
    id: 'indian-cacao',
    name: 'Indian Cacao Festival',
    subtitle: 'Patricia · Ketaki · Sneha',
    category: 'events',
    description: 'Festival content for Patricia, Ketaki &amp; Sneha — the Indian Cacao &amp; Craft Chocolate Festival.',
    role: 'content direction, on-ground coverage, edit',
    outcome: '5&ndash;20&times; their average post; the festival sold out',
    items: [
      { type: 'video', src: vid('7badd2e0-7d8c-42db-98a1-57c78b3e29fb'), size: 'wide' },
      { type: 'video', src: vid('af9add4d-4c87-4f42-99d3-49cc3837dd55'), size: 'reg' },
      { type: 'video', src: vid('1a64e8e7-878c-43d7-a676-701aeb25bcea'), size: 'tall' },
      { type: 'video', src: vid('bbdcdb02-5fba-4216-8c3b-3f4b21d27e6c'), size: 'reg' },
      { type: 'video', src: vid('e163b28d-cddf-4db6-8b01-de14a2bd00f3'), size: 'big' },
      { type: 'video', src: vid('c9daca30-8e21-4d64-9eeb-e1b54cf97447'), size: 'tall' }
    ]
  },
  {
    id: 'ame-pashm',
    name: 'AME',
    subtitle: 'Pashm',
    category: 'events',
    description: 'Event coverage and content for AME by Pashm.',
    // TODO(raj): fill these two in. keep each to one line.
    role: '',
    outcome: '',
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
    // TODO(raj): fill these two in. keep each to one line.
    role: '',
    outcome: '',
    items: [
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'big' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'reg' },
      { type: 'photo', src: '', size: 'wide' }
    ]
  },
  // --- PERSONAL (uncurated.raj) ---
  {
    id: 'personal',
    name: 'uncurated.raj',
    subtitle: 'Personal',
    category: 'personal',
    playgroundLink: true,
    description: 'Photographs and frames from life, wandering, and the in-between. this is uncurated.raj.',
    // Intentionally blank: role/outcome are client language and don't apply to
    // personal work. These pieces carry the playground link instead.
    role: '',
    outcome: '',
    items: [
      { type: 'video', src: vid('8033cbca-5209-4e8f-b446-89f668359e16'), size: 'big' },
      { type: 'photo', src: PB + '20230907%20-%20IMG_1655%20-%20Raj%20Kashyap92023raj.webp', size: 'tall' },
      { type: 'photo', src: PB + '20230907%20-%20IMG_1737-Enhanced-NR%20-%20Raj%20Kashyap102023raj.webp', size: 'wide' },
      { type: 'photo', src: PB + '20230907%20-%20IMG_1747%20-%20Raj%20Kashyap112023raj.webp', size: 'reg' },
      { type: 'photo', src: PB + '20230908%20-%20IMG_2075%20-%20Raj%20Kashyap122023raj.webp', size: 'reg' },
      { type: 'video', src: vid('a8317bc8-6c30-4e9a-a4c9-45afce91f3f1'), size: 'tall' },
      { type: 'photo', src: PB + '20230908%20-%20IMG_2116%20-%20Raj%20Kashyap132023raj.webp', size: 'tall' },
      { type: 'photo', src: PB + 'an%20art%20village22019raj.webp', size: 'wide' },
      { type: 'photo', src: PB + 'green%20is%20the%20color42020raj.webp', size: 'reg' },
      { type: 'photo', src: PB + 'hault32020raj.webp', size: 'big' },
      { type: 'photo', src: PB + 'IMG_1788-Enhanced-NR22022raj62022raj.webp', size: 'reg' },
      { type: 'video', src: vid('b9ccf117-6681-4d1e-8015-9fbf6cec778e'), size: 'reg' },
      { type: 'photo', src: PB + 'IMG_18822022Raj%20Kashyap72022raj.webp', size: 'tall' },
      { type: 'photo', src: PB + 'IMG_2252-Enhanced-NR32023raj142023raj.webp', size: 'reg' },
      { type: 'photo', src: PB + 'IMG_25282022Raj%20Kashyap82022raj.webp', size: 'wide' },
      { type: 'photo', src: PB + 'IMG_29022019raj%20kashyap12019raj.webp', size: 'reg' },
      { type: 'video', src: vid('3c36aee0-bec7-4b61-bd69-9b1a07f04676'), size: 'tall' },
      { type: 'photo', src: PB + 'IMG_9371152026raj.webp', size: 'reg' },
      { type: 'photo', src: 'https://picturesbyrajj.b-cdn.net/it\'s%20her52020raj.webp', size: 'big' }
    ]
  }
];

// ============================================================
// PORTFOLIO REEL — full-screen vertical scroll, warm paper.
// Each piece autoplays muted in view; tap any piece for sound.
// ES5 syntax to match site convention.
// ============================================================

var SPK_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><line x1="16.5" y1="9.5" x2="21.5" y2="14.5"/><line x1="21.5" y1="9.5" x2="16.5" y2="14.5"/></svg>';
var SPK_ON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.6a5 5 0 0 1 0 6.8"/><path d="M18.6 6a8 8 0 0 1 0 12"/></svg>';

// Pinned opener — the first 14 pieces, in this exact order (by video id).
var FIXED_HEAD = [
  '2b6ecca6-96e1-4890-9170-1f60ef2ad41b', // Kaheen
  '4c09e742-2c9f-4c7d-918a-4b05c8e30f53', // The Fresh Factory
  'a900299f-5c7c-45ea-9f2f-5d076c4a019f', // Insanely Good Coffee
  '98cf5a99-3e54-4e29-add8-c3cbd0967426', // Upsurge Labs
  '46151b93-4758-4055-ab4d-944a470f7c17', // Upsurge Labs
  'fddf2783-d99b-440c-b433-0dbcbad3a07c', // Copper + Cloves
  'f7b91a7c-a8b3-46d1-8465-bd9b134db124', // Insanely Good Coffee
  '7c61d479-6e79-4c32-be60-4d43444bc460', // Copper + Cloves
  'a0bd786e-b67c-4c1f-b53a-2a25e3542227', // Upsurge Labs
  '6f7637de-1352-4010-b03d-9c22c6975142', // The Fresh Factory
  'fb502bdb-185e-4356-89f0-b9be31eb77cf', // Kaheen
  'e163b28d-cddf-4db6-8b01-de14a2bd00f3', // Indian Cacao Festival
  '3be08a4b-12b5-429c-81b5-3d7f037274d3', // The Fresh Factory
  'bbdcdb02-5fba-4216-8c3b-3f4b21d27e6c'  // Indian Cacao Festival
];

function slideGuid(s) {
  var m = s.src.match(/\/([0-9a-f-]{36})\/playlist/);
  return m ? m[1] : null;
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

// Arrange pieces so no two same-client pieces sit adjacent (most-frequent
// -first greedy — guarantees no adjacency when no client exceeds half).
// Randomised: groups shuffled, ties broken at random. `avoidFirst` keeps
// the opening piece off a given client (e.g. the last pinned piece).
function weave(items, avoidFirst) {
  var groups = {}, keys = [];
  for (var i = 0; i < items.length; i++) {
    var n = items[i].name;
    if (!groups[n]) { groups[n] = []; keys.push(n); }
    groups[n].push(items[i]);
  }
  for (var g = 0; g < keys.length; g++) shuffle(groups[keys[g]]);

  var result = [], last = avoidFirst || null;
  while (result.length < items.length) {
    var best = -1, cands = [];
    for (var k = 0; k < keys.length; k++) {
      var len = groups[keys[k]].length;
      if (!len || keys[k] === last) continue;
      if (len > best) { best = len; cands = [keys[k]]; }
      else if (len === best) cands.push(keys[k]);
    }
    var pick;
    if (cands.length) {
      pick = cands[Math.floor(Math.random() * cands.length)];
    } else {
      for (var k2 = 0; k2 < keys.length; k2++) {
        if (groups[keys[k2]].length) { pick = keys[k2]; break; }
      }
    }
    result.push(groups[pick].pop());
    last = pick;
  }
  return result;
}

// Reel sequence: a pinned 14-piece opener, then the remaining client work
// shuffled (randomised each load), with the personal work held mostly until
// after client work is over — only a few pieces subtly scattered into it.
function slideFrom(proj, it) {
  return {
    type: it.type, src: it.src, name: proj.name,
    sub: proj.subtitle, cat: proj.category,
    pid: proj.id,
    // per-item overrides win, else the project-level note
    role: it.role || proj.role || '',
    outcome: it.outcome || proj.outcome || '',
    playground: !!proj.playgroundLink
  };
}

function buildSlideData() {
  var all = [];
  for (var p = 0; p < projects.length; p++) {
    var proj = projects[p];
    for (var i = 0; i < proj.items.length; i++) {
      var it = proj.items[i];
      if (!it.src) continue;
      all.push(slideFrom(proj, it));
    }
  }

  // pinned opener, in requested order
  var head = [], used = {};
  for (var h = 0; h < FIXED_HEAD.length; h++) {
    for (var a = 0; a < all.length; a++) {
      if (!used[a] && slideGuid(all[a]) === FIXED_HEAD[h]) {
        head.push(all[a]); used[a] = true; break;
      }
    }
  }

  // everything else, split client vs personal
  var restClient = [], restPersonal = [];
  for (var r = 0; r < all.length; r++) {
    if (used[r]) continue;
    if (all[r].cat === 'personal') restPersonal.push(all[r]);
    else restClient.push(all[r]);
  }

  shuffle(restPersonal);

  // subtly scatter a few personal pieces into the client run; the rest
  // (the majority) come after client work is over.
  var scatterN = Math.min(3, restPersonal.length);
  var scatter = restPersonal.splice(0, scatterN);
  var headLast = head.length ? head[head.length - 1].name : null;
  var clientRun = weave(restClient.concat(scatter), headLast);

  return head.concat(clientRun, restPersonal);
}

// Client view: no shuffle. Pieces stay grouped by project, in the order the
// projects array declares them (client work first, personal last). The first
// piece of each group carries a marker so the boundary is legible mid-scroll.
function buildClientData() {
  var out = [];
  var order = projects.slice().sort(function(a, b) {
    return (a.category === 'personal' ? 1 : 0) - (b.category === 'personal' ? 1 : 0);
  });
  for (var p = 0; p < order.length; p++) {
    var proj = order[p], group = [];
    for (var i = 0; i < proj.items.length; i++) {
      if (proj.items[i].src) group.push(slideFrom(proj, proj.items[i]));
    }
    if (!group.length) continue;
    group[0].groupStart = true;
    group[0].groupIdx = out.length ? countGroups(out) + 1 : 1;
    for (var g = 0; g < group.length; g++) group[g].groupSize = group.length;
    out = out.concat(group);
  }
  return out;
}
function countGroups(list) {
  var n = 0;
  for (var i = 0; i < list.length; i++) if (list[i].groupStart) n++;
  return n;
}

var VIEW_MODES = ['shuffled', 'client'];
var viewMode = 'shuffled';
var SLIDES = [];
var slideObjs = [];   // { el, video, src, inited, hls }
var activeIdx = -1;
var audioOn = false;
var hintHidden = false;

function catLabel(cat) {
  if (cat === 'content') return 'content';
  if (cat === 'fnb') return 'food & beverage';
  if (cat === 'events') return 'events';
  return 'personal';
}
function pad2(n) { return (n < 10 ? '0' : '') + n; }

// Credit block: what raj actually did, and what it did for the client.
// Renders nothing until the role/outcome slots in `projects` are filled.
// Add ?slots=1 to the URL to see the empty slots while writing them.
var SHOW_EMPTY_SLOTS = /[?&]slots=1/.test(window.location.search);
function creditBlock(s) {
  var role = s.role || (SHOW_EMPTY_SLOTS ? '<span class="reel-todo">role — to be written</span>' : '');
  var out = s.outcome || (SHOW_EMPTY_SLOTS ? '<span class="reel-todo">outcome — to be written</span>' : '');
  if (!role && !out) return '';
  return '<div class="reel-credit">' +
    (role ? '<p class="reel-credit-row"><span class="reel-credit-key">my part</span>' + role + '</p>' : '') +
    (out ? '<p class="reel-credit-row"><span class="reel-credit-key">what it did</span>' + out + '</p>' : '') +
  '</div>';
}

// ---- Build DOM ----
function renderReel(mode) {
  var reel = document.getElementById('reel');
  if (!reel) return;

  // tear down whatever is currently mounted
  if (reelObserver) { reelObserver.disconnect(); reelObserver = null; }
  for (var t = 0; t < slideObjs.length; t++) teardownVideo(slideObjs[t]);
  slideObjs = [];
  activeIdx = -1;
  reel.innerHTML = '';

  viewMode = mode;
  SLIDES = mode === 'client' ? buildClientData() : buildSlideData();
  var total = SLIDES.length;
  var clientCount = countGroups(SLIDES);

  // Intro slide
  var intro = document.createElement('section');
  intro.className = 'reel-slide reel-intro seen';
  intro.innerHTML =
    '<div class="reel-intro-inner">' +
      '<div class="reel-intro-eyebrow">portfolio</div>' +
      '<h1 class="reel-intro-title">things i’ve<br><em>made.</em></h1>' +
      '<p class="reel-intro-sub">' +
        (mode === 'client'
          ? total + ' pieces · ' + clientCount + ' clients · grouped'
          : total + ' pieces · shuffled every visit') +
        ' · tap any one for sound</p>' +
    '</div>' +
    '<div class="reel-cue" aria-hidden="true"><span></span></div>';
  reel.appendChild(intro);

  // Media slides
  for (var i = 0; i < total; i++) {
    var s = SLIDES[i];
    var sec = document.createElement('section');
    sec.className = 'reel-slide reel-piece';
    sec.setAttribute('data-idx', i);

    var media = document.createElement('div');
    media.className = 'reel-media';

    var videoEl = null;
    if (s.type === 'video') {
      var poster = s.src.replace('playlist.m3u8', 'thumbnail.jpg');
      videoEl = document.createElement('video');
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.autoplay = true;
      videoEl.setAttribute('playsinline', '');
      videoEl.setAttribute('webkit-playsinline', '');
      videoEl.setAttribute('muted', '');
      videoEl.setAttribute('autoplay', '');
      videoEl.setAttribute('poster', poster);
      videoEl.setAttribute('preload', 'none');
      videoEl.draggable = false;
      media.className += ' is-video';
      media.appendChild(videoEl);

      var chip = document.createElement('div');
      chip.className = 'reel-audio';
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      chip.setAttribute('aria-label', 'toggle sound');
      chip.innerHTML = SPK_OFF;
      media.appendChild(chip);
    } else {
      var img = document.createElement('img');
      img.loading = 'lazy';
      img.draggable = false;
      img.alt = s.name;
      img.src = s.src;
      media.appendChild(img);
    }

    var label = document.createElement('div');
    label.className = 'reel-label';
    var pl = s.playground ? '<a href="playground.html" class="reel-pglink">from the playground →</a>' : '';
    label.innerHTML =
      '<div class="reel-cat">' + catLabel(s.cat) + '</div>' +
      '<div class="reel-name">' + s.name + '</div>' +
      '<div class="reel-sub">' + (s.sub || '') + '</div>' +
      creditBlock(s) +
      pl;

    // media + label share a frame sized to the video, so the title sits on
    // the video's bottom-left edge (not the far screen edge)
    var frame = document.createElement('div');
    frame.className = 'reel-frame';
    frame.appendChild(media);
    frame.appendChild(label);

    // client view: mark where each client's run begins
    if (s.groupStart) {
      sec.className += ' is-group-start';
      var mark = document.createElement('div');
      mark.className = 'reel-groupmark';
      mark.innerHTML =
        '<span class="reel-groupmark-n">' + pad2(s.groupIdx) + ' / ' + pad2(clientCount) + '</span>' +
        '<span class="reel-groupmark-name">' + s.name + '</span>' +
        '<span class="reel-groupmark-count">' + s.groupSize + ' ' + (s.groupSize === 1 ? 'piece' : 'pieces') + '</span>';
      frame.appendChild(mark);
    }

    sec.appendChild(frame);
    reel.appendChild(sec);

    var obj = { el: sec, video: videoEl, src: s.src, inited: false, hls: null };
    slideObjs.push(obj);

    if (videoEl) {
      (function(o) {
        var toggle = function(e) { e.stopPropagation(); setAudio(!audioOn); };
        o.video.addEventListener('click', toggle);
        var chipEl = o.el.querySelector('.reel-audio');
        chipEl.addEventListener('click', toggle);
        chipEl.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); }
        });
      })(obj);
    }
  }

  setupObserver();
}

// ---- View toggle: shuffled <-> by client ----
var reelObserver = null;

function setupViewToggle() {
  var wrap = document.getElementById('reel-view');
  if (!wrap) return;
  var sc = document.getElementById('screen-port');
  var btns = wrap.querySelectorAll('.reel-view-btn');

  function paint(instant) {
    // On load the markup starts on "shuffled"; if localStorage says otherwise
    // the pill must be placed, not slide across on its own.
    if (instant) wrap.classList.add('no-anim');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-mode') === viewMode;
      btns[i].classList.toggle('on', on);
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    wrap.setAttribute('data-mode', viewMode);
    if (instant) {
      requestAnimationFrame(function() {
        requestAnimationFrame(function() { wrap.classList.remove('no-anim'); });
      });
    }
  }

  for (var b = 0; b < btns.length; b++) {
    btns[b].addEventListener('click', function() {
      var next = this.getAttribute('data-mode');
      if (next === viewMode) return;
      // fade the reel out, swap underneath, fade back — a hard cut on a
      // full-screen video reel reads as a page break, not a re-sort.
      sc.classList.add('reel-swapping');
      setTimeout(function() {
        renderReel(next);
        if (sc) sc.scrollTop = 0;
        paint();
        // next frame, so the new slides are laid out before we un-fade
        requestAnimationFrame(function() {
          requestAnimationFrame(function() { sc.classList.remove('reel-swapping'); });
        });
        try { localStorage.setItem('reelView', next); } catch (e) {}
      }, 180);
    });
  }
  paint(true);
}

// ---- IntersectionObserver: reveal + which piece is centered ----
function setupObserver() {
  if (!('IntersectionObserver' in window)) {
    for (var k = 0; k < slideObjs.length; k++) slideObjs[k].el.classList.add('seen');
    if (slideObjs[0]) activate(0);
    return;
  }
  var io = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (!e.isIntersecting) continue;
      e.target.classList.add('seen');
      if (e.intersectionRatio >= 0.55) {
        var idx = parseInt(e.target.getAttribute('data-idx'), 10);
        if (!isNaN(idx)) activate(idx);
      }
    }
  }, { root: document.getElementById('screen-port'), threshold: [0.12, 0.55, 0.8] });
  for (var j = 0; j < slideObjs.length; j++) io.observe(slideObjs[j].el);
  reelObserver = io;
}

// force muted autoplay to start on first scroll even on slow connections:
// try now, then retry when the media can play and on the first touch.
function forcePlay(v) {
  var attempt = function() { var p = v.play(); if (p && p.catch) p.catch(function(){}); };
  attempt();
  v.addEventListener('canplay', attempt, { once: true });
  v.addEventListener('loadeddata', attempt, { once: true });
  if (!forcePlay._bound) {
    forcePlay._bound = true;
    document.addEventListener('touchstart', function() {
      var a = slideObjs[activeIdx];
      if (a && a.video) { var p = a.video.play(); if (p && p.catch) p.catch(function(){}); }
    }, { passive: true });
  }
}

function activate(idx) {
  if (idx === activeIdx) return;
  activeIdx = idx;
  for (var i = 0; i < slideObjs.length; i++) {
    var o = slideObjs[i];
    if (!o.video) continue;
    var dist = Math.abs(i - idx);
    if (i === idx) {
      ensureVideo(o);
      o.video.muted = !audioOn;
      forcePlay(o.video);
    } else if (dist === 1) {
      ensureVideo(o);          // preload neighbour so it's buffered before you land
      o.video.pause();
      o.video.muted = true;
    } else {
      o.video.pause();
      o.video.muted = true;
      teardownVideo(o);
    }
  }
  if (idx >= 2) hideHint();
  updateAudioChips();
}

function ensureVideo(o) {
  if (o.inited || !o.video) return;
  o.inited = true;
  var v = o.video, src = o.src;
  v.preload = 'auto';
  if (v.canPlayType('application/vnd.apple.mpegurl')) {
    v.src = src;
    try { v.load(); } catch (e) {}
  } else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
    var hls = new Hls({ enableWorker: true, startLevel: -1, maxBufferLength: 12 });
    hls.loadSource(src);
    hls.attachMedia(v);
    o.hls = hls;
  } else {
    v.src = src;
  }
}

function teardownVideo(o) {
  if (!o.inited || !o.video) return;
  o.inited = false;
  if (o.hls) { try { o.hls.destroy(); } catch (e) {} o.hls = null; }
  o.video.removeAttribute('src');
  try { o.video.load(); } catch (e) {}
}

// ---- Audio ----
function setAudio(on) {
  audioOn = on;
  for (var i = 0; i < slideObjs.length; i++) {
    if (!slideObjs[i].video) continue;
    slideObjs[i].video.muted = !(i === activeIdx && on);
  }
  hideHint();
  updateAudioChips();
}

function updateAudioChips() {
  for (var i = 0; i < slideObjs.length; i++) {
    var o = slideObjs[i];
    if (!o.video) continue;
    var chip = o.el.querySelector('.reel-audio');
    if (!chip) continue;
    var on = (i === activeIdx && audioOn);
    chip.innerHTML = on ? SPK_ON : SPK_OFF;
    chip.classList.toggle('on', on);
  }
}

function hideHint() {
  if (hintHidden) return;
  hintHidden = true;
  var h = document.getElementById('reel-hint');
  if (h) h.classList.add('gone');
}

// ---- Scroll progress ----
function setupProgress() {
  var bar = document.getElementById('reel-progress-fill');
  var sc = document.getElementById('screen-port');
  if (!bar || !sc) return;
  var ticking = false;
  sc.addEventListener('scroll', function() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      var max = sc.scrollHeight - sc.clientHeight;
      var pct = max > 0 ? (sc.scrollTop / max) : 0;
      bar.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
      ticking = false;
    });
  }, { passive: true });
}

function initPortfolio() {
  var saved = null;
  try { saved = localStorage.getItem('reelView'); } catch (e) {}
  if (VIEW_MODES.indexOf(saved) === -1) saved = 'shuffled';
  renderReel(saved);
  setupViewToggle();
  setupProgress();
}

document.addEventListener('DOMContentLoaded', initPortfolio);
