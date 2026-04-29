import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchNewsBySlug, fetchPublishedNews } from "@/lib/cms";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderDescription(input: any): string[] {
  if (!input) return [];

  if (typeof input === "string") {
    return input
      .split(/(?:\n|\r|\u2022)/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  if (typeof input === "object" && input.root?.children) {
    const result: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const walk = (nodes: any[]) => {
      let buffer = "";

      for (const node of nodes) {
        if (typeof node?.text === "string") {
          buffer += node.text + " ";
        }

        const isBreak =
          node?.type === "linebreak" ||
          node?.type === "paragraph" ||
          node?.type === "list" ||
          node?.type === "list-item";

        if (isBreak && buffer.trim()) {
          result.push(buffer.trim());
          buffer = "";
        }

        if (Array.isArray(node?.children)) {
          walk(node.children);
        }
      }

      if (buffer.trim()) result.push(buffer.trim());
    };

    walk(input.root.children);

    return result.map((t) => t.replace(/\s+/g, " ").replace(/•\s*/g, "").trim()).filter(Boolean);
  }

  return [];
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const newsItem = await fetchNewsBySlug(slug);
  const latestNews = await fetchPublishedNews(3);

  if (!newsItem) notFound();

  const mainImage =
    typeof newsItem.mainImage === "string" && newsItem.mainImage.trim()
      ? newsItem.mainImage.trim()
      : null;

  const gallery = Array.isArray(newsItem.galleryImages)
    ? newsItem.galleryImages.filter((img) => typeof img === "string" && img.trim())
    : [];

  const descriptionBlocks = renderDescription(newsItem.description);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* LEFT */}
            <div className="lg:col-span-3 space-y-7">
              <Link href="/noticias" className="inline-flex items-center gap-2 group">
                <span className="text-xl font-semibold group-hover:-translate-x-1 transition-transform">
                  {"<"}
                </span>
                <span className="font-display text-2xl md:text-3xl font-bold text-primary">
                  Notícias
                </span>
              </Link>

              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                {newsItem.title}
              </h1>

              <p className="text-sm text-muted-foreground">
                {newsItem.date && formatDate(newsItem.date)}
              </p>

              {/* DESCRIPTION */}
              {descriptionBlocks.length > 0 && (
                <div className="space-y-6 text-[17px] md:text-[19px] leading-8 font-medium text-foreground/90">
                  {descriptionBlocks.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {/* =========================
                  🧱 MASONRY GALLERY
                  ========================= */}
              {gallery.length > 0 && (
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                  {gallery.map((img, i) => (
                    <div
                      key={i}
                      className="break-inside-avoid rounded-lg overflow-hidden bg-muted max-h-[420px]"
                    >
                      <img
                        src={img}
                        alt={`${newsItem.title} ${i + 1}`}
                        className="w-full h-auto object-contain max-h-[420px]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* =========================
                  🖼 MAIN IMAGE (CONTROLLED)
                  ========================= */}
              {mainImage && (
                <div className="mt-8 rounded-xl overflow-hidden bg-muted max-h-[600px] flex justify-center">
                  <img
                    src={mainImage}
                    alt={newsItem.title}
                    className="w-full h-auto object-contain max-h-[600px]"
                  />
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-6">
              <h3 className="font-semibold text-sm">Mais Notícias</h3>

              <div className="space-y-6">
                {latestNews.map((item) => (
                  <Link key={item.id} href={`/noticias/${item.slug}`} className="block group">
                    <p className="text-lg font-bold underline decoration-primary/30 underline-offset-4 group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
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
