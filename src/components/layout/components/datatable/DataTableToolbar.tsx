"use client";

import type { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { Params } from "@/app/dashboard/finances/movimentations/page";
import { DatePickerForm } from "../inputs/DatePickerForm";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SelectForm from "../inputs/SelectForm";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setAction?: (newAction: ModalAction) => void;

  form?: UseFormReturn<Params>;
}

export function DataTableToolbar<TData>({
  table,
  setAction,
  form,
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
        {form && (
          <Form {...form}>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <DatePickerForm form={form} />
              <SelectForm
                form={form}
                name="type"
                options={[
                  { id: "Entrada", name: "Entradas" },
                  { id: "Saída", name: "Saídas" },
                  { id: "Todos", name: "Todos" },
                ]}
              />
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Limpar
              </Button>
            </form>
          </Form>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => setAction?.(ModalAction.Create)}>Novo</Button>
      </div>
    </div>
  );
}
