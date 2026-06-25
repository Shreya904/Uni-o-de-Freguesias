"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";

export default function PropostasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main className="container max-w-3xl mx-auto px-4 py-10">
        <button className="w-full bg-[#1C2E56] text-white rounded-lg py-4 text-lg font-semibold mb-8 flex items-center justify-center gap-2 hover:bg-[#1C2E56]/90 transition">
          + Criar proposta
        </button>
        <div className="space-y-4 mb-12">
          <div className="border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Obras na cidade · 18 março, 2027 por Joaquim de Almeida</p>
            <h3 className="font-bold text-foreground">Precisamos de um Aeroporto na Cidade</h3>
            <p className="text-sm text-muted-foreground mt-2">Aveiro tem muito turismo e se tivéssemos um aeroporto como o de Lisboa, no lugar do Estádio Municipal seríamos a maior centro cidade do centro!</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground border-t pt-3">
              <span>Gostou desta ideia? 👍 👎</span>
              <span>Atualizado a 29 abril, 2026</span>
              <span>Partilhar 🔗</span>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Obras na cidade · 18 março, 2027 por João Neves</p>
            <h3 className="font-bold text-foreground">Voltem a abrir o Drinks antigo no sítio onde estava!</h3>
            <p className="text-sm text-muted-foreground mt-2">Faz muita falta!</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground border-t pt-3">
              <span>Gostou desta ideia? 👍 👎</span>
              <span>Atualizado a 29 abril, 2026</span>
              <span>Partilhar 🔗</span>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Formação · 18 março, 2027 por João Neves</p>
            <h3 className="font-bold text-foreground">A cidade precisa de arrumadores certificados</h3>
            <p className="text-sm text-muted-foreground mt-2">Mais não digo...</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground border-t pt-3">
              <span>Gostou desta ideia? 👍 👎</span>
              <span>Atualizado a 29 abril, 2026</span>
              <span>Partilhar 🔗</span>
            </div>
          </div>
        </div>
        <div className="border-t pt-8">
          <p className="font-bold text-foreground mb-3">Outros assuntos populares</p>
          <details className="bg-amber-50 rounded-lg p-4 cursor-pointer mb-3">
            <summary className="font-medium text-foreground">Quero casar, o que devo fazer?</summary>
          </details>
          <details className="bg-amber-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-medium text-foreground">Sinto-me só preciso de ajuda como fazer?</summary>
          </details>
        </div>
      </main>
      <Footer />
    </div>
  );
}