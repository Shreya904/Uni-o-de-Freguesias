import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Images } from "lucide-react";
import { galleryAlbums } from "../galleryData";

type GalleryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { slug } = await params;
  const album = galleryAlbums.find((item) => item.slug === slug);

  if (!album) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative min-h-[42vh] md:min-h-[48vh] overflow-hidden flex items-end">
          <div className="absolute inset-0">
            <img
              src={album.coverImage}
              alt={album.title}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-primary/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-transparent" />
          </div>

          <div className="container max-w-6xl mx-auto px-4 pb-10 md:pb-12 relative">
            <Link
              href="/freguesia/galeria"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-5"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Galeria
            </Link>
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-3">Album</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">
              {album.title}
            </h1>
            <p className="text-primary-foreground/85 text-base md:text-lg inline-flex items-center gap-2">
              <Images className="w-4 h-4" /> {album.photoCount} fotos · {formatDate(album.date)}
            </p>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {album.images.map((image, index) => (
                <figure
                  key={`${album.slug}-${index}`}
                  className="rounded-xl overflow-hidden border border-border/70 bg-card"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-56 md:h-60 object-cover"
                    width={900}
                    height={700}
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
