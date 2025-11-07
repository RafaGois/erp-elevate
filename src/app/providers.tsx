"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/services/QueryClient";
import { AppProvider } from "@/data/contexts/AppContext";
import { AuthProvider } from "@/data/contexts/AuthContext";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <AppProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AppProvider>
      </AuthProvider>
      <Toaster theme="system" />
    </ThemeProvider>
  );
}

