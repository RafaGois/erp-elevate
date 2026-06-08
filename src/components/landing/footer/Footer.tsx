import { DotGothic16, Press_Start_2P } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { ELEVATE_WHATSAPP_URL } from "@/lib/data/contact-links";
import "./footer.css";

const COMPANY_LOGO =
  "https://res.cloudinary.com/dn454izoh/image/upload/v1755007271/IMG_0854_zii4ia.png";

const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ft-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ft-pixel",
  display: "swap",
});

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Sobre nós", href: "#about-us" },
  { label: "Serviços", href: "#services" },
  { label: "Problemas", href: "#problemas" },
  { label: "Contato", href: "#cta" },
] as const;

const MARQUEE_ITEMS = [
  "ELEVATE",
  "INDÚSTRIA",
  "SOFTWARE",
  "PCP",
  "AUTOMAÇÃO",
  "BI",
] as const;

function MarqueeGroup() {
  return (
    <div className="ft__marquee-group" aria-hidden>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item}>
          <span className="is-accent">★</span> {item}&nbsp;
        </span>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className={`ft ${fontDisplay.variable} ${fontPixel.variable}`}
    >
      <div className="ft__grid" aria-hidden />
      <div className="ft__glow" aria-hidden />

      <div className="ft__inner">
        <div className="ft__main">
          {/* Brand */}
          <div className="ft__brand">
            <Link href="#hero" className="ft__logo">
              <Image
                src={COMPANY_LOGO}
                alt="Sistemas Elevate"
                width={120}
                height={36}
                className="ft__logo-img"
              />
            </Link>
            <p className="ft__name">Sistemas Elevate</p>
            <a
              href={ELEVATE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ft__cta"
            >
              <MessageCircle
                style={{ width: "0.8rem", height: "0.8rem" }}
                strokeWidth={2}
                aria-hidden
              />
              Começar projeto
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="Navegação do rodapé">
            <p className="ft__col-kicker">{"// Navegação"}</p>
            <ul className="ft__nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="ft__nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="ft__col-kicker">{"// Contato"}</p>
            <div className="ft__social">
              <a
                href="https://www.instagram.com/elevatepromediaoficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="ft__social-link"
                aria-label="Instagram"
              >
                <Instagram strokeWidth={1.75} />
              </a>
              <a
                href={ELEVATE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ft__social-link"
                aria-label="WhatsApp"
              >
                <MessageCircle strokeWidth={1.75} />
              </a>
              <a
                href="mailto:contato@elevatepromedia.com"
                className="ft__social-link"
                aria-label="E-mail"
              >
                <Mail strokeWidth={1.75} />
              </a>
            </div>
            <a
              href="mailto:contato@elevatepromedia.com"
              className="ft__email"
            >
              contato@elevatepromedia.com
            </a>
          </div>
        </div>

        {/* Marquee — padrão do design system */}
        <div className="ft__marquee-wrap" aria-hidden>
          <div className="ft__marquee-track">
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </div>

        <div className="ft__bottom">
          <p className="ft__copy">
            © 2026 Sistemas Elevate · feito com pixels &amp; cuidado
          </p>
          <p className="ft__sys">SYS://FOOTER.ELEVATE</p>
        </div>
      </div>
    </footer>
  );
}
