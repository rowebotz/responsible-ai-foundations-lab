export interface BuildBuyComparison {
  category: string;
  options: {
    name: string;
    latency: string;
    cost: string;
    scalability: string;
    compliance: string;
    risk: 'Low' | 'Medium' | 'High';
  }[];
  recommendation: string;
}
export const buildBuyData: BuildBuyComparison[] = [
  {
    category: "Frontier Model Integration",
    options: [
      { name: "GPT-5.2 (Azure)", latency: "250ms", cost: "$5,000/mo (Base)", scalability: "Infinite", compliance: "Shared Responsibility", risk: "Medium" },
      { name: "Claude 4.6 (AWS)", latency: "180ms", cost: "$4,500/mo (Base)", scalability: "High", compliance: "VPC Isolated", risk: "Low" },
      { name: "Gemini 3 (GCP)", latency: "210ms", cost: "$3,800/mo (Base)", scalability: "Infinite", compliance: "Data Residency Check", risk: "Medium" }
    ],
    recommendation: "For high-compliance environments, Claude 4.6 on Bedrock provides the best balance of data isolation and performance for financial workflows."
  }
];
export const frontierComparison = [
  { model: "GPT-5.2", reasoning: 0.98, cost: 0.90, context: "256k", multimodal: "Yes", vendorLock: "High", compliance: "Ready" },
  { model: "Claude 4.6 Opus", reasoning: 0.95, cost: 0.85, context: "200k", multimodal: "Yes", vendorLock: "Medium", compliance: "High" },
  { model: "Claude 4.6 Sonnet", reasoning: 0.88, cost: 0.40, context: "200k", multimodal: "Yes", vendorLock: "Medium", compliance: "High" },
  { model: "Gemini 3", reasoning: 0.90, cost: 0.60, context: "2M+", multimodal: "Yes", vendorLock: "High", compliance: "Medium" },
];
export const optimizationConfigs = {
  baseTPS: { '7b': 120, '70b': 45, '405b': 18, 'Frontier': 12 },
  quantizationMultipliers: { 'None': 1, 'INT8': 1.6, 'FP8': 2.1, 'INT4': 3.2 },
  costPerMillion: { '7b': 0.10, '70b': 0.60, '405b': 2.50, 'Frontier': 15.00 }
};
export const experimentResults = [
  { name: "Baseline (GPT-5.2)", accuracy: 96.2, latency: 1850, refusal: 0.1, cost: 12.40 },
  { name: "Challenger (Claude 4.6 Sonnet)", accuracy: 94.8, latency: 650, refusal: 0.3, cost: 2.10 }
];
export const fairnessMetrics = [
  { demographic: "Age 18-25", approvalRate: 0.74, disparateImpact: 0.91 },
  { demographic: "Age 26-45", approvalRate: 0.82, disparateImpact: 1.01 },
  { demographic: "Age 46-65", approvalRate: 0.79, disparateImpact: 0.97 },
  { demographic: "Age 65+", approvalRate: 0.77, disparateImpact: 0.94 }
];