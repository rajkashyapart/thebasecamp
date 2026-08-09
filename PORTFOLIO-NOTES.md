# Portfolio credits — fill these in

Two lines per client. They render on every piece of that client's work in the
reel, under the client name:

```
CONTENT
Copper + Cloves
SARAH EDWARDS
MY PART      strategy, shoot direction, edit
WHAT IT DID  <the outcome>
```

## Rules

- **One line each.** Roughly 90 characters max, or it wraps three deep over the
  video and starts fighting the film for attention.
- **`role` = your exact inputs.** Not "content" — the verbs. `positioning calls,
  scripting, shoot direction, edit, posting cadence`.
- **`outcome` = what it did for them.** A number if you have one. If you don't,
  a concrete qualitative result beats a vague one: "went from posting ad-hoc to
  a weekly series they still run" beats "improved their content."
- Lowercase, no full stop at the end — matches the rest of the site's voice.
- Skip a client and nothing renders for them. No broken layout, no placeholder.
  Filling them in one at a time is fine.

## Where they go

`portfolio.js`, top of the file. Each project has an empty `role` and `outcome`
waiting:

```js
{
  id: 'sarah-edwards',
  name: 'Copper + Cloves',
  ...
  role: '',      // <- your inputs
  outcome: '',   // <- what it did
  items: [ ... ]
}
```

To see the empty slots on the page while you write, open
`localhost:8080/portfolio.html?slots=1` — they show in pink. Without the flag
(i.e. for any client looking at the live site) empty slots render nothing.

If a single piece needs its own credit that differs from the client's, add
`role`/`outcome` directly to that item in `items: [...]` — it overrides the
project-level one.

## The 12 to fill

| # | id | client |
|---|---|---|
| 1 | `sarah-edwards` | Copper + Cloves — Sarah Edwards |
| 2 | `upsurge-labs` | Upsurge Labs — Sowmay Jain |
| 3 | `fresh-factory` | The Fresh Factory — Prabhjot Dhami |
| 4 | `insanely-good-coffee` | Insanely Good Coffee — Aditya Kumar |
| 5 | `kaheen` | Kaheen — Shashank Arora |
| 6 | `fifty50` | Fifty 50 |
| 7 | (holiday campaign) | Copper + Cloves |
| 8 | (menu) | Copper + Cloves |
| 9 | (cacao festival) | Patricia · Ketaki · Sneha |
| 10 | (ame) | Pashm |
| 11 | (cult.fit) | Cult.fit |
| 12 | `personal` | uncurated.raj — personal |

For #12, `role`/`outcome` don't really apply. Either leave both empty or use
`role` alone for a one-line note about the work.
