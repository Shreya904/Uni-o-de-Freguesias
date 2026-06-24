import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import InscricaoWizard from "@/components/balcao/InscricaoWizard";

export default function HidroginasticaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main>
        <InscricaoWizard active="hidroginastica" />
      </main>
      <Footer />
    </div>
  );
}