import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroRecruiter from "@/components/recruiter/HeroRecruiter";
import ProofSection from "@/components/recruiter/ProofSection";
import Experience from "@/components/Experience";
import ImpactProjects from "@/components/recruiter/ImpactProjects";
import DailyDSA from "@/components/recruiter/DailyDSA";
import DailyDSASkeleton from "@/components/recruiter/DailyDSASkeleton";
import SkillsImpact from "@/components/recruiter/SkillsImpact";
import FeaturedCerts from "@/components/recruiter/FeaturedCerts";
import WritingSection from "@/components/recruiter/WritingSection";
import AthleteLife from "@/components/recruiter/AthleteLife";
import LocalGuideBanner from "@/components/recruiter/LocalGuideBanner";
import GitHubActivity from "@/components/GitHubActivity";
import GitHubActivitySkeleton from "@/components/github/GitHubActivitySkeleton";
import RecruiterCTA from "@/components/recruiter/RecruiterCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Footer from "@/components/Footer";
import LapRail from "@/components/fx/LapRail";
import { ContactProvider } from "@/components/ContactProvider";

/** Personal portfolio as a race log: each section is a lap. */
export default function HomePage() {
  return (
    <ContactProvider>
      <Navbar />
      <LapRail />
      <main id="main-content" className="site-main overflow-x-hidden" tabIndex={-1}>
        <HeroRecruiter />
        <ImpactProjects />
        <ProofSection />
        <Experience />
        <Suspense fallback={<DailyDSASkeleton />}>
          <DailyDSA />
        </Suspense>
        <SkillsImpact />
        <FeaturedCerts />
        <WritingSection />
        <AthleteLife />
        <LocalGuideBanner />
        <Suspense fallback={<GitHubActivitySkeleton />}>
          <GitHubActivity />
        </Suspense>
        <RecruiterCTA />
      </main>
      <StickyMobileCTA />
      <Footer />
    </ContactProvider>
  );
}
