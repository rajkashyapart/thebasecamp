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
| Accent colours | 1 — except About and Work With Me, which run 2 because the split means something (blue marks the work / the path you scope; pink marks the person / the recommendation). Two accents used interchangeably are not allowed. |
| Structural spacing values | 4 tiers, well separated. Two values within 15% of each other communicate nothing and cost a decision. |
| Physical-object metaphors | 1. Hang tags, receipts, wristbands, folders — pick one. Three skeuomorphs is noise, not charm. |

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
- **Playground is the scatter page.** Tilt, drift and organic clustering belong
  there and only there — tight clusters, dramatic size variety, edge bleed, a
  clear centre. If it looks "placed" instead of "scattered", it's wrong.
  (The Emmi reference image is gone from the repo; it survives as this rule.)
- **Portfolio is a full-screen vertical reel.** Not a mosaic. No glass cursor.
- **CIAD has no dark mode**, and the playground hero is finished. Both closed.
- **Type:** tight tracking on large headings, generous line-height on body.
  Cormorant Garamond italic for display, DM Mono for everything else, Caveat for
  marks in Raj's hand. Never swap font family for emphasis mid-thought — he
  called that out by name.
- **Pages fill the viewport at any size.** No dead band under the content.

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

**No build tools, no npm, no frameworks.** Pure HTML/CSS/JS, fonts via a Google
Fonts `<link>`. Each page is a standalone HTML file with one `init*()` function
called on `DOMContentLoaded`.

| File | Purpose | JS |
|---|---|---|
| `index.html` | Video intro (Bunny HLS), redirects to playground | inline |
| `playground.html` | Photo scatter canvas — desktop pan/zoom, mobile vertical feed | `playground.js` |
| `hub.html` | "Work With Me" — two offers, side by side | `hub.js` |
| `about.html` | About | `about.js` |
| `case-studies.html` | Case studies | inline |
| `ciad.html` | Content in a Day — folders, pricing, email bar | `ciad.js` (62KB) |
| `portfolio.html` | Full-screen vertical reel | `portfolio.js` |

`styles.css` (2200+ lines) holds every page, sectioned by
`/* === SCREEN N: NAME === */`. `shared.js` only shows `#pg-nav`. Navigation is
real `<a href>` links; CSS View Transitions handle the fade. No SPA routing.

Two design systems coexist: **warm paper** (playground, hub, about, portfolio,
case studies) — `--bg-warm:#f5f2ee`, grain, editorial serif; and **iOS dark
precision** (CIAD only) — near-black, geometric sans, folder metaphor. Shared
palette in `:root`: `--accent-r:#ff7bac`, `--accent-b:#0d8aaf`,
`--accent-g:#3a8c52`. Never the old red or iOS blue.

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
