import {
  Breadcrumb,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
} from "../ui/breadcrumb";

export default function AppBreadcrumb(props: { route: string }) {
  function returnBreadcrumbItems() {
    const items = props.route?.split("/");
    let path = "";
    return items?.map((item, index) => {
      path += `/${item}`;
      return (
        <div key={path} className="flex items-center justify-center gap-2">
          <BreadcrumbItem>
            <BreadcrumbLink href={path}>{item}</BreadcrumbLink>
          </BreadcrumbItem>
          {index !== items.length - 1 && <BreadcrumbSeparator />}
        </div>
      );
    });
  }

  return (
    <Breadcrumb className="flex items-center justify-center">
      <BreadcrumbList>{returnBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
}
