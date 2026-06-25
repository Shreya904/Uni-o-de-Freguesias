"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, Type, Sun, Phone, MapPin, Mail, ChevronDown, ChevronRight, X } from "lucide-react";

export default function AcessibilidadeSidebar() {
  const [open, setOpen] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [reading, setReading] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    "Preciso de usar autocolantes para ouvir as entrevistas?",
    "Devo usar sempre desodorizante?",
    "Devo sempre ter o som ao meu telemóvel?",
  ];

  useEffect(() => {
    if (largeFont) {
      document.body.style.fontSize = "1.2rem";
    } else {
      document.body.style.fontSize = "";
    }
  }, [largeFont]);

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = "#000";
      document.body.style.color = "#fff";
    } else {
      document.body.style.background = "";
      document.body.style.color = "";
    }
  }, [darkMode]);

  const handleReadAloud = () => {
    if (reading) {
      window.speechSynthesis.cancel();
      setReading(false);
      return;
    }
    const text = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-PT";
    utterance.onend = () => setReading(false);
    window.speechSynthesis.speak(utterance);
    setReading(true);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#1C2E56] text-white px-2 py-4 rounded-l-lg shadow-lg flex flex-col items-center gap-1 text-xs font-medium"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {open ? "fechar" : "Precisa de ajuda?"}
      </button>

      {open && (
        <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl z-40 overflow-y-auto border-l flex flex-col">
          <div className="bg-[#1C2E56] text-white px-5 py-5 relative">
            <p className="text-sm text-white/70">Precisa</p>
            <h2 className="text-2xl font-bold">de ajuda?</h2>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 py-5 flex flex-col gap-6 flex-1">

            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Acessibilidade</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleReadAloud}
                  className={`flex items-center gap-3 border rounded-lg px-4 py-2 text-sm font-medium transition ${reading ? "bg-[#1C2E56] text-white border-[#1C2E56]" : "hover:bg-muted"}`}
                >
                  <Volume2 className="w-4 h-4" />
                  {reading ? "Parar leitura" : "Ouvir o site"}
                </button>
                <button
                  onClick={() => setLargeFont(!largeFont)}
                  className={`flex items-center gap-3 border rounded-lg px-4 py-2 text-sm font-medium transition ${largeFont ? "bg-[#1C2E56] text-white border-[#1C2E56]" : "hover:bg-muted"}`}
                >
                  <Type className="w-4 h-4" />
                  Letra grande
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`flex items-center gap-3 border rounded-lg px-4 py-2 text-sm font-medium transition ${darkMode ? "bg-white text-black border-black" : "hover:bg-muted"}`}
                >
                  <Sun className="w-4 h-4" />
                  {darkMode ? "Modo claro" : "Claro"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Informação útil</p>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Segunda a Sexta<br />09h00-12h30 | 14h00-17h30</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Avenida Dr. Lourenco Peixinho,<br />Edificio 15 - 1 B,<br />3800-164 Aveiro</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>geral.fgloriaveracruz@gmail.com</span>
                </div>
                <a href="tel:234427832" className="flex items-center gap-2 border rounded-lg px-4 py-2 font-medium text-foreground hover:bg-muted transition"><Phone className="w-4 h-4" /> 234 427 832</a>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Esta com dificuldades?</p>
              <Link href="/ajuda" className="flex items-center justify-between w-full bg-amber-400 hover:bg-amber-500 text-[#1C2E56] font-bold rounded-lg px-4 py-3 text-sm transition">
                Abrir o Centro de Ajuda
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div>
              <div className="flex flex-col gap-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-left font-medium hover:bg-muted transition"
                    >
                      {faq}
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                    </button>
                    {faqOpen === i && (
                      <div className="px-4 py-3 text-xs text-muted-foreground border-t">
                        Para mais informacoes contacte os servicos da junta.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}