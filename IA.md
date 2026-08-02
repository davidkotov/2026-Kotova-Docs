# Page outlines

Every H2 and H3 below becomes an entry in the right-hand "On this page" rail
(h3 indented and dimmed). `[proposed]` pages can be cut without breaking the tree.

Sources for each page are noted so the writer knows where the ground truth lives:
`FAQ x_aN` = `2026-Kotova-Platform/apps/exchange/src/lib/translations.json`,
`terms/*` = `2026-Kotova-LandingPage/terms/`, `code` = platform repo.

---

## Welcome
*Source: IR page, homepage, Doc 2 Kapitel 1*

- What Kotova is
- The three products
  - Kotova X — live
  - Kotova Pay — planned for 2027
  - Kotova Deal — planned for 2027
- Where to start
- Something went wrong with a swap

---

## Introduction

### What is Kotova X
*Source: FAQ x_a1, x_a8; Doc 2 Kapitel 3*

- An aggregator, not an exchange
- What happens when you swap
- What Kotova never does
  - No custody of your funds
  - No account, no KYC by Kotova
  - No trading against your order
- Where the risk actually sits
- What Kotova is not

### The aggregator model
*Source: FAQ x_a5, x_a6, x_a7; code — quote route + adapters*

- Why aggregate
- The liquidity sources we connect to
  - Centralised instant-swap venues
  - Decentralised routes
- How a source is selected for your order
  - Ranking parameters and their weighting  ← **also discharges UWG §5b(2), see PLAN §7**
  - Excluding a source yourself
- What happens when a source is unavailable
- Independence from any single source

### Non-custodial architecture
*Source: FAQ x_a8; service.html §1.2, §2.2; code — order init*

- Where your funds actually go
- The deposit address belongs to the executing provider
- What Kotova stores instead of funds
- Chainflip: a protocol deposit channel
- What non-custodial does not protect you from

### Product status and roadmap
*Source: IR page; Doc 2 Kapitel 4*

- How to read status labels
- Kotova X — live
- Kotova Pay — planned
- Kotova Deal — planned
- Concepts under evaluation

---

## Using Kotova X  [proposed]

### Your first swap
- Before you start
- Step 1 — choose what you send and receive
- Step 2 — enter an amount
- Step 3 — choose a rate type
- Step 4 — check the provider
- Step 5 — enter your receiving address
- Step 6 — confirm
- Step 7 — send your deposit
- Step 8 — track your order

### Choosing assets and networks
- The two-step picker
  - Filters and search
  - Popular and all
- Why an asset does not appear
- Why a network tile is greyed out
- Choosing the same asset on both sides
- Fewer assets when DEX-only mode is on

### Amounts, minimums and maximums
- Entering an amount
- Entering a fiat value instead
- The "Minimum" and "Maximum" hints
- Why limits differ between providers
- Why you may receive slightly more or less than the estimate

### Fixed vs variable rate
- Fixed rate
  - What the lock covers
  - If the market moves or you pay late
- Variable rate
  - When the rate is finally set
- Which to choose
- Rate type affects which providers are available
- Reading the spread indicator

### Choosing and excluding providers
- Reading the provider list
- The "Best" badge
- Why a provider cannot take your order
  - Status labels explained
- Turning a provider off
- DEX-only mode in the provider list
- Where your choices are stored

### Addresses, memos and tags
- Your receiving address
- Address checking is a safety net, not a guarantee
- Memos, destination tags and payment IDs
  - Which networks use one
  - Sending to an exchange account
- Scanning a QR code
- Refund addresses
  - When a refund address is required
  - Refund addresses lock once set

### Sending your deposit
- Send exactly one deposit
- Send the exact amount
- Send on the exact network shown
- Include the deposit memo if one is shown
- Using the QR codes
- The deposit window
- Network confirmations

### Tracking your order
- Your order link
- The recipient address is your passcode
- Order statuses at a glance
- The progress steps
- Email notifications
- If you lost your link
- After 90 days

### Settings
- Ask for a refund address before swapping
- DEX-only mode
- Chainflip options
  - Boost
  - Slippage tolerance
  - Swap deadline
- Language and currency
- Where settings are stored

---

## How It Works

### Quoting and routing
*Source: code — quote route, adapters, client re-ranking*

- Quotes are fetched on demand
- Which sources are eligible for your pair
- Parallel requests and timeouts
- How the best quote is chosen
- Ranking parameters and their relative weighting
- Your own exclusions are applied last
- Quote caching and refresh

### The order lifecycle
*Source: code — order init, sync-orders cron, expired_at logic*

- Creating an order
- The deposit window
- Confirmations and execution
- Status vocabulary
- Late deposits
- Expiry
- Emergency states
- Order visibility and the 90-day cutoff

### Fees
*Source: FAQ x_a15, x_a16; service.html §3*

- What the displayed rate already includes
- Network fees are separate
- How Kotova earns
- What Kotova does not add
- Fees on refunds

### Refunds, cancellations and emergencies
*Source: FAQ x_a19, x_a21, x_a23; code — emergency route, refund-address handling*

- Swaps are irreversible once broadcast
- When a refund is possible
- How refund addresses work per provider
- Emergency choices: continue or refund
- What happens if you do not choose
- If a provider rejects your refund address
- Wrong coin, wrong network, missing memo

### Liquidity sources
*Source: FAQ x_a6, x_a12; kyc.html; code — availability + health*

- What a liquidity source is
- How a source is onboarded and monitored
- Source reference table
- Centralised versus decentralised
- Which sources can freeze funds
- What happens when a source goes down

---

## Reference  [proposed, collapsed by default]

### Supported assets and networks
- How the catalogue is built
- Assets versus networks
- Tokenised assets
- How coverage is decided per direction
- Requesting a listing

### Order statuses
- Status table
- Statuses that need action from you
- Terminal statuses

### Memos and tags by network
- What a memo is
- Networks that use one
- Deposit memos versus receiving memos
- What happens if you omit one

### Limits and fees
- Why limits are per pair and per provider
- Reading the minimum and maximum hints
- Deposit windows by provider
- Fee summary

### Glossary
*Source: Doc 6 glossary + FAQ vocabulary*

- Aggregator, counterparty, liquidity source
- Custodial, non-custodial, DEX
- Fixed rate, variable rate, spread, slippage
- Memo, destination tag, payment ID
- Emergency, refund, revert

---

## Security and Trust

### Security overview
*Source: code audit. **Read PLAN §8 before writing this page** — several existing
public claims are unbacked and must not be restated here.*

- Custody: there is nothing to lose
- Counterparty risk and how you control it
  - Provider vetting
  - Excluding providers
  - Automated health monitoring
- Your order data
  - What is stored
  - How your order page is protected
  - The 90-day window
  - Address handling and log masking
- Platform security
  - Transport and browser protections
  - Credentials and secrets
  - Administrative access
- What we do not do

### Counterparty and freeze risk
*Source: FAQ x_a11, x_a12, x_a13; kyc.html*

- What a freeze is and who can do it
- Why a provider might hold funds
- How recovery works
- What Kotova can and cannot do
- Reducing the chance of a freeze
- Provider freeze capability table

### DEX-only mode
*Source: code — noFreeze flag, CounterpartyDropdown, AssetChainPicker*

- What it does
- What it currently means in practice  ← today: Chainflip only
- What it costs you
- Turning it on and off
- What it does not do

### Privacy and data retention
*Source: terms/privacy.html (rewritten 2026-07-28). Must not exceed what the policy says.*

- What we collect
- What we never collect
- Who your data is shared with
- How long we keep it
- Order visibility after 90 days
- Requesting deletion
- Cookies and local storage

### Bug bounty and vulnerability disclosure
*Source: none — authored from scratch. Blocked on DECISIONS.md Q4.*

- Scope
  - In scope
  - Out of scope
- Severity classification
- Rewards
- Rules of engagement
  - Testing restrictions
  - Handling personal data
- Safe harbour
  - What we commit to
  - Limits of this commitment
  - Third-party systems
- Coordinated disclosure and timelines
- How to report
- Acknowledgments

---

## Kotova vs Competitors
*Blocked on DECISIONS.md Q3 and counsel review. Read PLAN §7 first.*

- How we choose who to compare against
- Comparison criteria
- Instant-swap aggregators
- Adjacent categories
  - Cross-chain DEX and bridge aggregators
  - Exchange directories
  - Single instant-swap venues
- Where Kotova is not the right tool
- Methodology, sources and last update
- Corrections

---

## Help  [proposed]

### Troubleshooting
*Source: FAQ x_a20, x_a21, x_a22, x_a24*

- My swap is taking longer than expected
- I closed the browser and lost my link
- I received a different amount than estimated
- I sent the wrong coin or wrong network
- I forgot the memo or destination tag
- I sent the wrong amount, or sent twice
- My order expired before my deposit arrived
- My order says action required
- My refund has not arrived
- My order page will not open

### Contact support
- Before you contact us
- What to include
- Support channels
- Response expectations
- What support cannot do
