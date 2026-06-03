import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Press_Start_2P } from "next/font/google";

import { cn } from "@/lib/utils";
import "./badge.css";

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-elevate-pixel",
  display: "swap",
});

const badgeVariants = cva(cn("elevate-badge", fontPixel.variable), {
  variants: {
    variant: {
      default: "elevate-badge--pixel",
      secondary: "elevate-badge--pill",
      destructive: "elevate-badge--destructive",
      outline: "elevate-badge--outline",
      pixel: "elevate-badge--pixel",
      pill: "elevate-badge--pill",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
