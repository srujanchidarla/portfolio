import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-var",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono-var",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://srujanchidarla.com"),
  title: "Srujan Chidarla | New Grad Full-Stack Engineer · Aug 2026",
  description:
    "New grad MS CS (4.0 GPA, Aug 2026). Full-stack engineer with production exposure at 2M+ req/day. Shipped CampfireChai, JobHuntOS & Neocortex. Seeking first full-time role.",
  keywords: [
    "Srujan Chidarla",
    "new grad software engineer",
    "entry level full-stack",
    "2026 graduate",
    "CampfireChai",
    "JobHuntOS",
    "Neocortex",
    "United States",
    "STEM OPT",
  ],
  openGraph: {
    title: "Srujan Chidarla — Full-Stack Engineer · 2M+ req/day exposure",
    description:
      "New grad · 4.0 GPA · Aug 2026 · Shipped CampfireChai & JobHuntOS · Live GitHub activity · Seeking first full-time role",
    type: "website",
    url: "https://srujanchidarla.com",
    siteName: "Srujan Chidarla",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 1300,
        alt: "Srujan Chidarla — new grad full-stack engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Srujan Chidarla — Full-Stack Engineer · 2M+ req/day exposure",
    description:
      "New grad · 4.0 GPA · Aug 2026 · Shipped CampfireChai & JobHuntOS · Seeking first full-time role",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `
  (function () {
    try {
      var key = 'theme';
      var stored = localStorage.getItem(key);
      var theme = (stored === 'dark' || stored === 'light')
        ? stored
        : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
    } catch (e) {}
  })();
  `;

  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} h-full`}>
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
