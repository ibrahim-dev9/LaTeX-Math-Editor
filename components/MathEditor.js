"use client";

import { useRef } from "react";
import LatexEditor from "./LatexEditor";
import MathPreview from "./MathPreview";
import ExportToolbar from "./ExportToolbar";

export default function MathEditor({
  latexCode,
  setLatexCode,
}) {
  const previewContainerRef = useRef(null);

  const handleSelectExample = (example) => {
    setLatexCode(example.latex);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Main 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: LaTeX Editor & Tools (6 cols on desktop) */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-4">
          <LatexEditor
            latexCode={latexCode}
            setLatexCode={setLatexCode}
            onSelectExample={handleSelectExample}
          />
        </div>

        {/* Right Column: Math Preview (6 cols on desktop, sticky on large screens) */}
        <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20">
          <MathPreview
            latexCode={latexCode}
            previewContainerRef={previewContainerRef}
          />
        </div>
      </div>

      {/* Export Section */}
      <ExportToolbar
        latexCode={latexCode}
        previewContainerRef={previewContainerRef}
      />
    </div>
  );
}
