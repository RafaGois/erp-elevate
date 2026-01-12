"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import AppBreadcrumb from "../default/AppBreadcrumb";
import { Menu } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  
  return (
    <div className="flex p-5 pr-8 border-b" style={{ gridArea: "cabecalho" }}>
      <SidebarTrigger  className="mr-3">
        <Menu />
      </SidebarTrigger>
      <AppBreadcrumb route={pathname || ""} />
    </div>
  );
}
