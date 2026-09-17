"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MathEditor from "@/components/MathEditor";

export default function Home() {
  const [latexCode, setLatexCode] = useState("x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}");

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex flex-col gap-4">
        <Hero />

        <MathEditor
          latexCode={latexCode}
          setLatexCode={setLatexCode}
        />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 py-5 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-left">
            <p>
              &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-800 dark:text-slate-200">LaTeX Math Editor</span>
            </p>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">&bull;</span>
            <p className="font-medium text-[#2196F3] dark:text-[#42A5F5]">
              This tool was created by Ibrahim albayati
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
            <span>Fast KaTeX Rendering</span>
            <span>&bull;</span>
            <span>Client-side PDF / MD / PNG</span>
            <span>&bull;</span>
            <span>Zero Data Storage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
