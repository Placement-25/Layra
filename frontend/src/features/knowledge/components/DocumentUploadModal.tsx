import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { SUPPORTED_FILE_TYPES } from '@/lib/constants';
import { DocumentFileType, DocumentItem } from '../types/knowledge';
import { formatBytes } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploadSuccess: (newDoc: DocumentItem) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  open,
  onClose,
  onUploadSuccess,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('Research & Engineering');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setToast } = useUIStore();

  if (!open) return null;

  const validateAndSetFile = (file: File) => {
    setError(null);
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExts = ['pdf', 'docx', 'txt', 'csv', 'xlsx'];

    if (!ext || !validExts.includes(ext)) {
      setError(`Unsupported file type. Please upload: ${validExts.join(', ').toUpperCase()}`);
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('File size exceeds the 25MB demo ceiling.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          finalizeUpload();
          return 100;
        }
        return prev + 30;
      });
    }, 250);
  };

  const finalizeUpload = () => {
    if (!selectedFile) return;

    const ext = (selectedFile.name.split('.').pop()?.toLowerCase() || 'txt') as DocumentFileType;

    const newDoc: DocumentItem = {
      id: `doc_${Date.now()}`,
      name: selectedFile.name,
      fileType: ext,
      fileSize: selectedFile.size,
      uploadDate: new Date().toISOString(),
      indexingStatus: 'indexed',
      category: category,
      totalChunks: Math.max(4, Math.floor(selectedFile.size / 70000)),
      totalTokens: Math.max(1200, Math.floor(selectedFile.size / 150)),
      summary: `Automated ingestion preview for ${selectedFile.name}. In demo mode, document chunks have been synthesized for immediate reasoning query.`,
      extractedPreview: `Extracted content preview from ${selectedFile.name}: Document structure successfully mapped. Tables, headers, and semantic boundaries preserved for vector grounding.`,
      chunks: [
        {
          id: `chunk_${Date.now()}_1`,
          chunkIndex: 1,
          text: `Sample extracted chunk from ${selectedFile.name}: Initial semantic header and introductory paragraphs mapped into dense embedding space.`,
          tokenCount: 450,
          embeddingDimension: 1536,
        },
      ],
    };

    setTimeout(() => {
      onUploadSuccess(newDoc);
      setToast(`Document "${newDoc.name}" uploaded & indexed (simulated).`);
      setUploadProgress(null);
      setSelectedFile(null);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-layra-surface border border-layra-border rounded-2xl shadow-2xl overflow-hidden glass-panel-elevated">
        {/* Header */}
        <div className="px-6 py-4 border-b border-layra-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-layra-primary/10 text-layra-primary border border-layra-primary/20">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Ingest Knowledge Document</h3>
              <p className="text-[11px] text-layra-muted">Ready for semantic chunking & indexing</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-layra-muted hover:text-white rounded-lg hover:bg-layra-elevated"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Simulation disclaimer */}
          <div className="p-2.5 rounded-lg bg-layra-primary/10 border border-layra-primary/20 flex items-start gap-2 text-[11px] text-layra-muted">
            <Sparkles className="w-3.5 h-3.5 text-layra-primary flex-shrink-0 mt-0.5" />
            <span>
              Simulation mode: Validates and prepares document structures for the future FastAPI/ChromaDB ingestion pipeline.
            </span>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
              dragActive
                ? 'border-layra-primary bg-layra-primary/10 scale-[1.01]'
                : selectedFile
                ? 'border-layra-secondary/50 bg-layra-surface'
                : 'border-layra-border hover:border-layra-border-light bg-layra-bg/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.csv,.xlsx"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  validateAndSetFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex flex-col items-center">
                <FileText className="w-8 h-8 text-layra-secondary mb-2" />
                <span className="text-sm font-medium text-white max-w-xs truncate">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-layra-muted mt-1 font-mono">
                  {formatBytes(selectedFile.size)}
                </span>
                <span className="text-[10px] text-layra-secondary mt-2 underline">
                  Click to replace file
                </span>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-layra-muted mb-2 group-hover:text-layra-primary" />
                <span className="text-sm font-medium text-layra-text mb-1">
                  Drag & drop your document here, or browse
                </span>
                <span className="text-xs text-layra-muted">
                  Supports PDF, DOCX, TXT, CSV, XLSX (Up to 25MB)
                </span>
              </>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-layra-danger/10 border border-layra-danger/30 text-xs text-layra-danger">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Category selection */}
          <div>
            <label className="block text-xs font-medium text-layra-muted mb-1.5 font-mono uppercase">
              Target Knowledge Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-layra-elevated border border-layra-border rounded-lg px-3 py-2 text-xs text-layra-text focus:outline-none focus:border-layra-primary"
            >
              <option value="Research & Engineering">Research & Engineering</option>
              <option value="Finance & Regulatory">Finance & Regulatory</option>
              <option value="Legal & Compliance">Legal & Compliance</option>
              <option value="Biomedical Research">Biomedical Research</option>
              <option value="Operations & Telemetry">Operations & Telemetry</option>
            </select>
          </div>

          {/* Progress bar */}
          {uploadProgress !== null && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-layra-muted">
                <span>Chunking & Vector Indexing...</span>
                <span className="font-mono">{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-layra-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-layra-primary to-layra-secondary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-layra-border bg-layra-elevated/40 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-layra-muted hover:text-white rounded-lg hover:bg-layra-surface transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || uploadProgress !== null}
            className="px-4 py-2 text-xs font-medium text-white bg-layra-primary hover:bg-layra-primary-hover rounded-lg transition-colors shadow-glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadProgress !== null ? 'Indexing...' : 'Upload & Process'}
          </button>
        </div>
      </div>
    </div>
  );
};
