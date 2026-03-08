# AVAJAZ: Gamification Model
### Incentive-Aligned Engagement Architecture — Sustaining CBO Member Participation Year-Round

**Document Type:** Product Requirements Document (PRD)  
**Version:** 2.0  
**Audience:** All Stakeholders · Hackathon Judges · CBO Facilitators · Impact Investors  
**Status:** Draft

---

## 1. Executive Summary

CBO and CFA user groups face a fundamental engagement challenge: ecological activities are seasonal, but platform participation must be continuous to build verified track records, reputation, and market credibility.

A nursery group plants in March and harvests seedlings in June. A planting group's verification milestones fall at 6-month and 12-month intervals. A beekeeping group harvests twice a year. Between these activity peaks, there is no verification work to do — and without engagement, members disengage, reputation stagnates, and the network weakens.

AVAJAZ solves this with a four-game coordination system designed specifically for the rhythms of CBO life. Games fill the gaps between seasonal verification cycles, convert verification earnings into growing assets, and build the financial literacy and cooperative skills that make CBO groups stronger institutions over time.

The foundational principle is **capital preservation**: across all four games, CBO members never lose their principal stake through gameplay outcomes. Only upside exists. For community members with limited financial buffers, this is not a minor design choice — it is the difference between adoption and rejection.

---

## 2. Why CBO Groups Need Gamification

### 2.1 Seasonal Gaps Kill Engagement
CBO verification activities cluster around ecological events: rainy season planting, survival check windows, harvest periods. Between these peaks, members have no platform reason to engage. Without sustained engagement, reputation scores stagnate, peer verification networks weaken, and the social fabric that makes distributed verification work breaks down.

### 2.2 Verification Earnings Need a Home
When Zawadi earns AVAX for verifying hive locations, that reward sits idle unless there is a productive use for it within the platform. Without an engagement layer, members withdraw earnings immediately — removing the staked capital that secures verification quality and reducing their investment in platform success.

### 2.3 Financial Literacy Is a CBO Development Goal
CFA user groups are economic cooperatives. Their long-term success depends on members who can manage group finances, assess risk, allocate resources, and govern shared treasuries. AVAJAZ's games teach exactly these skills — through gameplay that is engaging, low-stakes, and culturally accessible — before members apply them in real cooperative governance.

### 2.4 Games Create Social Bonds Across User Groups
Cross-group gameplay — beekeeping members playing Chess against nursery members, ecotourism groups competing in Chrono Siege alliances — builds relationships across user group boundaries within a CFA. These social bonds directly strengthen the cross-group peer verification that makes the protocol more robust.

---

## 3. Universal Design Principle: Capital Preservation

**Across all four games, CBO members never lose their principal stake through gameplay outcomes.**

| Game Outcome | Result |
|---|---|
| Player wins | Stake grows |
| Player loses | Stake returned unchanged |
| Prediction correct | Stake grows proportionally |
| Prediction incorrect | Stake returned unchanged |
| Territory held | Stake returned + passive rewards |
| Territory contested | Stake returned (no loss) |

**Why This Matters for CBO Communities Specifically:**

CBO members in rural Kenya are not affluent risk-takers. For a beekeeping group member earning Ksh 800 from a verified hive check, that earnings represents real household income. A system that could take it away — even through fair gameplay — would never achieve adoption in these communities. Capital preservation removes the fear barrier entirely, enabling participation from members who would otherwise never engage with any staking mechanic.

This design also eliminates gambling classification under most regulatory frameworks — an important consideration for government-registered CBO groups with institutional relationships to protect.

---

## 4. The Four Game Systems

---

### 4.1 Chess Staking

**Primary CBO Purpose:** Daily engagement habit during inter-seasonal gaps. Financial confidence building.

**Core Mechanic:**
CBO members stake verification earnings to access ranked chess matches. Winning grows the stake. Losing returns it unchanged. Members play on their smartphones in the same app they use for verification submissions.

**CBO Context:** Chess is widely played across Kenya and East Africa, including in rural communities. It requires no cultural translation, is familiar to many CBO members already, and carries associations with strategic thinking and community respect. AVAJAZ Chess becomes a digital extension of existing social activity.

**Game Modes:**

| Mode | Description | Reward Range | CBO Member Appeal |
|---|---|---|---|
| **Standard Ranked** | Daily ELO-rated matches; 15–30 minutes | 1.0–1.3x stake | Routine daily habit |
| **ELO-Weighted** | Matched against harder opponents for higher rewards | 1.3–2.0x stake | Skill development |
| **Gauntlet Mode** | Win streaks with escalating prizes | 1.5–5.0x stake | Community bragging rights |
| **Time-Lock Chess** | Commit stake for 24–72 hours for multiplied rewards | 1.5–3.0x stake | Patient earners |

**Group Dynamics:** CFA-level leaderboards create friendly inter-group competition. Nursery group members tracking their Chess rankings against agroforestry group members builds cross-group social engagement that strengthens the verification peer network.

**Anti-Exploit Safeguards:**
- ELO rating prevents sandbagging
- Minimum stake requirements prevent dust attacks
- Cooldown periods between Gauntlet entries
- Daily match limits prevent platform gaming

---

### 4.2 Community Prediction Markets

**Primary CBO Purpose:** Domain knowledge application. Seasonal forecasting. Cross-group information sharing.

**Core Mechanic:**
CBO members stake on future outcomes relevant to forest ecology, commodity markets, and platform activity. Correct predictions grow the stake. Incorrect predictions return it intact. Markets are proposed and voted on by the community.

**Why CBO Members Have an Advantage:**
This is the game where CBO domain knowledge becomes a genuine competitive edge. A beekeeping group member who monitors Arabuko-Sokoke Forest daily has real signal about upcoming honey yields. A planting group coordinator who oversees 8,000 trees has accurate data on regional survival rates. An ecotourism group leader knows visitor patterns better than any external analyst.

AVAJAZ captures this distributed local intelligence as on-chain market data — creating an information layer with genuine agricultural and ecological value.

**CBO-Relevant Market Categories:**

| Category | Example Market | Who Has the Edge |
|---|---|---|
| **Tree Survival** | "What % of Nandi CFA trees survive the dry season?" | Planting group members |
| **Honey Yield** | "Will Arabuko-Sokoke honey harvest exceed 200kg this season?" | Beekeeping group members |
| **Seedling Demand** | "How many batches will Karura nursery group sell this quarter?" | Nursery group members |
| **Visitor Numbers** | "Will Kakamega ecotourism zone exceed 100 visitors this month?" | Ecotourism group members |
| **Rainfall Impact** | "Will below-average rainfall reduce Nandi tree survival below 80%?" | Any local forest group |
| **Commodity Prices** | "Will honey prices rise above Ksh 500/kg by December?" | Beekeeping + market-aware members |

**Game Modes:**

| Mode | Description | Reward Structure |
|---|---|---|
| **Community-Voted Markets** | CBO members propose and approve events | Standard reward pool |
| **Confidence-Weighted** | Assign probability 1–99%; accuracy earns scaled reward | Higher confidence = higher potential return |
| **Consensus Breaker** | Extra rewards for minority correct predictions | 2–5x standard reward |
| **Seasonal Leagues** | 3-month accuracy competitions between CFA groups | Reputation + bonus pool |

**Anti-Exploit Safeguards:**
- Market resolution requires oracle confirmation or community consensus (not self-reporting)
- Verifiers cannot participate in markets directly tied to activities they personally verified
- Minimum market duration prevents last-minute manipulation
- Market proposal requires minimum reputation score

---

### 4.3 Chrono Siege

**Primary CBO Purpose:** Capital commitment education. Cooperative planning. Alliance-building across user groups.

**Core Mechanic:**
CBO members stake tokens to control virtual territories for exactly 7 days. The commitment is immutable once made. Territory control earns passive rewards throughout the lock period. User groups can form alliances to control larger territories together.

**CBO Context:** The 7-day lock mirrors real CBO planning cycles — weekly group meetings, market days, planting windows. Members who play Chrono Siege learn to think about capital in weekly time horizons, which directly maps to the cooperative financial planning skills their user groups need.

**Territory Structure:**
The Chrono Siege map uses a loose geographic abstraction of Kenya's major forest zones — Mt. Kenya, Aberdare, Mau Forest, Kakamega, coastal forests. CBO groups naturally gravitate toward territories that correspond to their real forest zone, creating virtual representation of real community boundaries.

**Game Structure:**
```
Member stakes tokens → Territory assigned for 7 days (immutable)
         ↓
Passive rewards accumulate daily during lock
         ↓
Day 7: Lock expires → Stake returned + accumulated rewards
         ↓
Group discusses alliance strategy for next cycle
```

**Alliance Mechanics:**
- Up to 10 members from the same CFA can pool stakes into a shared territory
- Alliance coordination happens in-app and via linked WhatsApp/Telegram groups
- Successful alliance defense earns bonus rewards distributed proportionally
- Alliance formation encourages cross-group relationships within a CFA

**Reward Structure:**

| Scenario | Reward |
|---|---|
| Solo territory, uncontested | 2–4% of stake per 7-day cycle |
| Solo territory, successfully defended | 3–5% of stake |
| Alliance territory, uncontested | 3–5% per member proportionally |
| Alliance territory, successfully defended | 4–7% per member proportionally |

**Why 7 Days Is Immutable:**
The non-negotiable lock teaches that capital commitment has a time cost. You cannot change your mind. You must plan. This is exactly the financial discipline that enables CBO groups to manage shared treasuries, commit to seasonal investments, and govern group finances without impulsive withdrawals.

---

### 4.4 Shadow Syndicate

**Primary CBO Purpose:** Governance literacy. Trust assessment. Preparation for real DAO and cooperative governance.

**Core Mechanic:**
An elite 50-member governance simulation, invitation-only based on reputation earned in the first three games. Members manage a shared treasury. Among the 50, five are secret infiltrators. Loyalists grow the treasury through sound proposals. Infiltrators attempt sabotage through deceptive votes and proposals.

**CBO Governance Connection:**
This game is not entertainment. It is the most direct training tool AVAJAZ offers for real cooperative governance. CFA user groups govern shared natural resources, group finances, and collective decision-making daily. The skills Shadow Syndicate trains — reading proposals critically, assessing member trustworthiness, managing collective resources, detecting bad-faith actors — are identical to the skills required to run a healthy CBO.

Members who master Shadow Syndicate are being prepared for real governance roles within AVAJAZ's future DAO and within their own CBO institutional structures.

**Game Mechanics:**

| Element | Description |
|---|---|
| **Treasury** | Shared pool funded by member contributions + protocol allocation |
| **Proposals** | Any member submits governance proposals (treasury allocation, parameter changes) |
| **Voting** | Stake-weighted votes determine outcomes |
| **Infiltrators** | 5 of 50 members receive secret saboteur role each 30-day cycle |
| **Exposure** | Members can propose to expose suspected infiltrators; correct exposure earns reward |
| **Cycle Length** | 30 days |
| **Treasury Cap** | Infiltrator damage capped at 15% of treasury per cycle |

**Reputation Gate:**
Invitation requires demonstrated performance across all three prior games — minimum Chess ELO threshold, minimum Prediction Market accuracy score, and minimum Chrono Siege participation history. This ensures Shadow Syndicate is populated by experienced, economically aligned participants who are genuinely invested in the protocol.

**CBO Leadership Pipeline:**
Shadow Syndicate members are explicitly identified as the protocol's future governance pool. Consistent Loyalist performance over multiple cycles builds reputation that translates directly into DAO governance weight when AVAJAZ transitions to full decentralized governance.

---

## 5. Progressive Mastery Path for CBO Members

AVAJAZ's game progression maps directly to CBO member development stages:

```
Stage 1: Chess Staking
└─ CBO Member Skill Built: Financial confidence, daily digital engagement habit

Stage 2: Community Prediction Markets  
└─ CBO Member Skill Built: Probability thinking, domain knowledge monetization, market awareness

Stage 3: Chrono Siege
└─ CBO Member Skill Built: Capital planning, cooperative resource allocation, alliance coordination

Stage 4: Shadow Syndicate (invitation only)
└─ CBO Member Skill Built: Governance literacy, trust assessment, collective resource management
```

A CBO member who completes this progression has not just earned AVAX. They have developed the financial and cooperative management skills that make them a more effective user group member, committee leader, and community institution builder.

---

## 6. Between-Season Engagement Calendar

AVAJAZ games are designed to fill the specific gaps in CBO seasonal activity:

| Month | Primary CBO Activity | AVAJAZ Engagement |
|---|---|---|
| March–April | Long rains planting; nursery propagation begins | Heavy verification activity + Chess Staking |
| May–June | Seedling hardening; early tree survival checks | Prediction Markets (survival rate forecasting) |
| July–August | Dry season; honey harvest; ecotourism peak | Beekeeping verification + Chrono Siege (peak season) |
| September–October | Short rains planting; nursery handovers | Verification surge + Chess Gauntlet |
| November–December | Post-harvest; off-season for most groups | Shadow Syndicate cycle; Prediction Markets (price forecasting) |
| January–February | Dry season; minimal planting activity | Chess Staking + Chrono Siege (alliance building) |

Games are calibrated to intensify engagement precisely when verification activity is lowest — keeping members active, earning, and connected to the platform year-round.

---

## 7. Social Platform Integration

AVAJAZ meets CBO members where they already coordinate:

| Platform | AVAJAZ Integration | CBO Use Case |
|---|---|---|
| **WhatsApp** | Verification task notifications, reward confirmations, Chess challenge invites | Already used for group coordination |
| **Telegram** | Prediction Market discussions, Chrono Siege alliance channels | Tech-forward members; youth groups |
| **Facebook** | CFA leaderboards, seasonal league results, community milestones | Broader community visibility |

Members begin engaging with AVAJAZ mechanics through familiar group chat interfaces before interacting with wallets or blockchain interfaces. Wallet creation is introduced progressively as members accumulate real value worth managing.

---

## 8. Anti-Exploitation Framework

| Risk | Mitigation |
|---|---|
| Reward farming via multiple accounts | On-chain reputation tied to CFA-registered wallet; one wallet per member |
| Chess sandbagging | ELO rating system; sandbagging reduces future reward access |
| Market manipulation by group leaders | Oracle resolution; leaders cannot participate in markets for their own group's activities |
| Alliance monopoly in Chrono Siege | Alliance size cap (10 members); territory reset each cycle |
| Shadow Syndicate governance capture | Stake-weighted voting cap per member; treasury loss cap per cycle |
| Engagement gaming by inactive members | Minimum activity thresholds for game access maintained per season |

---

## 9. Hackathon MVP Scope

| Feature | Status |
|---|---|
| Chess Staking core logic | ✅ Implemented |
| Stake preservation mechanism | ✅ Implemented |
| Prediction Market basic structure | ✅ Implemented |
| CBO-relevant market categories | ✅ Defined |
| Chrono Siege territory locking logic | 🔵 Simulated |
| Alliance mechanics | 🔵 Simulated |
| Shadow Syndicate governance simulation | 📋 Roadmap |
| Reputation scoring and progression gating | 🔵 Simulated |
| WhatsApp / Telegram integration | 📋 Roadmap |
| Between-season engagement calendar | 📋 Roadmap |

---

## 10. Roadmap

| Phase | Description |
|---|---|
| **Phase 1** | Chess Staking + basic Prediction Markets live. CBO-relevant market categories active. |
| **Phase 2** | Chrono Siege with alliance mechanics. Reputation scoring operational. CFA leaderboards. |
| **Phase 3** | Shadow Syndicate launch. DAO governance training pathway active. |
| **Phase 4** | WhatsApp/Telegram deep integration. Revenue-backed reward emission. Full governance transition. |