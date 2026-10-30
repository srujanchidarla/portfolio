import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudy from "@/components/work/CaseStudy";
import { ContactProvider } from "@/components/ContactProvider";
import { getCaseStudy } from "@/lib/case-studies";
import { CURATED_PROJECTS, IMPACT_PROJECTS } from "@/lib/recruiter-home";
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
    description: `${study.summary} A case study by ${SITE.name}.`,
    alternates: { canonical: `/work/${project.id}` },
    authors: [{ name: SITE.name, url: SITE.website }],
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

  const index = CURATED_PROJECTS.findIndex((item) => item.id === project.id);
  const next = CURATED_PROJECTS[(index + 1) % CURATED_PROJECTS.length];

  return (
    <ContactProvider>
      <Navbar />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <CaseStudy
          project={project}
          study={study}
          next={next}
          index={index}
          total={CURATED_PROJECTS.length}
        />
      </main>
      <Footer />
    </ContactProvider>
  );
}
