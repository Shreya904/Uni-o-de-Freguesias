"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  { id: "escudo", title: "Escudo" },
  { id: "bandeira", title: "Bandeira" },
  { id: "motivos", title: "Motivos" },
  {
    id: "dados-geograficos",
    title: "Dados Geográficos e Populacionais",
  },
];

export default function HeraldicaPage() {
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

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-7xl px-6 py-10 flex-grow w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
          {/* STICKY LEFT SIDEBAR */}
          <aside className="lg:sticky lg:top-10 lg:h-fit">
            <h1 className="mb-10 text-4xl font-bold text-[#1F315E]">Heráldica</h1>

            <nav className="space-y-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative block w-full pl-4 text-left text-sm transition-all duration-200 ${
                    activeSection === section.id
                      ? "font-bold text-[#1F315E]"
                      : "text-slate-500 hover:text-[#1F315E]"
                  }`}
                >
                  {activeSection === section.id && (
                    <span className="absolute left-0 top-0 h-full w-[2px] bg-[#1F315E]" />
                  )}

                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* CONTENT COLUMN */}
          <main className="max-w-4xl">
            {/* Escudo */}
            <section id="escudo" className="scroll-mt-36 mb-20">
              <h2 className="mb-4 text-3xl font-bold text-[#1F315E]">Escudo</h2>

              <p className="mb-10 text-[15px] leading-8 text-slate-700">
                De vermelho. Coroa mural de prata de quatro torres, por ser freguesia urbana, sede
                concelhia. Listel de prata, com a legenda a negro «União das Freguesias de Glória e
                Vera-Cruz».
              </p>

              <div className="flex justify-center">
                <img
                  src="/heraldica/escudo.png"
                  alt="Escudo"
                  className="w-full max-w-[280px] object-contain"
                />
              </div>
            </section>

            {/* Bandeira */}
            <section id="bandeira" className="scroll-mt-36 mb-20">
              <h2 className="mb-4 text-3xl font-bold text-[#1F315E]">Bandeira</h2>

              <p className="mb-10 text-[15px] leading-8 text-slate-700">
                Esquartelada de branco e vermelho e borlas de prata e vermelho. Haste e lança
                douradas.
              </p>

              <div className="flex justify-center">
                <img
                  src="/heraldica/bandeira.png"
                  alt="Bandeira"
                  className="w-full max-w-[420px] object-contain"
                />
              </div>
            </section>

            {/* Motivos */}
            <section id="motivos" className="scroll-mt-36 mb-20">
              <h2 className="mb-6 text-3xl font-bold text-[#1F315E]">Motivos</h2>

              <div className="space-y-8 text-[15px] leading-8 text-slate-700">
                <p>
                  <strong>Estrela</strong> — representando o elemento toponímico «Glória», e ainda a
                  arte do pescador que desde os tempos mais remotos utiliza os astros como forma de
                  orientação e previsão.
                </p>

                <p>
                  <strong>Cruz apontada de alvenaria e filetada</strong> — representando o elemento
                  toponímico «Vera-Cruz», assim como as antigas muralhas edificadas sobre o século
                  XV, em torno do núcleo urbano de Aveiro.
                </p>
              </div>
            </section>

            {/* Dados Geográficos e Populacionais (Matches image_279c3a.png styles) */}
            <section id="dados-geograficos" className="scroll-mt-36">
              <h2 className="text-[36px] font-extrabold text-[#1C2E56] mb-8 tracking-wide">
                Dados Geográficos e Populacionais
              </h2>

              <div className="mb-10 space-y-2 text-[20px] text-[#1C2E56] font-medium leading-relaxed">
                <p>
                  <strong className="font-extrabold">Área total:</strong> 45,32 km²
                </p>
                <p>
                  <strong className="font-extrabold">Habitantes (Censas 2011):</strong> 18.756
                </p>
                <p>
                  <strong className="font-extrabold">Habitantes (Censas 2021):</strong> 21.227
                </p>

                {/* Styled External Resource Link Block */}
                <div className="pt-8 flex flex-col gap-4 text-[18px]">
                  <a
                    href="http://smiga.cm-aveiro.pt/VGE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#1C2E56] underline underline-offset-4 decoration-1 font-medium hover:text-[#B4142F] transition-colors w-fit"
                  >
                    <FileText className="w-5 h-5 shrink-0" />
                    <span>Informação Geográfica (SMIGA)</span>
                  </a>

                  <a
                    href="https://censos.ine.pt/xportal/xmain?xpgid=censos21_populacao&xpid=CENSOS21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#1C2E56] underline underline-offset-4 decoration-1 font-medium hover:text-[#B4142F] transition-colors w-fit"
                  >
                    <FileText className="w-5 h-5 shrink-0" />
                    <span>Resultados Censos 2021</span>
                  </a>
                </div>
              </div>

              {/* Geographic Continuum Map Block */}
              <div className="overflow-hidden rounded-lg border border-slate-200 max-w-[900px] w-full">
                <img
                  src="/heraldica/mapa.png"
                  alt="Mapa Geográfico"
                  className="w-full object-cover"
                />
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
