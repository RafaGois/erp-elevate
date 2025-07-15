import { SidebarTrigger } from "../ui/sidebar";

import AppBreadcrumb from "../default/AppBreadcrumb";
import { Menu } from "lucide-react";
interface HeaderProps {
  breadcrumb: string;
}

//todo colocar um breadcrum aq
export default function Header(props: HeaderProps) {
  return (
    <div className="flex p-5 pr-8 border-b" style={{ gridArea: "cabecalho" }}>
      <SidebarTrigger  className="mr-3">
        <Menu />
      </SidebarTrigger>
      <AppBreadcrumb route={props.breadcrumb} />
    </div>
  );
}
