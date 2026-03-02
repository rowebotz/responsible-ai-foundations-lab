import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { modelRegistry, auditLogs } from "@/data/mock-telemetry";
import { ClipboardCheck, ShieldCheck, History, Globe, Box, Layers } from "lucide-react";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
export function GovernancePage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  return (
    <AppLayout container>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{t.governance.title}</h1>
          <p className="text-muted-foreground">{t.governance.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modelRegistry.map((model) => (
            <Card key={model.id} className="border-none shadow-md ring-1 ring-border/50 relative overflow-hidden">
              <div className={`absolute top-0 right-0 h-1 w-full ${model.deploymentType === 'Self-Hosted' ? 'bg-indigo-500' : 'bg-primary'}`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2 text-[9px] font-bold">v{model.version}</Badge>
                  <Badge
                    variant={model.riskTier === 'Tier 1' ? 'destructive' : 'outline'}
                    className="text-[9px] uppercase font-bold"
                  >
                    {model.riskTier}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  {model.name}
                  {model.multimodal && <Layers className="h-3 w-3 text-muted-foreground" title="Multimodal Support" />}
                </CardTitle>
                <CardDescription className="text-xs">{t.governance.models.managed} {model.owner}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 border-t space-y-3">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    <span>{model.region}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Box className="h-3 w-3" />
                    <span>{model.deploymentType}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Context Window</span>
                  <span className="font-mono">{model.contextWindow}</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-[11px] pt-2 border-t">
                  <ClipboardCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{t.governance.models.validation}: Verified (ISO 42001)</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-[11px]">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                  <span>{t.governance.models.status}: {model.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base font-bold">{t.governance.audit.title}</CardTitle>
            </div>
            <CardDescription className="text-xs">{t.governance.audit.desc}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] uppercase font-bold">{t.governance.audit.timestamp}</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold">{t.governance.audit.user}</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold">{t.governance.audit.action}</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold">{t.governance.audit.target}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs text-muted-foreground font-mono">
                      {new Date(log.timestamp).toLocaleString(currentLang === 'en' ? 'en-US' : 'es-ES')}
                    </TableCell>
                    <TableCell className="text-xs font-bold">{log.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tighter">{log.action}</Badge>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-primary/70">{log.target}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}