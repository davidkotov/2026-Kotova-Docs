---
title: "Counterparty and freeze risk"
description: "What a freeze is, who can do it, how recovery works in practice, and what you can do to reduce the chance of one."
---

Removing custody removes Kotova as a point of failure. It does not remove the provider
that executes your swap. Between the moment your deposit confirms and the moment that
provider sends the output, your funds are with them.

This is the main residual risk of using Kotova X. The rest of this page describes it
plainly rather than around it.

## What a freeze is and who can do it

A freeze is when the provider executing your swap stops processing it and holds your
deposit, instead of either completing the swap or returning the funds.

Only the party that holds the funds can do this, and that party is never Kotova. There
is no Kotova wallet in the flow and no Kotova key that could move, hold or release
anything. See [Non-custodial architecture](/introduction/non-custodial).

A freeze is therefore a decision by another company, under that company's own policies
and whatever supervision applies to it. Kotova is not consulted and cannot overrule it.

A freeze is also not the same thing as an order that says **Action required**. That
state means the provider needs a decision from you — usually because a fixed rate moved
outside its window or a deposit arrived late — and it is covered in
[Refunds and emergencies](/how-it-works/refunds). A compliance hold usually has no
distinct status at all: the order simply stops progressing after your deposit confirms.

## Why a provider might hold funds

Centralised providers run their own risk and anti-money-laundering systems. They
generally reserve the right to suspend a transaction where:

- an automated risk system scores the transaction or one of its addresses as suspicious;
- a third party files a fraud report against an address involved;
- a sending or receiving address matches an international sanctions list;
- evidence about the origin of the funds is requested and not supplied;
- identity verification is requested and fails, or the information given is misleading;
- a binding request arrives from a law-enforcement authority or a court.

None of those checks are performed by Kotova. Kotova runs no identity verification and
no sanctions screening of its own; the obligation sits with the connected providers
under the law that applies to each of them. By default, none of them require identity
verification for an ordinary swap.

## How recovery works

Recovery is the provider's process, and you are the one who has to run it.

1. **The provider states what it needs.** Typically identity documents, evidence of
   where the funds came from, or both, submitted directly to their compliance team.
2. **They review.** Timeframes are theirs and vary widely. Some cases resolve in days;
   some take considerably longer.
3. **They decide.** Either the swap continues, or the deposit is returned, or the hold
   stands.

Where a refund is granted, centralised providers typically return the funds to the
address the deposit came from, after review. This is one reason to send from a wallet
you control rather than directly from an exchange account.

:::caution
Send your deposit from a wallet you hold the keys to. If a provider refunds to the
originating address and that address belongs to a third party, recovering the funds
becomes a second problem you have to solve separately.
:::

## What Kotova can and cannot do

### What Kotova can do

- Give you the full record of the order — the provider's own reference, both addresses,
  the amounts, the timestamps and the transaction hashes — which is what their support
  desk asks for first.
- Raise the case through Kotova's direct channel to that provider and chase it.
- Tell you which provider holds the funds, and where their published policy is.

### What Kotova cannot do

- Move, release, or return your funds. There are no keys to do it with.
- Overrule or appeal a provider's compliance decision.
- Handle your identity documents. Verification runs directly between you and the
  provider; Kotova is not in that loop and does not want to be.
- Guarantee recovery, or a timeframe. Nothing here creates an entitlement to
  compensation if a decision goes against you.

If your order has stopped progressing, start with
[Troubleshooting](/help/troubleshooting), then [contact support](/help/contact) with
your order link.

## Reducing the chance of a freeze

Nothing eliminates this risk on a centralised route. These measures reduce it.

- **Use DEX-only mode.** It restricts routing to providers with no operator able to
  freeze anything. Today exactly one source qualifies: Chainflip. It costs you asset
  coverage and often rate, which is why it is off by default. See
  [DEX-only mode](/security/dex-only-mode).
- **Check the provider before you confirm.** The executing provider is shown in the
  source list on the quote, before you commit to anything.
- **Exclude providers you would rather not use.** Turn any source off in that list and
  the next-best one takes over. The preference is stored on your device.
- **Mind the history of your addresses.** Funds that recently touched a mixer, a
  sanctioned address, or a known illicit service are the most common trigger for an
  automated flag — on either side of the swap.
- **Split large orders.** A single unusually large order attracts more scrutiny than
  several ordinary ones.
- **Set a refund address.** Where the provider accepts one, it gives them a destination
  to return funds to without a support conversation. It does not defeat a compliance
  hold, but it removes a step from every other failure mode.

:::note
A decentralised route trades one category of risk for another. There is no operator to
freeze funds, but there is exposure to protocol, bridging and network failure that a
centralised desk does not have.
:::

## Which providers can freeze funds

Every centralised provider carries a conditional freeze risk — conditional because it
applies only in the circumstances listed above, not to ordinary swaps.

The distinction that matters is architectural rather than per-company:

| Type | Providers | Can hold your deposit |
| --- | --- | --- |
| Centralised | FixedFloat, Changelly, ChangeNOW, SideShift, StealthEX, Godex, Exolix, CCE Cash | Yes, for the duration of the swap, in the circumstances above |
| Decentralised | Chainflip | No — it is a protocol, with no operator who could |

How each provider handles refund addresses differs, and is set out in
[Refunds, cancellations and emergencies](/how-it-works/refunds).

Each provider publishes its own policy, and those policies change without notice to
Kotova. The current links are kept in the
[AML and KYC policy](https://kotova.io/terms/kyc) on kotova.io. For what each source is
and how it is monitored, see [Liquidity sources](/how-it-works/liquidity-sources).
