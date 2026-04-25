import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 xl:gap-6 items-start">
        <div className="md:col-span-2 lg:col-span-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border border-primary-foreground/25 bg-primary-foreground/10 shrink-0">
              <Image
                src="/ufgvc logo.png"
                alt="Logo da União das Freguesias"
                fill
                sizes="(max-width: 768px) 56px, 64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 md:min-w-[260px]">
              <p className="font-display font-bold text-lg md:text-xl leading-tight">
                <span className="block whitespace-nowrap">União das Freguesias de</span>
                <span className="block">Glória e Vera-Cruz</span>
              </p>
              <p className="text-primary-foreground/75 text-sm md:text-base">Aveiro</p>
            </div>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-md">
            Ao serviço da comunidade, promovendo a qualidade de vida e o desenvolvimento local.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-display font-semibold mb-4">Freguesia</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>
              <Link href="/freguesia" className="hover:text-primary-foreground transition-colors">
                Sobre a Freguesia
              </Link>
            </li>
            <li>
              <Link href="/noticias" className="hover:text-primary-foreground transition-colors">
                Notícias
              </Link>
            </li>
            <li>
              <Link href="/eventos" className="hover:text-primary-foreground transition-colors">
                Eventos
              </Link>
            </li>
            <li>
              <Link
                href="/freguesia/galeria"
                className="hover:text-primary-foreground transition-colors"
              >
                Galeria
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-display font-semibold mb-4">Institucional</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>
              <Link
                href="/institucional/presidente"
                className="hover:text-primary-foreground transition-colors"
              >
                Presidente
              </Link>
            </li>
            <li>
              <Link
                href="/institucional/orgaos"
                className="hover:text-primary-foreground transition-colors"
              >
                Órgãos
              </Link>
            </li>
            <li>
              <Link
                href="/institucional/documentacao"
                className="hover:text-primary-foreground transition-colors"
              >
                Documentação
              </Link>
            </li>
            <li>
              <Link href="/instituicao" className="hover:text-primary-foreground transition-colors">
                Instituição
              </Link>
            </li>
            <li>
              <Link href="/servicos" className="hover:text-primary-foreground transition-colors">
                Serviços Online
              </Link>
            </li>
            <li>
              <Link href="/mapa" className="hover:text-primary-foreground transition-colors">
                Reportar Ocorrência
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-primary-foreground transition-colors">
                Centro de Ajuda
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-display font-semibold mb-4">Contactos</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <span className="leading-6 break-words">secretaria.fgloriavcruz@gmail.com</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </span>
              <span className="leading-6">Aveiro, Portugal</span>
            </li>
            <li className="pl-9">
              <Link href="/contactos" className="hover:text-primary-foreground transition-colors">
                Contacto
              </Link>
            </li>
          </ul>
          <div className="flex gap-3 mt-4 pl-9">
            <a
              href="https://www.facebook.com/ufgloriaveracruz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} União das Freguesias de Glória e Vera-Cruz - Aveiro. Todos os
        direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
