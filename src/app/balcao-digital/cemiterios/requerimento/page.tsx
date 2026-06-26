import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import CemiterioWizard from "@/components/balcao/CemiterioWizard";

export default function RequerimentoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main>
        <CemiterioWizard active="requerimento" />
      </main>
      <Footer />
    </div>
  );
}