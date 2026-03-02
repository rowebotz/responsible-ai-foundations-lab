import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Table as TableIcon, BarChart3 } from "lucide-react";
interface AccessibleChartProps {
  children: React.ReactNode;
  data: any[];
  title: string;
  description: string;
  columns: { key: string; label: string }[];
}
export function AccessibleChart({ children, data, title, description, columns }: AccessibleChartProps) {
  const [showTable, setShowTable] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-tight uppercase text-muted-foreground">{title}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTable(!showTable)}
          className="h-7 text-xs gap-2"
        >
          {showTable ? <BarChart3 className="h-3 w-3" /> : <TableIcon className="h-3 w-3" />}
          {showTable ? "View Chart" : "View Table"}
        </Button>
      </div>
      <div className="relative min-h-[250px] w-full">
        {!showTable ? (
          <div className="h-[250px] w-full">
            {children}
          </div>
        ) : (
          <div className="border rounded-md bg-card overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map(col => (
                    <TableHead key={col.key} className="text-xs whitespace-nowrap">{col.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.slice(0, 10).map((row, i) => (
                  <TableRow key={i}>
                    {columns.map(col => (
                      <TableCell key={col.key} className="text-xs font-mono whitespace-nowrap">{row[col.key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {data.length > 10 && (
              <div className="p-2 text-[10px] text-center text-muted-foreground border-t">
                Showing first 10 rows of {data.length} total points.
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground italic leading-relaxed">
        {description}
      </p>
    </div>
  );
}