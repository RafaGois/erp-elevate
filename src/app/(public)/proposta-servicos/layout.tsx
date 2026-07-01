import type { Metadata } from "next";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import "./proposta-servicos.css";

const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ps-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ps-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apresentação de Serviços | ElevatePro Media",
  description:
    "Apresentação interativa dos serviços da ElevatePro Media — social media, identidade visual, audiovisual, captação, cobertura de eventos e sites institucionais.",
};

export default function PropostaServicosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${fontDisplay.variable} ${fontPixel.variable}`}>{children}</div>;
}
