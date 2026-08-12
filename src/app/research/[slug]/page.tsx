import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResearchNote from "@/components/research/ResearchNote";
import { ContactProvider } from "@/components/ContactProvider";
import { RESEARCH_ITEMS, getResearchItem, researchHref } from "@/lib/research";
import { SITE } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return RESEARCH_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getResearchItem(slug);
  if (!item) {
    return { title: `Research | ${SITE.name}` };
  }
  return {
    title: `${item.title} | ${SITE.name}`,
    description: item.abstract,
    openGraph: {
      title: item.title,
      description: item.abstract,
      type: "article",
      url: `${SITE.website}${researchHref(item)}`,
    },
  };
}

export default async function ResearchItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getResearchItem(slug);
  if (!item) notFound();

  return (
    <ContactProvider>
      <Navbar />
      <main id="main-content" className="site-main sd-page" tabIndex={-1}>
        <div className="wrap sd-page__wrap">
          <ResearchNote item={item} />
        </div>
      </main>
      <Footer />
    </ContactProvider>
  );
}
