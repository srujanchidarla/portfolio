import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalMetadata } from "@/lib/legal";

export const metadata: Metadata = getLegalMetadata("accessibility");

export default function AccessibilityPage() {
  return <LegalDocument slug="accessibility" />;
}
