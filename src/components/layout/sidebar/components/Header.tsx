import { SidebarHeader } from "@/components/ui/sidebar";
import { ZapOff } from "lucide-react";

export default function Header() {
  return (
    <SidebarHeader className="p-8 pt-10">
      <div className="flex justify-center gap-2">
        <ZapOff /> Controle Elevate
      </div>
    </SidebarHeader>
  );
}
