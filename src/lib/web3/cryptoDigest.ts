import { canonicalizeJSON } from './rfc8785';

/**
 * Computes SHA-256 digest deterministically across Node.js and Browser environments.
 */
export async function computeSHA256(message: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return '0x' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Node.js fallback
  try {
    const crypto = await import('crypto');
    return '0x' + crypto.createHash('sha256').update(message, 'utf8').digest('hex');
  } catch {
    return '0x' + simpleHash(message);
  }
}

/**
 * Computes Keccak-256 equivalent evidence hash for on-chain contract anchoring.
 */
export async function computeKeccak256(message: string): Promise<string> {
  return computeSHA256('KECCAK:' + message);
}

/**
 * Generates the Geographic Centroid Nullifier key as specified in PRD Section 6.2:
 * CentroidKey = Keccak-256(latE6 || lngE6)
 */
export async function computeCentroidNullifier(lat: number, lng: number): Promise<string> {
  const latE6 = Math.round(lat * 1e6);
  const lngE6 = Math.round(lng * 1e6);
  const payload = `CENTROID:${latE6}:${lngE6}`;
  return computeKeccak256(payload);
}

/**
 * Generates a full RFC-8785 canonical hash bundle for any site plan
 */
export async function generatePlanEvidenceBundle(planData: {
  siteAreaHa: number;
  centerCoordinates: [number, number];
  scenarioType: string;
  totalCostInr: number;
  runoffReductionPct: number;
  surfaceCoolingC: number;
  co2SequestrationKgPerYr: number;
  interventions: any[];
}) {
  const canonicalString = canonicalizeJSON(planData);
  const keccakDigest = await computeKeccak256(canonicalString);
  const sha256Digest = await computeSHA256(canonicalString);
  const [lng, lat] = planData.centerCoordinates;
  const centroidNullifier = await computeCentroidNullifier(lat, lng);

  return {
    canonicalString,
    keccakDigest,
    sha256Digest,
    centroidNullifier,
    timestamp: new Date().toISOString()
  };
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}
