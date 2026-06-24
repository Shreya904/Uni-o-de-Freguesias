import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchNewsBySlug, fetchPublishedNews } from "@/lib/cms";

// Helper to format date exactly like "19 Dezembro 2025"
const formatNewsDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("pt-PT", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  return `${day} ${capitalizedMonth} ${year}`;
};

// Helper function retained from previous context
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
    const walk = (nodes: any[]) => {
      let buffer = "";
      for (const node of nodes) {
        if (typeof node?.text === "string") buffer += node.text + " ";
        const isBreak =
          node?.type === "linebreak" ||
          node?.type === "paragraph" ||
          node?.type === "list" ||
          node?.type === "list-item";
        if (isBreak && buffer.trim()) {
          result.push(buffer.trim());
          buffer = "";
        }
        if (Array.isArray(node?.children)) walk(node.children);
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
  const allLatestNews = await fetchPublishedNews(4);

  if (!newsItem) notFound();

  const latestNews = allLatestNews.filter((n) => n.id !== newsItem.id).slice(0, 3);
  const descriptionBlocks = renderDescription(newsItem.description);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. WRAPPED HEADER & BLUE BAR */}
      <div className="relative z-50">
        {/* We keep the header and blue bar together in one block */}
        <div className="bg-[#253e6b]">
          <Header />
          <div className="border-t border-white/10" /> {/* Subtle line between header and bar */}
          {/* TOP BLUE NAVIGATION BAR - Blends into header */}
          <div className="container max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-2 text-sm font-semibold text-white">
            <Link href="/noticias" className="hover:text-blue-200 transition-colors">
              {"<"}
            </Link>
            <span>Notícias</span>
          </div>
        </div>
      </div>

      <main className="py-12">
        <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* LEFT MAIN ARTICLE */}
            <div className="lg:col-span-8">
              <div className="border-t-[3px] border-dotted border-[#4eaaf4] w-full mb-8"></div>

              <p className="text-xs font-semibold text-gray-500 mb-4">
                {newsItem.date && formatNewsDate(newsItem.date)}
              </p>

              <h1 className="text-[#253e6b] text-[32px] md:text-[40px] font-extrabold leading-[1.15] mb-8">
                {newsItem.title}
              </h1>

              {descriptionBlocks.length > 0 && (
                <div className="space-y-6 text-[16px] md:text-[18px] leading-8 text-[#1c2841]/90 font-medium">
                  {descriptionBlocks.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {/* IMAGE RENDERING (Natural CMS aspect ratio) */}
              {newsItem.mainImage && (
                <div className="mt-10 w-full">
                  <img
                    src={newsItem.mainImage}
                    alt={newsItem.title}
                    className="w-full h-auto block"
                  />
                </div>
              )}

              {/* BOTTOM BANNER */}
              <div className="mt-12">
                <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden rounded-md border border-gray-300">
                  <img
                    src="/farmacia-banner.jpg"
                    alt="Procura uma farmácia?"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
                    <div className="bg-[#46782a] px-6 py-5 rounded-md shadow-xl border border-white/20 max-w-[280px]">
                      <h2 className="text-white font-extrabold text-xl leading-snug mb-2">
                        Procura uma farmácia?
                      </h2>
                      <p className="text-white/90 text-sm font-medium">
                        Visite a{" "}
                        <Link
                          href="#"
                          className="underline decoration-1 underline-offset-4 hover:text-white transition-colors"
                        >
                          Lista pública
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-4 mt-12 lg:mt-0">
              <h3 className="font-extrabold text-[#253e6b] text-sm uppercase tracking-wide mb-8">
                Outras notícias
              </h3>

              <div className="space-y-10">
                {latestNews.map((item) => (
                  <Link key={item.id} href={`/noticias/${item.slug}`} className="block group">
                    <article className="flex flex-col gap-3">
                      {item.mainImage && (
                        <div className="w-full">
                          <img
                            src={item.mainImage}
                            alt={item.title}
                            className="w-full h-auto block"
                          />
                        </div>
                      )}
                      <h4 className="text-[#253e6b] text-[20px] font-extrabold leading-tight underline decoration-2 underline-offset-[5px] group-hover:text-blue-800 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold">
                        {item.date && formatNewsDate(item.date)}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <div className="border-t-[3px] border-dotted border-[#4eaaf4] w-full"></div>
      <Footer />
    </div>
  );
}
