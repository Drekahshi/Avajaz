# AVAJAZ: Product Model
### CBO Forest Products as Economic Assets — Digital Traceability for Verified Community Commodities


---

## 1. Executive Summary

The AVAJAZ Product Model transforms the outputs of CFA user group activities — seedling batches, standing trees, forest honey, and ecotourism experiences — from invisible community work into verifiable, tradable digital assets.

Every verified activity generates a permanent digital twin: an on-chain NFT record documenting the complete lifecycle of that asset, from origin and stewardship through to market. This traceability chain enables CBO members to access premium markets, carbon registries, and conservation finance instruments that have historically been closed to smallholder community groups for one reason: inability to prove what they do.

AVAJAZ does not create new CBO activities. It makes existing ones economically visible.

---

## 2. Problem Statement

### 2.1 Community Products Have No Provenance Chain
A seedling from Wanjiku's nursery group and a seedling from an uncertified roadside vendor look identical at the point of sale. A jar of honey from Zawadi's forest beekeeping group and honey from a conventional hive are indistinguishable on a market shelf. Without provenance documentation, sustainable community production cannot command the premium it deserves.

### 2.2 Premium Markets Require Documentation CBO Groups Cannot Produce
International specialty coffee buyers, fair-trade certifiers, biodiversity credit platforms, and conservation finance institutions all require documentation packages that community groups currently cannot generate: species-certified seedling records, geo-referenced hive locations, forest canopy health data, carbon sequestration calculations, and auditable chain-of-custody for every commodity batch. AVAJAZ generates all of this as a byproduct of its verification protocol.

### 2.3 ESG Compliance Demand Is Growing
The EU Deforestation Regulation (EUDR), SEC climate disclosure requirements, and corporate net-zero commitments create growing institutional demand for verified sustainable sourcing. African CBO forest products are perfectly positioned to meet this demand — if they can produce the documentation. They currently cannot. AVAJAZ closes this gap.

### 2.4 Carbon and Biodiversity Markets Are Expanding
Voluntary carbon markets and emerging biodiversity credit markets present enormous revenue opportunities for community forest stewards. But accessing these markets requires verified, geo-referenced, time-stamped ecological data that most CBO groups have no system to generate. AVAJAZ's verification protocol produces this data as a standard output.

---

## 3. Design Principles

| Principle | Description |
|---|---|
| **Traceability First** | Every asset record documents the complete journey, not just the endpoint |
| **CBO Economic Sovereignty** | Value flows to the community members who created it, not intermediaries |
| **Market Alignment** | Metadata structures designed for actual buyer due diligence requirements |
| **Activity Diversity** | Product model covers all four CBO activity outputs, not just trees |
| **Composability** | NFTs integrate with DeFi, carbon registries, and commodity exchanges |
| **Permanence** | On-chain records are immutable; stewardship history cannot be altered |

---

## 4. The Four CBO Product Types

---

### 4.1 Verified Seedling Batches (Nursery Groups)

**What Gets Minted:** A Seedling Batch NFT representing a verified group of propagated seedlings ready for handover.

**Digital Twin Metadata:**
```json
{
  "batch_id": "AVAJAZ-NURSERY-KE-00821",
  "nursery_group": "Karura CFA Nursery Group",
  "cfa_registration": "KFS-CFA-NRB-0047",
  "group_leader": "0xWanjikuWallet",
  "propagation_date": "2025-03-01",
  "handover_date": "2025-06-15",
  "species": [
    {"name": "Croton megalocarpus", "count": 3000, "indigenous": true},
    {"name": "Grevillea robusta", "count": 5000, "indigenous": false},
    {"name": "Markhamia lutea", "count": 2000, "indigenous": true}
  ],
  "survival_rate_at_handover": 0.94,
  "nursery_gps": "-1.2481, 36.8083",
  "destination_gps": "-0.9167, 36.7500",
  "verification_record": [...]
}
```

**Market Value Unlocked:**

| Buyer Type | Requirement Met | Price Advantage |
|---|---|---|
| Government reforestation programs | Certified native species provenance | Contract eligibility |
| NGO planting programs | Verified survival rate at handover | Preferred supplier status |
| Carbon project developers | Documented species diversity | Project credibility |
| Corporate tree-planting CSR programs | Auditable supply chain | Premium per seedling |

---

### 4.2 Verified Standing Trees (Agroforestry / Planting Groups)

**What Gets Minted:** An individual Tree NFT or Tree Portfolio NFT (for farm-level bundles) upon completion of full lifecycle verification.

**Digital Twin Metadata:**
```json
{
  "tree_id": "AVAJAZ-TREE-KE-00047821",
  "farmer_group": "Nandi CFA Agroforestry Group",
  "cfa_registration": "KFS-CFA-NDI-0031",
  "custodian": "0xKamauWallet",
  "species": "Grevillea robusta",
  "planting_date": "2024-04-10",
  "gps_coordinates": "0.1833, 35.1167",
  "verification_history": [
    {"stage": "Planting Proof", "date": "2024-04-11", "method": "geotagged_photo", "verifier": "peer_group_member"},
    {"stage": "6-Month Survival", "date": "2024-10-15", "method": "geotagged_photo", "quality_score": 96},
    {"stage": "12-Month Confirmation", "date": "2025-04-10", "method": "geotagged_photo + oracle", "quality_score": 98}
  ],
  "sustainability_attributes": {
    "carbon_sequestration_kg": 42.7,
    "water_conservation": true,
    "organic_methods": true,
    "no_deforestation_certified": true
  },
  "harvest_traceability": {
    "expected_harvest_year": 2029,
    "commodity_type": "timber / agroforestry_product"
  }
}
```

**Market Value Unlocked:**

| Market | Revenue Type | Requirement Met |
|---|---|---|
| Voluntary Carbon Market | Carbon credit issuance | Geo-referenced sequestration data |
| EU Deforestation Regulation (EUDR) | Compliance documentation | No-deforestation + traceability chain |
| Sustainable timber buyers | 20–40% price premium | Verified origin + practice documentation |
| Impact investors | Portfolio asset | Auditable growth milestones |

---

### 4.3 Verified Forest Honey (Beekeeping Groups)

**What Gets Minted:** A Honey Harvest NFT representing a verified seasonal harvest batch from documented forest hives.

**Digital Twin Metadata:**
```json
{
  "harvest_id": "AVAJAZ-HONEY-KE-00234",
  "beekeeping_group": "Arabuko-Sokoke CFA Beekeeping Group",
  "cfa_registration": "KFS-CFA-KLF-0018",
  "group_secretary": "0xZawadiWallet",
  "harvest_date": "2025-08-20",
  "hive_locations": [
    {"hive_id": "H-047", "gps": "-3.3167, 39.9833", "type": "log_hive"},
    {"hive_id": "H-048", "gps": "-3.3172, 39.9841", "type": "log_hive"}
  ],
  "habitat_verification": {
    "canopy_cover_percent": 78,
    "indigenous_vegetation": true,
    "nearest_agriculture_m": 450,
    "forest_health_score": 0.87
  },
  "harvest_data": {
    "total_weight_kg": 124,
    "sustainable_harvest_threshold_respected": true,
    "harvesting_method": "traditional_log_hive"
  },
  "certifications": ["forest_origin", "sustainable_harvest", "no_pesticide_zone"]
}
```

**Market Value Unlocked:**

| Market | Current Price (Ksh/kg) | Verified Price (Ksh/kg) | Uplift |
|---|---|---|---|
| Generic local market | 300 | — | Baseline |
| Specialty domestic buyers | — | 600–800 | 2–2.7x |
| Export specialty buyers | — | 800–1,200 | 2.7–4x |
| Fair-trade / organic certification | — | 1,000–1,500 | 3.3–5x |

---

### 4.4 Verified Ecotourism Zones (Ecotourism Groups)

**What Gets Minted:** An Ecotourism Zone NFT representing a certified community-managed nature experience area, updated quarterly.

**Digital Twin Metadata:**
```json
{
  "zone_id": "AVAJAZ-ECO-KE-00089",
  "ecotourism_group": "Kakamega CFA Ecotourism Group",
  "cfa_registration": "KFS-CFA-KKM-0022",
  "zone_manager": "0xBarakaWallet",
  "zone_gps_boundary": "0.3500, 34.8500 [polygon]",
  "last_verified": "2025-09-01",
  "biodiversity_data": {
    "bird_species_recorded": 47,
    "mammal_species_recorded": 12,
    "indigenous_tree_species": 34,
    "canopy_cover_percent": 82
  },
  "infrastructure": {
    "trails_km": 8.4,
    "campsites": 2,
    "visitor_facilities": ["pit_latrine", "picnic_area", "bird_hide"]
  },
  "visitor_impact": {
    "annual_visitors": 320,
    "average_stay_hours": 4.2,
    "leave_no_trace_compliance": true
  },
  "certifications": ["KFS_ecotourism_compliant", "biodiversity_verified", "community_managed"]
}
```

**Market Value Unlocked:**

| Opportunity | Requirement Met |
|---|---|
| International booking platforms (SafariBookings, Tripadvisor Experiences) | Verified biodiversity data + infrastructure record |
| Carbon tourism credits | Canopy and biodiversity data for nature-based offset programs |
| Conservation funding (USAID, EU, GEF) | Community management documentation + impact data |
| Premium eco-lodge partnerships | Certified zone with auditable visitor impact record |

---

## 5. NFT Minting Mechanics

### 5.1 Mint Trigger (Universal)
All four product types share the same automated mint trigger:
```solidity
if (activity.currentState == State.Validated) {
    mintActivityNFT(activityId, activityType, metadataURI);
    emit ProductActivated(activityId, activityType, block.timestamp);
}
```

### 5.2 Mint Fee Distribution

| Recipient | Share | Rationale |
|---|---|---|
| Primary custodian / group leader | 55% | Stewardship and documentation responsibility |
| Peer verifiers | 25% | Community verification contribution |
| CFA treasury | 10% | Group-level sustainability fund |
| Protocol treasury | 10% | AVAJAZ operational sustainability |

### 5.3 Secondary Sale Royalties
When any AVAJAZ asset NFT is resold:
- 5% royalty returned to protocol
- Split: 60% to original custodian group · 25% to ecosystem fund · 15% to protocol treasury

---

## 6. Ownership and Custodianship

AVAJAZ separates **ownership** from **custodianship** — reflecting CBO group realities where collective stewardship and individual economic rights must coexist.

| Role | Description | CBO Example |
|---|---|---|
| **Owner** | Holds the NFT; has economic rights to asset value and secondary sale proceeds | Beekeeping group cooperative wallet |
| **Custodian** | Responsible for ongoing stewardship and verification submissions; earns ongoing rewards | Individual group member assigned to specific hives or trees |

This enables cooperative ownership structures, impact investment by external parties while communities retain stewardship, and carbon credit arrangements where buyers hold offset rights without disrupting community land use.

---

## 7. ESG Reporting Output

Every AVAJAZ-verified asset generates exportable compliance documentation:

| Report Type | Content | Target Institution |
|---|---|---|
| Carbon Sequestration Report | Species, GPS, sequestration calculation per tree | Voluntary carbon registries (Verra, Gold Standard) |
| Deforestation-Free Certificate | No-deforestation attestation with geo-referenced evidence | EUDR due diligence packages |
| Biodiversity Impact Report | Species counts, canopy cover, habitat health scores | Biodiversity credit platforms, conservation funders |
| Sustainable Sourcing Audit | Full chain-of-custody from production to handover | Fair-trade certifiers, specialty buyers |
| Community Management Record | Group composition, activity history, KFS compliance | Development finance institutions |

---

## 8. Hackathon MVP Scope

| Feature | Status |
|---|---|
| Tree NFT with full metadata | ✅ Implemented |
| Nursery batch NFT (basic metadata) | ✅ Implemented |
| Automated mint trigger from verification state | ✅ Implemented |
| Mint fee distribution logic | ✅ Implemented |
| ERC-2981 royalty standard | ✅ Implemented |
| Honey harvest NFT | 🔵 Simulated |
| Ecotourism zone NFT | 🔵 Simulated |
| ESG report generation | 📋 Roadmap |
| Carbon registry integration | 📋 Roadmap |
| Secondary market integration | 📋 Roadmap |

---

## 9. Roadmap

| Phase | Description |
|---|---|
| **Phase 1** | Tree + nursery batch NFTs live. Basic ESG metadata from custodian declaration. |
| **Phase 2** | Honey harvest + ecotourism zone NFTs. Oracle-confirmed data. Carbon credit module. |
| **Phase 3** | ESG report generation. Carbon registry integration. EUDR compliance package. |
| **Phase 4** | Secondary market integrations. DeFi composability. Biodiversity credit platform connections. |