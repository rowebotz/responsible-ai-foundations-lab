import React, { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AccessibleChart } from "@/components/ui/accessible-chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { optimizationConfigs } from "@/data/mock-enterprise";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
import { Gauge, Zap, DollarSign } from "lucide-react";
export function OptimizationPage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  const [modelSize, setModelSize] = useState([70]);
  const [quant, setQuant] = useState('INT8');
  const [specDecoding, setSpecDecoding] = useState(false);
  const results = useMemo(() => {
    const size = modelSize[0] < 20 ? '7b' : modelSize[0] < 150 ? '70b' : '405b';
    const baseTPS = optimizationConfigs.baseTPS[size];
    const multiplier = optimizationConfigs.quantizationMultipliers[quant as keyof typeof optimizationConfigs.quantizationMultipliers];
    const finalTPS = baseTPS * multiplier * (specDecoding ? 1.4 : 1);
    const latency = 1000 / (finalTPS / 10);
    const cost = optimizationConfigs.costPerMillion[size] * 50; // Arbitrary 50M tokens/mo
    return { tps: finalTPS.toFixed(1), latency: latency.toFixed(0), cost: cost.toFixed(2) };
  }, [modelSize, quant, specDecoding]);
  const chartData = [
    { name: 'Native', value: 100 },
    { name: 'Quantized', value: 140 },
    { name: 'Optimized', value: 195 }
  ];
  return (
    <AppLayout container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-primary">{t.optimization.title}</h1>
            <p className="text-lg text-muted-foreground">{t.optimization.subtitle}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-1 border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base uppercase tracking-wider">{t.optimization.params}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>Model Parameters (B)</span>
                    <span className="font-mono">{modelSize[0]}B</span>
                  </div>
                  <Slider value={modelSize} onValueChange={setModelSize} max={405} min={7} step={1} />
                </div>
                <div className="space-y-4">
                  <Label className="text-xs font-bold uppercase">Quantization</Label>
                  <div className="flex flex-wrap gap-2">
                    {['None', 'INT8', 'FP8', 'INT4'].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuant(q)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${quant === q ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold">Speculative Decoding</Label>
                    <p className="text-[10px] text-muted-foreground uppercase">+40% Throughput</p>
                  </div>
                  <Switch checked={specDecoding} onCheckedChange={setSpecDecoding} />
                </div>
              </CardContent>
            </Card>
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-indigo-50/50 dark:bg-indigo-950/20">
                  <CardContent className="pt-6">
                    <Gauge className="h-4 w-4 text-indigo-500 mb-2" />
                    <p className="text-xs text-muted-foreground uppercase font-bold">{t.optimization.tps}</p>
                    <p className="text-2xl font-mono font-bold">{results.tps}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-emerald-50/50 dark:bg-emerald-950/20">
                  <CardContent className="pt-6">
                    <Zap className="h-4 w-4 text-emerald-500 mb-2" />
                    <p className="text-xs text-muted-foreground uppercase font-bold">Avg Latency</p>
                    <p className="text-2xl font-mono font-bold">{results.latency}ms</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-rose-50/50 dark:bg-rose-950/20">
                  <CardContent className="pt-6">
                    <DollarSign className="h-4 w-4 text-rose-500 mb-2" />
                    <p className="text-xs text-muted-foreground uppercase font-bold">{t.optimization.monthly}</p>
                    <p className="text-2xl font-mono font-bold">${results.cost}</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <AccessibleChart
                    title="Optimization Efficiency"
                    description="Performance gains relative to native float16 baseline through hardware-specific kernels."
                    data={chartData}
                    columns={[{key: 'name', label: 'Strategy'}, {key: 'value', label: 'Gain (%)'}]}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip />
                        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </AccessibleChart>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}