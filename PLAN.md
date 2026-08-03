# docs.kotova.io — Build Plan

**Status:** planning. Nothing is built yet; four decisions in `DECISIONS.md` gate the start.
**Date:** 2026-08-02
**Sibling repos:** `2026-Kotova-LandingPage` (static, Netlify), `2026-Kotova-Platform` (Next.js monorepo).

---

## 1. What this site is

A public product-documentation site for **Kotova X**, the live non-custodial swap
aggregator. It is the authoritative place for *how the product works*, *what it does
and does not do*, and *how to report a security issue*.

It is **not** an investor site (that is `kotova.io/investor-relations`), **not** the
legal corpus (that is `kotova.io/terms/`), and **not** a marketing page.

### Reference implementation

`docs.rango.exchange` — the site that prompted this project. The research teardown
found it runs **GitBook** (`<meta name="generator" content="GitBook">`, assets on
`static-2v.gitbook.com`, "Powered by GitBook" in the sidebar). We are not using
GitBook, but we are copying its layout geometry and search behaviour precisely,
because both are good and both are what was asked for.

---

## 2. Non-negotiable writing constraints

These come from the internal advisor pack (`Intern · Vertraulich`, Drive folder
`1TLlvwGhww…`), documents 2 and 5. They are not style preferences — several are
regulatory. **Every page on this site must obey them.**

### Never appears on this site

| Forbidden | Why |
|---|---|
| Any mention of a Kotova **token** or token sale | The token does not exist. No whitepaper, no tokenomics, no legal classification. Doc 5 rates all token content amber-to-red. |
| Revenue, volume, user or growth **figures** | Doc 5: red. Only figures already public on kotova.io may be repeated, with a date. |
| Kotova's **regulatory status** — "regulated", "licensed", "CASP", "MiCA-compliant" | Doc 5: red. Also the standing marketing guardrail. Architecture-first framing only. |
| **"Kotova Suite"** or any internal tooling | Doc 5, Kapitel 5: not to be mentioned externally at all — existence included. |
| Anything **disparaging about competitors** | Doc 5, Kapitel 8. Compounds with UWG §6 (see §7 below). |
| Price predictions, value statements, investment framing | Doc 5: red. |
| Names of staff, advisors, partners in negotiation | Doc 5, Kapitel 5. |

### Say this, not that

Lifted from Doc 2, Kapitel 7. This is the house style for the whole site.

| Not this | This | Why |
|---|---|---|
| "our exchange" | "our non-custodial aggregator" | Kotova is not a regulated exchange. |
| "we swap your coins" | "we compare the offers and route your order to the best provider" | Kotova does not execute the swap. |
| "we hold the funds briefly" | "the funds go directly to the executing provider" | There is no custody, not even momentary. |
| "Kotova is regulated / licensed" | "we are based in Germany and build for the EU framework" | Status statements come from management only. |
| "we do KYC" | "Kotova performs no identity checks itself; connected centralised providers may do so case-by-case" | The obligation sits with the partners. |
| "you can use Deal and Pay" | "Deal and Pay are on the roadmap for 2027" | Neither is available. |
| "your funds are safe" | "you keep control of your funds because they are never with us" | We give no safety guarantees. |

### Brand facts

- Product names: **Kotova X**, **Kotova Pay**, **Kotova Deal**. Never `KotovaX`, never `Kotova-X`.
- Claim: **"Trade Without Borders."** — always with the full stop.
- In body text the company is **Kotova**. Leave capitals to the design layer.
- Fonts: **Space Grotesk** headings, **Inter** body.
- Logo: no recolouring, distortion, rotation, shadow, or busy backgrounds. Lockup ≥120px, mark ≥24px. Clear space = height of the K.

---

## 3. Information architecture

Eight top-level entries. Sections the user named are marked **[named]**; everything
else is **[proposed]** and can be cut without breaking the tree. Every proposed page
is backed by existing source material (the 24 app FAQ answers, the terms corpus, or
the codebase) — nothing here is invented content.

```
Welcome                                        [named]

INTRODUCTION                                   [named — group]
  What is Kotova X
  The aggregator model
  Non-custodial architecture
  Product status and roadmap

USING KOTOVA X                                 [proposed — group]
  Your first swap
  Choosing assets and networks
  Amounts, minimums and maximums
  Fixed vs variable rate
  Choosing and excluding providers
  Addresses, memos and tags
  Sending your deposit
  Tracking your order
  Settings

HOW IT WORKS                                   [named — group]
  Quoting and routing
  The order lifecycle
  Fees
  Refunds, cancellations and emergencies
  Liquidity sources

REFERENCE                                      [proposed — group, collapsed]
  Supported assets and networks
  Order statuses
  Memos and tags by network
  Limits and fees
  Glossary

SECURITY AND TRUST                             [named — group]
  Security overview                            [named]
  Counterparty and freeze risk
  DEX-only mode (currently "Freeze Protection")
  Privacy and data retention
  Bug bounty and vulnerability disclosure      [named]

KOTOVA VS COMPETITORS                          [named — single page]

HELP                                           [proposed — group]
  Troubleshooting
  Contact support

EXTERNAL LINKS                                 [proposed — group]
  Launch app        → app.kotova.io
  Terms of Service  → kotova.io/terms/
  Privacy Policy    → kotova.io/terms/privacy
  Brand assets      → kotova.io/press/brand-assets
```

Three of the six named sections are too large to be single pages once the FAQ
material, the security audit and the user-guide walkthrough are folded in — they
become groups. **"How to use it" is deliberately split from "how it works"**: merged,
they produce pages that are simultaneously too shallow for integrators and too dense
for a first-time user.

Per-page H2/H3 outlines — which drive the "On this page" rail — live in `IA.md`.

### Deliberately excluded

- **No API section** until an OpenAPI spec exists.
- **No Kotova Pay / Kotova Deal sections.** Their FAQ answers describe unbuilt architecture that will change. One status page under Introduction instead.
- **No affiliate section** in v1 — different audience.

---

## 4. Layout and chrome

### Geometry (from the Rango teardown, verified against its compiled CSS)

| Element | Value |
|---|---|
| Outer shell | `max-width: 1440px`, page padding 16 / 24 / 32px at sm / md |
| Left sidebar | 288px + 48px gutter, sticky full-height |
| Content column | 768px default; 1152px "wide" escape hatch per page |
| Right rail | 256px |
| Header | 64px, sticky, translucent + backdrop blur, 1px hairline shadow |

Two responsive breaks, not one: below **1024px** the left nav becomes an off-canvas
drawer; below **1280px** the right rail becomes a right-side drawer opened by an
inline "On this page" button.

### "On this page" rail

Lists **h2 and h3** (h3 indented 12px and dimmed). Scroll-spy via
`IntersectionObserver` with `rootMargin: '-64px 0px -40% 0px'`, `threshold: 0.9`;
first intersecting id in document order wins. The rail auto-scrolls itself to keep
the active entry in view. Heading anchors get `scroll-margin-top: 64px`.

### Navbar

Copied from `2026-Kotova-LandingPage/services.html`, with these changes:

- Brand suffix **`IT` → `DOCS`**
- **"Services" link removed**
- **Currency selector removed** — it would be cross-origin to the landing site's Netlify function and there are no prices on a docs page
- **Search added**, at the left end of the right-aligned group, before "Contact"

- **"Contact" → "Support"**, pointing at `app.kotova.io/support`
- **Bar height matched to the rest of the estate.** Measured live: kotova.io/services
  is 77px and app.kotova.io is 78px (16px padding + the 44px panther + a 1px
  hairline). `--docs-header-h` is 77px; Starlight's default was 56px.

Resulting order, left to right:

```
[panther] KOTOVA DOCS        [ 🔍 Search  ⌘K ]        Support | 🌐 [Launch App] [🇺🇸 EN ▾]
```

The search bar is **centred on the bar itself**, not merely placed between the two
groups. `.kt-nav` is a three-column grid (`1fr minmax(0,26rem) 1fr`): the side tracks
are equal by definition, so the middle column lands on true centre whatever the brand
and controls happen to measure. Below 1150px and again below 960px the centre column
narrows, because a grid track cannot shrink below its content's own width and the
brand would otherwise push the field off centre.

**Language switcher** replicates kotova.io exactly — flag plus uppercase code when
closed, flag plus full language name plus a tick when open. Starlight's native
`<select>` is overridden; locale paths are derived by swapping the first path segment.

**Search is an inline combobox, not a modal.** Starlight's default opens a `<dialog>`
over a dimmed page; this drops a panel directly beneath the field, anchored to it.
It calls the Pagefind JS API directly.

**Inherited bug to fix, not copy:** the landing navbar has *no mobile navigation* —
at ≤1024px `.nav-links { display: none }` with no hamburger replacement. The docs
site needs a real mobile menu.

### Search behaviour

Modelled on Rango's, which fires two sources in parallel (a preloaded site index for
instant title matches, plus full-text) at a 200ms debounce.

- **Flat rows**, one per page — not grouped. Each row: breadcrumb → **bold title** → one-line best-matching section snippet.
- Matched terms highlighted with a **filled gold chip** (`background: var(--color-secondary); color: var(--color-on-gold); padding: 2px; margin: -2px; border-radius: 2px`) — never a yellow `<mark>`.
- Query state in the URL as `?q=`, `history.replaceState`.
- Full combobox a11y: `aria-autocomplete="list"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`; results `role="listbox" aria-live="polite"`; rows `role="option"` with `aria-posinset` / `aria-setsize`; sr-only assertive result count.
- Keyboard hint footer (`↑↓ Navigate · esc Close`), hidden on touch.
- ⌘K / Ctrl-K to open.

### Footer

Byte-identical in content to the landing and platform footers, which already match
each other: four columns (brand + tagline + 4 socials, Company, Products, Legal),
then copyright and the volatility disclaimer. Source of truth:
`2026-Kotova-LandingPage/index.html` and `apps/exchange/src/components/Footer.tsx`.

One thing to flag rather than replicate blindly: the Products column links
`app.kotova.io/pay` and `app.kotova.io/deal` as if shipped, while both are 2027
roadmap items with placeholder pages.

---

## 5. Technical stack

**Recommendation: Astro + Starlight, static output, Pagefind search, dark-only,
deployed as its own Netlify site.** See `DECISIONS.md` Q1 — this is the one call I
most want confirmed before building.

Starlight is the only evaluated option that gives all four structural requirements —
grouped responsive sidebar, right-rail scroll-spy, client-side full-text search, and
Markdown-in-git — with no custom code, while leaving the theme layer fully open. That
last point decides it: Starlight's component-override model lets the existing Kotova
navbar and footer be dropped in **verbatim as `.astro` files** rather than
reimplemented, so brand fidelity is exact rather than approximated.

**Pagefind** runs automatically during `astro build`, indexes the emitted HTML,
ships a chunked index fetched on demand, builds independent per-language indexes off
`<html lang>` (Russian stemming included), costs nothing, needs no API key, and
carries no third-party badge. Algolia DocSearch's free tier explicitly excludes
projects promoting a commercial service, so approval for an exchange's docs is a real
risk.

Runners-up and why not:

| Option | Verdict |
|---|---|
| **VitePress** | Genuinely close. Rejected because its i18n has no fallback-to-default-locale — a missing German page 404s instead of serving English with a notice. Unacceptable if locales ship progressively. |
| **Docusaurus** | Ships no search at all; drags React/webpack in for a static brochure. |
| **Nextra 4** | Mandates App Router — a whole second Next app; Pagefind needs a manual postbuild step. |
| **Hand-rolled static HTML** | Maximum brand fidelity, but sidebar + scroll-spy + search + 30 pages of nav all hand-maintained. The landing repo already shows the failure mode: 17 duplicated copies of the navbar. |
| **GitBook** | What Rango runs; would deliver that UX immediately. Custom fonts need the $249/site/month tier, the Kotova navbar and footer cannot be reproduced at all, and review leaves git. |

### Ship-with-it checklist

- `.node-version` = `22` (Astro 7 needs ≥22.12).
- Copy the security-headers block from the landing `netlify.toml` — but **not** its trailing catch-all `/*` → `/404.html`, which would shadow `/pagefind/*`.
- Remove Starlight's theme selector (dark-only).
- `/llms.txt` + per-page `.md` twins advertised via `<link rel="alternate" type="text/markdown">`.
- `/.well-known/security.txt` on all three hosts.
- No emoji sidebar icons — reads as dated for a financial product.
- **Gotcha:** Starlight's search early-returns in dev. Test with `build && preview` only.

---

## 6. Brand mapping

`brand/kotova-tokens.css` holds the full token set: the `:root` block lifted verbatim
from `2026-Kotova-LandingPage/styles.css`, plus four values the brand page uses but
never tokenised (`--color-on-gold`, the two logo-backdrop stops, and `--gradient-logo`).

**Do not conflate `--gradient-primary` with `--gradient-logo`** — they are
deliberately different golds.

Accessibility fixes to make here, and worth backporting to the landing site:

- Global `:focus-visible { outline: 2px solid var(--color-secondary); outline-offset: 2px }` — the landing site has none, and inputs actively set `outline: none`.
- A `prefers-reduced-motion` block — none exists in 4,126 lines of `styles.css` despite several infinite animations.
- `::selection` styling — none exists.
- Stop using `--color-text-muted` (#5A6478, ~3.2:1) for readable copy. It fails WCAG AA and currently sits on the smallest type on the page.

---

## 7. The competitors page carries real legal risk

Flagging this early because it is the highest-risk page on the site and it was a
named requirement.

**German UWG §6** governs comparative advertising. A comparison is lawful only if it
covers products meeting the same need, compares **material, relevant, verifiable and
typical** characteristics, does not disparage, and does not cause confusion.
Anonymous comparison ("other aggregators") is *unlawful*. The advertiser carries the
full burden of proof **and an ongoing duty to keep the table current** — a stale
table becomes misleading on its own.

Compounding it: the internal compliance doc forbids speaking disparagingly about
competitors at all, and **five to nine of the obvious "competitors" are Kotova's own
contracted liquidity suppliers** (FixedFloat, Changelly, ChangeNOW, SideShift,
StealthEX, Godex, Exolix, CCE Cash, Chainflip). Putting a supplier in a competitors
column invites both a §6(2) Nr. 5 disparagement claim and partner termination.

**Recommended form:** two clearly-labelled tiers — genuine peers (Swapzone, SwapSpace,
Trocador) and adjacent categories shown for orientation (Rango, LI.FI/Jumper,
BestChange). Own liquidity partners never appear as competitors. Archived source
citations, a visible snapshot date, a stated methodology, a corrections address, and
a committed quarterly re-verification. **German counsel review before publication.**

**Separately and independently of this page:** UWG **§5b(2)** already requires
Kotova to disclose its ranking parameters and their relative weighting *from the
quote UI*, "unmittelbar und leicht zugänglich". That duty exists today. A docs page
alone does not discharge it — it needs a short in-app disclosure linking to
`How It Works → Quoting and routing`. It also doubles as a genuine differentiator.

---

## 8. Claims that must be fixed before they can be documented

The research audited the codebase against what Kotova currently publishes. **Six
existing public claims are not backed by the implementation.** A docs site restates
them on a page whose whole purpose is to be authoritative — which multiplies the
exposure rather than adding to it.

| # | Claim | Reality | Action |
|---|---|---|---|
| A1 | FAQ `x_a11` + `risk-disclosure.html:316` — an **insurance reserve** compensates users on counterparty freeze | No reserve, ledger, fund or accounting hook exists anywhere in the repo | Delete, or restate as discretionary with no entitlement. Not in docs until it exists. |
| A2 | FAQ + `privacy.html:295` — complete **deletion after 12 months** | No purge job exists. Only the 90-day `is_public` archival is implemented | Build the job or amend both surfaces (already flagged 2026-07-28) |
| A3 | `privacy.html:297` — **IPs not stored** beyond the request | `x_orders.ip_address` and `analytics_visits.ip_address` persist indefinitely | Truncate/drop, or fix the policy |
| A4 | `privacy.html §6` — sharing limited to liquidity providers + block explorers | Server-side X-Ads and Reddit conversion APIs transmit end-user IP and user-agent in plaintext plus a SHA-256 email | Add an advertising-measurement disclosure. ("No third-party tracking scripts run in the exchange app" *is* verified and safe to say.) |
| A5 | IR page — Kotova "avoids classic custody **licencing** requirements by design" | A legal conclusion about licensing; collides with the standing guardrail. The translations were already edited to drop the word — the English HTML was not | Never carries into docs. Fix the IR page too. |
| A6 | `privacy.html:327` + IR — **HSM/KMS key management**, encryption at rest, "regular security audits" | The codebase contains no wallet, no keys and no signing library at all. No audit artefact exists | Drop the HSM claim — it contradicts the *stronger, true* claim that Kotova holds no keys. Attribute at-rest encryption to the platform providers. Drop "and audits" until one is commissioned. |
| A7 | Homepage — "**sanctions screening** across connected providers" | `x_compliance_checks` exists in schema with zero call sites | Kotova performs no screening. Assign to counterparties, as `kyc.html` already correctly does. |
| A8 | IR page — "CASP" under Key Regulations, "Built around MiCA" badge | Reads as a claim of authorisation | Never reproduce on a product site. |

### Pre-launch code fixes that gate specific pages

- `/api/orders/email` UPDATEs `x_orders.email` with **no ownership proof**; `/api/orders/qr-codes` proxies to FF.io with no Kotova-side check. Until both call `authorizeOrderRead`, the Security page cannot say "every order endpoint requires ownership proof".
- **No rate limiting on passcode attempts** anywhere. Do not imply brute-force protection.
- **No CSP** on either app or the marketing site. Ship one or stay silent about browser-layer hardening.

---

## 9. Numbers that disagree with each other

Pick one canonical value per row before any page quotes it. A competitor complaint
can attack inconsistency between Kotova's *own* published figures.

| # | Figure | Conflicting values | Recommendation |
|---|---|---|---|
| B1 | Liquidity sources | IR "10 exchanges" · homepage "10+" · FAQ names **9** · adapters registered **9** · DB rows **10** (THORChain disabled, no adapter) | **Publish 9.** Do not list THORChain. |
| B2 | Assets / networks | IR "300+ assets, 60+ networks" · catalog snapshot **1,451 assets / 77 blockchains / 1,827 pairs** · German landing "300+ tokens" · homepage ambition "10,000+" | Define the counting rule (assets? asset-chain pairs? tickers?) and publish one number **with the rule stated** |
| B3 | Launch metrics | IR product card "40+ pairs" · IR roadmap, same period, "70+ assets and 10+ networks" | Pick one |
| B4 | BTC confirmations | FAQ "Bitcoin requires one confirmation" · `chain-confirmations.ts:24` says **2** on Chainflip; counts are per (counterparty, chain) | "Typically 1–3 depending on network and executing partner". Fix the FAQ in all six locales |
| B5 | Deposit window | UI/FAQ "60 minutes" · reality `LEAST(now+60min, CP deadline)` — Exolix ~25 min, Godex 30 min, SideShift up to 7 days | "Up to 60 minutes, sometimes shorter", plus the ~24h late-deposit re-poll |
| B6 | Fixed-rate deviation | FAQ "beyond ~1.2%" | Appears **nowhere in code**; it is a FixedFloat-specific policy stated as universal. Drop or attribute |
| B7 | Godex | Catalog snapshot has `is_active=false` while it is named a live partner everywhere | Verify against live Postgres before publishing the source list |
| B8 | OTC desk | IR "our **existing** high-touch trading desk", badged **Concept**, Phase 4 (2027+) · homepage "100+ OTC Partners" | Decide whether it operates today. One answer |

---

## 10. Mechanism descriptions that would be wrong if copied from marketing

| # | Common phrasing | What the code does |
|---|---|---|
| C1 | "providers that return funds instead of freezing them" (plural); "DEX-only mode" | Exactly **one** source qualifies: Chainflip. Docs must say "today that is Chainflip" and note that enabling it substantially narrows asset and rate options — which is why it is off by default |
| C2 | Implies a server-enforced routing mode | Freeze Protection is a **device-local localStorage preference**, never sent to the server. It is a UI filter |
| C3 | "the server chooses the best provider" | Two-stage. The server ranks by highest `toAmount`; **the browser re-ranks** over the user's enabled sources and the client's pick is what is posted to `/api/orders/init` |
| C4 | "one-time deposit address" | True per swap, but Chainflip deposit channels stay open 24h and can be recycled. Prefer "a fresh deposit address for every swap" |
| C5 | "no markup" | `fee_markup_fixed_bps` / `fee_markup_float_bps` are DB fields, currently 0. An admin change silently falsifies it. Word as "the quoted rate is what you get, all service charges included" |
| C6 | Order auth errors say "provide the order token **or** the recipient address" | `authorizeOrderRead` accepts **only** the recipient address. The error strings are wrong |
| C7 | Counterparty roster hardcoded in FAQ prose across 6 locales | The day THORChain goes live, "the only integrated DEX is Chainflip" is false in three answers × six locales. Render from the live catalogue, or add to the source-onboarding checklist |

Also: **English never reads `translations.json`** — `script.js:2681` returns early
when `lang === 'en'`, so the hardcoded HTML is canonical English on the landing site.
Any doc written from the JSON will not match what English visitors actually see.

---

## 11. Sequencing

1. **Shell.** DNS + repo + Netlify site + brand tokens + Header/Footer/Head overrides. Prove it with three placeholder pages.
2. **In parallel:** resolve the §8 contradictions — source-side and code-side — with legal review on A1/A2/A5/A6.
3. **v1 — 13 pages.** Welcome, Introduction (4), How It Works (5), Security overview, Troubleshooting, Contact support.
4. **Bug Bounty** ships the same day as `security@kotova.io`, its PGP key and `/.well-known/security.txt` — not before.
5. **v1.1** — Using Kotova X + Reference. Needs three missing i18n keys fixed first, because those pages need screenshots: `exchange.pasteClipboard`, `exchange.scanQrCode`, `exchange.lowLiquidityCalloutGeneric` currently render as raw dot-paths in every language.
6. **v1.2** — Kotova vs Competitors, after counsel sign-off, with archived citations and a quarterly re-verification already in the calendar.

---

## 12. Deployment

New Netlify site from repo `2026-Kotova-Docs`, custom domain `docs.kotova.io`.
**DNS does not exist yet** — `docs.kotova.io` currently returns `ENOTFOUND`.

Add a `/docs` → `https://docs.kotova.io` 301 in the landing `netlify.toml`, placed
**above** the catch-all 404 rule.

The landing repo's `netlify.toml` has no `[build]` section and ends in a forced
catch-all 404, so it cannot host a build-step site — this must be its own Netlify
site, not a path on the existing one.
