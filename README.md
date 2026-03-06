
# 🌱 AVAJAZ
### A Gamified Impact Network Built on Avalanche

> *Transforming Community Forest Association stewardship into verifiable, market-ready economic assets — one tree, one hive, one harvest at a time.*

[![Built on Avalanche](https://img.shields.io/badge/Built%20on-Avalanche-E84142?style=flat-square&logo=avalanche)](https://avax.network)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Status: Hackathon MVP](https://img.shields.io/badge/Status-Hackathon%20MVP-blue?style=flat-square)]()
[![Docs](https://img.shields.io/badge/whitepaperDocs-8%20-orange?style=flat-square)](./docs/whitepapers/)

---

## The Problem

Kenya's Community Forest Associations (CFAs) are doing the work. Seedling nurseries propagate native species. Agroforestry groups plant thousands of trees. Beekeeping cooperatives maintain hives inside gazetted forests. Ecotourism groups protect biodiversity that visitors pay to experience.

None of this work is documented in a form that premium markets, carbon registries, or ESG buyers can read, verify, or reward.

**Two systems exist that should fix this — but don't:**

- **Jaza Miti** (Kenya's government tree database) has institutional legitimacy but no scalable verification. Trees are registered but never confirmed. Data exists but is never ground-truthed.
- **CIFOR-ICRAF's research framework** proves trees should be treated as traceable economic products — but has no operational bridge to CBO reality.

The result: CBO members practice sustainable forestry that qualifies for premium markets and climate finance — and earn commodity prices anyway, because they cannot prove what they do.

---

## The Solution

AVAJAZ is a decentralized, Avalanche-native impact coordination protocol that builds the missing infrastructure across three integrated layers:

```
┌─────────────────────────────────────────────────────┐
│  LAYER 3 — ENGAGEMENT ENGINE                        │
│  Four skill-based games sustain daily participation │
│  Chess · Prediction Markets · Chrono Siege · DAO    │
├─────────────────────────────────────────────────────┤
│  LAYER 2 — ASSET LAYER                              │
│  Verified activities minted as NFTs on Avalanche    │
│  Trees · Seedlings · Honey · Ecotourism Zones       │
├─────────────────────────────────────────────────────┤
│  LAYER 1 — VERIFICATION ENGINE                      │
│  Distributed, incentivized, smartphone-based        │
│  Proof of Impact Protocol · State Machines          │
└─────────────────────────────────────────────────────┘
```

---

## Who AVAJAZ Serves

AVAJAZ is built for **formally registered CFA user groups** under Kenya Forest Service (KFS) oversight — four activity types, one protocol:

| User Group | Activity | Value Unlocked |
|---|---|---|
| 🌿 **Seedling Nursery Groups** | Propagate and sell native/commercial seedlings | Verified provenance → reforestation contracts |
| 🌳 **Agroforestry Groups** | Plant and maintain trees on farm edges | Carbon credits · ESG traceability · EUDR compliance |
| 🍯 **Beekeeping Groups** | Maintain hives in forest zones | Forest-honey credential → 3–4x commodity price |
| 🦜 **Ecotourism Groups** | Manage trails, biodiversity experiences | Biodiversity credentials → conservation funding |

---

## How It Works

### 1. Proof of Impact Protocol
Every CBO activity moves through a deterministic on-chain state machine:

```
Unregistered → Registered → Stage 1 → Stage 2 → Stage 3 → Validated → Productized
```

Each state transition requires:
- Geotagged photo or video evidence (smartphone)
- Peer confirmation from another CFA user group member
- AI-assisted quality scoring by off-chain Verification Agent
- Stake-backed submission (fraud = slash; accuracy = reward)

### 2. Digital Twins as Economic Assets
Every activity that reaches `Productized` is minted as an NFT on Avalanche:

- 🌳 **Tree NFT** — origin, custodian, survival history, carbon data, harvest traceability
- 🌿 **Seedling Batch NFT** — species, survival rate, destination confirmation
- 🍯 **Honey Harvest NFT** — forest habitat health, hive location, sustainable harvest proof
- 🦜 **Ecotourism Zone NFT** — biodiversity index, canopy cover, visitor impact record

Verified assets connect CBO groups to buyers who pay premiums for provenance — specialty honey buyers, EUDR-compliant importers, carbon project developers, conservation funders.

### 3. Gamified Engagement Engine
Four interconnected games fill the gaps between seasonal verification cycles and grow member earnings through skill:

| Game | Core Mechanic | Skill Built |
|---|---|---|
| ♟️ **Chess Staking** | Stake earnings; win = grow; lose = return unchanged | Daily habit · Strategic thinking |
| 📊 **Prediction Markets** | Forecast survival rates, prices, yields | Domain knowledge · Probability reasoning |
| 🏰 **Chrono Siege** | 7-day immutable territory lock; passive rewards | Capital planning · Alliance coordination |
| 🕵️ **Shadow Syndicate** | Elite 50-member DAO governance simulation | Governance literacy · Trust assessment |

**Universal principle: CBO members never lose their principal stake through gameplay. Only upside exists.**

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│        Android App · WhatsApp Bot · Telegram Bot        │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                   API GATEWAY                           │
│     Geo-validation · Media processing · AI scoring      │
└──────────────────────┬──────────────────────────────────┘
                       │
         ┌─────────────┼──────────────┐
         │             │              │
┌────────▼──────┐ ┌────▼──────┐ ┌───▼───────────┐
│  VERIFICATION │ │   GAME    │ │    ORACLE     │
│     AGENT     │ │   AGENT   │ │  AGENT (P2)   │
└────────┬──────┘ └────┬──────┘ └───┬───────────┘
         │             │            │
┌────────▼─────────────▼────────────▼────────────────────┐
│                AVALANCHE C-CHAIN (EVM)                  │
│                                                         │
│  ActivityRegistry    VerificationContract               │
│  NFTMintContract     RewardDistribution                 │
│  StakingContract     GameController                     │
│  TreasuryContract    GovernanceContract                 │
└─────────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  STORAGE LAYER                          │
│      IPFS · PostgreSQL · The Graph · Redis              │
└─────────────────────────────────────────────────────────┘
```

---

## Smart Contracts

| Contract | Description |
|---|---|
| `ActivityRegistry.sol` | Registers all CBO activities; stores geoHash, CFA registration number, custodian |
| `VerificationContract.sol` | Manages per-activity state machines; enforces peer quorum; triggers state transitions |
| `NFTMintContract.sol` | ERC-721 + ERC-2981; auto-mints on `Validated` state; royalty logic |
| `RewardDistribution.sol` | Automated AVAX splits: 70% verifier · 20% peers · 10% CFA treasury |
| `StakingContract.sol` | Verification stakes (slashable) + game stakes (capital-preserved, never slashed) |
| `GameController.sol` | Coordinates Chess, Prediction Markets, Chrono Siege, Shadow Syndicate outcomes |
| `TreasuryContract.sol` | CFA group multi-sig treasuries + protocol treasury |
| `GovernanceContract.sol` | Phase 3 DAO: reputation-weighted proposals, timelock execution |

---

## Hackathon MVP Scope

**Implemented on Avalanche Fuji Testnet:**

- [x] Activity registration — all four CBO types
- [x] Verification state machine — tree planting (full 6 stages) + nursery batch
- [x] Peer quorum logic
- [x] NFT minting on validation (ERC-721 + ERC-2981)
- [x] Automated reward distribution (AVAX testnet)
- [x] Staking with capital preservation enforcement
- [x] Chess Staking game logic
- [x] Basic Prediction Market structure
- [x] Verification Agent (GPS validation + duplicate detection)
- [x] IPFS metadata storage

**Simulated (Phase 2 roadmap):**
- [ ] Live oracle integration (weather + satellite)
- [ ] Beekeeping + ecotourism state machines
- [ ] Chrono Siege territory mechanics
- [ ] Reputation scoring system

**Roadmap:**
- [ ] Shadow Syndicate governance simulation
- [ ] KFS / Jaza Miti data bridge
- [ ] WhatsApp / Telegram deep integration
- [ ] AVAJAZ Impact Subnet (Avalanche)

---

## Why Avalanche

| Feature | How AVAJAZ Uses It |
|---|---|
| **Sub-second finality** | Reward confirmations feel instant on mobile — critical for rural CBO adoption |
| **Low gas fees** | Micro-rewards (Ksh 50–200) remain meaningful after gas costs |
| **EVM compatibility** | Full Solidity + OpenZeppelin stack; composable with DeFi and carbon markets |
| **C-Chain throughput** | Handles seasonal verification surges without congestion |
| **Subnets (Phase 4)** | AVAJAZ Impact Subnet: KFS government node, custom gas token, dedicated ESG infrastructure |

---

## Token Strategy

| Phase | Token | Rationale |
|---|---|---|
| **Phase 1–2** | AVAX (testnet → mainnet) | Simplicity, credibility, no speculative risk |
| **Phase 3** | AVAJAZ Governance Token | Utility-only: governance weight + staking multiplier |
| **Phase 4** | Impact Subnet Gas Token | Dedicated infrastructure for government + enterprise integrations |

No token launches during pilot. No inflationary mechanics. Revenue-backed rewards from Year 3+.

---

## Documentation

Full protocol documentation in [`/docs/whitepapers/`](./docs/whitepapers/):

| # | Paper | Description |
|---|---|---|
| 1 | [Overview](./docs/whitepapers/1_overview.md) | Vision, problem, solution, roadmap |
| 2 | [Verification Model](./docs/whitepapers/2_verification_model.md) | Proof of Impact Protocol, 4 activity state machines |
| 3 | [Product Model](./docs/whitepapers/3_product_model.md) | NFT types, digital twin metadata, market access |
| 4 | [Gamification Model](./docs/whitepapers/4_gamification_model.md) | Four games, capital preservation, seasonal calendar |
| 5 | [Technical Architecture](./docs/whitepapers/5_technical_architecture.md) | Contracts, agents, oracle, Avalanche integration |
| 6 | [Economic Model](./docs/whitepapers/6_economic_model.md) | Incentive design, flywheel, token strategy |
| 7 | [Financial Model](./docs/whitepapers/7_financial_model.md) | Revenue streams, unit economics, break-even |
| 8 | [Governance Model](./docs/whitepapers/8_governance_model.md) | Progressive decentralization, DAO, KFS integration |

---

## Repo Structure

```
avajaz/
├── contracts/
│   ├── ActivityRegistry.sol
│   ├── VerificationContract.sol
│   ├── NFTMintContract.sol
│   ├── RewardDistribution.sol
│   ├── StakingContract.sol
│   ├── GameController.sol
│   ├── TreasuryContract.sol
│   └── GovernanceContract.sol
├── agents/
│   ├── verification-agent/     # GPS validation, duplicate detection, AI scoring
│   ├── game-agent/             # Chess engine, ELO, Prediction Market settlement
│   └── oracle-agent/           # Phase 2: weather + satellite feeds
├── app/
│   └── android/                # Smartphone client for CBO members
├── api/
│   └── gateway/                # REST API, auth, geo-validation, media processing
├── subgraph/
│   └── avajaz/                 # The Graph indexing for on-chain activity queries
├── docs/
│   └── whitepapers/            # All 8 PRD documents
├── scripts/
│   ├── deploy.js               # Deployment scripts (Fuji testnet + mainnet)
│   └── seed.js                 # Test data seeding for demo
├── test/
│   └── ...                     # Contract unit tests
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Hardhat
- An Avalanche Fuji testnet wallet with test AVAX ([faucet](https://faucet.avax.network/))

### Install
```bash
git clone https://github.com/your-org/avajaz.git
cd avajaz
npm install
```

### Configure
```bash
cp .env.example .env
# Add your PRIVATE_KEY and FUJI_RPC_URL to .env
```

### Deploy to Fuji Testnet
```bash
npx hardhat run scripts/deploy.js --network fuji
```

### Run Tests
```bash
npx hardhat test
```

### Seed Demo Data
```bash
npx hardhat run scripts/seed.js --network fuji
# Seeds 3 CFA groups, 10 trees, 2 nursery batches, 1 hive, 1 ecotourism zone
```

---

## Roadmap

```
Phase 1 — MVP (Now)
  Fuji testnet · Tree + nursery verification · Chess + Prediction Markets
  Verification Agent live · NFT minting · AVAX rewards

Phase 2 — Mainnet (Year 1–2)
  All 4 activity state machines · Live oracle feeds
  Beekeeping + ecotourism modules · Chrono Siege · Reputation scoring
  3-CFA pilot (Kenya)

Phase 3 — National Scale (Year 3–5)
  50+ CFA partnerships · Carbon credit integration
  AVAJAZ Governance Token · DAO governance live
  KFS / Jaza Miti data bridge · EUDR compliance packages

Phase 4 — Continental (Year 6–10)
  AVAJAZ Impact Subnet · KFS Government Node
  Uganda · Tanzania · Ethiopia expansion
  Pan-African verified forest economy infrastructure
```

---

## The Team

Built for the **Avalanche Builderthon** by the AVAJAZ team — combining expertise in Web3 infrastructure, community forestry, and African smallholder economics.

---

## Partners & Acknowledgements

- **Kenya Forest Service (KFS)** — CFA registration framework and government legitimacy
- **CIFOR-ICRAF** — Trees-as-products research framework
- **Jaza Miti** — Government tree registration infrastructure
- **Avalanche** — Blockchain infrastructure

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

<div align="center">

**AVAJAZ** · Built on Avalanche · For Kenya's CFA User Groups · And Every Forest Community That Follows

*CBO members are already doing the work. AVAJAZ makes the world pay for it.*

</div>
