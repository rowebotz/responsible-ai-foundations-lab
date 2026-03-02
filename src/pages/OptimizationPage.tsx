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
  const [modelSize, setModelSize] = useState([405]);
  const [quant, setQuant] = useState('FP8');
  const [specDecoding, setSpecDecoding] = useState(true);
  const results = useMemo(() => {
    let size: '7b' | '70b' | '405b' | 'Frontier' = 'Frontier';
    if (modelSize[0] < 20) size = '7b';
    else if (modelSize[0] < 150) size = '70b';
    else if (modelSize[0] < 500) size = '405b';
    else size = 'Frontier';
    const baseTPS = optimizationConfigs.baseTPS[size];
    const multiplier = optimizationConfigs.quantizationMultipliers[quant as keyof typeof optimizationConfigs.quantizationMultipliers] || 1;
    const finalTPS = baseTPS * multiplier * (specDecoding ? 1.45 : 1);
    const latency = 1000 / (finalTPS / 10);
    const cost = optimizationConfigs.costPerMillion[size] * 100; // 100M tokens/mo base
    return { tps: finalTPS.toFixed(1), latency: latency.toFixed(0), cost: cost.toFixed(2) };
  }, [modelSize, quant, specDecoding]);
  const chartData = [
    { name: 'Baseline', value: 100 },
    { name: 'Quantized', value: 160 },
    { name: 'Speculative', value: 232 }
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
            <Card className="lg:col-span-1 border-none shadow-md h-fit">
              <CardHeader>
                <CardTitle className="text-base uppercase tracking-wider">{t.optimization.params}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>Model Size (Billion)</span>
                    <span className="font-mono text-primary">{modelSize[0]}B</span>
                  </div>
                  <Slider value={modelSize} onValueChange={setModelSize} max={1000} min={7} step={1} />
                </div>
                <div className="space-y-4">
                  <Label className="text-xs font-bold uppercase">Precision / Quantization</Label>
                  <div className="flex flex-wrap gap-2">
                    {['None', 'INT8', 'FP8', 'INT4'].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuant(q)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all ${quant === q ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'hover:bg-muted border-input'}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold">Speculative Decoding</Label>
                    <p className="text-[10px] text-muted-foreground uppercase font-medium">Draft-Model Assisted (+45%)</p>
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
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">{t.optimization.tps}</p>
                    <p className="text-2xl font-mono font-bold text-indigo-700 dark:text-indigo-400">{results.tps}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-emerald-50/50 dark:bg-emerald-950/20">
                  <CardContent className="pt-6">
                    <Zap className="h-4 w-4 text-emerald-500 mb-2" />
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Avg Latency</p>
                    <p className="text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-400">{results.latency}ms</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-rose-50/50 dark:bg-rose-950/20">
                  <CardContent className="pt-6">
                    <DollarSign className="h-4 w-4 text-rose-500 mb-2" />
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">{t.optimization.monthly} (100M tokens)</p>
                    <p className="text-2xl font-mono font-bold text-rose-700 dark:text-rose-400">${results.cost}</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <AccessibleChart
                    title="2026 Hardware Gain Efficiency"
                    description="Performance gains relative to standard float16 inference through hardware-optimized kernels."
                    data={chartData}
                    columns={[{key: 'name', label: 'Strategy'}, {key: 'value', label: 'Gain (%)'}]}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip contentStyle={{ fontSize: '11px' }} />
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