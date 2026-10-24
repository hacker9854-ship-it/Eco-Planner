/**
 * carbon.ts — Scientific Environmental & Carbon Modeling
 * Implements:
 * 1. IPCC Tier-1 Allometric Biomass Carbon Sequestration (PRD Section 5.2)
 * 2. Modified Rational Stormwater Runoff Inundation & Retention (PRD Section 5.1)
 * 3. Urban Carbon Credit (UCC) ERC-20 Token Yield Computation
 */

export interface NativeSpeciesProfile {
  id: string;
  commonName: string;
  botanicalName: string;
  layer: 'Canopy' | 'Sub-canopy' | 'Shrub' | 'Ground-cover';
  annualCo2SequestrationKg: number;
  waterAbsorptionLitersDay: number;
  droughtTolerance: 'High' | 'Medium' | 'Low';
  rootDepthMeters: number;
  soilErosionControlRating: number; // 1-10
}

export const REGIONAL_NATIVE_SPECIES: NativeSpeciesProfile[] = [
  {
    id: 'peepal',
    commonName: 'Sacred Fig / Peepal',
    botanicalName: 'Ficus religiosa',
    layer: 'Canopy',
    annualCo2SequestrationKg: 45.0,
    waterAbsorptionLitersDay: 350,
    droughtTolerance: 'High',
    rootDepthMeters: 4.5,
    soilErosionControlRating: 9.8
  },
  {
    id: 'jamun',
    commonName: 'Black Plum / Jamun',
    botanicalName: 'Syzygium cumini',
    layer: 'Canopy',
    annualCo2SequestrationKg: 32.0,
    waterAbsorptionLitersDay: 280,
    droughtTolerance: 'Medium',
    rootDepthMeters: 3.8,
    soilErosionControlRating: 9.2
  },
  {
    id: 'neem',
    commonName: 'Neem',
    botanicalName: 'Azadirachta indica',
    layer: 'Canopy',
    annualCo2SequestrationKg: 28.5,
    waterAbsorptionLitersDay: 190,
    droughtTolerance: 'High',
    rootDepthMeters: 4.0,
    soilErosionControlRating: 8.9
  },
  {
    id: 'karanj',
    commonName: 'Indian Beech / Karanj',
    botanicalName: 'Millettia pinnata',
    layer: 'Sub-canopy',
    annualCo2SequestrationKg: 26.0,
    waterAbsorptionLitersDay: 220,
    droughtTolerance: 'High',
    rootDepthMeters: 3.2,
    soilErosionControlRating: 9.0
  },
  {
    id: 'bamboo',
    commonName: 'Golden Bamboo',
    botanicalName: 'Bambusa vulgaris',
    layer: 'Sub-canopy',
    annualCo2SequestrationKg: 35.0,
    waterAbsorptionLitersDay: 400,
    droughtTolerance: 'Medium',
    rootDepthMeters: 2.5,
    soilErosionControlRating: 10.0
  },
  {
    id: 'vetiver',
    commonName: 'Khus / Vetiver Grass',
    botanicalName: 'Chrysopogon zizanioides',
    layer: 'Ground-cover',
    annualCo2SequestrationKg: 12.0,
    waterAbsorptionLitersDay: 150,
    droughtTolerance: 'High',
    rootDepthMeters: 3.5,
    soilErosionControlRating: 10.0
  }
];

export interface CarbonYieldResult {
  miyawakiAreaSqM: number;
  treeCanopyAreaSqM: number;
  totalAnnualCarbonKg: number;
  totalAnnualCarbonTons: number;
  urbanCarbonCreditTokens: number; // 1 UCC = 1 tCO2e
  estimatedCarbonCreditValueInr: number; // ₹1,500/tCO2e typical premium VCM
  allometricParameters: {
    plantingDensityPerSqM: number;
    meanDryBiomassIncrementKg: number;
    carbonFraction: number;
    co2eConversionRatio: number;
  };
}

/**
 * Calculates IPCC Tier 1 Allometric Urban Carbon Sequestration
 * Formula: C = Area * Density * Biomass_inc * CF * (44/12)
 */
export function calculateCarbonYield(
  miyawakiAreaSqM: number = 0,
  treeCanopyAreaSqM: number = 0
): CarbonYieldResult {
  // Miyawaki Standard: 3.5 saplings / m²
  const miyawakiDensity = 3.5;
  const miyawakiAnnualBiomassKg = 2.5;
  const carbonFraction = 0.47;
  const co2eRatio = 44 / 12;

  // Annual CO2e for Miyawaki per m²: 3.5 * 2.5 * 0.47 * (44/12) ≈ 5.0 kg CO2e/m² = 5.0 t/1000m²
  const miyawakiCo2eKg =
    miyawakiAreaSqM * miyawakiDensity * miyawakiAnnualBiomassKg * carbonFraction * co2eRatio;

  // Linear Tree Canopy: 2.2 kg CO2e/m²
  const canopyCo2eKg = treeCanopyAreaSqM * 2.2;

  const totalKg = Math.round(miyawakiCo2eKg + canopyCo2eKg);
  const totalTons = Number((totalKg / 1000).toFixed(2));
  const uccTokens = totalTons; // 1 UCC = 1 Ton CO2e
  const valueInr = Math.round(totalTons * 1500); // Standard Voluntary Carbon Market high-integrity rate

  return {
    miyawakiAreaSqM,
    treeCanopyAreaSqM,
    totalAnnualCarbonKg: totalKg,
    totalAnnualCarbonTons: totalTons,
    urbanCarbonCreditTokens: uccTokens,
    estimatedCarbonCreditValueInr: valueInr,
    allometricParameters: {
      plantingDensityPerSqM: miyawakiDensity,
      meanDryBiomassIncrementKg: miyawakiAnnualBiomassKg,
      carbonFraction,
      co2eConversionRatio: Number(co2eRatio.toFixed(3))
    }
  };
}

/**
 * Modified Rational Stormwater Runoff Inundation & Stress Model
 * Q = 0.0028 * C * I * A
 * Simulates extreme rainfall events (e.g. 50mm up to 250mm Cloudburst)
 */
export function simulateCloudburstRunoff(params: {
  siteAreaHa: number;
  baselineImperviousPercent: number;
  rainfallIntensityMm: number; // e.g. 50mm standard to 250mm cloudburst
  intervenedGreenAreaHa: number;
}) {
  const { siteAreaHa, baselineImperviousPercent, rainfallIntensityMm, intervenedGreenAreaHa } = params;

  // Runoff coefficients
  const cImpervious = 0.85;
  const cPervious = 0.15;

  const baselinePerviousHa = siteAreaHa * (1 - baselineImperviousPercent / 100);
  const baselineImperviousHa = siteAreaHa * (baselineImperviousPercent / 100);

  // Baseline weighted runoff C
  const cBaselineWeighted =
    (baselineImperviousHa * cImpervious + baselinePerviousHa * cPervious) / siteAreaHa;

  // Post-intervention weighted runoff C
  const postImperviousHa = Math.max(0, baselineImperviousHa - intervenedGreenAreaHa);
  const postPerviousHa = baselinePerviousHa + intervenedGreenAreaHa;
  const cPostWeighted =
    (postImperviousHa * cImpervious + postPerviousHa * cPervious) / siteAreaHa;

  // Peak discharge (m³/s)
  const qBaseline = 0.0028 * cBaselineWeighted * rainfallIntensityMm * siteAreaHa;
  const qPost = 0.0028 * cPostWeighted * rainfallIntensityMm * siteAreaHa;

  // Total volume retained in Litres: (C_base - C_post) * I (mm) * Area (ha) * 10,000 m²/ha
  const totalWaterRetainedLiters = Math.round(
    (cBaselineWeighted - cPostWeighted) * (rainfallIntensityMm / 1000) * siteAreaHa * 10000 * 1000
  );

  const retentionPercent = Math.min(
    95,
    Math.round(((qBaseline - qPost) / (qBaseline || 1)) * 100)
  );

  return {
    rainfallIntensityMm,
    qBaselineM3PerSec: Number(qBaseline.toFixed(2)),
    qPostM3PerSec: Number(qPost.toFixed(2)),
    retentionPercent,
    totalWaterRetainedLiters,
    isCloudburst: rainfallIntensityMm >= 100,
    stressLevel:
      rainfallIntensityMm >= 180
        ? 'EXTREME CLOUDBURST'
        : rainfallIntensityMm >= 100
        ? 'SEVERE MONSOON'
        : 'NORMAL DESIGN STORM'
  };
}
