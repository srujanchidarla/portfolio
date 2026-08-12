import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResearchIndex from "@/components/research/ResearchIndex";
import { ContactProvider } from "@/components/ContactProvider";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Research | ${SITE.name}`,
  description:
    "Papers, preprints, and working research ideas from Srujan Chidarla — labeled honestly, not padded.",
  openGraph: {
    title: `Research | ${SITE.name}`,
    description: "Papers when they exist. Working notes and open questions in the meantime.",
    type: "website",
    url: `${SITE.website}/research`,
  },
};

export default function ResearchPage() {
  return (
    <ContactProvider>
      <Navbar />
      <main id="main-content" className="site-main research-page-shell" tabIndex={-1}>
        <div className="wrap">
          <ResearchIndex />
        </div>
      </main>
      <Footer />
    </ContactProvider>
  );
}
