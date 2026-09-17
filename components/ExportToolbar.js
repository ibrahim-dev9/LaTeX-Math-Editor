"use client";

import { useState } from "react";
import {
  FileDown,
  FileText,
  FileCode,
  Image as ImageIcon,
  Check,
  Loader2,
  Settings2,
} from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function ExportToolbar({
  latexCode,
  previewContainerRef,
}) {
  const [pngBg, setPngBg] = useState("transparent"); // 'transparent' | 'white' | 'dark'
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isExportingMd, setIsExportingMd] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  const showFeedback = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 2500);
  };

  // Helper to trigger browser file download
  const triggerDownload = (url, filename) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 1. Export as PNG
  const handleExportPng = async () => {
    if (!latexCode.trim()) return;
    setIsExportingPng(true);

    try {
      const target =
        document.getElementById("katex-math-output") ||
        previewContainerRef?.current;

      if (!target) {
        throw new Error("Preview element not found");
      }

      let bgColor = null;
      let textColor = undefined;
      if (pngBg === "white") {
        bgColor = "#ffffff";
        textColor = "#0f172a";
      } else if (pngBg === "dark") {
        bgColor = "#090d16";
        textColor = "#f8fafc";
      }

      const dataUrl = await toPng(target, {
        pixelRatio: 3,
        backgroundColor: bgColor,
        style: {
          padding: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: textColor,
        },
        cacheBust: true,
      });

      triggerDownload(dataUrl, "math-equation.png");
      showFeedback("PNG exported successfully!");
    } catch (err) {
      console.error("PNG export error:", err);
      alert("Failed to export PNG. Please make sure the equation is valid.");
    } finally {
      setIsExportingPng(false);
    }
  };

  // 2. Export as Markdown (.md)
  const handleExportMd = () => {
    if (!latexCode.trim()) return;
    setIsExportingMd(true);

    try {
      const mdContent = `# Mathematical Expression

## Equation

\\[
${latexCode}
\\]

## LaTeX Source

\`\`\`latex
${latexCode}
\`\`\`

---
*Generated with LaTeX Math Editor*
`;

      const blob = new Blob([mdContent], {
        type: "text/markdown;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "math-equation.md");
      URL.revokeObjectURL(url);
      showFeedback("Markdown file downloaded!");
    } catch (err) {
      console.error("Markdown export error:", err);
    } finally {
      setIsExportingMd(false);
    }
  };

  // 3. Export as PDF
  const handleExportPdf = async () => {
    if (!latexCode.trim()) return;
    setIsExportingPdf(true);

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      // Header Banner (#2196F3 -> RGB: 33, 150, 243)
      doc.setFillColor(33, 150, 243);
      doc.rect(0, 0, pageWidth, 12, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text("LaTeX Math Editor", margin, 8);

      let currentY = 26;

      // Document Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(15, 23, 42);
      doc.text("Mathematical Expression", margin, currentY);
      currentY += 8;

      // Date / Metadata
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(
        `Generated on ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        margin,
        currentY
      );
      currentY += 12;

      // Render math equation image using html-to-image
      const target =
        document.getElementById("katex-math-output") ||
        previewContainerRef?.current;

      if (target) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(51, 65, 85);
        doc.text("Rendered Equation", margin, currentY);
        currentY += 6;

        const imgDataUrl = await toPng(target, {
          pixelRatio: 3,
          backgroundColor: "#ffffff",
          style: {
            padding: "24px",
            color: "#0f172a",
          },
        });

        const img = new Image();
        img.src = imgDataUrl;
        await new Promise((resolve) => (img.onload = resolve));

        const maxImgWidth = Math.min(contentWidth, 160);
        const imgHeight = (img.height * maxImgWidth) / img.width;

        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin, currentY, contentWidth, imgHeight + 10, 3, 3, "FD");

        const imgX = margin + (contentWidth - maxImgWidth) / 2;
        doc.addImage(imgDataUrl, "PNG", imgX, currentY + 5, maxImgWidth, imgHeight);
        currentY += imgHeight + 20;
      }

      // LaTeX Source Code Box
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(51, 65, 85);
      doc.text("LaTeX Source Code", margin, currentY);
      currentY += 6;

      doc.setFillColor(15, 23, 42);
      const splitCode = doc.splitTextToSize(latexCode, contentWidth - 10);
      const codeBoxHeight = Math.max(splitCode.length * 4.5 + 8, 16);

      if (currentY + codeBoxHeight > doc.internal.pageSize.getHeight() - 15) {
        doc.addPage();
        currentY = 20;
      }

      doc.roundedRect(margin, currentY, contentWidth, codeBoxHeight, 2, 2, "F");

      doc.setFont("courier", "normal");
      doc.setFontSize(9);
      doc.setTextColor(241, 245, 249);
      doc.text(splitCode, margin + 5, currentY + 6);
      currentY += codeBoxHeight + 12;

      // Footer line
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text("Exported from LaTeX Math Editor", margin, pageHeight - 7);

      doc.save("math-equation.pdf");
      showFeedback("PDF generated and downloaded!");
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Failed to export PDF.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  const isDisabled = !latexCode.trim();

  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <FileDown className="w-4 h-4 text-[#2196F3] dark:text-[#42A5F5]" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Export
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Download your equation in multiple formats ready for papers, docs, or web.
          </p>
        </div>

        {/* Export Preferences Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>PNG Options</span>
          </button>

          {successToast && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 animate-in fade-in duration-200">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>{successToast}</span>
            </div>
          )}
        </div>
      </div>

      {/* Optional PNG Settings Row */}
      {showOptions && (
        <div className="mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 text-xs">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            PNG Background:
          </span>
          <div className="flex items-center gap-2">
            {[
              { id: "transparent", label: "Transparent" },
              { id: "white", label: "Solid White" },
              { id: "dark", label: "Dark Theme" },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              >
                <input
                  type="radio"
                  name="pngBg"
                  value={opt.id}
                  checked={pngBg === opt.id}
                  onChange={(e) => setPngBg(e.target.value)}
                  className="text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 3 Prominent Export Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. PDF */}
        <button
          type="button"
          onClick={handleExportPdf}
          disabled={isDisabled || isExportingPdf}
          className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700 shadow-2xs hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed group transition-all text-left active:scale-[0.99]"
        >
          <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
            {isExportingPdf ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                PDF
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                .pdf
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Export as PDF
            </p>
          </div>
        </button>

        {/* 2. Markdown */}
        <button
          type="button"
          onClick={handleExportMd}
          disabled={isDisabled || isExportingMd}
          className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700 shadow-2xs hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed group transition-all text-left active:scale-[0.99]"
        >
          <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
            {isExportingMd ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FileCode className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                MD
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                .md
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Export as Markdown
            </p>
          </div>
        </button>

        {/* 3. PNG */}
        <button
          type="button"
          onClick={handleExportPng}
          disabled={isDisabled || isExportingPng}
          className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700 shadow-2xs hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed group transition-all text-left active:scale-[0.99]"
        >
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
            {isExportingPng ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ImageIcon className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                PNG
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                .png
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Export as PNG
            </p>
          </div>
        </button>
      </div>
    </section>
  );
}
