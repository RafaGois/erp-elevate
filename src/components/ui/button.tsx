import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import "./button.css";

const buttonVariants = cva(
  cn(
    "elevate-btn inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap outline-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  ),
  {
    variants: {
      variant: {
        default: "elevate-btn--primary",
        destructive: "elevate-btn--destructive",
        outline: "elevate-btn--outline",
        secondary: "elevate-btn--secondary",
        ghost: "elevate-btn--ghost",
        link: "elevate-btn--link",
      },
      size: {
        default: "elevate-btn--md",
        sm: "elevate-btn--sm",
        lg: "elevate-btn--lg",
        icon: "elevate-btn--icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
