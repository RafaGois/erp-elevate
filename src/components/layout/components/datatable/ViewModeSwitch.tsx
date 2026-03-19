"use client";

import { LayoutGrid, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ViewMode = "table" | "kanban";

interface ViewModeSwitchProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export default function ViewModeSwitch({
  value,
  onChange,
  className,
}: ViewModeSwitchProps) {
  return (
    <div className={className}>
      <div className="inline-flex items-center rounded-md border p-1">
        <Button
          type="button"
          size="sm"
          variant={value === "table" ? "default" : "ghost"}
          onClick={() => onChange("table")}
          className="gap-2"
        >
          <Table2 className="h-4 w-4" />
          Tabela
        </Button>
        <Button
          type="button"
          size="sm"
          variant={value === "kanban" ? "default" : "ghost"}
          onClick={() => onChange("kanban")}
          className="gap-2"
        >
          <LayoutGrid className="h-4 w-4" />
          Kanban
        </Button>
      </div>
    </div>
  );
}
