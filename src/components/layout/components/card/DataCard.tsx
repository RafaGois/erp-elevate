import {
  Card,
  CardAction,
  CardChrome,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import "./data-card.css";

const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-elevate-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-elevate-pixel",
  display: "swap",
});

interface DataCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}

function toMetricSlug(text: string): string {
  const slug = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "");
  return slug || "METRICA";
}

function formatCardValue(value: number) {
  return value.toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  });
}

export default function DataCard({
  title,
  value,
  icon,
  className,
}: DataCardProps) {
  const safeValue =
    value === null || value === undefined || Number.isNaN(value) ? 0 : value;

  return (
    <Card
      variant="window"
      scanlines
      className={cn(
        "elevate-data-card group",
        fontDisplay.variable,
        fontPixel.variable,
        className,
      )}
    >
      <CardChrome label={`SYS://${toMetricSlug(title)}`} />

      <CardHeader className="elevate-data-card__header">
        <CardTitle className="elevate-data-card__title">{title}</CardTitle>
        <CardAction className="elevate-data-card__icon">{icon}</CardAction>
      </CardHeader>

      <CardContent className="elevate-data-card__content">
        <p className="elevate-data-card__value">{formatCardValue(safeValue)}</p>
        <span className="elevate-data-card__kicker">&gt; // métrica ao vivo</span>
      </CardContent>
    </Card>
  );
}
