---
title: "DEX-only mode"
description: "Restricting routing to non-custodial venues. What it does, what it costs you, and what it does not do."
---

Most of the liquidity sources Kotova X connects to are centralised companies. In defined
circumstances they can stop processing a swap and hold the deposit until their own review
concludes. DEX-only mode removes those sources from consideration entirely, leaving only a
route where no operator has that ability.

It is off by default, and this page explains why.

:::note
In the app the setting is currently labelled **Freeze Protection**, in the **Settings**
panel under the **Security** control on the swap form. This page calls it DEX-only
mode because that describes what it does; it is the same setting either way.
:::

## What it does

With the mode on, your browser applies three filters at once:

- Every source that could hold funds is removed from the provider list — not struck
  through, removed — and from the pool competing for your order.
- Any asset or network covered only by those sources disappears from the picker, on both
  the send and the receive side.
- The provider your browser submits at confirmation can only be one that survived the
  filter.

### The property it selects for

Each connected source carries a flag for whether an operator is able to hold a deposit
mid-swap. A decentralised protocol has none. You set a refund address, a slippage
tolerance and a deadline when the order is created; if the swap cannot fill inside those
bounds, the protocol returns the deposit to your refund address on its own. There is no
desk to appeal to because there is no desk.

That is the whole of it: narrow, and architectural rather than contractual. See
[Counterparty and freeze risk](/security/counterparty-risk) for what it protects against.

## What it means today

Of the nine sources Kotova connects to, exactly one qualifies: **Chainflip**. Turning the
mode on is therefore closer to selecting a single provider than to narrowing a field.

| | Mode off | Mode on |
| --- | --- | --- |
| Sources competing | Up to nine, per pair | One, when it covers the pair |
| Rate types | Fixed and variable | Variable only |
| Coverage | Hundreds of assets across dozens of networks | A short list of major assets on a handful of networks |
| Refund address | Requested only where the provider needs one | Always required |

The asset picker is the authority on current coverage. If an asset is not there with the
mode on, no qualifying source lists it.

## What it costs you

### Assets and networks

The picker shrinks to the intersection of your pair and one provider's catalogue. Most
pairs that work normally on Kotova X do not work at all in this mode.

### The fixed rate option

The qualifying source is an automated market maker and quotes variable rates only.
Selecting a fixed rate with DEX-only mode on returns no quotes from anywhere.

:::caution
Fixed rate and DEX-only mode are mutually exclusive today. If the provider list is empty
and the exchange button is disabled, check the rate type before anything else.
:::

### The comparison itself

One quote is not a comparison. Aggregation only produces a better number when several
sources bid against each other, and this mode removes the other bidders.

It also removes them from view. Switching off a single provider leaves its row visible
with its price, so an exclusion that is costing you money stays on screen. DEX-only mode
hides those rows completely, so the amount you are giving up is not displayed anywhere.

### An extra step at checkout

A refund address is mandatory on this route, so you will always be asked for one before
the order is created.

If nothing covers your pair, the provider list comes up empty and the exchange button
stays disabled with a prompt to enable at least one source. Both that list and the asset
picker carry a one-tap link to switch the mode back off.

## Turning it on and off

1. Open the **Settings** panel from the **Security** control on the swap form, beside the
   rate type selector.
2. Toggle **Freeze Protection**.
3. Close the panel. Quotes, the provider list and the asset picker all update immediately.

The setting is stored in your browser, on the device where you set it. It survives
reloads, applies to every later quote, and propagates to your other open tabs. It is not
tied to an account, because there is no account: another browser, another device, or a
cleared browser data store all start again with the mode off.

The Settings control is hidden once an order is being created, so the mode applies to your
next order rather than one already in flight.

:::note
The shield indicator on the Settings control lights up whenever the provider handling your
current swap cannot freeze funds — whether you enabled the mode or that provider simply
won the comparison on its own.
:::

## What it does not do

- **It is not enforced by Kotova's servers.** The preference stays on your device and nothing
  server-side routes on it. Kotova still asks every eligible source for a quote; your
  browser is what discards the ones that do not qualify. An order created without the mode
  — from another device, or a link opened elsewhere — is accepted normally.
- **It does not change custody.** Kotova holds no funds in either mode. You keep control
  of your funds because they are never with Kotova. See
  [Non-custodial architecture](/introduction/non-custodial).
- **It does not remove risk, it moves it.** A decentralised route has no operator to
  freeze anything, and in exchange carries protocol, bridging and network failure that a
  centralised desk does not.
- **It does not protect the destination.** If you receive into an account at a centralised
  exchange, that operator can still freeze the funds after they arrive. The mode governs
  the route, not where the route ends.
- **It is not a compliance feature.** Kotova performs no identity checks and no sanctions
  screening in either mode. Where those checks happen, they are the connected provider's.
- **It does not protect you from your own mistakes.** A wrong address, a wrong network or
  a missing memo is unrecoverable on any route. See
  [Refunds and emergencies](/how-it-works/refunds).
- **It does not guarantee a better price.** With one source quoting instead of
  several, there is no comparison to win — and on many pairs there is no quote at all.

If your concern is a specific provider rather than centralised providers as a class,
switching that one off in the provider list is the cheaper instrument — the next-best quote
takes over and the rest of the field keeps competing. See
[Quoting and routing](/how-it-works/quoting-and-routing).
