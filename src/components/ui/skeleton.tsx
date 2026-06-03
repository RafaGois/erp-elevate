import * as React from "react";

import { cn } from "@/lib/utils";
import "./skeleton.css";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("elevate-skeleton", className)}
      {...props}
    />
  );
}

export { Skeleton };
