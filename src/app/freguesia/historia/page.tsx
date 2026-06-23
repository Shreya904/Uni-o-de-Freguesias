"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "aveiro-freguesias",
    title: "Aveiro e as suas Freguesias",
  },
  {
    id: "quatro-freguesias",
    title: "Quatro Freguesias",
  },
  {
    id: "duas-freguesias",
    title: "Duas Freguesias",
  },
  {
    id: "porque-vera-cruz",
    title: "Porquê Vera-Cruz?",
  },
];

export default function HistoriaPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* HEADER & SUB-HEADER WRAPPER */}
      <div className="relative w-full bg-[#1F315E]">
        {/* Header Layer */}
        <div className="relative z-50">
          <Header />
        </div>

        {/* Breadcrumb Layer */}
        <div className="relative z-10 py-6 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto flex items-center">
            <Link
              href="/freguesia"
              className="flex items-center gap-2 text-[16px] font-bold text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Freguesia
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 flex-grow">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-10 lg:h-fit">
            <h1 className="mb-10 text-4xl font-bold text-[#1F315E]">História</h1>

            <nav className="space-y-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block text-left text-sm transition-all duration-200 ${
                    activeSection === section.id
                      ? "font-semibold text-[#1F315E]"
                      : "text-slate-500 hover:text-[#1F315E]"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="max-w-4xl">
            <section id="aveiro-freguesias" className="scroll-mt-24 mb-16">
              <h2 className="mb-6 text-3xl font-bold text-[#1F315E]">
                Aveiro e as suas Freguesias
              </h2>

              <div className="space-y-6 text-[15px] leading-8 text-slate-700">
                <p>
                  Desde os tempos da Reconquista Cristã e da reorganização da Igreja no território
                  de entre os rios Douro e Mondego, o povoado de Aveiro constituía uma única
                  freguesia, cuja matriz era a igreja de S. Miguel. Construída certamente nos finais
                  do século XI por iniciativa de D. Sisnando, conde de Coimbra e vassalo de D.
                  Fernando Magno, rei de Leão, o primeiro edifício erguia-se num outeiro
                  relativamente elevado, onde talvez tenha existido uma fortificação e uma mesquita.
                </p>

                <p>
                  Sobranceiro ao mar, que por aí entrava e formava uma comprida baía com diversos
                  braços – entre os quais o que se prolongava até ao Marnel – o incipiente
                  «Alavário» era um lugar avançado da região conimbricense, voltado para o norte.
                  Nos seus arredores, já nos meados do século X, a Condessa Mumadona Dias possuía
                  terras e salinas, que por doação de 26 de Janeiro de 959, doara ao Mosteiro de
                  Guimarães.
                </p>

                <p>
                  A igreja de S. Miguel – dedicada a este Arcanjo que se tinha por defensor dos
                  cristãos contra as arremetidas do demónio e nas lutas contra os sarracenos –
                  merece uma referência especial. Era o mais antigo monumento de Aveiro,
                  reconstruído e ampliado diversas vezes ao longo dos séculos, uma das quais em 1420
                  por ordem do Infante D. Pedro. Embora de uma só nave, era grande e construída de
                  pedra e cal. Situava-se na actual Praça da República, onde hoje se ergue a estátua
                  de José Estêvão, sendo a porta principal voltada para poente e a capela-mor
                  ombreando a rua da Costeira.
                </p>
              </div>
            </section>

            <section id="quatro-freguesias" className="scroll-mt-24 mb-16">
              <h2 className="mb-6 text-3xl font-bold text-[#1F315E]">Quatro Freguesias</h2>

              <div className="space-y-6 text-[15px] leading-8 text-slate-700">
                <p>
                  No séc. XVI, a região de Aveiro continuava dentro dos limites da Diocese de
                  Coimbra. D. João Soares tratou logo de fazer uma visita às freguesias da sua
                  Diocese e mandou previamente que se fizesse o recenseamento da população de cada
                  uma. Por ele se achou que Aveiro, em 1572, tinha 11.365 pessoas de comunhão; o
                  bispo recurrentemente reconheceu ser excessiva tal população e determinou dividir
                  a então vila em quatro paróquias.
                </p>

                <p>
                  Por provisão de 10 de Junho de 1572, parcelou o território nas seguintes
                  freguesias: São Miguel, composta pela quase totalidade da vila muralhada e pelo
                  Bairro do Alboi; Espírito Santo, que agrupava os conventos de S. Domingos, de
                  Jesus e de Stº António e se estendia para sul; N.ª Senhora das Candeias ou da
                  Apresentação e Vera Cruz, ao norte do canal central da ria.
                </p>
              </div>
            </section>

            <section id="duas-freguesias" className="scroll-mt-24 mb-16">
              <h2 className="mb-6 text-3xl font-bold text-[#1F315E]">Duas Freguesias</h2>

              <div className="space-y-6 text-[15px] leading-8 text-slate-700">
                <p>
                  Em 18 de Julho de 1835, o Governo fez publicar um decreto fixando a divisão
                  distrital. Após a instituição do distrito de Aveiro, foram as quatro freguesias da
                  cidade reduzidas a duas, por alvará de 11 de Outubro de 1835. Constituir-se-ia, ao
                  norte do canal central da ria, a freguesia da Vera-Cruz e, ao sul, a de N.ª
                  Senhora da Glória.
                </p>
              </div>
            </section>

            <section id="porque-vera-cruz" className="scroll-mt-24">
              <h2 className="mb-6 text-3xl font-bold text-[#1F315E]">Porquê Vera-Cruz?</h2>

              <div className="space-y-6 text-[15px] leading-8 text-slate-700">
                <p>
                  O motivo essencial encontramo-lo na devoção dos cristãos, e particularmente do
                  povo português, à Paixão e Morte de Jesus Cristo, simbolizadas na Cruz. Três
                  razões possíveis:
                </p>

                <ul className="list-disc space-y-3 pl-6">
                  <li>Prolongamento sentimental da comunidade de Santa Cruz de Coimbra</li>
                  <li>Tradição das procissões da festa da «Invenção» da Santa Cruz</li>
                  <li>
                    Existência prévia de um templo com a invocação da Vera-Cruz no local,
                    documentada desde 1562
                  </li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
