/**
 * RFC-8785: JSON Canonicalization Scheme (JCS)
 * Strict lexicographical sorting of keys and standard JSON serialization
 * to guarantee deterministic cryptographic digests across all platforms.
 */

export function canonicalizeJSON(obj: any): string {
  if (obj === undefined) {
    return 'null';
  }
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    return '[' + obj.map((item) => (item === undefined ? 'null' : canonicalizeJSON(item))).join(',') + ']';
  }

  // Filter out undefined values to comply with canonical JSON RFC-8785
  const sortedKeys = Object.keys(obj).filter((k) => obj[k] !== undefined).sort();
  const parts = sortedKeys.map(
    (key) => JSON.stringify(key) + ':' + canonicalizeJSON(obj[key])
  );
  return '{' + parts.join(',') + '}';
}
