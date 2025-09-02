"use client";

import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/QueryClient";
import { AppProvider } from "@/data/contexts/AppContext";
import { ThemeProvider } from "next-themes";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* export const metadata = {
  title: "Elevate Pro Media",
  description: "A melhor escolha de empresa de social media para você!",
  keywords: [
    "social media",
    "marketing digital",
    "elevate pro media",
    "elevatepromeida",
    "fotografia",
    "sites",
    "programação",
  ],
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <title>Elevate Pro Media</title>
        {/* <link rel="icon" href="/logommm.ico" /> */}
      </head>
      <body className={`antialiased ${spaceGrotesk.className}`}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </AppProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
