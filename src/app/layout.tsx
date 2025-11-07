import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ElevatePro Media",
  description: "Somos uma agência de publicidade apta para desenvolver qualquer projeto visual, seja ele um desenvolvimento de site, fotografias, vídeos, campanhas, tráfego pago desde o início até a execução do projeto.",
  keywords: [
    "social media",
    "marketing digital",
    "elevatepro media",
    "elevatepromedia",
    "fotografia",
    "sites",
    "fotografia",
    "fotografia de eventos",
    "fotografia de casamento",
    "fotografia de empresa",
    "fotografia de produto",
    "fotografia de serviço",
    "fotografia de produto",
    "programação",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`antialiased ${spaceGrotesk.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
