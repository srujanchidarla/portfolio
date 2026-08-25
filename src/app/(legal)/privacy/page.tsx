import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalMetadata } from "@/lib/legal";

export const metadata: Metadata = getLegalMetadata("privacy");

export default function PrivacyPage() {
  return <LegalDocument slug="privacy" />;
}
