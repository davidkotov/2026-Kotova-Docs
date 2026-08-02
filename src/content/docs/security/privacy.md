---
title: "Privacy and data retention"
description: "What Kotova X collects when you swap, what it never collects, who the data is shared with, and what the 90-day order cutoff means in practice."
---

Kotova X has no accounts, so there is no profile to build. What exists is a record of
each order, kept because your order page has to be able to show you the state of your
swap.

This page explains that record in practical terms. The binding document is the
[Privacy Policy](https://kotova.io/terms/privacy) — where this page and the policy
differ, the policy governs.

## What we collect

| Category | What it is |
| --- | --- |
| Order record | The assets and networks, the amounts, the timestamps, your receiving address and its memo or tag, a refund address if you gave one, the executing provider, the order status, and the transaction identifiers reported back to us |
| Email address | Only if you choose to enter one for order notifications. It is optional at every step |
| Technical request data | IP address, browser user agent, language header, and the country your connection resolves to |
| Referral and campaign data | If you arrived through a referral or campaign link, the identifiers carried in that link |

Addresses are stored exactly as you typed them, and are truncated in internal logs so
that full receiving and refund addresses do not appear in log metadata.

## What we never collect

- **No identity documents.** Kotova performs no KYC, and asks for no name, date of
  birth, photo ID or proof of address.
- **No account and no password.** There is nothing to register.
- **No private keys or recovery phrases.** Kotova holds no keys of any kind — there
  is no wallet in the system that could hold them.
- **No wallet connection.** You paste a receiving address. The app never asks to
  connect a wallet and cannot initiate a transaction from yours.
- **No card or bank details.**

:::note
A centralised provider may run its own verification in specific cases — a transaction
its systems flag, a binding law-enforcement request, or an address on a sanctions
list. That check belongs to the provider and happens on their side. See
[Counterparty and freeze risk](/security/counterparty-risk).
:::

## Who your data is shared with

**The executing provider.** To create your order it receives the pair, the amount,
your receiving address and memo, and a refund address if you gave one. Your email
address is not passed on to it.

**One provider also receives your IP address**, because it applies its own
geographic restrictions and requires the end-user address to enforce them. Today that
is SideShift.

**Block explorers**, so your order page can show the on-chain detail of the deposit
and the payout.

**Our infrastructure providers** — hosting, database and email delivery — which
process data on our instructions in order to run the service.

**Advertising platforms, for measurement only, and only if you arrived from an ad**
that carried a click identifier. In that case a conversion signal is sent from our
server to that platform, containing the click identifier, your IP address, your
browser user agent and, where you supplied one, a hashed form of your email address.

No personal data is sold. No third-party tracking or analytics scripts run in the
swap app — the measurement described above happens server to server, not through
code executing in your browser.

## How long we keep it

Retention periods are set out in the [Privacy Policy](https://kotova.io/terms/privacy),
which is the statement that binds us. This page covers the boundary you will actually
meet while using the product: the 90-day cutoff.

## Order visibility after 90 days

Ninety days after an order is created, it is archived. A scheduled job takes the order
out of public visibility, and from that point the order page and the order lookup stop
returning it — a request for an archived order is answered as gone, not as missing.

- **Ownership is checked first.** The archive response is only given to someone who
  can already prove the order is theirs, so the cutoff never confirms to a stranger
  that a particular order existed.
- **This is a visibility cutoff, not the retention period.** It closes the interface.
  What happens to the stored record afterwards is governed by the policy.

:::caution
If you need a record of a swap for your own accounting, save it before the 90 days are
up. After the cutoff, support cannot reopen the order page for you.
:::

## Requesting deletion

Write to `privacy@kotova.io` and say which order you mean — the order link or the
receiving address is enough to identify it. Deletion requests are handled under the
[Privacy Policy](https://kotova.io/terms/privacy), which sets out the applicable
timescales.

Two limits are worth being direct about:

- Deleting the order record removes your order page with it. Tracking, the status
  history and any notification link stop working permanently.
- Kotova cannot delete what it does not hold. The blockchain record of your transfers
  is public and permanent, and the executing provider keeps its own records under its
  own policy. A request to us reaches neither.

Your rights of access, rectification, portability and objection under the GDPR, and
the supervisory authority you can complain to, are set out in the policy.

## Cookies and local storage

Kotova X stores a small amount of data in your browser. Most of it never leaves your
device.

| What | Where | Roughly how long |
| --- | --- | --- |
| Preferences — language, currency, rate type, excluded providers, DEX-only mode, Chainflip settings | Local storage, mirrored to a cookie so private-browsing sessions still work | About a year |
| Order convenience — your receiving address, used as the passcode for your order page, and a cached copy of your recent order | Local storage | Until you clear site data |
| Visit and session identifiers | Cookies | The session, and up to about 400 days for the visitor identifier |
| Referral and campaign attribution | Cookies | 90 days |

Your provider exclusions and [DEX-only mode](/security/dex-only-mode) are held on the
device only. They are never sent to the server, which is also why they do not follow
you to another browser.

Clearing site data is safe and reversible. Preferences return to their defaults, and
you will need your order link and receiving address to open an order page again.
