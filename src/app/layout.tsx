import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Sistemas Elevate",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
  },
  description: "Desenvolvemos sistemas de controle de produção, PCP e automação para indústria há anos. Soluções sob medida que já estão em uso no chão de fábrica. Não é só projeto, é resultado que continua entregando.",
  keywords: [
    "sistemas de controle de produção",
    "sistemas de controle de produção (pcp)",
    "sistemas de controle de produção (pcp) para a indústria metal mecânica",
    "desenvolvimento de sistemas sob medida para a indústria metal mecânica",
    "desenvolvimento de sistemas sob medida para a indústria metal mecânica",
    "dashboard de produção para a indústria metal mecânica",
    "dashboard de produção para a indústria metal mecânica",
  ],
  verification: {
    google: "L0vKyFcP-yWpurHV-P9cL44L302S08l9fZwt8bPBu64",
  },
  openGraph: {
    title: "Sistemas Elevate: Digitalização industrial e controle de produção",
    description: "Sistemas de PCP, controle de produção e automação para indústria. Soluções sob medida que já estão rodando em fábricas reais, feitas por quem entende de planejamento e chão de fábrica.",
    type: "website",
    locale: "pt_BR",
    siteName: "Sistemas Elevate",
    images: [
      {
        url: "https://res.cloudinary.com/dn454izoh/image/upload/v1755006181/us_agf6k4.png",
        alt: "Sistemas Elevate - Digitalização industrial",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
