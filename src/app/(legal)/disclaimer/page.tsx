import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalMetadata } from "@/lib/legal";

export const metadata: Metadata = getLegalMetadata("disclaimer");

export default function DisclaimerPage() {
  return <LegalDocument slug="disclaimer" />;
}
