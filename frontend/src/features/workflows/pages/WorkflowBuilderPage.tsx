import React, { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  ArrowLeft,
  Play,
  Save,
  Plus,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';
import { INITIAL_WORKFLOWS } from '../data/mockWorkflows';
import { WorkflowItem, WorkflowNodeType, WorkflowNodeData } from '../types/workflow';
import { CustomWorkflowNode } from '../components/CustomWorkflowNode';
import { NodePropertiesPanel } from '../components/NodePropertiesPanel';
import { AddNodeMenu } from '../components/AddNodeMenu';
import { useUIStore } from '@/store/uiStore';

export const WorkflowBuilderPage: React.FC = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const { setToast } = useUIStore();

  const [workflows, setWorkflows] = useState<WorkflowItem[]>(() => {
    const saved = localStorage.getItem('layra_workflows');
    return saved ? JSON.parse(saved) : INITIAL_WORKFLOWS;
  });

  const currentWorkflow = workflows.find((w) => w.id === workflowId) || workflows[0];

  const [nodes, setNodes] = useState<Node[]>(currentWorkflow?.nodes || []);
  const [edges, setEdges] = useState<Edge[]>(currentWorkflow?.edges || []);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [isRunningSim, setIsRunningSim] = useState(false);

  const nodeTypes = useMemo(() => ({ custom: CustomWorkflowNode }), []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: false }, eds)),
    []
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  };

  const handlePaneClick = () => {
    setSelectedNodeId(null);
  };

  const selectedNode = selectedNodeId
    ? (nodes.find((n) => n.id === selectedNodeId) as unknown as { id: string; data: WorkflowNodeData } | null)
    : null;

  const handleAddNode = (type: WorkflowNodeType, label: string, description: string) => {
    const newId = `node_${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'custom',
      position: { x: 300 + Math.random() * 80, y: 180 + Math.random() * 80 },
      data: {
        label,
        type,
        description,
        status: 'idle',
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setSelectedNodeId(newId);
    setToast(`Added node: ${label}`);
  };

  const handleDeleteNode = (id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setSelectedNodeId(null);
    setToast('Node removed from canvas.');
  };

  const handleUpdateLabel = (id: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label: newLabel } } : n))
    );
  };

  const handleUpdateDescription = (id: string, newDesc: string) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, description: newDesc } } : n))
    );
  };

  const handleSave = () => {
    const updated = workflows.map((w) =>
      w.id === currentWorkflow.id
        ? {
            ...w,
            nodes,
            edges,
            nodesCount: nodes.length,
            updatedAt: new Date().toISOString(),
          }
        : w
    );
    setWorkflows(updated);
    localStorage.setItem('layra_workflows', JSON.stringify(updated));
    setToast('Workflow pipeline saved locally.');
  };

  const handleRunSimulation = () => {
    if (isRunningSim) return;
    setIsRunningSim(true);
    setToast('Simulating workflow execution pipeline...');

    // Sequentially highlight nodes
    let step = 0;
    const interval = setInterval(() => {
      if (step < nodes.length) {
        const currentActiveId = nodes[step].id;
        setNodes((nds) =>
          nds.map((n, idx) => {
            if (idx === step) {
              return { ...n, data: { ...n.data, status: 'running' } };
            } else if (idx < step) {
              return { ...n, data: { ...n.data, status: 'success' } };
            }
            return { ...n, data: { ...n.data, status: 'idle' } };
          })
        );
        step++;
      } else {
        clearInterval(interval);
        // Mark all success
        setNodes((nds) =>
          nds.map((n) => ({ ...n, data: { ...n.data, status: 'success' } }))
        );
        setIsRunningSim(false);
        setToast('Simulation complete: All nodes executed successfully.');
      }
    }, 800);
  };

  const handleResetSimulation = () => {
    setNodes((nds) =>
      nds.map((n) => ({ ...n, data: { ...n.data, status: 'idle' } }))
    );
  };

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden bg-layra-bg select-none">
      {/* Top Workflow Builder Bar */}
      <div className="h-14 border-b border-layra-border px-4 flex items-center justify-between bg-layra-sidebar z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/workflows')}
            className="p-1.5 text-layra-muted hover:text-white rounded-lg hover:bg-layra-surface transition-colors"
            title="Back to Workflows"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                {currentWorkflow?.name}
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-layra-elevated text-layra-secondary border border-layra-secondary/20">
                Builder
              </span>
            </div>
            <span className="text-[10px] text-layra-muted font-mono">
              {nodes.length} Steps • {edges.length} Connections
            </span>
          </div>
        </div>

        {/* Center / Action buttons */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setAddMenuOpen(!addMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-layra-surface border border-layra-border hover:bg-layra-elevated text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-layra-primary" />
              <span>Add Step</span>
            </button>

            <AddNodeMenu
              open={addMenuOpen}
              onClose={() => setAddMenuOpen(false)}
              onAddNode={handleAddNode}
            />
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isRunningSim}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-layra-secondary text-layra-bg hover:bg-layra-secondary-hover text-xs font-semibold rounded-lg transition-colors shadow-glow-secondary disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunningSim ? 'animate-spin' : ''}`} />
            <span>{isRunningSim ? 'Executing...' : 'Run Pipeline'}</span>
          </button>

          <button
            onClick={handleResetSimulation}
            className="p-1.5 text-layra-muted hover:text-white bg-layra-surface border border-layra-border rounded-lg"
            title="Reset Simulation State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-layra-primary hover:bg-layra-primary-hover text-white text-xs font-medium rounded-lg transition-colors shadow-glow-primary"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="flex-1 flex relative overflow-hidden">
        <div className="flex-1 h-full w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={handlePaneClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            attributionPosition="bottom-left"
          >
            <Background color="#1B2335" gap={20} size={1.5} />
            <Controls className="!bg-layra-surface !border-layra-border !rounded-lg !text-white overflow-hidden shadow-xl" />
          </ReactFlow>
        </div>

        {/* Node Properties Right Drawer */}
        <NodePropertiesPanel
          selectedNode={selectedNode}
          onClose={() => setSelectedNodeId(null)}
          onUpdateLabel={handleUpdateLabel}
          onUpdateDescription={handleUpdateDescription}
          onDeleteNode={handleDeleteNode}
        />
      </div>

      {/* Simulation Info Pill on Bottom Left */}
      <div className="absolute bottom-4 left-4 z-10 p-2 px-3 rounded-lg bg-layra-surface/90 border border-layra-border text-[11px] text-layra-muted flex items-center gap-2 backdrop-blur-md shadow-lg pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-layra-primary" />
        <span>Canvas interactive: Drag nodes, connect ports, and test simulation.</span>
      </div>
    </div>
  );
};
