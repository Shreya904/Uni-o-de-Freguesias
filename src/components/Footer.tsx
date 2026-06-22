import Link from "next/link";
import Image from "next/image";

const Footer = () => (
  <footer className="relative bg-[#C41230] overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* COLUMN 1 - INFO */}
        <div>
          <div className="mb-6">
            <Image src="/footer logo1.png" alt="Logo" width={150} height={150} className="object-contain" />
          </div>
          <ul className="space-y-3 text-sm text-white/80">
            <li>Segunda a Sexta<br /><span className="text-white/60 text-xs">09h00-12h30 | 14H00-17H30</span></li>
            <li>Avenida Dr. Lourenço Peixinho,<br />Edifício 15 - 1º B, 3800-164 Aveiro</li>
            <li>Rua das Pombas Nº9/11, 3810-150 Aveiro</li>
            <li>geral.fgloriavcruz@gmail.com</li>
            <li className="font-bold text-white">234 427 832</li>
          </ul>
        </div>

        {/* COLUMN 2 - PRINCIPAIS */}
        <div>
          <h4 className="text-white font-bold text-base mb-5">Principais</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/" className="hover:text-white transition">› Começar</Link></li>
            <li><Link href="/noticias" className="hover:text-white transition">› Notícias</Link></li>
            <li><Link href="/balcao-digital" className="hover:text-white transition">› Balcão digital</Link></li>
            <li><Link href="/ajuda" className="hover:text-white transition">› Ajuda</Link></li>
            <li><Link href="/contactos" className="hover:text-white transition">› Contacto</Link></li>
          </ul>
        </div>

        {/* COLUMN 3 - JUNTA */}
        <div>
          <h4 className="text-white font-bold text-base mb-5">Junta</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/institucional/presidencia" className="hover:text-white transition">› Presidência</Link></li>
            <li><Link href="/institucional/executivo" className="hover:text-white transition">› Executivo</Link></li>
            <li><Link href="/institucional/assembleia" className="hover:text-white transition">› Assembleia</Link></li>
            <li><Link href="/institucional/reunioes" className="hover:text-white transition">› Reuniões</Link></li>
            <li><Link href="/institucional/editais" className="hover:text-white transition">› Editais</Link></li>
            <li><Link href="/institucional/financeiro" className="hover:text-white transition">› Financeiro</Link></li>
            <li><Link href="/institucional/documentacao" className="hover:text-white transition">› Documentação</Link></li>
          </ul>
        </div>

        {/* COLUMN 4 - FREGUESIA */}
        <div>
          <h4 className="text-white font-bold text-base mb-5">Freguesia</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/freguesia/historia" className="hover:text-white transition">› História</Link></li>
            <li><Link href="/freguesia/heraldica" className="hover:text-white transition">› Heráldica</Link></li>
            <li><Link href="/freguesia/a-visitar" className="hover:text-white transition">› A visitar</Link></li>
            <li><Link href="/eventos" className="hover:text-white transition">› Agenda</Link></li>
            <li><Link href="/freguesia/lista-publica" className="hover:text-white transition">› Lista pública</Link></li>
          </ul>
        </div>

        {/* COLUMN 5 - SOBRE ESTE SITE */}
        <div>
          <h4 className="text-white font-bold text-base mb-5">Sobre este site</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/acessibilidade" className="hover:text-white transition">› Acessibilidade</Link></li>
            <li><Link href="/protecao-dados" className="hover:text-white transition">› Proteção de dados</Link></li>
            <li><Link href="/regulamento" className="hover:text-white transition">› Regulamento</Link></li>
            <li><Link href="/politica-privacidade" className="hover:text-white transition">› Política de privacidade</Link></li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/20 mt-16 pt-6 flex justify-between items-center text-xs text-white/60">
        <p>© {new Date().getFullYear()}. Todos os direitos reservados.</p>
        <p>Usamos cookies para garantir a melhor experiência no nosso site. Ver <a href="/" className="underline hover:text-white">definições</a></p>
      </div>
    </div>
  </footer>
);

export default Footer;