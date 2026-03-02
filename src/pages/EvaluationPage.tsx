import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { evaluationCases } from "@/data/mock-intelligence";
export function EvaluationPage() {
  const selectedCase = evaluationCases[0];
  return (
    <AppLayout container>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Model Evaluation</h1>
          <p className="text-muted-foreground">Head-to-head comparison of model performance on standard banking benchmarks.</p>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Dataset Scenario: Loan Risk Extraction</CardTitle>
              <CardDescription>Evaluates ability to identify risk vectors in commercial lending documents.</CardDescription>
            </div>
            <Badge variant="outline">Benchmark v1.2</Badge>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm border">
              <span className="text-muted-foreground block mb-2 font-sans text-xs uppercase tracking-wider">Prompt:</span>
              {selectedCase.prompt}
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-6 lg:grid-cols-2">
          {selectedCase.responses.map((resp) => (
            <Card key={resp.model} className="overflow-hidden">
              <CardHeader className="bg-secondary/30 pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{resp.model}</CardTitle>
                  <Badge>{resp.metrics.truthfulness * 100}% Accuracy</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="text-sm leading-relaxed min-h-[100px]">
                  {resp.text}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={[
                        { subject: 'Similarity', A: resp.metrics.similarity * 100 },
                        { subject: 'Truth', A: resp.metrics.truthfulness * 100 },
                        { subject: 'Speed', A: (1 - resp.metrics.latency / 3000) * 100 },
                      ]}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" fontSize={10} />
                        <Radar name={resp.model} dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-xs uppercase">Semantic Similarity</p>
                      <p className="font-bold">{(resp.metrics.similarity * 100).toFixed(1)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-xs uppercase">Latent Time</p>
                      <p className="font-bold">{resp.metrics.latency}ms</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aggregate Metric Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedCase.responses.map(r => ({ name: r.model, similarity: r.metrics.similarity * 100, truth: r.metrics.truthfulness * 100 }))}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="similarity" fill="#6366f1" radius={[4, 4, 0, 0]} name="Semantic Similarity" />
                <Bar dataKey="truth" fill="#10b981" radius={[4, 4, 0, 0]} name="Truthfulness Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}