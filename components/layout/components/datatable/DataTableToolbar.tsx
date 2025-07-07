"use client";

import type { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModalAction  from "@/lib/enums/modalAction";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setAction?: (newAction: ModalAction) => void;
}

export function DataTableToolbar<TData>({
  table,
  setAction
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between py-4">
      <Input
        placeholder="Filtro..."
        onChange={(event) => {
          return table.setGlobalFilter(event.target.value);
        }}
        className="h-8 w-[150px] lg:w-[250px]"
      />
      <div className="flex items-center gap-4">
        <Button onClick={() => setAction?.(ModalAction.Create)}>Novo</Button>
      </div>
    </div>
  );
}
