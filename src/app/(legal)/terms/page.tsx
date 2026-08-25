import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalMetadata } from "@/lib/legal";

export const metadata: Metadata = getLegalMetadata("terms");

export default function TermsPage() {
  return <LegalDocument slug="terms" />;
}
