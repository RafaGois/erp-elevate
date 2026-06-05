"use client";

import Content from "@/components/layout/Content";
import DashboardScrollArea from "@/components/layout/DashboardScrollArea";
import Header from "@/components/layout/Header";
import AppSidebar from "@/components/layout/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="!overflow-hidden">
        <Header />
        <DashboardScrollArea>
          <Content>{children}</Content>
        </DashboardScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}

