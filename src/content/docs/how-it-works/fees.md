---
title: "Fees"
description: "What the displayed rate already includes, which network fees are separate, how Kotova earns from a swap, and what happens to fees when an order is refunded."
---

Kotova X shows one number that decides the trade: how much of the asset you want
would arrive in your wallet. Every charge the executing provider applies is
already inside that number. There is no later screen on which costs appear.

## What the displayed rate already includes

When Kotova asks the connected liquidity sources for a quote, each one answers
with the amount it would deliver to your address. That figure is already net of
what that provider charges — its own trading spread, its service fee, and the
cost of the transfer it will make to you.

Because every quote arrives net, comparing them by receive amount compares them
like for like. Whatever a provider calls its charges internally, the one offering
the highest receive amount is the cheapest for your trade. That is the ranking
rule, and it is the only one: a provider's commercial arrangement with Kotova is
not an input to it. See [Quoting and routing](/how-it-works/quoting-and-routing).

The quoted rate is what you get, all service charges included. On a fixed-rate
order the amount is locked when the order is created, provided your deposit
arrives inside the window. On a variable-rate order it is set when the swap
executes, so movement between those two moments changes what arrives. Estimates
are indicative rather than commitments.

Next to the rate type the app shows a percentage. It is the difference between
the market value of what you send and the market value of what you receive,
measured against reference prices — the whole cost of the swap expressed as one
figure, rather than any single provider's own accounting of it.

## Network fees are separate

Blockchain fees are paid to the network. They are not Kotova's, and Kotova
receives none of them. Two arise on a swap, and they are paid by different
parties.

### The fee on your deposit

Sending your funds to the deposit address is an ordinary on-chain transaction.
Your wallet sets the fee and you pay it. Kotova neither sets it nor receives it,
and cannot change it after the fact. Setting it too low is the most common reason
a swap appears stuck — the deposit sits unconfirmed and the order waits.

### The fee on the payout

The provider pays the fee for the transfer to your receiving address, and has
already accounted for it in the amount it quoted. You are not billed for it
again.

Once each transaction is on-chain, your order page shows the actual fee it cost,
in that network's own gas token with an approximate value alongside. Both figures
are read from a block explorer rather than taken from the provider's estimate, so
a genuine zero is displayed as zero rather than hidden.

Network fees are also why every pair has a minimum. Below it, the transfer costs
would consume a meaningful share of the trade.

## How Kotova earns

The quoted rate is what you get, all service charges included. Kotova's share of
an order is settled with the executing provider and is not itemised separately,
because it is not billed to you as a separate line.

The arrangement is agreed per provider and takes one of two shapes:

| Basis | How it works |
| --- | --- |
| **Revenue share** | The provider pays Kotova an agreed share of the margin it earned on your order. |
| **Volume commission** | The provider pays Kotova an agreed percentage of the amount settled. |

Chainflip is a protocol rather than a company, so the form differs while the
effect is the same: Kotova operates a broker, and the protocol deducts a broker
commission from the swap and credits it to that broker account. The commission is
part of the quote request, so the receive amount you compared already reflects
it.

In every case the amount you were quoted is the amount the provider committed to.
Kotova's share is not itemised on your order page, because it is not a separate
charge — it is part of the spread you were already comparing when you chose a
provider.

Two things follow from that. Kotova's share is only ever calculated when a swap
settles, so an order that expires or is refunded earns Kotova nothing. And it
plays no part in routing: providers are ranked purely by what reaches your
wallet, never by what Kotova earns.

## What Kotova does not add

The absence of a charge is harder to demonstrate than its presence, so it is
worth being specific.

| Not charged | Why |
| --- | --- |
| Account or registration fee | There is no account and no registration. |
| Deposit or withdrawal fee | Kotova receives no funds and sends none. See [Non-custodial architecture](/introduction/non-custodial). |
| Cancellation or expiry fee | An order whose window elapses with nothing sent costs nothing and owes nothing. |
| Subscription, tier or volume pricing | There is no rate that depends on who you are or how much you have traded. |
| Fee for restricting providers | Excluding a provider, or switching on [DEX-only mode](/security/dex-only-mode), costs nothing. It does change which quotes you see. |

One optional extra exists, and it belongs to a protocol rather than to Kotova. On
Chainflip Bitcoin deposits, Boost shortens the wait by routing through a boost
pool in exchange for a protocol fee. The quoted receive amount reflects whichever
setting is active, so you can see the cost before you commit, and the setting can
be changed before you create the order.

## Fees on refunds

When an order is refunded, the asset you deposited is returned to the refund
address you gave, minus the network fee for making that return transfer. The
provider makes that transfer, and the fee is a genuine on-chain cost that cannot
be waived by anyone.

Kotova adds nothing to a refund and takes nothing from one.

Two consequences are worth knowing before you send a small order. The return
transfer fee is a fixed cost, so on a small amount it can be a noticeable
proportion of what comes back. And a refund returns the quantity of the asset you
deposited — not its value at the moment you deposited it, and not the asset you
were trying to buy. If the market moved while the order was open, that difference
is yours.

:::caution
A completed swap cannot be refunded. Once the provider has broadcast the payout
the transfer is on a blockchain and is irreversible. Refunds apply only to orders
that have not executed. See
[Refunds, cancellations and emergencies](/how-it-works/refunds).
:::
