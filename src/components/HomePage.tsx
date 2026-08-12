import Navbar from "@/components/Navbar";
import HeroRecruiter from "@/components/recruiter/HeroRecruiter";
import ProofSection from "@/components/recruiter/ProofSection";
import Experience from "@/components/Experience";
import ImpactProjects from "@/components/recruiter/ImpactProjects";
import DailyDSA from "@/components/recruiter/DailyDSA";
import SkillsImpact from "@/components/recruiter/SkillsImpact";
import FeaturedCerts from "@/components/recruiter/FeaturedCerts";
import WritingSection from "@/components/recruiter/WritingSection";
import AthleteLife from "@/components/recruiter/AthleteLife";
import LocalGuideBanner from "@/components/recruiter/LocalGuideBanner";
import GitHubActivity from "@/components/GitHubActivity";
import RecruiterCTA from "@/components/recruiter/RecruiterCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Footer from "@/components/Footer";
import { ContactProvider } from "@/components/ContactProvider";

/** Personal portfolio: work, projects, practice, and how I live. */
export default function HomePage() {
  return (
    <ContactProvider>
      <Navbar />
      <main id="main-content" className="site-main overflow-x-hidden" tabIndex={-1}>
        <HeroRecruiter />
        <ProofSection />
        <Experience />
        <ImpactProjects limit={4} />
        <DailyDSA />
        <SkillsImpact />
        <FeaturedCerts />
        <WritingSection />
        <AthleteLife />
        <LocalGuideBanner />
        <GitHubActivity />
        <RecruiterCTA />
      </main>
      <StickyMobileCTA />
      <Footer />
    </ContactProvider>
  );
}
