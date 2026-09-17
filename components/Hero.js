"use client";

import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-5 pb-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-[#1976D2] dark:text-[#64B5F6] border border-blue-200/60 dark:border-blue-800/60 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2196F3] animate-pulse" />
            <span>Real-time LaTeX Preview</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            LaTeX Math Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-0.5">
            Write mathematical expressions, preview them instantly, and export them as PDF, Markdown, or PNG.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <ArrowDownRight className="w-3.5 h-3.5 text-[#2196F3]" />
          <span>Edit LaTeX below &mdash; changes render instantly</span>
        </div>
      </div>
    </section>
  );
}
