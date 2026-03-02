import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { buildBuyData, frontierComparison } from "@/data/mock-enterprise";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
import { Lightbulb, Scale, Zap, Info } from "lucide-react";
export function BuildBuyPage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  return (
    <AppLayout container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-primary">{t.buildBuy.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{t.buildBuy.subtitle}</p>
          </div>
          <Tabs defaultValue="frontier" className="w-full">
            <TabsList className="mb-8 h-10 p-1 bg-muted/50 rounded-lg">
              <TabsTrigger value="frontier" className="px-6 py-1.5 rounded-md">Frontier Matrix</TabsTrigger>
              {buildBuyData.map((section) => (
                <TabsTrigger key={section.category} value={section.category} className="px-6 py-1.5 rounded-md">
                  {section.category}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="frontier" className="space-y-6">
               <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader className="bg-muted/30 border-b">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <CardTitle>Frontier Model Benchmark (2026-2027)</CardTitle>
                    </div>
                    <CardDescription>Comparative technical capabilities of Tier-1 reasoning engines.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-6">Model</TableHead>
                          <TableHead>Reasoning</TableHead>
                          <TableHead>Cost Efficiency</TableHead>
                          <TableHead>Context Window</TableHead>
                          <TableHead>Multimodal</TableHead>
                          <TableHead className="pr-6">Compliance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {frontierComparison.map((f) => (
                          <TableRow key={f.model}>
                            <TableCell className="font-bold pl-6">{f.model}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `${f.reasoning * 100}%` }} />
                                </div>
                                <span className="text-[10px] font-mono">{(f.reasoning * 100).toFixed(0)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500" style={{ width: `${f.cost * 100}%` }} />
                                </div>
                                <span className="text-[10px] font-mono">{(f.cost * 100).toFixed(0)}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{f.context}</TableCell>
                            <TableCell className="text-xs">{f.multimodal}</TableCell>
                            <TableCell className="pr-6">
                               <Badge variant="outline" className="text-[10px] font-bold uppercase">{f.compliance}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <div className="bg-primary/5 p-4 rounded-lg flex gap-3 items-start border border-primary/10">
                  <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Data reflects hardware-accelerated kernels (FP8/INT4) on H200/B200 clusters. "Reasoning" score is normalized across GSM8K and internal banking benchmarks.
                  </p>
                </div>
            </TabsContent>
            {buildBuyData.map((section) => (
              <TabsContent key={section.category} value={section.category} className="space-y-8">
                <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader className="bg-muted/30 border-b">
                    <div className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-primary" />
                      <CardTitle>{section.category} Comparison</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-6">{t.buildBuy.options.name}</TableHead>
                          <TableHead>{t.buildBuy.options.latency}</TableHead>
                          <TableHead>{t.buildBuy.options.cost}</TableHead>
                          <TableHead>{t.buildBuy.options.risk}</TableHead>
                          <TableHead className="pr-6">Compliance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {section.options.map((opt) => (
                          <TableRow key={opt.name}>
                            <TableCell className="font-bold pl-6">{opt.name}</TableCell>
                            <TableCell className="font-mono text-xs">{opt.latency}</TableCell>
                            <TableCell className="text-xs font-medium">{opt.cost}</TableCell>
                            <TableCell>
                              <Badge variant={opt.risk === 'Low' ? 'default' : 'outline'} className="text-[10px]">
                                {opt.risk}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground pr-6">{opt.compliance}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-none shadow-inner">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      {t.buildBuy.recommendation}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-foreground/80 font-medium">
                      {section.recommendation}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}