import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { newsItems } from "@/data/mockData";
import { slugify } from "@/lib/utils";

const NewsSection = () => (
  <section className="section-padding bg-background">
    <div className="container max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Atualidade
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Últimas Notícias
          </h2>
        </div>
        <Link
          href="/noticias"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Ver todas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <Link
              href={`/noticias/${slugify(item.title)}`}
              className="block bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              {item.mainImage ? (
                <div className="relative h-40 bg-muted/40">
                  <Image
                    src={item.mainImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              ) : (
                <div className="h-40 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">Sem imagem</span>
                </div>
              )}
              <div className="p-5">
                <time className="text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString("pt-PT")}
                </time>
                <h3 className="font-display font-semibold text-foreground mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <Link
        href="/noticias"
        className="md:hidden flex items-center justify-center gap-1.5 mt-8 text-sm font-medium text-primary"
      >
        Ver todas as notícias <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default NewsSection;
