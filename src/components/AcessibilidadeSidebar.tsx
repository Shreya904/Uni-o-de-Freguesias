"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, Type, Sun, Moon, Phone, MapPin, Mail, ChevronDown, ChevronRight, X } from "lucide-react";

export default function AcessibilidadeSidebar() {
  const [open, setOpen] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [reading, setReading] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-ajuda-sidebar", handler);
    return () => window.removeEventListener("open-ajuda-sidebar", handler);
  }, []);

  const faqs = [
    "Preciso de usar autocolantes para ouvir as entrevistas?",
    "Devo usar sempre desodorizante?",
    "Devo sempre ter o som ao meu telefone?",
  ];

  useEffect(() => {
    if (largeFont) {
      document.documentElement.style.fontSize = "1.2rem";
    } else {
      document.documentElement.style.fontSize = "";
    }
  }, [largeFont]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[80] bg-[#1C2E56] text-white px-2 py-4 rounded-l-lg shadow-lg flex flex-col items-center gap-1 text-xs font-medium"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {open ? "fechar" : "Precisa de ajuda?"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[65]"
          onClick={() => setOpen(false)}
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-80 z-[70] overflow-y-auto flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{
          backgroundColor: darkMode ? "#000000" : "#ffffff",
          color: darkMode ? "#f0f0f0" : "#111827",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
        }}
      >
        <div className="shrink-0 px-5 py-6 relative" style={{ backgroundColor: "#1C2E56" }}>
          <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>Precisa</p>
          <h2 className="text-2xl font-bold" style={{ color: "#ffffff" }}>de ajuda?</h2>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 transition"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-5 flex flex-col gap-6 flex-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: darkMode ? "rgba(255,255,255,0.65)" : "#6b7280" }}>Acessibilidade</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleReadAloud}
                className="flex items-center gap-3 border rounded-lg px-4 py-2.5 text-sm font-medium transition"
                style={{
                  backgroundColor: reading ? "#1C2E56" : "transparent",
                  color: reading || darkMode ? "#ffffff" : "#1C2E56",
                  borderColor: reading ? "#1C2E56" : darkMode ? "rgba(255,255,255,0.18)" : "#d1d5db",
                }}
              >
                <Volume2 className="w-4 h-4 shrink-0" />
                {reading ? "Parar leitura" : "Ouvir o site"}
              </button>
              <button
                onClick={() => setLargeFont(!largeFont)}
                className="flex items-center gap-3 border rounded-lg px-4 py-2.5 text-sm font-medium transition"
                style={{
                  backgroundColor: largeFont ? "#1C2E56" : "transparent",
                  color: largeFont || darkMode ? "#ffffff" : "#1C2E56",
                  borderColor: largeFont ? "#1C2E56" : darkMode ? "rgba(255,255,255,0.18)" : "#d1d5db",
                }}
              >
                <Type className="w-4 h-4 shrink-0" />
                {largeFont ? "Letra normal" : "Letra grande"}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-3 border rounded-lg px-4 py-2.5 text-sm font-medium transition"
                style={{ backgroundColor: darkMode ? "#1C2E56" : "transparent", color: darkMode ? "#ffffff" : "#1C2E56", borderColor: darkMode ? "#1C2E56" : "#d1d5db" }}
              >
                {darkMode ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
                {darkMode ? "Modo claro" : "Escuro"}
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: darkMode ? "rgba(255,255,255,0.65)" : "#6b7280" }}>Informacao util</p>
            <div className="flex flex-col gap-3 text-sm" style={{ color: darkMode ? "rgba(255,255,255,0.75)" : "#6b7280" }}>
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
              <a href="tel:234427832" className="flex items-center gap-2 border rounded-lg px-4 py-2.5 font-medium transition" style={{ color: darkMode ? "#f0f0f0" : "#111827", borderColor: darkMode ? "rgba(255,255,255,0.18)" : "#d1d5db" }}>
                <Phone className="w-4 h-4 shrink-0" /><span>234 427 832</span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: darkMode ? "rgba(255,255,255,0.65)" : "#6b7280" }}>Esta com dificuldades?</p>
            <Link href="/ajuda" onClick={() => setOpen(false)} className="flex items-center justify-between w-full font-bold rounded-lg px-4 py-3 text-sm transition" style={{ backgroundColor: darkMode ? "#f59e0b" : "#f59e0b", color: "#1C2E56" }}>
              Abrir o Centro de Ajuda
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border rounded-lg overflow-hidden" style={{ borderColor: darkMode ? "rgba(255,255,255,0.18)" : "#e5e7eb" }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-left font-medium transition"
                  style={{ color: darkMode ? "#f0f0f0" : "#111827" }}
                >
                  <span>{faq}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-4 py-3 text-xs border-t" style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#6b7280", borderColor: darkMode ? "rgba(255,255,255,0.18)" : "#e5e7eb" }}>
                    Para mais informacoes contacte os servicos da junta.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
