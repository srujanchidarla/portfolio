import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalMetadata } from "@/lib/legal";

export const metadata: Metadata = getLegalMetadata("data");

export default function DataPage() {
  return <LegalDocument slug="data" />;
}
