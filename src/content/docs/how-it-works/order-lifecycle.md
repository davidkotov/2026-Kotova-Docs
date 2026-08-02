---
title: "The order lifecycle"
description: "What happens between confirming a quote and receiving your funds: order creation, the deposit window, confirmations, the status vocabulary, late deposits, expiry and emergency states."
---

An order on Kotova X is a record of an agreement between you and the provider
executing your swap. Kotova creates that record, shows you what the provider
reported, and keeps polling for updates. It does not move any of the funds
involved at any stage.

## Creating an order

Confirming a quote does not move money. It starts a two-step handshake.

First, Kotova reserves an order reference — a short code beginning `X-` — and
re-checks two things against the live database rather than the cached front
page: that the provider you selected is currently accepting orders, and that
your exact asset-and-network pair is listed on it. If either check fails, no
order is created and you are returned to the quote to choose another provider.

Second, Kotova asks the provider to open the swap. For most providers this
request runs in the background while you review the order, so the deposit
address is ready by the time you confirm. A few require a refund address before
they will create anything at all — Chainflip always, Changelly on fixed-rate
orders — and for those the order is created at the moment you confirm, once you
have supplied that address.

When the provider replies, the order page shows:

- the deposit address, which belongs to the provider and not to Kotova
- a deposit memo or tag, if that network needs one
- the exact amount to send
- your order link and countdown

A fresh deposit address is issued for every swap. Do not reuse one from an
earlier order.

Two safeguards apply here. Pressing confirm twice does not create two orders — a
repeated request within a short window returns the order that already exists. And
if you go back and change the amount or the assets before sending anything, the
previous order is discarded and a new reference issued.

## The deposit window

Every order carries a deadline. Kotova sets it to whichever comes sooner: sixty
minutes from creation, or the provider's own deadline.

That second half matters, because provider deadlines vary a great deal. Some
fixed-rate quotes are held for well under an hour; some
variable-rate orders stay open upstream for days. Kotova displays one consistent
window regardless — up to 60 minutes, sometimes shorter depending on the
provider — and never longer than sixty minutes even where the provider would
allow it. A short window on a rate-locked order stops the countdown promising a
rate that has already lapsed.

:::caution
Send exactly one deposit, of the exact amount shown, on the exact network shown,
including the memo if one is displayed. Multiple deposits, partial deposits and
deposits sent to an expired address may be unrecoverable.
:::

## Confirmations and execution

Once your deposit is visible on-chain, the provider waits for that network's
required number of confirmations before treating it as final. The threshold is
set by the executing provider, not by Kotova, and differs per network. Bitcoin is
typically 1–3 confirmations depending on the network and executing partner. Where
Kotova knows the provider's exact threshold, the order page shows a running
count.

After confirmation the provider performs the swap and sends the output to your
receiving address. On a fixed-rate order the amount was locked at creation; on a
variable-rate order it is determined when the swap executes, so it may differ
from the estimate you saw. See [Fees](/how-it-works/fees).

Your order page polls for updates every few seconds while it is open. A scheduled
job on Kotova's side re-polls independently every thirty minutes, so an order
still reaches its final state if you close the tab.

## Status vocabulary

| Status | What it means |
| --- | --- |
| **Initiated** | Order created. Awaiting your deposit. |
| **Received** | Deposit seen. Waiting for network confirmations. |
| **Confirmed** | Confirmations reached. The provider is performing the swap. |
| **Sending** | The provider is sending the output to your address. |
| **Complete** | The payout has been broadcast. |
| **Expired** | The deposit window elapsed without a recorded deposit. |
| **Emergency** | The provider needs a decision from you. Displayed as "Action required". |
| **Refunding** | A refund has been accepted; the return transfer is not yet on-chain. |
| **Reverted** | Funds have been returned. |

Kotova keeps the provider's own status string alongside its own, so nothing
reported upstream is lost in translation. On the order page the status only moves
forward, so a slow or out-of-order response cannot make a completed step appear
to un-happen.

## Late deposits

An elapsed countdown does not automatically mean a late deposit is lost. Kotova
keeps re-polling the provider for a period measured from when the order was
created — usually twenty-four hours, shorter on some providers and rate types. If
the provider still accepts the deposit, the order rejoins the normal path and
proceeds to completion or to a refund.

This is a recovery mechanism, not a guarantee. Whether a late deposit is honoured
is entirely the provider's decision.

## Expiry

An order shows as expired when its countdown elapsed with no confirmed deposit.
If you never sent anything, nothing further happens and nothing is owed — create
a new order at the current rate.

Kotova's expiry and the provider's expiry are separate clocks. Because Kotova
caps its own window at sixty minutes, an order can read as expired here while the
provider still considers it open. That is what the late-deposit re-polling above
exists to catch.

## Emergency states

Some providers can move an order into an exceptional state — a deposit that
arrived outside the window, an amount outside their limits, a rate that moved
beyond their tolerance, or a hold applied by their own compliance process. Your
order page will say so and, where the provider allows it, offer a choice.

What is on offer depends on the provider:

| Provider | Choice available |
| --- | --- |
| FixedFloat, ChangeNOW | Continue at the current rate, or refund |
| SideShift | Refund only |
| Changelly, StealthEX, Godex, Exolix, CCE Cash | No post-creation choice; resolved upstream |
| Chainflip | Refund conditions are set at order creation and apply automatically |

You have roughly an hour to decide, measured from when the problem was first
observed. If that window passes without a decision and a
refund address is on file, Kotova dispatches the refund on your behalf to that
address. If no refund address is on file, an order at FixedFloat is instead
continued at the current market rate rather than left stuck.

If a provider rejects the refund address you gave, it is cleared, you are asked
for another, and a fresh decision window begins. This is covered in more detail
in [Refunds, cancellations and emergencies](/how-it-works/refunds).

## Order visibility and the 90-day cutoff

Your order page is protected by the receiving address you entered when you
created the order. That address is the passcode — nothing else opens the page,
including any token issued by the provider.

Ninety days after creation, an order is archived and the page stops serving it.
The passcode is still checked first, so archive status is never revealed to
someone who cannot prove ownership of the order.

Archiving governs visibility, not retention. What Kotova stores, and for how
long, is described in [Privacy and data retention](/security/privacy).

:::tip
If you need transaction hashes or amounts for your own records, save them before
the ninety days elapse.
:::
