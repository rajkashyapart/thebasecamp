// taste.js -- session-start memory for this repo.
//
// Two jobs, both run on every session start:
//   1. Print TASTE.md into context, so verdicts Raj already gave are never
//      re-litigated and never re-earned.
//   2. Harvest new verdicts out of the raw transcripts into TASTE-inbox.md,
//      so the ledger grows without either of us remembering to log anything.
//
// Fails open in every error path: if anything goes wrong it prints nothing and
// exits 0. A broken memory file must never block a session from starting.

const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");

const ROOT = path.resolve(__dirname, "..");
const TASTE = path.join(ROOT, "TASTE.md");
const INBOX = path.join(ROOT, "TASTE-inbox.md");
const STATE = path.join(__dirname, ".taste-state.json");

// Claude Code sanitises the cwd into the transcript directory name by
// replacing every non-alphanumeric character with a dash.
function transcriptDir() {
  const base = path.join(os.homedir(), ".claude", "projects");
  const guess = path.join(base, ROOT.replace(/[^a-zA-Z0-9]/g, "-"));
  if (fs.existsSync(guess)) return guess;
  // Fall back to the directory holding the most .jsonl bytes.
  let best = null, bestSize = 0;
  for (const d of fs.readdirSync(base)) {
    const full = path.join(base, d);
    let size = 0;
    try {
      for (const f of fs.readdirSync(full)) {
        if (f.endsWith(".jsonl")) size += fs.statSync(path.join(full, f)).size;
      }
    } catch { continue; }
    if (size > bestSize) { bestSize = size; best = full; }
  }
  return best;
}

const REJECT = /\b(don'?t like|dont like|not liking|looks ugly|ugly|very basic|looks basic|cluttered|not looking good|shouldn'?t happen|redo|don'?t want|too much|hate)\b/i;
const APPROVE = /\b(love what|good shit|nailed it|perfect|exactly what|that'?s it|much better)\b/i;

async function harvest() {
  const dir = transcriptDir();
  if (!dir) return { added: 0, total: 0 };

  let state = { seen: [] };
  try { state = JSON.parse(fs.readFileSync(STATE, "utf8")); } catch {}
  const seen = new Set(state.seen || []);

  // Anything already quoted in the ledger counts as folded in.
  let ledger = "";
  try { ledger = fs.readFileSync(TASTE, "utf8").toLowerCase(); } catch {}

  const found = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".jsonl"))) {
    const rl = readline.createInterface({
      input: fs.createReadStream(path.join(dir, f)),
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      if (!line.trim()) continue;
      let e;
      try { e = JSON.parse(line); } catch { continue; }
      if (e.type !== "user" || e.isSidechain) continue;
      const c = e.message && e.message.content;
      let text = "";
      if (typeof c === "string") text = c;
      else if (Array.isArray(c)) {
        for (const b of c) {
          if (b.type === "tool_result") { text = ""; break; }
          if (b.type === "text") text += b.text;
        }
      }
      text = (text || "").trim().replace(/\s+/g, " ");
      if (!text || text.length > 600) continue;      // skip pasted payloads
      if (text.startsWith("<") || text.includes("<command-name>")) continue;
      if (!REJECT.test(text) && !APPROVE.test(text)) continue;

      const key = text.slice(0, 100).toLowerCase();
      if (seen.has(key)) continue;                   // already harvested
      if (ledger.includes(text.slice(0, 45).toLowerCase())) { seen.add(key); continue; }
      seen.add(key);
      found.push({
        date: (e.timestamp || "").slice(0, 10),
        kind: REJECT.test(text) ? "REJECTED" : "APPROVED",
        text,
      });
    }
  }

  if (found.length) {
    found.sort((a, b) => (a.date < b.date ? -1 : 1));
    const lines = found.map(
      (v) => `- [ ] \`${v.date}\` **${v.kind}** — "${v.text}"`
    );
    let head = "";
    if (!fs.existsSync(INBOX)) {
      head =
        "# TASTE-inbox\n\nCandidate verdicts harvested from transcripts.\n" +
        "Fold each into TASTE.md as a *rule* (not a quote dump), tick it, then delete it.\n\n";
    }
    fs.appendFileSync(INBOX, head + lines.join("\n") + "\n");
  }

  fs.writeFileSync(STATE, JSON.stringify({ seen: [...seen] }));
  return { added: found.length };
}

(async () => {
  let ledger = "";
  try { ledger = fs.readFileSync(TASTE, "utf8"); } catch { return; }

  let note = "";
  try {
    const { added } = await harvest();
    let pending = 0;
    try {
      pending = (fs.readFileSync(INBOX, "utf8").match(/^- \[ \]/gm) || []).length;
    } catch {}
    if (pending) {
      note =
        `\n\n---\n\n${pending} unfolded verdict(s) sit in TASTE-inbox.md` +
        (added ? ` (${added} new this session)` : "") +
        ". Fold them into TASTE.md as rules when there is a natural pause.";
    }
  } catch {}

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext:
          "=== TASTE.md — Raj's standing verdicts. Treat as binding; " +
          "do not re-litigate anything already settled here. ===\n\n" +
          ledger + note,
      },
    })
  );
})().catch(() => {});
