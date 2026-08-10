# TASTE.md

Raj's verdicts, harvested from real sessions. This file is injected into context at the start of every session so that judgments already made are never re-litigated.

**Append, don't rewrite.** Every entry is dated and quotes him directly. If a new verdict contradicts an old one, add the new one and strike the old — do not silently edit history.

---

## The one rule that costs the most hours

**Ask before you build, not after he rejects.**

Across six sessions Raj typed some form of "askuserquestions" **13 times** — 18% of everything he said. In every case he was telling me to gather constraints *before* writing code. And 13 more of his messages are rejections of work I'd already built.

The loop is always identical: I build → he says "i dont like it" → he hands me the reference image or the constraint → I rebuild. He had the reference the whole time. I never asked.

So: for any open-ended visual work — a new page, a redesign, a "make it better" pass — **do not write code first.** Ask 2–4 concrete questions with AskUserQuestion, and ask for a reference image. One round of questions has repeatedly replaced three rounds of rebuilding.

Exception: a specific, bounded instruction ("make the nav bigger", "these 8 videos in this order") is not open-ended. Just do it.

---

## Rejected — do not repeat

- `2026-08-11` **"the price slider isnt draggable."** It had been "tested" by setting the value programmatically, which never exercises a drag — the deck was capturing the pointer the moment the gesture went sideways. Anything with its own horizontal gesture (a range input, a scrolling row) has to be excluded from the deck's drag handler, and an interactive control is not tested until something has actually dragged it.

- `2026-06-20` **"i asked for more space between cards and elements. NOT make them tighter."** When Raj says "breathing space", he means *bigger gaps*. Never answer a spacing complaint by tightening. He'd said "negative breathing space between elements" and I read it backwards.
- `2026-08-09` **"i dont like the font switch from dm mono to cormorant or wtv on work with me. looks ugly."** Don't swap font family for emphasis inside a page. DM Mono + Cormorant are the site's two fonts; switch only at a real structural boundary, never mid-thought.
- `2026-08-09` **"looks very very basic bro."** Tidy, evenly-spaced grids read as basic to him. His taste runs to scattered, tilted, drifting, textured — the playground canvas is the north star, not a clean bento.
- `2026-08-09` **"work with me and about. both pages are still very very cluttered."** Said after *four* separate passes, every one of which made the pages bigger. Clutter is this site's chronic failure — see the subtraction rule in CLAUDE.md.
- `2026-06-21` **"remove the gradient or shadow like thing on 'never stop playing' ... not looking good."** No soft gradient or glow behind headline type.
- `2026-08-09` **"too much negative space at the bottom. make entire thing fit screen for desktop of diff sizes."** Pages should fill the viewport at any size — don't leave a dead band under the content.
- `2026-06-25` **"the previous version ... had a 'raj' logo which has been switched to the base camp logo. shouldnt happen."** Don't silently substitute brand assets.
- `2026-06-20` **"there are 3 total dead blank cards."** Empty placeholder cards ship as bugs. Never leave a slot unfilled.
- `2026-08-10` **"i dont like the washed look on pictures — the sizing of the main is enough of a focal point."** Never dim, desaturate or scrim a photograph to make something else the focus. Size does the focusing. His photographs are the work; don't degrade them to build hierarchy.
- `2026-08-10` **"it's too close to the nav bar."** Leave real clearance under the fixed nav. A headline that starts right beneath it reads as crowded no matter how good the type is.

## Settled directions

- `2026-08-11` **CIAD's headline is a question, and he wrote it: "only some videos get outlier results. why is that?"** Offered three polished statements he rejected all of them and wrote an open loop instead. He is right — the deck then has something to answer, and the button reads *find out* rather than *next*. When he supplies a line, it goes in as typed.
- `2026-08-11` **His copy for CIAD, in his words, and it holds up:** *"keeping a page alive isn't social media marketing"*, *"we despise how most agencies go about it"*, *"pretty doesn't sell, but relevance does"*, *"the agencies actually good at social videos are working with the big brands. the basecamp exists to fill that gap"*, *"we're not in 2017"*, *"and unlimited revisions :')"*. Note the emoticon — it stays, same as About's `hi, i'm raj :')`.
- `2026-08-11` **Seven sections fold into the five stops; the day survives.** Given the choice between eight screens with the clock dropped, seven invented hours, or folding his seven sections into the existing five, he chose the fold. The metaphor outranks a one-to-one mapping of his outline.
- `2026-08-11` **CIAD runs two accents.** Blue is the craft — positioning, the pipeline, the day rail. Pink is the payoff and the person — the outlier, the thirty days, his handwriting, the one button. Asked for "colours on texts, headlines", he took the two-with-jobs option over a colour per screen.
- `2026-08-11` **"the next button isn't clearly seen."** Near-black on warm paper reads as another piece of type. Primary actions are filled pink with a lift under them, the same treatment the recommended card gets on Work With Me.
- `2026-08-11` **He wants the visitor involved, not just informed** — *"can we gamify this a bit or like somehow incorporate user inputs or something. to make them feel involved with us already?"* He liked a price slider but asked for better, and took the version where dragging fills in their own month. Interaction on this site has to say something in the page's own language; a bare calculator would not have passed.
- `2026-08-10` **CIAD is called "outlier content in a day".** His words: *"i think it should be called - OUTLIER content in a day."* The rename is on the page and on the Work With Me card.
- `2026-08-10` **CIAD is a deck, and the deck is the day.** He said he was *"tilting towards guided deck - but you could suggest something far better maybe"* and picked the version where the five screens are five moments of one day (08:00 → the month after) over a plain slideshow and over a single no-scroll screen. The form is the argument: the page compresses a day the way the product does. One button, which morphs from "next" to "book a call".
- `2026-08-10` **CIAD joins the rest of the site.** Asked whether to keep the near-black iOS system, go warm paper, or rebuild the dark around the word "outlier", he said **"match it to rest of the overall site's look"**. The dark theme, the theme toggle and the folder metaphor are gone. Don't bring them back.
- `2026-08-10` **CIAD's headline is a reframe, not an offer statement.** Given his own line and three alternates he picked *"an outlier isn't luck. it's the one that got planned."* — he asked for the options to be built by running NNV and Harry Dry rather than picking from what was already written. When he says a page's copy is heavy, run both frameworks before rewriting a line.
- `2026-08-10` **About stays editorial, not scatter.** Asked directly whether to bring back the tilt/drift or refine the current two-column page, he chose **"refine what's there"** and said *"for about keep emmi as ref"*. This supersedes the older "make it similar to playground. moving slightly. scattered." — that was said about a version of About that no longer exists. Scatter lives on the playground now. Don't re-tilt About.
- `2026-08-10` **"a team of one" belongs on About**, as a **stacked list, not chips** — he picked the plain two-column typographic list over pill-shaped tags. Copy: *"couldn't afford specialists, so i learned to be all of them."*
- `2026-08-10` **What was actually wrong with Work With Me:** he named two things — *dead space / doesn't fill the screen*, and *too plain, reads like a SaaS pricing page*. He explicitly did **not** pick "cards don't line up" or "hidden behind accordions". The accordions are fine; leave them folded.
- `2026-08-10` **About's headline is `hi, i'm raj :')`** — his words, including the emoticon. Not a rewrite of it.
- `2026-08-10` **About's focal point is one dominant photograph.** Offered a huge headline, a playlist-as-object, a merely-bigger tile, or one dominant photograph, he chose the photograph. On this site the pictures carry hierarchy; type doesn't have to shout.
- `2026-08-10` **The playlist is "beats by pink"** — his own beats — and it autoplays on first interaction rather than waiting behind a play button. His pick.
- `2026-08-10` **"keep distribution."** Rejected cutting a service line to make a budget fit. Don't buy space by deleting what he actually offers; find the room somewhere else.
- `2026-08-10` **Work With Me runs two accents on purpose** — blue on "personalised projects", pink on "content in a day". Blue marks the path you scope yourself, pink the recommendation. Same rule as About, where blue marks the work and pink the person.

## Approved — this landed

- `2026-06-20` **"love what you did!"** — resequencing the portfolio reel.
- `2026-08-09` **"playground hero is fine"**, **"ciad needs no dark mode"** — both settled. Don't reopen either.
- `2026-08-09` **"video plays on phone, yes"** — the HLS phone path works. Don't rebuild it.

## Facts he has had to correct

Cheapest things to get right, most annoying to be told twice.

- **Shoot days are 1 / 2 / 3** — `2026-08-11`: *"realistically, only foundation package is shootable in a day. from 7 to up to how ever many videos, shooting seems to take up to 3 days."* Six videos fit in one day, twelve take two, sixteen to twenty take three. ~~"one shoot day"~~ was on CIAD, Work With Me and About and was wrong on all three. The product keeps the name *outlier content in a day* — a name is not a delivery promise — but nothing on any page may claim the whole month is shot in a day. This is why CIAD's rail stopped being a clock.
- **"45+ brands trusted"** — `2026-08-09`. ~~25+~~ (his own earlier figure, `2026-06-20`) is superseded. He also flagged that this stat "is not standing out ... it's a good thing for the client to see, so somehow needs to be highlighted."
- **Education** — `2026-08-09`: Don Bosco school (2018), then Don Bosco again for humanities (finished 2020), then St Joseph's, graduated 2023.
- **Type on About** — `2026-08-09`: italic Cormorant "like the rest of the website", and "make everything lowercase".

## What he reaches for when he likes something

Named directly by him, mostly on 2026-08-09 while fixing About:

- "make it similar to playground. **moving slightly. scattered.** use blue hex as well."
- "rounded edges for the images/image cards", "make all images fit cards"
- "incorporate that **handwritten** font on a few words, use **highlighter or underline sketch** effect"
- "scrapbook meets bento box" (his phrase for the About direction)

## How he wants me to work

- `2026-06-20` **"spin up a verify agent to actually load it in a mobile viewport and screenshot."** Verify in a real viewport. Don't claim a visual fix works without looking at it.
- `2026-08-09` **"analyse what's wrong with your skills and instructions and agents."** When output is bad twice, he wants the *process* diagnosed, not another attempt.
- He pushes after most tasks and says "push" — do it without being asked twice.
- `2026-08-10` **"run necessary emil skills — also wtv needs me to invoke them, invoke them."** Second session running he has had to ask for the design skills by name. Load `emil-design-eng` unprompted on every frontend task, refinement passes included. Being told this a third time is a process failure, not a reminder.
- `2026-08-10` **He rewrites my copy back to plain.** *"taking care of mifi, watering my plants"* replaced "keeping mifi and the plants alive"; *"reading and not scrolling"* replaced "trying to finish a book without opening my phone"; *"dhiman helps me with edits"* replaced "one exception: dhiman cuts a few of the edits each month". The pattern is always the same — he strips the cleverness out. Draft plainer than feels finished.
- `2026-08-10` **He runs copy through two named frameworks that already live in his vault** — `02-content/framework/03-nnv.md` (novelty / non-obvious / tactical) and `07-copywriting.md` (Harry Dry's three tests). Read them before writing copy. Don't ask him to attach them.

---

## Inbox

New candidate verdicts harvested from recent transcripts land in `TASTE-inbox.md`. Fold them in here (edited down to a rule, not a quote dump) and clear the inbox.
