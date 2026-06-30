"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
        <div key={i} className="bg-amber-50 dark:bg-black rounded-lg overflow-hidden dark:border dark:border-white/20">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground dark:text-white"
          >
            {faq}
            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm text-muted-foreground dark:text-white/70 border-t border-amber-200 dark:border-white/20">
              <p className="mt-3 mb-3">{faqAnswer}</p>
              <ul className="space-y-1 mb-3 text-xs">
                <li>🔍 utilize a barra de pesquisa para procurar documentos por título, palavra-chave ou assunto</li>
                <li>📋 filtre os conteúdos por categoria, data, tipo de documento ou área temática</li>
                <li>📄 consulte regulamentos, editais, atas, formulários e documentos administrativos disponíveis online</li>
                <li>🏛 explore documentos relacionados com iniciativas, projetos e processos participativos da freguesia</li>
                <li>📥 descarregue documentos em diferentes formatos sempre que disponíveis</li>
                <li>⭐ utilize os destaques e documentos recentes para acompanhar novas publicações e atualizações.</li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-white/70 pt-2 border-t border-amber-200 dark:border-white/20">
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

  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main className="container max-w-3xl mx-auto px-4 py-10">
        <button className="w-full bg-[#1C2E56] text-white rounded-lg py-4 text-lg font-semibold mb-8 flex items-center justify-center gap-2 hover:bg-[#1C2E56]/90 transition">
          + Criar proposta
        </button>

        <div className="space-y-4 mb-12">
          {proposals.map((p, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground mb-1">
                  {p.category} · {p.date} por {p.author}
                </p>
                <button onClick={() => setOpenCard(openCard === i ? null : i)}>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openCard === i ? "rotate-180" : ""}`} />
                </button>
              </div>
              <h3 className="font-bold text-foreground">{p.title}</h3>
              {openCard === i && (
                <p className="text-sm text-muted-foreground mt-2">{p.body}</p>
              )}
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
