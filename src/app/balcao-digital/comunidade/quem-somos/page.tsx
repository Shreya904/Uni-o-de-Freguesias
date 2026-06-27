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
    ? "text-[#1C2E56] font-medium"
    : "text-muted-foreground hover:text-foreground transition";
  return React.createElement("a", { href: link.href, onClick, className: cls }, link.label);
}

function SidebarFaq() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-lg p-3 bg-amber-50 cursor-pointer text-xs text-muted-foreground"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <span>O que fazer se um ficheiro não abrir corretamente?</span>
        <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <p className="mt-2">Deve tentar novamente :)</p>}
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
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />

      <section className="bg-[#1C2E56] text-white">
        <div className="container max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight">
              Vamos pensar a freguesia juntos
            </h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Partilhe ideias, reporte problemas no espaço público e contribua para uma freguesia mais próxima, participativa e ligada à comunidade.
            </p>
          </div>
          <div className="hidden md:block rounded-lg overflow-hidden h-44">
            <img
              src="/images/comunidade-hero.jpg"
              alt="Comunidade a conversar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <main className="container max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-[260px_1fr] gap-10">
        <aside className="text-sm">
          <p className="font-bold text-foreground leading-snug">Regulamento</p>
          <p className="font-bold text-foreground mb-3 leading-snug">da plataforma</p>
          <p className="font-bold text-foreground mb-3 leading-snug">Balcão Digital Comunidade</p>
          <ul className="space-y-2 mb-8">
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
          <p className="font-bold text-foreground mb-3">Perguntas frequentes</p>
          <SidebarFaq />
        </aside>

        <div>
          <h2 id="objetivos" className="font-display text-2xl font-bold text-foreground mb-4">Objetivos do espaço de cidadania</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            O Espaço de Cidadania foi criado para aproximar a comunidade da Junta de Freguesia através de uma plataforma digital acessível, participativa e orientada para as necessidades da população. Este espaço permite aos cidadãos interagir com os serviços da junta, apresentar propostas, reportar incidências, submeter reclamações e participar em iniciativas de envolvimento cívico, incluindo processos de orçamento participativo.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Através das diferentes áreas disponíveis, os cidadãos podem acompanhar iniciativas locais, comunicar situações relacionadas com o espaço público e contribuir com ideias e sugestões para a melhoria da freguesia. O objetivo passa por promover uma relação mais próxima, transparente e colaborativa entre a junta e a comunidade.
          </p>
          <p className="font-semibold text-foreground mb-2">Objetivos do espaço de cidadania</p>
          <ul className="space-y-2 text-muted-foreground text-sm mb-8">
            <li>🤝 aproximar os cidadãos da junta de freguesia através de canais digitais acessíveis e próximos da comunidade</li>
            <li>✅ incentivar a participação ativa da população na identificação de necessidades e oportunidades de melhoria</li>
            <li>📣 permitir o reporte de incidências e ocorrências no espaço público de forma simples e organizada</li>
            <li>🌱 promover iniciativas de participação pública e orçamento participativo</li>
            <li>🔵 facilitar o acesso a serviços, pedidos, inscrições, reclamações ou denúncias dos cidadãos por diferentes serviços competentes da Junta</li>
            <li>🔎 reforçar a transparência e a proximidade entre a junta e a comunidade</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Através desta plataforma, os cidadãos podem submeter propostas, comunicar problemas no território, aceder a diferentes serviços disponibilizados pela Junta de Freguesia. O objetivo é criar um espaço mais acessível, funcional e orientado para as necessidades reais da população.
          </p>

          <h2 id="participacao" className="font-display text-2xl font-bold text-foreground mb-4">Acesso e participação</h2>
          <p className="text-muted-foreground leading-relaxed">
            O acesso ao Espaço de Cidadania é realizado através da plataforma digital da Junta de Freguesia, permitindo aos cidadãos utilizar diferentes funcionalidades de participação, comunicação e atendimento online. A submissão de pedidos, propostas, incidências, reclamações ou sugestões pode requerer o preenchimento de formulários específicos para análise e acompanhamento pelos serviços competentes da Junta.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}