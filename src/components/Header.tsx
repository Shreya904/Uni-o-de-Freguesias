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
  { label: "Notícias", href: "/noticias" },
  { label: "Agenda", href: "/eventos" },
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

  const isActive = (item: NavItem): boolean => {
    if (item.href) return pathname === item.href;
    return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
  };
  return (
    <header className="sticky top-0 z-50 px-4 lg:px-12 py-6">
      <nav
        ref={dropdownRef}
        className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)]"
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

            <button className="hidden lg:block text-[#1C2E56] text-lg font-medium hover:text-[#DE092D] transition">
              Começar
            </button>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isLast = index === navItems.length - 1;

              return item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 text-[18px] font-medium transition ${
                      isActive(item)
                        ? "text-[#1C2E56] underline underline-offset-4"
                        : "text-[#1C2E56] hover:text-[#DE092D]"
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
                    <div
                      className={`absolute top-full mt-4 w-80 bg-white border-t-2 border-[#DE092D] rounded-b-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.15)] overflow-hidden ${
                        isLast ? "right-0" : "left-0"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-4 hover:bg-gray-50 transition ${
                            pathname === child.href ? "bg-gray-50" : ""
                          }`}
                        >
                          <span className="block text-[#1C2E56] font-semibold">{child.label}</span>

                          {child.description && (
                            <span className="block text-sm text-gray-500 mt-1">
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
                  className={`text-[18px] font-medium transition ${
                    pathname === item.href
                      ? "text-[#1C2E56] underline underline-offset-4"
                      : "text-[#1C2E56] hover:text-[#DE092D]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="h-8 w-px bg-gray-300" />

            {/* CTA */}
            <Link
              href="/balcao-digital"
              className="h-[50px] px-5 rounded-lg border-2 border-[#DE092D] text-[#DE092D] font-extrabold text-[18px] flex items-center justify-center hover:bg-[#DE092D]/5 transition"
            >
              Balcão Digital
            </Link>

            {/* Help */}
            <button className="text-[#1C2E56] text-[18px] font-medium hover:text-[#DE092D] transition">
              Ajuda
            </button>
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
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full py-3 text-[#1C2E56] font-medium"
                  >
                    {item.label}

                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileExpanded === item.label && (
                    <div className="ml-4 border-l pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-[#1C2E56]"
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
                  className="block py-3 text-[#1C2E56] font-medium"
                >
                  {item.label}
                </Link>
              ),
            )}

            <Link
              href="/balcao-digital"
              className="mt-3 flex justify-center rounded-lg border-2 border-[#DE092D] py-3 text-[#DE092D] font-bold"
            >
              Balcão Digital
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
