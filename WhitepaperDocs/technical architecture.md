# AVAJAZ: Technical Architecture
### Avalanche-Native Infrastructure for Decentralized CBO Impact Verification


---

## 1. Executive Summary

AVAJAZ is built natively on Avalanche's C-Chain, leveraging EVM compatibility for rapid development, low transaction costs for micro-reward distribution, and high throughput for seasonal verification surges. The architecture is designed around four core principles: modularity (each component can be upgraded independently), composability (outputs feed into external carbon, ESG, and DeFi systems), accessibility (smartphone-first for rural CBO members), and fraud resistance (layered on-chain and off-chain defenses).

This document describes the full technical stack — smart contract architecture, agent framework, on-chain vs. off-chain design decisions, oracle integration, and Avalanche-specific advantages — for the AVAJAZ MVP and its planned evolution.

---

## 2. System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│   Android App · WhatsApp Bot · Telegram Bot             │
│   (Smartphone-first, social platform entry points)      │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS / WebSocket
┌──────────────────────▼──────────────────────────────────┐
│                   API GATEWAY                           │
│   REST API · Auth (JWT + wallet sig) · Rate limiting    │
│   Geo-validation · Media processing · AI anomaly check  │
└──────────────────────┬──────────────────────────────────┘
                       │
         ┌─────────────┼──────────────┐
         │             │              │
┌────────▼──────┐ ┌────▼──────┐ ┌───▼────────────┐
│  VERIFICATION │ │  GAME     │ │  ORACLE        │
│  AGENT        │ │  ENGINE   │ │  INTEGRATION   │
│  Off-chain    │ │  Off-chain│ │  (Phase 2)     │
└────────┬──────┘ └────┬──────┘ └───┬────────────┘
         │             │            │
┌────────▼─────────────▼────────────▼────────────────────┐
│              AVALANCHE C-CHAIN (EVM)                    │
│                                                         │
│  ActivityRegistry.sol   VerificationContract.sol        │
│  NFTMintContract.sol    RewardDistribution.sol          │
│  StakingContract.sol    GameController.sol              │
│  TreasuryContract.sol   GovernanceContract.sol          │
└─────────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              STORAGE LAYER                              │
│   IPFS (NFT metadata) · PostgreSQL (off-chain index)    │
│   The Graph (on-chain indexing) · Redis (game state)    │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Smart Contract Architecture

All contracts deployed on Avalanche C-Chain. EVM-compatible Solidity. OpenZeppelin base libraries where applicable.

### 3.1 ActivityRegistry.sol

The foundational registry. Every CBO activity — tree, nursery batch, hive, ecotourism zone — is registered here before verification can begin.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

enum ActivityType { TREE, NURSERY_BATCH, BEEHIVE, ECOTOURISM_ZONE }

enum State {
    Unregistered,
    Registered,
    Stage1_Submitted,
    Stage2_PeerConfirmed,
    Stage3_Validated,
    Stage4_OracleAttested,
    Productized
}

struct Activity {
    uint256 id;
    ActivityType activityType;
    address groupLeader;
    address custodian;
    string geoHash;          // Encoded GPS position
    string cfaRegistration;  // KFS CFA registration number
    string metadataURI;      // IPFS pointer
    State currentState;
    uint256 stakedAmount;
    uint256 createdAt;
    uint256 lastUpdated;
}

mapping(uint256 => Activity) public activities;
mapping(address => uint256[]) public groupActivities;
uint256 public activityCount;

function registerActivity(
    ActivityType _type,
    string calldata _geoHash,
    string calldata _cfaRegistration,
    string calldata _metadataURI
) external payable returns (uint256);
```

**Key Design Decisions:**
- `cfaRegistration` field links every on-chain record to an existing KFS government record
- `geoHash` uses Geohash encoding (precision 7 = ~76m accuracy) sufficient for field verification
- Stake paid at registration; returned only upon successful verification or slashed for fraud

---

### 3.2 VerificationContract.sol

Manages the multi-stage state machine for each activity type. Enforces peer quorum requirements and triggers state transitions.

```solidity
struct VerificationSubmission {
    uint256 activityId;
    address submitter;
    string evidenceURI;     // IPFS: photo/video/GPS log
    string geoHash;         // Must match activity geoHash within tolerance
    uint256 timestamp;
    VerificationMethod method; // PHOTO, VIDEO, GPS_CHECKIN, BATCH_RECORD
    uint8 qualityScore;     // Set by off-chain AI agent (0-100)
    bool isPeerVerification;
}

// Quorum requirements per activity type
mapping(ActivityType => uint8) public peerQuorumRequired;
// TREE: 2 peer confirmations
// NURSERY_BATCH: 1 peer + 1 CFA admin confirmation
// BEEHIVE: 1 peer confirmation per stage
// ECOTOURISM_ZONE: 2 peer + quarterly oracle update

function submitVerification(
    uint256 activityId,
    string calldata evidenceURI,
    string calldata geoHash,
    VerificationMethod method
) external;

function confirmAspeer(
    uint256 activityId,
    uint256 submissionId
) external;

function _checkQuorumAndAdvanceState(
    uint256 activityId
) internal;
```

**Fraud Prevention Logic:**
- `geoHash` distance check: submission rejected if > 100m from registered activity location
- Duplicate evidence detection: `evidenceURI` hash stored; resubmission of same IPFS hash blocked
- Peer verifier must be from a different user group (checked against `groupActivities` mapping)
- Cooldown period between stage submissions prevents rapid-fire farming

---

### 3.3 NFTMintContract.sol

ERC-721 compliant. ERC-2981 royalty standard. Automated mint triggered by VerificationContract state advancement.

```solidity
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract AVAJAZActivityNFT is ERC721, IERC2981 {

    struct ActivityNFT {
        uint256 activityId;
        ActivityType activityType;
        string metadataURI;    // Full digital twin on IPFS
        uint256 mintedAt;
        address originalCustodian;
    }

    mapping(uint256 => ActivityNFT) public nftData;

    // Called automatically by VerificationContract when state = Productized
    function mintActivityNFT(
        uint256 activityId,
        ActivityType activityType,
        address custodian,
        string calldata metadataURI
    ) external onlyVerificationContract returns (uint256 tokenId);

    // ERC-2981: 5% royalty on secondary sales
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view returns (address receiver, uint256 royaltyAmount);
}
```

---

### 3.4 RewardDistribution.sol

Automated AVAX distribution triggered by successful verification stage completions. Configurable split ratios per activity type.

```solidity
struct RewardSplit {
    uint8 primaryVerifierPercent;   // Default: 70%
    uint8 peerVerifiersPercent;     // Default: 20% (split equally among peers)
    uint8 cfaTreasuryPercent;       // Default: 10%
}

struct MintRewardSplit {
    uint8 custodianPercent;         // Default: 55%
    uint8 peerVerifiersPercent;     // Default: 25%
    uint8 cfaTreasuryPercent;       // Default: 10%
    uint8 protocolTreasuryPercent;  // Default: 10%
}

function distributeVerificationReward(
    uint256 activityId,
    address primaryVerifier,
    address[] calldata peerVerifiers
) external onlyVerificationContract;

function distributeMintReward(
    uint256 tokenId,
    address custodian,
    address[] calldata peerVerifiers
) external onlyNFTContract;
```

---

### 3.5 StakingContract.sol

Manages verification stakes and game stakes across all four game systems. Enforces capital preservation rules for games.

```solidity
// Verification staking: can be slashed for fraud
mapping(address => uint256) public verificationStakes;

// Game staking: NEVER slashed (capital preservation)
mapping(address => mapping(GameType => uint256)) public gameStakes;
mapping(address => mapping(uint256 => uint256)) public chronoSiegeLocks; // activityId => unlockTimestamp

enum GameType { CHESS, PREDICTION_MARKET, CHRONO_SIEGE, SHADOW_SYNDICATE }

function stakeForVerification(uint256 activityId) external payable;
function stakeForGame(GameType game, uint256 amount) external;
function lockForChronoSiege(uint256 territoryId, uint256 amount) external;

// Capital preservation: game losses return stake, never reduce it
function resolveGameOutcome(
    address player,
    GameType game,
    bool won,
    uint256 rewardAmount
) external onlyGameController;
```

---

### 3.6 GameController.sol

Coordinates all four game systems. Enforces capital preservation universally.

```solidity
// Chess: outcome resolution
function resolveChessMatch(
    address winner,
    address loser,
    uint256 stakeAmount,
    uint256 rewardFromPool
) external onlyGameOracle;

// Prediction Markets: settlement
function settlePrediction(
    uint256 marketId,
    bool outcomeCorrect,
    address predictor,
    uint256 stakedAmount,
    uint256 rewardFromPool
) external onlyOracleOrAdmin;

// Chrono Siege: territory release
function releaseTerritory(
    uint256 territoryId,
    address[] calldata holders,
    uint256[] calldata stakes,
    uint256 totalPassiveReward
) external; // Auto-triggered at 7-day mark

// Shadow Syndicate: treasury operations
function executeProposal(
    uint256 proposalId,
    bool passed,
    address[] calldata voters
) external onlyGovernance;
```

---

## 4. On-Chain vs. Off-Chain Design Decisions

| Component | Location | Rationale |
|---|---|---|
| Activity registration | On-chain | Permanent, immutable, government-linkable |
| State transitions | On-chain | Trustless, auditable |
| Reward distribution | On-chain | Trustless, transparent |
| NFT minting + metadata hash | On-chain | Permanent provenance anchor |
| NFT full metadata (JSON) | IPFS (off-chain) | Cost efficiency; hash anchored on-chain |
| Photo/video evidence files | IPFS (off-chain) | Storage cost; hash anchored on-chain |
| Geo-validation logic | Off-chain (API gateway) | Flexible; AI-assisted; reduces gas costs |
| AI anomaly detection | Off-chain (agent) | Compute-intensive; not suited for on-chain |
| Game state (Chess, real-time) | Off-chain (Redis) | Latency requirements for real-time play |
| Game outcomes | On-chain | Final settlement trustless |
| Oracle data feeds | Off-chain → on-chain push | Standard oracle pattern |
| User reputation scores | On-chain (computed) | Governance weight requires on-chain anchor |

---

## 5. Agent Framework

Three off-chain agents handle compute-intensive tasks before submitting verified results on-chain.

### 5.1 Verification Agent
**Function:** Processes incoming photo/video/GPS submissions before they reach the smart contract.

- Extracts and validates GPS EXIF data from uploaded images
- Checks GPS coordinates against registered activity geoHash (100m tolerance)
- Runs duplicate image detection (perceptual hash comparison)
- Runs AI anomaly scoring (lighting consistency, background analysis, timestamp plausibility)
- Assigns `qualityScore` (0–100) written to VerificationContract on submission
- Flags suspicious submissions for CFA administrator review

**Technology Stack:** Python · FastAPI · TensorFlow Lite (mobile-weight anomaly model) · IPFS client

### 5.2 Oracle Agent (Phase 2)
**Function:** Fetches external data and submits signed attestations to VerificationContract.

- Weather data: OpenWeatherMap / ERA5 (rainfall, temperature)
- Satellite imagery: Sentinel-2 / Planet Labs (canopy cover, land use change detection)
- Commodity prices: commodity data APIs (honey, timber, coffee market prices)
- Submits signed oracle transactions to VerificationContract for Stage 4 attestation

**Technology Stack:** Python · Chainlink node (custom job) · Web3.py

### 5.3 Game Agent
**Function:** Manages game state and submits outcome settlements to GameController.

- Chess: interfaces with Stockfish engine for AI opponents; manages ELO calculations; submits match outcomes on-chain
- Prediction Markets: monitors oracle feeds for market resolution triggers; submits settlement transactions
- Chrono Siege: tracks 7-day lock timers; auto-triggers territory release at expiry
- Shadow Syndicate: manages proposal lifecycle; submits vote tallies on-chain

**Technology Stack:** Node.js · Stockfish.js · Redis (real-time game state) · Web3.js

---

## 6. Oracle Integration

### Phase 1 (MVP — Simulated)
Oracle inputs are simulated by CFA administrators entering verified data manually. This maintains the verification logic while removing oracle dependency during MVP.

### Phase 2 (Live Oracles)

| Data Feed | Source | Update Frequency | Contract Consumer |
|---|---|---|---|
| Rainfall data | OpenWeatherMap API | Daily | VerificationContract (Stage 4) |
| NDVI / Canopy cover | Sentinel-2 (ESA) | 10-day cycle | VerificationContract (Stage 4) |
| Honey market price | AgriMarket Kenya API | Weekly | GameController (Prediction Markets) |
| Coffee / commodity price | World Bank API | Daily | GameController (Prediction Markets) |

All oracle submissions are signed by the Oracle Agent's private key. VerificationContract validates signature before accepting data. Multi-source aggregation planned for Phase 3 to remove single oracle point of failure.

---

## 7. Avalanche-Specific Advantages

| Feature | How AVAJAZ Uses It |
|---|---|
| **Sub-second finality** | Verification reward confirmations feel instant on mobile; critical for CBO user adoption |
| **Low gas fees** | Micro-rewards (Ksh 50–200 equivalent) remain economically meaningful after gas |
| **EVM compatibility** | Full Solidity + OpenZeppelin stack; no reinvention; existing audit tooling applies |
| **C-Chain throughput** | Handles seasonal verification surges (post-rains planting confirmation windows) without congestion |
| **Avalanche Subnets** | Phase 4: AVAJAZ Impact Subnet with custom gas token, KFS government node, dedicated ESG data infrastructure |
| **Warp Messaging** | Future: cross-subnet communication between AVAJAZ Impact Subnet and C-Chain DeFi ecosystem |

---

## 8. Security Assumptions

| Threat | Assumption | Mitigation |
|---|---|---|
| Smart contract exploit | Contracts may contain vulnerabilities | OpenZeppelin base contracts; third-party audit before mainnet; staged rollout |
| Oracle manipulation | Single oracle source can be corrupted | Multi-source aggregation (Phase 3); CFA admin override for outliers |
| Sybil attack | One actor creates many wallets | CFA-linked wallet registration; reputation tied to verified activity history |
| GPS spoofing | Fake GPS coordinates submitted | 100m geo-tolerance; AI plausibility check; peer confirmation requirement |
| Stake griefing | Malicious actor flags legitimate submissions | Dispute resolution requires stake from accuser; false flags penalized |
| Reentrancy | Classic EVM vulnerability | ReentrancyGuard on all value-transferring functions |

---

## 9. Hackathon MVP Technical Scope

| Component | Status | Notes |
|---|---|---|
| ActivityRegistry.sol | ✅ Deployed (testnet) | All four activity types |
| VerificationContract.sol | ✅ Deployed (testnet) | Tree + nursery full; beehive + eco simulated |
| NFTMintContract.sol (ERC-721 + ERC-2981) | ✅ Deployed (testnet) | — |
| RewardDistribution.sol | ✅ Deployed (testnet) | AVAX testnet token |
| StakingContract.sol | ✅ Deployed (testnet) | Capital preservation enforced |
| GameController.sol | ✅ Deployed (testnet) | Chess + basic prediction market |
| Verification Agent (off-chain) | ✅ Running | GPS + duplicate detection live |
| Oracle Agent | 🔵 Simulated | Manual CFA admin input |
| Game Agent | ✅ Running | Chess engine + ELO calculation |
| IPFS metadata storage | ✅ Live | NFT metadata pinned |
| The Graph indexing | 🔵 Partial | Basic activity query subgraph |

---

## 10. Roadmap

| Phase | Technical Milestone |
|---|---|
| **Phase 1** | MVP contracts stable on testnet. Verification Agent + Game Agent live. Android app beta. |
| **Phase 2** | Mainnet deployment. Live oracle integration. All four activity state machines active. The Graph full indexing. |
| **Phase 3** | Multi-source oracle aggregation. Reputation scoring on-chain. KFS data bridge API. |
| **Phase 4** | AVAJAZ Impact Subnet launch. Custom gas token. Government node integration. Warp Messaging to C-Chain. |