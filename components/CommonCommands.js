"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import katex from "katex";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Command,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const COMMAND_CATEGORIES = [
  {
    name: "Basic & Operators",
    items: [
      { label: "Fraction", code: "\\frac{a}{b}", display: "\\frac{a}{b}" },
      { label: "Square Root", code: "\\sqrt{x}", display: "\\sqrt{x}" },
      { label: "N-th Root", code: "\\sqrt[n]{x}", display: "\\sqrt[n]{x}" },
      { label: "Superscript", code: "x^{2}", display: "x^2" },
      { label: "Subscript", code: "x_{i}", display: "x_i" },
      { label: "Plus-Minus", code: "\\pm", display: "\\pm" },
      { label: "Minus-Plus", code: "\\mp", display: "\\mp" },
      { label: "Multiply", code: "\\times", display: "\\times" },
      { label: "Dot Product", code: "\\cdot", display: "\\cdot" },
      { label: "Division", code: "\\div", display: "\\div" },
      { label: "Asterisk", code: "\\ast", display: "\\ast" },
      { label: "Circle / Compose", code: "\\circ", display: "\\circ" },
      { label: "Infinity", code: "\\infty", display: "\\infty" },
      { label: "Partial", code: "\\partial", display: "\\partial" },
      { label: "Nabla / Del", code: "\\nabla", display: "\\nabla" },
      { label: "Reduced Planck", code: "\\hbar", display: "\\hbar" },
    ],
  },
  {
    name: "Calculus & Analysis",
    items: [
      { label: "Indefinite Integral", code: "\\int f(x)\\,dx", display: "\\int" },
      { label: "Definite Integral", code: "\\int_{a}^{b} f(x)\\,dx", display: "\\int_a^b" },
      { label: "Double Integral", code: "\\iint_D f(x,y)\\,dA", display: "\\iint" },
      { label: "Triple Integral", code: "\\iiint_V f(x,y,z)\\,dV", display: "\\iiint" },
      { label: "Contour Integral", code: "\\oint_C f(z)\\,dz", display: "\\oint" },
      { label: "Summation", code: "\\sum_{i=1}^{n} a_i", display: "\\sum_{i=1}^n" },
      { label: "Product", code: "\\prod_{i=1}^{n} a_i", display: "\\prod_{i=1}^n" },
      { label: "Limit to 0", code: "\\lim_{x \\to 0} ", display: "\\lim_{x \\to 0}" },
      { label: "Limit to Infinity", code: "\\lim_{x \\to \\infty} ", display: "\\lim_{x \\to \\infty}" },
      { label: "Derivative", code: "\\frac{df}{dx}", display: "\\frac{df}{dx}" },
      { label: "2nd Derivative", code: "\\frac{d^2f}{dx^2}", display: "\\frac{d^2f}{dx^2}" },
      { label: "Partial Derivative", code: "\\frac{\\partial f}{\\partial x}", display: "\\frac{\\partial f}{\\partial x}" },
      { label: "2nd Partial", code: "\\frac{\\partial^2 f}{\\partial x^2}", display: "\\frac{\\partial^2 f}{\\partial x^2}" },
      { label: "Vector Arrow", code: "\\vec{v}", display: "\\vec{v}" },
      { label: "Unit Vector Hat", code: "\\hat{u}", display: "\\hat{u}" },
      { label: "Time Derivative", code: "\\dot{x}", display: "\\dot{x}" },
      { label: "2nd Time Derivative", code: "\\ddot{x}", display: "\\ddot{x}" },
      { label: "Divergence", code: "\\nabla \\cdot \\vec{F}", display: "\\nabla \\cdot \\vec{F}" },
      { label: "Curl", code: "\\nabla \\times \\vec{F}", display: "\\nabla \\times \\vec{F}" },
    ],
  },
  {
    name: "Greek Letters",
    items: [
      { label: "alpha", code: "\\alpha", display: "\\alpha" },
      { label: "beta", code: "\\beta", display: "\\beta" },
      { label: "gamma", code: "\\gamma", display: "\\gamma" },
      { label: "delta", code: "\\delta", display: "\\delta" },
      { label: "epsilon", code: "\\epsilon", display: "\\epsilon" },
      { label: "varepsilon", code: "\\varepsilon", display: "\\varepsilon" },
      { label: "zeta", code: "\\zeta", display: "\\zeta" },
      { label: "eta", code: "\\eta", display: "\\eta" },
      { label: "theta", code: "\\theta", display: "\\theta" },
      { label: "vartheta", code: "\\vartheta", display: "\\vartheta" },
      { label: "iota", code: "\\iota", display: "\\iota" },
      { label: "kappa", code: "\\kappa", display: "\\kappa" },
      { label: "lambda", code: "\\lambda", display: "\\lambda" },
      { label: "mu", code: "\\mu", display: "\\mu" },
      { label: "nu", code: "\\nu", display: "\\nu" },
      { label: "xi", code: "\\xi", display: "\\xi" },
      { label: "pi", code: "\\pi", display: "\\pi" },
      { label: "rho", code: "\\rho", display: "\\rho" },
      { label: "sigma", code: "\\sigma", display: "\\sigma" },
      { label: "tau", code: "\\tau", display: "\\tau" },
      { label: "phi", code: "\\phi", display: "\\phi" },
      { label: "varphi", code: "\\varphi", display: "\\varphi" },
      { label: "chi", code: "\\chi", display: "\\chi" },
      { label: "psi", code: "\\psi", display: "\\psi" },
      { label: "omega", code: "\\omega", display: "\\omega" },
      { label: "Gamma", code: "\\Gamma", display: "\\Gamma" },
      { label: "Delta", code: "\\Delta", display: "\\Delta" },
      { label: "Theta", code: "\\Theta", display: "\\Theta" },
      { label: "Lambda", code: "\\Lambda", display: "\\Lambda" },
      { label: "Xi", code: "\\Xi", display: "\\Xi" },
      { label: "Pi", code: "\\Pi", display: "\\Pi" },
      { label: "Sigma", code: "\\Sigma", display: "\\Sigma" },
      { label: "Phi", code: "\\Phi", display: "\\Phi" },
      { label: "Psi", code: "\\Psi", display: "\\Psi" },
      { label: "Omega", code: "\\Omega", display: "\\Omega" },
    ],
  },
  {
    name: "Relations & Sets",
    items: [
      { label: "Less/Equal", code: "\\leq", display: "\\leq" },
      { label: "Greater/Equal", code: "\\geq", display: "\\geq" },
      { label: "Not Equal", code: "\\neq", display: "\\neq" },
      { label: "Approximately", code: "\\approx", display: "\\approx" },
      { label: "Equivalent / Defined", code: "\\equiv", display: "\\equiv" },
      { label: "Proportional To", code: "\\propto", display: "\\propto" },
      { label: "Much Less", code: "\\ll", display: "\\ll" },
      { label: "Much Greater", code: "\\gg", display: "\\gg" },
      { label: "Element Of", code: "\\in", display: "\\in" },
      { label: "Not Element Of", code: "\\notin", display: "\\notin" },
      { label: "Proper Subset", code: "\\subset", display: "\\subset" },
      { label: "Subset or Equal", code: "\\subseteq", display: "\\subseteq" },
      { label: "Union", code: "\\cup", display: "\\cup" },
      { label: "Intersection", code: "\\cap", display: "\\cap" },
      { label: "Set Difference", code: "\\setminus", display: "\\setminus" },
      { label: "Empty Set", code: "\\emptyset", display: "\\emptyset" },
      { label: "For All", code: "\\forall", display: "\\forall" },
      { label: "Exists", code: "\\exists", display: "\\exists" },
      { label: "Does Not Exist", code: "\\nexists", display: "\\nexists" },
      { label: "Negation", code: "\\neg", display: "\\neg" },
      { label: "Implies", code: "\\implies", display: "\\implies" },
      { label: "If and only if", code: "\\iff", display: "\\iff" },
      { label: "Therefore", code: "\\therefore", display: "\\therefore" },
      { label: "Because", code: "\\because", display: "\\because" },
    ],
  },
  {
    name: "Arrows",
    items: [
      { label: "Right Arrow", code: "\\rightarrow", display: "\\rightarrow" },
      { label: "Left Arrow", code: "\\leftarrow", display: "\\leftarrow" },
      { label: "Left-Right Arrow", code: "\\leftrightarrow", display: "\\leftrightarrow" },
      { label: "Long Right Arrow", code: "\\longrightarrow", display: "\\longrightarrow" },
      { label: "Double Right Arrow", code: "\\Rightarrow", display: "\\Rightarrow" },
      { label: "Double Left Arrow", code: "\\Leftarrow", display: "\\Leftarrow" },
      { label: "Double Left-Right", code: "\\Leftrightarrow", display: "\\Leftrightarrow" },
      { label: "Maps To", code: "\\mapsto", display: "\\mapsto" },
      { label: "Up Arrow", code: "\\uparrow", display: "\\uparrow" },
      { label: "Down Arrow", code: "\\downarrow", display: "\\downarrow" },
    ],
  },
  {
    name: "Trig & Functions",
    items: [
      { label: "Sine", code: "\\sin(x)", display: "\\sin(x)" },
      { label: "Cosine", code: "\\cos(x)", display: "\\cos(x)" },
      { label: "Tangent", code: "\\tan(x)", display: "\\tan(x)" },
      { label: "Secant", code: "\\sec(x)", display: "\\sec(x)" },
      { label: "Cosecant", code: "\\csc(x)", display: "\\csc(x)" },
      { label: "Cotangent", code: "\\cot(x)", display: "\\cot(x)" },
      { label: "Arc Sine", code: "\\arcsin(x)", display: "\\arcsin(x)" },
      { label: "Arc Cosine", code: "\\arccos(x)", display: "\\arccos(x)" },
      { label: "Arc Tangent", code: "\\arctan(x)", display: "\\arctan(x)" },
      { label: "Natural Log", code: "\\ln(x)", display: "\\ln(x)" },
      { label: "Log base 10", code: "\\log_{10}(x)", display: "\\log_{10}(x)" },
      { label: "Exponential", code: "\\exp(x)", display: "e^x" },
      { label: "Maximum", code: "\\max", display: "\\max" },
      { label: "Minimum", code: "\\min", display: "\\min" },
    ],
  },
  {
    name: "Matrices & Structures",
    items: [
      {
        label: "2x2 Bracket Matrix",
        code: "\\begin{bmatrix}\n  a & b \\\\\n  c & d\n\\end{bmatrix}",
        display: "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
      },
      {
        label: "2x2 Parenthesis Matrix",
        code: "\\begin{pmatrix}\n  a & b \\\\\n  c & d\n\\end{pmatrix}",
        display: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
      },
      {
        label: "2x2 Determinant",
        code: "\\begin{vmatrix}\n  a & b \\\\\n  c & d\n\\end{vmatrix}",
        display: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}",
      },
      {
        label: "3x3 Identity Matrix",
        code: "\\begin{bmatrix}\n  1 & 0 & 0 \\\\\n  0 & 1 & 0 \\\\\n  0 & 0 & 1\n\\end{bmatrix}",
        display: "I_3",
      },
      {
        label: "Piecewise Cases",
        code: "\\begin{cases}\n  x & \\text{if } x > 0 \\\\\n  -x & \\text{otherwise}\n\\end{cases}",
        display: "\\begin{cases} a \\\\ b \\end{cases}",
      },
      {
        label: "Aligned Equations",
        code: "\\begin{aligned}\n  a &= b + c \\\\\n  d &= e + f\n\\end{aligned}",
        display: "\\begin{aligned} a&=b \\end{aligned}",
      },
      {
        label: "Large Parentheses",
        code: "\\left( \\frac{a}{b} \\right)",
        display: "\\left( \\frac{a}{b} \\right)",
      },
      {
        label: "Large Brackets",
        code: "\\left[ \\frac{a}{b} \\right]",
        display: "\\left[ \\frac{a}{b} \\right]",
      },
      {
        label: "Large Braces",
        code: "\\left\\{ \\frac{a}{b} \\right\\}",
        display: "\\left\\{ \\frac{a}{b} \\right\\}",
      },
      {
        label: "Absolute Value",
        code: "\\left| x \\right|",
        display: "|x|",
      },
      {
        label: "Vector Norm",
        code: "\\left\\| \\vec{v} \\right\\|",
        display: "\\|\\vec{v}\\|",
      },
    ],
  },
  {
    name: "Fonts & Accents",
    items: [
      { label: "Real Numbers", code: "\\mathbb{R}", display: "\\mathbb{R}" },
      { label: "Complex Numbers", code: "\\mathbb{C}", display: "\\mathbb{C}" },
      { label: "Integers", code: "\\mathbb{Z}", display: "\\mathbb{Z}" },
      { label: "Natural Numbers", code: "\\mathbb{N}", display: "\\mathbb{N}" },
      { label: "Rational Numbers", code: "\\mathbb{Q}", display: "\\mathbb{Q}" },
      { label: "Calligraphic L", code: "\\mathcal{L}", display: "\\mathcal{L}" },
      { label: "Bold Math", code: "\\mathbf{X}", display: "\\mathbf{X}" },
      { label: "Normal Text in Math", code: "\\text{word}", display: "\\text{text}" },
      { label: "Bar Accent", code: "\\bar{x}", display: "\\bar{x}" },
      { label: "Tilde Accent", code: "\\tilde{x}", display: "\\tilde{x}" },
      { label: "Overline", code: "\\overline{AB}", display: "\\overline{AB}" },
      { label: "Overbrace", code: "\\overbrace{a+b}^{c}", display: "\\overbrace{x}" },
      { label: "Underbrace", code: "\\underbrace{a+b}_{c}", display: "\\underbrace{x}" },
    ],
  },
];

// Helper component to render KaTeX math icon on buttons safely
function MathSymbol({ latex, fallback }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: false,
        throwOnError: false,
        output: "html",
      });
    } catch {
      return null;
    }
  }, [latex]);

  if (html) {
    return (
      <span
        className="inline-flex items-center justify-center leading-none select-none pointer-events-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return <span className="font-mono text-xs">{fallback}</span>;
}

export default function CommonCommands({ onInsert }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  // Tabs Drag-to-scroll & Swipe states
  const tabsContainerRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = () => {
    const el = tabsContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    checkScrollLimits();
    const el = tabsContainerRef.current;
    if (!el) return;
    const handleResize = () => checkScrollLimits();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, searchQuery]);

  // Drag handlers
  const handleMouseDown = (e) => {
    const el = tabsContainerRef.current;
    if (!el) return;
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return;
    const el = tabsContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
    checkScrollLimits();
  };

  const handleMouseUpOrLeave = () => {
    isMouseDownRef.current = false;
  };

  // Wheel horizontal scrolling handler
  const handleWheel = (e) => {
    const el = tabsContainerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      checkScrollLimits();
    }
  };

  const scrollTabsBy = (offset) => {
    const el = tabsContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(checkScrollLimits, 200);
  };

  // Search filter across all commands
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    const matches = [];

    COMMAND_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        if (
          item.label.toLowerCase().includes(query) ||
          item.code.toLowerCase().includes(query) ||
          cat.name.toLowerCase().includes(query)
        ) {
          matches.push({ ...item, categoryName: cat.name });
        }
      });
    });

    return matches;
  }, [searchQuery]);

  const currentItems =
    filteredCommands !== null
      ? filteredCommands
      : COMMAND_CATEGORIES[activeCategory].items;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      {/* Top Header with Search & Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="w-4 h-4 text-[#2196F3] dark:text-[#42A5F5]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Math Symbols & Commands
            </span>
          </div>

          {/* Toggle Expand on Mobile */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="sm:hidden p-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symbols (e.g. frac, matrix, sum)..."
            className="w-full text-xs pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2196F3] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Drag & Swipe Categories Tabs Header */}
      {isExpanded && !searchQuery.trim() && (
        <div className="relative flex items-center border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-950/30 group">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollTabsBy(-140)}
              className="absolute left-0 z-10 h-full px-1.5 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-slate-900 dark:via-slate-900/90 dark:to-transparent text-slate-600 dark:text-slate-300 hover:text-[#2196F3] dark:hover:text-[#42A5F5] flex items-center justify-center transition-opacity"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Draggable & Swipeable Tabs List */}
          <div
            ref={tabsContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onWheel={handleWheel}
            onScroll={checkScrollLimits}
            className="px-3 pt-2 pb-1.5 overflow-x-auto flex items-center gap-1.5 scrollbar-none cursor-grab active:cursor-grabbing select-none w-full scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {COMMAND_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => {
                  if (!hasDraggedRef.current) {
                    setActiveCategory(idx);
                  }
                }}
                className={`text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-all duration-150 shrink-0 ${
                  activeCategory === idx
                    ? "bg-[#2196F3] text-white shadow-2xs font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollTabsBy(140)}
              className="absolute right-0 z-10 h-full px-1.5 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-slate-900 dark:via-slate-900/90 dark:to-transparent text-slate-600 dark:text-slate-300 hover:text-[#2196F3] dark:hover:text-[#42A5F5] flex items-center justify-center transition-opacity"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Buttons Grid */}
      {isExpanded && (
        <div className="p-3">
          {currentItems.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
              No mathematical commands matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {currentItems.map((item) => (
                <button
                  key={item.label + item.code}
                  type="button"
                  onClick={() => onInsert(item.code)}
                  title={`${item.label} — Click to insert: ${item.code}`}
                  className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-slate-50/80 dark:bg-slate-950/60 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-slate-800 dark:text-slate-200 hover:text-[#1976D2] dark:hover:text-[#64B5F6] border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700/60 shadow-2xs hover:shadow-sm transition-all duration-150 active:scale-95 group min-h-[52px]"
                >
                  {/* KaTeX Symbol Preview */}
                  <div className="text-sm font-medium flex items-center justify-center h-6 overflow-hidden">
                    <MathSymbol latex={item.display || item.code} fallback={item.code} />
                  </div>

                  {/* Symbol Label */}
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-[#1976D2] dark:group-hover:text-[#64B5F6] truncate max-w-full font-sans">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Quick Helper Note */}
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span>Click any symbol to insert at cursor position &bull; Drag or swipe tabs to browse</span>
            <span className="hidden sm:inline">
              {filteredCommands ? `${filteredCommands.length} matches` : `${currentItems.length} symbols in this category`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
