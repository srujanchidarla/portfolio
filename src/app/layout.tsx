import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BootProvider } from "@/components/BootProvider";
import CustomCursor from "@/components/CustomCursor";
import BootLoader from "@/components/BootLoader";
import { PRIMARY_ROLE, SITE } from "@/lib/site";

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
  metadataBase: new URL(SITE.website),
  title: `${SITE.name} | ${PRIMARY_ROLE.title} · Aug 2026`,
  description: PRIMARY_ROLE.headline,
  keywords: [
    "Srujan Chidarla",
    "new grad backend engineer",
    "entry level software engineer",
    "2026 graduate",
    "CampfireChai",
    "JobHuntOS",
    "Neocortex",
    "United States",
    "STEM OPT",
  ],
  openGraph: {
    title: `${SITE.name} — ${PRIMARY_ROLE.title} · 2M+ req/day`,
    description: PRIMARY_ROLE.headline,
    type: "website",
    url: SITE.website,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${PRIMARY_ROLE.title}`,
    description: PRIMARY_ROLE.headline,
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
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <ThemeProvider>
          <BootProvider>
            <BootLoader />
            <CustomCursor />
            {children}
            <Analytics />
          </BootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
