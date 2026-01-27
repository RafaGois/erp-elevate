"use client";

import type { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import Select from "@/components/layout/components/inputs/Select";
import { SelectedType } from "@/app/dashboard/finances/movimentations/page";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setAction?: (newAction: ModalAction) => void;

  selectedType?: SelectedType;
  setSelectedType?: (newType: SelectedType) => void;
}

export function DataTableToolbar<TData>({
  table,
  setAction,
  selectedType,
  setSelectedType,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filtro..."
          onChange={(event) => {
            return table.setGlobalFilter(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {selectedType && ( 
        <Select
          value={selectedType}
          onChange={(value) => setSelectedType?.(value)}
          options={[
            { id: "Entrada", name: "Entradas" },
            { id: "Saída", name: "Saídas" },
            { id: "Todos", name: "Todos" },
          ]}
          placeholder="Selecione um tipo"
        />
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => setAction?.(ModalAction.Create)}>Novo</Button>
      </div>
    </div>
  );
}
