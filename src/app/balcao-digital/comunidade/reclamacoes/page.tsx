"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import { ChevronRight } from "lucide-react";

export default function ReclamacoesPage() {
  const [step, setStep] = useState(1);
  return (
    <div className="min-h-screen">
      <Header />
      <BalcaoHeader />
      <main className="container max-w-2xl mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold text-foreground text-center mb-2">Reclamações e Sugestões</h1>
        <p className="text-muted-foreground text-sm text-center mb-8 max-w-lg mx-auto">
          Submeta o seu pedido através do balcão digital. Preencha os dados necessários para que o processo possa ser analisado pelos serviços da junta.
        </p>
        <div className="flex items-center justify-center gap-16 mb-10">
          {["Dados", "Confirmação"].map((label, i) => {
            const n = i + 1;
            const isActive = n === step;
            const isDone = n < step;
            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${isActive || isDone ? "bg-[#C41230] text-white border-[#C41230]" : "border-border text-muted-foreground"}`}>{n}</div>
                <span className={`text-xs ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>{label}</span>
              </div>
            );
          })}
        </div>
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="font-bold text-foreground mb-4">1 - Natureza do problema?</h2>
              <label className="text-sm text-muted-foreground">Tipo de problema <span className="text-xs">(Necessário)</span></label>
              <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
                <option>— Selecione</option>
                <option>Espaço público</option>
                <option>Serviços</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-4">2 - Qual é a sua reclamação ou sugestão?</h2>
              <label className="text-sm text-muted-foreground">Reclamação ou sugestão <span className="text-xs">(Necessário)</span></label>
              <textarea placeholder="Mensagem..." className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-32 resize-none" />
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-4">3 - Os seus dados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Nome <span className="text-xs">(Necessário)</span></label>
                  <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Apelido <span className="text-xs">(Necessário)</span></label>
                  <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email <span className="text-xs">(Necessário)</span></label>
                  <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Telefone ou Telemóvel</label>
                  <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">Agora só falta confirmar. Vamos a isso!</p>
              <button onClick={() => setStep(2)} className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">
                Continuar <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="font-bold text-foreground mb-4">2 - Confirmação</h2>
            <p className="text-sm text-muted-foreground mb-6">A sua reclamação será analisada e receberá resposta por email.</p>
            <button className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">
              Submeter <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="border-t mt-12 pt-8">
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