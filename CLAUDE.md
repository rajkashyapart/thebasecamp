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
- **Work With Me's primary card is built, not read.** Its three facts were
  three ranges — *1–3 days / mo*, *6–20 videos*, *from ₹36,995* — which is
  three questions a visitor has to answer for themselves before the card
  means anything. Dragging answers all three at once and fills in their
  month. It is the **same object** as CIAD's price screen, not a second
  one: `hub.html` loads `ciad.js` for `OD_TIERS`, exactly as
  `case-studies.html` loads `portfolio.js` — safe because `ciadInit()`
  returns early when `#od-track` is absent. **Never copy the three
  packages into `hub.js`**; that would be a fourth place for the site to
  quote a different price. It snaps to the three for the same reason CIAD
  does. One strip of thirty here rather than CIAD's 7×5 grid, because this
  page fits one viewport exactly and the grid put it 50px over. The desc's
  *"you show up for one to three shoot days"* came off to pay for it — the
  slider says that now, precisely. The choice rides to `ciad.html?pkg=N`,
  which pre-sets the deck's tier and nothing else; the deck still opens on
  screen one, because the four screens before the price are the argument
  for it. Days are pink here, not the deck's blue: on this page blue means
  *the path you scope yourself*, which is the other card.
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
  **The multiple is drawn as well as typeset.** A tick at that client's own
  average post, and a line out to what the work did — solid for what it
  reliably did, a lighter tail for how far it went, which is how a hedge
  draws. One scale across all six rows (0–20×); a per-row scale would draw
  six identical bars and say nothing. The numbers are **parsed out of the
  same `metrics` string `csMult()` prints** — never add a parallel `bar:`
  field, that is a fourth place for the five figures to disagree. The tick
  is labelled once, on row 01, and is the legend for the five under it.
  Drawn on arrival, linear, then held, and the observer unobserves as it
  fires so it never replays on the way back up.
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

**The copy is his, verbatim. You are an editor, not a writer.**

**This rule already existed and I never read it.** On 2026-08-12 Raj rejected a
Copper + Cloves study with *"damn you turned my copy bad, it unnatural AI slop
language"* — and the ban was already sitting in his own framework, in
`00-the-process.md`: *"you never write script lines — only raj writes scripts…
fabrication is forbidden — if a line is missing, you ask a question to pull it
out of raj; you never supply the line yourself."* This file had pointed at only
`03-nnv.md` and `07-copywriting.md`, the two that teach *principles*, and never
at the two that enforce *mechanics*. **Read all four, in this order, before
writing a word of copy.** They live in
`raj's obsidian/raj/raj-uncurated/02-content/framework/` — don't ask him to
attach them.

| File | Why it matters |
|---|---|
| `00-the-process.md` | **Governing.** The pipeline and the fabrication ban. Its own opening says the rest of the framework teaches principles and this one enforces mechanics. Not optional. |
| `01-donts.md` | What kills the voice — don't paraphrase, don't complete his fragments, don't upgrade the vocabulary. Holds the vibe test. |
| `03-nnv.md` | Novel / non-obvious / tactical. The cutting gate. **Carries a flagged contradiction** at *"fabrication earns its place"* — `00` wins, and that paragraph is the one I acted on. |
| `07-copywriting.md` | Harry Dry's three tests. A cutting instrument, never a rewrite licence. |

**The pipeline applies here, with one substitution: the section is the beat.**
Dump arrives → tag every sentence → NNV pass → map the survivors onto overview /
context / insights / problem / solution / outcome → ask questions for the gaps →
never fill a gap yourself. `case-studies.js` renders nothing for an empty
string, so **an empty section is a finished state**, not a to-do.

You may: **fix typos and spelling. cut a whole line. choose which lines
survive and what order they sit in.** That is the entire permitted set.
Placement is where your judgement is actually worth something — moving
*"2 shoot days."* off the end of a section because it sat beside *"2017"* and
the two numbers read as one commenting on the other is editing. Writing a
sentence to bridge them is not.

You may not: re-say a point in your own words, merge two of his sentences
into one better one, add a connective sentence to smooth a join, complete a
fragment he left open, upgrade his vocabulary, or supply a sentence for a fact
he only listed. **A fact with no sentence attached to it does not go on the
page.** Clipping a trailing clause is **not** authorised — ask first.

**Slop is an operation, not a style.** It is what comes out when a sentence is
generated to fill an empty slot, which is why it always has the same shape.
Two tests catch it — his, and the editor-side one:

- *Would Raj say this exact sentence, these exact words, in this order, to his
  best friend over tea?* (`01-donts.md`)
- *Could I have written this sentence without his dump in front of me?* If yes,
  it is mine, and it does not ship.

The tells he named, all five of them banned even when true and even when
shorter:

| Banned shape | What it looks like |
|---|---|
| Em-dash antithesis | *"talking about yourself isn't the problem — picking the parts of your own story is the whole job"* |
| Invented metaphor | *"the page is what gets squeezed when a kitchen needs her"* — he never said kitchen |
| Balanced "rather than" | *"starting conversations rather than closing sales"* |
| Tidy closer | *"six years on, she is still a client"* — a section landing on a resolved beat instead of just stopping |
| "x NOT y" | any sentence whose engine is the correction |

Run **NNV and Harry Dry as cutting tools only.** They decide what comes out;
they never license a rewrite. Cut a line that is vague (*"she wanted to have
all things personal brand"*), or that a later line says with receipts
(*"above 10k views on each video"* against the list of six). Where step 4c of
`00-the-process.md` says a failing line should be *"sharpened"*, that never
means you sharpen it — a sharpened line you wrote is a fabricated line with a
better score.

**Harry Dry's third test does not apply to his opinions.** *"Can nobody else
say this?"* measures claims, not voice. Run it on a first-person opinion and it
fails every time, because an opinion is transferable by construction — anyone
*can* hold it — while being the least transferable thing on the page in
practice, since nobody else would bother saying it. Three of his lines were cut
on that test and he put all three back: *"a strategy well suited for 2017"*,
*"unselfish truth the industry is scared of saying out loud"*, *"conversations
among the community"*. Apply the three tests to descriptions, claims and
outcomes. Never to stance, opinion or confession — the vibe test governs those.

**When a line fails and no cut fixes it, the fact is missing, not the words.**
Seven sentences on Copper + Cloves failed both gates and not one failed on
language. Four were cut outright; two needed facts that did not exist, and one
question each produced them — what counter-positioning Sarah actually meant,
and how many shoot days. **Intuition is for knowing what to ask, not what to
write.**

Two consequences worth stating: his sentences are usually longer and looser
than the ones you'd write, and **that is correct** — the register is the
point. And a section is allowed to end mid-thought, because his dumps do.

Say less than you know. When *"pretty aesthetic cinematic videos"* appears in
the overview as what he was making for a client in 2020 and again four sections
later as the thing he rejects, **do not write the sentence connecting them.**
That sentence would be yours. The reader finding it is worth more.

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
| `hub.html` | "Work With Me" — two offers, side by side | `ciad.js` (for `OD_TIERS`) + `hub.js` |
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
