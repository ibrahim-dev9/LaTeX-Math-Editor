"use client";

import { useState } from "react";
import {
  Undo2,
  Redo2,
  Copy,
  Check,
  Trash2,
  AlignLeft,
  Maximize2,
  Minimize2,
  Code2,
} from "lucide-react";

export default function EditorToolbar({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onCopy,
  onClear,
  onFormat,
  isFullscreen,
  onToggleFullscreen,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-slate-300">
      {/* Title / Section info */}
      <div className="flex items-center gap-2">
        <Code2 className="w-4 h-4 text-[#42A5F5]" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
          LaTeX Code
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        {/* Undo */}
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="p-1.5 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>

        {/* Redo */}
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="p-1.5 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
          aria-label="Redo"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-slate-800 mx-1" />

        {/* Format */}
        <button
          type="button"
          onClick={onFormat}
          className="p-1.5 rounded text-slate-400 hover:text-[#42A5F5] hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
          title="Format LaTeX code"
          aria-label="Format LaTeX code"
        >
          <AlignLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Format</span>
        </button>

        {/* Copy */}
        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
          title="Copy LaTeX code"
          aria-label="Copy LaTeX code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Copy</span>
            </>
          )}
        </button>

        {/* Clear */}
        <button
          type="button"
          onClick={onClear}
          className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          title="Clear editor"
          aria-label="Clear editor"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        {onToggleFullscreen && (
          <>
            <div className="h-4 w-px bg-slate-800 mx-1" />
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="p-1.5 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Editor"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen Editor"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
