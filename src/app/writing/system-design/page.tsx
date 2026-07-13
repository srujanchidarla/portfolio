import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SystemDesignArticle from "@/components/writing/SystemDesignArticle";
import { SYSTEM_DESIGN_ESSAY } from "@/lib/system-design";
import { ContactProvider } from "@/components/ContactProvider";

export const metadata: Metadata = {
  title: `${SYSTEM_DESIGN_ESSAY.title} | Srujan Chidarla`,
  description: SYSTEM_DESIGN_ESSAY.summary,
  openGraph: {
    title: SYSTEM_DESIGN_ESSAY.title,
    description: SYSTEM_DESIGN_ESSAY.summary,
    type: "article",
    url: `https://srujanchidarla.com${SYSTEM_DESIGN_ESSAY.href}`,
  },
};

export default function SystemDesignPage() {
  return (
    <ContactProvider>
      <Navbar />
      <main className="site-main sd-page">
        <div className="wrap sd-page__wrap">
          <SystemDesignArticle />
        </div>
      </main>
      <Footer />
    </ContactProvider>
  );
}
