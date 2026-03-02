/**
 * Simple client-side vector utilities for simulation
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
  // Generate a semi-deterministic vector based on string content for simulation
  const vector = new Array(8).fill(0);
  const lowerQuery = query.toLowerCase();
  // Simple keyword mapping to vector indices
  if (lowerQuery.includes('money') || lowerQuery.includes('aml') || lowerQuery.includes('compliance')) vector[1] = 0.8;
  if (lowerQuery.includes('loan') || lowerQuery.includes('mortgage') || lowerQuery.includes('credit')) vector[0] = 0.9;
  if (lowerQuery.includes('legal') || lowerQuery.includes('privacy') || lowerQuery.includes('retention')) vector[2] = 0.7;
  // Fill rest with low-level noise
  return vector.map(v => v === 0 ? Math.random() * 0.2 : v);
}