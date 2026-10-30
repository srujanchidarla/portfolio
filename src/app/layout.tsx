import type { Metadata } from "next";
import { Big_Shoulders, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./splits.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BootProvider } from "@/components/BootProvider";
import BootLoader from "@/components/BootLoader";
import MobileShell from "@/components/MobileShell";
import CookieConsentProvider from "@/components/CookieConsentProvider";
import MotionFX from "@/components/fx/MotionFX";
import InlineScript from "@/components/fx/InlineScript";
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

const athletic = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-athletic-var",
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

const PRE_PAINT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",t);d.style.colorScheme=t}catch(e){}d.classList.add("js");setTimeout(function(){if(!d.classList.contains("fx-ready"))d.classList.remove("js")},3000)})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${athletic.variable} ${mono.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Set theme and reveal state before first paint so nothing flashes. */}
        <InlineScript html={PRE_PAINT} />
      </head>
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
              <MotionFX />
              {children}
            </CookieConsentProvider>
          </BootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
