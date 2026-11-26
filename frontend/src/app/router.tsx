import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { WorkspacePage } from '@/features/workspace/pages/WorkspacePage';
import { KnowledgePage } from '@/features/knowledge/pages/KnowledgePage';
import { AgentsPage } from '@/features/agents/pages/AgentsPage';
import { WorkflowsPage } from '@/features/workflows/pages/WorkflowsPage';
import { WorkflowBuilderPage } from '@/features/workflows/pages/WorkflowBuilderPage';
import { NotFoundPage } from '@/components/common/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/workspace" replace />,
      },
      // Module 1: AI Workspace
      {
        path: 'workspace',
        element: <WorkspacePage />,
      },
      {
        path: 'workspace/:chatId',
        element: <WorkspacePage />,
      },
      // Module 2: Knowledge Base
      {
        path: 'knowledge',
        element: <KnowledgePage />,
      },
      {
        path: 'knowledge/:documentId',
        element: <KnowledgePage />,
      },
      // Module 3: AI Agents
      {
        path: 'agents',
        element: <AgentsPage />,
      },
      {
        path: 'agents/:agentId',
        element: <AgentsPage />,
      },
      // Module 4: Workflows
      {
        path: 'workflows',
        element: <WorkflowsPage />,
      },
      {
        path: 'workflows/:workflowId',
        element: <WorkflowBuilderPage />,
      },
      // 404 Fallback
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
