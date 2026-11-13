import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadProgress from "@/components/fx/ReadProgress";
import NetworkJourneyArticle from "@/components/writing/NetworkJourneyArticle";
import { NETWORK_JOURNEY } from "@/lib/writing";
import { ContactProvider } from "@/components/ContactProvider";
import "./journey.css";

export const metadata: Metadata = {
  title: `${NETWORK_JOURNEY.title} | Srujan Chidarla`,
  description: NETWORK_JOURNEY.summary,
  alternates: { canonical: NETWORK_JOURNEY.href },
  authors: [{ name: "Srujan Chidarla", url: "https://srujanchidarla.com" }],
  openGraph: {
    title: NETWORK_JOURNEY.title,
    description: NETWORK_JOURNEY.summary,
    type: "article",
    url: `https://srujanchidarla.com${NETWORK_JOURNEY.href}`,
  },
};

export default function NetworkJourneyPage() {
  return (
    <ContactProvider>
      <Navbar />
      <ReadProgress />
      <main className="site-main sd-page">
        <div className="wrap nj-page__wrap">
          <NetworkJourneyArticle />
        </div>
      </main>
      <Footer />
    </ContactProvider>
  );
}
