import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TheStory from "@/components/recruiter/TheStory";
import AthleteLife from "@/components/recruiter/AthleteLife";
import Footer from "@/components/Footer";
import { ContactProvider } from "@/components/ContactProvider";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `About | ${SITE.name}`,
  description:
    "Beyond code — athlete discipline, learning journey, and what drives Srujan Chidarla.",
};

export default function AboutPage() {
  return (
    <ContactProvider>
      <Navbar />
      <main id="main-content" className="site-main overflow-x-hidden" tabIndex={-1}>
        <TheStory />
        <AthleteLife />
      </main>
      <Footer />
    </ContactProvider>
  );
}
