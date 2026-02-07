"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/services/QueryClient";
import { AppProvider } from "@/data/contexts/AppContext";
import { AuthProvider } from "@/data/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

type ProvidersProps = {
  children: ReactNode;
};

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <AppProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </AppProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
      <Toaster theme="system" />
    </ThemeProvider>
  );
}

