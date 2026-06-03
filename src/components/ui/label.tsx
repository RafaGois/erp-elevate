import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Press_Start_2P } from "next/font/google";

import { cn } from "@/lib/utils";
import "./label.css";

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-elevate-pixel",
  display: "swap",
});

const labelVariants = cva(
  cn(
    "elevate-label",
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  ),
  {
  variants: {
    variant: {
      default: "elevate-label--default",
      accent: "elevate-label--accent",
      pixel: cn("elevate-label--pixel", fontPixel.variable),
      inline: "elevate-label--inline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
  },
);

function Label({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Label, labelVariants };
