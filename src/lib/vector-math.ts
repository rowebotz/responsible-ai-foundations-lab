/**
 * Simple client-side vector utilities for simulation
 * Deterministic generation ensures scores remain stable during user interaction.
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let mA = 0;
  let mB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    mA += vecA[i] * vecA[i];
    mB += vecB[i] * vecB[i];
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  if (mA === 0 || mB === 0) return 0;
  return dotProduct / (mA * mB);
}
export function getMockQueryVector(query: string): number[] {
  const vector = new Array(8).fill(0.1); // Base noise floor
  const lowerQuery = query.toLowerCase();
  // Primary semantic mappings
  if (lowerQuery.includes('money') || lowerQuery.includes('aml') || lowerQuery.includes('compliance')) vector[1] = 0.85;
  if (lowerQuery.includes('loan') || lowerQuery.includes('mortgage') || lowerQuery.includes('credit')) vector[0] = 0.92;
  if (lowerQuery.includes('legal') || lowerQuery.includes('privacy') || lowerQuery.includes('retention')) vector[2] = 0.75;
  if (lowerQuery.includes('risk') || lowerQuery.includes('commercial')) vector[3] = 0.65;
  // Generate deterministic low-level noise based on string characteristics
  // This replaces Math.random() to ensure stability
  for (let i = 0; i < vector.length; i++) {
    if (vector[i] === 0.1) {
      // Use char codes at specific positions to create a stable offset
      const charCode = query.charCodeAt(i % query.length) || 0;
      vector[i] = 0.05 + (charCode % 15) / 100;
    }
  }
  return vector;
}