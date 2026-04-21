import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { publicSpaces } from "./spacesData";

export default function EspacosPublicosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative min-h-[52vh] md:min-h-[60vh] overflow-hidden flex items-end">
          <div className="absolute inset-0">
            <img
              src="/hero-bg.jpg"
              alt="Espacos de interesse da freguesia"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-primary/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-transparent" />
          </div>
          <div className="container max-w-6xl mx-auto px-4">
            <Link
              href="/freguesia"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-5 relative"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Freguesia
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 relative">
              Espaços Públicos
            </h1>
            <p className="text-primary-foreground/85 text-lg max-w-3xl pb-14 md:pb-16 relative">
              Descubra os principais pontos de interesse da freguesia, com informacao historica e
              contexto de cada espaco.
            </p>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="mb-8 flex items-center justify-between gap-3">
              <div>
                <Badge variant="secondary" className="mb-3">
                  Locais de Interesse
                </Badge>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Explore os espacos da comunidade
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-[230px]">
              {publicSpaces.map((space) => (
                <Link
                  key={space.slug}
                  href={`/freguesia/espacos/${space.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-border/70 bg-card"
                >
                  <img
                    src={space.gridImage}
                    alt={space.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <p className="font-display text-xl font-semibold text-primary-foreground">
                      {space.name}
                    </p>
                    <p className="text-primary-foreground/80 text-sm mt-1 line-clamp-2">
                      {space.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent mt-3">
                      Ver pagina <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
