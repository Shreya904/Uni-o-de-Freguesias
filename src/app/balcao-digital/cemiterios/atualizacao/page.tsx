import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import CemiterioWizard from "@/components/balcao/CemiterioWizard";

export default function AtualizacaoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main>
        <CemiterioWizard active="atualizacao" />
      </main>
      <Footer />
    </div>
  );
}