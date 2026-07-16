import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RichTextRenderer from "@/components/RichTextRenderer";
import SiteBanner from "@/components/SiteBanner";
import { fetchNewsBySlug, fetchPublishedNews } from "@/lib/cms";
import { siteBannerIds } from "@/lib/siteBanners";

const formatNewsDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("pt-PT", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  return `${day} ${capitalizedMonth} ${year}`;
};

export async function generateStaticParams() {
  try {
    const newsItems = await fetchPublishedNews();

    return newsItems.map((news) => ({
      slug: news.slug,
    }));
  } catch {
    return [];
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const newsItem = await fetchNewsBySlug(slug);
  const allLatestNews = await fetchPublishedNews(4);

  if (!newsItem) notFound();

  const latestNews = allLatestNews.filter((n) => n.id !== newsItem.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-50">
        <div className="bg-[#253e6b]">
          <Header />
          <Link
            href="/noticias"
            className="container max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-200 transition-colors"
          >
            <span>{"<"}</span>
            <span>Notícias</span>
          </Link>
        </div>
      </div>

      <main className="py-12">
        <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold text-gray-500 mb-4">
                {newsItem.date && formatNewsDate(newsItem.date)}
              </p>

              <h1 className="text-[#253e6b] text-[32px] md:text-[40px] font-extrabold leading-[1.15] mb-8">
                {newsItem.title}
              </h1>

              <RichTextRenderer
                content={newsItem.description}
                className="text-[16px] md:text-[18px]"
              />

              {newsItem.mainImage && (
                <div className="mt-10 w-full">
                  <img
                    src={newsItem.mainImage}
                    alt={newsItem.title}
                    className="w-full h-auto block"
                  />
                </div>
              )}
            </div>

            <aside className="lg:col-span-4 mt-12 lg:mt-0 flex flex-col">
              <div className="mb-10">
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
              </div>

              {/* SMALL RIGHT BANNER - Placed immediately beneath the news, sticking on scroll */}
              <SiteBanner bannerId={siteBannerIds.noticiasSlugPharmacy} />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
