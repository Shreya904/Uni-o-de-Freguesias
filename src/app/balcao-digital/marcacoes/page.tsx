import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import MarcacaoWizard from "@/components/balcao/MarcacaoWizard";

export default function MarcacoesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main>
        <MarcacaoWizard />
      </main>
      <Footer />
    </div>
  );
}