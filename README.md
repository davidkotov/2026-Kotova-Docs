# 2026-Kotova-Docs

Product documentation for **Kotova X**, to be served at `docs.kotova.io`.

> **Nothing is built yet.** This repo currently holds the plan. Four decisions in
> [`DECISIONS.md`](DECISIONS.md) gate the start of implementation.

| File | What it is |
|---|---|
| [`PLAN.md`](PLAN.md) | The build plan: constraints, IA, layout, stack, risks |
| [`IA.md`](IA.md) | Per-page H2/H3 outlines — these drive the "On this page" rail |
| [`DECISIONS.md`](DECISIONS.md) | Open questions, ranked by how much they block |
| [`brand/kotova-tokens.css`](brand/kotova-tokens.css) | Design tokens, stack-agnostic |

## Related repos

| Repo | Role |
|---|---|
| `2026-Kotova-LandingPage` | kotova.io — static, Netlify. Source of truth for brand tokens, navbar and footer |
| `2026-Kotova-Platform` | app.kotova.io — Next.js monorepo. Source of truth for how the product actually behaves |

## Before writing any page

Read **`PLAN.md` §2** — the writing constraints are regulatory, not stylistic.
Then **§8**, which lists public claims that are not backed by the implementation and
must not be restated here until they are fixed at the source.
