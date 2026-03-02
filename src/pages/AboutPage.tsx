import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Activity, Cpu, CheckCircle2, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
export function AboutPage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  const capabilities = [
    { title: "Guardrail Simulation", desc: "Real-time safety policy enforcement and red-team violation tracking.", icon: Shield },
    { title: "Client-side RAG", desc: "Semantic retrieval workflows using localized vector similarity engines.", icon: Database },
    { title: "Model Benchmarking", desc: "Comparative evaluation of LLM performance on standardized financial datasets.", icon: Zap },
    { title: "Telemetry & Tracing", desc: "Deep-dive observability into latency, token usage, and request lifecycles.", icon: Activity },
    { title: "Risk Governance", desc: "Formalized model inventory, version control, and compliance audit logging.", icon: Cpu },
  ];
  return (
    <AppLayout container>
      <SEO title={`About | Veritas AI Lab`} />
      <div className="max-w-3xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{t.about.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">{t.about.visionTitle}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t.about.visionDesc}
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">{t.about.capabilities}</h2>
          <div className="grid gap-4">
            {capabilities.map((cap) => (
              <Card key={cap.title} className="border-none bg-accent/30 shadow-none ring-1 ring-border/10">
                <CardHeader className="flex flex-row items-center gap-4 py-4">
                  <div className="p-2 rounded-lg bg-background shadow-sm">
                    <cap.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base font-bold">{cap.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cap.desc}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
        <section className="pt-8 border-t space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>{t.about.version}</span>
          </div>
          <p className="text-xs text-muted-foreground italic leading-relaxed">
            {t.about.footer}
          </p>
        </section>
      </div>
    </AppLayout>
  );
}