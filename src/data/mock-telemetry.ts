export interface Trace {
  id: string;
  timestamp: string;
  model: string;
  latency: number;
  tokens: number;
  status: 'success' | 'refused' | 'error';
  input: string;
  output: string;
  guardrailTriggers: string[];
}
export interface MetricPoint {
  time: string;
  value: number;
  secondary?: number;
}
export interface ModelEntry {
  id: string;
  name: string;
  version: string;
  status: 'Active' | 'Staging' | 'Deprecated';
  riskTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  owner: string;
  contextWindow: string;
  multimodal: boolean;
  region: string;
  deploymentType: 'Managed API' | 'Self-Hosted';
}
export const recentTraces: Trace[] = [
  {
    id: "tr-frontier-001",
    timestamp: "2024-05-20T10:45:00Z",
    model: "GPT-5.2",
    latency: 2450,
    tokens: 1250,
    status: "success",
    input: "Analyze the quarterly risk report for Capital One and cross-reference with Basel IV requirements.",
    output: "Based on the internal Q1 risk matrix and Basel IV liquidity coverage ratio (LCR) standards, Capital One maintains a robust buffer...",
    guardrailTriggers: [],
  },
  {
    id: "tr-frontier-002",
    timestamp: "2024-05-20T10:42:15Z",
    model: "Claude 4.6 Sonnet-Compliance",
    latency: 850,
    tokens: 420,
    status: "refused",
    input: "Generate a loophole strategy for the AML reporting threshold in cross-border settlements.",
    output: "I cannot assist with strategies designed to circumvent anti-money laundering regulations or reporting requirements.",
    guardrailTriggers: ["Financial_Crime_Policy", "Adversarial_Prompt"],
  },
  {
    id: "tr-frontier-003",
    timestamp: "2024-05-20T10:38:05Z",
    model: "Claude 4.6 Opus",
    latency: 3800,
    tokens: 2100,
    status: "success",
    input: "Perform a deep-dive comparison of Dodd-Frank vs EU AI Act impact on algorithmic trading desks.",
    output: "The intersection of Dodd-Frank Title VII and the EU AI Act creates a complex compliance map for automated trading systems...",
    guardrailTriggers: [],
  },
  {
    id: "tr-frontier-004",
    timestamp: "2024-05-20T10:35:12Z",
    model: "Gemini 3",
    latency: 1800,
    tokens: 5000,
    status: "success",
    input: "Process this 1.2M token dataset of historical mortgage ledger entries for anomaly detection.",
    output: "Analysis complete. Detected 14 instances of anomalous payment structures in the Q3-2023 tranche...",
    guardrailTriggers: [],
  }
];
export const latencyHistory: MetricPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 1200 + Math.random() * 800,
  secondary: 2500 + Math.random() * 1000,
}));
export const tokenUsageHistory: MetricPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 85000 + Math.random() * 25000,
}));
export const modelRegistry: ModelEntry[] = [
  { id: "m-f1", name: "GPT-5.2", version: "5.2.4", status: "Active", riskTier: "Tier 1", owner: "Risk-Alpha-Team", contextWindow: "256k", multimodal: true, region: "us-east-1", deploymentType: "Managed API" },
  { id: "m-f2", name: "GPT-5.2-FinTune", version: "1.0.2", status: "Staging", riskTier: "Tier 1", owner: "Quant-Res-Group", contextWindow: "128k", multimodal: false, region: "on-prem-nyc", deploymentType: "Self-Hosted" },
  { id: "m-f3", name: "Claude 4.6 Opus", version: "4.6.0", status: "Active", riskTier: "Tier 1", owner: "Regulatory-Affairs", contextWindow: "200k", multimodal: true, region: "eu-central-1", deploymentType: "Managed API" },
  { id: "m-f4", name: "Claude 4.6 Sonnet-Compliance", version: "4.6.1", status: "Active", riskTier: "Tier 2", owner: "Compliance-Ops", contextWindow: "200k", multimodal: true, region: "eu-west-1", deploymentType: "Self-Hosted" },
  { id: "m-f5", name: "Gemini 3", version: "3.0.0", status: "Active", riskTier: "Tier 2", owner: "Customer-Success", contextWindow: "2M+", multimodal: true, region: "us-central-1", deploymentType: "Managed API" },
];
export const auditLogs = [
  { id: "au-1", user: "j.doe@veritas.ai", action: "Policy Update", target: "PII-Masking-Global", timestamp: "2024-05-20T08:00:00Z" },
  { id: "au-2", user: "system", action: "Model Promotion", target: "GPT-5.2", timestamp: "2024-05-19T22:30:00Z" },
  { id: "au-3", user: "a.smith@veritas.ai", action: "API Key Rotation", target: "Production-Gateway", timestamp: "2024-05-19T14:15:00Z" },
];