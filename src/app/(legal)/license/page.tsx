import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalMetadata } from "@/lib/legal";

export const metadata: Metadata = getLegalMetadata("license");

export default function LicensePage() {
  return <LegalDocument slug="license" />;
}
