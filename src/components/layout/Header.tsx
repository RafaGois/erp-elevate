import { SidebarTrigger } from "@/components/ui/sidebar";

import AppBreadcrumb from "../default/AppBreadcrumb";
interface HeaderProps {
  breadcrumb: string;
}

//todo colocar um breadcrum aq
export default function Header(props: HeaderProps) {
  return (
    <div
      className="flex py-4 pr-8 border-b"
      style={{ gridArea: "cabecalho" }}
    >
      <SidebarTrigger className="mr-3" />
      <AppBreadcrumb route={props.breadcrumb} />
    </div>
  );
}
