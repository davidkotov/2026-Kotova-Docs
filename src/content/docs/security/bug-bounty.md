---
title: "Bug bounty and vulnerability disclosure"
description: "Scope, severity bands, reward ranges, rules of engagement, safe harbour and coordinated disclosure timelines for reporting a security issue in Kotova X."
---

:::caution[This programme is not live yet]
The reporting address below does not exist, and nothing on this page is an invitation
to test Kotova systems. The terms are published early so they can be read and
challenged. A start date will replace this notice when the programme opens.
:::

Kotova holds no customer funds and no private keys, so a vulnerability here cannot
drain a wallet the way one at a custodian can. What it can do is change what you see —
the deposit address, the receiving address, the amounts, the routing decision. Those
are the things worth reporting.

## Scope

### In scope

| System | What it is |
| --- | --- |
| `app.kotova.io` | The Kotova X application and the HTTP endpoints it calls from the browser |
| `kotova.io` | The marketing site and the terms corpus |
| `docs.kotova.io` | This documentation site |
| `cdn.kotova.io` | Static asset delivery |

We particularly want anything that alters an address or amount shown to or submitted
by a user, or that lets one person read or change another person's order: authorisation
bypass, server-side injection, request forgery reaching internal services, remote code
execution, compromise of the front-end bundle.

Any Kotova-operated infrastructure not listed in the table above is out of scope.
If you believe you have found something that affects Kotova but falls outside the
listed hosts, report it anyway and say so — do not test it.

### Out of scope

- The connected liquidity providers' own systems and APIs, even when reached through
  Kotova.
- Blockchains, wallets, block explorers, price sources, and the infrastructure of our
  hosting, database, email delivery and advertising-measurement vendors.
- Internal administrative interfaces. No test credentials are issued.
- Denial of service and resource-exhaustion testing; social engineering; phishing;
  physical intrusion.
- Scanner output with no demonstrated impact — missing headers, cookie flags, mail
  record opinions, version banners, self-XSS.
- Issues already known to us. We will say so, and tell you when we logged it.

## Severity classification

We grade on realistic impact to a user or to the routing decision, not on scanner
score.

| Band | What it covers |
| --- | --- |
| **Critical** | Funds redirectable, or code running on production infrastructure: altering a deposit address, receiving address or amount; remote code execution; unauthenticated writes to order records |
| **High** | Data or routing seriously compromised without funds moving: reading or modifying other people's orders; authorisation bypass on a privileged interface; server-side injection |
| **Medium** | Real but limited or conditional impact: stored cross-site scripting; a cross-site request that changes order state; an access-control gap exposing non-public data |
| **Low** | A genuine defect with negligible consequence: minor information disclosure, edge-case input handling |

A chain of low findings is graded on its combined outcome. Downgrades are explained.

## Rewards

The programme is self-hosted; there is no platform account and no intermediary.

| Severity | Reward |
| --- | --- |
| Critical | €1,000 – €2,500 |
| High | €300 – €750 |
| Medium | €100 – €250 |
| Low | Public acknowledgment, no monetary reward |

The first valid report is the one rewarded; later reports receive acknowledgment. One
reward is paid per root cause, however many endpoints reach it. Position within a band
reflects exploitability and report quality. No non-disclosure agreement is required.

## Rules of engagement

### Testing restrictions

- Test only against orders you create yourself, with your own funds and addresses.
- Nothing you send while testing can be reimbursed. Deposits go straight to the
  executing provider and cannot be recalled. Use the smallest amount the pair allows.
- No load testing, no high-volume fuzzing, no scanning that would read as an attack
  in progress.
- Do not access, modify or delete anyone else's data. An access-control issue can
  almost always be demonstrated with two orders you own.
- Do not interact with a provider's systems beyond the normal course of one swap.
- Do not publish, sell or trade a finding before coordination, or use one as leverage.

### Handling personal data

Order records contain wallet addresses, amounts, timestamps and, where the user
supplied one, an email address. If a finding exposes someone else's data, stop as soon
as the issue is established. Keep only what demonstrates it, redact that in your
report, retain nothing beyond triage, and never share it with anyone else.

Tell us what you accessed and when: where personal data has been exposed, we may have
notification duties under the GDPR.

## Safe harbour

### What we commit to

For good-faith research within the scope and rules above, we will treat your testing
as authorised, will not bring or support civil or criminal action over it, will not
refer you to law enforcement, and will confirm to any third party that you acted under
this programme.

### Limits of this commitment

- It covers only the in-scope systems, and only research following the rules above.
- It does not waive anyone else's rights — users whose data you reach, or third
  parties whose systems you touch.
- It is not immunity. German criminal law, in particular §§202a–202c StGB, is enforced
  by the state, and no private undertaking binds a prosecutor. What we can do is state
  that the access was authorised.
- A small accidental deviation you disclose promptly will not void it. A deliberate
  one will.

### Third-party systems

Kotova routes orders to nine independent liquidity sources and runs on infrastructure
operated by other companies. We have no authority over them and cannot extend safe
harbour to them. If you find an issue in one, the disclosure relationship is yours,
not ours.

## Coordinated disclosure and timelines

| Stage | Target |
| --- | --- |
| Acknowledgment of your report | 3 business days |
| Triage, severity and reward decision | 10 business days |
| Remediation — Critical | 7 calendar days |
| Remediation — High, Medium, Low | Agreed with you at triage |
| Public disclosure | 90 days after your report, or sooner by agreement |

You may publish 90 days after reporting. If we need longer we will ask, with a reason
and a date; extensions will not be used to delay indefinitely. For a Critical finding
please hold publication until the fix is deployed — that is what the seven-day target
is for. If we miss a target, chase us.

## How to report

The reporting address and PGP key are published here when the programme opens.
Until then, please do not send vulnerability details through general support channels —
wait, or ask for a secure channel first.

Include the affected host and exact endpoint, reproduction steps someone else can
follow, what an attacker gains, and the dates, times and source IP addresses you tested
from, so your traffic can be told apart from a genuine attack. Say how you would like
to be credited. One issue per report, in English or German.

## Acknowledgments

We publish the researchers who report a valid issue — name or handle, an optional link,
and the month. Nobody is listed without being asked first, you may stay anonymous, and
entries appear only after remediation.

No entries yet — the programme has not opened.
