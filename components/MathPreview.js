"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import katex from "katex";
import ZoomControls from "./ZoomControls";
import {
  Eye,
  Copy,
  Check,
  Maximize2,
  AlertCircle,
  FileCode2,
  X,
} from "lucide-react";

export default function MathPreview({
  latexCode,
  previewContainerRef,
}) {
  const [zoom, setZoom] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render LaTeX to HTML string safely with error handling
  const { renderedHtml, error } = useMemo(() => {
    const trimmed = (latexCode || "").trim();
    if (!trimmed) {
      return { renderedHtml: "", error: null };
    }

    try {
      const html = katex.renderToString(trimmed, {
        displayMode: true,
        throwOnError: true,
        output: "htmlAndMathml",
        strict: false,
        trust: true,
      });
      return { renderedHtml: html, error: null };
    } catch (err) {
      return {
        renderedHtml: "",
        error: err.message || "Parse error in LaTeX expression",
      };
    }
  }, [latexCode]);

  // Handle Fullscreen escape key & body lock
  useEffect(() => {
    if (isFullscreen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setIsFullscreen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isFullscreen]);

  const handleCopyLatex = async () => {
    try {
      await navigator.clipboard.writeText(latexCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard fallback
    }
  };

  // Preview content renderer
  const renderPreviewBoard = (isFull = false) => (
    <div className="relative flex-1 flex items-center justify-center p-6 sm:p-10 math-grid-bg overflow-auto min-h-[300px]">
      <div
        ref={!isFull ? previewContainerRef : undefined}
        id={!isFull ? "math-preview-render-target" : undefined}
        className="flex flex-col items-center justify-center transition-transform duration-100 max-w-full"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        {error ? (
          /* Error State */
          <div className="max-w-md w-full p-4 rounded-xl bg-rose-50/90 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 mb-2">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-rose-800 dark:text-rose-300">
              Invalid LaTeX
            </h3>
            <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-mono bg-rose-100/60 dark:bg-rose-900/30 p-2 rounded border border-rose-200/60 dark:border-rose-800/40 text-left overflow-x-auto whitespace-pre-wrap">
              {error}
            </p>
            <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              Check syntax, matching brackets <code>{"{ }"}</code> or environment tags.
            </p>
          </div>
        ) : !latexCode.trim() ? (
          /* Empty State */
          <div className="text-center p-6 text-slate-400 dark:text-slate-500 max-w-xs">
            <FileCode2 className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#2196F3]" />
            <p className="text-xs sm:text-sm font-medium">No equation to render</p>
            <p className="text-[11px] mt-1 text-slate-400 dark:text-slate-500">
              Type LaTeX code in the editor or select an example to see real-time preview.
            </p>
          </div>
        ) : (
          /* KaTeX Rendered Output */
          <div
            id={!isFull ? "katex-math-output" : "katex-math-output-full"}
            className="text-slate-900 dark:text-slate-100 text-center select-text py-4 px-6 rounded-lg transition-colors"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Standard Card View */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col h-full min-h-[420px] lg:min-h-[520px]">
        {/* Header / Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#1976D2] dark:text-[#64B5F6] border border-blue-200/60 dark:border-blue-800/60">
              <Eye className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Math Preview
              </h2>
              {latexCode && !error && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              )}
            </div>
          </div>

          {/* Toolbar controls */}
          <div className="flex items-center gap-2">
            <ZoomControls zoom={zoom} setZoom={setZoom} />

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

            {/* Copy LaTeX */}
            <button
              type="button"
              onClick={handleCopyLatex}
              className="p-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-[#2196F3] dark:hover:text-[#42A5F5] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-1 transition-colors"
              title="Copy LaTeX"
              aria-label="Copy LaTeX"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 text-[11px]">
                    Copied
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Copy LaTeX</span>
                </>
              )}
            </button>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1"
              title="Fullscreen Preview"
              aria-label="Fullscreen Preview"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Board */}
        {renderPreviewBoard(false)}

        {/* Footer Preview Info */}
        <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>KaTeX v0.16 &bull; Fast MathML & HTML Rendering</span>
          <span className="hidden sm:inline">Use zoom controls to scale</span>
        </div>
      </div>

      {/* Fullscreen Portal */}
      {isFullscreen && mounted && createPortal(
        <div
          id="fullscreen-math-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] w-screen h-screen bg-slate-50 dark:bg-slate-950 flex flex-col animate-in fade-in duration-150"
        >
          {/* Fullscreen Top Navigation Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2196F3] text-white shadow-xs">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Fullscreen Math Preview
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] border border-slate-200 dark:border-slate-700">Esc</kbd> or click Close to return
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ZoomControls zoom={zoom} setZoom={setZoom} />

              <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

              {/* Copy LaTeX */}
              <button
                type="button"
                onClick={handleCopyLatex}
                className="px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-[#2196F3] dark:hover:text-[#42A5F5] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy LaTeX</span>
                  </>
                )}
              </button>

              {/* Exit Fullscreen Button */}
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg shadow-xs flex items-center gap-1.5 transition-colors active:scale-95"
                title="Exit Fullscreen (Esc)"
              >
                <X className="w-4 h-4 text-rose-400 dark:text-rose-600" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Board */}
          {renderPreviewBoard(true)}
        </div>,
        document.body
      )}
    </>
  );
}
