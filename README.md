# 📐 LaTeX Math Editor

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/KaTeX-0.16-319795?style=for-the-badge" alt="KaTeX" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Primary_Color-%232196F3-2196F3?style=for-the-badge" alt="Primary Color" />
</p>

A modern, clean, and responsive single-page **LaTeX Math Editor** designed for developers, mathematicians, physicists, and students. Write equations, preview them in real time with high-precision mathematical typography, and export them directly to **PDF**, **Markdown (`.md`)**, or **high-resolution PNG images**.

🔗 **Repository:** [https://github.com/ibrahim-dev9/LaTeX-Math-Editor](https://github.com/ibrahim-dev9/LaTeX-Math-Editor)

---

## ✨ Features

- **⚡ Real-Time KaTeX Rendering**: Equations render instantly as you type with zero lag and graceful error recovery (no crashes on incomplete syntax).
- **🎛 Visual Math Symbols & Commands**:
  - Over 100+ categorised mathematical symbols (Calculus, Greek alphabet, Matrices, Relations, Sets, Arrows, Trig, Logic).
  - KaTeX-rendered visual icons directly on buttons for intuitive discovery.
  - **Drag-to-scroll & Touch Swipe** category bar with arrow navigation.
  - **Instant Search Bar** to find symbols in milliseconds (e.g., `matrix`, `int`, `alpha`, `sum`).
- **📦 Multi-Format Client-Side Export**:
  - **📄 PDF Export**: Generates a clean document with title, rendered equation, and LaTeX source code.
  - **📝 Markdown (`.md`) Export**: Downloads a ready-to-use `.md` file formatted with `\[ ... \]` blocks.
  - **🖼 High-DPI PNG Export**: Exports equation images (3x resolution) with selectable background options: **Transparent**, **Solid White**, or **Dark Theme**.
- **🔍 Fullscreen & Zoom Canvas**:
  - Fullscreen preview overlay powered by React Portals.
  - Precise Zoom In, Zoom Out, and Reset (100%) controls.
  - Mathematical grid / isometric graph paper canvas background.
- **🌓 Light & Dark Theme**:
  - Clean academic developer-tool aesthetic with `#2196F3` primary accents.
  - Zero-flash theme initialization with `localStorage` persistence and system theme detection.
- **⌨️ Developer-Grade Code Editor**:
  - Line numbers gutter with synchronized scrolling.
  - Undo (`Ctrl/Cmd+Z`) and Redo (`Ctrl/Cmd+Y` / `Ctrl/Cmd+Shift+Z`) history stack.
  - Code formatting tool and single-click copy with feedback.
  - Clean focus rings on all input fields without disruptive border jumps.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, JavaScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Math Rendering Engine**: [KaTeX](https://katex.org/)
- **Document Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **Image Capture**: [html-to-image](https://github.com/bubkoo/html-to-image)
- **Iconography**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ibrahim-dev9/LaTeX-Math-Editor.git
   cd LaTeX-Math-Editor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```text
├── app/
│   ├── globals.css          # Theme variables, Tailwind setup, math grid pattern
│   ├── layout.js            # SEO, OpenGraph metadata, font loading, theme script
│   └── page.js              # Main single-page application and root state
├── components/
│   ├── CommonCommands.js    # Visual math symbols palette with drag/swipe tabs & search
│   ├── EditorToolbar.js     # Undo, Redo, Format, Copy, Clear, and Fullscreen toolbar
│   ├── Examples.js          # Selectable math equation templates (Quadratic, Gaussian, etc.)
│   ├── ExportToolbar.js     # PDF, Markdown, and PNG export engines
│   ├── Header.js            # Minimal sticky navigation, branding, repo link, theme switch
│   ├── Hero.js              # Compact hero section with live status badge
│   ├── LatexEditor.js       # Code editor with line numbers, monospace font, keyboard shortcuts
│   ├── MathEditor.js        # Responsive 2-column container layout
│   ├── MathPreview.js       # KaTeX render canvas, zoom scaling & fullscreen portal
│   ├── ThemeToggle.js       # Light / Dark mode switcher
│   └── ZoomControls.js      # Zoom in, zoom out, and reset controls
├── public/                  # Static assets & icons
└── README.md                # Documentation
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl` / `Cmd` + `Z` | Undo code changes |
| `Ctrl` / `Cmd` + `Y` / `Cmd` + `Shift` + `Z` | Redo code changes |
| `Tab` | Insert 2-space indentation |
| `Esc` | Exit fullscreen math preview |

---

## 👤 Author

Created with ❤️ by **[Ibrahim albayati](https://github.com/ibrahim-dev9)**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
