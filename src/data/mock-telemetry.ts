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
export const recentTraces: Trace[] = [
  {
    id: "tr-9482",
    timestamp: "2024-05-20T10:45:00Z",
    model: "gpt-4-turbo",
    latency: 1240,
    tokens: 450,
    status: "success",
    input: "Analyze the quarterly risk report for Capital One.",
    output: "Based on the Q1 reports, the primary risk vectors include interest rate volatility and commercial real estate exposure...",
    guardrailTriggers: [],
  },
  {
    id: "tr-9481",
    timestamp: "2024-05-20T10:42:15Z",
    model: "gpt-3.5-turbo",
    latency: 450,
    tokens: 120,
    status: "refused",
    input: "How can I bypass the AML reporting requirements for a $50k transfer?",
    output: "I cannot assist with requests related to bypassing anti-money laundering regulations or illegal financial activities.",
    guardrailTriggers: ["Financial_Crime_Policy", "Adversarial_Prompt"],
  },
  {
    id: "tr-9480",
    timestamp: "2024-05-20T10:38:05Z",
    model: "claude-3-opus",
    latency: 2800,
    tokens: 890,
    status: "success",
    input: "Summarize the Dodd-Frank Act's impact on small regional banks.",
    output: "The Dodd-Frank Wall Street Reform and Consumer Protection Act introduced several key regulatory shifts for small banks...",
    guardrailTriggers: [],
  },
  {
    id: "tr-9479",
    timestamp: "2024-05-20T10:35:12Z",
    model: "gpt-4-turbo",
    latency: 1100,
    tokens: 310,
    status: "error",
    input: "Generate a synthetic dataset of credit card transactions.",
    output: "System Error: Context window exceeded or upstream timeout.",
    guardrailTriggers: [],
  }
];
export const latencyHistory: MetricPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 800 + Math.random() * 400,
  secondary: 1500 + Math.random() * 500,
}));
export const tokenUsageHistory: MetricPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 45000 + Math.random() * 15000,
}));
export const modelRegistry = [
  { id: "m-001", name: "GPT-4-Turbo-Fin", version: "2.1.0", status: "Active", riskLevel: "Medium", owner: "Risk-Alpha-Team" },
  { id: "m-002", name: "Llama-3-70b-Quant", version: "1.0.4", status: "Staging", riskLevel: "High", owner: "Quant-Res-Group" },
  { id: "m-003", name: "Claude-3-Haiku", version: "1.0.0", status: "Active", riskLevel: "Low", owner: "Customer-Success" },
];
export const auditLogs = [
  { id: "au-1", user: "j.doe@veritas.ai", action: "Policy Update", target: "PII-Masking-Global", timestamp: "2024-05-20T08:00:00Z" },
  { id: "au-2", user: "system", action: "Model Promotion", target: "GPT-4-Turbo-Fin", timestamp: "2024-05-19T22:30:00Z" },
  { id: "au-3", user: "a.smith@veritas.ai", action: "API Key Rotation", target: "Production-Gateway", timestamp: "2024-05-19T14:15:00Z" },
];