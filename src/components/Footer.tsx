import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Facebook, Calendar } from "lucide-react";

const Footer = () => (
  <footer className="relative bg-[#1E1E1E] overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
      {/* LEFT STRUCTURE */}
      <div className="max-w-2xl">
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="/footer logo1.png"
            alt="Logo"
            width={180}
            height={180}
            className="object-contain"
          />
        </div>

        {/* Columns BELOW logo */}
        <div className="flex gap-10 md:gap-14">
          {/* CONTACT */}
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg mb-5">Informação Útil</h4>

            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex gap-3 items-start">
                <Calendar className="w-4 h-4 mt-1 text-white/60" />
                <div className="leading-6">
                  Segunda a Sexta <br />
                  <span className="text-white/50 text-xs">
                    9:00 AM - 12:30 PM | 2:00 PM - 5:30 PM
                  </span>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 mt-1 text-white/60" />
                <div>
                  Ed. 15, Av. Dr. Lourenço Peixinho,
                  <br />
                  1ºB, 3800-164 Aveiro
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 mt-1 text-white/60" />
                <div>secretaria@ufgvc.pt</div>
              </li>

              <li className="flex gap-3 items-start">
                <Facebook className="w-4 h-4 mt-1 text-white/60" />
                <div>@ufgloriaveracruz</div>
              </li>
            </ul>
          </div>

          {/* DIVIDER */}
          <div className="w-px bg-white/10"></div>

          {/* NAV */}
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg mb-5">Sobre este site</h4>

            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="hover:text-white transition">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="hover:text-white transition">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="/freguesia" className="hover:text-white transition">
                  Freguesia
                </Link>
              </li>
              <li>
                <Link href="/institucional" className="hover:text-white transition">
                  Institucional
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="hover:text-white transition">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/participacao" className="hover:text-white transition">
                  Participação
                </Link>
              </li>
              <li>
                <Link href="/agendar" className="hover:text-white transition">
                  Agendar Atendimento
                </Link>
              </li>
              <li>
                <Link href="/contactos" className="hover:text-white transition">
                  Formulário de Contacto
                </Link>
              </li>
              <li>
                <Link href="/contactos-uteis" className="hover:text-white transition">
                  Contactos Úteis
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 mt-16 pt-6 text-center text-xs text-white/40">
        <p>© {new Date().getFullYear()}. Todos os direitos reservados.</p>
        <p className="mt-1">
          Usamos cookies para garantir a melhor experiência.{" "}
          <a href="/" className="underline text-white/60 hover:text-white">
            definições de cookies
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;