import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import DeclaracaoWizard from "@/components/balcao/DeclaracaoWizard";

export default function UniaoDeFactoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main>
        <DeclaracaoWizard active="uniao" />
      </main>
      <Footer />
    </div>
  );
}