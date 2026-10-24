# 🏆 IEEE ClimateChain Global Hackathon 2026 — Official Devpost Submission
## Project: EcoPlanar-Chain (Autonomous Geospatial AI & On-Chain MRV Protocol)

> **Official Devpost Form Ready Submission Document**  
> *Primary Track: Track 1 — Carbon Markets and Emissions Transparency*  
> *Secondary Track / Telemetry Core: Track 4 — Climate Data and Environmental Monitoring*  
> *Track Alignment Thesis: "Verifiable Spatial Telemetry is the Empirical Truth (Track 4); On-Chain Carbon Settlement & Parametric Green Bonds is the Automated Consequence (Track 1)."*

---

## 📌 Project Overview & Metadata

* **Project Title:**  
  `EcoPlanar-Chain: Autonomous Geospatial AI Ecological Plan Compiler & On-Chain MRV Protocol`

* **Elevator Pitch / Tagline (Under 100 Characters):**  
  `Compile natural language goals into spatial urban eco-plans & on-chain carbon credits in 45s.`

* **Primary Track:**  
  **Track 1: Carbon Markets and Emissions Transparency**

* **Secondary Track / Supporting Engine:**  
  **Track 4: Climate Data and Environmental Monitoring**

* **Track Alignment Thesis:**  
  **"Verifiable Spatial Telemetry is the Empirical Truth (Track 4); On-Chain Carbon Settlement & Parametric Green Bonds is the Automated Consequence (Track 1)."**  
  While traditional carbon projects rely on opaque self-reported spreadsheets prone to fraud and double-counting, EcoPlanar-Chain mathematically anchors every minted carbon credit (`UrbanCarbonCredit.sol`) and parametric green bond disbursement (`ParametricGreenBond.sol`) in verifiable satellite rasters (Copernicus Sentinel-2), NASA SRTM elevation physics, and RFC-8785 Keccak-256 evidence digests.

* **Author & Lead Architect:**  
  `Nishant Maurya (Solo Developer & Architect, Team Syntrix)`

* **Public Code Repository:**  
  [https://github.com/Niss54/AEGIS/tree/main/EcoPlanner](https://github.com/Niss54/AEGIS/tree/main/EcoPlanner)

* **Smart Contract Testbed:**  
  Polygon Amoy Testnet (Chain ID 80002) & EVM Hardhat Testbed

---

## 📝 Official Submission Form Questionnaire

### 1. 💡 Inspiration
Across global cities—from the dense monsoon floodplains of Thane and Mumbai to expanding corridors in Bengaluru and Istanbul—urbanization has systematically paved over natural sponges. High-density concrete has increased surface runoff by over **80%**, while localized temperatures spike by **4°C to 8°C** due to the Urban Heat Island (UHI) effect.

However, urban ecological restoration is paralyzed by two systemic bottlenecks:
1. **The Bureaucratic Detailed Project Report (DPR) Paralysis**: Municipal corporations spend months and tens of lakhs on legacy consulting firms to produce 300-page static PDFs. By the time these reports are published, urban land-use has already shifted, and the proposed interventions are obsolete or physically infeasible.
2. **The Carbon & Biodiversity Greenwashing Chasm**: In voluntary carbon markets, nature-based solutions (NbS) suffer from pervasive **double-counting and unverified carbon credit claims**. Developers register overlapping geographic boundaries, claim fictitious sapling survival rates, and collect ESG financing without physical auditability.

We built **EcoPlanar-Chain** to solve both crises simultaneously: an autonomous **Neuro-Symbolic GIS Compiler** that translates natural language goals into physically feasible, budget-bounded spatial interventions (GeoJSON) in under 45 seconds, while binding every ecological plan to **on-chain cryptographic evidence, anti-double-claiming centroid nullifiers, and automated parametric green bonds**.

---

### 2. ⚡ What It Does
EcoPlanar-Chain provides an end-to-end platform for municipal town planners, ESG asset managers, and carbon auditors:

1. **Global Location Geocoding & Boundary Delineation**:
   - Planners search any global location or select built-in disaster hotspots (Thane Naupada, Bengaluru Bellandur, Mumbai Kurla, Istanbul Kadıköy).
   - Draw custom site polygons on an open-source **MapLibre GL WebGL** canvas with real-time hectare and perimeter calculation.

2. **Automated Multi-Source Satellite & Telemetry Ingestion**:
   - Instantly ingests **Copernicus Sentinel-2 NDVI** (vegetation health), **NASA SRTM 30m DEM** (elevation and slope percent), **Open-Meteo ERA5** (monsoon precipitation and heat island delta), and **OpenStreetMap (OSM)** (existing building footprints and road networks).

3. **Neuro-Symbolic Ecological Plan Compilation**:
   - Users express complex objectives in natural language: *"Reduce monsoon flooding first, mitigate heat island effects, increase native biodiversity without demolishing existing structures under a ₹50 Lakh budget."*
   - A dual-engine pipeline pairs **Google Gemini 1.5 Pro** (intent extraction) with **Turf.js computational geometry** to generate candidate intervention geometries (bioswales, Miyawaki pocket forests, permeable pavements, green roofs, and pollinator corridors) that strictly respect building non-encroachment boundaries.

4. **Multi-Objective Scenario Pareto Optimization**:
   - Automatically compiles and compares three optimized masterplans:
     - **Flood-First**: Maximizes stormwater retention capacity (liters/year).
     - **Biodiversity-First**: Maximizes native allometric biomass carbon sequestration and pollinator connectivity.
     - **Balanced**: Optimal multi-criteria equilibrium.

5. **Instant Municipal DPR Generator**:
   - Generates a publication-grade Detailed Project Report (DPR) with executive summaries, site diagnoses, Bill of Quantities (BOQ), and financial payback schedules ready for municipal council approval.

6. **Web3 Ledger, Cryptographic Provenance & Parametric Green Bonds**:
   - **RFC-8785 Canonical Serialization & Keccak-256 Hashing**: Serializes the plan into deterministic canonical JSON and computes an immutable evidence digest.
   - **Pinata IPFS Pinning**: Permanently anchors the GeoJSON and DPR to decentralized storage (generating real CIDv1 hashes).
   - **On-Chain Evidence Registry (`EcoEvidenceRegistry.sol`)**: Anchors plan hashes and enforces an anti-double-claiming geographic centroid nullifier (`keccak256(latE6, lngE6)`).
   - **Tokenized Carbon Offsets (`UrbanCarbonCredit.sol`)**: Programmatically mints ERC-20 UCC tokens (1 UCC = 1 metric ton $\text{CO}_2\text{e}$ sequestered) upon satellite verification, with transparent retirement mechanisms for corporate ESG compliance.
   - **Parametric Green Bonds (`ParametricGreenBond.sol`)**: Escrows municipal capital and programmatically releases funding in tranches (30% site prep, 40% installation, 30% performance) tied to empirical satellite proof.

---

### 2.5 🔬 Scientific Methodology, Uncertainty & Physical Guardrails

| Scientific Dimension | Engineering Implementation | Scientific Rigor & Disclosure |
| :--- | :--- | :--- |
| **Stormwater Runoff Modeling** | Modified Rational Runoff Method: $Q = 0.0028 \cdot C \cdot I \cdot A$ | Runoff coefficients calibrated strictly to physical land cover ($C=0.85$ impervious asphalt vs $C=0.15$ vegetated bioswale). Uncertainty estimated at $\pm 15\%$ due to soil infiltration variability. |
| **Carbon Sequestration Math** | IPCC Tier 1 Allometric Biomass Protocol | Miyawaki saplings scaled at $3.5\text{ stems/m}^2 \times 2.5\text{ kg dry biomass/yr} \times 0.47\text{ CF} \times \frac{44}{12}$. Labeled transparently as "MODELED" with an uncertainty boundary of $\pm 25\%$. |
| **Topographic Hydrodynamics** | NASA SRTM 30m Digital Elevation Model | NASA SRTM carries a vertical uncertainty of $\pm 1.5\text{m}$. Predictions use slope-percent vectors and depression sink algorithms to guide retention pond placement. |
| **Cadastral Non-Encroachment** | Turf.js Spatial Point-in-Polygon & Difference | Eliminates LLM geometric hallucination by clipping all synthesized interventions against OSM building cadastre. Zero demolition of residential structures. |
| **Cryptographic Determinism** | RFC-8785 Canonical JSON Serialization | Guarantees that any external validator, auditor, or smart contract relayer generates the identical Keccak-256 digest from raw GeoJSON. |

---

### 3. 🛠️ How We Built It
- **Frontend & GIS Engine**: Next.js 16.3, React 19.2, TypeScript 5, Tailwind CSS 4, MapLibre GL 6.10, and Turf.js 7.4.
- **Cognitive Intent Parser**: Google Gemini 1.5 Pro via `@google/generative-ai` with structured JSON schema enforcement.
- **Environmental Telemetry**: Open-Meteo ERA5 Reanalysis API, NASA SRTM 30m elevation rasters, Copernicus Sentinel-2 NDVI, and OpenStreetMap Overpass API.
- **Smart Contract Protocol (Solidity 0.8.20)**:
  - `EcoEvidenceRegistry.sol`: Canonical hash anchoring, plan metadata, and geographic centroid collision nullifiers.
  - `UrbanCarbonCredit.sol`: Verified ERC-20 token standard representing 1 metric ton of $\text{CO}_2\text{e}$ sequestered.
  - `ParametricGreenBond.sol`: Multi-tranche green bond escrow with programmatic milestone release logic.
- **Decentralized Storage**: Pinata IPFS Gateway for content-addressed persistence of GeoJSON and DPR bundles.
- **Automated Verification**: Custom test suite (`scripts/verify_ecoplanner.js`) validating RFC-8785 canonical determinism, carbon math invariants, and smart contract artifacts.

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
- **10/10 Automated Verification Tests Passing**: Complete mathematical and cryptographic verification executed via `scripts/verify_ecoplanner.js` with zero failures.
- **Zero TypeScript Errors**: Clean production compilation across Next.js 16 and React 19.
- **Dual-Track Synergy**: Seamlessly bridges Track 4 (Satellite & Environmental Telemetry) into Track 1 (On-Chain Carbon Markets & Parametric Green Bonds).

---

### 6. 🎬 3-Minute Video Pitch Script (Judges' Walkthrough)

#### [00:00 - 00:30] The Crisis & The Vision
- **Visual**: Split-screen showing flooded Mumbai/Thane roads and a 300-page paper DPR gathering dust, juxtaposed with the EcoPlanar-Chain command center.
- **Narrator**: *"Urban climate adaptation is broken. Cities spend months and tens of lakhs on obsolete paper reports, while voluntary carbon markets are plagued by double-counting and greenwashing. Meet EcoPlanar-Chain: the world's first neuro-symbolic GIS platform that compiles plain English goals into physically feasible urban eco-plans and on-chain carbon credits in under 45 seconds."*

#### [00:30 - 01:15] Boundary Selection & Multi-Source Telemetry
- **Visual**: User selects 'Thane Naupada Resilience Zone' on the MapLibre GL map.
- **Narrator**: *"Watch our pipeline in action: with a single click, we select a high-density urban catchment in Thane, Maharashtra. EcoPlanar-Chain immediately pulls real environmental telemetry: 30-meter NASA SRTM elevation, Open-Meteo rainfall reanalysis, Copernicus Sentinel-2 vegetation density, and OpenStreetMap building footprints."*

#### [01:15 - 02:00] Neuro-Symbolic Compilation & 3-Scenario Optimization
- **Visual**: User types: *'Reduce monsoon flooding first, mitigate heat, plant native trees under ₹50 Lakh.'* Click 'Compile Plan'. Three scenario cards appear.
- **Narrator**: *"Instead of generic AI chat, our neuro-symbolic engine pairs Gemini 1.5 Pro with Turf.js computational geometry. The AI reasons about ecological priorities, while deterministic algorithms guarantee that bioswales and Miyawaki forests never encroach on existing buildings. In seconds, we receive three Pareto-optimal scenarios: Flood-First, Biodiversity-First, and Balanced, complete with interactive Before/After sliders."*

#### [02:00 - 02:40] On-Chain MRV, Carbon Credits & Green Bonds
- **Visual**: Switch to the Blockchain & DPR tab. Highlight the RFC-8785 Keccak-256 digest, IPFS CID, and smart contract transactions.
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

`nextjs`, `react19`, `typescript`, `maplibre-gl`, `turfjs`, `tailwindcss`, `gemini-1.5-pro`, `solidity`, `polygon-amoy`, `ipfs`, `pinata`, `open-meteo`, `copernicus-sentinel`, `nasa-srtm`, `openstreetmap`, `mrv`, `carbon-markets`, `web3`

---

## 🔗 Verification Links & Deliverables

| Deliverable | Location / URL | Status |
| :--- | :--- | :---: |
| **Code Repository** | [GitHub Repo Link](https://github.com/Niss54/AEGIS/tree/main/EcoPlanner) | ✅ Public & Clean |
| **Executive PRD** | [`PRD.md`](./PRD.md) | ✅ Complete |
| **IEEE Submission Dossier** | [`IEEE_SUBMISSION_DOSSIER.md`](./IEEE_SUBMISSION_DOSSIER.md) | ✅ Complete |
| **Fast-Track Acceptance Report** | [`evaluation/ACCEPTANCE_REPORT.md`](./evaluation/ACCEPTANCE_REPORT.md) | ✅ Complete |
| **Jury Defense Dossier** | [`evaluation/IEEE_JUDGE_DEFENSE_DOSSIER.md`](./evaluation/IEEE_JUDGE_DEFENSE_DOSSIER.md) | ✅ Complete |
| **Automated Verification Script** | `node scripts/verify_ecoplanner.js` | ✅ 10/10 PASS |
| **Solidity Smart Contracts** | `blockchain/contracts/` | ✅ 3 Verified Contracts |
| **TypeScript Build Check** | `npx tsc --noEmit` | ✅ 0 Errors |
