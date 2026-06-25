"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Inscrições", href: "/balcao-digital/inscricoes" },
  { label: "Marcações", href: "/balcao-digital/marcacoes" },
  { label: "Atestados", href: "/balcao-digital/atestados" },
  { label: "Declarações", href: "/balcao-digital/declaracoes" },
  { label: "Canídeos", href: "/balcao-digital/canideos" },
  { label: "Cemitérios", href: "/balcao-digital/cemiterios" },
];

export default function BalcaoHeader() {
  const pathname = usePathname();

  return (
    <div className="bg-white">
      <section className="bg-[#C41230] pb-6 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-5 md:grid-cols-[300px_1fr] md:items-end">
            <div>
              <h1 className="font-display text-[40px] font-bold leading-tight">Balcão Digital</h1>
              <p className="mt-1 text-lg font-semibold text-white">Serviços online</p>
            </div>

            <div>
              <div className="flex overflow-hidden rounded-md border-2 border-white bg-white">
                <input
                  type="text"
                  placeholder="O que procuro"
                  className="h-11 flex-1 px-4 text-sm text-foreground outline-none"
                />
                <button className="h-11 rounded-r-md border-l-2 border-[#C41230] bg-white px-5 text-sm font-bold text-foreground">
                  Pesquisar
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
                <span className="font-semibold text-white">Termos Populares:</span>
                <Link href="/balcao-digital/atestados/residencia" className="underline">
                  Atestado de residência
                </Link>
                <Link href="/balcao-digital/cemiterios" className="underline">
                  Cemitério
                </Link>
                <Link href="/balcao-digital/declaracoes" className="underline">
                  União de facto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-[#C41230]">
        <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = pathname?.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`rounded-md border-2 px-5 py-2.5 text-sm font-bold transition-colors ${
                    isActive
                      ? "border-[#C41230] bg-[#C41230] text-white"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
          <button className="flex h-11 shrink-0 items-center justify-center rounded-md border-2 px-5 text-sm font-bold text-foreground">
            Comunidade &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
