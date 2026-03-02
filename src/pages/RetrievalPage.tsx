import React, { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Database, Search, CheckCircle2 } from "lucide-react";
import { knowledgeBase } from "@/data/mock-intelligence";
import { cosineSimilarity, getMockQueryVector } from "@/lib/vector-math";
export function RetrievalPage() {
  const [query, setQuery] = useState("");
  const [threshold, setThreshold] = useState([0.3]);
  // Vector is only recalculated when query changes
  const queryVector = useMemo(() => {
    if (!query) return null;
    return getMockQueryVector(query);
  }, [query]);
  const results = useMemo(() => {
    if (!queryVector) return [];
    return knowledgeBase
      .map(doc => ({
        ...doc,
        score: cosineSimilarity(queryVector, doc.vector)
      }))
      .filter(doc => doc.score >= threshold[0])
      .sort((a, b) => b.score - a.score);
  }, [queryVector, threshold]);
  return (
    <AppLayout container>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Semantic Retrieval (RAG)</h1>
          <p className="text-muted-foreground">Analyze document relevance and vector similarity scores in real-time.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Search Query</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter a banking query (e.g., 'mortgage regulations')..."
                className="pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-64 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Relevance Threshold</span>
              <span className="text-muted-foreground">{(threshold[0] * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={threshold}
              onValueChange={setThreshold}
              max={1}
              step={0.05}
              className="py-2"
            />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-4">
            {results.length > 0 ? (
              results.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{doc.title}</h3>
                          <Badge variant="secondary">{doc.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{doc.content}</p>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <span className="text-xs font-mono font-bold">Score: {(doc.score * 100).toFixed(1)}%</span>
                        <Progress value={doc.score * 100} className="h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-[10px] font-mono">ID: {doc.id}</Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">Vector: [{doc.vector.slice(0, 3).join(', ')}...]</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-xl text-muted-foreground">
                <Database className="h-10 w-10 mb-2 opacity-20" />
                <p>{query ? "No documents match this threshold." : "Enter a query to begin retrieval."}</p>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Knowledge Base Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-2xs font-bold text-emerald-600 uppercase tracking-tighter mb-2">
                  <CheckCircle2 className="h-3 w-3" />
                  Deterministic Engine Active
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total Documents</span>
                  <span className="font-mono font-bold">{knowledgeBase.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Vector Dimensions</span>
                  <span className="font-mono font-bold">8-dim</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Index Strategy</span>
                  <span className="font-mono font-bold text-indigo-500 underline">HNSW (Simulated)</span>
                </div>
              </CardContent>
            </Card>
            <div className="p-4 rounded-xl border bg-accent/20 text-xs italic text-muted-foreground">
              Note: The similarity engine uses client-side cosine distance to rank document chunks based on stable semantic embeddings.
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}