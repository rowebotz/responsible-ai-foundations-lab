import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccessibleChart } from "@/components/ui/accessible-chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { fairnessMetrics } from "@/data/mock-enterprise";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
import { ShieldCheck, Info } from "lucide-react";
export function FairnessPage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  return (
    <AppLayout container>
      <div className="space-y-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{t.fairness.title}</h1>
          <p className="text-lg text-muted-foreground">{t.fairness.subtitle}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base uppercase tracking-wider">{t.fairness.parity}</CardTitle>
              </CardHeader>
              <CardContent>
                <AccessibleChart
                  title="Approval Rates by Age Group"
                  description="Monitoring for disparate impact in automated lending decisions across demographic slices."
                  data={fairnessMetrics}
                  columns={[{key: 'demographic', label: 'Group'}, {key: 'approvalRate', label: 'Rate'}]}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fairnessMetrics}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                      <XAxis dataKey="demographic" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
                      <Tooltip formatter={(val: number) => `${(val * 100).toFixed(1)}%`} />
                      <Bar dataKey="approvalRate" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </AccessibleChart>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-base uppercase tracking-wider">{t.fairness.disparate}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fairnessMetrics} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.1} />
                      <XAxis type="number" domain={[0, 1.5]} fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis dataKey="demographic" type="category" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <ReferenceLine x={0.8} stroke="red" strokeDasharray="3 3" label={{ position: 'top', value: '0.8 Rule', fontSize: 10, fill: 'red' }} />
                      <Bar dataKey="disparateImpact" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="h-fit bg-primary/5 border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Regulatory Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Fair Lending Act (Regulation B)
                </p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  AI models used for credit scoring must demonstrate non-discriminatory intent and impact. The 4/5ths Rule (80%) is the standard threshold for identifying disparate impact.
                </p>
              </div>
              <div className="pt-6 border-t border-primary/10">
                <h4 className="text-xs font-bold uppercase mb-3">Compliance Checklist</h4>
                <ul className="space-y-2 text-xs font-medium">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Demographic Parity Audit (Weekly)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Adversarial Bias Testing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Explainability Report (SHAP/LIME)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}