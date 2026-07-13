import Navbar from "@/components/Navbar";
import HeroRecruiter from "@/components/recruiter/HeroRecruiter";
import ProofSection from "@/components/recruiter/ProofSection";
import Experience from "@/components/Experience";
import SkillsImpact from "@/components/recruiter/SkillsImpact";
import ImpactProjects from "@/components/recruiter/ImpactProjects";
import WritingSection from "@/components/recruiter/WritingSection";
import GitHubActivity from "@/components/GitHubActivity";
import HiringSignal from "@/components/recruiter/HiringSignal";
import RecruiterCTA from "@/components/recruiter/RecruiterCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Footer from "@/components/Footer";
import { ContactProvider } from "@/components/ContactProvider";

export default function HomePage() {
  return (
    <ContactProvider>
      <Navbar />
      <main className="site-main overflow-x-hidden">
        <HeroRecruiter />
        <ProofSection />
        <Experience />
        <ImpactProjects />
        <SkillsImpact />
        <WritingSection />
        <GitHubActivity />
        <HiringSignal />
        <RecruiterCTA />
      </main>
      <StickyMobileCTA />
      <Footer />
    </ContactProvider>
  );
}
