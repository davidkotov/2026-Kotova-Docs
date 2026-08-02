# Open decisions

Ranked by how much each blocks the build. Update this file as answers land.

---

## Blocking — nothing can be built until answered

### Q1 — Tech stack
**DECIDED 2026-08-02: Astro + Starlight + Pagefind.** Reasoning in `PLAN.md` §5.
Static output, dark-only, own Netlify site. Navbar and footer land as `.astro`
component overrides so the existing Kotova markup is reused verbatim.
**Status:** ✅ **decided**

### Q2 — DNS and deployment target
`docs.kotova.io` does not resolve today (`ENOTFOUND`). Needs a DNS record and a new
Netlify site. The landing repo's `netlify.toml` has no `[build]` section and ends in
a forced catch-all 404, so it cannot host this.
**Blocks:** deployment, but not local development.
**Status:** _open_

### Q3 — Language scope at launch
**DECIDED 2026-08-02: English only, locale structure wired from day one.**
`defaultLocale: 'root'` with all six locale entries configured and no content in
them. Starlight falls back to English with a notice for missing pages, so the
language switcher stays honest and translations land incrementally.
**Status:** ✅ **decided**

### Q4 — Legal sign-off on unbacked claims
The six items in `PLAN.md` §8 (A1, A2, A3/A4, A5, A6, A7). These are "fix the source
or fix the code" problems, not docs-writing problems. A documentation site that
contradicts the privacy policy is worse than no documentation site.
**Blocks:** Security overview, Privacy and data retention, Introduction → Non-custodial
architecture. Arguably the whole launch.
**Status:** _open_

---

## Pre-launch gates found by the content audit (2026-08-02)

The 17 pages are written. These must be closed **before the site is made public**;
none of them blocks further building.

### G1 — Verify Godex is live, against production Postgres
`catalog-snapshot.json` (exported 2026-07-09) lists ten sources with no `is_active`
column, so the repo cannot answer this. Godex appears in the source table on
`/how-it-works/liquidity-sources` and in the nine-source count used across five pages.
If it is inactive, the count and every list is wrong at once. See Q8 / PLAN §9 B7.

### G2 — Bug bounty cannot go public until its contact route exists
`/security/bug-bounty` is written and carries a `:::caution` saying the programme is not
open. It must not lose that banner until **all** of: `security@kotova.io` exists and is
rostered; a PGP key is published; `/.well-known/security.txt` is live on every in-scope
host; and the safe-harbour undertaking names an entity (Q6.2). The page deliberately does
not name `broker.kotova.io` — Q6.4 is still open and naming a fund-holding host on a page
inviting attack traffic would be the wrong way to resolve it.

### G3 — Asset and network counts are still unstated
Three pages say "hundreds of assets across dozens of networks" because Q8/B2 is open.
The snapshot says 1,451 assets / 77 blockchains / 1,827 asset-chain pairs, so the current
wording is materially *understated*. Decide the counting rule, then state one number with
the rule and a date beside it.

### G4 — Two claims the docs deliberately route around
`/security/privacy` points at the Privacy Policy for retention periods rather than
restating the 12-month deletion or the 48-hour erasure window, because neither is
implemented (PLAN §8 A2). `/security/overview` says nothing about CSP or passcode
rate-limiting, because neither exists. If Q4 closes by *fixing the code*, both pages can
be strengthened. If it closes by amending the policy, both stay as they are.

### G5 — Counsel review of the per-provider material
The freeze-capability tables were collapsed from per-provider rows to an architectural
split (centralised vs Chainflip), which removes the comparative-table exposure at no
information cost. What remains — naming all nine suppliers, and describing what
centralised custody means — should still go past the same counsel review as the
competitors page (PLAN §7).

### G6 — Keep the source roster in sync
The nine-source list is now hardcoded prose in the app FAQ (six locales), on
`/how-it-works/liquidity-sources` and on `/security/counterparty-risk`. Add all three to
the source-onboarding checklist.

---

## High — blocks a named section

### Q5 — Navbar search placement
The brief said the search bar sits "on the left of Services", but Services is being
removed. Current reading, to confirm or correct:

```
[panther] KOTOVA DOCS       [search…  ⌘K]  Contact  |  🌐  [Launch App]  [🇺🇸 EN ▾]
```

**Status:** _open_

### Q6 — Bug bounty: four sub-decisions, all needed together
1. **Reward budget — DECIDED 2026-08-02: published table.**
   Critical €1,000–2,500 / High €300–750 / Medium €100–250 / Low recognition.
   ⚠️ This is a public commitment that cannot be walked back. Confirm the budget is
   actually available before the page ships.
2. **Which legal entity makes the no-legal-action promise.** Public copy names no
   legal form. A safe-harbour undertaking from an unnamed party is weak.
3. **Who owns `security@kotova.io`, holds the PGP key, and is rostered against the
   SLA.** Suggested: acknowledge in 3 business days, triage in 10, Critical
   remediation 7 days, 90-day coordinated disclosure. A missed *published* SLA is
   worse than no SLA. Note: no `security@` mailbox exists today.
4. **Is `broker.kotova.io` in scope?** It is Kotova-operated infrastructure running a
   chainflip-node with an SS58 account holding withdrawable fees. Including it invites
   testing against a production node; excluding it leaves a genuine fund-holding asset
   unexamined.

Also: self-host (recommended for v1) versus a platform — HackerOne VDPs start around
$8–12k/yr.
**Blocks:** the entire Bug Bounty page. Sub-decision 1 is settled; 2, 3 and 4 remain.
**Status:** 🟡 **partly decided** — reward model set, entity / mailbox / broker scope open

### Q7 — Does "Kotova vs Competitors" ship, and in what form?
**DECIDED 2026-08-02: ships in v1.2, named and counsel-reviewed.** Two tiers —
genuine peers (Swapzone, SwapSpace, Trocador) and adjacent categories for orientation
(Rango, LI.FI/Jumper, BestChange). Kotova's own liquidity partners never appear as
competitors. Requires archived source citations, a visible snapshot date, a stated
methodology, a corrections address, a committed quarterly re-verification, and German
Wettbewerbsrecht sign-off **before** publication.
**Still needed:** counsel engaged; a calendar entry for the re-verification cadence
created at the same time the page ships.
**Status:** ✅ **decided** (execution gated on counsel)

### Q8 — Canonical numbers
Source count, asset/network count *with a documented counting rule*, launch metrics,
Godex's live status. Table in `PLAN.md` §9.
Cheap to decide, expensive to get wrong — a competitor complaint can attack
inconsistency between Kotova's own published figures.
**Blocks:** Welcome, Introduction, Liquidity sources, Competitors.
**Status:** _open_

### Q9 — Rename "Freeze Protection" to "DEX-only mode"?
**Recommendation: rename.** "Freeze Protection" promises an outcome Kotova cannot
guarantee about third parties; the plural copy overstates a one-source pool
(Chainflip only); `noFreeze` is a manually-set admin flag with no verification
pipeline. "DEX-only mode" is accurate and defensible.

The app FAQ resolves the name at runtime via a `{brand}` placeholder, so a rename
updates the app automatically — but would silently desync any docs page that
hardcodes it. `IA.md` currently assumes the rename.
**Blocks:** three pages.
**Status:** _open_

---

## Medium — shapes the content plan and ongoing maintenance

### Q10 — Does the app FAQ shrink to summaries with deep links?
**Recommendation: shrink.** Make docs authoritative for policy prose; reduce each FAQ
answer to two sentences plus a deep link. Otherwise the same claim is maintained on
four surfaces in six locales. This is app-side work to schedule *alongside* the docs
launch, not after.

### Q11 — Where does the UWG §5b(2) ranking disclosure live?
A statutory duty **from the quote UI**, "unmittelbar und leicht zugänglich" — a docs
page alone does not discharge it. Recommendation: a short in-app disclosure linking to
`How It Works → Quoting and routing → Ranking parameters`. Doubles as a genuine
transparency differentiator. **This duty exists today, page or no page.**

### Q12 — Analytics
Reuse the existing Umami website-id so docs traffic pools with kotova.io, or mint a
second property. Recommendation: second — docs engagement and marketing engagement
answer different questions. Also decide whether search-query telemetry is collected;
zero-result queries are the single highest-value docs signal available.

### Q13 — Company legal form in docs copy
The advisor pack states **Kotova GmbH, founded 2025**, and gives the Hamburg address.
Standing guidance is that public copy names no legal form at all, and the pack itself
notes the Imprint shows no Handelsregister number yet. Which applies on docs?

---

## Low — deferrable without rework

### Q14 — Content max-width escape hatch
Adopt a per-page wide layout (1152px) for tables and JSON, or force 768px with
horizontal-scroll containers. Recommendation: adopt, declared in frontmatter.

### Q15 — Sidebar default state
All groups expanded except Reference. Persist open/closed in localStorage once the
tree exceeds ~35 pages.

### Q16 — Does `/terms/` migrate into docs later?
It is already sidebar-shaped and would gain scroll-spy and search for free, but
carries legal review and a separate 788 KB translation blob. Decide **after** the docs
site ships. Do not bundle.

### Q17 — Will there be an OpenAPI spec?
If yes, `starlight-openapi` generates the entire API section from it.

### Q18 — Who authors the docs?
If only engineers write them, Markdown-in-git is strictly better. **If a future
non-technical support hire must publish without a PR, that single fact flips Q1
toward a hosted service** despite the brand-fidelity loss. Cheap to confirm now.

### Q19 — Hall of fame policy
Opt-in or opt-out, pseudonyms accepted, anonymous credit offered. Decide before the
first valid report, not after.
