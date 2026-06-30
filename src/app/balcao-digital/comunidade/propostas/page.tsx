"use client";
import { useState } from "react";
import { ChevronDown, Plus, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";

const proposals = [
  {
    category: "Obras na cidade",
    date: "18 março, 2027",
    author: "Joaquim de Almeida",
    title: "Precisamos de um Aeroporto na Cidade",
    body: "Aveiro tem muito turismo e se tivéssemos um aeroporto como o de Lisboa, no lugar do Estádio Municipal íamos ser a maior centro cidade do centro!",
  },
  {
    category: "Obras na cidade",
    date: "18 março, 2027",
    author: "João Neves",
    title: "Voltem a abrir o Drinks antigo no sítio onde estava!",
    body: "Faz muita falta!",
  },
  {
    category: "Formação",
    date: "18 março, 2027",
    author: "João Neves",
    title: "A cidade precisa de arrumadores certificados",
    body: "Mais não digo...",
  },
];

const faqAnswer =
  "A pesquisa de documentos pode ser realizada através do centro de documentação da plataforma, onde se encontram disponíveis diferentes conteúdos administrativos, regulamentos, atas, formulários, editais e outros documentos relacionados com a atividade da Junta de Freguesia. O sistema permite uma navegação simples e organizada para facilitar o acesso à informação.";

function MainFaqs() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = ["Quero casar, o que devo fazer?", "Sinto-me só preciso de ajuda como fazer?"];
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-amber-50 dark:bg-black rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground dark:text-white"
          >
            {faq}
            <ChevronDown
              className={`w-4 h-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-amber-200 dark:border-white/20 dark:text-white/70">
              <p className="mt-3 mb-3">{faqAnswer}</p>
              <ul className="space-y-1 mb-3 text-xs">
                <li>
                  🔍 utilize a barra de pesquisa para procurar documentos por título, palavra-chave
                  ou assunto
                </li>
                <li>
                  📋 filtre os conteúdos por categoria, data, tipo de documento ou área temática
                </li>
                <li>
                  📄 consulte regulamentos, editais, atas, formulários e documentos administrativos
                  disponíveis online
                </li>
                <li>
                  🏛 explore documentos relacionados com iniciativas, projetos e processos
                  participativos da freguesia
                </li>
                <li>📥 descarregue documentos em diferentes formatos sempre que disponíveis</li>
                <li>
                  ⭐ utilize os destaques e documentos recentes para acompanhar novas publicações e
                  atualizações.
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-amber-200 dark:border-white/20 dark:text-white/70">
                <span>Atualizado a 29 abril, 2026</span>
                <span>Partilhar 🔗</span>
                <span>Esta informação foi útil? 👍 👎</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PropostasPage() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main className="container max-w-3xl mx-auto px-4 py-10">
        {!isFormOpen ? (
          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full bg-[#1C2E56] text-white rounded-lg py-4 text-lg font-semibold mb-8 flex items-center justify-center gap-2 hover:bg-[#1C2E56]/90 transition"
          >
            <Plus className="w-6 h-6" /> Criar proposta
          </button>
        ) : (
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-white/20 rounded-xl p-6 md:p-8 mb-12 shadow-sm">
            <div className="flex flex-col items-center mb-8">
              <button
                onClick={() => setIsFormOpen(false)}
                className="hover:bg-slate-100 dark:hover:bg-white/10 p-2 rounded-full transition-colors mb-2"
                aria-label="Fechar formulário"
              >
                <Plus className="w-8 h-8 font-bold text-[#1C2E56] dark:text-white" />
              </button>
              <h2 className="text-xl md:text-2xl font-bold text-[#1C2E56] dark:text-white text-center">
                Preencha os dados pessoais e faça a sua proposta
              </h2>
            </div>

            {/* Step 1: Personal Data */}
            <div className="mb-8">
              <h3 className="font-bold text-[#1C2E56] dark:text-white mb-6 text-lg">
                1 - Os seus dados pessoais
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1C2E56] dark:text-white mb-2">
                    Nome{" "}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      (Necessário)
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-400 dark:border-white/30 rounded-md p-2.5 bg-transparent focus:ring-2 focus:ring-[#1C2E56] dark:focus:ring-white outline-none dark:text-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1C2E56] dark:text-white mb-2">
                    Apelido{" "}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      (Necessário)
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-400 dark:border-white/30 rounded-md p-2.5 bg-transparent focus:ring-2 focus:ring-[#1C2E56] dark:focus:ring-white outline-none dark:text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1C2E56] dark:text-white mb-2">
                    Cartão de Cidadão{" "}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      (Necessário)
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-400 dark:border-white/30 rounded-md p-2.5 bg-transparent focus:ring-2 focus:ring-[#1C2E56] dark:focus:ring-white outline-none dark:text-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1C2E56] dark:text-white mb-2">
                    Freguesia{" "}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      (Necessário)
                    </span>
                  </label>
                  <select className="w-full border border-slate-400 dark:border-white/30 rounded-md p-2.5 bg-transparent focus:ring-2 focus:ring-[#1C2E56] dark:focus:ring-white outline-none text-[#1C2E56] dark:text-white appearance-none cursor-pointer transition-all">
                    <option value="" className="dark:bg-black">
                      - Selecione
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1C2E56] dark:text-white mb-2">
                    Email{" "}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      (Necessário)
                    </span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-slate-400 dark:border-white/30 rounded-md p-2.5 bg-transparent focus:ring-2 focus:ring-[#1C2E56] dark:focus:ring-white outline-none dark:text-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1C2E56] dark:text-white mb-2">
                    Telefone ou Telemóvel
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-slate-400 dark:border-white/30 rounded-md p-2.5 bg-transparent focus:ring-2 focus:ring-[#1C2E56] dark:focus:ring-white outline-none dark:text-white transition-all"
                  />
                </div>
              </div>
            </div>

            <hr className="border-t border-dashed border-slate-300 dark:border-white/20 my-8" />

            {/* Step 2: Proposal Data */}
            <div>
              <h3 className="font-bold text-[#1C2E56] dark:text-white mb-4 text-lg">
                2 - A sua proposta
              </h3>
              <p className="text-sm text-[#1C2E56] dark:text-white/80 mb-4 leading-relaxed">
                Apresente a sua proposta através do balcão digital, indicando a ideia, sugestão ou
                necessidade que pretende partilhar. A informação enviada será analisada pelos
                serviços da junta, podendo ser solicitado contacto posterior para esclarecimentos
                adicionais.
              </p>
              <textarea
                rows={5}
                className="w-full border border-slate-400 dark:border-white/30 rounded-md p-3 bg-transparent focus:ring-2 focus:ring-[#1C2E56] dark:focus:ring-white outline-none dark:text-white resize-y transition-all"
              ></textarea>
            </div>

            {/* Form Footer */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-8 gap-4">
              <p className="text-sm text-[#1C2E56] dark:text-white/80 max-w-md leading-relaxed">
                Agora só falta preencher os dados do objeto do requerimento.
                <br />
                Clique no botão ao lado para continuar.
              </p>
              <button className="flex items-center justify-center gap-2 border-2 border-[#BE1E2D] text-[#BE1E2D] dark:border-red-500 dark:text-red-500 px-6 py-2.5 rounded-md font-bold hover:bg-[#BE1E2D] hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors w-full md:w-auto whitespace-nowrap">
                Submeter <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-12">
          {proposals.map((p, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground mb-1">
                  {p.category} · {p.date} por {p.author}
                </p>
                <button onClick={() => setOpenCard(openCard === i ? null : i)}>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${openCard === i ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              <h3 className="font-bold text-foreground">{p.title}</h3>
              {openCard === i && <p className="text-sm text-muted-foreground mt-2">{p.body}</p>}
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground border-t pt-3">
                <span>Gostou desta ideia? 👍 👎</span>
                <span>Atualizado a 29 abril, 2026</span>
                <span>Partilhar 🔗</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-8">
          <p className="font-bold text-foreground mb-3">Outros assuntos populares</p>
          <MainFaqs />
        </div>
      </main>
      <Footer />
    </div>
  );
}
