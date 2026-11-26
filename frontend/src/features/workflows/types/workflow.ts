export type WorkflowNodeType = 
  | 'input' 
  | 'retrieval' 
  | 'analysis' 
  | 'processing' 
  | 'prediction' 
  | 'output';

export interface WorkflowNodeData {
  label: string;
  type: WorkflowNodeType;
  description: string;
  status?: 'idle' | 'running' | 'success' | 'failed';
  config?: Record<string, any>;
  iconName?: string;
  inputs?: string[];
  outputs?: string[];
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  nodesCount: number;
  estimatedRuntime: string;
  initialNodes: any[];
  initialEdges: any[];
}

export interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  nodesCount: number;
  status: 'active' | 'draft' | 'archived';
  nodes: any[];
  edges: any[];
  lastRunStatus?: 'success' | 'idle' | 'failed';
}
