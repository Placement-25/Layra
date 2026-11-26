import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUp,
  Paperclip,
  Sparkles,
  X,
  FileCode,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

interface MessageComposerProps {
  onSend: (text: string, attachments?: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Ask a question, query indexed documents, or explore ideas...',
}) => {
  const [text, setText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setToast } = useUIStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim(), attachedFiles);
    setText('');
    setAttachedFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setAttachedFiles((prev) => [...prev, fileName]);
      setToast(`Attached mock reference file: ${fileName}`);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [text]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      {/* Attachment Badges */}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 px-1">
          {attachedFiles.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-layra-surface border border-layra-primary/30 text-xs text-layra-text"
            >
              <FileCode className="w-3.5 h-3.5 text-layra-primary" />
              <span className="truncate max-w-xs">{f}</span>
              <button
                type="button"
                onClick={() => removeAttachment(i)}
                className="text-layra-muted hover:text-white ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Composer Box */}
      <div className="relative rounded-2xl bg-layra-surface/90 border border-layra-border hover:border-layra-border-light focus-within:border-layra-primary/60 focus-within:ring-1 focus-within:ring-layra-primary/30 transition-all shadow-elevated p-2.5">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          className="w-full bg-transparent resize-none text-sm text-layra-text placeholder:text-layra-muted/60 focus:outline-none px-2 py-1 max-h-48 overflow-y-auto leading-relaxed"
        />

        {/* Bottom Actions Row */}
        <div className="flex items-center justify-between pt-2 px-1 border-t border-layra-border/40 text-xs">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 text-layra-muted hover:text-layra-text hover:bg-layra-elevated rounded-lg transition-colors flex items-center gap-1"
              title="Attach document for reasoning"
            >
              <Paperclip className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">Attach</span>
            </button>

            <span className="text-[11px] text-layra-muted/70 font-mono hidden md:inline">
              Shift + Enter for new line
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSend}
              disabled={!text.trim() || disabled}
              className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150',
                text.trim() && !disabled
                  ? 'bg-layra-primary text-white hover:bg-layra-primary-hover shadow-glow-primary active:scale-95'
                  : 'bg-layra-elevated text-layra-muted cursor-not-allowed opacity-50'
              )}
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
