import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { establishments } from "../establishmentsData";

type EstablishmentDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EstablishmentDetailPage({ params }: EstablishmentDetailPageProps) {
  const { slug } = await params;
  const establishment = establishments.find((item) => item.slug === slug);

  if (!establishment) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative min-h-[42vh] md:min-h-[50vh] overflow-hidden flex items-end">
          <div className="absolute inset-0">
            <img
              src={establishment.coverImage}
              alt={establishment.name}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-primary/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-transparent" />
          </div>

          <div className="container max-w-6xl mx-auto px-4 pb-12 relative">
            <Link
              href="/instituicao"
              className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-primary-foreground text-sm mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Instituicao
            </Link>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-3">
              {establishment.type}
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
              {establishment.name}
            </h1>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <aside className="lg:col-span-4">
                <div className="bg-card border rounded-2xl p-6 space-y-4 lg:sticky lg:top-24">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Informacao Relevante
                  </h2>

                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-0.5 text-accent" />
                    <span>{establishment.contact}</span>
                  </p>

                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                    <span>{establishment.address}</span>
                  </p>

                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 text-accent" />
                    <span>{establishment.openingHours}</span>
                  </p>

                  <a
                    href={establishment.socialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Link para rede social <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </aside>

              <div className="lg:col-span-8 space-y-6">
                <article className="bg-card border rounded-2xl p-6 md:p-8">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {establishment.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {establishment.description}
                  </p>
                </article>

                <section className="bg-card border rounded-2xl p-6 md:p-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-5">Galeria</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {establishment.gallery.map((item, index) => (
                      <figure
                        key={`${establishment.slug}-${index}`}
                        className="rounded-xl overflow-hidden border border-border/70"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-52 object-cover"
                          width={900}
                          height={700}
                          loading="lazy"
                        />
                      </figure>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
