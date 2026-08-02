---
title: "Liquidity sources"
description: "The nine providers Kotova connects to, how a source is onboarded and monitored, which of them can freeze funds, and what happens when one goes down."
---

Kotova X connects to nine independent liquidity sources. Every swap is quoted by
several of them at once and executed by exactly one.

## What a liquidity source is

A liquidity source is an independent venue that can price a swap and then perform
it. Kotova is not one of them. It holds no inventory and takes no side of your
trade — it asks the connected sources what they would give you, ranks the answers,
and passes your order to the one you go with.

The source that wins issues the deposit address, receives your funds, performs the
swap, and pays out to your receiving address. Kotova keeps the order record and
reports its status. See [Non-custodial architecture](/introduction/non-custodial).

The app uses "source", "provider" and "counterparty" interchangeably.

## How a source is onboarded and monitored

Connecting a source is four pieces of work, none of them skipped for a partner.

1. **Policy review.** Before integration, the source's terms, refund handling and
   published AML/KYC policy are read, and linked from the
   [AML/KYC policy](https://kotova.io/terms/kyc) so you can check them yourself
   rather than taking a summary on trust.
2. **Adapter integration.** Every source is implemented behind the same interface,
   with the same four operations: list supported pairs, quote, create an order,
   report status. No source gets a privileged path through the routing code.
3. **Catalogue mapping.** Each venue names assets and networks its own way, and every
   one of those names is mapped onto Kotova's internal asset-and-network identity.
   Anything that cannot be resolved is written to a pending list for review — never
   shown to you as if it were supported.
4. **Availability sync.** A scheduled job refreshes each source's catalogue roughly
   every half hour and records, per asset and network, whether you can send that
   asset to the source and whether it can pay that asset out. The two are tracked
   separately: a venue can accept a deposit in an asset it cannot currently pay out.

Response times and error rates are recorded per source, and a source can be switched
off centrally at any time — either hidden from the list, or shown but not routable,
which is the struck-through row with a red marker.

:::note
Kotova has commercial agreements with several of these sources, and the commission
differs between them. Commission is not an input to the ranking. Quotes are ranked on
the amount you would receive, and nothing else. See
[Quoting and routing](/how-it-works/quoting-and-routing).
:::

## Source reference table

Correct as of August 2026. The live list is whatever the provider dropdown shows for
your pair; a source can be added or retired without this page changing on the same day.


| Source | Type | Rate types |
| --- | --- | --- |
| FixedFloat | Centralised | Fixed and variable |
| Changelly | Centralised | Fixed and variable |
| ChangeNOW | Centralised | Fixed and variable |
| SideShift | Centralised | Fixed and variable |
| StealthEX | Centralised | Fixed and variable |
| Godex | Centralised | Fixed and variable |
| Exolix | Centralised | Fixed and variable |
| CCE Cash | Centralised | Fixed and variable |
| Chainflip | Decentralised | Variable only |

Every centralised source takes custody of your deposit for the duration of the swap and
can hold it in the circumstances set out in
[Counterparty and freeze risk](/security/counterparty-risk). Chainflip is a protocol,
with no operator who could.

The table describes what each source is, not whether it can serve you right now.
Coverage is per asset, per network and per direction; the provider list in the app
shows the live state for the swap you are setting up.

## Centralised versus decentralised

Eight of the nine are centralised instant-swap venues. Each is a company that takes
your deposit into its own wallets, swaps on its own books, and sends the result out.
That company can require identity verification in specific cases, and can hold a
deposit while it reviews one.

One is decentralised. Chainflip is a protocol with no operator: your deposit goes to
a channel address controlled by the protocol's validator set, and the swap executes
on-chain against liquidity pools. No company is in a position to hold your funds.

Decentralised does not mean risk-free. It replaces the risk of a company holding your
funds with technical risk — thin liquidity, protocol or bridging failures, chain
outages — and on Kotova it also means variable rate only and a narrower asset list.

## Which sources can freeze funds

Any centralised source can hold or freeze a deposit — when its own risk systems flag
the transaction, when it receives a fraud report, or on a binding request from a
law-enforcement authority. Where a refund is granted it normally goes back to the
address the deposit came from, after review.

Kotova performs no screening of its own and cannot overrule a counterparty's
decision; those checks belong to the source executing your swap. What Kotova does is
show you which source will handle your order before you confirm, and let you exclude
any source you would rather not use. See
[Counterparty and freeze risk](/security/counterparty-risk).

Chainflip has no operator that could freeze anything. What it has instead is a refund
path: if the price moves beyond your tolerance, or your deadline passes, the protocol
returns the deposit to the refund address you gave. That is why it asks for one
before the swap is created.

:::caution
DEX-only mode restricts routing to sources that cannot freeze funds. Today exactly
one source qualifies — Chainflip — so turning it on narrows your options
substantially: far fewer assets and networks, variable rate only, and no fallback if
Chainflip cannot price your pair. It is a preference stored in your browser on this
device, not a server-enforced routing rule. See
[DEX-only mode](/security/dex-only-mode).
:::

## What happens when a source goes down

Sources are queried in parallel, per request, with a time budget of a few seconds
each. A source that is slow, erroring or unreachable is dropped from that round and
the others still answer. One failing venue does not hold up your quote.

Every source that did not quote is given a reason in the provider list rather than
quietly disappearing:

| Reason shown | What it means |
| --- | --- |
| Pair not supported | It does not list this asset and network in that direction |
| Rate type unsupported | It cannot do the fixed or variable rate you selected |
| Above max / below min | Your amount is outside its limits for this pair |
| Low liquidity | It quoted, but not deeply enough to fill safely |
| Unavailable in your country | It declined based on the request's origin |
| Timeout or error | It did not answer in time, or answered with an error |

If the availability sync cannot reach a source, its last known catalogue is kept
rather than its assets vanishing from the picker. A source switched off centrally
keeps its row, marked as down.

There is one more check when you create the order. If the source you picked became
unavailable in the meantime, creation is refused and that source is named, so the
next-best source can take over. No funds have moved at that point.

Once your deposit is on its way the executing source is fixed; an in-flight order
cannot be moved to another provider. See
[Refunds, cancellations and emergencies](/how-it-works/refunds).
