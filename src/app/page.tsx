import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { profilePageJsonLd, serializeJsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePageJsonLd()) }}
      />
      <HomePage />
    </>
  );
}
