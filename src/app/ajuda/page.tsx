"use client";

import { useState } from "react";
import { ChevronDown, Search, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    title: "Problemas Técnicos",
    items: ["Carregamentos", "Mensagens de erro", "Mau funcionamento"],
  },
  {
    title: "Reclamações",
    items: ["Procedimento", "Boas práticas", "Resolução"],
  },
];

const faqTop = [
  "Como posso pesquisar documentos?",
  "O portal guarda o meu histórico de consultas?",
  "O que fazer se um ficheiro não abrir corretamente?",
];

const faqBottom = [
  "Quero casar, o que devo fazer?",
  "Sou imigrante e agora?",
  "Estou no processo de obter como fazer?",
];

export default function CentroAjudaPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqTop = faqTop.filter((faq) =>
    faq.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredFaqBottom = faqBottom.filter((faq) =>
    faq.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-[#F6F7F9]">
      <div className="bg-[#F0BE2A]">
        <Header />
        {/* HERO */}
        <section>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
          <div>
            <h1 className="text-5xl font-black text-[#1C2E56] leading-none">
              Centro de
              <br />
              Ajuda
            </h1>
          </div>

          <div className="flex-1">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="O que preciso saber"
                className="w-full h-14 rounded-md border-2 border-[#1C2E56] bg-white px-5 pr-12 outline-none text-lg font-semibold text-[#1C2E56] placeholder:text-[#1C2E56]/60"
              />

              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C2E56]" />
            </div>

            <div className="flex flex-wrap gap-5 mt-3 text-sm text-[#1C2E56]">
              <button>Termos Populares</button>
              <button>Casar</button>
              <button>Certidões</button>
              <button>Licenças</button>
            </div>
          </div>
        </div>
        </section>
      </div>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <aside className="bg-[#F2F2F2] border-r border-gray-200 min-h-[800px] p-6">
            <div className="space-y-8">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#1C2E56]">{section.title}</h3>

                    <ChevronDown className="w-4 h-4 text-[#1C2E56]" />
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <button
                        key={item}
                        className="block text-left text-sm text-[#1C2E56] hover:text-[#DE092D]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* News Card */}
              <div className="bg-[#DDE9F7] p-4 rounded-lg">
                <h4 className="font-bold text-[#1C2E56] mb-3">Notícias</h4>

                <p className="text-sm text-[#1C2E56]">
                  Nova secção de parceria entre o Município de Aveiro e instituições locais para
                  reforçar a atividade.
                </p>

                <button className="mt-3 text-sm font-semibold text-[#1C2E56]">Saber mais →</button>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <div className="p-6 lg:p-10">
            {/* FILTER BAR */}
            <div className="flex justify-end gap-3 mb-8">
              <button className="text-sm text-[#1C2E56]">Ordenar</button>

              <button className="px-3 py-1 rounded-full border border-gray-300 text-sm">
                Nome
              </button>
            </div>

            {/* TOP FAQ */}
            <div className="space-y-4">
              {filteredFaqTop.map((question) => (
                <div key={question} className="rounded-lg overflow-hidden border border-[#BFA55A]">
                  <button
                    onClick={() => setOpenFaq(openFaq === question ? null : question)}
                    className="w-full bg-[#EFE2B5] px-5 py-4 flex justify-between items-center text-left"
                  >
                    <span className="font-bold text-lg text-[#1C2E56]">{question}</span>

                    <ChevronDown className="w-5 h-5 text-[#1C2E56]" />
                  </button>

                  {openFaq === question && (
                    <div className="bg-[#EFE2B5] border-t border-[#BFA55A] px-5 py-4 text-[#1C2E56]">
                      Resposta de exemplo para esta pergunta.
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* FEATURE CARD */}
            <div className="relative mt-8 rounded-xl overflow-hidden">
              <img src="/help-banner.jpg" alt="" className="w-full h-[280px] object-cover" />

              <div className="absolute right-5 bottom-5 bg-[#1C2E56] text-white rounded-xl p-6 max-w-[280px]">
                <h3 className="font-bold text-xl mb-2">Procura um documento?</h3>

                <p className="text-sm opacity-90">Visite o Centro de Documentação</p>

                <button className="flex items-center gap-2 mt-4 text-[#F0BE2A] font-semibold">
                  Ver documentos
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* OTHER TOPICS */}
            <div className="mt-10">
              <h2 className="font-bold text-[#1C2E56] mb-5">Outros assuntos populares</h2>

              <div className="space-y-4">
                {filteredFaqBottom.map((question) => (
                  <div
                    key={question}
                    className="rounded-lg overflow-hidden border border-[#BFA55A]"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === question ? null : question)}
                      className="w-full bg-[#EFE2B5] px-5 py-4 flex justify-between items-center text-left"
                    >
                      <span className="font-bold text-lg text-[#1C2E56]">{question}</span>

                      <ChevronDown className="w-5 h-5 text-[#1C2E56]" />
                    </button>

                    {openFaq === question && (
                      <div className="bg-[#EFE2B5] border-t border-[#BFA55A] px-5 py-4 text-[#1C2E56]">
                        Resposta de exemplo para esta pergunta.
                      </div>
                    )}
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
