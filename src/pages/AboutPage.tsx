import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Activity, Cpu, CheckCircle2, Zap } from "lucide-react";
export function AboutPage() {
  const capabilities = [
    { title: "Guardrail Simulation", desc: "Real-time safety policy enforcement and red-team violation tracking.", icon: Shield },
    { title: "Client-side RAG", desc: "Semantic retrieval workflows using localized vector similarity engines.", icon: Database },
    { title: "Model Benchmarking", desc: "Comparative evaluation of LLM performance on standardized financial datasets.", icon: Zap },
    { title: "Telemetry & Tracing", desc: "Deep-dive observability into latency, token usage, and request lifecycles.", icon: Activity },
    { title: "Risk Governance", desc: "Formalized model inventory, version control, and compliance audit logging.", icon: Cpu },
  ];
  return (
    <AppLayout container>
      <SEO title="About | Veritas AI Lab" />
      <div className="max-w-3xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About the Lab</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Veritas AI Lab is an independently engineered prototype of an enterprise-grade AI control plane, 
            designed to exemplify scalable systems thinking for LLM deployments in regulated financial services.
          </p>
        </div>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Architectural Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            The platform provides a blueprint for managing the "unpredictable" nature of large language models. 
            By centralizing the request flow—orchestrating gateway logic, safety guardrails, knowledge retrieval, 
            and inference—enterprises can maintain rigorous oversight without sacrificing the agility of AI innovation. 
            This simulation demonstrates how observability and governance are not just "add-ons," but fundamental 
            components of a responsible AI infrastructure.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Key Capabilities</h2>
          <div className="grid gap-4">
            {capabilities.map((cap) => (
              <Card key={cap.title} className="border-none bg-accent/30 shadow-none">
                <CardHeader className="flex flex-row items-center gap-4 py-4">
                  <div className="p-2 rounded-lg bg-background">
                    <cap.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{cap.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cap.desc}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
        <section className="pt-8 border-t space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Prototype Version 1.2.0-Stable</span>
          </div>
          <p className="text-xs text-muted-foreground italic">
            This laboratory environment uses high-fidelity mock data and client-side calculations 
            to simulate complex backend operations for demonstration purposes.
          </p>
        </section>
      </div>
    </AppLayout>
  );
}