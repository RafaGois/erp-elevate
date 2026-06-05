"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/services/QueryClient";
import { AppProvider } from "@/lib/contexts/AppContext";
import { AuthProvider } from "@/lib/contexts/AuthContext";

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

