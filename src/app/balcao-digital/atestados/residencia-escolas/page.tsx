import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import AtestadoDetail from "@/components/balcao/AtestadoDetail";
import { sharedParagraphs, atestadoSidebar } from "@/components/balcao/atestadosData";

export default function ResidenciaEscolasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main>
        <AtestadoDetail
          title="Residência para escolas"
          sidebarItems={atestadoSidebar("/balcao-digital/atestados/residencia-escolas")}
          paragraphs={sharedParagraphs(
            "Para solicitar um atestado de residência deverá dirigir-se presencialmente aos serviços da junta de freguesia."
          )}
        />
      </main>
      <Footer />
    </div>
  );
}