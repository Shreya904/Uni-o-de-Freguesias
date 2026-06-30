"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";

const faqAnswer =
  "A pesquisa de documentos pode ser realizada atraves do centro de documentacao da plataforma, onde se encontram disponiveis diferentes conteudos administrativos, regulamentos, atas, formularios, editais e outros documentos relacionados com a atividade da Junta de Freguesia.";

const mainFaqs = [
  { q: "Quero casar, o que devo fazer?" },
  { q: "Sinto-me so preciso de ajuda como fazer?" },
];

export default function CanideosPage() {
  const [openSidebar, setOpenSidebar] = useState<number | null>(null);
  const [openMain, setOpenMain] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <div className="balcao-shell">
        <aside className="balcao-sidebar">
          <p className="font-bold text-foreground dark:text-white mb-3">O que precisa?</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2">
              <input type="radio" checked readOnly className="accent-[#C41230]" />
              <span className="text-foreground font-medium dark:text-white">
                Licencas para canideos
              </span>
            </li>
          </ul>
          <p className="font-bold text-foreground mb-3 dark:text-white">Perguntas frequentes</p>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="border rounded-lg p-3 bg-amber-50 dark:bg-black dark:border-white/20 cursor-pointer"
                onClick={() => setOpenSidebar(openSidebar === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground dark:text-white">
                    O que fazer se um ficheiro nao abrir corretamente?
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 shrink-0 text-muted-foreground dark:text-white/70 transition-transform ${openSidebar === i ? "rotate-180" : ""}`}
                  />
                </div>
                {openSidebar === i && (
                  <p className="mt-2 text-xs text-muted-foreground dark:text-white/70">
                    Deve tentar novamente :)
                  </p>
                )}
              </div>
            ))}
          </div>
        </aside>

        <main className="balcao-main">
          <h1 className="text-foreground dark:text-white">Licencas para canideos</h1>
          <p className="mb-4 max-w-2xl text-muted-foreground dark:text-white/80">
            Para tratar do licenciamento do seu cao, devera dirigir-se presencialmente aos servicos
            da junta de freguesia.
          </p>
          <p className="mb-4 max-w-2xl text-muted-foreground dark:text-white/80">
            Este procedimento exige a apresentacao de documentacao obrigatoria, nomeadamente a
            identificacao do animal e do respetivo detentor, bem como os comprovativos legitimamente
            necessarios para a emissao ou renovacao da licenca.
          </p>
          <p className="mb-4 max-w-2xl text-muted-foreground dark:text-white/80">
            Os formularios/declaracoes/requerimentos e os regulamentos da Uniao das Freguesias de
            Gloria e Vera Cruz podem ser consultados em www.ufgloriaveracruz.pt.
          </p>
          <p className="mb-4 max-w-2xl text-muted-foreground dark:text-white/80">
            Para qualquer esclarecimento podera contactar os nossos servicos atraves do numero 234
            427 065
          </p>

          <h3 className="font-bold text-foreground dark:text-white mt-10 mb-4">
            Outros assuntos populares
          </h3>
          <div className="space-y-3">
            {mainFaqs.map((faq, i) => (
              <div key={i} className="bg-amber-50 dark:bg-black rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenMain(openMain === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground dark:text-white"
                >
                  <span className="text-foreground dark:text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-muted-foreground dark:text-white/70 transition-transform ${openMain === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openMain === i && (
                  <div className="px-4 pb-4 border-t border-amber-200 dark:border-white/20">
                    <p className="mt-3 mb-3 text-sm text-muted-foreground dark:text-white/80">
                      {faqAnswer}
                    </p>
                    <ul className="space-y-1 mb-3 text-xs text-muted-foreground dark:text-white/80">
                      <li>
                        utilize a barra de pesquisa para procurar documentos por titulo,
                        palavra-chave ou assunto
                      </li>
                      <li>
                        filtre os conteudos por categoria, data, tipo de documento ou area tematica
                      </li>
                      <li>
                        consulte regulamentos, editais, atas, formularios e documentos
                        administrativos disponiveis online
                      </li>
                      <li>
                        explore documentos relacionados com iniciativas, projetos e processos
                        participativos da freguesia
                      </li>
                      <li>descarregue documentos em diferentes formatos sempre que disponiveis</li>
                      <li>
                        utilize os destaques e documentos recentes para acompanhar novas publicacoes
                        e atualizacoes.
                      </li>
                    </ul>
                    <div className="flex items-center gap-4 text-xs pt-2 border-t border-amber-200 dark:border-white/20">
                      <span className="text-muted-foreground dark:text-white/70">
                        Atualizado a 29 abril, 2026
                      </span>
                      <span className="text-muted-foreground dark:text-white/70">Partilhar</span>
                      <span className="text-muted-foreground dark:text-white/70">
                        Esta informacao foi util?
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
