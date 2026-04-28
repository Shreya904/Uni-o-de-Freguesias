import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchNewsBySlug, fetchPublishedNews } from "@/lib/cms";

type NewsPageProps = {
  params: { slug: string };
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

function safeText(input: any) {
  if (typeof input === "string") return input;
  return "";
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const newsItem = await fetchNewsBySlug(params.slug);
  const latestNews = await fetchPublishedNews(3);

  if (!newsItem) notFound();

  const mainImage =
    typeof newsItem.mainImage === "string" && newsItem.mainImage.trim()
      ? newsItem.mainImage.trim()
      : null;

  const gallery = Array.isArray(newsItem.galleryImages)
    ? newsItem.galleryImages.filter((img) => typeof img === "string" && img.trim())
    : [];

  const description = safeText(newsItem.description);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-3 space-y-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Notícias</p>

              <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight text-foreground">
                {newsItem.title}
              </h1>

              <p className="text-sm text-muted-foreground">
                {newsItem.date && formatDate(newsItem.date)}
              </p>

              {/* DESCRIPTION (IMPROVED READABILITY) */}
              {description && (
                <p className="text-[17px] md:text-[18px] leading-relaxed text-foreground/90 font-medium">
                  {description}
                </p>
              )}

              {mainImage && (
                <div className="w-full overflow-hidden rounded-lg bg-muted">
                  <img src={mainImage} alt={newsItem.title} className="w-full object-cover" />
                </div>
              )}

              {gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {gallery.map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-md bg-muted">
                      <img
                        src={img}
                        alt={`${newsItem.title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-5">
              <h3 className="font-semibold text-sm text-foreground">Mais Notícias</h3>

              <div className="space-y-5">
                {latestNews.map((item) => (
                  <Link key={item.id} href={`/noticias/${item.slug}`} className="block group">
                    <p className="text-base md:text-[17px] font-semibold leading-snug group-hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">
                      {item.title}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {item.date && formatDate(item.date)}
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
