"use client";

//import ForceAuthentication from "../auth/ForceAuthentication";
import Header from "./Header";
import Content from "./Content";
import React from "react";

import { Barlow } from "next/font/google";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./sidebar/AppSidebar";

import { useTheme } from "next-themes";
import Head from "next/head";

const barlow = Barlow({
  subsets: ["latin"],
  weight: "400",
});

interface LayoutProps {
  breadcrumb: string;
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { theme } = useTheme();

  return (
    /* <ForceAuthentication> */
    <div>
      <Head>
        <title>Sistema de Gerenciamento de Recursos</title>
        {/* <link rel="icon" href="/logommm.ico" /> */}
      </Head>
      <SidebarProvider className={theme} defaultOpen={true}>
        <AppSidebar />
        <main
          id="content-id"
          className={` ${theme} flex flex-col overflow-auto h-vh w-svw  ${barlow.className}`}
          >
          <Header breadcrumb={props.breadcrumb} />
          <Content>{props.children}</Content>
        </main>
      </SidebarProvider>
      </div>
    /* </ForceAuthentication> */
  );
}
