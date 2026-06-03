import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import "./textarea.css";

const textareaVariants = cva(
  cn(
    "elevate-textarea outline-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "selection:bg-[#dfff00] selection:text-black",
  ),
  {
    variants: {
      variant: {
        modern: "elevate-textarea--modern",
        retro: "elevate-textarea--retro",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  },
);

function Textarea({
  className,
  variant,
  value,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  const resolvedValue = value !== undefined ? (value ?? "") : undefined;

  return (
    <textarea
      {...(resolvedValue !== undefined && { value: resolvedValue })}
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
