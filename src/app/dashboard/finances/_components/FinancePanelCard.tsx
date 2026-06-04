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
import "@/components/layout/components/card/data-card.css";

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

interface FinancePanelCardProps {
  chromeLabel: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

/** Card de seção do dashboard — mesmo visual do DataCard (movimentações). */
export default function FinancePanelCard({
  chromeLabel,
  title,
  description,
  icon,
  className,
  contentClassName,
  children,
}: FinancePanelCardProps) {
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
      <CardChrome label={chromeLabel} />

      <CardHeader className="elevate-data-card__header">
        <CardTitle className="elevate-data-card__title">{title}</CardTitle>
        {icon ? (
          <CardAction className="elevate-data-card__icon">{icon}</CardAction>
        ) : null}
      </CardHeader>

      <CardContent
        className={cn(
          "elevate-data-card__content elevate-data-card__content--panel",
          contentClassName,
        )}
      >
        {description ? (
          <p className="elevate-data-card__desc">{description}</p>
        ) : null}
        {children}
      </CardContent>
    </Card>
  );
}
