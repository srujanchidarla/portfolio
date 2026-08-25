import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactProvider } from "@/components/ContactProvider";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContactProvider>
      <Navbar />
      <main id="main-content" className="site-main legal-page" tabIndex={-1}>
        <div className="wrap legal-page__wrap">{children}</div>
      </main>
      <Footer />
    </ContactProvider>
  );
}
