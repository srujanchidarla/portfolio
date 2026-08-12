import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import ResumeDocument from "@/components/resume/ResumeDocument";

export const metadata: Metadata = {
  title: `Resume | ${SITE.name}`,
  description: `Resume for ${SITE.name} — Software Engineer · MS CS Aug 2026`,
  robots: { index: true, follow: true },
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-page__toolbar no-print">
        <Link href="/" className="resume-page__back">
          ← Portfolio
        </Link>
        <div className="resume-page__actions">
          <button type="button" className="btn-primary" id="resume-print-btn">
            Print / Save PDF
          </button>
        </div>
      </div>
      <ResumeDocument />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('resume-print-btn')?.addEventListener('click',()=>window.print());`,
        }}
      />
    </main>
  );
}
