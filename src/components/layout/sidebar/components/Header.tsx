import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const ELEVATE_LOGO_URL =
  "https://res.cloudinary.com/dn454izoh/image/upload/v1780591064/copy_of_img_0854_zii4ia.png";

export default function Header() {
  return (
    <SidebarHeader className="border-b border-sidebar-border px-3 py-4 group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:py-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            size="lg"
            tooltip="ELEVATE"
            className="h-auto rounded-none p-2 hover:bg-transparent active:bg-transparent focus-visible:ring-0 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:p-1!"
          >
            <Link
              href="/"
              className="flex w-full items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
            >
              <span
                className="relative h-9 w-9 shrink-0 overflow-hidden transition-[transform,box-shadow] duration-100 group-hover:-translate-x-px group-hover:-translate-y-px group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8"
                style={{
                  border: "2px solid #171717",
                  boxShadow: "3px 3px 0 #0f172a",
                }}
              >
                <Image
                  src={ELEVATE_LOGO_URL}
                  alt="Elevate"
                  fill
                  sizes="(max-width: 768px) 36px, 36px"
                  className="object-cover object-center"
                  priority
                />
              </span>

              <div className="flex min-w-0 flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                <span className="font-display text-[15px] font-normal tracking-tight text-sidebar-foreground">
                  ELEVATE
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  sys://erp
                </span>
              </div>

              <span className="ml-auto font-mono text-base leading-none text-[#dfff00] animate-blink select-none group-data-[collapsible=icon]:hidden">
                _
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
