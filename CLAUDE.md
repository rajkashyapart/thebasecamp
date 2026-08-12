# CLAUDE.md

Personal portfolio for Raj Kashyap (rajkashyap.studio). Content strategist,
photographer, creator. It should feel like opening someone's sketchbook —
warm, intentional, slightly irreverent. Not a corporation. Not a template.

This file states what is true now. `TASTE.md` holds the record of how it got
that way — dated, in Raj's own words — and is injected at session start by the
`SessionStart` hook. Anything settled in `TASTE.md` is binding.

---

## 1. Before you write any frontend code

**Ask first.** For open-ended visual work — a new page, a redesign, a "make it
better" pass — do not write code first. Ask 2–4 concrete questions with
`AskUserQuestion` and ask for a reference image. Across six sessions Raj typed
some form of "askuserquestions" **13 times**, always meaning *gather constraints
before coding*. A bounded instruction ("make the nav bigger", "these 8 videos in
this order") is not open-ended — just do it.

**Load `emil-design-eng`.** Every session, every frontend edit, including
refinement passes. Raj has had to ask for this by name twice; the `PreToolUse`
design gate only reminds you, it does not load it.

**Name what you remove.** If a change adds a block, a type size, a colour or a
metaphor and removes nothing, justify it in the commit or don't ship it.

---

## 2. When Raj rejects something

This is the loop that has cost the most hours. `about.html` has 27 commits and
four full rebuilds — *"rebuild as a scrapbook bento"* → *"rebuild as an actual
desk"* → *"rebuild against the Emmi reference"* — each one following a flat
"i don't like it". Rebuilding threw away every part he had **not** objected to,
which is how a page gets rebuilt four times without converging.

So: **a rejection names one thing, not the whole page.**

1. Ask which part. One question, with options drawn from what's actually on
   screen. He answers precisely when the options are concrete — asked to choose
   between "bring back scatter" and "refine what's there" he picked refine
   instantly, after three rebuilds guessing.
2. Change that part. Leave the rest alone.
3. If two rounds of targeted fixes don't land, *then* ask whether to restart —
   don't decide that yourself.

He will also correct facts and copy. Take his wording verbatim; he strips
cleverness back to the plain statement, and he is right every time.

---

## 3. The subtraction rule

This site's chronic failure is accumulation. Clutter never arrives in one bad
decision — it arrives as twenty reasonable additions with nothing removed. Four
separate passes were made at Work With Me and About and every one made the page
*bigger*. His verdict after all four: *"both pages are still very very cluttered."*

- **Say each fact once.** Before adding a stat, claim or credential, grep for
  it. "Word of mouth" was on About four times.
- **Never ship a placeholder.** No `[bracketed template text]`, no empty card,
  no `...` reaches a committed file. Delete the section or fill it.
- **Ornament is not hierarchy.** Reaching for a divider, rule or label to show
  structure means the spacing is wrong. Fix the spacing, delete the ornament.
- **One focal point per screen.** Give it depth and weight; make everything
  else actively recede. Uniform emphasis is identical to no emphasis.
- **Proximity beats decoration.** The gap *between* two things must exceed the
  padding *inside* them, or they fuse. Hub broke this with a 16px gap and 26px
  padding. (Wrapping chip lists are exempt — a set is not a comparison.)
- **Comparison requires adjacency.** Options the user must choose between have
  to be visible simultaneously, sharing a structure and *starting* together.
  Not ending together: `align-items:start`, never `stretch`.

**Budgets, per page:**

| Budget | Limit |
|---|---|
| Distinct font sizes | 5 |
| Accent colours | 1 — except About, Work With Me, CIAD, Case Studies and Playground, which run 2 because the split means something (blue marks the work / the path you scope / the craft / *who* the client is / Raj's own notes; pink marks the person / the recommendation / the payoff / *what it did* / the one link out). Two accents used interchangeably are not allowed. Colour lands on the word that carries the meaning, never on a whole line. There is no third — green was retired from playground's doodles on 2026-08-12 and `--accent-g` is now declared but unused. |
| Structural spacing values | 4 tiers, well separated. Two values within 15% of each other communicate nothing and cost a decision. |
| Physical-object metaphors | 1. Hang tags, receipts, wristbands, folders — pick one. Three skeuomorphs is noise, not charm. |
| Easing curves | 5, all tokens in `:root`, none written by hand. `--e-out` is the default (entering, exiting, answering a press); `--e-in-out` for something already on screen moving; `--e-drawer` for the CIAD deck's long travel; `--e-dissolve` for the video intro only; `--e-spring` overshoots and is allowed **only** on the playground recenter. A bounce on anything a visitor triggers more than once a page is wrong — it was on the CTA hover and came off. Loop animations keep a literal symmetric curve at the call site. |

When unsure between two approaches, pick the one with more craft — and note
that removing something is usually the higher-craft option.

---

## 4. Verify with numbers, then with your eyes

Serve on `localhost:8080`, never `file:///`:

```bash
python3 -m http.server 8080
node .claude/audit.js hub          # or: about, playground, portfolio, ciad
node .claude/audit.js about --open # expands every disclosure first
```

It screenshots all three widths and counts what actually **renders** — CSS
source undercounts, since one `clamp()` is three rendered sizes — checking type
sizes, accents, spacing tiers, fused proximity, unstyled anchors and dead bands
against the budgets above. Playwright is resolved from wherever it already lives
on the machine, so there is still no npm and no `package.json`.

**The phone is 390×706, not 390×844.** 844 is the *device* height; Safari's own
chrome takes ~138px of it, so 706 is the live viewport a page actually gets
(and ~664 on a smaller handset). The audit was checking 844 until 2026-08-11,
which is how CIAD shipped with four of five screens overflowing — headline cut
off under the nav, copy running under the bar — while every check came back
green. Never sign off a phone layout at the device height.

Then run the **squint test** on the screenshots — blur until text is illegible:

- How many things still compete? More than 3 is a fail.
- Where does the eye land first? "Nowhere" or "the decoration" means the
  hierarchy is broken.
- Can you see the structure with the text gone? If sections are only
  distinguishable by their labels, the spacing isn't working.

A diff against the previous state only catches regressions. It can never catch
clutter, because clutter arrives a little at a time and every step looks fine.

Do at least two rounds. Stop when nothing visible is wrong, or Raj says so.

---

## 5. Settled directions

- **About is the editorial page.** Writing on the left, photographs on the right
  bled to the viewport edge. No cards, no tape, no tilt, no drift. The pictures
  carry the personality; the type stays out of their way. One dominant
  photograph is the focal point. Don't scatter it.
  **The three section heads are marked, and the mark is size plus a rule.**
  Raj, 2026-08-12: *"a team of one needs to be highlighted i guess, same for
  experience and education."* At 21px against 15px body they were four points
  above the prose in a face nobody reads as loud, so the column squinted down
  to one grey block with no sections in it. They are 28 now with the gap above
  each several times the gap below, and a 22px rule sits above each one —
  *above*, flush with the column's spine, never indented into the margin,
  because the left edge every other line aligns to is what makes the page
  read as editorial. Rule colour is the page's own split, no new hue: pink on
  "a team of one" (the person), blue on the two records of the work.
  **The photographs scroll; the writing does not.** Asked on 2026-08-12
  whether the tiles were too small, Raj wanted playground's quality — moving
  through pictures rather than pictures fitted to a pane — and *"every
  picture on the page needs to stay somehow, they're a part of my brand."*
  The two only reconcile by letting the pane run past the fold: the hero
  band still fills screen one exactly, everything under it flows at four
  tiles to the pane width (~245px, twice what one-screen gave), and the
  writing column is `position:sticky`. The flow picks its row count by
  scoring closeness to that target *and* row evenness together — as a
  pure evenness filter it once chose five rows of five, perfectly tidy at
  145px, which is the exact problem the layout exists to solve. Sticky *bottom* does
  not engage inside `#screen-about`'s scroller — measured; the column just
  scrolls away. `about.js` sets a negative `top` instead, so a column
  taller than the viewport scrolls exactly far enough to show its last line
  and pins there. Don't crush the mosaic back into one screen, and don't
  cut photographs to make it fit.
  On a phone the hero is moved into the writing, under the clients line:
  every word used to come before every picture.
  **The mosaic drifts.** 24px/s, linear, starting 2.5s after arrival so
  the first screen lands first. It stops while the cursor is over the
  photographs and starts again only when the cursor reaches the writing —
  Raj's rule, 2026-08-12: leaving a picture is not enough on its own. A
  manual scroll holds it off for 2.5s, and it is off entirely on a phone
  and under `prefers-reduced-motion`. Every tile lifts 5px / 1.02 on
  hover, 200ms ease-out; that and the drift stopping are one gesture.
  The thirty-four photographs live in `shots/`, served locally. Raj's originals
  are raw camera JPGs on Bunny — ~150MB for the set, and **that pull zone
  has no image optimizer**, so `?width=` returns the original bytes. There
  is no converter on the machine either; they were re-encoded to webp
  through Playwright's canvas at the size each actually renders (600px for
  the tiles, 1400px for the hero). Every tile's `--ar` is the file's true
  ratio, because `about.js` justifies each row off that value before the
  images have loaded — a guessed one breaks the first paint.
- **Playground is the scatter page.** Tilt and organic clustering belong
  there and only there — tight clusters, dramatic size variety, edge bleed, a
  clear centre. If it looks "placed" instead of "scattered", it's wrong.
  (The Emmi reference image is gone from the repo; it survives as this rule.)
  **The three note cards are one blue and pink belongs to the one link.**
  They were two hand-mixed teals and a pink, and blurred until the type is
  illegible that pink note was the loudest thing on the canvas — louder
  than the headline, louder than *see the work*, which is the only link
  the page has and is also pink. Three notes in one voice look like it now
  (`--accent-b`, set from `PG_NOTE_BG` in `playground.js`). Glyph colour
  used to be assigned by which ring a doodle sat in, which is what a third
  accent with no job looks like; the green went with it.
  `never stop playing <3` sits at the world origin; the cards' bounding
  box did not, so "centre the composition" and "centre the headline" were
  92px and 115px apart and the view could only hit one. `playground.js`
  now shifts every card and glyph on load so the two coincide, and
  `centerView` targets the headline's own box — not `.pg-center`, which
  also holds the sub-line and the CTA and would leave the words sitting
  high. A reserved rectangle round the headline evicts anything that
  overlaps it along its shortest axis, so no card or glyph can sit behind
  the words or on the one link the page has. Don't hand-place cards to
  dodge the headline; the rectangle is what keeps it clear.
- **Portfolio is a full-screen vertical reel.** Not a mosaic. No glass cursor.
- **CIAD is a five-screen deck** — the question, the problem, how we work,
  the work, the month after — crossed by one button that morphs from "find
  out" into "book a call". One action on screen at any moment; the rail
  doubles as the way to skip ahead. Warm paper like everywhere else. The
  nine folders, the window manager, the ambient video wall, the logo
  marquee, the newsletter bar and the dark theme are gone — don't
  reintroduce any of them. **Five, not six** — asked whether outliers
  deserved their own screen, Raj put the figures on "the work" instead.
- **The two diagrams each replaced something.** The problem's six
  disciplines are a closed ring (was a wrapped list with arrows); how we
  work is a stationed line with a dashed return (was a three-item spec
  list, each figure now under the station it describes). Both draw once on
  arrival and hold still — linear, because a line being traced is constant
  motion and an eased one outruns the labels timed off it. Drawings only:
  he chose them over photographs and over video, and the reels on "the
  work" stay the deck's only photography.
- **"the work" is the proof screen.** Each reel carries its multiple —
  5–20× / 3× / 3–11× / up to 5× / 2.5× — with the client under it and the
  unit stated once below the row: *× their own average post. no ad spend.*
  The lead line that used to claim it paid for them.
  **The same five figures are hard-coded in three files** — `ciad.js`,
  `case-studies.js` and `portfolio.js`. Move one and you move all three or
  the site argues with itself. Hedges are part of the fact: "up to 5×"
  never becomes "5×". Figures being compared must *start* together, which
  is why that hedge hangs on its own line above its number.
- **The bar is one row, including on a phone.** Stacked (rail above a
  full-width button) it was 168px — a quarter of a 706px viewport before
  any content. Don't stack it again.
- **The rail is chapters, not a clock.** It ran 08:00 → 19:00 until Raj
  pointed out that only the smallest package is shootable in a day, which
  made the hours a claim rather than a metaphor. Don't put the times back.
  The ground still warms across the five screens; that is progression, not
  time of day.
- **CIAD's headline is an open loop.** *"only some videos get outlier
  results. why is that?"* — the next four screens are the answer, so nothing
  on screen one may close it, and the button says "find out" rather than
  "next". If the headline changes, that button label changes with it.
- **The price screen is built, not compared.** Dragging the volume fills in
  thirty squares — their month — and the price follows. It snaps to the three
  packages because interpolating would invent prices Raj has never quoted,
  and the cadence line ("one every 2–3 days") is arithmetic off 30 days, not
  a promise. Their choice rides into the Calendly link. Don't turn it back
  into three cards.
- **Case studies is the list, and the list carries the proof.** Six studies,
  not five — CIAD's reel row is the five, this page adds the Indian Cacao
  Festival. Each row shows its multiple in the page's one accent, in a
  fixed-width column so six figures *start* together; "up to" hangs on its
  own line above its number, same as CIAD, and never drops. Raj kept the
  card layout on 2026-08-12 — *"it's good as of now i think"* — so the
  fused-proximity failure was fixed with spacing (28px gap over 20px
  padding), not by removing the box.
  **Two accents, and the split is who / what.** Blue on the client name —
  in the list row and on its own detail page — because Raj asked on
  2026-08-12 for the names to be *"coloured/highlighted. needs contrast in
  some way"*: they were dark ink on a near-white card at the same value as
  the sector and teaser under them, so the loudest thing in the row was the
  arrow. Pink stays on the multiple, the title's *in depth* and the booking
  CTA. The hover arrow went blue with the names, so one gesture lights one
  row and two colours never both mean "go". Row numbers and section labels
  are muted ink.
  **The row has its own phone layout below 600px** — stacked as who / what
  kind / what it did / the sentence about it, with `display:contents` on
  `.cs-card-body` so its three children can take grid rows of their own.
  Above that it kept the desktop's four-column flex all the way to 390px,
  where the multiple's fixed 112px column left the teaser ~150px and four
  lines. The multiples still start together there: column 2 begins where
  the two-digit row number ends, so all six share a left edge.
  **`case-studies.html` loads `portfolio.js` for its data.** That file
  already lists every reel made for every client, so each detail page
  builds its "everything we made for them" row from it rather than
  keeping a second copy of the ids. All three of portfolio.js's init
  functions return early when their own DOM is absent, which is what makes
  this safe — don't add one that doesn't. The match is
  **case-insensitive**: this page's client names are lowercase, that
  file's are still title case, and an exact match silently returns nothing.
- **Video frames take the video's shape, never the reverse.** `.cs-media`
  and `.cs-reel` size off a `--vr` that `case-studies.js` reads from the
  playing video's own `videoWidth/videoHeight`. It was a hard `16/9` with
  `object-fit:cover`, so every vertical reel — all of them but one — was
  centre-cropped to a letterbox. Raj, 2026-08-12: *"it should adapt
  according to the dimensions of the videos."* Default is 9/16, because
  the wrong guess should be the rare case.
- **The playground hero is finished.** Closed. *(Reopened 2026-08-12 for
  centring only — see the playground bullet above. The direction stands.)*
- **Type:** tight tracking on large headings, generous line-height on body.
  Cormorant Garamond italic for display, DM Mono for everything else, Caveat for
  marks in Raj's hand. Never swap font family for emphasis mid-thought — he
  called that out by name.
- **Pages fill the viewport at any size.** No dead band under the content.
  About is the one page that deliberately runs longer than a screen — but
  the rule still holds on its *first* screen and at its foot: the hero band
  is sized to the viewport exactly, and the last row of photographs ends
  flush with the bottom of the scroll.

---

## 6. Copy

Raj runs copy through two frameworks that already live in his vault. Read them
before writing any — don't ask him to attach them:

- `raj's obsidian/raj/raj-uncurated/02-content/framework/03-nnv.md` — novelty,
  non-obvious, tactical
- `.../framework/07-copywriting.md` — Harry Dry's three tests

Everything is lowercase. Facts he has had to correct more than once: **45+
brands** (not 25+), and the education is Don Bosco school 2018 → Don Bosco
humanities 2020 → St Joseph's, graduated 2023.

**Shoot days are 1 / 2 / 3, never "one".** Six videos fit in a single day,
twelve take two, sixteen to twenty take three. "One shoot day" was on CIAD,
Work With Me *and* About, and was wrong on all three. The product is still
named *outlier content in a day* — that is the name, not a delivery promise.

---

## 7. Skills

All at `~/.claude/skills/`. `emil-design-eng` is the default for any frontend
work — the rest are situational.

| Skill | Reach for it when |
|---|---|
| `emil-design-eng` | Any frontend work. Always. |
| `design-motion-principles` | Auditing motion from several designers' perspectives |
| `apple-design` | Gestures, springs, interruptible transitions, optical type |
| `animation-vocabulary` | You can describe a motion but don't know its name |
| `pick-ui-library` / `prototype` | Only when explicitly asked |

`review-animations` also exists at `~/.claude/skills/review-animations/` but is
`disable-model-invocation: true` — **the `Skill` tool cannot load it.** Read
`SKILL.md` and `STANDARDS.md` from that folder directly instead.

Every one of these only knows how to *add* polish. None will ever tell you to
cut — that job is section 3, and it is the job this site keeps failing. Same
reason `animate`, `improve-animations` and `find-animation-opportunities` are
deliberately left uninstalled: all three hunt for *more* things to animate.

---

## 8. Reference

**No build tools, no npm, no frameworks.** Pure HTML/CSS/JS. Cormorant Garamond
and DM Mono come from a Google Fonts `<link>`; **Caveat is self-hosted** at
`fonts/caveat-latin-var.woff2` with an `@font-face` at the top of `styles.css`
and a `<link rel="preload">` on the three pages that use it. Raj reported on
2026-08-12 that "(badly)" on About rendered in a different face on his phone —
it could not be reproduced in a 390-wide Chromium, which leaves the generic
`cursive` fallback, and `cursive` is Snell Roundhand on iOS. Every `.hand`-ish
rule now falls back to Cormorant rather than `cursive`, so a failure stays
inside the site's own faces. Don't put Caveat back on the Google URL.
Each page is a standalone HTML file with one `init*()` function called on
`DOMContentLoaded`.

| File | Purpose | JS |
|---|---|---|
| `index.html` | Video intro (Bunny HLS), redirects to playground | inline |
| `playground.html` | Photo scatter canvas — desktop pan/zoom, mobile vertical feed | `playground.js` |
| `hub.html` | "Work With Me" — two offers, side by side | `hub.js` |
| `about.html` | About — photographs in `shots/` | `about.js` |
| `case-studies.html` | Case studies | `case-studies.js` |
| `ciad.html` | Outlier Content in a Day — a five-screen deck | `ciad.js` |
| `portfolio.html` | Full-screen vertical reel | `portfolio.js` |

`styles.css` (2200+ lines) holds every page, sectioned by
`/* === SCREEN N: NAME === */`. `shared.js` only shows `#pg-nav`. Navigation is
real `<a href>` links; CSS View Transitions handle the fade. No SPA routing.

**One design system: warm paper.** `--bg-warm:#f5f2ee`, grain, Cormorant
italic display, DM Mono for everything else. The iOS dark precision system —
near-black ground, geometric sans, folder metaphor, theme toggle — was CIAD's
alone and went with the rebuild on 2026-08-10. Palette in `:root`:
`--accent-r:#ff7bac`, `--accent-b:#0d8aaf`, `--accent-g:#3a8c52`. Never the
old red or iOS blue.

**Validate JS after every edit** — corruption comes from smart quotes, `/* */`
comments, Unicode in comments and template literals. Use `//` comments and
`&rsquo;` for HTML contractions.

```bash
# inline blocks in an HTML file
node -e "const fs=require('fs'),vm=require('vm'),h=fs.readFileSync('FILE.html','utf8'),s=[],r=/<script[^>]*>([\s\S]*?)<\/script>/gi;let m;while((m=r.exec(h))!==null)s.push(m[1]);s.forEach((x,i)=>{try{new vm.Script(x);console.log('Block '+i+': OK')}catch(e){console.log('Block '+i+': ERROR - '+e.message)}})"

# a standalone .js file
node -e "const fs=require('fs'),vm=require('vm');try{new vm.Script(fs.readFileSync('FILE.js','utf8'));console.log('OK')}catch(e){console.log('ERROR: '+e.message)}"
```

**Deployment:** Vercel, automatic on push. `api/subscribe.js` is a Vercel Edge
Function handling email via Resend (`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`),
CORS-locked to `rajkashyap.studio` and `localhost:8080`. Images and HLS video
are on Bunny CDN.

**`.claude/` holds two hooks — keep them.** `SessionStart` runs `taste.js` to
inject `TASTE.md`; `PreToolUse` is the design gate on frontend edits. Do not
reinstall claude-flow, `.mcp.json`, or the 260+ swarm/agent files that were
deliberately removed.

---

## The one rule

Don't create new problems while fixing old ones. If something worked before your
edit, it must work after. Test everything. Screenshot everything.
