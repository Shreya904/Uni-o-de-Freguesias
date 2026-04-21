import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { establishments } from "./establishmentsData";

export default function InstituicaoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative min-h-[48vh] md:min-h-[56vh] overflow-hidden flex items-end">
          <div className="absolute inset-0">
            <img
              src="/hero-bg.jpg"
              alt="Instituicoes da freguesia"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-primary/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-transparent" />
          </div>

          <div className="container max-w-6xl mx-auto px-4 pb-12 relative">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Instituicao
            </h1>
            <p className="text-primary-foreground/85 text-lg max-w-3xl">
              Conheca os estabelecimentos da freguesia e aceda rapidamente a informacao relevante de
              cada espaco.
            </p>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-3">
                Estabelecimentos
              </Badge>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Rede de equipamentos e servicos locais
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {establishments.map((item) => (
                <Card
                  key={item.slug}
                  className="overflow-hidden border-border/80 h-full flex flex-col"
                >
                  <div className="h-52">
                    <img
                      src={item.coverImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      width={900}
                      height={700}
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-3">
                      {item.type}
                    </Badge>
                    <CardTitle className="font-display text-xl">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href={`/instituicao/${item.slug}`}>
                        Ver estabelecimento <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
