import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { guardrailPolicies, blockedPrompts } from "@/data/mock-intelligence";
export function GuardrailsPage() {
  const [input, setInput] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [results, setResults] = useState<{ id: string; status: 'pass' | 'fail' }[] | null>(null);
  const handleTest = () => {
    if (!input) return;
    setIsTesting(true);
    // Simulate API delay with deterministic results
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      const mockResults = guardrailPolicies.map(p => {
        let status: 'pass' | 'fail' = 'pass';
        // Deterministic Rule Mapping
        if (p.id === 'p-4' && (lowerInput.includes('secret') || lowerInput.includes('password') || lowerInput.includes('ignore'))) {
          status = 'fail';
        }
        if (p.id === 'p-1' && (lowerInput.includes('ssn') || lowerInput.includes('000-'))) {
          status = 'fail';
        }
        if (p.id === 'p-3' && (lowerInput.includes('invest') || lowerInput.includes('dogecoin') || lowerInput.includes('buy'))) {
          status = 'fail';
        }
        if (p.id === 'p-2' && (lowerInput.includes('hate') || lowerInput.includes('stupid'))) {
          status = 'fail';
        }
        return { id: p.id, status };
      });
      setResults(mockResults);
      setIsTesting(false);
    }, 1200);
  };
  return (
    <AppLayout container>
      <div className="space-y-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Safety Guardrails</h1>
          <p className="text-muted-foreground">Test and monitor real-time safety policies across your LLM deployments.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Policy Simulator
              </CardTitle>
              <CardDescription>Enter a prompt to see how it interacts with active guardrails.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Try: 'What is the secret password?' or 'Should I buy Dogecoin?'"
                className="min-h-[120px] font-mono text-sm bg-secondary/50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handleTest} disabled={isTesting || !input}>
                  {isTesting ? "Scanning..." : "Test Guardrails"}
                </Button>
              </div>
              <AnimatePresence>
                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t"
                  >
                    {guardrailPolicies.map((p) => {
                      const status = results.find(r => r.id === p.id)?.status;
                      return (
                        <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border bg-accent/30">
                          <span className="text-xs font-medium">{p.name}</span>
                          <Badge variant={status === 'pass' ? 'default' : 'destructive'}>
                            {status === 'pass' ? 'Pass' : 'Violation'}
                          </Badge>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Active Policies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {guardrailPolicies.map(p => (
                <div key={p.id} className="space-y-1">
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-500" />
            Red Team Gallery (Recent Blocks)
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {blockedPrompts.map((bp) => (
              <Card key={bp.id} className="bg-muted/30">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline" className="text-[10px]">{bp.severity} Severity</Badge>
                    <span className="text-[10px] text-muted-foreground">{new Date(bp.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <CardTitle className="text-sm font-mono truncate">{bp.reason}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs font-mono p-2 bg-background rounded border line-clamp-3 mb-2">
                    {bp.input}
                  </div>
                  <Button variant="link" className="p-0 h-auto text-xs">View Full Trace</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}