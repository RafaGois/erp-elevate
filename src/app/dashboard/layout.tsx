"use client";

import Content from "@/components/layout/Content";
import Header from "@/components/layout/Header";
import AppSidebar from "@/components/layout/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main
          className={`flex-col overflow-auto bg-background rounded-lg`}
        >
          <Header breadcrumb={breadcrumb} />
          <Content>{children}</Content>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
