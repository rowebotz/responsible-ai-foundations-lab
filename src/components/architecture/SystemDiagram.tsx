import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Database, Cpu, Activity } from "lucide-react";
const nodes = [
  { id: 'app', label: 'Client App', icon: <Activity className="w-6 h-6" />, color: 'bg-blue-500' },
  { id: 'gateway', label: 'AI Gateway', icon: <Zap className="w-6 h-6" />, color: 'bg-indigo-500' },
  { id: 'guardrails', label: 'Guardrails', icon: <Shield className="w-6 h-6" />, color: 'bg-rose-500' },
  { id: 'rag', label: 'Retriever', icon: <Database className="w-6 h-6" />, color: 'bg-emerald-500' },
  { id: 'llm', label: 'Model (LLM)', icon: <Cpu className="w-6 h-6" />, color: 'bg-amber-500' },
];
export function SystemDiagram() {
  return (
    <div className="relative w-full overflow-x-auto py-10">
      <div className="min-w-[800px] flex items-center justify-between px-10">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <div className="flex flex-col items-center gap-3 relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${node.color} p-4 rounded-2xl text-white shadow-lg ring-4 ring-background`}
              >
                {node.icon}
              </motion.div>
              <span className="text-sm font-medium whitespace-nowrap">{node.label}</span>
            </div>
            {index < nodes.length - 1 && (
              <div className="flex-1 h-1 bg-muted relative mx-4 min-w-[60px]">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop",
                    ease: "linear",
                    delay: index * 0.5
                  }}
                  className="absolute inset-0 bg-primary/40 rounded-full"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-12 text-center text-xs text-muted-foreground italic">
        Real-time telemetry visualized: Tokens flow from left to right through safety filters and knowledge retrieval.
      </div>
    </div>
  );
}