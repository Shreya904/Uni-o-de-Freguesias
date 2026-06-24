import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import AtestadoDetail from "@/components/balcao/AtestadoDetail";
import { sharedParagraphs, atestadoSidebar } from "@/components/balcao/atestadosData";

export default function ProvaDeVidaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main>
        <AtestadoDetail
          title="Prova de Vida"
          sidebarItems={atestadoSidebar("/balcao-digital/atestados")}
          paragraphs={sharedParagraphs(
            "Para solicitar uma prova de vida, deverá dirigir-se presencialmente aos serviços da junta de freguesia. Este procedimento permite confirmar que a pessoa se encontra viva e pode ser necessário para efeitos de pensão, processos administrativos, entidades bancárias, seguradoras ou outros organismos públicos e privados."
          )}
        />
      </main>
      <Footer />
    </div>
  );
}