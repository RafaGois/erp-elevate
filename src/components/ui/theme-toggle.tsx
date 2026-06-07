"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={cn("landing-menu__theme-toggle", className)}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Ativar tema claro"
            : "Ativar tema escuro"
          : "Alternar tema"
      }
      title={mounted ? (isDark ? "Tema claro" : "Tema escuro") : "Tema"}
    >
      {mounted ? (
        isDark ? (
          <Sun size={16} aria-hidden />
        ) : (
          <Moon size={16} aria-hidden />
        )
      ) : (
        <Sun size={16} aria-hidden />
      )}
    </button>
  );
}
