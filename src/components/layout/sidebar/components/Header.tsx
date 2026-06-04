import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <SidebarHeader className="px-3 py-4 border-b border-sidebar-border">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="h-auto p-2 hover:bg-transparent active:bg-transparent focus-visible:ring-0 rounded-none"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center bg-[#dfff00] text-black
                           transition-[transform,box-shadow] duration-100
                           group-hover:-translate-x-px group-hover:-translate-y-px"
                style={{
                  border: "2px solid #171717",
                  boxShadow: "3px 3px 0 #0f172a",
                }}
              >
                <Zap className="h-[14px] w-[14px] fill-black stroke-none" />
              </span>

              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-display text-[15px] font-normal tracking-tight text-sidebar-foreground">
                  ELEVATE
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  sys://erp
                </span>
              </div>

              <span className="ml-auto font-mono text-[#dfff00] text-base animate-blink leading-none select-none">
                _
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
