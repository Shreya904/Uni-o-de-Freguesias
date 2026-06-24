import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import AtestadoDetail from "@/components/balcao/AtestadoDetail";
import { sharedParagraphs, atestadoSidebar } from "@/components/balcao/atestadosData";

export default function OutrosAtestadosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main>
        <AtestadoDetail
          title="Outros atestados"
          sidebarItems={atestadoSidebar("/balcao-digital/atestados/outros")}
          paragraphs={sharedParagraphs(
            "Para solicitar um atestado deverá dirigir-se presencialmente aos serviços da junta de freguesia."
          )}
        />
      </main>
      <Footer />
    </div>
  );
}