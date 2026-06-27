"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  active?: boolean;
}

const faqContent = [
  {
    question: "Quero casar, o que devo fazer?",
    answer: "A pesquisa de documentos pode ser realizada através do centro de documentação da plataforma, onde se encontram disponíveis diferentes conteúdos administrativos, regulamentos, atas, formulários, editais e outros documentos relacionados com a atividade da Junta de Freguesia. O sistema permite uma navegação simples e organizada para facilitar o acesso à informação.",
  },
  {
    question: "Sinto-me só preciso de ajuda como fazer?",
    answer: "A pesquisa de documentos pode ser realizada através do centro de documentação da plataforma, onde se encontram disponíveis diferentes conteúdos administrativos, regulamentos, atas, formulários, editais e outros documentos relacionados com a atividade da Junta de Freguesia. O sistema permite uma navegação simples e organizada para facilitar o acesso à informação.",
  },
];

const sidebarFaqContent = "Deve tentar novamente :)";

export default function AtestadoDetail({
  title,
  sidebarItems,
  paragraphs,
}: {
  title: string;
  sidebarItems: SidebarItem[];
  paragraphs: string[];
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openSidebarFaq, setOpenSidebarFaq] = useState<boolean>(false);

  return (
    <div className="balcao-shell">
      <aside className="balcao-sidebar">
        <p className="font-bold text-foreground mb-3">Qual é o atestado que precisa?</p>
        <ul className="space-y-3 text-muted-foreground mb-8">
          {sidebarItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <input type="radio" checked={item.active} readOnly className="accent-[#C41230]" />
              <Link href={item.href} className={item.active ? "text-foreground font-medium" : "hover:text-foreground transition"}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="font-bold text-foreground mb-3">Perguntas frequentes</p>
        <div
          className="border rounded-lg p-3 text-muted-foreground text-xs bg-amber-50 cursor-pointer"
          onClick={() => setOpenSidebarFaq(!openSidebarFaq)}
        >
          <div className="flex items-center justify-between">
            <span>O que fazer se um ficheiro não abrir corretamente?</span>
            <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${openSidebarFaq ? "rotate-180" : ""}`} />
          </div>
          {openSidebarFaq && (
            <p className="mt-2 text-muted-foreground">{sidebarFaqContent}</p>
          )}
        </div>
      </aside>

      <div className="balcao-main">
        <h1>{title}</h1>
        <div className="mb-10 space-y-4">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <p className="balcao-section-title mb-3">Outros assuntos populares</p>
        <div className="space-y-3">
          {faqContent.map((faq, i) => (
            <div key={i} className="bg-amber-50 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground"
              >
                {faq.question}
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-amber-200">
                  <p className="mt-3 mb-3">{faq.answer}</p>
                  <ul className="space-y-1 mb-3 text-xs">
                    <li>🔍 utilize a barra de pesquisa para procurar documentos por título, palavra-chave ou assunto</li>
                    <li>📋 filtre os conteúdos por categoria, data, tipo de documento ou área temática</li>
                    <li>📄 consulte regulamentos, editais, atas, formulários e documentos administrativos disponíveis online</li>
                    <li>🏛 explore documentos relacionados com iniciativas, projetos e processos participativos da freguesia</li>
                    <li>📥 descarregue documentos em diferentes formatos sempre que disponíveis</li>
                    <li>⭐ utilize os destaques e documentos recentes para acompanhar novas publicações e atualizações.</li>
                  </ul>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-amber-200">
                    <span>Atualizado a 29 abril, 2026</span>
                    <span>Partilhar 🔗</span>
                    <span>Esta informação foi útil? 👍 👎</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}