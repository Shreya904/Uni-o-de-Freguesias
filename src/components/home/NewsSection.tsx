import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { newsItems } from "@/data/mockData";

const NewsSection = () => (
  <section className="section-padding bg-background">
    <div className="container max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Atualidade</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Últimas Notícias</h2>
        </div>
        <Link href="/noticias" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          Ver todas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsItems.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="h-40 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-xs">{item.category}</span>
            </div>
            <div className="p-5">
              <time className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('pt-PT')}</time>
              <h3 className="font-display font-semibold text-foreground mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <Link href="/noticias" className="md:hidden flex items-center justify-center gap-1.5 mt-8 text-sm font-medium text-primary">
        Ver todas as notícias <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default NewsSection;

