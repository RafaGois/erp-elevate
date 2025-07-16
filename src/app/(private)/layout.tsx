"use client";

import Content from "@/components/layout/Content";
import Header from "@/components/layout/Header";
import AppSidebar from "@/components/layout/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
    <>
      <SidebarProvider className={theme} defaultOpen={true}>
        <AppSidebar />
        <main
          id="content-id"
          className={`${theme} flex flex-col overflow-auto h-vh w-svw `}
        >
          <Header breadcrumb={breadcrumb} />
          <Content>{children}</Content>
        </main>
      </SidebarProvider>
    </>
  );
}
