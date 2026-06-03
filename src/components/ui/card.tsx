import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { DotGothic16, Press_Start_2P } from "next/font/google";

import { cn } from "@/lib/utils";
import "./card.css";

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

const cardVariants = cva(
  cn(
    "elevate-card flex flex-col text-card-foreground",
    fontDisplay.variable,
    fontPixel.variable,
  ),
  {
    variants: {
      variant: {
        window: "elevate-card--window",
        bento: "elevate-card--bento",
        glass: "elevate-card--glass py-6",
        unstyled: "elevate-card--unstyled",
      },
      scanlines: {
        true: "elevate-card--scanlines",
        false: "",
      },
    },
    defaultVariants: {
      variant: "window",
      scanlines: false,
    },
  },
);

function Card({
  className,
  variant,
  scanlines,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, scanlines, className }))}
      {...props}
    />
  );
}

function CardChrome({
  className,
  label = "SYS://ELEVATE",
  showControls = true,
  ...props
}: React.ComponentProps<"div"> & {
  label?: string;
  showControls?: boolean;
}) {
  return (
    <div
      data-slot="card-chrome"
      className={cn("elevate-card__chrome", className)}
      {...props}
    >
      <span className="elevate-card__chrome-label">{label}</span>
      {showControls ? (
        <div className="elevate-card__chrome-controls" aria-hidden>
          <span className="elevate-card__chrome-dot" />
          <span className="elevate-card__chrome-dot" />
          <span className="elevate-card__chrome-dot elevate-card__chrome-dot--close" />
        </div>
      ) : null}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "elevate-card__header @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("elevate-card__title leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("elevate-card__description", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("elevate-card__content", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "elevate-card__footer flex items-center [.border-t]:pt-4",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardChrome,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
};
