"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast !rounded-none !border-[3px] !border-black !font-sans !shadow-[4px_4px_0_#000] dark:!border-stone-200 dark:!shadow-[4px_4px_0_#dfff00]",
          title: "group-[.toast]:!text-sm group-[.toast]:!font-medium",
          description: "group-[.toast]:!text-xs group-[.toast]:!opacity-80",
          success:
            "group-[.toast]:!bg-[#dfff00] group-[.toast]:!text-black",
          error:
            "group-[.toast]:!bg-[#f87171] group-[.toast]:!text-black",
          warning:
            "group-[.toast]:!bg-[#fde047] group-[.toast]:!text-black",
          info: "group-[.toast]:!bg-white group-[.toast]:!text-black dark:group-[.toast]:!bg-stone-900 dark:group-[.toast]:!text-stone-100",
        },
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#09090b",
          "--normal-border": "#000000",
          "--border-radius": "0",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
