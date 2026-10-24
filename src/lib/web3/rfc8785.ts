/**
 * RFC-8785: JSON Canonicalization Scheme (JCS)
 * Strict lexicographical sorting of keys and standard JSON serialization
 * to guarantee deterministic cryptographic digests across all platforms.
 */

export function canonicalizeJSON(obj: any): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    return '[' + obj.map(canonicalizeJSON).join(',') + ']';
  }

  const sortedKeys = Object.keys(obj).sort();
  const parts = sortedKeys.map(
    (key) => JSON.stringify(key) + ':' + canonicalizeJSON(obj[key])
  );
  return '{' + parts.join(',') + '}';
}
