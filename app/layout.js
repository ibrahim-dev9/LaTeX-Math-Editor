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
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export const metadata = {
  title: "LaTeX Math Editor — Write, Preview & Export Math",
  description:
    "A modern online LaTeX math editor with real-time mathematical previews and PDF, Markdown, and PNG export.",
  keywords: [
    "LaTeX",
    "Math Editor",
    "Equation Editor",
    "KaTeX",
    "Math Preview",
    "PDF Export",
    "Markdown Math",
    "PNG Math",
    "LaTeX online",
  ],
  authors: [{ name: "LaTeX Math Editor Team" }],
  openGraph: {
    title: "LaTeX Math Editor — Write, Preview & Export Math",
    description:
      "A modern online LaTeX math editor with real-time mathematical previews and PDF, Markdown, and PNG export.",
    type: "website",
    locale: "en_US",
    siteName: "LaTeX Math Editor",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaTeX Math Editor — Write, Preview & Export Math",
    description:
      "A modern online LaTeX math editor with real-time mathematical previews and PDF, Markdown, and PNG export.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
