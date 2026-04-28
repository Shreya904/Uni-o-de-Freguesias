import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Facebook, Calendar } from "lucide-react";

const SocialIcon = ({ children }) => (
  <div className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition">
    {children}
  </div>
);

const Footer = () => (
  <footer className="relative bg-[#1E1E1E] overflow-hidden">
    {/* Vector (smaller + pushed down) */}
    <div className="absolute bottom-0 right-0 w-56 md:w-72 opacity-20 pointer-events-none translate-y-6">
      <Image src="/footer vector.png" alt="" width={300} height={300} className="object-contain" />
    </div>

    <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
      {/* LEFT STRUCTURE */}
      <div className="max-w-2xl">
        {/* Logo (bigger + clean) */}
        <div className="mb-10">
          <Image
            src="/footer logo.png"
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
              {/* TIME (with calendar icon, aligned properly) */}
              <li className="flex gap-3 items-start">
                <Calendar className="w-4 h-4 mt-1 text-white/60" />
                <div className="leading-6">
                  Segunda a Sexta <br />
                  <span className="text-white/50 text-xs">09h00–12h30 | 14h00–17h00</span>
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
                <span className="w-4 h-4 mt-1 text-white/60">☎</span>
                <div>234 427 832</div>
              </li>
            </ul>
          </div>

          {/* DIVIDER */}
          <div className="w-px bg-white/10"></div>

          {/* NAV */}
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg mb-5">Sobre este site</h4>

            <ul className="space-y-3 text-sm text-white/70">
              {[
                "Acessibilidade",
                "Proteção de dados",
                "Termos e Condições",
                "Política de Privacidade",
              ].map((item) => (
                <li key={item}>
                  <Link href="/" className="hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials (same tone as text) */}
            <div className="flex gap-4 mt-6">
              <SocialIcon>
                <Facebook size={18} />
              </SocialIcon>

              <SocialIcon>
                {/* Twitter */}
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </SocialIcon>

              <SocialIcon>
                {/* Generic */}
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </SocialIcon>
            </div>
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
