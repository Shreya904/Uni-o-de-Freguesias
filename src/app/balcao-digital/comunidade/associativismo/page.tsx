import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";

export default function AssociativismoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main className="container max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
          Programa de Apoio ao Associativismo
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O Espaço de Cidadania foi criado para aproximar a comunidade da Junta de Freguesia através de uma plataforma digital acessível, participativa e orientada para as necessidades da população.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Através das diferentes áreas disponíveis, os cidadãos podem acompanhar iniciativas locais, comunicar situações relacionadas com o espaço público e contribuir com ideias e sugestões para a melhoria da freguesia.
        </p>
        <p className="font-semibold text-foreground mb-2">Objetivos do espaço de cidadania</p>
        <ul className="space-y-2 text-muted-foreground text-sm mb-6">
          <li>🤝 aproximar os cidadãos da junta de freguesia através de canais digitais acessíveis</li>
          <li>✅ incentivar a participação ativa da população</li>
          <li>🚩 permitir o reporte de incidências no espaço público</li>
          <li>🌱 promover iniciativas de participação pública e orçamento participativo</li>
          <li>🔵 facilitar o acesso a serviços, pedidos, inscrições e marcações digitais</li>
          <li>🔎 reforçar a transparência e a proximidade entre a junta e a comunidade</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          Através desta plataforma, os cidadãos podem submeter propostas, comunicar problemas no território e aceder a diferentes serviços disponibilizados pela Junta de Freguesia.
        </p>
      </main>
      <Footer />
    </div>
  );
}