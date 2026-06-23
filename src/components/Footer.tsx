import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";

const Footer = () => (
  <footer className="bg-[#C41230] text-white">
    <div className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
        {/* COLUMN 1 - LOGO & INFO */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <Image
              src="/footer logo1.png"
              alt="Logo"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>
          <h4 className="font-bold mb-4">Informação</h4>
          <ul className="space-y-4 text-sm text-white/90">
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 shrink-0" />
              <span>
                Segunda a Sexta
                <br />
                09h00-12h30 | 14H00-17H30
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>Avenida Dr. Lourenço Peixinho, Edifício 15 - 1º B, 3800-164 Aveiro</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>Rua das Pombas Nº9 /11, 3810 - 150 Aveiro / (Apartado 84 ECAveiro)</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0" />
              <span>geral.fgloriavcruz@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 font-bold text-lg">
              <Phone className="w-5 h-5 shrink-0" />
              <span>234 427 832</span>
            </li>
          </ul>
        </div>

        {/* COLUMN 2 - PRINCIPAIS */}
        <div>
          <h4 className="font-bold mb-5">Principais</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Começar", href: "/" },
              { label: "Notícias", href: "/noticias" },
              { label: "Balcão digital", href: "/servicos" },
              { label: "Ajuda", href: "/ajuda" },
              { label: "Contacto", href: "/contactos" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="flex items-center hover:underline">
                  <ChevronRight className="w-4 h-4 mr-1" /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3 - JUNTA */}
        <div>
          <h4 className="font-bold mb-5">Junta</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Presidência", href: "/institucional/presidente" },
              { label: "Executivo", href: "/institucional/orgaos" },
              { label: "Assembleia", href: "/institucional/assembleia" },
              { label: "Reuniões", href: "/institucional/executivo" },
              { label: "Editais", href: "/institucional/editais" },
              { label: "Financeiro", href: "/institucional/financeira" },
              { label: "Documentação", href: "/institucional/documentacao" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="flex items-center hover:underline">
                  <ChevronRight className="w-4 h-4 mr-1" /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 4 - FREGUESIA */}
        <div>
          <h4 className="font-bold mb-5">Freguesia</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "História", href: "/freguesia/historia" },
              { label: "Heráldica", href: "/freguesia/heraldica" },
              { label: "A visitar", href: "/freguesia/espacos" },
              { label: "Agenda", href: "/eventos" },
              { label: "Lista pública", href: "/freguesia/estatisticas" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="flex items-center hover:underline">
                  <ChevronRight className="w-4 h-4 mr-1" /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 5 - SOBRE ESTE SITE */}
        <div>
          <h4 className="font-bold mb-5">Sobre este site</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Acessibilidade", href: "/legal" },
              { label: "Proteção de dados", href: "/legal" },
              { label: "Regulamento", href: "/legal" },
              { label: "Política de privacidade", href: "/legal" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="flex items-center hover:underline">
                  <ChevronRight className="w-4 h-4 mr-1" /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        <p className="order-2 md:order-1">
          Usamos cookies para garantir que lhe proporcionamos a melhor experiência no nosso site.
          Ver{" "}
          <Link href="/cookies" className="underline font-bold">
            definições de cookies
          </Link>
        </p>

        <div className="flex items-center gap-6 order-1 md:order-2">
          <div className="flex gap-4">
            <Link href="#">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
          <p>© 2026. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
