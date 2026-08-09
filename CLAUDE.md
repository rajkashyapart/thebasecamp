# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Always Do First
- **Ask before you build.** For any open-ended visual work — a new page, a redesign, a "make it better" pass — do not write code first. Ask 2–4 concrete questions with AskUserQuestion and ask for a reference image. Across six sessions Raj has had to type "askuserquestions" **13 times**, always meaning *gather constraints before coding*; 13 more of his messages are rejections of work already built. Building first is what turns a 30-minute change into a six-hour one. A specific bounded instruction ("make the nav bigger") is not open-ended — just do it.
- **Read `TASTE.md`.** It is his standing verdicts, injected automatically at session start by the `SessionStart` hook. Anything settled there is binding and must not be re-litigated.
- **Invoke the `emil-design-eng` skill** before writing any frontend code, every session, no exceptions. The `PreToolUse` design-gate hook reminds you on every frontend edit; it does not load the skill for you.
- **Then read "The subtraction rule" below.** Almost every skill below only knows how to *add* polish. Nothing in them will ever tell you to cut. That job is yours, and it is the job this site keeps failing.

There is no `frontend-design` skill — do not try to invoke it. Installed design skills, all at `~/.claude/skills/`:

| Skill | Reach for it when |
|---|---|
| `emil-design-eng` | Any frontend work. The default. |
| `design-motion-principles` | Auditing motion against multiple designers' perspectives |
| `review-animations` | You just wrote animation code and want it torn apart. Defaults to flagging; approval is earned — the one skill here that subtracts. |
| `apple-design` | Gesture-driven UI, springs, interruptible transitions, translucency, optical type |
| `animation-vocabulary` | You can describe a motion but don't know its name |
| `pick-ui-library` | Only when explicitly asked. Note this site has **no npm and no build step** — most of what it recommends cannot be used here. |
| `prototype` | Only when explicitly asked. Builds several genuinely different versions to flip through. |

Three more exist in `emilkowalski/skills` but are not installed, deliberately: `animate`, `improve-animations`, `find-animation-opportunities`. All three hunt for *more* things to animate. Install one only if the specific job calls for it:
```bash
npx skills@latest add emilkowalski/skills --global -a claude-code -s <name> -y
```

Personal portfolio for Raj Kashyap (rajkashyap.studio). Content strategist, photographer, creator. The site should feel like opening someone's sketchbook — warm, intentional, slightly irreverent. Not a corporation. Not a template.

---

## Development Commands

**Local server:**
```bash
python3 -m http.server 8080
```

**Validate JS in HTML files (replace FILENAME):**
```bash
node -e "const fs=require('fs'),vm=require('vm'),h=fs.readFileSync('FILENAME.html','utf8'),s=[],r=/<script[^>]*>([\s\S]*?)<\/script>/gi;let m;while((m=r.exec(h))!==null)s.push(m[1]);s.forEach((x,i)=>{try{new vm.Script(x);console.log('Block '+i+': OK')}catch(e){console.log('Block '+i+': ERROR - '+e.message)}})"
```

**Validate standalone JS files (replace FILENAME):**
```bash
node -e "const fs=require('fs'),vm=require('vm'); try{new vm.Script(fs.readFileSync('FILENAME.js','utf8'));console.log('OK')}catch(e){console.log('ERROR: '+e.message)}"
```

Run validation after every JS edit. Known corruption causes: smart quotes in strings, `/* */` comments, Unicode in comments, template literals. Use `//` comments only, `&rsquo;` for HTML contractions.

**Deployment:** Vercel (automatic on push). Edge function in `api/subscribe.js` handles email subscriptions via Resend API. Env vars: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`.

---

## Architecture

**No build tools, no npm, no frameworks.** Pure HTML/CSS/JS. Fonts via Google Fonts `<link>` only.

### Page structure — each page is a standalone HTML file:

| File | Purpose | JS |
|---|---|---|
| `index.html` | Video intro (Bunny Stream HLS) — redirects to playground.html on end | Inline only |
| `playground.html` | Photo scatter canvas — draggable photo/text cards | `playground.js` |
| `hub.html` | "Work With Me" hub — service offerings | `hub.js` |
| `about.html` | About page | `about.js` |
| `ciad.html` | Content in a Day — full product experience (folders, pricing, email bar) | `ciad.js` (62KB, largest file) |
| `portfolio.html` | Portfolio grid with category filters | `portfolio.js` |

**Shared files:**
- `styles.css` (2200+ lines) — all CSS for all pages, browser-cached
- `shared.js` — nav initialization only (shows `#pg-nav`)

### Navigation
Real `<a href>` links between pages. CSS View Transitions API (`@view-transition { navigation: auto }`) handles smooth page fades. No SPA routing, no `switchTo()`.

### CSS architecture
Single `styles.css` with section comments (`/* === SCREEN N: NAME === */`). Two design systems coexist:
- **Warm paper** (playground, hub, about, portfolio): `--bg-warm: #f5f2ee`, grain texture, editorial serif (Cormorant Garamond), hand-placed feel
- **iOS dark precision** (CIAD): near-black bg, accent colors `#0a84ff`/`#ff375f`/`#30d158`, geometric sans, folder metaphor

CSS custom properties in `:root` define the shared palette: `--accent-r: #ff7bac`, `--accent-b: #0d8aaf`, `--accent-g: #3a8c52`.

### JS patterns
- Each page JS file exports one `init*()` function called on `DOMContentLoaded`
- ES5 `var`/`function` syntax in most files; `ciad.js` uses ES6 (`const`, template literals, arrow functions)
- `playground.js`: canvas world coordinates (`WCX=1800, WCY=1400`), photo cards array with `{x, y, w, h, rot, src}`, drag-to-pan with momentum
- `ciad.js`: SVG glyph system (`const G={...}`), HLS video gallery via Bunny CDN, folder UI, pricing tiers, email subscription bar

### External services
- **Bunny CDN** — image hosting (`picturesbyraj.b-cdn.net`) and HLS video streams (`vz-466dc643-be5.b-cdn.net`)
- **Resend** — email subscription via `api/subscribe.js` (Vercel Edge Function, CORS-locked to `rajkashyap.studio` + `localhost:8080`)
- **Google Fonts** — Cormorant Garamond, DM Mono

---

## How you work on this project

Taste direction lives in `TASTE.md` (what Raj actually said) and in `emil-design-eng` (how to execute). Neither is repeated here.

Never use generic AI aesthetics: default shadows, safe color palettes, predictable layouts, uniform spacing. Typography should be precise — tight tracking on large headings, generous line-height on body, deliberate font pairing (editorial serif + monospace, never the same font for both).

**One focal point per screen.** Give it depth, weight, and character; then make everything else actively recede. Uniform emphasis is mathematically identical to no emphasis — a page where every surface has depth reads as a page where nothing does. Decoration is earned by one element at a time, not distributed evenly.

Animations: only `transform` and `opacity`. Spring-style easing, not linear. Every interactive element needs hover, focus, and active states.

When you're unsure between two approaches, pick the one with more craft — and note that removing something is usually the higher-craft option. More stuff is not more craft.

---

## The subtraction rule

This site's recurring failure is accumulation. Four separate passes were made at Work With Me and About — copy passes, type passes, motion passes — and every single one made the page *bigger*. `hub.html` went 8.6KB → 13.9KB in a commit whose message was "hub clarity." Clutter never arrives in one bad decision; it arrives as twenty reasonable additions with nothing ever removed.

So:

- **Every design commit must name what it removes.** If a change adds a block, a type size, a color, or a metaphor and removes nothing, justify it explicitly or don't ship it.
- **Say each fact once.** Before adding a stat, claim, or credential, grep for it. "Word of mouth" was on About four times; the work history was listed twice under two headings that both said EXPERIENCE.
- **Never ship a placeholder.** No `[bracketed template text]` reaches a committed file. Delete the section or fill it.
- **One physical-object metaphor per page.** Hang tags, receipts, wristbands, folders, barcodes — pick one. Three competing skeuomorphs is not charm, it's noise.
- **Ornament is not hierarchy.** If you're reaching for a divider, rule, label, or chapter break to show structure, the spacing is wrong. Fix the spacing and delete the ornament.

### Hard budgets (per page)

| Budget | Limit |
|---|---|
| Distinct font sizes | 5 |
| Accent colors | 1, with a stated job — **except About**, which runs pink *and* blue on purpose: blue marks the work, pink marks the person. Two accents are fine when the split carries meaning; two accents used interchangeably are not. |
| Spacing values | 3 tiers only: `8px` inside a unit, `32px` between units, `128px` between sections |
| Physical-object metaphors | 1 |

Nothing between the spacing tiers. The whole point is that the jump from 32 to 128 is what tells the eye a new section began. An 11-value scale running 2px→36px (what About had) communicates nothing.

**Proximity beats decoration.** The gap *between* two things must always exceed the padding *inside* them. Hub violated this — 16px between the two offer cards, 26px of padding within each — so the two choices visually fused into one blob.

**About is the scatter page.** It deliberately breaks the tidy-grid instinct: every cell carries its own `--rot`, a stagger margin, and its own drift animation on its own clock, matching the playground canvas. Don't straighten it. Do keep the tilt and drift off below 640px — at one column wide they read as broken alignment and jitter respectively.

**Comparison requires adjacency.** If a page asks the user to choose between options, those options must be visible simultaneously. Stacked vertically, they can't be compared, only remembered.

---

## Screenshot workflow

**Always screenshot from localhost:8080**, never `file:///`.

After every visible change:
1. Screenshot your output.
2. Compare against reference (Emmi screenshot for playground, previous state for everything else).
3. Be specific about mismatches: "cards weighted left, right side empty" not "looks off."
4. **Run the squint test** (below). A diff against the previous state only catches regressions — it can never catch clutter, because clutter arrives a little at a time and every individual step looks fine.
5. Fix and re-screenshot. Do at least 2 rounds. Stop only when no visible differences remain or Raj says so.

### The squint test

Blur the screenshot until text is illegible. Then ask:
- **How many things still compete for attention?** More than 3 = fail. Cut or demote until 3.
- **Where does the eye land first?** If the answer is "nowhere in particular" or "the decoration," the hierarchy is broken.
- **Can you see the page's structure with the text gone?** If sections are only distinguishable by their labels, the spacing isn't doing its job.

Also verify with measurement, not vibes — count computed values in the real browser, since CSS source undercounts what actually renders:

```bash
node -e "..." # or playwright: getComputedStyle over every text-bearing element,
              # collect distinct fontSize + color. Compare against the hard budgets above.
```

Check both 1440px and 390px wide. Note that pages using `.screen` are internally-scrolling containers, so `fullPage` screenshots capture only the first viewport — scroll the container in steps (which also triggers the IntersectionObserver reveals) and capture slices.

---

## Design north star

**Playground reference:** `ref-emmi-playground.png` in project folder. Scatter should feel organic — tight clusters, dramatic size variety, edge bleed, clear centre. If it looks "placed" instead of "scattered", it's wrong.

**Raj's identity:** uncurated.raj. Intentional living, aesthetics, the gap between performing a life and living one. Audience is inward-looking creatives, not metrics chasers.

---

## Do not recreate

The following were intentionally removed to reduce token/context bloat. Do not reinstall or recreate them:
- **claude-flow / ruflo** — `.claude-flow/`, `.mcp.json`, and all MCP swarm/agent/memory tools. Not needed for a static portfolio.
- **`.claude/agents/`, `commands/`, `skills/`, `helpers/`** — 260+ files for distributed systems, swarm coordination, daemon management, etc. All irrelevant.
- **Hooks in `settings.json`** — all hooks referenced deleted helper scripts. Settings is now permissions + attribution only.
- **`portfolio-brief.md`, `prelaunch-brief.md`** — planning docs, work is done.

Design skills (`emil-design-eng`, `design-motion-principles`) are installed **globally** at `~/.claude/skills/` and remain available.

---

## The one rule

Don't create new problems while fixing old ones. If something worked before your edit, it must work after. Test everything. Screenshot everything.
