# AVAJAZ: Verification Model
### Proof of Impact Protocol — Decentralized Lifecycle Validation for CBO Forest Activities



---

## 1. Executive Summary

The AVAJAZ Verification Protocol establishes a decentralized, stake-backed framework for validating the ecological work of CFA user groups as verifiable economic assets. The protocol is designed around four primary CBO activity types — seedling nurseries, agroforestry/tree planting, beekeeping, and ecotourism — each with its own verification state machine adapted to the realities of that activity's lifecycle.

Traditional approaches to CBO activity verification rely on infrequent government field visits, paper-based records, and self-reported data that no market actor can independently confirm. AVAJAZ replaces this with a distributed, incentivized, smartphone-based verification system where CBO members, peer groups, and community validators collectively confirm impact — earning AVAX rewards for every accurate submission.

**Verification is not a government visit. It is a continuously running community process.**

---

## 2. Problem Statement

### 2.1 Paper Records Cannot Access Digital Markets
CFA user groups maintain activity logs, membership registers, and seasonal reports — typically on paper or in basic spreadsheets submitted to KFS. These records are invisible to carbon registries, ESG platforms, premium commodity buyers, and conservation finance institutions that require machine-readable, auditable, tamper-proof data.

### 2.2 Government Field Visits Cannot Scale
KFS has limited field staff relative to the number of registered CFAs and active user groups. Meaningful verification of nursery batch quality, tree survival rates, hive health, or biodiversity in ecotourism zones is operationally impossible at national scale through official channels alone. Verification work sits undone.

### 2.3 No Incentive for Peer Verification
CBO members have local knowledge that could verify each other's activities accurately and efficiently. A beekeeping group member knows which hives are active. A neighboring planting group can confirm tree survival on a nearby farm. But no mechanism currently exists to capture, reward, or record this distributed knowledge.

### 2.4 Activity Types Require Different Verification Logic
A seedling nursery batch has a different verification lifecycle than a standing tree, a hive, or an ecotourism trail. Generic verification systems fail because they cannot accommodate this diversity. AVAJAZ builds activity-specific state machines that match the biological and operational reality of each CBO type.

---

## 3. Design Principles

| Principle | Description |
|---|---|
| **Activity-Specific** | Each CBO type has its own verification workflow matching its ecological lifecycle |
| **Community-First** | CBO members and peer groups are primary verifiers, not external auditors |
| **Smartphone-Native** | All verification methods work on Android smartphones with standard connectivity |
| **Economic Alignment** | Every accurate verification earns AVAX rewards; fraud loses stake |
| **Government-Compatible** | Verification records are structured to complement, not replace, KFS reporting requirements |
| **Fraud-Resistant** | Geo-binding, timestamping, stake-slashing, and peer quorum form layered defenses |

---

## 4. Universal Verification Infrastructure

All four activity types share a common technical foundation before diverging into activity-specific flows.

### 4.1 CBO Group Registration
Before any activity verification can begin, the CFA user group registers on AVAJAZ:

- KFS CFA registration number (links to government record)
- User group type (nursery / planting / beekeeping / ecotourism)
- Group leader wallet address
- GPS boundary of activity zone
- Member roster (wallet addresses or phone numbers for gasless onboarding)

Registration on AVAJAZ inherits the trust of existing KFS registration — no group can register a zone that conflicts with their official CFA boundaries.

### 4.2 Verification Actor Roles

| Actor | Role | Incentive |
|---|---|---|
| **Group Member** | Submits activity proof (photo/video/GPS check-in) | Primary AVAX reward |
| **Peer Verifier** | Member of another user group within same CFA confirms submission | Secondary AVAX reward |
| **CFA Administrator** | Spot-checks and escalates disputes; links to KFS records | Reputation + governance weight |
| **Oracle Agent** | External data confirmation (satellite, weather, market price feeds) | Protocol-funded (Phase 2) |
| **Smart Contract** | Automated state transition enforcement | Trustless (no incentive needed) |

### 4.3 Verification Input Methods
All methods supported on Android smartphones with standard mobile data:

| Method | Description | Best Used For |
|---|---|---|
| **Geotagged Photo** | Timestamped image with GPS coordinates | Trees, seedlings, hive locations, trail markers |
| **Geotagged Video** | Short video (30–90 seconds) with location lock | Growth progression, hive activity, visitor experience |
| **GPS Check-In** | Location confirmation without media (for routine presence verification) | Ecotourism trail monitoring, hive visit logging |
| **Batch Submission** | Group leader submits consolidated record for multiple items | Nursery batch handover, seasonal planting totals |

---

## 5. Activity-Specific Verification State Machines

---

### 5.1 Seedling Nursery Verification

**Lifecycle:** Propagation → Hardening → Batch Certification → Handover → Destination Confirmation

```
Unregistered → Batch Registered → Propagation Confirmed → 
Hardening Verified → Batch Certified → Handed Over → Destination Confirmed
```

**Stage Details:**

| Stage | Actor | Evidence Required | Output |
|---|---|---|---|
| Batch Registration | Group Leader | Species list, target quantity, propagation date, nursery GPS | Batch record on-chain |
| Propagation Confirmed | Group Member | Photo of seedling trays with GPS tag | Stake locked; awaits peer confirmation |
| Hardening Verified | Peer Verifier | Photo after hardening period showing survival count | Partial reward released |
| Batch Certified | CFA Administrator | Spot-check confirmation; species accuracy score | Certification record anchored |
| Handed Over | Group Leader + Recipient | GPS-confirmed handover location; recipient wallet signs | NFT minted for batch |
| Destination Confirmed | Recipient / Planting Group | Photo of seedlings at planting site | Full reward distributed |

**Market Value Unlocked:** Verified native species batches qualify for government reforestation contracts, NGO planting programs, and carbon project seedling supply agreements that require certified provenance.

---

### 5.2 Agroforestry / Tree Planting Verification

**Lifecycle:** Registration → Planting Proof → Survival Milestones → Mature Validation → Product Activation

```
Unregistered → Registered → Planted → 6-Month Confirmed → 
12-Month Confirmed → Validated → Productized
```

**Stage Details:**

| Stage | Actor | Evidence Required | Output |
|---|---|---|---|
| Registration | Group Member / Farmer | GPS coordinates, species, planting date, custodian ID | Tree record on-chain; planter stake locked |
| Planting Proof | Group Member | Geotagged photo within 50m of registered GPS point | Submission anchored; peer review triggered |
| 6-Month Survival | Peer Verifier | Updated geotagged photo; survival count confirmation | Partial reward; custodian score updated |
| 12-Month Confirmation | Peer Verifier + Oracle | Photo + weather data cross-reference | Growth milestone recorded |
| Mature Validation | Oracle Attestation | Satellite imagery confirmation; ESG compliance check | Tree validated |
| Product Activation | Smart Contract (automated) | State = Validated | NFT minted; full reward distributed |

**Fraud Prevention:** GPS binding requires submission within 50 meters of registered location. Duplicate image detection via AI. Peer quorum of 2 independent verifiers required before state advances past Planting Proof.

---

### 5.3 Beekeeping Verification

**Lifecycle:** Hive Registration → Active Confirmation → Habitat Verification → Harvest Documentation → Product Certification

```
Unregistered → Hive Registered → Activity Confirmed → 
Habitat Verified → Harvest Documented → Product Certified
```

**Stage Details:**

| Stage | Actor | Evidence Required | Output |
|---|---|---|---|
| Hive Registration | Group Member | GPS hive location, hive type (log/Langstroth), installation date | Hive record on-chain |
| Activity Confirmed | Group Member | Photo/video showing hive activity (bee presence, comb evidence) | Stake locked; peer review triggered |
| Habitat Verified | Peer Verifier | Photo of surrounding forest vegetation; canopy cover estimate | Habitat quality score recorded |
| Harvest Documented | Group Member | Photo of harvest activity; weight recorded; date anchored | Harvest batch record created |
| Product Certified | CFA Administrator | Spot-check confirmation; lab test result upload (if available) | Forest-honey NFT minted |

**Key Design Choice:** Habitat verification is a distinct stage because forest-honey credentials depend on the surrounding ecosystem, not just the hive. Verifying canopy cover and indigenous vegetation near each hive is what makes the "forest-origin" claim auditable — and premium-worthy.

**Market Value Unlocked:** Forest-origin certified honey with documented sustainable harvesting practices commands 3–4x commodity price from specialty buyers, fair-trade networks, and export markets.

---

### 5.4 Ecotourism Verification

**Lifecycle:** Zone Registration → Asset Documentation → Trail/Facility Verification → Biodiversity Confirmation → Experience Certification

```
Unregistered → Zone Registered → Assets Documented → 
Infrastructure Verified → Biodiversity Confirmed → Zone Certified
```

**Stage Details:**

| Stage | Actor | Evidence Required | Output |
|---|---|---|---|
| Zone Registration | Group Leader | GPS boundary of ecotourism zone, CFA linkage, activity type | Zone record on-chain |
| Assets Documented | Group Member | Geotagged photos of key assets (viewpoints, trails, water features, signage) | Asset registry created |
| Infrastructure Verified | Peer Verifier | Confirmation photos of trails, campsites, facilities | Infrastructure quality score |
| Biodiversity Confirmed | Group Member + Oracle | Species sighting records; canopy cover photos; bird/mammal checklists | Biodiversity index calculated |
| Zone Certified | CFA Administrator + Oracle | Aggregated asset quality review; compliance with KFS ecotourism guidelines | Zone NFT minted |

**Ongoing Verification:** Ecotourism zones require quarterly reverification (GPS check-ins + biodiversity updates) to maintain active certification status. This creates recurring reward opportunities for group members year-round.

**Market Value Unlocked:** Certified ecotourism zones qualify for international booking platforms, conservation funding programs, carbon tourism credits, and premium eco-lodge partnership agreements.

---

## 6. Cross-Activity Verification (The CFA Advantage)

Because AVAJAZ operates at the CFA level — not just the individual group level — it can enable cross-group verification that strengthens the entire ecosystem:

- A **beekeeping group** verifying canopy cover also contributes data to the **planting group's** tree survival records in the same zone
- A **nursery group** delivering seedlings to a **planting group** creates a verified supply chain between the two groups' records
- An **ecotourism group's** biodiversity data enriches the **beekeeping group's** habitat verification for the same forest area

This cross-pollination creates denser, more credible ecological data — and distributes verification rewards across the CFA network rather than siloing them within individual groups.

---

## 7. Smart Contract Architecture

### ActivityRegistry.sol
```solidity
struct Activity {
    uint256 id;
    address groupLeader;
    ActivityType activityType; // NURSERY, PLANTING, BEEKEEPING, ECOTOURISM
    string geoHash;
    string metadataURI;
    State currentState;
    uint256 stakeAmount;
}

enum ActivityType { NURSERY, PLANTING, BEEKEEPING, ECOTOURISM }

enum State {
    Unregistered, Registered, Stage1, Stage2,
    Stage3, Stage4, Validated, Productized
}
```

### VerificationContract.sol
- Stake requirement before submission accepted
- Peer quorum threshold per activity type (configurable by CFA administrators)
- State transition triggers reward distribution
- Dispute flag pauses state transition pending CFA administrator review

### NFTMintContract.sol
```solidity
if (activity.currentState == State.Validated) {
    mintActivityNFT(activityId, metadataURI);
}
```

### RewardDistribution.sol
```solidity
// Per verification submission
// Primary verifier: 70%
// Peer verifier(s): 20% (split equally)
// CFA treasury: 10%
```

---

## 8. Fraud Prevention

| Risk | Mechanism |
|---|---|
| GPS spoofing | Geo-hash binding + 50m tolerance enforcement |
| Photo reuse | AI duplicate detection across all submissions |
| Collusion between group members | Peer verifier must be from a different user group within the CFA |
| False species claims | CFA administrator spot-check; optional lab test upload for nursery batches |
| Hive inflation | Physical hive count cross-referenced with group membership size limits |
| Sybil attack | Verification rights require CFA-linked wallet registration |

---

## 9. Hackathon MVP Scope

| Component | Status |
|---|---|
| Activity registration (all four types) | ✅ Implemented |
| Tree planting state machine (full 6 stages) | ✅ Implemented |
| Nursery batch state machine (basic) | ✅ Implemented |
| Peer verification quorum logic | ✅ Implemented |
| NFT mint trigger on validation | ✅ Implemented |
| Reward distribution contract | ✅ Implemented |
| Beekeeping state machine | 🔵 Simulated |
| Ecotourism state machine | 🔵 Simulated |
| Oracle integration | 🔵 Simulated |
| KFS/Jaza Miti data bridge | 📋 Roadmap |

---

## 10. Roadmap

| Phase | Description |
|---|---|
| **Phase 1** | Tree planting + nursery verification live. Beekeeping + ecotourism simulated. Manual peer quorum. |
| **Phase 2** | All four activity state machines live. Oracle integration. Satellite imagery cross-reference. |
| **Phase 3** | Cross-activity verification enabled. CFA-level reputation scoring. KFS data bridge operational. |
| **Phase 4** | DAO-governed verification parameters. Community-proposed oracle sources. Continental expansion. |