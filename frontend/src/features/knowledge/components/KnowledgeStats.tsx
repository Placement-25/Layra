import React from 'react';
import { Database, CheckCircle2, RefreshCw, HardDrive } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { DocumentItem } from '../types/knowledge';

interface KnowledgeStatsProps {
  documents: DocumentItem[];
}

export const KnowledgeStats: React.FC<KnowledgeStatsProps> = ({ documents }) => {
  const totalDocs = documents.length;
  const indexedDocs = documents.filter((d) => d.indexingStatus === 'indexed').length;
  const processingDocs = documents.filter((d) => d.indexingStatus === 'processing').length;
  const totalBytes = documents.reduce((acc, curr) => acc + curr.fileSize, 0);

  const stats = [
    {
      title: 'Total Documents',
      value: totalDocs.toString(),
      subtext: 'Corpus objects',
      icon: Database,
      color: 'text-layra-primary',
      bg: 'bg-layra-primary/10 border-layra-primary/20',
    },
    {
      title: 'Indexed & Grounded',
      value: indexedDocs.toString(),
      subtext: 'Ready for vector reasoning',
      icon: CheckCircle2,
      color: 'text-layra-success',
      bg: 'bg-layra-success/10 border-layra-success/20',
    },
    {
      title: 'Processing',
      value: processingDocs.toString(),
      subtext: 'Chunking & embedding (Sim)',
      icon: RefreshCw,
      color: 'text-layra-secondary',
      bg: 'bg-layra-secondary/10 border-layra-secondary/20',
      pulse: processingDocs > 0,
    },
    {
      title: 'Corpus Storage',
      value: formatBytes(totalBytes),
      subtext: 'Raw file payload',
      icon: HardDrive,
      color: 'text-layra-warning',
      bg: 'bg-layra-warning/10 border-layra-warning/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.title}
            className="p-4 rounded-xl bg-layra-surface/70 border border-layra-border hover:border-layra-border-light transition-all flex items-center justify-between"
          >
            <div>
              <div className="text-[11px] font-medium text-layra-muted uppercase font-mono tracking-wider mb-1">
                {s.title}
              </div>
              <div className="text-xl font-bold text-white tracking-tight">{s.value}</div>
              <div className="text-[11px] text-layra-muted/80 mt-0.5">{s.subtext}</div>
            </div>

            <div className={`p-2.5 rounded-xl border ${s.bg} ${s.color}`}>
              <Icon className={`w-5 h-5 ${s.pulse ? 'animate-spin' : ''}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
