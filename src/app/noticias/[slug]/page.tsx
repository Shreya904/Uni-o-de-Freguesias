import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, MessageSquareMore } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsContentMedia from "@/components/noticias/NewsContentMedia";
import { Button } from "@/components/ui/button";
import { newsItems } from "@/data/mockData";
import { slugify } from "@/lib/utils";

type NewsPageProps = {
  params: Promise<{ slug: string }>;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;

  const newsItem = newsItems.find((item) => slugify(item.title) === slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-section-alt pt-3 pb-12 md:pt-4 md:pb-16">
          <div className="container max-w-6xl mx-auto px-4">
            <NewsContentMedia
              date={formatDate(newsItem.date)}
              title={newsItem.title}
              description={newsItem.description || newsItem.excerpt}
              category={newsItem.category}
              mainImage={newsItem.mainImage}
              galleryImages={newsItem.galleryImages}
            />

            <div className="mt-6 md:mt-8 rounded-2xl border bg-card p-5 md:p-6 lg:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <p className="font-display text-xl md:text-2xl font-semibold text-foreground">
                  Precisa de apoio relacionado com esta notícia?
                </p>
                <Link href="/noticias" className="text-sm text-primary hover:underline">
                  Voltar para Notícias
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button asChild className="w-full justify-start h-11">
                  <Link href="/institucional/documentacao">
                    <FileText className="w-4 h-4 mr-2" /> Ver Documentação
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start h-11">
                  <Link href="/contactos#formulario-contacto">
                    <MessageSquareMore className="w-4 h-4 mr-2" /> Abrir Formulário de Contacto
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
