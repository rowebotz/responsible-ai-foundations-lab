import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/ui/metric-card";
import { SEO } from "@/components/SEO";
import { SystemDiagram } from "@/components/architecture/SystemDiagram";
import { Activity, ShieldAlert, Cpu, Timer } from "lucide-react";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
export function HomePage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  return (
    <AppLayout container>
      <SEO title={`${t.overview.title} | Veritas AI`} />
      <div className="space-y-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            {t.overview.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t.overview.subtitle}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title={t.overview.metrics.requests}
            value="1,248,392"
            icon={<Activity className="h-4 w-4" aria-hidden="true" />}
            className="border-none shadow-md ring-1 ring-border/50"
          />
          <MetricCard
            title={t.overview.metrics.latency}
            value="842ms"
            icon={<Timer className="h-4 w-4" aria-hidden="true" />}
            className="border-none shadow-md ring-1 ring-border/50"
          />
          <MetricCard
            title={t.overview.metrics.refusals}
            value="0.42%"
            icon={<ShieldAlert className="h-4 w-4" aria-hidden="true" />}
            className="border-none shadow-md ring-1 ring-border/50"
          />
          <MetricCard
            title={t.overview.metrics.availability}
            value="99.981%"
            icon={<Cpu className="h-4 w-4" aria-hidden="true" />}
            className="border-none shadow-md ring-1 ring-border/50"
          />
        </div>
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-bold tracking-tight uppercase text-muted-foreground/80">
              {t.overview.architecture.title}
            </h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Live Traffic Simulation</span>
            </div>
          </div>
          <div className="rounded-xl border bg-card/50 p-6 md:p-10 shadow-sm backdrop-blur-sm">
            <SystemDiagram />
            <p className="mt-8 text-center text-xs text-muted-foreground font-medium tracking-wide">
              {t.overview.architecture.footer}
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}