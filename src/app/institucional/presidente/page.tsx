import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Quote, CalendarDays } from "lucide-react";

const presidentInfo = {
  name: "Maria Silva",
  role: "Presidente da Junta",
  term: "Mandato 2025-2029",
  messageTitle: "Mensagem da Presidente a Comunidade",
  messageDescription:
    "Um compromisso de proximidade, transparencia e desenvolvimento sustentado para toda a freguesia.",
  messageDate: "15 abril 2026",
};

export default function PresidentePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="section-padding">
          <div className="container max-w-6xl mx-auto px-4">
            <Link
              href="/institucional"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-5"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Institucional
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Mensagem do Presidente
            </h1>
            <p className="text-muted-foreground mb-8">
              {presidentInfo.name} · {presidentInfo.role}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
              <aside className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-card">
                  <img
                    src="/presidente.jpg"
                    alt="Presidente da Junta"
                    className="w-full h-[360px] md:h-[520px] object-cover"
                    width={900}
                    height={1200}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary/85 to-transparent">
                    <p className="font-display text-xl font-semibold text-primary-foreground">
                      {presidentInfo.name}
                    </p>
                    <p className="text-primary-foreground/85 text-sm">{presidentInfo.role}</p>
                  </div>
                </div>
              </aside>

              <article className="lg:col-span-7 bg-card rounded-2xl border p-6 md:p-8">
                <Quote className="w-10 h-10 text-accent/70 mb-4" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {presidentInfo.messageTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {presidentInfo.messageDescription}
                </p>

                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <CalendarDays className="w-4 h-4 text-accent" /> {presidentInfo.messageDate}
                </p>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Esta pagina serve como template para a mensagem institucional do Presidente. O
                    conteudo final sera fornecido via CMS, incluindo texto principal, destaques e
                    chamadas para iniciativas em curso.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    O objetivo e manter os cidadaos informados sobre prioridades, resultados e
                    compromissos assumidos no mandato, reforcando uma relacao de proximidade com a
                    comunidade.
                  </p>
                </div>

                <p className="text-sm text-muted-foreground/90 mt-6">
                  {presidentInfo.name} · {presidentInfo.term}
                </p>
              </article>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contactos">Contactar Presidencia</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/institucional/documentacao">Consultar Documentacao</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
