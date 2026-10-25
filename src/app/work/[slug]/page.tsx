import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudy from "@/components/work/CaseStudy";
import { ContactProvider } from "@/components/ContactProvider";
import { getCaseStudy } from "@/lib/case-studies";
import { IMPACT_PROJECTS } from "@/lib/recruiter-home";
import { SITE } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return IMPACT_PROJECTS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = IMPACT_PROJECTS.find((item) => item.id === slug);
  const study = getCaseStudy(slug);
  if (!project || !study) {
    return { title: `Work | ${SITE.name}` };
  }
  return {
    title: `${project.title} | ${SITE.name}`,
    description: study.summary,
    openGraph: {
      title: project.title,
      description: study.summary,
      url: `${SITE.website}/work/${project.id}`,
    },
  };
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = IMPACT_PROJECTS.find((item) => item.id === slug);
  const study = getCaseStudy(slug);
  if (!project || !study) notFound();

  const others = IMPACT_PROJECTS.filter((item) => item.id !== project.id).slice(0, 3);

  return (
    <ContactProvider>
      <Navbar />
      <main id="main-content" className="site-main case-page" tabIndex={-1}>
        <div className="wrap case-page__wrap">
          <CaseStudy project={project} study={study} others={others} />
        </div>
      </main>
      <Footer />
    </ContactProvider>
  );
}
