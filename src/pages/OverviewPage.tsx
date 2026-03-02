import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/ui/metric-card";
import { SEO } from "@/components/SEO";
import { SystemDiagram } from "@/components/architecture/SystemDiagram";
import { Activity, ShieldAlert, Cpu, Timer } from "lucide-react";
export function OverviewPage() {
  return (
    <AppLayout container>
      <SEO title="Responsible AI Foundations Lab | Stephen Rowe" />
      <div className="space-y-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="text-muted-foreground">Responsible AI control plane status for the last 24 hours.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="Total Requests" 
            value="1.2M" 
            trend={{ value: 12, isUp: true }}
            icon={<Activity className="h-4 w-4" />}
            description="from yesterday"
          />
          <MetricCard 
            title="Avg Latency" 
            value="840ms" 
            trend={{ value: 2.4, isUp: false }}
            icon={<Timer className="h-4 w-4" />}
            description="p95 response time"
          />
          <MetricCard 
            title="Refusal Rate" 
            value="0.42%" 
            trend={{ value: 0.1, isUp: true }}
            icon={<ShieldAlert className="h-4 w-4" />}
            description="policy violations"
          />
          <MetricCard 
            title="Model Availability" 
            value="99.98%" 
            icon={<Cpu className="h-4 w-4" />}
            description="across 4 clusters"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Request Lifecycle Architecture</h2>
          <div className="rounded-xl border bg-card p-8">
            <SystemDiagram />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}