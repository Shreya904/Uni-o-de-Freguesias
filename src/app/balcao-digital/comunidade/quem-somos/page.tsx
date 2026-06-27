"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";

const navLinks = [
  { id: "objetivos" as const, href: "#objetivos", label: "Objetivos" },
  { id: "participacao" as const, href: "#participacao", label: "Participação" },
];

function NavLink({
  link,
  active,
  onClick,
}: {
  link: { id: string; href: string; label: string };
  active: boolean;
  onClick: () => void;
}) {
  const cls = active
    ? "text-[#1C2E56] font-semibold text-sm"
    : "text-gray-500 hover:text-[#1C2E56] transition text-sm";
  return React.createElement("a", { href: link.href, onClick, className: cls }, link.label);
}

function SidebarFaq() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-amber-200 rounded-md p-4 bg-amber-100 cursor-pointer text-sm text-[#1C2E56] shadow-sm"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between font-medium gap-2">
        <span className="leading-snug">O que fazer se um ficheiro não abrir corretamente?</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform mt-0.5 ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && <p className="mt-2 text-xs text-gray-700">Deve tentar novamente :)</p>}
    </div>
  );
}

export default function QuemSomosPage() {
  const [activeSection, setActiveSection] = useState<"objetivos" | "participacao">("objetivos");

  useEffect(() => {
    const sections = ["objetivos", "participacao"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as "objetivos" | "participacao");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <BalcaoHeader />

      {/* Hero Section */}
      <section className="bg-[#1C2E56] text-white w-full">
        <div className="grid md:grid-cols-2 w-full max-w-[1400px] mx-auto">
          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Vamos pensar a freguesia juntos
            </h1>
            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md">
              Partilhe ideias, reporte problemas no espaço público e contribua para uma freguesia
              mais próxima, participativa e ligada à comunidade.
            </p>
          </div>
          <div className="hidden md:block h-64 md:h-auto w-full">
            <img
              src="/comunidade-hero.jpg"
              alt="Comunidade a conversar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-[320px] lg:w-[400px] bg-[#F9FAFB] p-8 md:p-12 lg:p-16 border-r border-gray-200">
          <h3 className="font-bold text-[#1C2E56] text-lg leading-snug mb-8">
            Regulamento <br />
            da plataforma <br />
            Balcão Digital Comunidade
          </h3>

          <ul className="space-y-4 mb-12">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  link={link}
                  active={activeSection === link.id}
                  onClick={() => setActiveSection(link.id)}
                />
              </li>
            ))}
          </ul>

          <h3 className="font-bold text-[#1C2E56] text-sm mb-4">Perguntas frequentes</h3>
          <SidebarFaq />
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 md:p-12 lg:p-16 lg:pl-20">
          <div className="max-w-3xl">
            <h2
              id="objetivos"
              className="font-display text-3xl md:text-4xl font-bold text-[#1C2E56] mb-6"
            >
              Objetivos do espaço de cidadania
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              O Espaço de Cidadania foi criado para aproximar a comunidade da Junta de Freguesia
              através de uma plataforma digital acessível, participativa e orientada para as
              necessidades da população. Este espaço permite aos cidadãos interagir com os serviços
              da junta, apresentar propostas, reportar incidências, submeter reclamações e
              participar em iniciativas de envolvimento cívico, incluindo processos de orçamento
              participativo.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              Através das diferentes áreas disponíveis, os cidadãos podem acompanhar iniciativas
              locais, comunicar situações relacionadas com o espaço público e contribuir com ideias
              e sugestões para a melhoria da freguesia. O objetivo passa por promover uma relação
              mais próxima, transparente e colaborativa entre a junta e a comunidade.
            </p>

            <p className="font-medium text-gray-800 text-sm md:text-base mb-4">
              Objetivos do espaço de cidadania:
            </p>
            <ul className="space-y-3 text-gray-600 text-sm md:text-base mb-8">
              <li className="flex items-start gap-2">
                <span className="shrink-0">🤝</span>
                <span>
                  aproximar os cidadãos da junta de freguesia através de canais digitais acessíveis
                  e próximos da comunidade
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">📝</span>
                <span>
                  incentivar a participação ativa da população na identificação de necessidades e
                  oportunidades de melhoria
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">📍</span>
                <span>
                  permitir o reporte de incidências e ocorrências no espaço público de forma simples
                  e organizada
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">🌳</span>
                <span>promover iniciativas de participação pública e orçamento participativo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">🏛️</span>
                <span>facilitar o acesso a serviços, pedidos, inscrições e marcações digitais</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">🔎</span>
                <span>reforçar a transparência e a proximidade entre a junta e a comunidade</span>
              </li>
            </ul>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-16">
              Através desta plataforma, os cidadãos podem submeter propostas, comunicar problemas no
              território, participar em iniciativas comunitárias e aceder a diferentes serviços
              disponibilizados pela Junta de Freguesia. O objetivo é criar um espaço mais acessível,
              funcional e orientado para as necessidades reais da população.
            </p>

            <h2
              id="participacao"
              className="font-display text-3xl md:text-4xl font-bold text-[#1C2E56] mb-6"
            >
              Acesso e participação
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
              O acesso ao Espaço de Cidadania é realizado através da plataforma digital da Junta de
              Freguesia, permitindo aos cidadãos utilizar diferentes funcionalidades de
              participação, comunicação e atendimento online. A submissão de pedidos, propostas,
              incidências, reclamações ou inscrições poderá requerer o preenchimento de formulários
              específicos e a disponibilização dos dados necessários para análise e acompanhamento
              pelos serviços competentes da junta.
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
