import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";

export default function CanideosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />

      <div className="balcao-shell">
        <aside className="balcao-sidebar">
          <p className="font-bold text-foreground mb-3">O que precisa?</p>

          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <input type="radio" checked readOnly />
              <span>Licenças para canídeos</span>
            </li>
          </ul>

          <p className="font-bold mt-8 mb-3">Perguntas frequentes</p>

          <details className="border rounded-lg p-3 bg-amber-50">
            <summary>O que fazer se um ficheiro não abrir corretamente?</summary>
          </details>

          <details className="border rounded-lg p-3 bg-amber-50 mt-3">
            <summary>O que fazer se um ficheiro não abrir corretamente?</summary>
          </details>

          <details className="border rounded-lg p-3 bg-amber-50 mt-3">
            <summary>O que fazer se um ficheiro não abrir corretamente?</summary>
          </details>
        </aside>

        <main className="balcao-main">
          <h1>
            Licenças para canídeos
          </h1>

          <p className="mb-4 max-w-2xl">
            Para tratar do licenciamento do seu cão, deverá dirigir-se
            presencialmente aos serviços da junta de freguesia.
          </p>

          <p className="mb-4 max-w-2xl">
            Este procedimento exige a apresentação de documentação
            obrigatória, nomeadamente a identificação do animal e do
            respetivo detentor.
          </p>

          <p className="mb-4 max-w-2xl">
            Antes de se deslocar, recomendamos que confirme junto da
            junta quais os documentos necessários.
          </p>

          <h3 className="balcao-section-title mt-10 mb-4">
            Outros assuntos populares
          </h3>

          <details className="bg-amber-50 rounded-lg p-4 mb-3">
            <summary>Quero casar, o que devo fazer?</summary>
          </details>

          <details className="bg-amber-50 rounded-lg p-4">
            <summary>Sinto-me só preciso de ajuda como fazer?</summary>
          </details>
        </main>
      </div>

      <Footer />
    </div>
  );
}
