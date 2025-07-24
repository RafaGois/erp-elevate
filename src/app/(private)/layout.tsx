"use client";

import Content from "@/components/layout/Content";
import Header from "@/components/layout/Header";
import AppSidebar from "@/components/layout/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";

export default function PrivateLayout({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb: string;
}) {
  const { theme } = useTheme();

  return (
      <SidebarProvider>
        <AppSidebar  />
        <SidebarInset>
          <main className={`${theme} @container/main flex-col overflow-auto bg-background`}>
            <Header breadcrumb={breadcrumb} />
            <Content>{children}</Content>
          </main>
        </SidebarInset>
      </SidebarProvider>
  );
}
