---
title: "The aggregator model"
description: "Why Kotova X compares several independent liquidity sources for every order, which sources it connects to, and exactly how one of them is chosen."
---

Kotova X has no rate of its own. Every rate you see belongs to an independent
provider that answered a question Kotova asked on your behalf. This page covers
who takes part in that comparison and what decides its outcome.

## Why aggregate

The same pair does not trade at the same price everywhere. Providers hold
different inventory, quote different spreads, and each covers a different slice of
the asset universe. The venue that is best for one pair is often not the best for
that pair at a different size an hour later.

A single venue can only give you one answer. Aggregating redoes the comparison for
every order, at your amount, in your direction — and removes any one provider as a
point of dependence.

## The liquidity sources Kotova connects to

Nine sources are integrated. Each is an independent business or protocol with its
own pricing, limits and terms.

| Source | Type |
| --- | --- |
| FixedFloat | Centralised instant swap |
| Changelly | Centralised instant swap |
| ChangeNOW | Centralised instant swap |
| SideShift | Centralised instant swap |
| StealthEX | Centralised instant swap |
| Godex | Centralised instant swap |
| Exolix | Centralised instant swap |
| CCE Cash | Centralised instant swap |
| Chainflip | Decentralised cross-chain protocol |

No source covers everything. Between them they reach hundreds of assets across
dozens of networks, but for any given pair only a subset can quote. The provider
list in the app is the authoritative view for your order;
[Liquidity sources](/how-it-works/liquidity-sources) covers each one in detail.

### Centralised instant-swap venues

Eight of the nine are centralised. They take your deposit into their own custody,
swap it, and send the output to your address. They offer both fixed and variable
rates, and they run their own compliance procedures — which also means they are
able to hold funds in specific cases. See
[Counterparty and freeze risk](/security/counterparty-risk).

### Decentralised routes

One source, Chainflip, is a protocol rather than a company. Your deposit goes to a
protocol-controlled deposit channel and no operator takes custody of it. It quotes
variable rates only, so a fixed-rate order is never routed to it.

## How a source is selected for your order

Selection runs in three phases: an eligibility filter, a ranking on the server,
and a re-ranking in your browser.

**Phase 1 — eligibility.** Before any price is requested, each source is checked
against the following. One failure and it is not asked to quote.

| Check | Shown as, if it fails |
| --- | --- |
| The source is switched on and has a working integration | Down for maintenance |
| Both assets are mapped for that source, on the exact networks you chose | Pair not supported |
| The source supports the rate type you selected | Not available for this rate type |
| The source currently allows sending your input asset and receiving your output asset | Asset unavailable |
| Your amount falls inside that source's own minimum and maximum | Below min / Above max |

**Phase 2 — the server asks everyone at once.** Every eligible source is queried
in parallel, each with a budget of roughly five seconds. Whatever has arrived by
then is ranked; a source that does not answer in time is marked as timed out and
takes no part.

**Phase 3 — your browser re-ranks.** Results stream into the page, which re-runs
the ranking over the sources you have left enabled. The provider selected in your
browser when you press confirm is the one submitted with the order. The server
checks that it is still available; it does not substitute a different one.

### Ranking parameters and their weighting

There is one ranking parameter, and it carries the entire weight.

**The amount you receive.** Quotes are ordered by the output each source offers
for your input, as that source reports it and inclusive of everything it charges.
The highest output ranks first and is preselected.

Two qualifications:

- **Direction.** If you type in the receive field rather than the send field, the
  output becomes the constant and the ranking inverts: the source needing the
  smallest input to deliver that output ranks first.
- **Ties.** When two sources return an identical amount, the tie is broken by a
  fixed display order and then alphabetically. This decides presentation only,
  never which of two unequal offers wins.

The following are **not** ranking parameters and carry no weight at all:

- what Kotova earns on an order, or which source it earns it from
- any commercial or contractual arrangement with a provider
- estimated completion time, brand, or size of the provider
- payment of any kind for placement — a provider cannot buy its position

Sources that cannot be selected — down for maintenance, out of range, or without
a quote — are grouped beneath the selectable ones in a fixed display order. That
grouping is presentational and has no influence on which source is chosen.

:::note
The eligibility checks decide who competes. They never reorder the competitors.
Ranking among eligible sources is decided by output amount alone.
:::

[Quoting and routing](/how-it-works/quoting-and-routing) covers the mechanics in
full; [Fees](/how-it-works/fees) covers what the quoted rate already includes.

### Excluding a source yourself

The preselected provider is a default, not a decision. In the provider list you
can switch any source off: it stops being eligible to win, the next best takes its
place, and the amount updates accordingly. Those choices are stored in your
browser, on your device. They are not attached to an account, do not follow you to
another browser, and are never sent to the provider you excluded.

DEX-only mode is a blunter version of the same control. Instead of naming sources
individually it removes every source able to freeze funds. Today exactly one
source qualifies — Chainflip — so switching it on narrows you to a single
provider, variable rates only, and a substantially smaller set of assets and
networks. It is off by default, and it is a preference held in your browser rather
than a routing rule enforced by the server. See
[DEX-only mode](/security/dex-only-mode).

## What happens when a source is unavailable

Unavailability is normal and is shown rather than hidden. Each row in the provider
list carries its own state: a quote, a reason it could not quote, or a maintenance
flag. Your order is never routed to a source that did not answer.

If the provider you selected goes offline between the quote and your confirmation,
the order is refused rather than placed. The app drops that source from your list
and you can retry against the next best offer.

## Independence from any single source

No single provider is structurally required. A quote round runs over whichever
sources are live at that moment, so one being unreachable narrows the field
without breaking the flow, and integrating or retiring a source changes nothing
about how you use the product.

Kotova's role ends at asking the question, ranking the answers on one criterion,
and handing your order to the source you ended up with. The provider does the
rest — including holding your funds for the duration of the swap, the subject of
[Non-custodial architecture](/introduction/non-custodial).
