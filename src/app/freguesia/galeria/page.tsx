import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";
import { galleryAlbums } from "./galleryData";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function FreguesiaGaleriaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative min-h-[52vh] md:min-h-[60vh] overflow-hidden flex items-end">
          <div className="absolute inset-0">
            <img
              src="/hero-bg.jpg"
              alt="Galeria da freguesia"
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
              Galeria
            </h1>
            <p className="text-primary-foreground/85 text-lg max-w-3xl pb-14 md:pb-16 relative">
              Registos visuais da identidade, cultura e iniciativas da freguesia.
            </p>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-3">
                Galerias
              </Badge>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Albuns da comunidade
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-[250px]">
              {galleryAlbums.map((album) => (
                <Link
                  key={album.slug}
                  href={`/freguesia/galeria/${album.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-border/70 bg-card flex items-end"
                >
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex flex-col items-start justify-end gap-1.5">
                    <h3 className="font-display text-xl font-semibold text-primary-foreground">
                      {album.title}
                    </h3>
                    <p className="text-primary-foreground/90 text-sm">{formatDate(album.date)}</p>
                    <p className="inline-flex items-center gap-1.5 text-sm text-accent">
                      <Images className="w-4 h-4" /> {album.photoCount} fotos
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground pt-1">
                      Abrir galeria <ArrowRight className="w-4 h-4" />
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
