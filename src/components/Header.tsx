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
    <header className="sticky top-0 z-50">
      <nav ref={dropdownRef} className="bg-card/95 backdrop-blur-md border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/header logo.png"
              alt="Logo"
              width={110}
              height={110}
              className="object-contain"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isLast = index === navItems.length - 1;

              return item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition ${
                      isActive(item)
                        ? "text-[#DE092D] font-bold"
                        : "text-muted-foreground hover:text-[#DE092D]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div
                      className={`absolute top-full mt-2 w-72 bg-card rounded-xl border shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200 ${
                        isLast ? "right-0" : "left-0"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 transition text-muted-foreground hover:text-[#DE092D] ${
                            pathname === child.href ? "text-[#DE092D] font-bold" : ""
                          }`}
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
                  className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    pathname === item.href
                      ? "text-[#DE092D] font-bold"
                      : "text-muted-foreground hover:text-[#DE092D]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-card px-4 py-4 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md transition ${
                      isActive(item)
                        ? "text-[#DE092D] font-bold"
                        : "text-muted-foreground hover:text-[#DE092D] hover:bg-muted"
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
                    <div className="ml-4 mt-1 border-l border-muted pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-3 py-2 text-sm transition text-muted-foreground hover:text-[#DE092D] ${
                            pathname === child.href ? "text-[#DE092D] font-bold" : ""
                          }`}
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
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-medium transition ${
                    pathname === item.href
                      ? "text-[#DE092D] font-bold"
                      : "text-muted-foreground hover:text-[#DE092D]"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
