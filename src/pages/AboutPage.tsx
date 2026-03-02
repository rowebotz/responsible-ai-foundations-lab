import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Activity, Cpu, CheckCircle2, Zap, Rocket, Globe, GitBranch } from "lucide-react";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
export function AboutPage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  const visions = [
    { title: t.about.vision.reliability, desc: "Built for five-nines availability in regulated financial markets.", icon: Shield },
    { title: t.about.vision.scalability, desc: "Distributed vector engines for sub-100ms global inference.", icon: Globe },
    { title: t.about.vision.governance, desc: "Immutable audit trails for compliance with EU AI Act and local regulations.", icon: Cpu },
    { title: t.about.vision.cost, desc: "Automated model routing to minimize TCO without compromising accuracy.", icon: Zap },
  ];
  const roadmap = [
    { phase: "Q3 2026", title: t.about.roadmap.phase1, desc: "Latency-optimized clusters across major financial hubs.", icon: Globe },
    { phase: "Q4 2026", title: t.about.roadmap.phase2, desc: "Dynamic traffic shifting between provider clusters.", icon: Rocket },
    { phase: "Q1 2027", title: t.about.roadmap.phase3, desc: "Unified pipeline for model fine-tuning and safety alignment.", icon: GitBranch },
  ];
  return (
    <AppLayout container={false}>
      <SEO title={`About | Veritas AI Lab`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="max-w-3xl space-y-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary">{t.about.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.about.subtitle}
            </p>
          </div>
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight border-b pb-2">{t.about.visionTitle}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {visions.map((v) => (
                <Card key={v.title} className="border-none shadow-md hover:ring-1 ring-primary/20 transition-all">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/5">
                      <v.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base font-bold">{v.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight border-b pb-2">{t.about.roadmap.title}</h2>
            <div className="relative border-l-2 border-primary/10 ml-4 space-y-12">
              {roadmap.map((item, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-background border-2 border-primary" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{item.phase}</span>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="pt-12 border-t space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>{t.about.version}</span>
            </div>
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              {t.about.footer}
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}