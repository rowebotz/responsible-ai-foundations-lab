import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { modelRegistry, auditLogs } from "@/data/mock-telemetry";
import { ClipboardCheck, ShieldCheck, History } from "lucide-react";
export function GovernancePage() {
  return (
    <AppLayout container>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Governance & Risk</h1>
          <p className="text-muted-foreground">Model inventory, compliance checks, and system audit logs.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {modelRegistry.map((model) => (
            <Card key={model.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">v{model.version}</Badge>
                  <Badge variant={model.riskLevel === 'Low' ? 'default' : model.riskLevel === 'Medium' ? 'outline' : 'destructive'}>
                    {model.riskLevel} Risk
                  </Badge>
                </div>
                <CardTitle className="text-lg">{model.name}</CardTitle>
                <CardDescription>Managed by {model.owner}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 border-t text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="h-4 w-4 text-emerald-500" />
                  <span>Validation: Pass</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                  <span>Status: {model.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">System Audit Log</CardTitle>
            </div>
            <CardDescription>Immutable record of configuration changes and administrative actions.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target Component</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm font-medium">{log.user}</TableCell>
                    <TableCell className="text-sm">
                      <Badge variant="outline">{log.action}</Badge>
                    </TableCell>
                    <TableCell className="text-xs font-mono">{log.target}</TableCell>
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