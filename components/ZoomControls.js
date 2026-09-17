"use client";

import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export default function ZoomControls({ zoom, setZoom }) {
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 3.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.4));
  };

  const handleResetZoom = () => {
    setZoom(1.0);
  };

  const percentage = Math.round(zoom * 100);

  return (
    <div className="inline-flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
      <button
        type="button"
        onClick={handleZoomOut}
        disabled={zoom <= 0.4}
        className="p-1 rounded text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        title="Zoom Out"
        aria-label="Zoom Out"
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={handleResetZoom}
        className="px-1.5 py-0.5 rounded text-[11px] font-mono text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
        title="Reset Zoom (100%)"
        aria-label="Reset Zoom"
      >
        {percentage}%
      </button>

      <button
        type="button"
        onClick={handleZoomIn}
        disabled={zoom >= 3.0}
        className="p-1 rounded text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        title="Zoom In"
        aria-label="Zoom In"
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={handleResetZoom}
        className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Reset Zoom to default"
        aria-label="Reset Zoom to default"
      >
        <RotateCcw className="w-3 h-3" />
      </button>
    </div>
  );
}
