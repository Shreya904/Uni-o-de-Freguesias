import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

import { faqItems, faqCategories } from "@/data/mockData";

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    activeCategory === "Todos"
      ? faqItems.slice(0, 6)
      : faqItems.filter((f) => f.category === activeCategory).slice(0, 6);

  return (
    <section className="section-padding bg-background">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Ajuda</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Encontre respostas às questões mais comuns sobre os nossos serviços.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border rounded-xl overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openId === item.id}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="font-medium text-foreground">{item.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${openId === item.id ? "rotate-180" : ""}`}
                />
              </button>
              {openId === item.id && (
                <div className="px-5 pb-5 pl-13 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/faq" className="text-sm font-medium text-primary hover:underline">
            Ver todas as perguntas →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
