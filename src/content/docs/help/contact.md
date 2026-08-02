---
title: "Contact support"
description: "How to reach Kotova support, what to include in your message, what to expect back, and the things support genuinely cannot do."
---

Most problems with a swap are covered on [Troubleshooting](/help/troubleshooting), and
many resolve on their own once the network catches up. When that is not the case, this
page explains how to reach us and what to send so the first reply is a useful one.

## Before you contact us

Four checks that answer most questions faster than we can.

1. **Read [Troubleshooting](/help/troubleshooting).** It covers delays, a lost order
   link, a missing memo, the wrong network, an expired order, and an amount that
   differs from the estimate.
2. **Open your order page.** If it is asking you to choose between continuing and
   requesting a refund, make that choice there. Support cannot make it for you, and the
   window for it is finite. See [Refunds and emergencies](/how-it-works/refunds).
3. **Confirm your deposit on a block explorer.** If it has not confirmed yet, the order
   has not stalled — it is waiting. Congestion or a low network fee on your deposit is
   the usual cause.
4. **Check whether the executing provider is the right address for the question.** Your
   order page shows that provider's own reference for your order. You can contact them
   directly with it, or ask us and we will follow up with them on your behalf.

## What to include

Send all of this in a single message. Every item below is something we cannot look up
without you.

| Include | Why it is needed |
| --- | --- |
| **Your order ID** — the six characters after `X-` | Identifies the order. Pasting the full order link works too. |
| **The receiving address you entered** | This is the credential your order page accepts. It is how an order is matched to you. |
| **The deposit transaction hash**, and the network you sent on | Proves the deposit exists and lets us and the provider trace it. |
| **Timestamps, with your time zone** | When you sent the deposit, and when you first noticed the problem. |
| **What your order page says right now** | The status text, and any message shown with it. |
| **Anything the provider has already told you** | Saves a round trip if you have contacted them first. |

:::caution[Never send a key or a recovery phrase]
No one from Kotova will ever ask for your seed phrase, recovery phrase, private key or
wallet password — not by email, not on Telegram, not for verification, not to "restore"
an order. Anyone who asks is impersonating us.

Kotova holds no keys of its own and needs none of yours. An order ID and a receiving
address are enough to work on any order. Treat an unsolicited offer to recover your
funds for a fee as fraud, whoever appears to be sending it.
:::

## Support channels

| Channel | Use it for |
| --- | --- |
| **support@kotova.io** | General questions and anything about a specific order. |
| **help@kotova.io** | Crime-related assistance and victim support. |
| **Telegram [@kotova\_io](https://t.me/kotova_io)** | Quick questions. Same team as the email addresses. |

The [Support page in the app](https://app.kotova.io/support) lists separate addresses
for API, press, affiliate and law-enforcement matters, and data-protection requests go
to the address named in the [Privacy Policy](https://kotova.io/terms/privacy).
Those queues are slower for order problems — use `support@kotova.io` for those.

Kotova operates no telephone support and no live-chat widget. `@kotova_io` is the only
Telegram account, and it is the same handle as the official account on X. Check the
handle character by character before you reply to anyone claiming to be support.

## Response expectations

Kotova does not run a 24-hour desk and does not publish a guaranteed response time. It
is more useful to know what actually governs the speed of a reply.

- **Telegram is usually quickest** for a short question that needs no attachments.
- **Email is better for order problems**, because hashes, timestamps and screenshots
  survive the trip and there is a written record.
- **Anything needing the provider is slowest.** We can relay your case and press it, but
  the provider answers on its own timetable, through its own support or compliance
  process. Measure that in days, not minutes.

Two practical points. Sending the same question through several channels does not speed
it up — it splits the thread. And contacting support does not pause your order, extend
the deposit window, or hold a quoted rate; the order lifecycle continues on its own
clock. See [The order lifecycle](/how-it-works/order-lifecycle).

## What support cannot do

This list is not a policy choice. It follows from the architecture: your funds are never
with Kotova, so there is nothing for us to release. See
[Non-custodial architecture](/introduction/non-custodial).

- **Reverse, cancel or redirect a swap.** Once a transfer is broadcast to a blockchain it
  is final. There is no undo, at any stage, for anyone.
- **Release funds a provider is holding.** If a centralised provider has paused your
  order, only that provider can lift it. We can contact them, supply what they ask for
  and chase the case — we cannot overrule them or access the funds. See
  [Counterparty and freeze risk](/security/counterparty-risk).
- **Recover funds sent to a wrong address.** A deposit sent to an address other than the
  one on your order page, or on a network other than the one shown, is outside the order
  entirely. Nothing in the system can retrieve it.
- **Recover an omitted memo or destination tag automatically.** Where the destination is
  an exchange account, only that exchange can perform a manual recovery, at its own
  discretion, and often for a fee. Sometimes it is not possible at all.
- **Change your receiving address after the order is created.** The provider already has
  it. If it is wrong, use the refund path before your deposit is executed, if one is
  still open.
- **Make up a shortfall or improve a rate.** What you receive is set by the executing
  provider and by what actually arrived at the deposit address.
- **Perform identity checks, or lift someone else's.** Kotova runs none. Where a provider
  asks you to verify, that request and its outcome belong to them.
- **Open an order for you without the receiving address.** That address is the only
  credential the app accepts, and order pages stop opening 90 days after creation. If an
  order is approaching that mark, write to us before it passes.

Kotova also gives no investment, tax or legal advice, and takes no view on any asset.
