"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { Menu } from "lucide-react";

export default function Header() {
  
  return (
    <div className="flex p-5 pr-8 border-b" style={{ gridArea: "cabecalho" }}>
      <SidebarTrigger  className="mr-3">
        <Menu />
      </SidebarTrigger>
    </div>
  );
}
