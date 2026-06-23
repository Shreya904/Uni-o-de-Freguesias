"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

interface MegaMenuSection {
  heading: string;
  links: {
    label: string;
    href: string;
  }[];
}

interface NavItem {
  label: string;
  href?: string;
  megaMenu?: MegaMenuSection[];
}

const navItems: NavItem[] = [
  {
    label: "Começar",
    href: "/",
  },

  {
    label: "Organismo",
    megaMenu: [
      {
        heading: "Conhecer a Junta",
        links: [
          { label: "Presidência", href: "/institucional/presidente" },
          { label: "Executivo", href: "/institucional/orgaos" },
          { label: "Assembleia", href: "/institucional/orgaos" },
        ],
      },

      {
        heading: "Atividades da Junta",
        links: [
          {
            label: "Reuniões de Executivo",
            href: "/institucional/orgaos",
          },
          {
            label: "Reuniões de Assembleia",
            href: "/institucional/orgaos",
          },
          {
            label: "Editais",
            href: "/institucional/documentacao",
          },
        ],
      },

      {
        heading: "Transparência da Junta",
        links: [
          {
            label: "Financeiro",
            href: "/institucional/financeira",
          },
          {
            label: "Documentação",
            href: "/institucional/documentacao",
          },
          {
            label: "Normas e Planeamento",
            href: "/institucional/documentacao",
          },
        ],
      },

      {
        heading: "Links rápidos",
        links: [
          {
            label: "Inscrição em passeios",
            href: "/servicos",
          },
          {
            label: "Pedir licença de obra",
            href: "/servicos",
          },
          {
            label: "Marcar atendimento",
            href: "/agendar",
          },
        ],
      },
    ],
  },

  {
    label: "Freguesia",
    megaMenu: [
      {
        heading: "Conhecer a Freguesia",
        links: [
          {
            label: "História",
            href: "/freguesia",
          },
          {
            label: "Heráldica",
            href: "/freguesia",
          },
          {
            label: "A visitar",
            href: "/freguesia/espacos",
          },
        ],
      },

      {
        heading: "Viver a Freguesia",
        links: [
          {
            label: "Contactos úteis",
            href: "/contactos-uteis",
          },
        ],
      },

      {
        heading: "Links rápidos",
        links: [
          {
            label: "Inscrição em passeios",
            href: "/servicos",
          },
          {
            label: "Pedir licença de obra",
            href: "/servicos",
          },
          {
            label: "Marcar atendimento",
            href: "/agendar",
          },
        ],
      },
    ],
  },

  {
    label: "Notícias",
    href: "/noticias",
  },

  {
    label: "Agenda",
    href: "/eventos",
  },

  {
    label: "Contactos",
    href: "/contactos",
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Cleanup timeout on unmount
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
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const isActive = (item: NavItem): boolean => {
    if (item.href) return pathname === item.href;

    return (
      item.megaMenu?.some((section) =>
        section.links.some((link) => pathname.startsWith(link.href)),
      ) ?? false
    );
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent px-4 lg:px-12 py-6">
      <nav
        ref={dropdownRef}
        className="relative bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] max-w-[1600px] mx-auto"
      >
        <div className="h-[96px] px-8 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/header logo1.png"
                alt="Logo"
                width={170}
                height={70}
                className="object-contain"
                priority
              />
            </Link>

            <div className="hidden lg:block h-8 w-px bg-gray-300" />
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {navItems.map((item) =>
              item.megaMenu ? (
                <div
                  key={item.label}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 text-[18px] text-[#1C2E56] transition ${
                      isActive(item) || openDropdown === item.label
                        ? "font-bold"
                        : "font-medium hover:underline hover:underline-offset-4"
                    }`}
                  >
                    {item.label}

                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+16px)] pt-4 w-[1100px] max-w-[calc(100vw-96px)] z-50">
                      <div className="bg-white border-t-2 border-[#DE092D] rounded-b-2xl shadow-[0px_8px_24px_rgba(0,0,0,0.12)] overflow-hidden">
                        <div className="flex p-8 gap-10">
                          {item.megaMenu.map((section) => (
                            <div key={section.heading} className="flex-1 min-w-[220px]">
                              <h3 className="font-extrabold text-[#1C2E56] text-lg mb-4">
                                {section.heading}
                              </h3>

                              <div className="flex flex-col gap-3">
                                {section.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`group flex items-center gap-2 transition ${
                                      pathname === link.href
                                        ? "text-[#DE092D] font-semibold"
                                        : "text-[#1C2E56] hover:text-[#DE092D]"
                                    }`}
                                  >
                                    <span className="font-bold transition-transform group-hover:translate-x-1">
                                      &gt;
                                    </span>

                                    <span>{link.label}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`text-[18px] text-[#1C2E56] transition ${
                    pathname === item.href
                      ? "font-bold"
                      : "font-medium hover:underline hover:underline-offset-4"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}

            <div className="h-8 w-px bg-gray-300" />

            <Link
              href="/servicos"
              className="h-[50px] px-5 rounded-lg border-2 border-[#DE092D] text-[#DE092D] font-extrabold text-[18px] flex items-center justify-center hover:bg-[#DE092D]/5 transition"
            >
              Balcão Digital
            </Link>

            <Link
              href="/ajuda"
              className="text-[#1C2E56] text-[18px] font-medium hover:underline hover:underline-offset-4 transition"
            >
              Ajuda
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-4 space-y-2">
            {navItems.map((item) =>
              item.megaMenu ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    className={`flex items-center justify-between w-full py-3 text-[#1C2E56] transition ${
                      isActive(item) || mobileExpanded === item.label
                        ? "font-bold"
                        : "font-medium hover:underline hover:underline-offset-4"
                    }`}
                  >
                    {item.label}

                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileExpanded === item.label && (
                    <div className="ml-4 border-l pl-4 space-y-4 pb-3">
                      {item.megaMenu.map((section) => (
                        <div key={section.heading}>
                          <h4 className="font-bold text-[#1C2E56] mb-2">{section.heading}</h4>

                          <div className="space-y-2">
                            {section.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-2 text-[#1C2E56]"
                              >
                                <span>&gt;</span>
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`block py-3 text-[#1C2E56] transition ${
                    pathname === item.href
                      ? "font-bold"
                      : "font-medium hover:underline hover:underline-offset-4"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}

            <Link
              href="/servicos"
              className="mt-3 flex justify-center rounded-lg border-2 border-[#DE092D] py-3 text-[#DE092D] font-bold"
            >
              Balcão Digital
            </Link>

            <Link href="/ajuda" className="block py-3 text-[#1C2E56] font-medium">
              Ajuda
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
