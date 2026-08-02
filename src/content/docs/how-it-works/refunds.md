---
title: "Refunds, cancellations and emergencies"
description: "When a refund is possible, how refund addresses work at each provider, and what happens when a swap cannot be completed."
---

Most swaps complete without any decision from you. This page covers the ones that do
not: what can still be undone, what cannot, and what the executing provider does if
you are not there to answer.

## Swaps are irreversible once broadcast

A crypto transfer is not a card payment. Once your deposit is broadcast to a
blockchain it cannot be recalled, by the provider or by anyone else. Kotova cannot
intervene at all, because your funds are never with Kotova — see
[Non-custodial architecture](/introduction/non-custodial).

There is also no cancel button on an order. Cancelling would mean moving funds, and
Kotova cannot move funds. Before you have deposited there is nothing to cancel: let
the order expire and create a new one. Afterwards the question is not cancellation but
refund — and a refund is not a reversal. It is a second transaction, made by the
provider, returning the deposited asset to an address you supply.

## When a refund is possible

The provider executing your order decides this, not Kotova. In practice a refund
arises when the swap cannot be carried out as agreed:

- Your deposit arrives after the deposit window has closed.
- A fixed rate can no longer be honoured because the market moved before your deposit
  confirmed.
- The amount you sent falls below the minimum or above the maximum for the pair.
- The provider cannot route the swap — a liquidity failure, or a destination asset
  that has become temporarily unavailable.
- The provider held the order for a review that ends in a return rather than a swap.

An order that has already executed is final. Refunds come back in the asset you
deposited, less the network fee for sending it, so slightly less arrives than you
sent. See [Fees](/how-it-works/fees).

## Refund addresses

A refund address is an address on the network you are sending **from** — where the
deposit returns if the swap cannot be completed. It is separate from the receiving
address the swapped asset goes to.

### When one is required

For most orders it is optional. Two cases make it mandatory before the order can be
created: Chainflip always requires one, and Changelly requires one for fixed-rate
orders. You can also make the app ask every time, using the "Set refund address before
swap" setting, which is stored in your browser rather than on Kotova's servers.

:::note
It is worth the extra field. If a swap fails and no refund destination is on file,
your options narrow to continuing at whatever rate the market offers, or a support
conversation.
:::

### How they differ per provider

| Provider | Refund address | If the swap cannot complete |
| --- | --- | --- |
| Chainflip | Required before the order is created; written into the swap's own parameters | Returned automatically by the protocol — no decision to make |
| Changelly | Required for fixed-rate orders, optional for variable | Changelly resolves the order |
| FixedFloat | Not accepted at creation; held by Kotova and submitted when a refund is actually requested | Continue or refund |
| ChangeNOW | Optional at creation | Continue or refund, where ChangeNOW has enabled those actions for the order |
| SideShift | Optional at creation | Refund only |
| StealthEX, Godex, Exolix | Optional at creation | Refunded to the address on file, otherwise resolved through support |
| CCE Cash | Not collected by Kotova | Resolved on CCE Cash's side |

### The address locks once set

Once a refund address is recorded on your order, a different address cannot replace
it. Re-submitting the same address is allowed. It becomes editable again only after
the provider rejects the one on file. This is deliberate: it means anyone who reaches
your order page cannot redirect a pending refund to a wallet of their own.

## Emergency choices: continue or refund

When a provider reports that it cannot complete your swap, your order page moves to a
state that asks for a decision. Depending on the provider you may be offered:

- **Continue exchange** — proceed at the current market rate rather than the quoted
  one. You may receive more or less than the original estimate.
- **Request refund** — return the deposit to your refund address, less the network fee.

The choice is made on your order page, which opens with the receiving address you
entered when you created the order. Kotova passes your decision to the provider; the
provider carries it out.

Several providers offer no choice, and the page is then informational: the provider
works the order out on its own side and sends any refund to the address on file. An
order held for a compliance review shows no buttons either, because the outcome is the
provider's to determine. See
[Counterparty and freeze risk](/security/counterparty-risk).

## What happens if you do not choose

The page shows a countdown of roughly an hour, starting when the problem was first
observed. When it runs out:

- **A refund address is on file, and the provider accepts refund instructions.** A
  refund to that address is requested for you — by your browser if the tab is still
  open, otherwise by a scheduled job.
- **No refund address is on file, and the provider accepts a continue instruction.**
  The swap continues at the current market rate. With nowhere to send a refund,
  leaving the deposit untouched is the worse outcome.
- **The provider accepts neither instruction.** Nothing is dispatched; the provider
  resolves the order on its own side.

The countdown is a deadline for your decision, not for the funds to arrive. The
provider still needs its own time to send them.

## If a provider rejects your refund address

Providers validate the destination before accepting it. When one is refused:

- the address is removed from your order and is not retried;
- the field unlocks so you can enter a different one;
- the countdown restarts from the rejection, giving you a fresh window to correct it;
- if you supplied an email address, some providers' rejections also trigger a message
  asking you to enter a new one.

The usual cause is an address for the wrong network. A refund travels back on the
network you deposited from, not the one you were swapping to.

## Wrong coin, wrong network, missing memo

Three mistakes put funds where Kotova has no reach at all: sending an asset other than
the one the order was created for, sending the right asset on the wrong network, and
omitting the memo or destination tag where the deposit address requires one, so the
deposit arrives unattributed.

Kotova cannot reverse, recall or redirect any of these. Recovery, where it is possible
at all, is manual and at the executing provider's discretion, and some cases cannot be
recovered. Contact the provider directly, or contact Kotova support with your order
reference and the transaction hash and Kotova support will raise it with the provider on your behalf. See
[Contact support](/help/contact) and [Troubleshooting](/help/troubleshooting).

:::caution
Send exactly one deposit, of the amount shown, on the network shown, including the
memo if one is displayed. Those details are checked by the provider's systems, not by
Kotova, and a mistake in any of them is not reversible.
:::
