"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import { faqItems, faqCategories } from "@/data/mockData";
import { Input } from "@/components/ui/input";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  let filtered = activeCategory === "Todos" ? faqItems : faqItems.filter((f) => f.category === activeCategory);
  if (search.trim()) {
    const s = search.toLowerCase();
    filtered = filtered.filter((f) => f.question.toLowerCase().includes(s) || f.answer.toLowerCase().includes(s));
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="section-padding bg-section-alt">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Centro de Ajuda</h1>
              <p className="text-muted-foreground mt-3">Encontre respostas às questões mais frequentes.</p>
            </div>

            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar perguntas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenId(null); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border rounded-xl overflow-hidden bg-card"
                >
                  <button
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between p-5 text-left"
                    aria-expanded={openId === item.id}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground block">{item.question}</span>
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${openId === item.id ? "rotate-180" : ""}`} />
                  </button>
                  {openId === item.id && (
                    <div className="px-5 pb-5 pl-13 text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-16">Nenhuma pergunta encontrada.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
