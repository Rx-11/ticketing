# NFTickets — Fair On-Chain Ticketing on XRP Ledger

NFTickets is a Next.js app that rethinks ticketing with **XRPL-native commit-reveal queues**, **NFT tickets**, and **resale price ceilings**.

It is built to solve the biggest pain points in event ticketing:
- bot sniping during drops,
- uncontrolled secondary-market markup,
- opaque revenue sharing,
- no verifiable proof of ticket authenticity.

---

## Why XRP / XRPL Is Ideal for This Project

NFTickets depends on frequent, low-friction on-chain actions (commit stake, reveal settlement, mint NFT, create offer, accept offer). XRPL is a strong fit for this exact workload:

- **Fast finality**: user-facing flows can complete in seconds, which is critical for queue and checkout UX.
- **Low transaction cost**: repeated interactions (commit + reveal + offer lifecycle) stay economically viable.
- **Native NFT and offer primitives**: ticket minting and secondary-market listing are first-class ledger operations.
- **Simple value transfer in XRP**: base currency payments avoid extra token-complexity in the MVP.
- **Public transparency**: each ticket lifecycle action can be inspected on Testnet explorer.
- **Energy-efficient consensus**: no proof-of-work overhead for high-frequency ticketing operations.

In short: XRPL gives this app the speed, cost profile, and built-in digital asset features needed for fair ticket distribution and controlled resale.

---

## Core Features

### 1) Anti-Bot Commit-Reveal Queue
- Buyers commit by sending an XRP stake payment with a memo containing a hash commitment.
- The app stores `(eventId, tierId, wallet, commitHash, txHash)` in a queue.
- Reveal verifies hash integrity before moving to fulfillment.

### 2) Trust Score + Dynamic Stake
- Each wallet has a trust score (0–100).
- Required stake per ticket is reduced for higher-trust wallets.
- Successful purchase increases score; listing on resale decreases score.

### 3) On-Chain Ticket NFT Issuance
- On reveal success, backend mints an NFT ticket.
- Backend creates a destination sell offer to the buyer at tier face value.
- Buyer accepts offer from wallet to receive NFT in custody.

### 4) Capped Resale Marketplace
- Resale listing price is validated against per-tier `resaleCapBps` ceiling.
- Invalid (above-cap) listings are rejected at API layer.
- Marketplace buyers accept on-ledger sell offers.

### 5) Revenue-Split Model in Event Config
- Event definitions include primary and resale split metadata.
- Split bars and percentages are visible in the event UI.
- Config-driven structure supports multiple events/tiers.


---

## High-Level Architecture

1. **Commit (client + XRPL)**
	- User wallet sends stake XRP to platform address with commitment memo.
	- Client calls `POST /api/queue/commit` to register queue entry.

2. **Reveal (server)**
	- `POST /api/queue/reveal` validates secret/nonce hash.
	- Server refunds stake to user wallet.
	- Server mints NFT ticket.
	- Server creates destination sell offer priced at face value.
	- Queue entry becomes `claimed`.

3. **Accept Offer (client + XRPL)**
	- Buyer accepts the sell offer to receive NFT ticket.

4. **Resale**
	- Owner creates on-ledger sell offer.
	- App persists listing through `POST /api/tickets/resale`.
	- Buyers discover listings and accept offers in marketplace.

---

## Tech Stack

- **App framework**: Next.js 16 (App Router), React 19, TypeScript
- **Ledger SDK**: `xrpl` (XRPL Testnet)
- **Validation**: Zod
- **Storage**: `better-sqlite3` (local DB)
- **Styling**: Tailwind CSS 4

---

## Project Areas

- `app/` — pages, client workflows, API routes
- `app/api/queue/*` — commit/reveal/status endpoints
- `app/api/tickets/*` — owned tickets + resale listings
- `lib/events.ts` — event/tier/rule/split source of truth
- `lib/xrplSrv.ts` — server-side XRPL transactions (refund, mint, sell offer)
- `lib/db.ts` — SQLite schema and data access
- `lib/stake.ts` — trust-score-to-stake logic
- `lib/pricing.ts` — resale ceiling calculations

---

## Prerequisites

- Node.js 20+
- npm 10+
- XRPL Testnet wallets
  - one platform wallet (server-side seed)
  - one or more buyer wallets (for UI testing)
- Testnet XRP funding (faucet)

---

## Environment Variables

Create `.env.local` in repository root:

```env
# Client + server
NEXT_PUBLIC_XRPL_WS=wss://s.altnet.rippletest.net:51233

# Client (where commits are staked to)
NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS=rXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Server (platform signer seed for refund/mint/offer creation)
PLATFORM_SECRET=sXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Optional helper script vars
TESTNET_SECRET=sXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TESTNET_ADDRESS=rXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Notes:
- `PLATFORM_SECRET` must be a valid XRPL seed (`s...`) or reveal flow fails.
- `NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS` should match the address derived from `PLATFORM_SECRET`.
- Keep `.env.local` out of version control.

---

## Quick Start

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

---

## How to Use (End-to-End)

### 1) Explore Events
- Navigate to `/events`.
- Pick an event and review tiers, splits, and rules.

### 2) Commit to Queue
- On event page, paste a **Testnet seed** (dev-only UX).
- App derives wallet address and score.
- Click commit to stake XRP on XRPL and register queue entry.

### 3) Reveal and Claim
- Click reveal when commitment exists.
- Server verifies hash, refunds stake, mints NFT, and creates buyer sell offer.

### 4) Accept Offer
- Click accept to execute `NFTokenAcceptOffer`.
- Ticket NFT appears in buyer wallet.

### 5) Resell (Optional)
- Go to `/my-tickets` and list a ticket for resale.
- Price must be within cap (`resaleCapBps` ceiling).
- Listing appears in `/marketplace`.

### 6) Buy from Marketplace
- In `/marketplace`, connect via seed.
- Buy listing by accepting on-ledger sell offer.

---

## API Reference

### `POST /api/queue/commit`
Registers an on-chain commitment after stake transaction.

Body:
```json
{
  "eventId": "EVT-ROCK-001",
  "tierId": "GA",
  "wallet": "r...",
  "stakeXrp": "1.5",
  "commitHash": "...",
  "commitTxHash": "...",
  "ticketIndex": 0
}
```

### `GET /api/queue/status?eventId=...&tierId=...&wallet=...`
Returns queue position and latest entry state.

### `POST /api/queue/reveal`
Verifies commit and executes refund + mint + offer creation.

Body:
```json
{
  "eventId": "EVT-ROCK-001",
  "tierId": "GA",
  "wallet": "r...",
  "secret": "...",
  "nonce": "..."
}
```

### `GET /api/tickets/my?wallet=...`
Returns claimed tickets for wallet.

### `GET /api/tickets/resale`
Returns stored resale offers.

### `POST /api/tickets/resale`
Stores resale listing only if price is within cap.

### `GET /api/score?wallet=...`
Returns wallet trust score.

---

## Configuring Events, Tiers, and Economics

Edit `lib/events.ts` to control:
- event metadata,
- tier supply and face prices,
- resale caps (`resaleCapBps`),
- primary and resale split percentages,
- queue-rule values shown in UI.

For `Split` percentages, target a consistent total of `10000` basis points where required by your business logic.

---

## Development Scripts

- `npm run dev` — start local development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

---

## Security and MVP Caveats

This repository is currently MVP/demo-oriented:

- Testnet seeds are entered in client UI (not production-safe).
- Queue timing values are configured/displayed, but strict window enforcement logic should be hardened server-side.
- SQLite local file storage is convenient for demos, not distributed production.
- Backend trusts some client-supplied fields that should be re-verified against ledger state in production.
- Split metadata is modeled and displayed; complete payout settlement automation can be expanded further.

---

## What Makes This Project Special

NFTickets does not just “accept crypto payments.”

It uses XRP Ledger as the **coordination layer** for fairness:
- stake-backed queue commitments,
- cryptographic reveal verification,
- on-ledger NFT delivery,
- programmable resale boundaries,
- and transparent, auditable ticket lifecycle events.

That combination is why XRP/XRPL is not an add-on here — it is the foundation of the product design.

---

## Future Additions

To evolve NFTickets from MVP into a production-grade platform, these are high-value next steps:

### 1) Micropayment-Based Revenue Streaming
- Split each ticket payment into programmable XRP micropayments for artist, venue, promoter, and platform.
- Support real-time or batched streaming so stakeholders are paid continuously, not only at settlement milestones.
- Add transparent payout receipts and per-event earnings dashboards.

### 2) Stronger Fairness Guarantees
- Enforce commit/reveal windows strictly on server with deterministic cutoffs.
- Add per-wallet rate limiting, Sybil resistance, and anti-abuse heuristics.
- Introduce verifiable randomization for tie-breaking and winner selection.

### 3) Advanced Secondary Market Controls
- Dynamic resale caps based on proximity to event time and demand tiers.
- Optional allowlists, transfer cooldowns, and resale quantity limits.
- Built-in royalties and creator fee policies with transparent historical reporting.

### 4) Mobile-First Experience
- Native mobile app for ticket custody, check-in QR/NFC, and push alerts.
- One-tap acceptance of NFT offers and event-day wallet flows.
