import type { Metadata } from "next";
import { Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BootProvider } from "@/components/BootProvider";
import CustomCursor from "@/components/CustomCursor";
import BootLoader from "@/components/BootLoader";
import MobileShell from "@/components/MobileShell";
import CookieConsentProvider from "@/components/CookieConsentProvider";
import { PRIMARY_ROLE, SITE } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope-var",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono-var",
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
    "CampfireChai",
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
      className={`${manrope.variable} ${spaceMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head />
      <body
        className={`${manrope.className} min-h-full flex flex-col antialiased`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <BootProvider>
            <CookieConsentProvider>
              <BootLoader />
              <CustomCursor />
              <MobileShell />
              {children}
            </CookieConsentProvider>
          </BootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
