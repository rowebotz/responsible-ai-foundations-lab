import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AccessibleChart } from "@/components/ui/accessible-chart";
import { recentTraces, latencyHistory, tokenUsageHistory } from "@/data/mock-telemetry";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
import { Share2 } from "lucide-react";
export function ObservabilityPage() {
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  return (
    <AppLayout container>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t.observability.title}</h1>
              <p className="text-muted-foreground">{t.observability.subtitle}</p>
            </div>
            <Badge variant="outline" className="gap-1.5 py-1 px-3">
              <Share2 className="h-3 w-3" />
              Frontier Mesh Active
            </Badge>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <AccessibleChart
                title={t.observability.charts.latency}
                description={t.observability.charts.latencyDesc}
                data={latencyHistory}
                columns={[
                  { key: 'time', label: 'Time' },
                  { key: 'value', label: 'P50 (ms)' },
                  { key: 'secondary', label: 'P95 (ms)' }
                ]}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={latencyHistory}>
                    <defs>
                      <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="time" hide />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorLatency)" />
                    <Area type="monotone" dataKey="secondary" stroke="#94a3b8" fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </AccessibleChart>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <AccessibleChart
                title={t.observability.charts.tokens}
                description={t.observability.charts.tokensDesc}
                data={tokenUsageHistory}
                columns={[
                  { key: 'time', label: 'Time' },
                  { key: 'value', label: 'Tokens/Sec' }
                ]}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tokenUsageHistory}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="time" hide />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </AccessibleChart>
            </CardContent>
          </Card>
        </div>
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-base">{t.observability.traces.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px] pl-6">{t.observability.traces.id}</TableHead>
                  <TableHead>{t.observability.traces.status}</TableHead>
                  <TableHead>{t.observability.traces.model}</TableHead>
                  <TableHead>{t.observability.traces.latency}</TableHead>
                  <TableHead>{t.observability.traces.tokens}</TableHead>
                  <TableHead className="max-w-[300px] pr-6">{t.observability.traces.input}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTraces.map((trace) => (
                  <TableRow key={trace.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell className="font-mono text-[10px] pl-6">{trace.id}</TableCell>
                    <TableCell>
                      <Badge
                        variant={trace.status === 'success' ? 'default' : trace.status === 'refused' ? 'outline' : 'destructive'}
                        className="capitalize text-[9px] font-bold"
                      >
                        {trace.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-bold">{trace.model}</TableCell>
                    <TableCell className="text-xs font-mono">{trace.latency}ms</TableCell>
                    <TableCell className="text-xs font-mono">{trace.tokens}</TableCell>
                    <TableCell className="text-xs truncate max-w-[300px] text-muted-foreground pr-6 font-medium">{trace.input}</TableCell>
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