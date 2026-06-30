"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";

interface MegaMenuSection {
  heading: string;
  links: {
    label: string;
    href?: string;
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
          { label: "Financeiro" },
          { label: "Documentação", href: "/institucional/documentacao" },
          { label: "Normas e Planeamento", href: "/institucional/normas" },
        ],
      },
      {
        heading: "Links rápidos",
        links: [
          { label: "Inscrição em passeios", href: "/balcao-digital/inscricoes" },
          { label: "Pedir licença de obra", href: "/balcao-digital/cemiterios/licenca" },
          { label: "Marcar atendimento", href: "/balcao-digital/marcacoes" },
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
          { label: "Inscrição em passeios", href: "/balcao-digital/inscricoes" },
          { label: "Pedir licença de obra", href: "/balcao-digital/cemiterios/licenca" },
          { label: "Marcar atendimento", href: "/balcao-digital/marcacoes" },
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
  const isBalcaoDigital = pathname.startsWith("/balcao-digital");

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
  const openAjudaSidebar = () => {
    window.dispatchEvent(new CustomEvent("open-ajuda-sidebar"));
  };
  const isActive = (item: NavItem): boolean => {
    if (
      item.megaMenu?.some((section) =>
        section.links.some((link) => link.href && pathname.startsWith(link.href)),
      )
    ) {
      return true;
    }
    if (item.href) return pathname === item.href || pathname.startsWith(`${item.href}/`);
    return (
      item.megaMenu?.some((section) =>
        section.links.some((link) => link.href && pathname.startsWith(link.href)),
      ) ?? false
    );
  };

  const renderDesktopNavItem = (item: NavItem) => {
    if (item.megaMenu) {
      return (
        <div
          key={item.label}
          className="flex items-center h-full cursor-pointer"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={item.href || "#"}
            className={`text-[16px] text-[#1C2E56] transition-all ${
              isActive(item)
                ? "font-extrabold"
                : `font-medium hover:underline hover:decoration-[#1C2E56] hover:decoration-2 hover:underline-offset-8 ${
                    openDropdown === item.label
                      ? "underline decoration-[#1C2E56] decoration-2 underline-offset-8"
                      : ""
                  }`
            }`}
          >
            {item.label}
          </Link>

          {openDropdown === item.label && (
            <div className="absolute left-0 w-full top-[96px] z-50 px-8">
              <div className="bg-white border-t-2 border-[#DE092D] rounded-b-2xl shadow-[0px_12px_24px_rgba(0,0,0,0.12)] overflow-hidden">
                <div className="flex p-8 lg:p-10 gap-6 lg:gap-8 justify-between flex-wrap">
                  {item.megaMenu.map((section) => (
                    <div
                      key={section.heading}
                      className={`flex-1 min-w-[200px] ${
                        section.heading === "Links rápidos" ? "pl-8 border-l border-gray-200" : ""
                      }`}
                    >
                      <h3 className="font-bold text-[#1C2E56] text-[17px] mb-6">
                        {section.heading}
                      </h3>

                      <div className="flex flex-col gap-4">
                        {section.links.map((link) =>
                          link.href ? (
                            <Link
                              key={`${section.heading}-${link.label}`}
                              href={link.href}
                              className="group flex items-center gap-3 transition"
                            >
                              <ChevronRight
                                className={`w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-x-1 text-[#1C2E56]`}
                              />
                              <span
                                className={`text-[16px] transition-colors ${
                                  pathname === link.href
                                    ? "text-[#1C2E56] font-bold"
                                    : "text-[#1C2E56] font-medium group-hover:opacity-75"
                                }`}
                              >
                                {link.label}
                              </span>
                            </Link>
                          ) : (
                            <span
                              key={`${section.heading}-${link.label}`}
                              className="flex items-center gap-3 cursor-default"
                              aria-disabled="true"
                            >
                              <ChevronRight className="w-5 h-5 stroke-[2.5] text-gray-400" />
                              <span className="text-[16px] font-medium text-gray-400">
                                {link.label}
                              </span>
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href!}
        className={`text-[16px] text-[#1C2E56] transition-all ${
          isActive(item)
            ? "font-extrabold"
            : "font-medium hover:underline hover:decoration-[#1C2E56] hover:decoration-2 hover:underline-offset-8"
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header
      className={`relative z-50 px-4 py-6 lg:px-12 ${
        isBalcaoDigital ? "bg-[#C41230]" : "bg-transparent"
      }`}
    >
      <nav
        ref={dropdownRef}
        className={`relative bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.12)] max-w-[1600px] mx-auto transition-all ${
          openDropdown ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"
        }`}
      >
        {/* Added gap-6 lg:gap-8 to prevent the left and right containers from sticking together on smaller screens */}
        <div className="h-[96px] px-8 flex items-center justify-between gap-6 lg:gap-8">
          {/* LEFT: Logo, Partition Line, and Começar */}
          <div className="flex items-center gap-6 xl:gap-8 h-full">
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

            <div className="hidden lg:flex items-center h-full">
              {/* Render only Começar (index 0) */}
              {navItems.slice(0, 1).map(renderDesktopNavItem)}
            </div>
          </div>

          {/* RIGHT: Remaining Nav Items, Partition Line, and Actions */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            <div className="flex items-center gap-6 xl:gap-8 h-full">
              {/* Render rest of the navigation (index 1 to end) */}
              {navItems.slice(1).map(renderDesktopNavItem)}
            </div>

            <div className="h-8 w-px bg-gray-300" />

            <Link
              href="/balcao-digital"
              className="h-[44px] px-5 rounded-lg border-2 border-[#DE092D] text-[#DE092D] font-bold text-[16px] flex items-center justify-center hover:bg-[#DE092D] hover:text-white transition-colors whitespace-nowrap"
            >
              Balcão Digital
            </Link>

            <Link
              href="/ajuda"
              className="flex items-center gap-1 text-[#1C2E56] text-[16px] font-medium hover:underline hover:decoration-[#1C2E56] hover:decoration-2 hover:underline-offset-8 transition whitespace-nowrap"
            >
              Ajuda
              <ChevronLeft className="w-[18px] h-[18px] stroke-[2]" />
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden p-2 text-[#1C2E56]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-4 space-y-2 rounded-b-2xl">
            {navItems.map((item) =>
              item.megaMenu ? (
                <div key={item.label}>
                  <div className="flex items-center justify-between w-full text-[#1C2E56]">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`flex-grow py-3 transition ${
                          isActive(item) || mobileExpanded === item.label
                            ? "font-extrabold text-[#1C2E56]"
                            : "font-medium text-[#1C2E56]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        className={`flex-grow py-3 transition ${
                          isActive(item) || mobileExpanded === item.label
                            ? "font-extrabold text-[#1C2E56]"
                            : "font-medium text-[#1C2E56]"
                        }`}
                      >
                        {item.label}
                      </span>
                    )}

                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                      className="p-3"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {mobileExpanded === item.label && (
                    <div className="ml-2 border-l-2 border-gray-100 pl-4 space-y-5 pb-4 mt-2">
                      {item.megaMenu.map((section) => (
                        <div key={section.heading}>
                          <h4 className="font-bold text-[#1C2E56] mb-3 text-[15px]">
                            {section.heading}
                          </h4>

                          <div className="space-y-3">
                            {section.links.map((link) =>
                              link.href ? (
                                <Link
                                  key={`${section.heading}-${link.label}`}
                                  href={link.href}
                                  className={`flex items-center gap-3 transition ${
                                    pathname === link.href
                                      ? "text-[#1C2E56] font-extrabold"
                                      : "text-[#1C2E56] font-medium"
                                  }`}
                                >
                                  <ChevronRight className="w-[18px] h-[18px] stroke-[2.5]" />
                                  <span>{link.label}</span>
                                </Link>
                              ) : (
                                <span
                                  key={`${section.heading}-${link.label}`}
                                  className="flex items-center gap-3 cursor-default"
                                  aria-disabled="true"
                                >
                                  <ChevronRight className="w-[18px] h-[18px] stroke-[2.5] text-gray-400" />
                                  <span className="font-medium text-gray-400">{link.label}</span>
                                </span>
                              ),
                            )}
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
                  className={`block py-3 transition ${
                    pathname === item.href
                      ? "font-extrabold text-[#1C2E56]"
                      : "font-medium text-[#1C2E56]"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}

            {/* MOBILE BALCÃO DIGITAL */}
            <Link
              href="/balcao-digital"
              className="mt-4 flex justify-center rounded-lg border-2 border-[#DE092D] py-3 text-[#DE092D] font-bold text-[16px] hover:bg-[#DE092D] hover:text-white transition-colors whitespace-nowrap"
            >
              Balcão Digital
            </Link>

            <button
              onClick={openAjudaSidebar}
              className="w-full mt-2 flex items-center justify-center gap-1 py-3 !text-[#1C2E56] dark:!text-[#1C2E56] font-medium hover:underline whitespace-nowrap"
            >
              Ajuda
              <ChevronLeft className="w-5 h-5 !text-[#1C2E56] dark:!text-[#1C2E56]" />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
