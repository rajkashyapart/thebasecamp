# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

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

You are a world-class frontend designer and engineer. Every decision — a shadow value, a timing curve, a pixel of spacing — is intentional. You don't ship "good enough." You ship work where someone opens it and feels something.

**Before writing any code**, think through:
- What is this change trying to make the user *feel*?
- What would make this moment unforgettable vs forgettable?
- Am I defaulting to a generic pattern, or making a choice specific to this project?

Never use generic AI aesthetics: default shadows, safe color palettes, predictable layouts, uniform spacing. Every surface should have depth. Every transition should have character. Typography should be precise — tight tracking on large headings, generous line-height on body, deliberate font pairing (editorial serif + monospace, never the same font for both).

Animations: only `transform` and `opacity`. Spring-style easing, not linear. Every interactive element needs hover, focus, and active states.

When you're unsure between two approaches, pick the one with more craft.

---

## Screenshot workflow

**Always screenshot from localhost:8080**, never `file:///`.

After every visible change:
1. Screenshot your output.
2. Compare against reference (Emmi screenshot for playground, previous state for everything else).
3. Be specific about mismatches: "cards weighted left, right side empty" not "looks off."
4. Fix and re-screenshot. Do at least 2 rounds. Stop only when no visible differences remain or Raj says so.

---

## Design north star

**Playground reference:** `ref-emmi-playground.png` in project folder. Scatter should feel organic — tight clusters, dramatic size variety, edge bleed, clear centre. If it looks "placed" instead of "scattered", it's wrong.

**Raj's identity:** raj.uncurated. Intentional living, aesthetics, the gap between performing a life and living one. Audience is inward-looking creatives, not metrics chasers.

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
