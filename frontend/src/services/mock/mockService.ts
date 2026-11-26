import { INITIAL_CONVERSATIONS } from '@/features/workspace/data/mockConversations';
import { INITIAL_DOCUMENTS } from '@/features/knowledge/data/mockDocuments';
import { INITIAL_AGENTS } from '@/features/agents/data/mockAgents';
import { INITIAL_WORKFLOWS } from '@/features/workflows/data/mockWorkflows';

export const mockService = {
  getConversations: () => INITIAL_CONVERSATIONS,
  getDocuments: () => INITIAL_DOCUMENTS,
  getAgents: () => INITIAL_AGENTS,
  getWorkflows: () => INITIAL_WORKFLOWS,
};
