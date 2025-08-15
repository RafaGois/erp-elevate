import { Instagram, Facebook, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Conteúdo Principal */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="max-w-md">
            <h2 className="text-xl font-bold mb-3">Elevate Pro Media</h2>
            <p className="text-white/40 text-sm">
              Transformando ideias em soluções <br /> digitais inovadoras.
            </p>
          </div>

          {/* Navegação */}
          <nav className="flex  flex-col sm:flex-row gap-6">
            <Link 
              href="#hero" 
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              Home
            </Link>
            <Link 
              href="#about-us" 
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              Sobre Nós
            </Link>
            <Link 
              href="#services" 
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              Serviços
            </Link>
            <Link 
              href="#clients" 
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              Clientes
            </Link>
          </nav>

          {/* Redes Sociais */}
          <div className="flex gap-3">
            <Link 
              href="#" 
              className="h-8 w-8 flex items-center justify-center bg-white/10 hover:bg-white hover:rotate-12 hover:scale-105 hover:text-black rounded-full transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </Link>
            <Link 
              href="#" 
              className="h-8 w-8 flex items-center justify-center bg-white/10 hover:bg-white hover:rotate-12 hover:scale-105 hover:text-black rounded-full transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </Link>
            <Link 
              href="#" 
              className="h-8 w-8 flex items-center justify-center bg-white/10 hover:bg-white hover:rotate-12 hover:scale-105 hover:text-black rounded-full transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </Link>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="h-px bg-white/10 mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/30 text-sm">
            © 2025 Elevate Pro Media. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
