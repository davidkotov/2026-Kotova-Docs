---
title: What is Kotova X
description: Kotova X is a non-custodial aggregator that compares quotes from independent swap providers and routes your order to the best one. It is not an exchange.
---

Kotova X is a non-custodial aggregator for instant crypto swaps. For every trade it
asks several independent liquidity providers what they would give you, compares their
answers, and routes your order to the best one.

It is deliberately not an exchange, and the difference is not cosmetic.

## An aggregator, not an exchange

An exchange holds an order book and takes custody of your assets while it matches
your trade. Kotova does neither. It holds no order book, no inventory, and no
customer funds. It compares what other venues are offering and points your order at
the best of them.

The practical consequence is that Kotova has nothing to lose on your behalf, because
it never has your assets in the first place.

## What happens when you swap

1. You choose what you want to send and what you want to receive.
2. Kotova asks every eligible provider for a quote, in parallel.
3. The quotes are ranked and the best is preselected. You can override this.
4. You give a receiving address and confirm the order.
5. The executing provider issues a deposit address, and you send your funds there.
6. The provider performs the swap and sends the result to your address.

Step 5 is the important one: the deposit address belongs to the provider, not to
Kotova. See [Non-custodial architecture](/introduction/non-custodial).

## What Kotova never does

### No custody of your funds

There is no point in the flow at which Kotova controls your assets. No Kotova wallet
receives them, and no Kotova key can move them.

### No account, no KYC by Kotova

Kotova performs no identity checks and requires no registration. All you need is a
wallet address to receive the swapped asset. An email address is optional and used
only for order notifications.

Connected centralised providers may perform their own verification in specific
cases — a transaction their systems flag, a binding law-enforcement request, or an
address on a sanctions list. That obligation sits with them, not with Kotova. See
[Counterparty and freeze risk](/security/counterparty-risk).

### No trading against your order

Kotova does not take the other side of your trade. It has no book and no position.

## Where the risk actually sits

Removing custody removes one category of risk and leaves another in place. Your funds
are not exposed to Kotova, but they are exposed to the provider executing your swap
for the duration of the swap.

That is the risk worth understanding, and Kotova gives you controls over it: you can
see which provider will handle your order before you confirm, exclude any provider
you would rather not use, or restrict routing to non-custodial venues entirely. See
[DEX-only mode](/security/dex-only-mode).

## What Kotova is not

To be explicit, because these are common misreadings:

- Kotova is **not a regulated exchange**, a bank, a broker, or a custodian.
- Kotova does **not provide investment advice** and takes no view on any asset.
- Kotova does **not guarantee** the performance or solvency of any connected provider.
- Kotova cannot **reverse** a swap once it has been broadcast to a blockchain.
