import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ElevatePro Media",
  description: "Somos uma agência de publicidade apta para desenvolver qualquer projeto visual, seja ele um desenvolvimento de site, fotografias, vídeos, campanhas, tráfego pago desde o início até a execução do projeto.",
  keywords: [
    "agência de publicidade",
    "social media",
    "marketing digital",
    "elevatepro media",
    "elevatepromedia",
    "desenvolvimento de sites",
    "desenvolvimento de sites institucionais",
    "desenvolvimento de sites corporativos",
    "desenvolvimento de sites e-commerce",
    "desenvolvimento de sites blog",
    "desenvolvimento de sites portfolio",
    "desenvolvimento de sites landing page",
    "desenvolvimento de sites para empresas",
    "desenvolvimento de sites para startups",
    "desenvolvimento de sites para instituições",
    "fotografia de evento",
    "fotografia de casamento",
    "fotografia de empresa",
    "fotografia de serviço",
    "fotografia de produto",
    "fotografia corporativa",
    "ensaio fotográfico",
    "cobertura de eventos",
    "produção de vídeos",
    "vídeos institucionais",
    "criação de sites",
    "sites corporativos",
    "presença online",
    "digitalização de empresas",
    "SEO",
    "branding visual",
    "agência de audiovisual",
    "marketing digital em Curitibanos",
    "marketing digital em Lages",
    "marketing digital em Santa Catarina",
    "fotografia corporativa em Curitibanos",
    "fotografia corporativa em Lages",
    "fotografia corporativa em Santa Catarina",
    "criação de sites em Curitibanos",
    "criação de sites em Lages",
    "criação de sites em Santa Catarina",
  ],
  verification: {
    google: "L0vKyFcP-yWpurHV-P9cL44L302S08l9fZwt8bPBu64",
  },
  openGraph: {
    title: "ElevatePro Media",
    description: "Somos uma agência de publicidade apta para desenvolver qualquer projeto visual, seja ele um desenvolvimento de site, fotografias, vídeos, campanhas, tráfego pago desde o início até a execução do projeto.",
    type: "website",
    locale: "pt_BR",
    siteName: "ElevatePro Media",
    images: [
      {
        url: "https://res.cloudinary.com/dn454izoh/image/upload/v1755006181/us_agf6k4.png",
        alt: "ElevatePro Media - Identidade visual",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //teste

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
