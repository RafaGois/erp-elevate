"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { Press_Start_2P } from "next/font/google";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import "./dialog.css";

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-elevate-pixel",
  display: "swap",
});

type DialogChromeContextValue = {
  showCloseButton: boolean;
  variant: "retro" | "glass";
};

const DialogChromeContext = React.createContext<DialogChromeContextValue>({
  showCloseButton: true,
  variant: "retro",
});

const dialogContentVariants = cva(
  cn(
    "elevate-dialog-content",
    fontPixel.variable,
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
  ),
  {
    variants: {
      variant: {
        retro: "elevate-dialog-content--retro",
        glass: "elevate-dialog-content--glass",
      },
    },
    defaultVariants: {
      variant: "retro",
    },
  },
);

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "elevate-dialog-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  variant,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean;
  }) {
  const resolvedVariant = variant ?? "retro";

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogChromeContext.Provider
        value={{
          showCloseButton: showCloseButton ?? true,
          variant: resolvedVariant,
        }}
      >
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(dialogContentVariants({ variant }), className)}
          {...props}
        >
          {children}
          {showCloseButton && resolvedVariant === "glass" && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              className="elevate-dialog__close elevate-dialog__close--floating disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0"
            >
              <XIcon className="size-3" strokeWidth={2.5} />
              <span className="sr-only">Fechar</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogChromeContext.Provider>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("elevate-dialog__header", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "elevate-dialog__footer flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  const { showCloseButton, variant } = React.useContext(DialogChromeContext);

  if (variant === "glass") {
    return (
      <DialogPrimitive.Title
        data-slot="dialog-title"
        className={cn("elevate-dialog__title-plain", className)}
        {...props}
      />
    );
  }

  return (
    <div className="elevate-dialog__chrome">
      <DialogPrimitive.Title
        data-slot="dialog-title"
        className={cn("elevate-dialog__chrome-title", className)}
        {...props}
      />
      <div className="elevate-dialog__chrome-controls">
        <span className="elevate-dialog__chrome-dot" aria-hidden />
        <span className="elevate-dialog__chrome-dot" aria-hidden />
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="elevate-dialog__chrome-close"
            aria-label="Fechar"
          >
            <XIcon className="elevate-dialog__chrome-close-icon" strokeWidth={3} />
          </DialogPrimitive.Close>
        ) : (
          <span
            className="elevate-dialog__chrome-dot elevate-dialog__chrome-dot--idle"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("elevate-dialog__description", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
};
