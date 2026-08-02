---
title: "Troubleshooting"
description: "Common problems with a swap — delays, lost links, wrong networks, missing memos, expired orders and late refunds — with the concrete next step for each."
---

Have three things to hand: your order code (the six characters after `X-`), the
receiving address you entered at order creation, and your deposit's transaction hash.

Kotova never holds your funds, so it cannot reverse, recall or redirect a transfer. It
can show you what the executing provider reported, and raise a case with that provider.

## My swap is taking longer than expected

Almost always this is the deposit, not the swap. The provider waits for a set number
of confirmations before treating your deposit as final, and a low fee or a congested
network delays that. Bitcoin is typically 1–3 confirmations depending on the network
and executing partner.

Look up your deposit hash in a block explorer.

- **Still unconfirmed.** Wait. If your wallet supports fee replacement, raising the
  fee is the only thing that helps.
- **Confirmed, but the order has not moved.** Contact support with the order code and
  the hash.

## I closed the browser and lost my link

Your order link is your order code, and your receiving address opens it. Search your
browser history for `X-`. On the same browser, the most recent order reopens for about
a day without asking for the address again. You do not need the tab open for the order
to progress: a scheduled job re-polls the provider independently.

Kotova does **not** send a confirmation email at order creation. Email is used for
completion, refund and action-required notices, and each links back to the order.

Failing that, contact support with the receiving address and deposit hash.

## I received a different amount than estimated

On a **variable-rate** order the rate is set when your deposit reaches the required
confirmations, not when you saw the quote, so market movement in between raises or
lowers the result. The order-time figure is an estimate.

On a **fixed-rate** order the amount is locked at creation, provided your deposit
arrives inside the window and matches the amount shown. Otherwise the provider may
recalculate at the current market rate, or refund.

Beyond the network fee on the outgoing transfer, the quoted rate is what you get —
see [Fees](/how-it-works/fees).

## I sent the wrong coin or wrong network

Act immediately, and do not send a second deposit to correct the first. The deposit
address belongs to the executing provider, so Kotova cannot reverse or redirect what
reached it. Recovery is manual, at the provider's discretion, and sometimes impossible
for an asset it does not support.

Contact the provider named on your order page, or Kotova support with the order code,
the deposit hash, and the asset and network you actually used.

## I forgot the memo or destination tag

Some networks route deposits by an identifier alongside the address — an XRP
destination tag, a Stellar or TON memo, and several others. Without it your deposit
lands in the provider's pooled address with nothing tying it to your order. It is
neither automatically lost nor automatically credited: attribution becomes manual.

Contact support straight away with the order code, the deposit hash and the exact memo
your order page shows. Do not close that page.

## I sent the wrong amount, or sent twice

**A different amount.** Most providers process the swap anyway, at the amount actually
sent, as long as it falls between the pair's minimum and maximum. Outside those bounds
the order needs a decision from you, or is refunded.

**Two deposits.** An order covers exactly one deposit; a second transfer to the same
address may not be picked up at all. Do not send a third. Contact support with both
hashes.

## My order expired before my deposit arrived

Expired means the countdown elapsed with no confirmed deposit. Kotova caps its window
at sixty minutes, so an order can read as expired here while the provider's clock runs
on.

- **You never sent anything.** Nothing is owed. Create a new order at the current rate.
- **You sent late.** Kotova keeps re-polling the provider for a period measured from
  order creation — usually around a day, shorter on some providers and rate types. If
  the provider accepts the deposit the order rejoins the normal path, but that is its
  decision.

Some providers let you choose in advance what happens if funds arrive after expiry —
continue at the current rate, or refund — on the expired order page.

## My order says action required

The provider cannot complete the swap as agreed: a late deposit, an amount outside its
limits, a rate that moved beyond its tolerance, or a hold from its own compliance
process.

Where the provider allows it, the page offers a choice — continue at the current market
rate, or refund to an address you supply. Some offer refund only, and some offer
nothing, in which case the page is informational.

You have roughly an hour to decide. If it lapses with a refund address on file, the
refund is requested for you; with none on file, one provider continues at the current
rate rather than leave the deposit stuck. See
[Refunds and emergencies](/how-it-works/refunds).

:::caution
A refund address locks once recorded, and unlocks only if the provider rejects it.
Enter it carefully.
:::

## My refund has not arrived

A refund is a second transaction made by the provider, not a reversal, and not
instant. It returns in the asset you deposited, less the network fee for sending it.

Check your order page:

- **Refunding** — the instruction was accepted; the transfer is not yet on-chain.
- **Reverted** — it has been sent. The hash is on the page; check it in an explorer.
- **A prompt for a new refund address** — the provider rejected the one you gave. It
  has been cleared, and you can enter another.

Rejections are usually an address on the wrong network: a refund travels back on the
network you deposited *from*.

## My order page will not open

In order of likelihood:

- **The address does not match.** The receiving address you entered at order creation
  is the passcode — no provider reference opens the page. Capitalisation does not
  matter; the address itself must be the one you typed.
- **The code is malformed.** An order code is `X-` followed by six characters from A–Z
  and 0–9.
- **The order is over ninety days old.** Order pages are archived after ninety days
  and stop being served. See [The order lifecycle](/how-it-works/order-lifecycle).

## Still stuck

[Contact support](/help/contact) with your order code, receiving address and
transaction hashes. Support can chase the executing provider and explain what
happened. It cannot move funds — Kotova holds none to move.
