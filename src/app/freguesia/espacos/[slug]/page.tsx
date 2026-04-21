import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarDays, MapPin, Compass } from "lucide-react";
import { publicSpaces } from "../spacesData";

type SpaceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SpaceDetailPage({ params }: SpaceDetailPageProps) {
  const { slug } = await params;
  const space = publicSpaces.find((item) => item.slug === slug);

  if (!space) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative min-h-[44vh] md:min-h-[50vh] overflow-hidden flex items-end">
          <div className="absolute inset-0">
            <img
              src={space.heroImage}
              alt={space.name}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-primary/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-transparent" />
          </div>

          <div className="container max-w-6xl mx-auto px-4 pb-10 md:pb-12 relative">
            <Link
              href="/freguesia/espacos"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-5"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Espacos Publicos
            </Link>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-3">
              Local de Interesse
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
              {space.name}
            </h1>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              <aside className="lg:col-span-4">
                <div className="sticky top-24 bg-card border rounded-2xl p-5 md:p-6 space-y-4">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Informacao Principal
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Nome</p>
                      <p className="text-foreground font-medium">{space.name}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Construcao</p>
                      <p className="text-foreground font-medium">
                        {space.constructionStart} - {space.constructionEnd}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Inauguracao</p>
                      <p className="text-foreground font-medium flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-accent" /> {space.inauguration}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Funcao Inicial</p>
                      <p className="text-foreground font-medium">{space.initialFunction}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Coordenadas</p>
                      <p className="text-foreground font-medium flex items-center gap-2">
                        <Compass className="w-4 h-4 text-accent" /> {space.coordinates}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Localizacao</p>
                      <p className="text-foreground font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" /> {space.location}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              <article className="lg:col-span-8 bg-card border rounded-2xl p-6 md:p-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {space.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {space.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Esta estrutura esta preparada para conteudo de CMS com texto enriquecido, galeria,
                  anexos e dados tecnicos adicionais.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
