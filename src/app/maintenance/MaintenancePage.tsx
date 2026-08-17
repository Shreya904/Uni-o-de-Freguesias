"use client";

import { useState } from "react";

// Custom Vector Illustration (Webpage Under Construction Motif)
const UnderConstructionMotif = () => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full max-w-[280px] md:max-w-[340px] mx-auto drop-shadow-sm"
  >
    <path
      d="M40 40h320v320H40z"
      stroke="#CBD5E1"
      strokeWidth="2"
      strokeDasharray="8 8"
      opacity="0.5"
    />
    <path d="M340 60v280" stroke="#1c2841" strokeWidth="8" strokeLinecap="round" />
    <path d="M344 100H180" stroke="#1c2841" strokeWidth="8" strokeLinecap="round" />
    <path d="M340 140L300 100" stroke="#1c2841" strokeWidth="6" strokeLinecap="round" />
    <rect x="170" y="96" width="20" height="8" rx="4" fill="#1c2841" />
    <path d="M180 104v66" stroke="#1c2841" strokeWidth="2" strokeDasharray="4 4" />
    <rect x="140" y="170" width="80" height="28" rx="6" fill="#b81d34" />
    <rect x="160" y="181" width="40" height="6" rx="3" fill="#ffffff" />
    <path d="M180 206v40" stroke="#b81d34" strokeWidth="2" strokeDasharray="4 4" />
    <path
      d="M176 242l4 4l4-4"
      stroke="#b81d34"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="40"
      y="140"
      width="260"
      height="180"
      rx="12"
      fill="#ffffff"
      stroke="#1c2841"
      strokeWidth="4"
    />
    <path d="M40 176h260" stroke="#1c2841" strokeWidth="4" />
    <circle cx="60" cy="158" r="5" fill="#CBD5E1" />
    <circle cx="76" cy="158" r="5" fill="#CBD5E1" />
    <circle cx="92" cy="158" r="5" fill="#CBD5E1" />
    <rect x="64" y="200" width="60" height="60" rx="8" fill="#e6f4fd" />
    <path d="M64 200l60 60M124 200l-60 60" stroke="#CBD5E1" strokeWidth="2" opacity="0.5" />
    <rect x="140" y="200" width="120" height="12" rx="6" fill="#1c2841" />
    <rect x="140" y="224" width="140" height="8" rx="4" fill="#CBD5E1" />
    <rect x="140" y="240" width="100" height="8" rx="4" fill="#CBD5E1" />
    <rect
      x="140"
      y="254"
      width="80"
      height="28"
      rx="6"
      stroke="#b81d34"
      strokeWidth="2"
      strokeDasharray="6 4"
      fill="none"
    />
    <path d="M260 320l20 0l-10-40z" fill="#b81d34" />
    <path d="M263 305h14" stroke="#ffffff" strokeWidth="4" />
    <path d="M230 320l20 0l-10-40z" fill="#b81d34" />
    <path d="M233 305h14" stroke="#ffffff" strokeWidth="4" />
  </svg>
);

export default function MaintenancePage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-5xl bg-white border-2 border-[#1c2841] rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-5/12 h-64 md:h-auto border-b-2 md:border-b-0 md:border-r-2 border-[#1c2841] bg-[#e6f4fd]/40 flex items-center justify-center p-8 relative overflow-hidden">
          <UnderConstructionMotif />
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-left">
          <div className="mb-8">
            <img
              src="/header logo1.png"
              alt="Logótipo da Junta de Freguesia"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>

          <h1 className="text-[#1c2841] text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Brevemente
          </h1>

          <p className="text-[16px] md:text-lg font-medium text-[#4a5568] mb-8 leading-relaxed">
            Estamos a construir o novo website da Junta de Freguesia. Deixe o seu email para
            receber uma notificação assim que estivermos online.
          </p>

          {sent ? (
            <div className="bg-[#e6f4fd] border border-[#cbe5f8] rounded-md p-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-lg font-bold text-[#1c2841]">Inscrição confirmada!</p>
              <p className="text-sm text-[#1c2841]/80 mt-2 font-medium">
                Obrigado. Entraremos em contacto assim que o site for lançado.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="sr-only" htmlFor="email">
                Endereço de email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="o.seu@email.pt"
                className="flex-1 h-12 rounded-md border-2 border-gray-200 bg-white px-4 text-base text-[#1c2841] font-medium outline-none transition-colors placeholder:text-gray-400 focus:border-[#1c2841]"
              />
              <button
                type="submit"
                className="flex h-12 items-center justify-center rounded-md bg-[#b81d34] px-8 text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#9a182b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c2841] focus-visible:ring-offset-2 shrink-0"
              >
                Notificar-me
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
