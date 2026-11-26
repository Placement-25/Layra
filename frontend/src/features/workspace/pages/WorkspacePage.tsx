import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  PanelRight,
  Plus,
  History,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { INITIAL_CONVERSATIONS } from '../data/mockConversations';
import { Conversation, ChatMessage } from '../types/workspace';
import { InitialWorkspaceState } from '../components/InitialWorkspaceState';
import { MessageItem } from '../components/MessageItem';
import { MessageComposer } from '../components/MessageComposer';
import { ContextPanel } from '../components/ContextPanel';
import { ConversationListDrawer } from '../components/ConversationListDrawer';
import { PageTransition } from '@/components/layout/PageTransition';
import { useAppStore } from '@/store/appStore';
import { useUIStore } from '@/store/uiStore';

export const WorkspacePage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('layra_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [historyOpen, setHistoryOpen] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const { activeContextPanelOpen, toggleContextPanel } = useAppStore();
  const { setToast } = useUIStore();

  const activeConversation = conversations.find((c) => c.id === chatId) || null;

  useEffect(() => {
    localStorage.setItem('layra_conversations', JSON.stringify(conversations));
  }, [conversations]);

  const handleStartNewChat = () => {
    navigate('/workspace');
  };

  const handleSelectConversation = (id: string) => {
    navigate(`/workspace/${id}`);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setToast('Conversation removed.');
    if (chatId === id) {
      navigate('/workspace');
    }
  };

  const handleSendMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    if (!activeConversation) {
      // Create new conversation
      const newId = `chat_${Date.now()}`;
      const newConv: Conversation = {
        id: newId,
        title: text.length > 40 ? `${text.substring(0, 40)}...` : text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [userMessage],
      };
      setConversations((prev) => [newConv, ...prev]);
      navigate(`/workspace/${newId}`);

      simulateAIResponse(newId, text);
    } else {
      // Append to current
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversation.id
            ? { ...c, messages: [...c.messages, userMessage], updatedAt: new Date().toISOString() }
            : c
        )
      );
      simulateAIResponse(activeConversation.id, text);
    }
  };

  const simulateAIResponse = (conversationId: string, promptText: string) => {
    setIsSynthesizing(true);

    setTimeout(() => {
      const simulatedAssistantMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: `Synthesizing contextual findings for "${promptText}":\n\n1. **Corpus Correlation:** Analysis of indexed documentation indicates an 89.4% confidence match across the vector space.\n2. **Reasoning Deductions:** Key parameters confirm optimal stability boundaries under rated tolerances.\n3. **Recommendation:** Recommend proceeding with validation testing under elevated stress criteria to confirm empirical thresholds.`,
        timestamp: new Date().toISOString(),
        tokens: 245,
        reasoningTimeSeconds: 1.4,
        toolSteps: [
          {
            id: 'ts1',
            toolName: 'Semantic Knowledge Search',
            status: 'completed',
            executionTimeMs: 120,
            summary: 'Retrieved matching evidence chunks from knowledge repository',
          },
          {
            id: 'ts2',
            toolName: 'Logic Reasoning Validator',
            status: 'completed',
            executionTimeMs: 85,
            summary: 'Cross-checked deductions against grounding corpus',
          },
        ],
        sources: [
          {
            id: 's_auto',
            documentId: 'doc_01',
            documentTitle: 'Battery_Cell_Degradation_Report.pdf',
            fileType: 'pdf',
            pageNumber: 12,
            section: 'Operational Synthesis',
            snippet: 'Observed metrics maintain linear degradation kinetics prior to the 400-cycle threshold.',
            relevanceScore: 0.93,
          },
        ],
        suggestedFollowUps: [
          'Correlate this with Q3 financial metrics',
          'Export evidence summary to PDF report',
        ],
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? { ...c, messages: [...c.messages, simulatedAssistantMessage], updatedAt: new Date().toISOString() }
            : c
        )
      );
      setIsSynthesizing(false);
    }, 1500);
  };

  const latestAssistantMessage =
    activeConversation?.messages
      .slice()
      .reverse()
      .find((m) => m.role === 'assistant') || null;

  return (
    <PageTransition className="flex h-full w-full relative overflow-hidden">
      {/* Session History Drawer */}
      <ConversationListDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        conversations={conversations}
        activeId={chatId || null}
        onSelect={handleSelectConversation}
        onNew={handleStartNewChat}
        onDelete={handleDeleteConversation}
      />

      {/* Main Chat / Workspace Workspace Column */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {/* Top Workspace Header Bar */}
        <div className="h-12 border-b border-layra-border px-4 flex items-center justify-between bg-layra-bg/40 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-layra-muted hover:text-white rounded-lg bg-layra-surface border border-layra-border hover:bg-layra-elevated transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
              <span className="text-[10px] px-1 bg-layra-elevated rounded font-mono">
                {conversations.length}
              </span>
            </button>

            <button
              onClick={handleStartNewChat}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-layra-text hover:text-white rounded-lg bg-layra-surface border border-layra-border hover:bg-layra-elevated transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-layra-primary" />
              <span>New Session</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleContextPanel}
              className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
                activeContextPanelOpen
                  ? 'bg-layra-primary/10 border-layra-primary/30 text-layra-primary'
                  : 'bg-layra-surface border-layra-border text-layra-muted hover:text-white'
              }`}
              title="Toggle Evidence & Context Panel"
            >
              <PanelRight className="w-4 h-4" />
              <span className="text-xs hidden sm:inline">Context</span>
            </button>
          </div>
        </div>

        {/* Center Chat Feed / Initial State */}
        <div className="flex-1 overflow-y-auto">
          {!activeConversation || activeConversation.messages.length === 0 ? (
            <InitialWorkspaceState onSelectPrompt={handleSendMessage} />
          ) : (
            <div className="py-6 space-y-4">
              {activeConversation.messages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  onRegenerate={() => simulateAIResponse(activeConversation.id, message.content)}
                  onSelectFollowUp={handleSendMessage}
                />
              ))}

              {isSynthesizing && (
                <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-layra-surface/40 border border-layra-primary/20">
                    <Sparkles className="w-4 h-4 text-layra-primary animate-spin" />
                    <span className="text-xs text-layra-muted font-mono animate-pulse">
                      Synthesizing cross-corpus evidence & executing reasoning steps...
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Message Composer Footer */}
        <MessageComposer
          onSend={handleSendMessage}
          disabled={isSynthesizing}
        />
      </div>

      {/* Right Collapsible Evidence / Context Panel */}
      {activeContextPanelOpen && (
        <ContextPanel
          message={latestAssistantMessage}
          onClose={toggleContextPanel}
        />
      )}
    </PageTransition>
  );
};
