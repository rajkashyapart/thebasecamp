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

- `2026-08-22` **"nah scrap the cyanotype idea. im not liking it."** then, handed a menu of replacements: **"i think im tryna do too much. none of this adds any value to the site."** Three passes at treating About's photographs on arrival — a faint cool wash, then a real cyanotype built off a print he sent, then that split into blue and pink baths. Every one shipped green: audit 5/5 sizes and 2/2 accents, 60fps at 4x throttle, no residue on the settled page, and each pass measurably better than the last at being what he asked for. **The work was fine and the idea was worthless, and those are unrelated facts.** All three reverted; `about.js` and `styles.css` are byte-identical to where they started.
  He then killed the follow-up too, unprompted, before anything was built. The second rejection is the more valuable one: it is not about cyanotype, it is about **decorating the photographs at all**. He had already said this once — `2026-08-10`, *"i dont like the washed look on pictures - the sizing of the main is enough of a focal point"* — and a treatment that resolves rather than persists is the same idea wearing a timer. **Don't put anything between a visitor and the photographs.** Not a wash, not a print, not a grain, not a develop.
  **Reference boards are not briefs.** He sent two Pinterest boards and said *"i like those vibes."* Reading them as a spec produces a scrapbook, which About settled against after four rebuilds, and sage green, which was retired in August. Liking a board is not asking for it on the site. Ask what job the vibe is supposed to do before proposing how to build it — and if the answer is "none", that is an answer.
  **The tell I missed:** the value question never got asked. Three builds in a row went straight from *can this be done* to *here is how I did it*, and the thing he eventually said out loud — that it adds nothing — was available before the first line of CSS. Feasibility is not a reason. When the ask is decoration on work that is already finished, the first question is what it is for.
- `2026-08-12` **"damn you turned my copy bad, it unnatural AI slop language."** Said about the Copper + Cloves study, written from a dump he'd just sent. Every fact in it was his; not one sentence was. He'd said *"her content wasnt landing as it seemed 'selfish' content to the viewer"* and I published *"talking about yourself isn't the problem — picking the parts of your own story a stranger recognises is the whole job."*
  Asked how literal "verbatim" should be, he picked the strictest of three options: **his sentences, typos fixed only.** Not "his phrases, my order" — his sentences. I may fix spelling, cut a whole line, and choose which lines survive and in what order. **I may not re-say anything in my own words.** If a fact of his has no sentence attached to it, it doesn't go on the page until he says one.
  He named the tells himself, and picked every option I offered plus one of his own — **em-dash antithesis** (*"X isn't the problem — Y is the whole job"*), **invented metaphors** (*"what gets squeezed when a kitchen needs her"* — he never said kitchen), **balanced "rather than" clauses** (*"starting conversations rather than closing sales"*), **tidy closers** (*"six years on, she is still a client"*), and **"x NOT y" sentences**. That shape is the signature. It is banned in site copy even when the sentence is true and even when it is shorter.
  He also overruled three of my cuts. I had removed *"unselfish truth the industry is scared of saying out loud"*, *"a strategy well suited for 2017, but not today"* and *"conversations among the community"* as failing Harry Dry's third test — transferable, any agency could say them. **Not my call.** They are his opinions in his voice, which is exactly what makes the page his. Run NNV and Harry Dry to decide what to *cut*, never to license a rewrite.
  **The root cause, found when he asked me to update the framework: the rule already existed and I had never read it.** `00-the-process.md` — a file CLAUDE.md never pointed at — opens with *"you never write script lines — only raj writes scripts… fabrication is forbidden — if a line is missing, you ask a question to pull it out of raj; you never supply the line yourself."* `01-donts.md` says *"don't paraphrase — write with raj's words, not about them"* and *"the moment you're tempted to write a line 'in raj's voice' — stop, and ask a question instead."* CLAUDE.md had named only `03-nnv.md` and `07-copywriting.md`, the two files that teach principles, and neither of them carries the ban. **Worse: `03-nnv.md` carried the opposite** — *"this is where fabrication earns its place… a fabricated reframe line is almost always the highest-value fabrication in the script."* The line he rejected was built exactly to that spec. His own framework contradicted itself and I was reading the half that agreed with me. Corrected in all three files 2026-08-12; `00-the-process.md` governs. When a framework of his seems to license something, check whether a file you haven't opened forbids it.
  **What actually fixed the page was questions, not writing.** Seven sentences failed both gates; none failed on language. Four were cut, and two were fixed by one question each — *what did counter-positioning her actually mean?* and *how many shoot days?* — which produced *"her truth about going vegan, her truth about diet"* and *"2 shoot days."* Intuition is for knowing what to ask, not what to write.

- `2026-08-11` **"the price slider isnt draggable."** It had been "tested" by setting the value programmatically, which never exercises a drag — the deck was capturing the pointer the moment the gesture went sideways. Anything with its own horizontal gesture (a range input, a scrolling row) has to be excluded from the deck's drag handler, and an interactive control is not tested until something has actually dragged it.

- `2026-08-11` **"cluttered on phone"** — sent as a photograph of CIAD's price screen in Safari with the headline cut off under the nav and the disqualifier running under the bar. It had been screenshotted at 390×844 and passed. **844 is the device, not the viewport.** Safari's own chrome takes ~138px of it, so a phone has about **706px** of live height — and against 706 four of the five screens overflowed, one by 153px. Never verify a phone layout at the device height again; 390×706 is the number, and 390×664 is the smaller handset.
  Two things fell out of it worth keeping. The bar was 168px — a quarter of the screen before a word of content landed — because it stacked the rail above a full-width button; one row, as on desktop, gave every screen ~90px back and fixed most of the overflow on its own. And `.od-slide` was centring its child with `align-items:center`, so anything taller than the viewport overflowed in *both* directions and its top went under the nav where no scrolling reached it — `align-items:safe center` is the fix, and it is a bug anywhere a centred flex child can outgrow its box.

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

- `2026-08-11` **CIAD stays five screens, and a graphic has to replace something.** Asked whether slides needed images or graphics, he took drawings over photographs and over video — the reels one screen later are the only photography the deck gets. The pipeline became a closed ring on "the problem" (replacing the wrapped list of six nouns) and a stationed line on "how we work" (replacing the three-item spec list, each figure moving under the station it describes). Both draw once on arrival and hold still. He also chose **not** to add a sixth screen for outliers — the figures went onto "the work", which was always the screen meant to close the headline's loop.

- `2026-08-12` **Case studies copy is his, and he rewrote it on the spot:** *"if i shoot a video of someone getting slapped on camera, it'll certainly cross 50k views. are those views worth it?"* It replaces his own earlier "i could put anyone on camera tomorrow" line and keeps the same job — arguing against the big number — but now ends on a question the six studies answer. Asked where it went, he kept "the work, in depth." as the headline and put this underneath. **He still owes the per-study copy** — *"i want to change the copy inside each page"* — so the six sections were left word-for-word and only lowercased.
- `2026-08-12` **"it's good as of now i think."** Offered four ways to rebuild the case studies list he kept the cards. Not every page needs the treatment the last one got — when he says a layout is fine, fix the faults inside it rather than replacing it.
- `2026-08-12` **He notices when the frame fights the footage.** *"video ui is horizontal. only 1 video in the entire bank is horizontal. it should adapt according to the dimensions of the videos."* A fixed aspect ratio on a media box is a decision about content you do not control; read it off the file instead. He counted the bank before saying it.
- `2026-08-12` **"The playground hero is finished / closed" is no longer true** — he reopened it himself with three faults: the page isn't centred, the headline isn't dead centre, and a card sits behind the words. All three were one bug. A "closed" verdict closes the *direction*, not the execution; it never means stop looking at it.
- `2026-08-12` **The drift stops for a picture and starts again for the writing.** His rule, verbatim: *"if the mouse/cursor hovers over a picture, it should stop. resume only after the mouse goes towards the writing area."* Note the asymmetry — leaving a photograph is not the resume signal, arriving at the words is. He thinks about where the cursor is *going*, not what it just left.
- `2026-08-12` **He asks for motion in the vaguest possible terms and means something small.** *"upon hover - idk make them nudge or something along the lines."* Offered a nudge, neighbours making room, a big grow, and a tilt, he took the 5px nudge. "Idk, something" is not licence to invent — it is him leaving the size of the gesture to you, and the answer is always the quiet one.
- `2026-08-12` **Every photograph stays; the page grows instead.** Offered four ways to make About's tiles bigger — cut sixteen of the thirty-six, narrow the writing, let the mosaic scroll, or both — he took none of the cuts: *"i do feel every picture on the page needs to stay somehow - they're a part of my brand."* Photographs are not filler to be budgeted here. When something on this page has to give, it is the layout, not the pictures.
- `2026-08-12` **He asks for playground's quality on other pages, not its scatter.** *"can we subtly do something like the playground page - idk how that'll turn out tho."* What transfers is the *mechanism* — a field of pictures you move through, bigger than the screen — not the tilt, drift or rotation, which he settled on 2026-08-10 as playground's alone. Given the choice he took the sticky-writing scroll over a draggable canvas: no hidden gesture, and nothing off-screen. "Like playground" is a question about size and movement; ask which one.
- `2026-08-12` **"on phone, about is too text heavy from the start - visitor only sees images after all the text is over."** A page whose whole argument is the photographs cannot open with three screens of prose. The hero moves into the writing under the clients line. Check the mobile *order* of a page, not just that everything is present.
- `2026-08-12` **The nav gap was still wrong after being raised once.** Third time he has flagged it. The cause was a `max-height:920px` branch quietly overriding the clamp — a 900-tall laptop, the commonest desktop there is, was taking the short-viewport value, so raising the base did nothing. When he repeats a complaint about something already "fixed", look for the override before adding more of the same.

- `2026-08-11` **Proof beats the sentence about the proof.** "the work" had five silent thumbnails under *"standing you out in a red sea…"*. Asked what pays for the outlier figures, he removed that lead. The multiples were already written in `portfolio.js` as outcome lines for the same five clients — **look there before asking him for numbers.**

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
- **The outlier multiples** — `2026-08-11`. He supplied these and confirmed they **replace** what was on the site; the old ones were single best-video spikes and two of them were far too high. ~~C+C 22×~~ → **3×**. ~~TFF 20×~~ → **up to 5×**. ~~Upsurge 20× / 3×~~ → **3–11×**. ~~Kaheen 20×~~ → **5–20×**. ~~IGC 2.5–3×~~ → **2.5×**. Indian Cacao → **5–20×**, and the festival sold out. Two site-wide facts go with them: **no ad spend**, and **almost every shot clears 2× their average**. His hedges are part of the fact — "up to 5×" never becomes "5×". The same figures live in `ciad.js`, `case-studies.js` and `portfolio.js`; move one and you move all three.

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
