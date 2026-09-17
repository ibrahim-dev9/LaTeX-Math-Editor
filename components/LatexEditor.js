"use client";

import { useRef, useState } from "react";
import EditorToolbar from "./EditorToolbar";
import CommonCommands from "./CommonCommands";
import Examples from "./Examples";

export default function LatexEditor({
  latexCode,
  setLatexCode,
  onSelectExample,
}) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Undo / Redo history
  const [history, setHistory] = useState([latexCode]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isUpdatingHistory = useRef(false);

  const pushHistory = (newCode) => {
    if (newCode === history[historyIndex]) return;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newCode);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setLatexCode(val);
    pushHistory(val);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      isUpdatingHistory.current = true;
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setLatexCode(prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUpdatingHistory.current = true;
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setLatexCode(next);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(latexCode);
      return true;
    } catch {
      return false;
    }
  };

  const handleClear = () => {
    setLatexCode("");
    pushHistory("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleFormat = () => {
    let formatted = latexCode
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .trim();

    if (formatted.includes("\\begin{bmatrix}") || formatted.includes("\\begin{matrix}")) {
      formatted = formatted
        .replace(/\\begin\{([a-z]+matrix)\}\s*/g, "\\begin{$1}\n  ")
        .replace(/\s*\\end\{([a-z]+matrix)\}/g, "\n\\end{$1}")
        .replace(/\\\\\s*/g, " \\\\\n  ");
    }

    setLatexCode(formatted);
    pushHistory(formatted);
  };

  const insertSnippet = (snippet) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      const updated = (latexCode ? latexCode + " " : "") + snippet;
      setLatexCode(updated);
      pushHistory(updated);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = latexCode.substring(0, start);
    const after = latexCode.substring(end);

    const newCode = before + snippet + after;
    setLatexCode(newCode);
    pushHistory(newCode);

    setTimeout(() => {
      textarea.focus();
      let newCursorPos = start + snippet.length;
      const bracketIdx = snippet.indexOf("{}");
      if (bracketIdx !== -1) {
        newCursorPos = start + bracketIdx + 1;
      }
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      insertSnippet("  ");
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
    }
    if (
      ((e.ctrlKey || e.metaKey) && e.key === "y") ||
      ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") ||
      ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Z")
    ) {
      e.preventDefault();
      handleRedo();
    }
  };

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lines = (latexCode || "").split("\n");
  const lineCount = Math.max(lines.length, 5);

  return (
    <div className="flex flex-col gap-3">
      {/* Code Editor Box */}
      <div
        className={`bg-slate-950 rounded-xl border border-slate-800 shadow-md overflow-hidden flex flex-col transition-all duration-200 focus-within:ring-2 focus-within:ring-[#2196F3] ${
          isFullscreen
            ? "fixed inset-4 z-50 shadow-2xl ring-2 ring-[#2196F3]"
            : ""
        }`}
      >
        <EditorToolbar
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onCopy={handleCopy}
          onClear={handleClear}
          onFormat={handleFormat}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        />

        {/* Editor Area with Line Numbers */}
        <div className="relative flex bg-[#060913] min-h-[160px] sm:min-h-[190px] max-h-[360px] overflow-hidden group">
          {/* Line Numbers Gutter */}
          <div
            ref={lineNumbersRef}
            className="w-10 sm:w-11 py-3 px-1 text-right select-none bg-slate-950/80 border-r border-slate-800/80 text-slate-600 font-mono text-xs leading-6 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i} className="px-1 text-[11px]">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code Textarea */}
          <textarea
            ref={textareaRef}
            id="latex-code-editor"
            value={latexCode}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            placeholder="Type LaTeX math here... e.g. x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"
            rows={lineCount}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className="w-full p-3 bg-transparent text-blue-50 font-mono text-base sm:text-sm leading-6 resize-none focus:outline-none placeholder-slate-600 overflow-y-auto selection:bg-[#2196F3]/60 selection:text-white"
            aria-label="LaTeX Code Editor"
          />
        </div>

        {/* Bottom Editor Status Bar */}
        <div className="px-3 py-1.5 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span>
              {lines.length} {lines.length === 1 ? "line" : "lines"}
            </span>
            <span>{latexCode.length} chars</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span>UTF-8</span>
            <span>&bull;</span>
            <span className="text-[#42A5F5]">LaTeX Math</span>
          </div>
        </div>
      </div>

      {/* Common Commands Bar */}
      <CommonCommands onInsert={insertSnippet} />

      {/* Examples Selector */}
      <Examples
        onSelectExample={onSelectExample}
        currentLatex={latexCode}
      />
    </div>
  );
}
