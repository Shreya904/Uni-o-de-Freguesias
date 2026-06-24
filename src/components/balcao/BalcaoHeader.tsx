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
    <div>
      <section className="bg-[#C41230] text-white py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="font-display text-3xl font-bold mb-1">Balcão Digital</h1>
          <p className="text-white/80 text-sm mb-6">Serviços online</p>
          <div className="flex gap-3 max-w-xl">
            <input
              type="text"
              placeholder="O que procuro"
              className="flex-1 rounded-md px-4 py-2 text-foreground text-sm"
            />
            <button className="bg-black text-white rounded-md px-5 py-2 text-sm font-medium">
              Pesquisar
            </button>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-white/70">
            <span>Termos Populares:</span>
            <Link href="/balcao-digital/atestados/residencia" className="underline">Atestado de residência</Link>
            <Link href="/balcao-digital/cemiterios" className="underline">Cemitério</Link>
            <Link href="/balcao-digital/declaracoes" className="underline">União de facto</Link>
          </div>
        </div>
      </section>

      <div className="border-b">
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
          <nav className="flex gap-2 py-3 flex-wrap">
            {tabs.map((tab) => {
              const isActive = pathname?.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-4 py-2 rounded-full text-sm border ${
                    isActive
                      ? "bg-[#C41230] text-white border-[#C41230]"
                      : "text-foreground border-border hover:bg-muted"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
          <button className="text-sm border rounded-full px-4 py-2 flex items-center gap-1 shrink-0">
            Comunidade ›
          </button>
        </div>
      </div>
    </div>
  );
}