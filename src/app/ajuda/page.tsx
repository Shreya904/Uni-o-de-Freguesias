"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, ArrowDownUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsHighlightBox from "@/components/NewsHighlightBox";

const sidebarSections = [
  {
    title: "Começar",
    items: ["Utilizar o site", "Pesquisa de documentos", "Contactar"],
  },
  {
    title: "Pedidos",
    items: ["Submissão", "Envio de documentos", "Pagamentos"],
  },
  {
    title: "Problemas técnicos",
    items: ["Carregamentos", "Mensagens de erro", "Mau funcionamento"],
  },
  {
    title: "Reclamações",
    items: ["Procedimento", "Boas práticas", "Resolução"],
  },
];

// Default answer stored in a variable for easy reuse
const defaultAnswer = (
  <div className="bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-white/10 px-6 py-6 text-[#1C2E56] dark:text-gray-300 text-[15px] leading-relaxed">
    <p className="mb-5">
      A pesquisa de documentos pode ser realizada através do centro de documentação da plataforma,
      onde se encontram disponíveis diferentes conteúdos administrativos, regulamentos, atas,
      formulários, editais e outros documentos relacionados com a atividade da Junta de Freguesia. O
      sistema permite uma navegação simples e organizada para facilitar o acesso à informação.
    </p>
    <ul className="space-y-3 mb-5">
      <li className="flex gap-3">
        <span>🔎</span>
        <span>
          utilize a barra de pesquisa para procurar documentos por título, palavra-chave ou assunto
        </span>
      </li>
      <li className="flex gap-3">
        <span>🗂️</span>
        <span>filtre os conteúdos por categoria, data, tipo de documento ou área temática</span>
      </li>
      <li className="flex gap-3">
        <span>📄</span>
        <span>
          consulte regulamentos, editais, atas, formulários e documentos administrativos disponíveis
          online
        </span>
      </li>
      <li className="flex gap-3">
        <span>🏛️</span>
        <span>
          explore documentos relacionados com iniciativas, projetos e processos participativos da
          freguesia
        </span>
      </li>
      <li className="flex gap-3">
        <span>⬇️</span>
        <span>descarregue documentos em diferentes formatos sempre que disponíveis</span>
      </li>
      <li className="flex gap-3">
        <span>⭐</span>
        <span>
          utilize os destaques e documentos recentes para acompanhar novas publicações e
          atualizações.
        </span>
      </li>
    </ul>
    <p>
      Caso não encontre o documento pretendido, poderá entrar em contacto com os serviços da Junta
      de Freguesia através dos canais de atendimento disponíveis na plataforma. Algumas informações
      ou documentos específicos poderão requerer validação adicional ou pedido direto aos serviços
      competentes.
    </p>
  </div>
);

// Array objects for FAQs, allowing easy content swapping
const faqTop = [
  {
    id: "top-1",
    question: "Como posso pesquisar documentos?",
    answer: defaultAnswer,
  },
  {
    id: "top-2",
    question: "O portal guarda o meu histórico de consultas?",
    answer: defaultAnswer,
  },
  {
    id: "top-3",
    question: "O que fazer se um ficheiro não abrir corretamente?",
    answer: defaultAnswer,
  },
];

const faqBottom = [
  {
    id: "bottom-1",
    question: "Quero casar, o que devo fazer?",
    answer: defaultAnswer,
  },
  {
    id: "bottom-2",
    question: "Sinto-me só preciso de ajuda como fazer?",
    answer: defaultAnswer,
  },
  {
    id: "bottom-3",
    question: "Sou imigrante e agora?",
    answer: defaultAnswer,
  },
];

export default function CentroAjudaPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  // Filter FAQs based on search
  const filteredFaqTop = faqTop.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredFaqBottom = faqBottom.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort FAQs based on the current order (A-Z or Z-A)
  const sortedFaqTop = [...filteredFaqTop].sort((a, b) =>
    isAscending ? a.question.localeCompare(b.question) : b.question.localeCompare(a.question),
  );

  const sortedFaqBottom = [...filteredFaqBottom].sort((a, b) =>
    isAscending ? a.question.localeCompare(b.question) : b.question.localeCompare(a.question),
  );

  const toggleSort = () => setIsAscending(!isAscending);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] font-sans flex flex-col transition-colors">
      <div className="bg-[#F8C127] dark:bg-[#F8C127]">
        <Header />

        {/* HERO SECTION */}
        <section className="bg-[#F8C127] dark:bg-[#F8C127]">
          <div className="max-w-[1300px] mx-auto px-6 py-10 lg:py-14 flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
            <div className="lg:w-1/3">
              <h1 className="text-4xl lg:text-[52px] font-extrabold text-[#111f3d] leading-[1.05] tracking-tight">
                Centro de
                <br />
                Ajuda
              </h1>
            </div>

            <div className="flex-1 w-full lg:mt-2">
              <div className="relative">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="O que preciso saber"
                  className="w-full h-[52px] rounded-lg border border-[#111f3d] bg-[#FDF9F0] px-5 pr-12 outline-none text-[16px] text-[#111f3d] placeholder:text-[#111f3d] focus:ring-2 focus:ring-[#111f3d]/20 transition-all"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-[#111f3d] stroke-[2]" />
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[13px] text-[#111f3d]">
                <span className="font-bold text-[14px]">Termos Populares</span>
                <button className="hover:underline hover:underline-offset-2 transition-all">
                  Cookies
                </button>
                <button className="hover:underline hover:underline-offset-2 transition-all">
                  Condições
                </button>
                <button className="hover:underline hover:underline-offset-2 transition-all">
                  Legislação
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MAIN CONTENT */}
      <section className="flex-1 w-full max-w-[1300px] mx-auto">
        <div className="grid lg:grid-cols-[280px_1fr] gap-x-12">
          {/* SIDEBAR */}
          <aside className="py-10 px-6 lg:px-0">
            <div className="space-y-6">
              {sidebarSections.map((section, idx) => (
                <div
                  key={section.title}
                  className={idx !== 0 ? "pt-6 border-t border-gray-200 dark:border-white/10" : ""}
                >
                  <div className="flex items-center justify-between mb-5 cursor-pointer">
                    <h3 className="font-bold text-[#111f3d] dark:text-white text-[16px]">
                      {section.title}
                    </h3>
                    <ChevronUp className="w-5 h-5 text-[#111f3d] dark:text-white" />
                  </div>

                  <div className="space-y-4">
                    {section.items.map((item) => {
                      const isActive = item === "Pesquisa de documentos";
                      return (
                        <button
                          key={item}
                          className={`block text-left text-[15px] transition-colors ${
                            isActive
                              ? "text-[#C41230] dark:text-[#F8C127] font-semibold"
                              : "text-[#111f3d] hover:text-[#C41230] dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-gray-200 dark:border-white/10">
                <NewsHighlightBox variant="help" />
              </div>
            </div>
          </aside>

          {/* MAIN COLUMN */}
          <div className="py-10 px-6 lg:px-0 lg:pl-4">
            {/* FILTER BAR */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <span className="text-[14px] text-[#111f3d] dark:text-white/80">Ordenar</span>
              <button
                onClick={toggleSort}
                className="px-4 py-1.5 rounded-full border border-[#111f3d]/30 text-[13px] text-[#111f3d] font-medium bg-white hover:bg-gray-50 transition-colors dark:bg-transparent dark:border-white/30 dark:text-white dark:hover:bg-white/10"
              >
                Nome
              </button>
              <button
                onClick={toggleSort}
                className="text-[#111f3d] dark:text-white hover:opacity-70 transition-transform"
              >
                <ArrowDownUp
                  className={`w-5 h-5 stroke-[1.5] transition-transform ${isAscending ? "" : "rotate-180"}`}
                />
              </button>
            </div>

            {/* TOP FAQ */}
            <div className="space-y-4">
              {sortedFaqTop.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-lg overflow-hidden border border-[#111f3d] dark:border-white/15 shadow-sm transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className={`w-full transition-colors px-6 py-4 flex justify-between items-center text-left ${
                      openFaq === faq.id
                        ? "bg-white dark:bg-[#111111]"
                        : "bg-[#FCEFB4] hover:bg-[#fae899] dark:bg-white/5 dark:hover:bg-white/10"
                    }`}
                  >
                    <span className="font-bold text-[16px] text-[#111f3d] dark:text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#111f3d] dark:text-white/70 flex-shrink-0 transition-transform ${
                        openFaq === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === faq.id && faq.answer}
                </div>
              ))}
            </div>

            {/* FEATURE BANNER */}
            <div className="relative mt-8 rounded-xl overflow-hidden shadow-sm h-[320px]">
              <img
                src="/help-banner.jpg"
                alt="Procura um documento?"
                className="w-full h-full object-cover dark:opacity-90"
              />

              <div className="absolute right-6 bottom-6 bg-[#1C2E56] dark:bg-[#1C2E56]/90 dark:backdrop-blur-sm text-white rounded-xl p-6 lg:p-7 max-w-[340px] shadow-lg">
                <h3 className="font-bold text-[22px] leading-tight mb-2">Procura um documento?</h3>
                <p className="text-[15px]">
                  Visite o{" "}
                  <a
                    href="#"
                    className="font-bold underline underline-offset-4 decoration-2 hover:text-[#F8C127] transition-colors"
                  >
                    Centro de Documentação
                  </a>
                </p>
              </div>
            </div>

            {/* OTHER TOPICS */}
            <div className="mt-12 mb-20">
              <h2 className="font-extrabold text-[22px] text-[#111f3d] dark:text-white mb-6">
                Outros assuntos populares
              </h2>
              <div className="space-y-4">
                {sortedFaqBottom.map((faq) => (
                  <div
                    key={faq.id}
                    className="rounded-lg overflow-hidden border border-[#111f3d] dark:border-white/15 shadow-sm transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className={`w-full transition-colors px-6 py-4 flex justify-between items-center text-left ${
                        openFaq === faq.id
                          ? "bg-white dark:bg-[#111111]"
                          : "bg-[#FCEFB4] hover:bg-[#fae899] dark:bg-white/5 dark:hover:bg-white/10"
                      }`}
                    >
                      <span className="font-bold text-[16px] text-[#111f3d] dark:text-white pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#111f3d] dark:text-white/70 flex-shrink-0 transition-transform ${
                          openFaq === faq.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === faq.id && faq.answer}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
