---
title: "Security overview"
description: "What Kotova can and cannot do with your funds and your order data, the controls you have over counterparty risk, and the limits of each."
---

Security for an aggregator means something different from security for an exchange.
There is no balance to protect and no withdrawal to authorise, because Kotova never
holds your assets. What is left to protect is your order data.

This page describes the controls that exist. Where one does not, it says so.

## Custody: there is nothing to lose

There is no wallet anywhere in the Kotova system. No component holds a blockchain
private key, and none can sign a transaction. Deposit addresses are issued by the
provider that will execute your swap; funds move from your wallet to that provider,
and from there to your receiving address.

An attacker with full control of Kotova's infrastructure would find no balance to
withdraw and no key to sign with. The exposure is order data, not money — which is why
most of this page is about data.

That is architecture, not a guarantee: it removes Kotova as a place your funds can be
lost, not every risk in a swap. See
[Non-custodial architecture](/introduction/non-custodial) for what remains.

## Counterparty risk and how you control it

From the moment your deposit confirms until the executing provider sends the output,
your funds are with that provider. Kotova connects to nine sources: eight centralised
venues, which can in principle hold or freeze funds, and Chainflip, a decentralised
protocol, which cannot — no operator is in a position to.

### How a source is added

Each source is integrated individually — its own adapter, its own server-side
credentials, its own catalogue record — and can be quoted only while enabled there.
The catalogue also records whether a source can freeze funds; that flag is what
DEX-only mode filters on.

### Excluding providers

Before you confirm, the interface names the provider that will execute your order, and
you can switch off any provider in the list. Selection is two-stage: the server ranks
the quotes it received by the amount you would receive, then your browser re-ranks that
list across the sources you have left enabled, and the browser's pick is what is
submitted with the order. A source you switched off is never the one your order goes to.
Those exclusions are stored on your device.

DEX-only mode is the stronger form of the same control: it removes every source able
to freeze funds. Exactly one qualifies today — Chainflip — so enabling it substantially
narrows the assets and the rates available to you. It is a device-local browser
preference, off by default. See [DEX-only mode](/security/dex-only-mode).

### Health monitoring

A scheduled job asks every enabled source for its current asset list, at present every
30 minutes, and records the outcome for internal monitoring.

Resilience during routing is separate and per request: eligible sources are queried in
parallel with a per-source timeout of a few seconds, and one that errors or answers
late drops out of the comparison.

## Your order data

### What is stored

An order record holds the assets and networks, the quoted and final amounts, the
executing source and its order identifier, the deposit and receiving addresses with any
memo, a refund address if you gave one, transaction hashes and confirmations, status and
timestamps, and your email address if you supplied one.

It also holds the IP address, user agent, language and country of the request that
created the order, plus any campaign or referral parameters in the URL. No private keys
are stored, because the system has none. Retention and sharing are covered in
[Privacy and data retention](/security/privacy).

### How your order page is protected

Your order link contains a short identifier, which is not a secret on its own. Opening
the order also requires the receiving address you entered, used as a passcode and
compared case-insensitively so that a checksummed address still matches in lower case.
The token the executing provider issues grants no access here: you authenticate to
Kotova, never through the provider.

:::caution
Your order link and your receiving address together open the order page. A receiving
address is not private in the way a password is, so treat the link as sensitive and do
not post it anywhere public.
:::

### The 90-day window

Ninety days after creation an order is archived: the read routes stop serving it and
the order page no longer opens, for you as much as for anyone else. Ownership is
checked before archive status is reported, so an archived order tells a stranger
nothing. Archiving hides an order; it is not deletion — see
[Privacy and data retention](/security/privacy).

### Addresses and logs

Addresses are stored exactly as you typed them and are never rewritten; comparison
folds case at read time instead. Internal event logs truncate addresses and transaction
hashes to the first six and last four characters, so full receiving and refund
addresses never appear in log metadata.

## Platform security

### Transport and browser protections

The app is served over HTTPS only, with HSTS covering subdomains. Responses set
MIME-sniffing protection, restrict framing to our own origin, trim the referrer on
cross-origin navigation, and allow camera access only for the in-page QR scanner while
disabling microphone and geolocation.

No third-party analytics or tracking scripts run in the swap app.

### Credentials and secrets

Provider API credentials are held server-side and never reach the browser; every quote
and order call is made server to server. The only configuration exposed to the client
is the address of the CDN serving coin icons.

## What we do not do

Stated plainly, so nothing has to be inferred:

- We hold no funds and no blockchain keys, at any point in a swap.
- We perform no identity checks and no sanctions screening; connected centralised
  providers apply their own policies. See
  [Counterparty and freeze risk](/security/counterparty-risk).
- We have not commissioned an external security audit. When one is completed, it will
  be reported here.
- We do not underwrite counterparty failure. If a provider holds or loses your funds
  we will escalate with them, but there is no automatic entitlement to compensation.
- We cannot reverse, redirect or recall a transaction once it has been broadcast.
- We will never ask you for a seed phrase or a private key, or ask you to send funds
  to a "recovery" address.

Found a security problem? Report it through
[Bug bounty and vulnerability disclosure](/security/bug-bounty).
