"use client";

import { BookOpen, Check } from "lucide-react";

export const EXAMPLES = [
  {
    id: "quadratic",
    title: "Quadratic Formula",
    latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    category: "Algebra",
  },
  {
    id: "pythagorean",
    title: "Pythagorean Theorem",
    latex: "a^2 + b^2 = c^2",
    category: "Geometry",
  },
  {
    id: "gaussian-integral",
    title: "Gaussian Integral",
    latex: "\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}",
    category: "Calculus",
  },
  {
    id: "summation",
    title: "Summation of Integers",
    latex: "\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}",
    category: "Discrete",
  },
  {
    id: "matrix",
    title: "2×2 Matrix",
    latex: "\\begin{bmatrix}\n  1 & 2 \\\\\n  3 & 4\n\\end{bmatrix}",
    category: "Linear Algebra",
  },
  {
    id: "eulers-identity",
    title: "Euler's Identity",
    latex: "e^{i\\pi} + 1 = 0",
    category: "Complex Analysis",
  },
  {
    id: "normal-distribution",
    title: "Normal Distribution",
    latex: "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2}",
    category: "Statistics",
  },
  {
    id: "schrodinger",
    title: "Schrödinger Equation",
    latex: "i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r},t) = \\left( -\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r},t) \\right) \\Psi(\\mathbf{r},t)",
    category: "Physics",
  },
];

export default function Examples({ onSelectExample, currentLatex }) {
  return (
    <div className="pt-2">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-3.5 h-3.5 text-[#2196F3] dark:text-[#42A5F5]" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Example Equations
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {EXAMPLES.map((ex) => {
          const isSelected = currentLatex.trim() === ex.latex.trim();
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => onSelectExample(ex)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all duration-150 active:scale-95 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-[#2196F3] text-white border-[#2196F3] shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <span>{ex.title}</span>
              {isSelected && <Check className="w-3 h-3 text-blue-100" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
