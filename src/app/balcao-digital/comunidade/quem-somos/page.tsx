import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";

export default function QuemSomosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <section className="bg-[#1C2E56] text-white py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Vamos pensar a freguesia juntos
          </h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-lg">
            Partilhe ideias, reporte problemas no espaço público e contribua para uma freguesia mais próxima, participativa e ligada à comunidade.
          </p>
        </div>
      </section>
      <main className="container max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Objetivos do espaço de cidadania</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O Espaço de Cidadania foi criado para aproximar a comunidade da Junta de Freguesia através de uma plataforma digital acessível, participativa e orientada para as necessidades da população.
        </p>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4 mt-10">Acesso e participação</h2>
        <p className="text-muted-foreground leading-relaxed">
          O acesso ao Espaço de Cidadania é realizado através da plataforma digital da Junta de Freguesia, permitindo aos cidadãos utilizar diferentes funcionalidades de participação, comunicação e atendimento online.
        </p>
      </main>
      <Footer />
    </div>
  );
}