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
    category: "Retrieval Infrastructure",
    options: [
      { name: "Custom (pgvector)", latency: "45ms", cost: "$500/mo", scalability: "Medium", compliance: "Full Control", risk: "Low" },
      { name: "SaaS (Pinecone)", latency: "25ms", cost: "$1,200/mo", scalability: "Infinite", compliance: "Third-party SOC2", risk: "Medium" },
      { name: "Managed (AWS OpenSearch)", latency: "35ms", cost: "$850/mo", scalability: "High", compliance: "AWS GovCloud", risk: "Low" }
    ],
    recommendation: "For Tier-1 Financial Services, Managed OpenSearch provides the optimal balance of data residency compliance and operational overhead reduction."
  },
  {
    category: "Guardrail Systems",
    options: [
      { name: "In-house Regex/NLP", latency: "10ms", cost: "$200/mo", scalability: "Low", compliance: "Audit Proof", risk: "High" },
      { name: "NVIDIA NeMo", latency: "50ms", cost: "$2,000/mo", scalability: "High", compliance: "Enterprise Grade", risk: "Low" },
      { name: "API-based (Perspective)", latency: "150ms", cost: "Usage-based", scalability: "High", compliance: "Data Leakage Risk", risk: "Medium" }
    ],
    recommendation: "NeMo Guardrails are recommended for high-throughput banking applications due to robust PII filtering and low false-positive rates."
  }
];
export const optimizationConfigs = {
  baseTPS: { '7b': 95, '70b': 22, '405b': 8 },
  quantizationMultipliers: { 'None': 1, 'INT8': 1.4, 'FP8': 1.8, 'INT4': 2.5 },
  costPerMillion: { '7b': 0.15, '70b': 0.80, '405b': 4.50 }
};
export const experimentResults = [
  { name: "Baseline (GPT-4o)", accuracy: 92.4, latency: 1150, refusal: 0.2, cost: 5.40 },
  { name: "Challenger (Fine-tuned Llama-3)", accuracy: 91.8, latency: 450, refusal: 0.5, cost: 1.20 }
];
export const fairnessMetrics = [
  { demographic: "Age 18-25", approvalRate: 0.72, disparateImpact: 0.88 },
  { demographic: "Age 26-45", approvalRate: 0.84, disparateImpact: 1.02 },
  { demographic: "Age 46-65", approvalRate: 0.81, disparateImpact: 0.98 },
  { demographic: "Age 65+", approvalRate: 0.76, disparateImpact: 0.92 }
];