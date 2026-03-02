import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { experimentResults } from "@/data/mock-enterprise";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
import { TrendingUp } from "lucide-react";
export function ExperimentationPage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  const scatterData = experimentResults.map(r => ({
    name: r.name,
    accuracy: r.accuracy,
    cost: r.cost,
    z: 100
  }));
  return (
    <AppLayout container>
      <div className="space-y-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{t.experiments.title}</h1>
          <p className="text-lg text-muted-foreground">{t.experiments.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {experimentResults.map((res, i) => (
            <Card key={res.name} className="border-none shadow-md overflow-hidden">
              <CardHeader className={`${i === 0 ? 'bg-primary/5' : 'bg-emerald-50/50 dark:bg-emerald-950/20'} border-b`}>
                <div className="flex justify-between items-center">
                  <Badge variant={i === 0 ? "secondary" : "default"} className="text-[10px] uppercase">{i === 0 ? 'Baseline' : 'Challenger'}</Badge>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Production Slice: {i === 0 ? '90%' : '10%'}</span>
                </div>
                <CardTitle className="pt-2">{res.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 py-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-bold uppercase">Accuracy</p>
                  <p className="text-2xl font-mono font-bold">{res.accuracy}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-bold uppercase">Latency</p>
                  <p className="text-2xl font-mono font-bold">{res.latency}ms</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-bold uppercase">Refusal</p>
                  <p className="text-2xl font-mono font-bold">{res.refusal}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-bold uppercase">Daily Cost</p>
                  <p className="text-2xl font-mono font-bold">${res.cost}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Accuracy vs. Cost Efficiency</CardTitle>
            </div>
            <CardDescription>Pareto frontier analysis for production model selection.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis type="number" dataKey="cost" name="Cost" unit="$" label={{ value: 'Cost ($)', position: 'bottom', fontSize: 10 }} fontSize={10} />
                <YAxis type="number" dataKey="accuracy" name="Accuracy" unit="%" domain={[90, 95]} label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', fontSize: 10 }} fontSize={10} />
                <ZAxis type="number" dataKey="z" range={[100, 100]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Models" data={scatterData} fill="#6366f1" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}