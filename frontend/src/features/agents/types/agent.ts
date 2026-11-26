export type AgentCategory = 
  | 'Knowledge Retrieval' 
  | 'Data Analysis' 
  | 'Predictive Intelligence' 
  | 'Response Generation';

export interface AgentTool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AgentExecutionLog {
  id: string;
  timestamp: string;
  action: string;
  durationMs: number;
  status: 'success' | 'warning' | 'error';
  querySample: string;
}

export interface AgentDefinition {
  id: string;
  name: string;
  category: AgentCategory;
  description: string;
  longDescription: string;
  role: string;
  instructions: string;
  tools: string[]; // tool names
  status: 'active' | 'idle' | 'executing';
  iconName: string;
  accentColor: string; // hex
  modelName: string; // e.g. "Gemini 1.5 Pro (Simulated)"
  temperature: number;
  totalInvocations: number;
  avgLatencyMs: number;
  executionHistory: AgentExecutionLog[];
  isCustom?: boolean;
}
