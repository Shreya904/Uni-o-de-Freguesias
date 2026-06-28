"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

interface MegaMenuSection {
  heading: string;
  links: { label: string; href?: string }[];
}

interface NavItem {
  label: string;
  href?: string;
  megaMenu?: MegaMenuSection[];
}

const navItems: NavItem[] = [
  { label: "Começar", href: "/" },
  {
    label: "Organismo",
    href: "/institucional",
    megaMenu: [
      {
        heading: "Conhecer a Junta",
        links: [
          { label: "Presidência", href: "/institucional/presidente" },
          { label: "Executivo", href: "/institucional/orgaos" },
          { label: "Assembleia", href: "/institucional/assembleia" },
        ],
      },
      {
        heading: "Atividades da Junta",
        links: [
          { label: "Reuniões de Executivo", href: "/institucional/executivo" },
          { label: "Reuniões de Assembleia", href: "/institucional/reunioAssembleia" },
          { label: "Editais", href: "/institucional/editais" },
        ],
      },
      {
        heading: "Transparência da Junta",
        links: [
          { label: "Financeiro", href: "/institucional/financeira" },
          { label: "Documentação", href: "/institucional/documentacao" },
          { label: "Normas e Planeamento", href: "/institucional/normas" },
        ],
      },
      {
        heading: "Links rápidos",
        links: [
          { label: "Inscrição em passeios" },
          { label: "Pedir licença de obra" },
          { label: "Marcar atendimento", href: "/agendar" },
        ],
      },
    ],
  },
  {
    label: "Freguesia",
    href: "/freguesia",
    megaMenu: [
      {
        heading: "Conhecer a Freguesia",
        links: [
          { label: "História", href: "/freguesia/historia" },
          { label: "Heráldica", href: "/freguesia/heraldica" },
          { label: "A visitar", href: "/freguesia/espacos" },
        ],
      },
      {
        heading: "Viver a Freguesia",
        links: [{ label: "Contactos úteis", href: "/contactos-uteis" }],
      },
      {
        heading: "Links rápidos",
        links: [
          { label: "Inscrição em passeios" },
          { label: "Pedir licença de obra" },
          { label: "Marcar atendimento", href: "/agendar" },
        ],
      },
    ],
  },
  { label: "Notícias", href: "/noticias" },
  { label: "Agenda", href: "/eventos" },
  { label: "Contactos", href: "/contactos" },
];

const faqs = [
  {
    q: "Precisa de usar auriculares para ouvir as entrevistas?",
    a: "Não precisa! Mas se estiver num espaço público é capaz de não ser má ideia ;)",
  },
  {
    q: "Devo usar sempre desodorizante?",
    a: "Não precisa! Mas se estiver num espaço público é capaz de não ser má ideia ;)",
  },
  {
    q: "Devo sempre tirar o som ao meu telemóvel?",
    a: "Não precisa! Mas se estiver num espaço público é capaz de não ser má ideia ;)",
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [ajudaOpen, setAjudaOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(100);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isBalcaoDigital = pathname.startsWith("/balcao-digital");

  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setAjudaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setAjudaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (item: NavItem): boolean => {
    if (item.megaMenu?.some((s) => s.links.some((l) => l.href && pathname.startsWith(l.href)))) return true;
    if (item.href) return pathname === item.href || pathname.startsWith(`${item.href}/`);
    return false;
  };

  const AjudaPanel = () => (
    <div className="space-y-4">
      <div>
        <p className="font-bold text-[#1C2E56] mb-2">Acessibilidade</p>
        <div className="space-y-2">
          <button
            onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(document.body.innerText))}
            className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full text-sm text-left hover:bg-gray-50"
          >
            🔊 Ouvir o site
          </button>
          <button
            onClick={() => setFontSize((f) => Math.min(f + 10, 140))}
            className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full text-sm text-left hover:bg-gray-50"
          >
            T↑ Letra grande
          </button>
          <button
            onClick={() => { setDarkMode((d) => !d); }}
            className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full text-sm text-left hover:bg-gray-50"
          >
            {darkMode ? "☀️ Claro" : "🌙 Escuro"}
          </button>
        </div>
      </div>
      <div>
        <p className="font-bold text-[#1C2E56] mb-2">Informação útil</p>
        <div className="text-sm text-[#1C2E56] space-y-2">
          <p>⏰ Segunda a Sexta<br />09h00-13h00 14h00-17h00</p>
          <p>📍 Avenida Dr. Lourenço Peixinho, Edifício 18 - 1º B, 3800-164 Aveiro</p>
          <p>✉️ geral.fgloriavcruz@gmail.com</p>
          <p className="font-bold text-lg">📞 234 427 832</p>
        </div>
      </div>
      <Link href="/ajuda" className="block bg-[#F0BE2A] text-[#1C2E56] font-bold text-center rounded-lg px-4 py-3 hover:bg-[#F0BE2A]/90 transition">
        Abrir o Centro de Ajuda →
      </Link>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border rounded-lg text-sm cursor-pointer overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between px-3 py-3 text-left font-medium text-[#1C2E56]"
            >
              {faq.q}
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
            </button>
            {openFaq === i && (
              <div className="px-3 pb-3 text-[#1C2E56]/80">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <header className={`relative z-50 px-4 py-6 lg:px-12 ${isBalcaoDigital ? "bg-[#C41230]" : "bg-transparent"}`}>
      <nav ref={dropdownRef} className="relative bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] max-w-[1600px] mx-auto">
        <div className="h-[96px] px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image src="/header logo1.png" alt="Logo" width={170} height={70} className="object-contain" priority />
            </Link>
            <div className="hidden lg:block h-8 w-px bg-gray-300" />
          </div>

          <div className="hidden lg:flex items-center gap-8 h-full">
            {navItems.map((item) =>
              item.megaMenu ? (
                <div key={item.label} className="relative flex items-center h-full" onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                  {item.href ? (
                    <Link href={item.href} className={`flex items-center gap-1 text-[18px] text-[#1C2E56] transition ${isActive(item) || openDropdown === item.label ? "font-bold" : "font-medium hover:underline hover:underline-offset-4"}`}>
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                    </Link>
                  ) : (
                    <button className={`flex items-center gap-1 text-[18px] text-[#1C2E56] transition ${isActive(item) || openDropdown === item.label ? "font-bold" : "font-medium hover:underline hover:underline-offset-4"}`}>
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                  {openDropdown === item.label && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+16px)] pt-4 w-[1100px] max-w-[calc(100vw-96px)] z-50">
                      <div className="bg-white border-t-2 border-[#DE092D] rounded-b-2xl shadow-[0px_8px_24px_rgba(0,0,0,0.12)] overflow-hidden">
                        <div className="flex p-8 gap-10">
                          {item.megaMenu.map((section) => (
                            <div key={section.heading} className="flex-1 min-w-[220px]">
                              <h3 className="font-extrabold text-[#1C2E56] text-lg mb-4">{section.heading}</h3>
                              <div className="flex flex-col gap-3">
                                {section.links.map((link) =>
                                  link.href ? (
                                    <Link key={`${section.heading}-${link.label}`} href={link.href} className={`group flex items-center gap-2 transition ${pathname === link.href ? "font-bold text-[#DE092D]" : "text-[#1C2E56] hover:font-bold"}`}>
                                      <span className="font-bold transition-transform group-hover:translate-x-1">&gt;</span>
                                      <span>{link.label}</span>
                                    </Link>
                                  ) : (
                                    <span key={`${section.heading}-${link.label}`} className="flex items-center gap-2 text-[#1C2E56]/35 cursor-default font-medium" aria-disabled="true">
                                      <span className="font-bold">&gt;</span>
                                      <span>{link.label}</span>
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href!} className={`text-[18px] text-[#1C2E56] transition ${pathname === item.href ? "font-bold" : "font-medium hover:underline hover:underline-offset-4"}`}>
                  {item.label}
                </Link>
              )
            )}

            <div className="h-8 w-px bg-gray-300" />

            <Link href="/balcao-digital" className="h-[50px] px-5 rounded-lg border-2 border-[#DE092D] text-[#DE092D] font-extrabold text-[18px] flex items-center justify-center hover:bg-[#DE092D]/5 transition">
              Balcão Digital
            </Link>

            <div className="relative">
              <button onClick={() => setAjudaOpen(!ajudaOpen)} className="flex items-center gap-1 text-[#1C2E56] text-[18px] font-medium hover:underline hover:underline-offset-4 transition">
                Ajuda <ChevronDown className={`w-4 h-4 transition-transform ${ajudaOpen ? "rotate-180" : ""}`} />
              </button>
              {ajudaOpen && (
                <div className="absolute right-0 top-[calc(100%+16px)] w-72 bg-white rounded-xl shadow-xl border p-5 z-50 max-h-[80vh] overflow-y-auto">
                  <AjudaPanel />
                </div>
              )}
            </div>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-4 space-y-2">
            {navItems.map((item) =>
              item.megaMenu ? (
                <div key={item.label}>
                  <div className="flex items-center justify-between w-full text-[#1C2E56]">
                    {item.href ? (
                      <Link href={item.href} className={`flex-grow py-3 transition ${isActive(item) || mobileExpanded === item.label ? "font-bold" : "font-medium hover:underline hover:underline-offset-4"}`}>
                        {item.label}
                      </Link>
                    ) : (
                      <span className={`flex-grow py-3 transition ${isActive(item) || mobileExpanded === item.label ? "font-bold" : "font-medium"}`}>
                        {item.label}
                      </span>
                    )}
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)} className="p-3">
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  {mobileExpanded === item.label && (
                    <div className="ml-4 border-l pl-4 space-y-4 pb-3">
                      {item.megaMenu.map((section) => (
                        <div key={section.heading}>
                          <h4 className="font-bold text-[#1C2E56] mb-2">{section.heading}</h4>
                          <div className="space-y-2">
                            {section.links.map((link) =>
                              link.href ? (
                                <Link key={`${section.heading}-${link.label}`} href={link.href} className={`flex items-center gap-2 text-[#1C2E56] transition ${pathname === link.href ? "font-bold" : "font-medium hover:underline hover:underline-offset-4"}`}>
                                  <span className="font-bold">&gt;</span>
                                  <span>{link.label}</span>
                                </Link>
                              ) : (
                                <span key={`${section.heading}-${link.label}`} className="flex items-center gap-2 text-[#1C2E56]/35 cursor-default font-medium" aria-disabled="true">
                                  <span className="font-bold">&gt;</span>
                                  <span>{link.label}</span>
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href!} className={`block py-3 text-[#1C2E56] transition ${pathname === item.href ? "font-bold" : "font-medium hover:underline hover:underline-offset-4"}`}>
                  {item.label}
                </Link>
              )
            )}

            <Link href="/balcao-digital" className="mt-3 flex justify-center rounded-lg border-2 border-[#DE092D] py-3 text-[#DE092D] font-bold">
              Balcão Digital
            </Link>

            <div>
              <button onClick={() => setAjudaOpen(!ajudaOpen)} className="flex items-center justify-between w-full py-3 text-[#1C2E56] font-medium">
                Ajuda <ChevronDown className={`w-4 h-4 transition-transform ${ajudaOpen ? "rotate-180" : ""}`} />
              </button>
              {ajudaOpen && (
                <div className="ml-4 border-l pl-4 pb-3">
                  <AjudaPanel />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;