import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AccessibleChart } from "@/components/ui/accessible-chart";
import { evaluationCases } from "@/data/mock-intelligence";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
export function EvaluationPage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  const selectedCase = evaluationCases[0];
  const aggregateData = selectedCase.responses.map(r => ({
    name: r.model,
    similarity: r.metrics.similarity * 100,
    truth: r.metrics.truthfulness * 100,
    reasoning: r.metrics.reasoningDensity * 100
  }));
  return (
    <AppLayout container>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{t.evaluation.title}</h1>
          <p className="text-muted-foreground">{t.evaluation.subtitle}</p>
        </div>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20">
            <div className="space-y-1">
              <CardTitle className="text-lg">{t.evaluation.scenario.title}</CardTitle>
              <CardDescription>{t.evaluation.scenario.desc}</CardDescription>
            </div>
            <Badge variant="outline" className="font-mono text-xs">FRONTIER v5.2 BENCH</Badge>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm border shadow-inner">
              <span className="text-muted-foreground block mb-2 font-sans text-[10px] font-bold uppercase tracking-widest">Input Scenario:</span>
              {selectedCase.prompt}
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-6 lg:grid-cols-2">
          {selectedCase.responses.map((resp) => (
            <Card key={resp.model} className="overflow-hidden border-none shadow-md">
              <CardHeader className="bg-secondary/30 pb-4 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-bold">{resp.model}</CardTitle>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">{resp.metrics.truthfulness * 100}% Truthful</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="text-sm leading-relaxed min-h-[100px] text-muted-foreground">
                  {resp.text}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t bg-muted/10 rounded-b-lg">
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={[
                        { subject: "Sim", A: resp.metrics.similarity * 100 },
                        { subject: "Truth", A: resp.metrics.truthfulness * 100 },
                        { subject: "Reason", A: resp.metrics.reasoningDensity * 100 },
                        { subject: "Speed", A: (1 - resp.metrics.latency / 6000) * 100 },
                      ]}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" fontSize={9} />
                        <Radar name={resp.model} dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center gap-4 text-xs pl-4 font-medium">
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-[9px] font-bold uppercase">Reasoning Density</p>
                      <p className="font-mono font-bold text-primary">{(resp.metrics.reasoningDensity * 100).toFixed(1)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-[9px] font-bold uppercase">Avg Latency</p>
                      <p className="font-mono font-bold">{resp.metrics.latency}ms</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <AccessibleChart
              title="Frontier Aggregate Performance"
              description="Comparison of reasoning and truthfulness across integrated Tier-1 LLM deployments."
              data={aggregateData}
              columns={[
                { key: 'name', label: 'Model' },
                { key: 'similarity', label: 'Similarity (%)' },
                { key: 'truth', label: 'Truthfulness (%)' },
                { key: 'reasoning', label: 'Reasoning (%)' }
              ]}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aggregateData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                  <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="similarity" fill="#6366f1" radius={[2, 2, 0, 0]} name="Similarity" />
                  <Bar dataKey="truth" fill="#10b981" radius={[2, 2, 0, 0]} name="Truthfulness" />
                  <Bar dataKey="reasoning" fill="#f59e0b" radius={[2, 2, 0, 0]} name="Reasoning" />
                </BarChart>
              </ResponsiveContainer>
            </AccessibleChart>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}