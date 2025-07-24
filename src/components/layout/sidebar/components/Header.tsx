import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ArrowUpCircleIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <SidebarHeader className="p-8 pt-10">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <Link href="/">
              <ArrowUpCircleIcon className="h-5 w-5" />
              <span className="text-base font-semibold">Elevate Erp.</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
