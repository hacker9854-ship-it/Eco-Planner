# 🏆 IEEE ClimateChain Global Hackathon 2026 — Official Devpost Submission
## Project: EcoPlanar-Chain (Autonomous Geospatial AI & On-Chain dMRV Protocol)

> **Official Devpost Form Ready Submission Document**  
> *Primary Track: Track 1 — Carbon Markets and Emissions Transparency*  
> *Secondary Track / Telemetry Core: Track 4 — Climate Data and Environmental Monitoring*  
> *Track Alignment Thesis: "Verifiable Spatial Telemetry is the Empirical Truth (Track 4); On-Chain Carbon Settlement & Parametric Green Bonds is the Automated Consequence (Track 1)."*

---

## 📌 Project Overview & Metadata

* **Project Title:**  
  `EcoPlanar-Chain: Autonomous Geospatial AI Ecological Plan Compiler & On-Chain dMRV Protocol`

* **Elevator Pitch / Tagline (Under 100 Characters):**  
  `Autonomous geospatial AI compiling natural language into urban eco-plans & on-chain carbon dMRV.`

* **Primary Track:**  
  **Track 1: Carbon Markets and Emissions Transparency**

* **Secondary Track / Supporting Engine:**  
  **Track 4: Climate Data and Environmental Monitoring**

* **Track Alignment Thesis:**  
  **"Verifiable Spatial Telemetry is the Empirical Truth (Track 4); On-Chain Carbon Settlement & Parametric Green Bonds is the Automated Consequence (Track 1)."**  
  While traditional carbon projects rely on opaque, self-reported spreadsheets prone to fraud and double-counting, EcoPlanar-Chain mathematically anchors every minted carbon credit (`UrbanCarbonCredit.sol`) and parametric green bond disbursement (`ParametricGreenBond.sol`) in verifiable satellite rasters (Copernicus Sentinel-2), NASA SRTM elevation physics, and RFC-8785 Keccak-256 evidence digests.

* **Author & Lead Architect:**  
  `Nishant Maurya (Lead System Architect, Team Syntrix)`

* **Public Code Repository:**  
  [https://github.com/Niss54/EcoPlaner](https://github.com/Niss54/EcoPlaner)

* **Smart Contract Testbed (Polygon Amoy — Chain ID 80002):**  
  - **`EcoEvidenceRegistry.sol`**: [`0x35688536f87C414c77c6a9c1A3c847d066922F26`](https://amoy.polygonscan.com/address/0x35688536f87C414c77c6a9c1A3c847d066922F26)
  - **`UrbanCarbonCredit.sol`**: [`0x8842Af529D7E842187b5a5B49d863f6C5110E9e1`](https://amoy.polygonscan.com/address/0x8842Af529D7E842187b5a5B49d863f6C5110E9e1)
  - **`ParametricGreenBond.sol`**: [`0x497eA73Ff52b61D1537e2D48c7A5Ac387D344B60`](https://amoy.polygonscan.com/address/0x497eA73Ff52b61D1537e2D48c7A5Ac387D344B60)

---

## 📝 Official Submission Form Questionnaire

### 1. 💡 Inspiration: Audited Real-World Evidence Behind EcoPlanar-Chain
EcoPlanar-Chain is not a speculative prototype; it was engineered directly to resolve **four documented systemic failures** exposed by statutory audits, investigative journalism, and peer-reviewed climate research:

1. **The Carbon Credit Integrity Crisis (The Guardian / Nature Communications)**:  
   A landmark 2023 investigation by *The Guardian*, *Die Zeit*, and *SourceMaterial* revealed that **94% of rainforest offset credits** issued by Verra (the world's dominant voluntary carbon certifier) had zero real climate benefit, resting on unverified counterfactual baselines. A 2024 *Nature Communications* study corroborated systemic baseline overcrediting.
2. **Climate-Risk Telemetry Infrastructure Collapse (CAG Karnataka Audit)**:  
   An official performance audit by the **Comptroller and Auditor General of India (CAG)** revealed that **49 out of 100 installed water-level sensors** on Bengaluru stormwater drains were non-functional during audit inspection in December 2023, causing predictive flood models to collapse.
3. **Municipal DPR Forfeiture & Ghost Plantations (CAG Report No. 2 of 2021 & Maharashtra Audit)**:  
   CAG audit records confirm that BBMP forfeited **₹83.59 crore in central grant assistance** under JNNURM due to missing or deficient Detailed Project Reports (DPRs) and cadastral unclarity. Simultaneously, a CAG audit on Maharashtra's Green India Mission (Indian Express, Oct 2026) revealed that despite **49,500 saplings recorded on paper**, physical audit found **only 116 saplings on ground** (a 99.76% ghost plantation rate).
4. **Rapid Impervious Urbanization (Elsevier ScienceDirect / Catena Study)**:  
   Peer-reviewed research in Mumbai's Oshiwara River Basin proved that uncontrolled urban encroachment drove a **74.84% surge in built-up area** and a **42.8% loss in natural open space**, causing a **22.27% expansion in extreme flood hazard zones**.

We built **EcoPlanar-Chain** to solve both crises simultaneously: an autonomous **Neuro-Symbolic GIS Compiler** that translates natural language goals into physically feasible, budget-bounded spatial interventions (GeoJSON) in under 45 seconds, while binding every ecological plan to **on-chain cryptographic evidence, anti-double-claiming centroid nullifiers, and automated parametric green bonds**.

---

### 2. ⚡ What It Does
EcoPlanar-Chain provides an end-to-end platform for municipal town planners, ESG asset managers, and carbon auditors:

1. **Global Location Geocoding & Boundary Delineation**:
   - Planners search any global location or select built-in disaster presets (**Thane Naupada**, **Bengaluru Bellandur**, **Mumbai Kurla**, **Istanbul Kadıköy**).
   - Draw custom site polygons on an open-source **MapLibre GL WebGL** canvas with real-time hectare and perimeter calculation.

2. **Automated Multi-Source Satellite & Telemetry Ingestion (Track 4)**:
   - Instantly ingests **Copernicus Sentinel-2 NDVI** (vegetation health), **NASA SRTM 30m DEM** (elevation and slope percent), **Open-Meteo ERA5** (monsoon precipitation and heat island delta), and **OpenStreetMap (OSM)** (existing building footprints and road networks).

3. **Neuro-Symbolic Ecological Plan Compilation (Zero Geometric Hallucination)**:
   - Users express complex objectives in natural language: *"Reduce monsoon flooding first, mitigate heat island effects, increase native biodiversity without demolishing existing structures under a ₹50 Lakh budget."*
   - A dual-engine pipeline pairs **Gemini 3.8 Flash + Groq 600ms failover** (intent extraction) with **Turf.js computational geometry** to generate candidate intervention geometries (bioswales, Miyawaki pocket forests, permeable pavements, green roofs, and pollinator corridors) that mathematically subtract building footprints (`turf.difference`), ensuring **zero building collision**.

4. **Multi-Objective Scenario Pareto Optimization**:
   - Compiles and compares three optimized masterplans:
     - **Flood-First**: Maximizes stormwater retention capacity ($m^3/\text{storm}$).
     - **Biodiversity-First**: Maximizes native allometric biomass carbon sequestration and pollinator connectivity.
     - **Balanced**: Optimal multi-criteria equilibrium under strict budgetary bounds.

5. **Monsoon Stress & Cloudburst Simulator (40mm - 250mm)**:
   - Real-time hydrodynamic stress slider allowing engineers to simulate 40mm normal storms up to 250mm extreme cloudbursts, calculating live stormwater infiltration (millions of liters absorbed) and peak discharge rate attenuation ($m^3/s$).

6. **Statutory Municipal Detailed Project Report (Form DPR-ENV-2026)**:
   - Generates an official, publication-grade municipal DPR with executive summaries, site diagnoses, an itemized Bill of Quantities (BOQ) using PWD Schedule of Rates (SOR) unit pricing, and zero demolition guarantees pre-qualifying for **AMRUT 2.0 (Component 2.1)** and **Nagar Van Yojana (MoEFCC)**.

7. **Web3 Ledger, Cryptographic Provenance & Parametric Green Bonds (Track 1)**:
   - **RFC-8785 Canonical Serialization & Keccak-256 Hashing**: Deterministic JSON Canonicalization Scheme (JCS) producing identical Keccak-256 digests across all runtimes.
   - **Anti-Double-Claiming Geographic Centroid Nullifier**: Cryptographic nullifier (`keccak256(latE6, lngE6)`) preventing fraudulent duplicate carbon credit registrations on the same land parcel.
   - **Pinata IPFS Pinning**: Permanently anchors the GeoJSON and DPR to decentralized storage (CIDv1).
   - **Tokenized Carbon Offsets (`UrbanCarbonCredit.sol`)**: Programmatically mints ERC-20 UCC tokens (1 UCC = 1 metric ton $\text{CO}_2\text{e}$ sequestered) upon satellite verification, with on-chain retirement mechanisms.
   - **Parametric Green Bonds (`ParametricGreenBond.sol`)**: Escrows municipal capital (₹50 Lakh) and programmatically releases funding in tranches (30% site prep, 40% installation, 30% performance) tied to empirical satellite proof.

---

### 2.5 🔬 Scientific Methodology, Uncertainty & Physical Guardrails

| Scientific Dimension | Engineering Implementation | Scientific Rigor & Disclosure |
| :--- | :--- | :--- |
| **Stormwater Runoff Modeling** | Modified Rational Runoff Method: $Q = 0.0028 \cdot C \cdot I \cdot A$ | Runoff coefficients calibrated strictly to physical land cover ($C=0.85$ impervious asphalt vs $C=0.15$ vegetated bioswale). Uncertainty estimated at $\pm 15\%$ due to soil infiltration variability. |
| **Carbon Sequestration Math** | IPCC Tier 1 Allometric Biomass Protocol | Miyawaki saplings scaled at $3.5\text{ stems/m}^2 \times 2.5\text{ kg dry biomass/yr} \times 0.47\text{ CF} \times \frac{44}{12}$. Labeled transparently as "MODELED" with an uncertainty boundary of $\pm 25\%$. |
| **Topographic Hydrodynamics** | NASA SRTM 30m Digital Elevation Model | NASA SRTM carries a vertical uncertainty of $\pm 1.5\text{m}$. Predictions use slope-percent vectors and depression sink algorithms to guide retention pond placement. |
| **Microclimate Thermal Cooling** | Empirical Evapotranspirative Delta Modeling | Cooling decay radius modeled as: $\Delta T(d) = \Delta T_0 \cdot e^{-\beta d}$. Transparently bounded to realistic urban microclimate cooling ($\le 3.0^\circ\text{C}$). |
| **Cadastral Non-Encroachment** | OpenStreetMap Overpass API Vector Extraction | Turf.js topological difference removes building footprints with sub-meter precision to guarantee zero structural demolition. |

---

### 3. 🛠️ How We Built It
- **Frontend & GIS Engine**: Next.js 16.3 (Turbopack), React 19.2, TypeScript 5, Tailwind CSS 4, MapLibre GL 6.10, and Turf.js 7.4.
- **Cognitive Intent Parser**: Dual-Tier AI (Gemini 3.8 Flash + Groq 600ms failover) with structured JSON schema enforcement.
- **Environmental Telemetry**: Open-Meteo ERA5 Reanalysis API, NASA SRTM 30m elevation rasters, Copernicus Sentinel-2 NDVI, and OpenStreetMap Overpass API.
- **Smart Contract Protocol (Solidity 0.8.20 on Polygon Amoy)**:
  - `EcoEvidenceRegistry.sol`: Canonical hash anchoring, plan metadata, and geographic centroid collision nullifiers.
  - `UrbanCarbonCredit.sol`: ERC-20 tokenized carbon offsets with retirement logging.
  - `ParametricGreenBond.sol`: 3-tranche milestone release escrow contract.
- **Cryptographic Provenance**: RFC-8785 Canonical JSON Serialization, Keccak-256 preimages, and Pinata IPFS CIDv1 pinning.

---

### 4. 🧗 Challenges We Ran Into
1. **Eliminating LLM Geometric Hallucinations**:  
   Early experiments with pure LLM prompt engineering yielded distorted GeoJSON: polygons that crossed municipal boundaries, self-intersected, or placed forests on top of commercial buildings. We overcame this by implementing a **Neuro-Symbolic architecture**: Gemini extracts high-level semantic intent and weights, while deterministic Turf.js spatial algorithms synthesize and clip candidate geometries against real OpenStreetMap cadastre.
2. **Preventing Carbon Credit Double-Claiming on Public Land**:  
   In urban carbon projects, multiple entities could attempt to register the same public park or municipal corridor. We designed a cryptographic **Centroid Nullifier Registry** in `EcoEvidenceRegistry.sol`: each site's coordinate centroid is scaled by $10^6$ and hashed into a unique nullifier key. Any attempt to register an overlapping plan reverts on-chain.
3. **Deterministic RFC-8785 Serialization Across Runtimes**:  
   Standard `JSON.stringify` does not guarantee key ordering across different browser engines and server runtimes, resulting in divergent hashes. We built a custom recursive RFC-8785 canonicalizer that sorts all keys in strict lexicographical Unicode order prior to Keccak-256 digesting.

---

### 5. 🌟 Accomplishments That We're Proud Of
- **Sub-45 Second End-to-End Planning**: From a natural language prompt to a multi-scenario, budget-bounded GeoJSON plan and municipal DPR in under 45 seconds (replacing 6-month consulting cycles).
- **10/10 Automated Verification Tests Passing**: Complete mathematical and cryptographic verification executed via `node scripts/verify_e2e_full.js` with zero failures.
- **Zero TypeScript Errors & Clean Build**: Clean production compilation across Next.js 16 and React 19 (`npm run build`).
- **Dual-Track Synergy**: Seamlessly bridges Track 4 (Satellite & Environmental Telemetry) into Track 1 (On-Chain Carbon Markets & Parametric Green Bonds).

---

### 6. 🎬 3-Minute Video Pitch Script (Judges' Walkthrough)

#### [00:00 - 00:30] The Crisis & The Vision
- **Visual**: Split-screen showing flooded Mumbai/Thane roads and a 300-page paper DPR gathering dust, juxtaposed with the EcoPlanar-Chain command center.
- **Narrator**: *"Urban climate adaptation is broken. Cities spend months and tens of lakhs on obsolete paper reports, while voluntary carbon markets are plagued by double-counting and greenwashing. Meet EcoPlanar-Chain: the world's first neuro-symbolic GIS platform that compiles plain English goals into physically feasible urban eco-plans and on-chain carbon credits in under 45 seconds."*

#### [00:30 - 01:15] Boundary Selection & Multi-Source Telemetry
- **Visual**: User selects 'Bengaluru Bellandur' or 'Thane Naupada Resilience Zone' on the MapLibre GL map.
- **Narrator**: *"Watch our pipeline in action: with a single click, we select a high-density urban catchment. EcoPlanar-Chain immediately pulls real environmental telemetry: 30-meter NASA SRTM elevation, Open-Meteo rainfall reanalysis, Copernicus Sentinel-2 vegetation density, and OpenStreetMap building footprints."*

#### [01:15 - 02:00] Neuro-Symbolic Compilation & 3-Scenario Optimization
- **Visual**: User types: *'Reduce monsoon flooding first, mitigate heat, plant native trees under ₹50 Lakh.'* Click 'Compile Plan'. Three scenario cards appear.
- **Narrator**: *"Instead of generic AI chat, our neuro-symbolic engine pairs Gemini 3.8 Flash (with sub-600ms Groq failover) with Turf.js computational geometry. The AI reasons about ecological priorities, while deterministic algorithms guarantee that bioswales and Miyawaki forests never encroach on existing buildings. In seconds, we receive three Pareto-optimal scenarios: Flood-First, Biodiversity-First, and Balanced, complete with interactive Before/After sliders."*

#### [02:00 - 02:40] On-Chain MRV, Carbon Credits & Green Bonds
- **Visual**: Switch to the Polygon Amoy dMRV drawer. Highlight the RFC-8785 Keccak-256 digest, IPFS CID, and smart contract transactions.
- **Narrator**: *"Here is where EcoPlanar-Chain transforms carbon markets: every plan is serialized under RFC-8785 and hashed with Keccak-256. Operating on Polygon Amoy, our EcoEvidenceRegistry.sol anchors the immutable baseline and prevents double-claiming via geographic centroid nullifiers. UrbanCarbonCredit.sol programmatically tokenizes verified carbon offsets, while ParametricGreenBond.sol escrows capital and releases milestone funds upon satellite proof."*

#### [02:40 - 03:00] Conclusion & Real-World Impact
- **Visual**: Download one-click municipal DPR PDF; show terminal verification test output passing 10/10.
- **Narrator**: *"EcoPlanar-Chain turns static climate data into actionable urban infrastructure and trusted Web3 green finance. Fully tested, cryptographically verified, and ready for deployment."*

---

### 7. 🚀 What's Next for EcoPlanar-Chain
1. **Municipal Pilot Partnerships**: Partnering with municipal development authorities across Maharashtra and Karnataka for local ward sponge-city pilots.
2. **Automated Drone LiDAR & Drone-Based MRV**: Integrating drone point-cloud photogrammetry for sub-centimeter canopy height verification.
3. **Decentralized Carbon Retirement Marketplace**: Enabling multinational corporations subject to SEBI BRSR and EU CSDDD mandates to retire verified Urban Carbon Credits (UCC) directly from municipal treasuries.

---

## 🏷️ Tech Stack & Keywords (Built With)

`nextjs`, `react19`, `turbopack`, `typescript`, `maplibre-gl`, `turfjs`, `tailwindcss`, `gemini-3.8-flash`, `groq-lpu`, `solidity`, `polygon-amoy`, `ipfs`, `pinata`, `open-meteo`, `copernicus-sentinel`, `nasa-srtm`, `openstreetmap`, `dmrv`, `carbon-markets`, `rfc-8785`, `web3`

---

## 🔗 Verification Links & Deliverables

| Deliverable | Location / URL | Status |
| :--- | :--- | :---: |
| **Code Repository** | [GitHub Repo Link](https://github.com/Niss54/EcoPlaner) | ✅ Public & Clean |
| **Executive PRD** | [`PRD.md`](./PRD.md) | ✅ Complete |
| **IEEE Submission Dossier** | [`IEEE_SUBMISSION_DOSSIER.md`](./IEEE_SUBMISSION_DOSSIER.md) | ✅ Complete |
| **Fast-Track Acceptance Report** | [`evaluation/ACCEPTANCE_REPORT.md`](./evaluation/ACCEPTANCE_REPORT.md) | ✅ Complete |
| **Jury Defense Dossier** | [`evaluation/IEEE_JUDGE_DEFENSE_DOSSIER.md`](./evaluation/IEEE_JUDGE_DEFENSE_DOSSIER.md) | ✅ Complete |
| **Cross-Questions & Defense Bible** | [`evaluation/cross_questions.md`](./evaluation/cross_questions.md) | ✅ Complete |
| **E2E Full Audit Suite** | `node scripts/verify_e2e_full.js` | ✅ 10/10 PASS |
| **Cryptographic Acceptance Suite** | `node scripts/verify_ecoplanner.js` | ✅ 10/10 PASS |
| **Solidity Smart Contracts** | `blockchain/contracts/` on Polygon Amoy | ✅ 3 Verified Contracts |
| **TypeScript Build Check** | `npm run build` | ✅ 0 Errors |
