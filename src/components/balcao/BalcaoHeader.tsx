"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { balcaoSearchIndex } from "./searchIndex";

const tabs = [
  { label: "Inscrições", href: "/balcao-digital/inscricoes" },
  { label: "Marcações", href: "/balcao-digital/marcacoes" },
  { label: "Atestados", href: "/balcao-digital/atestados" },
  { label: "Declarações", href: "/balcao-digital/declaracoes" },
  { label: "Canídeos", href: "/balcao-digital/canideos" },
  { label: "Cemitérios", href: "/balcao-digital/cemiterios" },
];

const comunidadeTabs = [
  { label: "Quem somos", href: "/balcao-digital/comunidade/quem-somos" },
  { label: "Propostas", href: "/balcao-digital/comunidade/propostas" },
  { label: "Reclamações e Sugestões", href: "/balcao-digital/comunidade/reclamacoes" },
  { label: "Associativismo", href: "/balcao-digital/comunidade/associativismo" },
];

export default function BalcaoHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isComunidade = pathname?.startsWith("/balcao-digital/comunidade");
  const activeTabs = isComunidade ? comunidadeTabs : tabs;

  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const results =
    query.trim() === ""
      ? []
      : balcaoSearchIndex.filter((item) =>
          item.label.toLowerCase().includes(query.trim().toLowerCase())
        );

  return (
    <div className="bg-white dark:bg-black">
      <section className="bg-[#C41230] pb-6 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-5 md:grid-cols-[300px_1fr] md:items-end">
            <div>
              <h1 className="font-display text-[40px] font-bold leading-tight">Balcão Digital</h1>
              <p className="mt-1 text-lg font-semibold text-white">
                {isComunidade ? "Comunidade" : "Serviços online"}
              </p>
            </div>
            <div>
              <div className="relative">
                <div className="flex overflow-hidden rounded-md border-2 border-white bg-white dark:bg-black dark:border-white/25">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 150)}
                    placeholder="O que procuro"
                    className="h-11 flex-1 px-4 text-sm text-foreground outline-none dark:bg-black dark:text-white dark:placeholder:text-white/70"
                  />
                  <button
                    onClick={() => {
                      if (results.length > 0) router.push(results[0].href);
                    }}
                    className="h-11 rounded-r-md border-l-2 border-[#C41230] bg-white px-5 text-sm font-bold text-foreground dark:bg-black dark:text-white"
                  >
                    Pesquisar
                  </button>
                </div>
                {showResults && query.trim() !== "" && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border bg-white shadow-lg dark:bg-black dark:border-white/20">
                    {results.length > 0 ? (
                      results.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => { setQuery(""); setShowResults(false); }}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted dark:text-white dark:hover:bg-white/10"
                        >
                          {item.label}
                        </Link>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-sm text-muted-foreground dark:text-white/70">Nenhum resultado encontrado</p>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
                <span className="font-semibold text-white">Termos Populares:</span>
                <Link href="/balcao-digital/atestados/residencia" className="underline">Atestado de residência</Link>
                <Link href="/balcao-digital/cemiterios" className="underline">Cemitério</Link>
                <Link href="/balcao-digital/declaracoes" className="underline">União de facto</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-[#C41230]">
        <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap gap-2">
            {activeTabs.map((tab) => {
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
          {isComunidade ? (
            <Link
              href="/balcao-digital/inscricoes"
              className="flex h-11 shrink-0 items-center justify-center rounded-md border-2 px-5 text-sm font-bold text-foreground hover:bg-muted transition-colors"
            >
              {"<"} Serviços online
            </Link>
          ) : (
            <Link
              href="/balcao-digital/comunidade/quem-somos"
              className="flex h-11 shrink-0 items-center justify-center rounded-md border-2 px-5 text-sm font-bold text-foreground hover:bg-muted transition-colors"
            >
              Comunidade {">"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
