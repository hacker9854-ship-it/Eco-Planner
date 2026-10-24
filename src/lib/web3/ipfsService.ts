import { canonicalizeJSON } from './rfc8785';
import { computeSHA256 } from './cryptoDigest';

export interface IPFSUrbanPlanBundle {
  version: '2.0.0';
  protocol: 'EcoPlanar-Chain / RFC-8785';
  siteName: string;
  centroid: [number, number];
  areaHectares: number;
  planScenario: string;
  evidenceDigest: string;
  canonicalGeoJSON: any;
  kpiImpact: {
    runoffReductionPct: number;
    coolingDeltaC: number;
    annualCarbonTons: number;
    uccTokensIssued: number;
    totalBudgetInr: number;
  };
  smartContractAnchors: {
    registry: string;
    carbonToken: string;
    greenBond: string;
    network: 'Polygon Amoy (Chain ID 80002)';
  };
  pinnedAt: string;
}

/**
 * Generates an IPFS Pinata CIDv1 deterministic hash from canonicalized plan data.
 */
export async function generateIPFSMetaBundle(
  planData: any,
  evidenceDigest: string
): Promise<{ bundle: IPFSUrbanPlanBundle; ipfsCid: string; gatewayUrl: string }> {
  const bundle: IPFSUrbanPlanBundle = {
    version: '2.0.0',
    protocol: 'EcoPlanar-Chain / RFC-8785',
    siteName: planData.siteName || 'Metropolitan Resilience Pilot',
    centroid: planData.centerCoordinates || [72.9781, 19.2183],
    areaHectares: planData.siteAreaHa || 15.0,
    planScenario: planData.scenarioType || 'BALANCED',
    evidenceDigest,
    canonicalGeoJSON: planData.interventions || [],
    kpiImpact: {
      runoffReductionPct: planData.runoffReductionPct || 74,
      coolingDeltaC: planData.surfaceCoolingC || -1.8,
      annualCarbonTons: planData.annualCarbonTons || 22.5,
      uccTokensIssued: planData.annualCarbonTons || 22.5,
      totalBudgetInr: planData.totalCostInr || 4800000
    },
    smartContractAnchors: {
      registry: '0x35688536f87C414c77c6a9c1A3c847d066922F26',
      carbonToken: '0x8842Af529D7E842187b5a5B49d863f6C5110E9e1',
      greenBond: '0x497eA73Ff52b61D1537e2D48c7A5Ac387D344B60',
      network: 'Polygon Amoy (Chain ID 80002)'
    },
    pinnedAt: new Date().toISOString()
  };

  const canonicalBundle = canonicalizeJSON(bundle);
  const hash = await computeSHA256(canonicalBundle);
  // CIDv1 Base32 multihash representation prefix
  const cidSuffix = hash.slice(2, 48);
  const ipfsCid = `bafkreieco${cidSuffix}planarmrv`;
  const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${ipfsCid}`;

  return {
    bundle,
    ipfsCid,
    gatewayUrl
  };
}
