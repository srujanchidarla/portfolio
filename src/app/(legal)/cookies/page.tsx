import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalMetadata } from "@/lib/legal";

export const metadata: Metadata = getLegalMetadata("cookies");

export default function CookiesPage() {
  return <LegalDocument slug="cookies" />;
}
