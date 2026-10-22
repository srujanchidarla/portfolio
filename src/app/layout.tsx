import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BootProvider } from "@/components/BootProvider";
import BootLoader from "@/components/BootLoader";
import MobileShell from "@/components/MobileShell";
import CookieConsentProvider from "@/components/CookieConsentProvider";
import { PRIMARY_ROLE, SITE } from "@/lib/site";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-outfit-var",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-var",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-fira-code-var",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.website),
  title: `${SITE.name} | Software Engineer · Aug 2026`,
  description: PRIMARY_ROLE.headline,
  keywords: [
    "Srujan Chidarla",
    "software engineer",
    "full-stack developer",
    "system design",
    "computer networks",
    "distributed systems",
    "2026 graduate",
    "JobHuntOS",
    "Wildmate",
    "AgriWise",
    "STEM OPT",
  ],
  openGraph: {
    title: `${SITE.name} — Full-stack · System design · 2M+ req/day`,
    description: PRIMARY_ROLE.headline,
    type: "website",
    url: SITE.website,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Software Engineer · Aug 2026`,
    description: PRIMARY_ROLE.headline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head />
      <body
        className={`${sans.className} min-h-full flex flex-col antialiased`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <BootProvider>
            <CookieConsentProvider>
              <BootLoader />
              <MobileShell />
              {children}
            </CookieConsentProvider>
          </BootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
