import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export const metadata = {
  metadataBase: new URL("https://github.com/ibrahim-dev9/LaTeX-Math-Editor"),
  title: {
    default: "LaTeX Math Editor — Write, Preview & Export Math",
    template: "%s | LaTeX Math Editor",
  },
  description:
    "A modern, fast, and free online LaTeX math editor with real-time KaTeX rendering and instant export to PDF, Markdown (.md), and high-resolution PNG images. Features 100+ visual math symbols, dark mode, zoom, and fullscreen canvas.",
  keywords: [
    "LaTeX Math Editor",
    "Online LaTeX Editor",
    "KaTeX Equation Editor",
    "Math Formula to PNG",
    "LaTeX to PDF",
    "Export Math Markdown",
    "Mathematical Notation",
    "Math Symbols Palette",
    "Calculus Equations",
    "Matrix Editor",
    "Quadratic Formula LaTeX",
    "LaTeX Preview Online",
    "Ibrahim albayati",
    "TeX Math Render",
  ],
  authors: [
    {
      name: "Ibrahim albayati",
      url: "https://github.com/ibrahim-dev9",
    },
  ],
  creator: "Ibrahim albayati",
  publisher: "Ibrahim albayati",
  category: "Developer Tools & Education",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "LaTeX Math Editor — Write, Preview & Export Math",
    description:
      "Write mathematical expressions, preview them in real time with KaTeX, and export directly as PDF, Markdown, or PNG.",
    url: "https://github.com/ibrahim-dev9/LaTeX-Math-Editor",
    siteName: "LaTeX Math Editor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 675,
        alt: "LaTeX Math Editor - Real-Time Equation Editor and Multi-Format Exporter",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaTeX Math Editor — Write, Preview & Export Math",
    description:
      "Write mathematical expressions, preview them in real time with KaTeX, and export directly as PDF, Markdown, or PNG.",
    images: ["/og-image.png"],
    creator: "@ibrahim_dev9",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LaTeX Math Editor",
  "url": "https://github.com/ibrahim-dev9/LaTeX-Math-Editor",
  "description":
    "A modern online LaTeX math editor with real-time mathematical previews and PDF, Markdown, and PNG export.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "All",
  "image": "https://github.com/ibrahim-dev9/LaTeX-Math-Editor/raw/main/public/og-image.png",
  "author": {
    "@type": "Person",
    "name": "Ibrahim albayati",
    "url": "https://github.com/ibrahim-dev9",
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "featureList": [
    "Real-time KaTeX mathematical equation rendering",
    "Visual math symbols palette with drag & swipe categories",
    "Export to high-resolution PNG, PDF, and Markdown (.md)",
    "Fullscreen interactive math canvas with zoom controls",
    "Dark and Light theme support with #2196F3 primary styling",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('latex-editor-theme');
                if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-[#2196F3] selection:text-white">
        {children}
      </body>
    </html>
  );
}
