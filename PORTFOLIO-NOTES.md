# Portfolio credits

Two lines per client, rendered on every piece of that client's work in the
reel, under the client name:

```
CONTENT
Copper + Cloves
SARAH EDWARDS
MY PART      counter-positioning, ideation, direction, shoot, edit — all of it mine
WHAT IT DID  first video hit 22× the reach of their average post
```

Written 2026-08-09. All six clients with live media are done.

## What's written

| Client | My part | What it did |
|---|---|---|
| Copper + Cloves | counter-positioning, ideation, direction, shoot, edit | first video hit 22× their average post |
| Upsurge Labs | edit — 48 videos, 48-hour turnaround | first edit 20× their average; run averaged up to 3× |
| The Fresh Factory | concept, direction, shoot, edit | one video hit 20× their average post |
| Insanely Good Coffee | positioning, ideation, concept, edit — fully remote | 2.5–3× above their average across the set |
| Kaheen | positioning, concept, direction, shoot, edit | first reel hit 20× their average post |
| Indian Cacao Festival | content direction, on-ground coverage, edit | content that helped sell the festival out |

**uncurated.raj** is intentionally blank — role and outcome are client
language and don't apply to personal work. Those pieces carry the playground
link instead.

## Conventions in use

- **Outliers spell out what they're measured against.** "22× the reach of
  their average post", not "22× outlier". If a client ever asks "22× what?",
  the line already answers it. Keep this if you add more.
- **"counter-positioning"** on Copper + Cloves is deliberate — the strategy
  term, hyphenated so it doesn't read as a typo for "content positioning".
- **The Cacao line claims contribution, not causation** — "content that helped
  sell the festival out". Their sellout, your contribution.
- **Upsurge says 48 videos, the reel shows 12.** That's fine: the credit
  describes the engagement, the reel is a selection. If you ever want the two
  to match, send the remaining video IDs and I'll add them.
- One line each, ~90 characters max, or it wraps three deep over the video and
  starts competing with the film. All six currently sit between 31 and 70.
- Lowercase, no full stop. Use HTML entities — `&mdash;` `&times;` `&ndash;` —
  never raw unicode; `portfolio.js` has a known corruption problem with
  non-ASCII.

## Still open — the five with no media

These have no `src` on any item, so they're invisible in both portfolio views
and have no credits written:

| id | client |
|---|---|
| `fifty50-menu` | Fifty 50 |
| `christmas-cc` | Copper + Cloves — holiday campaign |
| `cc-menu` | Copper + Cloves — menu |
| `ame-pashm` | AME by Pashm |
| `cultfit-release` | Cult.fit release event |

Upload photos to Bunny, drop the URLs into their `items` arrays, and they
appear. Credits can be written at the same time — the empty `role`/`outcome`
slots are already there.

## Adding or editing a credit

`portfolio.js`, top of file. Each project carries the two fields:

```js
{
  id: 'kaheen',
  ...
  role: 'positioning, concept, direction, shoot, edit',
  outcome: 'first reel hit 20&times; the reach of their average post',
  items: [ ... ]
}
```

Empty slots render nothing at all — no placeholder, no gap. Open
`localhost:8080/portfolio.html?slots=1` to see where the empty ones sit while
you write.

For a single piece that needs its own credit, put `role`/`outcome` directly on
that item in `items: [...]` — it overrides the project-level one.
