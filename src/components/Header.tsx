"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { label: "Início", href: "/" },
  {
    label: "Freguesia",
    children: [
      {
        label: "Sobre a Freguesia",
        href: "/freguesia",
        description: "História, património e cultura local",
      },
      {
        label: "Espaços Públicos",
        href: "/freguesia/espacos",
        description: "Locais de interesse e equipamentos",
      },
      {
        label: "Galeria",
        href: "/freguesia/galeria",
        description: "Fotografias e vídeos da freguesia",
      },
      {
        label: "Estatísticas",
        href: "/freguesia/estatisticas",
        description: "Dados demográficos e territoriais",
      },
    ],
  },
  {
    label: "Institucional",
    children: [
      {
        label: "Mensagem do Presidente",
        href: "/institucional/presidente",
        description: "Palavra do Presidente da Junta",
      },
      {
        label: "Órgãos Autárquicos",
        href: "/institucional/orgaos",
        description: "Executivo, Assembleia e membros",
      },
      {
        label: "Documentação",
        href: "/institucional/documentacao",
        description: "Atas, editais e regulamentos",
      },
      {
        label: "Informação Financeira",
        href: "/institucional/financeira",
        description: "Orçamentos e relatórios",
      },
      {
        label: "Instituição",
        href: "/instituicao",
        description: "Estabelecimentos e equipamentos locais",
      },
    ],
  },
  {
    label: "Serviços",
    children: [
      {
        label: "Serviços Online",
        href: "/servicos",
        description: "Balcão digital e requerimentos",
      },
      // {
      //   label: "Reportar Ocorrência",
      //   href: "/mapa",
      //   description: "Mapa interativo para reportar problemas",
      // },
      // {
      //   label: "Agendar Atendimento",
      //   href: "/agendar",
      //   description: "Marcar reunião presencial",
      // },
      { label: "Centro de Ajuda", href: "/faq", description: "Perguntas frequentes e apoio" },
    ],
  },
  { label: "Notícias", href: "/noticias" },
  { label: "Eventos", href: "/eventos" },
  {
    label: "Contactos",
    children: [
      {
        label: "Formulário de Contacto",
        href: "/contactos",
        description: "Envie questões e pedidos aos serviços",
      },
      {
        label: "Contactos Úteis",
        href: "/contactos-uteis",
        description: "Números e emails de departamentos relevantes",
      },
    ],
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (item: NavItem): boolean => {
    if (item.href) return pathname === item.href;
    return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main navigation */}
      <nav
        className="bg-card/95 backdrop-blur-md border-b border-border/80 shadow-sm shadow-black/5"
        ref={dropdownRef}
      >
        <div className="container max-w-7xl mx-auto flex items-center justify-between py-3.5 md:py-4 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 shrink-0 min-w-0 pr-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-border/80 bg-card shadow-sm">
              <Image
                src="/ufgvc logo.png"
                alt="Logo da União das Freguesias"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-foreground text-[12px] sm:text-[13px] md:text-[14px] leading-tight block truncate">
                União das Freguesias de Glória e Vera-Cruz
              </span>
              <span className="font-display font-semibold text-foreground/80 text-[12px] sm:text-[13px] md:text-[14px] leading-tight block truncate">
                Aveiro
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item)
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div
                      className={`absolute top-full mt-1 w-72 bg-card rounded-xl border shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200 ${
                        item.label === "Contactos" ? "right-0" : "left-0"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 hover:bg-muted transition-colors"
                        >
                          <span className="text-sm font-medium text-foreground">{child.label}</span>
                          {child.description && (
                            <span className="block text-xs text-muted-foreground mt-0.5">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item)
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            {/*
            <Button size="sm" className="ml-3" asChild>
              <Link href="/agendar">Agendar</Link>
            </Button>
            */}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-card px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
                    aria-expanded={mobileExpanded === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-muted pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            {/*
            <Button className="w-full mt-3" size="sm" asChild>
              <Link href="/agendar" onClick={() => setMobileOpen(false)}>
                Agendar Atendimento
              </Link>
            </Button>
            */}
          </div>
        )}
      </nav>
      <div className="h-px bg-border/70" />
    </header>
  );
};

export default Header;
