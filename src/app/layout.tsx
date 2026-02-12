import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Sistemas Elevate",
  description: "Somos uma empresa especializada no desenvolvimento de sistemas sob medida para a indústria metal mecânica. Nosso trabalho nasce da união entre conhecimento técnico em desenvolvimento de software e experiência prática em planejamento, controle de processos e engenharia de automação industrial.",
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
    title: "Sistemas Elevate",
    description: "Somos uma empresa especializada no desenvolvimento de sistemas sob medida para a indústria metal mecânica. Nosso trabalho nasce da união entre conhecimento técnico em desenvolvimento de software e experiência prática em planejamento, controle de processos e engenharia de automação industrial.",
    type: "website",
    locale: "pt_BR",
    siteName: "Sistemas Elevate",
    images: [
      {
        url: "https://res.cloudinary.com/dn454izoh/image/upload/v1755006181/us_agf6k4.png",
        alt: "Sistemas Elevate - Identidade visual",
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
