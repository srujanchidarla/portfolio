import type { Metadata } from "next";
import LegalIndex from "@/components/legal/LegalIndex";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Legal | ${SITE.name}`,
  description:
    "Privacy, terms, cookies, data storage, disclaimer, accessibility, and license for the portfolio website and mobile app.",
};

export default function LegalHubPage() {
  return <LegalIndex />;
}
