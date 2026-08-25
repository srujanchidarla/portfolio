import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalMetadata } from "@/lib/legal";

export const metadata: Metadata = getLegalMetadata("security");

export default function SecurityPage() {
  return <LegalDocument slug="security" />;
}
