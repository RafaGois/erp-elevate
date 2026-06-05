import { Card, CardChrome, CardContent } from "@/components/ui/card";
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
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

/** Card de seção — título, descrição e ícone na barra chrome; corpo só com o gráfico. */
export default function FinancePanelCard({
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
      <CardChrome
        label={title}
        description={description}
        showControls={false}
        action={icon}
      />

      <CardContent
        className={cn(
          "elevate-data-card__content elevate-data-card__content--panel",
          contentClassName,
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}
