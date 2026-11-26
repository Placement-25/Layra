import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Upload,
  Search,
  Filter,
  Grid,
  List,
  FileText,
  Layers,
  ChevronRight,
  MoreVertical,
  HardDrive,
  Calendar,
} from 'lucide-react';
import { INITIAL_DOCUMENTS } from '../data/mockDocuments';
import { DocumentItem } from '../types/knowledge';
import { KnowledgeStats } from '../components/KnowledgeStats';
import { DocumentUploadModal } from '../components/DocumentUploadModal';
import { DocumentDetailDrawer } from '../components/DocumentDetailDrawer';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import { PageTransition } from '@/components/layout/PageTransition';
import { formatBytes, formatDate } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

export const KnowledgePage: React.FC = () => {
  const { documentId } = useParams<{ documentId?: string }>();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('layra_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { setToast } = useUIStore();

  const activeDoc = documents.find((d) => d.id === documentId) || null;

  const saveDocs = (newDocs: DocumentItem[]) => {
    setDocuments(newDocs);
    localStorage.setItem('layra_documents', JSON.stringify(newDocs));
  };

  const handleUploadSuccess = (newDoc: DocumentItem) => {
    const updated = [newDoc, ...documents];
    saveDocs(updated);
  };

  const handleDelete = (id: string) => {
    const updated = documents.filter((d) => d.id !== id);
    saveDocs(updated);
    setToast('Document deleted from knowledge base.');
    if (documentId === id) {
      navigate('/knowledge');
    }
  };

  const handleReprocess = (id: string) => {
    setToast('Simulating re-chunking and vector re-indexing...');
    setTimeout(() => {
      setToast('Document successfully re-indexed into vector space.');
    }, 1500);
  };

  const categories = ['all', ...Array.from(new Set(documents.map((d) => d.category)))];

  const filteredDocs = documents.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || d.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <PageTransition className="p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            Knowledge Base
          </h1>
          <p className="text-xs text-layra-muted">
            Your connected knowledge, organized and ready for reasoning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-layra-primary hover:bg-layra-primary-hover text-white text-xs font-medium rounded-lg transition-colors shadow-glow-primary active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Documents</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <KnowledgeStats documents={documents} />

      {/* Controls: Search, Filter, View Mode */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-layra-muted" />
            <input
              type="text"
              placeholder="Filter by name, content, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-layra-surface border border-layra-border rounded-lg pl-9 pr-3 py-2 text-xs text-layra-text placeholder:text-layra-muted focus:outline-none focus:border-layra-primary"
            />
          </div>

          <div className="flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-layra-muted ml-1" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-layra-surface border border-layra-border rounded-lg px-2.5 py-2 text-xs text-layra-text focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 bg-layra-surface border border-layra-border rounded-lg">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-layra-elevated text-white' : 'text-layra-muted'}`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-layra-elevated text-white' : 'text-layra-muted'}`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Document Library Listing */}
      {filteredDocs.length === 0 ? (
        <div className="py-16 text-center rounded-xl border border-dashed border-layra-border bg-layra-surface/20">
          <FileText className="w-10 h-10 text-layra-muted mx-auto mb-2" />
          <h3 className="text-sm font-medium text-white mb-1">No documents found</h3>
          <p className="text-xs text-layra-muted">Try adjusting your search criteria or upload a new file.</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-layra-surface/60 border border-layra-border rounded-xl overflow-hidden divide-y divide-layra-border/60">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate(`/knowledge/${doc.id}`)}
              className="p-4 flex items-center justify-between hover:bg-layra-elevated/70 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-layra-elevated border border-layra-border flex items-center justify-center text-layra-primary group-hover:text-layra-secondary transition-colors flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate group-hover:text-layra-primary transition-colors">
                    {doc.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-layra-muted mt-0.5 font-mono">
                    <span className="uppercase text-[10px] px-1.5 py-0.2 rounded bg-layra-elevated border border-layra-border">
                      {doc.fileType}
                    </span>
                    <span>•</span>
                    <span>{formatBytes(doc.fileSize)}</span>
                    <span>•</span>
                    <span>{doc.totalChunks} Chunks</span>
                    <span>•</span>
                    <span>{doc.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <StatusIndicator status={doc.indexingStatus} label={doc.indexingStatus} />
                <ChevronRight className="w-4 h-4 text-layra-muted group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate(`/knowledge/${doc.id}`)}
              className="p-4 rounded-xl bg-layra-surface/60 border border-layra-border hover:bg-layra-elevated/80 hover:border-layra-border-light cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-layra-elevated border border-layra-border flex items-center justify-center text-layra-primary">
                    <FileText className="w-4 h-4" />
                  </div>
                  <StatusIndicator status={doc.indexingStatus} />
                </div>

                <h3 className="text-sm font-medium text-white truncate mb-1 group-hover:text-layra-primary transition-colors">
                  {doc.name}
                </h3>
                <p className="text-xs text-layra-muted line-clamp-2 leading-relaxed mb-4">
                  {doc.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-layra-border/60 flex items-center justify-between text-[11px] text-layra-muted font-mono">
                <span>{formatBytes(doc.fileSize)}</span>
                <span>{doc.totalChunks} Chunks</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Detail Drawer */}
      <DocumentDetailDrawer
        document={activeDoc}
        open={Boolean(activeDoc)}
        onClose={() => navigate('/knowledge')}
        onDelete={handleDelete}
        onReprocess={handleReprocess}
      />

      {/* Upload Modal */}
      <DocumentUploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </PageTransition>
  );
};
