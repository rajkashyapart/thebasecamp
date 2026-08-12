#!/usr/bin/env node
// audit.js -- the squint test, with numbers.
//
//   node .claude/audit.js hub
//   node .claude/audit.js about --open      (expand every disclosure first)
//
// Screenshots a page at three widths and counts what actually renders, not
// what the CSS source says. Source undercounts: a clamp() is one declaration
// and three different rendered sizes.
//
// No npm, no package.json. Playwright is resolved from wherever it already
// lives on this machine (npx cache, global, or a local node_modules).

const fs = require('fs');
const path = require('path');
const os = require('os');

// ── find playwright without installing anything ──────────────────────────
function loadPlaywright() {
  try { return require('playwright'); } catch (e) {}
  const roots = [
    path.join(os.homedir(), 'AppData/Local/npm-cache/_npx'),
    path.join(os.homedir(), '.npm/_npx')
  ];
  for (const root of roots) {
    let entries = [];
    try { entries = fs.readdirSync(root); } catch (e) { continue; }
    for (const dir of entries) {
      const p = path.join(root, dir, 'node_modules', 'playwright');
      if (fs.existsSync(p)) {
        try { return require(p); } catch (e) {}
      }
    }
  }
  console.error(
    'playwright not found.\n' +
    'Run this once to put it in the npx cache, then re-run the audit:\n' +
    '  npx playwright@latest --version'
  );
  process.exit(1);
}

// ── budgets, from CLAUDE.md ──────────────────────────────────────────────
const BUDGET = {
  sizes: 5,
  accents: 1,
  // Two accents are allowed only where the split carries meaning.
  // about: blue marks the work, pink marks the person.
  // hub:   blue marks the path you scope, pink the recommended one.
  // ciad:  blue is the craft (positioning, the method, the day itself),
  //        pink is the payoff and the person (Raj's hand, the one button).
  // case-studies: blue is *who* (the client name, in the list and on its own
  //        page), pink is *what it did* (the multiple) and the booking CTA.
  accentsException: { about: 2, hub: 2, ciad: 2, 'case-studies': 2 },
  spacingCount: 4                   // tight / unit / between-units / section
};

// 706, not 844. 844 is the *device* height of the phone Raj holds; Safari's
// own chrome takes about 138 of it, so 706 is the live viewport a page
// actually gets. Auditing at 844 is what let CIAD ship with four of its five
// screens overflowing -- headline cut off under the nav, copy running under
// the bar -- while every check here came back green. (2026-08-11)
const VIEWS = [
  ['desktop', 1440, 900],
  ['short',   1366, 768],   // the laptop that exposes dead bands
  ['phone',    390, 706]    // iPhone 14/15 in Safari, both toolbars showing
];

// ── args ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const page_ = (args.find(a => !a.startsWith('-')) || 'hub').replace(/\.html$/, '');
const openAll = args.includes('--open');
const outDir = process.env.CLAUDE_SCRATCHPAD ||
  path.join(os.tmpdir(), 'audit-' + page_);

// ── the measurement, run inside the browser ──────────────────────────────
function measure() {
  const NEUTRAL_SAT = 0.14;   // below this a colour is ink or paper, not an accent
  const MIN_ALPHA   = 0.16;   // a 0.08 hairline is texture, not a colour decision
  const INK_L       = 0.20;   // a warm near-black is ink however saturated it reads
  const PAPER_L     = 0.90;   // and a warm near-white is paper
  const MIN_SPACE   = 8;      // under 8px is optical nudging, not structure

  function parse(c) {
    const m = String(c).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map(s => parseFloat(s));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  function sat(c) {
    const r = c.r / 255, g = c.g / 255, b = c.b / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
    if (mx === mn) return 0;
    return l > 0.5 ? (mx - mn) / (2 - mx - mn) : (mx - mn) / (mx + mn);
  }
  function light(c) {
    const mx = Math.max(c.r, c.g, c.b) / 255, mn = Math.min(c.r, c.g, c.b) / 255;
    return (mx + mn) / 2;
  }
  function hue(c) {
    const r = c.r / 255, g = c.g / 255, b = c.b / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    if (!d) return 0;
    let h;
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    return Math.round(((h * 60) + 360) % 360);
  }

  const sizes = {}, accents = {}, spacing = {}, fams = {}, fused = [], unstyled = [];

  // The nav is shared chrome on every page. Counting it into each page's
  // budget makes the number the same everywhere and therefore useless --
  // audit what this page actually put on the screen.
  const root = document.querySelector('.screen') || document.body;

  root.querySelectorAll('*').forEach(el => {
    if (el.closest('nav')) return;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    const box = el.getBoundingClientRect();
    if (!box.width && !box.height) return;

    // type sizes, only where there is real text
    const ownText = [...el.childNodes]
      .some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (ownText) {
      const px = Math.round(parseFloat(cs.fontSize));
      sizes[px] = (sizes[px] || 0) + 1;
      const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '');
      fams[fam] = (fams[fam] || 0) + 1;
    }

    // accents: any saturated colour, wherever it is used
    [['text', cs.color], ['bg', cs.backgroundColor],
     ['border', cs.borderTopColor], ['border', cs.borderLeftColor]].forEach(([role, v]) => {
      if (role === 'border' && parseFloat(cs.borderTopWidth) === 0
                            && parseFloat(cs.borderLeftWidth) === 0) return;
      const c = parse(v);
      if (!c || c.a < MIN_ALPHA) return;
      if (sat(c) < NEUTRAL_SAT) return;
      const L = light(c);
      if (L < INK_L || L > PAPER_L) return;    // warm ink and warm paper are not accents
      const bucket = Math.round(hue(c) / 20) * 20;   // 20deg buckets = one hue family
      accents[bucket] = accents[bucket] || { hue: bucket, uses: 0, samples: {} };
      accents[bucket].uses++;
      const key = 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
      accents[bucket].samples[key] = (accents[bucket].samples[key] || 0) + 1;
    });

    // an anchor still wearing the browser default is a colour nobody chose
    if (el.tagName === 'A' && /rgb\(0, *0, *238\)|rgb\(85, *26, *139\)/.test(cs.color)) {
      unstyled.push((el.id ? '#' + el.id : '') + (el.className ? '.' + String(el.className).split(' ')[0] : el.tagName));
    }

    // structural spacing only -- the values that separate things, not the
    // optical nudges inside a pill
    ['marginTop', 'marginBottom', 'rowGap', 'columnGap'].forEach(p => {
      const v = Math.round(parseFloat(cs[p]));
      if (v >= MIN_SPACE && v < 400) spacing[v] = (spacing[v] || 0) + 1;
    });

    // Proximity: the gap BETWEEN children must beat the padding INSIDE them,
    // or the children fuse into one blob. This is the rule Hub actually broke
    // (16px gap, 26px padding) so it gets measured, not trusted.
    //
    // Two exclusions, both deliberate. A wrapping list is a SET -- chips and
    // tags are meant to read as one group, so tight gaps there are correct,
    // not a failure. And the gap is only compared against padding on its own
    // axis: a row gap has nothing to do with a child's left padding.
    if ((cs.display === 'grid' || cs.display === 'flex')
        && el.children.length > 1 && cs.flexWrap !== 'wrap') {
      [['rowGap', 'paddingTop', 'paddingBottom'],
       ['columnGap', 'paddingLeft', 'paddingRight']].forEach(([g, pa, pb]) => {
        const gap = parseFloat(cs[g]) || 0;
        if (!gap) return;
        let pad = 0;
        [...el.children].forEach(ch => {
          const c2 = getComputedStyle(ch);
          pad = Math.max(pad, parseFloat(c2[pa]) || 0, parseFloat(c2[pb]) || 0);
        });
        if (pad > 0 && gap <= pad) {
          fused.push({
            sel: (el.id ? '#' + el.id : '.' + String(el.className).split(' ')[0]),
            axis: g === 'rowGap' ? 'row' : 'col',
            gap: Math.round(gap), pad: Math.round(pad)
          });
        }
      });
    }
  });

  // does the page leave a dead band under its content?
  const scroller = [...document.querySelectorAll('.screen, body')]
    .find(e => e.scrollHeight > e.clientHeight + 4) || document.documentElement;
  let lastBottom = 0;
  root.querySelectorAll('*').forEach(el => {
    if (el.closest('nav')) return;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    if (!el.textContent.trim() && !el.matches('img,video,svg,canvas')) return;
    const b = el.getBoundingClientRect().bottom;
    if (b > lastBottom) lastBottom = b;
  });

  return {
    sizes, accents, spacing, fams, fused, unstyled: [...new Set(unstyled)],
    fill: {
      viewport: Math.round(window.innerHeight),
      lastContent: Math.round(lastBottom),
      scrollable: scroller.scrollHeight > scroller.clientHeight + 4
    }
  };
}

// ── reporting ────────────────────────────────────────────────────────────
const G = '\x1b[32m', R = '\x1b[31m', Y = '\x1b[33m', D = '\x1b[2m', X = '\x1b[0m';

function report(name, m, limitAccents) {
  const sizes = Object.keys(m.sizes).map(Number).sort((a, b) => a - b);
  const accents = Object.values(m.accents).sort((a, b) => b.uses - a.uses);
  const spacing = Object.keys(m.spacing).map(Number).sort((a, b) => a - b);
  const fams = Object.keys(m.fams);

  const line = (label, value, ok, note) =>
    console.log('  ' + label.padEnd(9) + String(value).padEnd(42) +
                (ok ? G + 'OK' : R + 'OVER') + X + (note ? D + '  ' + note + X : ''));

  console.log('\n' + name);

  line('sizes', sizes.join(' '), sizes.length <= BUDGET.sizes,
       sizes.length + '/' + BUDGET.sizes);

  const accentDesc = accents.length
    ? accents.map(a => Object.keys(a.samples)[0] + ' ×' + a.uses).join('  ')
    : '(none)';
  line('accents', accentDesc, accents.length <= limitAccents,
       accents.length + '/' + limitAccents);

  // Spacing. The point of the tier rule was never the exact numbers -- it
  // was FEW values, WELL SEPARATED, so a jump reads as "new section". Two
  // values 15% apart cost a decision and communicate nothing, which is the
  // failure About actually had (an 11-value scale from 2px to 36px).
  const near = [];
  for (let i = 1; i < spacing.length; i++) {
    if (spacing[i] - spacing[i - 1] <= spacing[i] * 0.15) {
      near.push(spacing[i - 1] + '/' + spacing[i]);
    }
  }
  line('spacing', spacing.join(' '),
       spacing.length <= BUDGET.spacingCount && !near.length,
       near.length ? 'indistinguishable: ' + near.join(' ')
                   : spacing.length + '/' + BUDGET.spacingCount + ' tiers');

  line('fonts', fams.join(' + '), fams.length <= 3, fams.length + ' families');

  // proximity: gap between > padding inside, or the children fuse
  if (m.fused.length) {
    m.fused.forEach(f => console.log('  ' + R + 'fused'.padEnd(9) + X +
      f.sel + '  ' + f.axis + '-gap ' + f.gap + 'px <= padding ' + f.pad + 'px' +
      D + '  (children read as one blob)' + X));
  }

  // an anchor nobody styled
  if (m.unstyled.length) {
    console.log('  ' + R + 'unstyled'.padEnd(9) + X +
      m.unstyled.join(' ') + D + '  (browser default link colour)' + X);
  }

  // dead band under the content -- his standing complaint
  const slack = m.fill.viewport - m.fill.lastContent;
  if (!m.fill.scrollable && slack > 120) {
    console.log('  ' + Y + 'dead band'.padEnd(9) + X +
      slack + 'px of nothing below the last element');
  }
}

// ── run ──────────────────────────────────────────────────────────────────
(async () => {
  const { chromium } = loadPlaywright();
  fs.mkdirSync(outDir, { recursive: true });

  const limitAccents = BUDGET.accentsException[page_] || BUDGET.accents;
  const url = 'http://localhost:8080/' + page_ + '.html';

  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    console.error('could not launch chromium: ' + e.message +
      '\ntry:  npx playwright@latest install chromium');
    process.exit(1);
  }

  console.log('\n' + page_ + '.html' + D + '   budget: ' + BUDGET.sizes +
    ' sizes / ' + limitAccents + ' accent' + (limitAccents > 1 ? 's' : '') +
    ' / ' + BUDGET.spacingCount + ' spacing tiers' + X);

  for (const [name, w, h] of VIEWS) {
    const p = await browser.newPage({
      viewport: { width: w, height: h }, deviceScaleFactor: 2
    });
    try {
      await p.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    } catch (e) {
      console.error('\ncould not reach ' + url +
        '\nstart the server first:  python3 -m http.server 8080');
      await browser.close();
      process.exit(1);
    }
    await p.waitForTimeout(2600);          // entrance animations settle

    if (openAll) {
      await p.evaluate(() => {
        document.querySelectorAll('[aria-expanded="false"]').forEach(b => b.click());
      });
      await p.waitForTimeout(700);
    }

    const m = await p.evaluate(measure);
    report(name + '  ' + w + '×' + h, m, limitAccents);

    // .screen pages scroll inside themselves, so fullPage captures one
    // viewport. Walk the container instead -- which also fires the
    // IntersectionObserver reveals on the way down.
    const shots = await p.evaluate(() => {
      const s = [...document.querySelectorAll('.screen, body')]
        .find(e => e.scrollHeight > e.clientHeight + 4);
      return s ? Math.min(4, Math.ceil(s.scrollHeight / s.clientHeight)) : 1;
    });
    for (let i = 0; i < shots; i++) {
      if (i > 0) {
        await p.evaluate(n => {
          const s = [...document.querySelectorAll('.screen, body')]
            .find(e => e.scrollHeight > e.clientHeight + 4);
          if (s) s.scrollTop = s.clientHeight * n;
        }, i);
        await p.waitForTimeout(600);
      }
      await p.screenshot({
        path: path.join(outDir, page_ + '-' + name + (shots > 1 ? '-' + i : '') + '.png')
      });
    }
    await p.close();
  }

  await browser.close();
  console.log('\n' + D + 'shots -> ' + outDir + X);
  console.log(D + 'now blur them: >3 things competing, or no clear first landing, is a fail.' + X + '\n');
})();
