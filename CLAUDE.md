# CLAUDE.md — rajkashyap.studio

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

Personal portfolio for Raj Kashyap. Content strategist, photographer, creator. The site should feel like opening someone's sketchbook — warm, intentional, slightly irreverent. Not a corporation. Not a template.

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

## Always do first

1. Read `rajkashyap-studio.html` — all context is in the code.
2. Start the local server: `python3 -m http.server 8080`
3. Screenshot the current state before changing anything.

---

## Constraints

**Single HTML file.** No build tools, no npm, no frameworks. Opens by double-clicking. Fonts via Google Fonts `<link>` only. Non-negotiable.

**Validate JS after every edit:**
```bash
node -e "const fs=require('fs'),vm=require('vm'),h=fs.readFileSync('rajkashyap-studio.html','utf8'),s=[],r=/<script[^>]*>([\s\S]*?)<\/script>/gi;let m;while((m=r.exec(h))!==null)s.push(m[1]);s.forEach((x,i)=>{try{new vm.Script(x);console.log('Block '+i+': OK')}catch(e){console.log('Block '+i+': ERROR - '+e.message)}})"
```
Known corruption causes: smart quotes in strings, `/* */` comments, Unicode in comments, template literals. Use `//` comments only, `&rsquo;` for contractions.

---

## Screenshot workflow

**Always screenshot from localhost**, never `file:///`.

After every visible change:
1. Screenshot your output.
2. Compare against reference (Emmi screenshot for playground, previous state for everything else).
3. Be specific about mismatches: "cards weighted left, right side empty" not "looks off."
4. Fix and re-screenshot. Do at least 2 rounds. Stop only when no visible differences remain or Raj says so.

---

## Design north star

**Playground reference:** `ref-emmi-playground.png` in project folder. Scatter should feel organic — tight clusters, dramatic size variety, edge bleed, clear centre. If it looks "placed" instead of "scattered", it's wrong.

**Two aesthetics coexist:**
- Warm paper (playground + hub): `#f5f2ee`, grain, editorial serif, hand-placed
- iOS dark precision (CIAD): near-black, `#0a84ff` / `#ff375f` / `#30d158`, geometric sans, folder metaphor

**Raj's identity:** raj.uncurated. Intentional living, aesthetics, the gap between performing a life and living one. Audience is inward-looking creatives, not metrics chasers.

---

## The one rule

Don't create new problems while fixing old ones. If something worked before your edit, it must work after. Test everything. Screenshot everything.
