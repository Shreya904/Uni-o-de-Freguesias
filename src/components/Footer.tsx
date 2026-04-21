import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <span className="font-display font-bold text-lg">UF</span>
            </div>
            <span className="font-display font-bold text-lg">UFGVC</span>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Ao serviço da comunidade, promovendo a qualidade de vida e o desenvolvimento local.
          </p>
        </div>

        <div>
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

        <div>
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
              <Link
                href="/instituicao"
                className="hover:text-primary-foreground transition-colors"
              >
                Instituição
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Serviços</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
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
            <li>
              <Link href="/contactos" className="hover:text-primary-foreground transition-colors">
                Contactos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Contactos</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +351 XXX XXX XXX
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> geral@ufgvc.pt
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5" /> Aveiro, Portugal
            </li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} UFGVC — União de Freguesias. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
