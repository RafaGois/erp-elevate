"use client";

import Content from "@/components/layout/Content";
import Header from "@/components/layout/Header";
import AppSidebar from "@/components/layout/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main
          className={`flex-col overflow-auto bg-background rounded-lg`}
        >
          <Header />
          <Content>{children}</Content>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
