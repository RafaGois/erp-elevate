import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import "./input.css";

const inputVariants = cva(
  cn(
    "elevate-input w-full min-w-0 outline-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "selection:bg-[#dfff00] selection:text-black",
  ),
  {
    variants: {
      variant: {
        modern: "elevate-input--modern",
        retro: "elevate-input--retro",
      },
      inputSize: {
        default: "elevate-input--md",
        sm: "elevate-input--sm",
        lg: "elevate-input--lg",
      },
    },
    defaultVariants: {
      variant: "modern",
      inputSize: "default",
    },
  },
);

function Input({
  className,
  type,
  variant,
  inputSize,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, inputSize, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
