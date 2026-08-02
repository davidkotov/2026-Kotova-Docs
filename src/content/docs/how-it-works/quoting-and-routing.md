---
title: "Quoting and routing"
description: "How Kotova X asks every eligible liquidity source for a quote at the same time, how the best one is chosen, and how your own exclusions change the result."
---

Every number you see on Kotova X comes from a request made when you asked for it. There
is no rate table and nothing is pre-computed. When you change the pair or the amount,
the server asks every eligible liquidity source what it would give you, all at the same
time, and the answers stream back as they land.

## Quotes are fetched on demand

A quote round starts when you change what you are sending, what you are receiving, the
amount, or the rate type. Typing is debounced, so the request fires shortly after you
stop rather than on every keystroke.

The response is a stream, not a single answer. The first frame lists every source about
to be asked, along with the reason any source is being skipped, which is why the
provider list can draw all of its rows before a single price exists. Each source then
contributes exactly one further frame — a quote or a skip — as it settles, which is why
rows fill in one by one rather than together. A closing frame marks the round complete.

## Which sources are eligible

Kotova connects to nine liquidity sources. Not all nine are asked for every pair. A
source is dropped before any network call is made if any of the following applies.

| Check | What it means | Shown as |
| --- | --- | --- |
| Source disabled | Switched off centrally, usually while a problem is investigated | Counterparty unavailable |
| No catalogue entry | The source does not list one side of your pair on that network | Pair not supported |
| Rate type unsupported | The source cannot offer the rate type you selected | Fixed rate unsupported |
| Direction closed | The source lists the asset but has deposits or withdrawals suspended for it | Pair not supported |
| Amount outside limits | Your amount falls outside the source's last known minimum or maximum | Above max / Below min |

Sources that fail a check are still listed, with the reason, rather than hidden — so you
can see how many venues could have competed for your order and why the others could not.

## Parallel requests and timeouts

Every remaining source is called simultaneously, never one after another, so the wait is
the slowest single source rather than the sum of all of them. Each call has a budget of
roughly five seconds; a source that has not answered by then is marked as timed out and
plays no further part in the round.

A source can also decline after being asked, and the reason appears on its row: above
the maximum or below the minimum for the pair, with the threshold converted into your
display currency; liquidity too thin to fill safely; not available in your jurisdiction;
or a quote error when the source rejects the request outright.

## How the best quote is chosen

Selection happens in two stages, and the second one is the one that counts.

### Stage one — the server ranks

The server collects every successful quote and orders them by the amount you would
receive, highest first. That ordering, along with the alternates, is what gets cached.

### Stage two — your browser re-ranks

The server's ordering is not the final word. Your browser holds preferences that are
never sent to the server: the providers you have switched off, and DEX-only mode. It
re-ranks whatever remains after those filters, and the provider it lands on is the one
submitted when you confirm the order.

If you typed in the receive field instead of the send field, the comparison inverts.
Every quote targets the same receive amount, so the best provider is the one that needs
the smallest deposit to deliver it.

That choice is re-checked on the server at order creation. If the provider was switched
off in between, the order is refused and you pick another.

## Ranking parameters and weighting

There is one ranking parameter, and it carries all of the weight:

- **The amount you receive** — highest wins. On a reverse quote, the amount you send —
  lowest wins.

Exact ties, which are rare, fall back to a fixed per-provider display order and then to
alphabetical order. Nothing else enters the calculation — not commercial arrangements
between Kotova and a provider, and not how fast a provider usually is.

Display order in the list is separate from selection. Rows are grouped — selectable now,
not selectable now, switched off by you, and offline — and ordered within each group by
amount. The "Best" badge marks the highest amount across every provider, including ones
you have switched off, so an exclusion that is costing you money stays visible.

The rate you are shown is what the provider quoted, all service charges included.
Blockchain network fees are paid separately. See [Fees](/how-it-works/fees).

## Your own exclusions

Switching a provider off stores that choice on your device. It survives reloads, applies
to every later quote, and propagates to your other open tabs. It is never transmitted:
the server keeps requesting quotes from that source, and your browser keeps ignoring
them. The asset picker also drops any asset or network that only the excluded source
covered.

DEX-only mode is the same kind of device-local preference with a much wider effect: it
removes every source that could hold or freeze funds mid-swap. Today exactly one source
qualifies — Chainflip.

:::caution
DEX-only mode substantially narrows what you can trade and at what rate. It is a browser
preference, not a server-enforced routing rule, and because the one qualifying source
offers variable rate only, combining it with a fixed rate returns no quotes at all. See
[DEX-only mode](/security/dex-only-mode).
:::

## Caching and refresh

Two caches sit in front of the fan-out.

The server cache is keyed on both assets, both networks, the exact amount and the rate
type, and lives for 60 seconds on variable rate and 30 seconds on fixed. Concurrent
requests for an identical key do not each trigger a fan-out — one performs it and the
others wait for its result.

The browser cache mirrors those lifetimes locally. When you nudge the amount up or down
it can rescale the cached quotes instead of re-fetching, but only inside narrow
guardrails: close to the cached amount, inside a mid-sized value band where provider
pricing is close to linear, and within each provider's limits. Outside any of those it
forces a fresh round.

Quotes refresh when you change the pair, the amount or the rate type, and when you open
the provider list — which re-fetches if the cached quotes are past half their lifetime.
No background timer re-quotes the page on its own.

Everything here produces an estimate. What you finally receive is set by the executing
provider, and on a variable-rate order it is set when your deposit confirms, not when
you saw the quote. See [The order lifecycle](/how-it-works/order-lifecycle) and
[Liquidity sources](/how-it-works/liquidity-sources).
