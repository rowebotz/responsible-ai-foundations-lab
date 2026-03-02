import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ShieldAlert, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { guardrailPolicies, blockedPrompts } from "@/data/mock-intelligence";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
export function GuardrailsPage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  const [input, setInput] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [results, setResults] = useState<{ id: string; status: 'pass' | 'fail' }[] | null>(null);
  const handleTest = () => {
    if (!input) return;
    setIsTesting(true);
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      const mockResults = guardrailPolicies.map(p => {
        let status: 'pass' | 'fail' = 'pass';
        if (p.id === 'p-4' && (lowerInput.includes('secret') || lowerInput.includes('password') || lowerInput.includes('ignore'))) status = 'fail';
        if (p.id === 'p-1' && (lowerInput.includes('ssn') || lowerInput.includes('000-') || lowerInput.includes('identifier'))) status = 'fail';
        if (p.id === 'p-3' && (lowerInput.includes('invest') || lowerInput.includes('dogecoin') || lowerInput.includes('buy'))) status = 'fail';
        return { id: p.id, status };
      });
      setResults(mockResults);
      setIsTesting(false);
    }, 1500);
  };
  return (
    <AppLayout container>
      <div className="space-y-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{t.guardrails.title}</h1>
          <p className="text-lg text-muted-foreground">{t.guardrails.subtitle}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-fintech-red" aria-hidden="true" />
                {t.guardrails.simulator.title}
              </CardTitle>
              <CardDescription>{t.guardrails.simulator.desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="prompt-input" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Test Scenario Input
                </Label>
                <Textarea
                  id="prompt-input"
                  placeholder={t.guardrails.simulator.placeholder}
                  className="min-h-[140px] font-mono text-sm bg-muted/30 focus-visible:ring-primary"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  aria-describedby="simulator-hint"
                />
                <p id="simulator-hint" className="text-[10px] text-muted-foreground uppercase font-medium">
                  Financial context focus: PII Detection, AML Compliance, Investment Restrictions.
                </p>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleTest} 
                  disabled={isTesting || !input}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[140px]"
                >
                  {isTesting ? t.guardrails.simulator.scanning : t.guardrails.simulator.button}
                </Button>
              </div>
              <AnimatePresence>
                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t"
                  >
                    {guardrailPolicies.map((p) => {
                      const status = results.find(r => r.id === p.id)?.status;
                      return (
                        <div key={p.id} className="flex items-center justify-between p-4 rounded-md border bg-card shadow-sm">
                          <span className="text-xs font-bold">{p.name}</span>
                          <Badge variant={status === 'pass' ? 'default' : 'destructive'} className="font-mono text-[10px]">
                            {status === 'pass' ? 'PASS' : 'VIOLATION'}
                          </Badge>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md h-fit">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                Active Policy Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {guardrailPolicies.map(p => (
                <div key={p.id} className="space-y-1.5 border-l-2 border-primary/20 pl-3">
                  <p className="text-sm font-bold">{p.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight">
            <ShieldAlert className="h-5 w-5 text-fintech-red" aria-hidden="true" />
            {t.guardrails.gallery.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {blockedPrompts.map((bp) => (
              <Card key={bp.id} className="border-none shadow-sm bg-muted/40 hover:bg-muted/60 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tighter">{bp.severity} {t.guardrails.gallery.severity}</Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">{new Date(bp.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <CardTitle className="text-sm font-bold truncate">{bp.reason}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-[11px] font-mono p-3 bg-card rounded-md border text-muted-foreground line-clamp-3 mb-3">
                    {bp.input}
                  </div>
                  <Button variant="link" className="p-0 h-auto text-[11px] font-bold uppercase tracking-wider text-primary">Investigate Audit Trail</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}