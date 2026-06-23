"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="bg-[#222222] text-white py-16 px-8 lg:px-16">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div>
              <h1 className="text-[40px] lg:text-[48px] font-extrabold leading-tight mb-2 tracking-wide">
                Legalidade
              </h1>
              <p className="text-[20px] lg:text-[24px] font-bold">Todos as páginas legais</p>
            </div>

            <div className="w-full lg:w-[500px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="O que procuro"
                  className="w-full bg-transparent border border-white/40 rounded-[4px] py-3 pl-4 pr-12 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-[13px]">
                <span className="font-bold text-white">Termos Populares</span>
                <Link
                  href="#"
                  className="text-white/80 underline underline-offset-4 hover:text-white transition-colors"
                >
                  Cookies
                </Link>
                <Link
                  href="#"
                  className="text-white/80 underline underline-offset-4 hover:text-white transition-colors"
                >
                  Condições
                </Link>
                <Link
                  href="#"
                  className="text-white/80 underline underline-offset-4 hover:text-white transition-colors"
                >
                  Legislação
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="px-8 lg:px-16 py-16 max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16">
            {/* SIDEBAR */}
            <aside className="space-y-12">
              {/* Navigation */}
              <nav className="flex flex-col gap-6 text-[16px] font-semibold text-[#1C2E56]">
                <Link href="#" className="hover:text-[#B4142F] transition-colors">
                  Acessibilidade
                </Link>
                <Link href="#" className="hover:text-[#B4142F] transition-colors">
                  Proteção de dados
                </Link>
                <Link href="#" className="hover:text-[#B4142F] transition-colors">
                  Regulamento
                </Link>
                <Link href="#" className="text-[#B4142F]">
                  Política de privacidade
                </Link>
              </nav>

              {/* FAQ Accordion */}
              <div>
                <h3 className="font-extrabold text-[#1C2E56] text-[18px] mb-4">
                  Perguntas frequentes
                </h3>
                <button className="w-full text-left bg-[#FDF6E3] border border-[#1C2E56]/20 p-4 flex justify-between items-start gap-4 text-[#1C2E56] text-[14px] hover:bg-[#FCECD4] transition-colors">
                  <span className="leading-snug pr-2">
                    O que fazer se um ficheiro não abrir corretamente?
                  </span>
                  <ChevronDown className="w-4 h-4 shrink-0 mt-0.5" />
                </button>
              </div>

              {/* News Box */}
              <div className="bg-[#EAF4FD] p-6 rounded-[4px]">
                <h3 className="font-extrabold text-[#1C2E56] text-[16px] mb-4">Notícias</h3>
                <p className="text-[12px] text-[#1C2E56]/70 mb-2 font-medium">24 Abril, 2026</p>
                <Link
                  href="#"
                  className="text-[#1C2E56] text-[14px] leading-relaxed underline underline-offset-2 hover:text-[#B4142F] transition-colors block"
                >
                  Novo acordo de parceria entre o Município de Aveiro e instituições locais para
                  reforçar a vitalidade, as artes e a cultura no concelho.
                </Link>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="text-[#1C2E56] text-[14px] leading-relaxed space-y-6">
              <h2 className="text-[36px] font-extrabold mb-8 tracking-wide leading-tight">
                Política de privacidade
              </h2>

              <p>
                A Política de Privacidade descreve a forma como a Junta de Freguesia recolhe,
                utiliza, armazena e protege os dados pessoais fornecidos através da plataforma
                digital, balcão digital e restantes serviços online disponibilizados aos cidadãos.
                <br />A utilização dos formulários, mecanismos de participação e serviços digitais
                poderá implicar a recolha de dados pessoais necessários para análise, resposta e
                acompanhamento dos diferentes pedidos, processos, inscrições, ocorrências,
                reclamações ou iniciativas de participação pública.
              </p>

              <div>
                <p className="mb-2">Os dados pessoais recolhidos poderão incluir:</p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">👤</span> nome completo
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">📧</span> endereço de email
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">📱</span> contacto telefónico
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">📍</span> morada ou localização associada ao
                    pedido
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">📄</span> informações submetidas nos
                    formulários
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">📎</span> documentos ou ficheiros enviados
                    pelos utilizadores
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">🌐</span> dados técnicos relacionados com a
                    utilização da plataforma
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-2">Os dados recolhidos destinam-se exclusivamente a:</p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">🏛️</span> gestão e resposta aos pedidos
                    submetidos
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">🗣️</span> comunicação entre os serviços da
                    junta e os cidadãos
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">📋</span> tratamento administrativo e
                    acompanhamento de processos
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">💧</span> gestão de iniciativas de
                    participação pública e orçamento participativo
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">⚠️</span> análise de ocorrências, reclamações
                    e sugestões
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">🔒</span> garantia de segurança, integridade e
                    correto funcionamento da plataforma
                  </li>
                </ul>
              </div>

              <p>
                A Junta de Freguesia compromete-se a adotar medidas técnicas e organizativas
                adequadas para proteger os dados pessoais contra perda, utilização indevida, acesso
                não autorizado ou divulgação indevida.
              </p>

              <p>
                Os dados serão conservados apenas pelo período necessário ao tratamento das
                finalidades para as quais foram recolhidos ou de acordo com obrigações legais
                aplicáveis.
              </p>

              <div>
                <p className="mb-2">Os utilizadores poderão, nos termos da legislação aplicável:</p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">👁️</span> solicitar acesso aos seus dados
                    pessoais
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">✏️</span> pedir a retificação ou atualização
                    de informações
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">🗑️</span> solicitar a eliminação dos dados,
                    quando aplicável
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">🚫</span> retirar consentimentos previamente
                    concedidos
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-5 text-center">📩</span> apresentar questões relacionadas com
                    a proteção de dados
                  </li>
                </ul>
              </div>

              <p>
                Os utilizadores comprometem-se a utilizar os serviços e formulários disponibilizados
                de forma responsável, respeitando a legislação em vigor e evitando a submissão de
                conteúdos falsos, abusivos, ofensivos ou indevidos.
              </p>

              <p>
                Para questões relacionadas com a proteção de dados pessoais ou utilização da
                plataforma, os cidadãos poderão utilizar os canais de contacto disponibilizados pela
                Junta de Freguesia através do website oficial.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
